import type { IncomingMessage, ServerResponse } from 'node:http';

export type ApiRequest = IncomingMessage & { body?: unknown };
export type ApiResponse = ServerResponse & { status:(code:number)=>ApiResponse; json:(value:unknown)=>void };

export function send(res: ApiResponse, status: number, value: unknown) {
  res.statusCode=status; res.setHeader('Content-Type','application/json; charset=utf-8'); res.end(JSON.stringify(value));
}

export function authorized(req: ApiRequest) {
  const provided=req.headers['x-admin-secret'];
  const expected=process.env.ADMIN_SECRET;
  return Boolean(expected && typeof provided==='string' && provided===expected);
}

export async function body<T>(req: ApiRequest):Promise<T> {
  if(req.body && typeof req.body==='object') return req.body as T;
  let raw=''; for await(const chunk of req) raw+=chunk; return JSON.parse(raw||'{}') as T;
}

export function slugify(value:string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80);
}

export function validateSource(value:string) {
  const url=new URL(value);
  if(url.protocol!=='https:' || !/(^|\.)turistinfo\.ro$/i.test(url.hostname)) throw new Error('Only HTTPS TuristInfo URLs are allowed.');
  return url;
}

export function htmlToText(html:string) {
  return html.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
}

export function extractImageUrls(html:string, base:URL) {
  const found=new Set<string>();
  const attributes=/(?:src|data-src|data-original|href)=["']([^"']+)["']/gi;
  for(const match of html.matchAll(attributes)) {
    try {
      const url=new URL(match[1].replace(/&amp;/g,'&'),base);
      if(/(^|\.)turistinfo\.ro$/i.test(url.hostname) && /\.(?:jpe?g|png|webp|avif)(?:$|\?)/i.test(url.href)) found.add(url.href);
    } catch { /* ignore malformed source attributes */ }
  }
  return [...found].slice(0,80);
}

export function findReviewsUrl(html:string,base:URL) {
  for(const match of html.matchAll(/href=["']([^"']*(?:reviews|recenzii)[^"']*)["']/gi)) {
    try { const url=new URL(match[1].replace(/&amp;/g,'&'),base); if(/(^|\.)turistinfo\.ro$/i.test(url.hostname)) return url.href; } catch { /* ignore */ }
  }
  return '';
}
