import { NextRequest } from 'next/server';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  if (!process.env.ADMIN_SECRET || request.headers.get('x-admin-secret') !== process.env.ADMIN_SECRET) return Response.json({ error: 'Invalid admin secret' }, { status: 401 });
  try {
    const { name, location, distance } = await request.json() as { name?: string; location?: string; distance?: string };
    if (!name?.trim()) throw new Error('Enter the attraction name in Romanian first.');
    if (!process.env.GROQ_API_KEY) throw new Error('GROQ_API_KEY is not configured.');
    const commonsUrl = new URL('https://commons.wikimedia.org/w/api.php');
    commonsUrl.search = new URLSearchParams({ action:'query', generator:'search', gsrsearch:`${name} ${location || 'Romania'} filetype:bitmap`, gsrnamespace:'6', gsrlimit:'6', prop:'imageinfo', iiprop:'url|mime', iiurlwidth:'1200', format:'json', origin:'*' }).toString();
    const commons = await fetch(commonsUrl, { headers: { 'User-Agent': 'NodeStackHospitality/1.0 (https://www.nodestack.pro)' } }).then(response => response.json()) as { query?: { pages?: Record<string,{title:string;imageinfo?:{url?:string;thumburl?:string;mime?:string}[]}> } };
    const candidates = Object.values(commons.query?.pages || {}).filter(page => page.imageinfo?.[0]?.mime?.startsWith('image/'));
    const image = candidates[0]?.imageinfo?.[0]?.thumburl || candidates[0]?.imageinfo?.[0]?.url || '';
    const prompt = `Write accurate, useful SEO copy for a nearby tourist attraction. Attraction: ${name}. Property location: ${location || 'Romania'}. Distance: ${distance || 'nearby'}. Return JSON only: {"title":{"ro":"","en":"","de":"","no":""},"description":{"ro":"","en":"","de":"","no":""}}. Keep the official proper name in every title. Each description must be unique, factual, natural, 35-55 words, and explain why a guest should visit. Do not invent opening hours, prices, rankings, or exact travel times.`;
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${process.env.GROQ_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.GROQ_MODEL||'openai/gpt-oss-20b',messages:[{role:'system',content:'Return only valid multilingual JSON. Never invent facts.'},{role:'user',content:prompt}],temperature:.2,max_completion_tokens:900,response_format:{type:'json_object'}})});
    if (!response.ok) throw new Error(`Groq returned ${response.status}.`);
    const data = await response.json() as { choices?: { message?: { content?: string } }[] };
    const copy = JSON.parse(data.choices?.[0]?.message?.content || '{}');
    return Response.json({ attraction: { ...copy, distance: distance || 'În apropiere', image, source: 'groq-rewritten' }, commonsCandidates: candidates.slice(0,6).map(page=>({ title:page.title, image:page.imageinfo?.[0]?.thumburl || page.imageinfo?.[0]?.url })) });
  } catch (error) { return Response.json({ error: error instanceof Error ? error.message : 'Could not generate attraction' }, { status: 400 }); }
}
