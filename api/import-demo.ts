import type { ApiRequest, ApiResponse } from './_shared.js';
import { authorized, body, extractImageUrls, extractPropertyLocation, findReviewsUrl, htmlToText, send, slugify, validateSource } from './_shared.js';

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

function plainValue(value:unknown) {
  if(typeof value==='string'||typeof value==='number')return String(value);
  if(value&&typeof value==='object'){
    const localized=value as Record<string,unknown>;
    const selected=localized.ro??localized.en??localized.de??localized.no;
    if(typeof selected==='string'||typeof selected==='number')return String(selected);
  }
  return '';
}

function numberValue(value:unknown) {
  const parsed=Number(plainValue(value));
  return Number.isFinite(parsed)?parsed:0;
}

export default async function handler(req:ApiRequest,res:ApiResponse) {
  if(req.method!=='POST') return send(res,405,{error:'Method not allowed'});
  if(!authorized(req)) return send(res,401,{error:'Invalid admin secret'});
  try {
    if(!process.env.GROQ_API_KEY) throw new Error('GROQ_API_KEY is not configured.');
    const {sourceUrl}=await body<{sourceUrl:string}>(req); const source=validateSource(sourceUrl);
    const listingResponse=await fetch(source,{headers:{'User-Agent':'Mozilla/5.0 NodeStackDemoImporter/1.0'}});
    if(!listingResponse.ok) throw new Error(`TuristInfo returned ${listingResponse.status}.`);
    const listingHtml=await listingResponse.text(); const images=extractImageUrls(listingHtml,source);
    const fullListingText=htmlToText(listingHtml); const extractedLocation=extractPropertyLocation(listingHtml,fullListingText);
    const reviewsUrl=findReviewsUrl(listingHtml,source);
    let reviewsText='';
    if(reviewsUrl) { const reviewResponse=await fetch(reviewsUrl,{headers:{'User-Agent':'Mozilla/5.0 NodeStackDemoImporter/1.0'}}); if(reviewResponse.ok) reviewsText=compactSource(htmlToText(await reviewResponse.text()),3000); }
    const listingText=compactSource(fullListingText,6000);
    const blueprint=`Required shape: {slug,property:{name,type,address,cityRegion,phone,whatsapp,email,startingPriceRON,rating,reviewCount,heroTitle,shortDescription,fullDescription},facilities:string[],rooms:[{id,title,description,priceRON,capacityAdults,capacityKids,sizeSqm,amenities:string[],source}],attractions:[{title,description,distance,source}],reviews:[{author,location,date,rating,comment,source:"turistinfo"}],provenance:{property,facilities,rooms,attractions,reviews}}. All text must be plain Romanian strings, never language objects. Every provenance/source is one of turistinfo, description, groq-rewritten, groq-mock, manual.`;
    const prompt=`Create a Romanian hospitality sales-demo JSON from this TuristInfo text. ${blueprint} Extract facts first. Write concise Romanian copy only. Mark assumptions groq-mock. Never invent reviews; use at most 3 found in REVIEWS_TEXT. Use the real starting price as the lowest room price. Rivers, forests, mountains, lakes and landmarks belong only in attractions, never in facilities or room amenities. Never invent attraction distances; use "in apropiere" when the source gives no distance. Return exactly one JSON object with no markdown.\n\nSOURCE:${source.href}\nLISTING:${listingText}\nREVIEWS:${reviewsText}`;
    const groqResponse=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${process.env.GROQ_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.GROQ_MODEL||'openai/gpt-oss-20b',messages:[{role:'system',content:'Return only complete valid Romanian JSON matching the requested shape. Keep values concise and use no language objects.'},{role:'user',content:prompt}],temperature:.1,reasoning_effort:'low',max_completion_tokens:3600,response_format:{type:'json_object'}})});
    if(!groqResponse.ok) throw new Error(`Groq returned ${groqResponse.status}: ${(await groqResponse.text()).slice(0,300)}`);
    const groq=await groqResponse.json() as {choices?:{message?:{content?:string}}[]};
    const generated=JSON.parse(groq.choices?.[0]?.message?.content||'{}');
    const imageAt=(index:number)=>images.length?images[index%images.length]:'';
    const rawProperty=generated.property||{};
    const property={...rawProperty,name:plainValue(rawProperty.name),type:plainValue(rawProperty.type),address:extractedLocation.address||plainValue(rawProperty.address),cityRegion:plainValue(rawProperty.cityRegion),phone:plainValue(rawProperty.phone),whatsapp:plainValue(rawProperty.whatsapp),email:plainValue(rawProperty.email),startingPriceRON:numberValue(rawProperty.startingPriceRON),rating:numberValue(rawProperty.rating),reviewCount:numberValue(rawProperty.reviewCount),heroTitle:plainValue(rawProperty.heroTitle),shortDescription:plainValue(rawProperty.shortDescription),fullDescription:plainValue(rawProperty.fullDescription),...(Number.isFinite(extractedLocation.latitude)&&Number.isFinite(extractedLocation.longitude)?{latitude:extractedLocation.latitude,longitude:extractedLocation.longitude}:{})};
    const nearbyNature=/\b(?:r(?:a|\u00e2)u(?:l)?|p(?:a|\u0103)dure|munte(?:le)?|lac(?:ul)?|cascad(?:a|\u0103)|pe(?:s|\u0219)ter(?:a|\u0103)|rezerva(?:t|\u021b)ie|parc natural)\b/i;
    const allFacilities=(generated.facilities||[]).map(plainValue).filter(Boolean);
    const misplacedNearby=allFacilities.filter((item:string)=>nearbyNature.test(item));
    const facilities=allFacilities.filter((item:string)=>!nearbyNature.test(item));
    const rooms=(generated.rooms||[]).map((room:any,index:number)=>({...room,title:plainValue(room.title),description:plainValue(room.description),amenities:(room.amenities||[]).map(plainValue).filter((item:string)=>item&&!nearbyNature.test(item)),images:[imageAt(index+1),imageAt(index+4)].filter(Boolean)}));
    const nearbyLabel='\u00cen apropiere';
    const attractions=(generated.attractions||[]).map((item:any,index:number)=>({...item,title:plainValue(item.title),description:plainValue(item.description),distance:item.source==='groq-mock'?nearbyLabel:plainValue(item.distance)||nearbyLabel,image:imageAt(index+7)}));
    for(const item of misplacedNearby){if(!attractions.some((attraction:any)=>plainValue(attraction.title).toLocaleLowerCase('ro').includes(item.toLocaleLowerCase('ro'))||item.toLocaleLowerCase('ro').includes(plainValue(attraction.title).toLocaleLowerCase('ro'))))attractions.push({title:item.charAt(0).toLocaleUpperCase('ro')+item.slice(1),description:'Punct de interes natural \u00een apropierea propriet\u0103\u021bii.',distance:nearbyLabel,source:'groq-mock',image:imageAt(attractions.length+7)});}
    const reviews=(generated.reviews||[]).slice(0,3).map((review:any)=>({...review,author:plainValue(review.author),location:plainValue(review.location),date:plainValue(review.date),comment:plainValue(review.comment)}));
    const demo={schemaVersion:1,slug:slugify(plainValue(generated.slug)||property.name||'hospitality-demo'),sourceUrl:source.href,generatedAt:new Date().toISOString(),status:'draft',property,images,facilities,rooms,attractions,reviews,provenance:generated.provenance||{}};
    return send(res,200,{demo,reviewsUrl,imageCount:images.length});
  } catch(error) { return send(res,400,{error:error instanceof Error?error.message:'Import failed'}); }
}
