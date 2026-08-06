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

function compactSource(text:string,limit:number) {
  if(text.length<=limit)return text;
  const beginning=Math.floor(limit*.7);
  const ending=limit-beginning;
  return `${text.slice(0,beginning)}\n[...source shortened for Groq token limit...]\n${text.slice(-ending)}`;
}

export default async function handler(req:ApiRequest,res:ApiResponse) {
  if(req.method!=='POST') return send(res,405,{error:'Method not allowed'});
  if(!authorized(req)) return send(res,401,{error:'Invalid admin secret'});
  try {
    if(!process.env.GROQ_API_KEY) throw new Error('GROQ_API_KEY is not configured.');
    const {sourceUrl}=await body<{sourceUrl:string}>(req); const source=validateSource(sourceUrl);
    const listingResponse=await fetch(source,{headers:{'User-Agent':'Mozilla/5.0 NodeStackDemoImporter/1.0'}});
    if(!listingResponse.ok) throw new Error(`TuristInfo returned ${listingResponse.status}.`);
    const listingHtml=await listingResponse.text(); const images=extractImageUrls(listingHtml,source).slice(0,16);
    const reviewsUrl=findReviewsUrl(listingHtml,source);
    let reviewsText='';
    if(reviewsUrl) { const reviewResponse=await fetch(reviewsUrl,{headers:{'User-Agent':'Mozilla/5.0 NodeStackDemoImporter/1.0'}}); if(reviewResponse.ok) reviewsText=compactSource(htmlToText(await reviewResponse.text()),3000); }
    const listingText=compactSource(htmlToText(listingHtml),6000);
    const blueprint=`Required shape: {slug,property:{name,type,address,cityRegion,phone,whatsapp,email,startingPriceRON,rating,reviewCount,heroTitle,shortDescription,fullDescription},facilities:string[],rooms:[{id,title,description,priceRON,capacityAdults,capacityKids,sizeSqm,amenities:string[],source}],attractions:[{title,description,distance,source}],reviews:[{author,location,date,rating,comment,source:"turistinfo"}],provenance:{property,facilities,rooms,attractions,reviews}}. Every title/description is {ro,en,de,no}. Every provenance/source is one of turistinfo, description, groq-rewritten, groq-mock, manual.`;
    const prompt=`Create a hospitality sales-demo JSON from this TuristInfo text. ${blueprint} Extract facts first. Write concise Romanian, English, German and Norwegian copy. Mark assumptions groq-mock. Never invent reviews; use at most 4 found in REVIEWS_TEXT. Use the real starting price as the lowest room price. Return exactly one JSON object with no markdown.\n\nSOURCE:${source.href}\nLISTING:${listingText}\nREVIEWS:${reviewsText}`;
    const groqResponse=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${process.env.GROQ_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.GROQ_MODEL||'openai/gpt-oss-20b',messages:[{role:'system',content:'Return only complete valid JSON matching the requested shape. Keep values concise.'},{role:'user',content:prompt}],temperature:.1,max_completion_tokens:3800,response_format:{type:'json_object'}})});
    if(!groqResponse.ok) throw new Error(`Groq returned ${groqResponse.status}: ${(await groqResponse.text()).slice(0,300)}`);
    const groq=await groqResponse.json() as {choices?:{message?:{content?:string}}[]};
    const generated=JSON.parse(groq.choices?.[0]?.message?.content||'{}');
    const imageAt=(index:number)=>images.length?images[index%images.length]:'';
    const demo={schemaVersion:1,slug:slugify(generated.slug||generated.property?.name||'hospitality-demo'),sourceUrl:source.href,generatedAt:new Date().toISOString(),status:'draft',property:generated.property,images,facilities:generated.facilities||[],rooms:(generated.rooms||[]).map((room:any,index:number)=>({...room,images:[imageAt(index+1),imageAt(index+4)].filter(Boolean)})),attractions:(generated.attractions||[]).map((item:any,index:number)=>({...item,image:imageAt(index+7)})),reviews:generated.reviews||[],provenance:generated.provenance||{}};
    return send(res,200,{demo,reviewsUrl,imageCount:images.length});
  } catch(error) { return send(res,400,{error:error instanceof Error?error.message:'Import failed'}); }
}
