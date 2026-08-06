import type { ApiRequest, ApiResponse } from './_shared.js';
import { authorized, body, extractImageUrls, findReviewsUrl, htmlToText, send, slugify, validateSource } from './_shared.js';

const localizedSchema={type:'object',required:['ro','en','de','no'],properties:{ro:{type:'string'},en:{type:'string'},de:{type:'string'},no:{type:'string'}},additionalProperties:false};
const schema={
  type:'object', required:['slug','property','facilities','rooms','attractions','reviews','provenance'], additionalProperties:false,
  properties:{
    slug:{type:'string'},
    property:{type:'object',additionalProperties:false,required:['name','type','address','cityRegion','phone','whatsapp','email','startingPriceRON','rating','reviewCount','heroTitle','shortDescription','fullDescription'],properties:{name:{type:'string'},type:{type:'string'},address:{type:'string'},cityRegion:{type:'string'},phone:{type:'string'},whatsapp:{type:'string'},email:{type:'string'},startingPriceRON:{type:'number'},rating:{type:'number'},reviewCount:{type:'number'},heroTitle:localizedSchema,shortDescription:localizedSchema,fullDescription:localizedSchema}},
    facilities:{type:'array',items:{type:'string'}},
    rooms:{type:'array',items:{type:'object',additionalProperties:false,required:['id','title','description','imageIndexes','priceRON','capacityAdults','capacityKids','sizeSqm','amenities','source'],properties:{id:{type:'string'},title:localizedSchema,description:localizedSchema,imageIndexes:{type:'array',items:{type:'integer'}},priceRON:{type:'number'},capacityAdults:{type:'integer'},capacityKids:{type:'integer'},sizeSqm:{type:'number'},amenities:{type:'array',items:{type:'string'}},source:{enum:['turistinfo','description','groq-rewritten','groq-mock','manual']}}}},
    attractions:{type:'array',items:{type:'object',additionalProperties:false,required:['title','description','distance','imageIndex','source'],properties:{title:localizedSchema,description:localizedSchema,distance:{type:'string'},imageIndex:{type:'integer'},source:{enum:['turistinfo','description','groq-rewritten','groq-mock','manual']}}}},
    reviews:{type:'array',items:{type:'object',additionalProperties:false,required:['author','location','date','rating','comment','source'],properties:{author:{type:'string'},location:{type:'string'},date:{type:'string'},rating:{type:'number'},comment:{type:'string'},source:{const:'turistinfo'}}}},
    provenance:{
      type:'object',
      additionalProperties:false,
      required:['property','facilities','rooms','attractions','reviews'],
      properties:{
        property:{enum:['turistinfo','description','groq-rewritten','groq-mock','manual']},
        facilities:{enum:['turistinfo','description','groq-rewritten','groq-mock','manual']},
        rooms:{enum:['turistinfo','description','groq-rewritten','groq-mock','manual']},
        attractions:{enum:['turistinfo','description','groq-rewritten','groq-mock','manual']},
        reviews:{enum:['turistinfo','description','groq-rewritten','groq-mock','manual']}
      }
    }
  }
};

export default async function handler(req:ApiRequest,res:ApiResponse) {
  if(req.method!=='POST') return send(res,405,{error:'Method not allowed'});
  if(!authorized(req)) return send(res,401,{error:'Invalid admin secret'});
  try {
    if(!process.env.GROQ_API_KEY) throw new Error('GROQ_API_KEY is not configured.');
    const {sourceUrl}=await body<{sourceUrl:string}>(req); const source=validateSource(sourceUrl);
    const listingResponse=await fetch(source,{headers:{'User-Agent':'Mozilla/5.0 NodeStackDemoImporter/1.0'}});
    if(!listingResponse.ok) throw new Error(`TuristInfo returned ${listingResponse.status}.`);
    const listingHtml=await listingResponse.text(); const images=extractImageUrls(listingHtml,source);
    const reviewsUrl=findReviewsUrl(listingHtml,source);
    let reviewsText='';
    if(reviewsUrl) { const reviewResponse=await fetch(reviewsUrl,{headers:{'User-Agent':'Mozilla/5.0 NodeStackDemoImporter/1.0'}}); if(reviewResponse.ok) reviewsText=htmlToText(await reviewResponse.text()).slice(0,45000); }
    const listingText=htmlToText(listingHtml).slice(0,50000);
    const prompt=`Create a personalized hospitality SALES DEMO JSON from the supplied TuristInfo data. Extract facts first. Rewrite marketing content and translate it into Romanian, English, German and Norwegian. Fill missing presentation fields with plausible mock data marked groq-mock. Never fabricate reviews: include only reviews present in REVIEWS_TEXT, unchanged and at most 6. Use the real global starting price as the lowest room price; mock other prices conservatively. imageIndexes must reference IMAGE_URLS using zero-based indexes and must never invent URLs. Attractions from the listing description are source=description; suggested attractions are groq-mock and require generic wording. All arrays should contain useful content: 3 room cards, up to 24 facilities, 3-4 attractions. Return JSON only.\n\nSOURCE_URL:${source.href}\nIMAGE_URLS:${JSON.stringify(images)}\n\nLISTING_TEXT:${listingText}\n\nREVIEWS_TEXT:${reviewsText}`;
    const groqResponse=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${process.env.GROQ_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.GROQ_MODEL||'openai/gpt-oss-20b',messages:[{role:'system',content:'You extract hospitality listing facts and create clearly provenance-marked sales demo data.'},{role:'user',content:prompt}],temperature:.2,response_format:{type:'json_schema',json_schema:{name:'hospitality_demo',strict:true,schema}}})});
    if(!groqResponse.ok) throw new Error(`Groq returned ${groqResponse.status}: ${(await groqResponse.text()).slice(0,300)}`);
    const groq=await groqResponse.json() as {choices?:{message?:{content?:string}}[]};
    const generated=JSON.parse(groq.choices?.[0]?.message?.content||'{}');
    const safeImage=(index:number)=>images[index]||images[0]||'';
    const demo={schemaVersion:1,slug:slugify(generated.slug||generated.property?.name||'hospitality-demo'),sourceUrl:source.href,generatedAt:new Date().toISOString(),status:'draft',property:generated.property,images,facilities:generated.facilities||[],rooms:(generated.rooms||[]).map((room:any)=>({...room,images:(room.imageIndexes||[]).map(safeImage).filter(Boolean),heroImage:undefined,imageIndexes:undefined})),attractions:(generated.attractions||[]).map((item:any)=>({...item,image:safeImage(item.imageIndex),imageIndex:undefined})),reviews:generated.reviews||[],provenance:generated.provenance||{}};
    return send(res,200,{demo,reviewsUrl,imageCount:images.length});
  } catch(error) { return send(res,400,{error:error instanceof Error?error.message:'Import failed'}); }
}
