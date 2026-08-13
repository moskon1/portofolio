import type { Metadata } from 'next';
import fs from 'node:fs/promises';
import path from 'node:path';
import GeneratedHospitalityDemo from '@/src/views/GeneratedHospitalityDemo';
import type { GeneratedHospitalityDemo as Demo } from '@/src/tourism-theme/src/generated/types';
import { demoText } from '@/src/tourism-theme/src/generated/types';

const directory = path.join(process.cwd(),'public','generated-demos');
async function readDemo(slug:string):Promise<Demo|null>{try{return JSON.parse(await fs.readFile(path.join(directory,`${slug}.json`),'utf8')) as Demo;}catch{return null;}}
export async function generateStaticParams(){try{return (await fs.readdir(directory)).filter(file=>file.endsWith('.json')).map(file=>({slug:file.replace(/\.json$/,'')}));}catch{return [];}}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;if(slug==='preview')return{robots:{index:false,follow:false}};const demo=await readDemo(slug);if(!demo)return{title:'Demo indisponibil',robots:{index:false,follow:false}};const name=demo.property.name;const description=demoText(demo.property.shortDescription,'ro')||demoText(demo.property.fullDescription,'ro');return{title:`${name} — Cazare ${demo.property.cityRegion}`.trim(),description,alternates:{canonical:`/demo/${slug}`},robots:{index:true,follow:true},openGraph:{title:name,description,images:[demo.heroImage||demo.images[0]].filter(Boolean)}};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const demo=slug==='preview'?null:await readDemo(slug);const schema=demo?{'@context':'https://schema.org','@type':'LodgingBusiness',name:demo.property.name,description:demoText(demo.property.fullDescription,'ro'),url:`https://www.nodestack.pro/demo/${slug}`,image:demo.images,address:demo.property.address,telephone:demo.property.phone,priceRange:demo.property.startingPriceRON?`De la ${demo.property.startingPriceRON} RON`:undefined,containedInPlace:demo.attractions.map(item=>({'@type':'TouristAttraction',name:demoText(item.title,'ro'),description:demoText(item.description,'ro')}))}:null;return <>{schema&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>}<GeneratedHospitalityDemo slug={slug} initialDemo={demo}/></>;}
