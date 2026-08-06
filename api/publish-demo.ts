import type { ApiRequest, ApiResponse } from './_shared.js';
import { authorized, body, send, slugify } from './_shared.js';

export default async function handler(req:ApiRequest,res:ApiResponse) {
  if(req.method!=='POST') return send(res,405,{error:'Method not allowed'});
  if(!authorized(req)) return send(res,401,{error:'Invalid admin secret'});
  try {
    const token=process.env.GITHUB_TOKEN; if(!token) throw new Error('GITHUB_TOKEN is not configured.');
    const {demo}=await body<{demo:any}>(req); const slug=slugify(demo?.slug||''); if(!slug) throw new Error('A valid slug is required.');
    if(!demo?.property?.name || !Array.isArray(demo.images)) throw new Error('The demo payload is incomplete.');
    demo.slug=slug; demo.status='published'; demo.generatedAt=new Date().toISOString();
    const owner=process.env.GITHUB_OWNER||'moskon1'; const repo=process.env.GITHUB_REPO||'portofolio'; const branch=process.env.GITHUB_BRANCH||'main';
    const filePath=`public/generated-demos/${slug}.json`; const api=`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
    const headers={Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','User-Agent':'NodeStack-Demo-Publisher'};
    const current=await fetch(`${api}?ref=${encodeURIComponent(branch)}`,{headers}); let sha:string|undefined;
    if(current.ok) sha=((await current.json()) as {sha:string}).sha; else if(current.status!==404) throw new Error(`GitHub lookup failed (${current.status}).`);
    const content=Buffer.from(`${JSON.stringify(demo,null,2)}\n`).toString('base64');
    const commit=await fetch(api,{method:'PUT',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({message:`Publish hospitality demo: ${slug}`,content,branch,...(sha?{sha}:{})})});
    if(!commit.ok) throw new Error(`GitHub publish failed (${commit.status}): ${(await commit.text()).slice(0,300)}`);
    return send(res,200,{ok:true,path:`/demo/${slug}`,filePath});
  } catch(error) { return send(res,400,{error:error instanceof Error?error.message:'Publish failed'}); }
}
