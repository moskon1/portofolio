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
  const propertyImages=new Set<string>();
  const fallbackImages=new Set<string>();
  const attributes=/(?:src|data-src|data-original|href)=["']([^"']+)["']/gi;
  for(const match of html.matchAll(attributes)) {
    try {
      const url=new URL(match[1].replace(/&amp;/g,'&'),base);
      if(!/(^|\.)turistinfo\.ro$/i.test(url.hostname) || !/\.(?:jpe?g|png|webp|avif)(?:$|\?)/i.test(url.href)) continue;
      if(/(?:favicon|apple-touch-icon|logo|sprite|icon-|\/icons?\/)/i.test(url.pathname)) continue;
      if(/\/images\/cazare\//i.test(url.pathname)) propertyImages.add(url.href);
      else fallbackImages.add(url.href);
    } catch { /* ignore malformed source attributes */ }
  }
  return [...propertyImages,...fallbackImages].slice(0,80);
}

export function findReviewsUrl(html:string,base:URL) {
  for(const match of html.matchAll(/href=["']([^"']*(?:reviews|recenzii)[^"']*)["']/gi)) {
    try { const url=new URL(match[1].replace(/&amp;/g,'&'),base); if(/(^|\.)turistinfo\.ro$/i.test(url.hostname)) return url.href; } catch { /* ignore */ }
  }
  return '';
}

export function extractPropertyLocation(html:string,text:string) {
  const coordinatePatterns = [
    /["']?lat(?:itude)?["']?\s*[:=]\s*["']?(-?\d{2}\.\d+)["']?[\s\S]{0,160}?["']?(?:lng|lon|longitude)["']?\s*[:=]\s*["']?(-?\d{2}\.\d+)["']?/i,
    /["']?(?:lng|lon|longitude)["']?\s*[:=]\s*["']?(-?\d{2}\.\d+)["']?[\s\S]{0,160}?["']?lat(?:itude)?["']?\s*[:=]\s*["']?(-?\d{2}\.\d+)["']?/i,
    /data-lat=["'](-?\d{2}\.\d+)["'][^>]{0,200}data-(?:lng|lon)=["'](-?\d{2}\.\d+)["']/i,
    /(?:q=|query=)(-?\d{2}\.\d+)%?2C\s*(-?\d{2}\.\d+)/i,
  ];
  let latitude:number|undefined; let longitude:number|undefined;
  for(let index=0;index<coordinatePatterns.length;index++) {
    const match=html.match(coordinatePatterns[index]); if(!match)continue;
    const reversed=index===1; latitude=Number(match[reversed?2:1]); longitude=Number(match[reversed?1:2]); break;
  }
  const addressMatch=text.match(/(?:[A-Z]{1,2},\s*)?([\p{L}\s-]{2,40})\s*,\s*((?:str(?:ada)?\.?|bd\.?|bulevardul|calea|aleea)\s+[\p{L}\d\s.'-]{2,60},\s*nr\.?\s*[\w/-]+)/iu);
  const address=addressMatch ? `${addressMatch[1].trim()}, ${addressMatch[2].trim()}, Rom\u00e2nia` : '';
  return { address, latitude, longitude };
}
