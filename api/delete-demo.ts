import type { ApiRequest, ApiResponse } from './_shared';
import { authorized, body, send, slugify } from './_shared';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'DELETE') return send(res, 405, { error: 'Method not allowed' });
  if (!authorized(req)) return send(res, 401, { error: 'Invalid admin secret' });
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) throw new Error('GITHUB_TOKEN is not configured.');
    const requestBody = await body<{ slug: string }>(req);
    const slug = slugify(requestBody.slug || '');
    if (!slug || slug !== requestBody.slug) throw new Error('A valid demo slug is required.');
    const owner = process.env.GITHUB_OWNER || 'moskon1';
    const repo = process.env.GITHUB_REPO || 'portofolio';
    const branch = process.env.GITHUB_BRANCH || 'main';
    const path = `public/generated-demos/${slug}.json`;
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const headers = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'NodeStack-Demo-Publisher' };
    const lookup = await fetch(`${url}?ref=${encodeURIComponent(branch)}`, { headers });
    if (lookup.status === 404) return send(res, 404, { error: 'Demo not found.' });
    if (!lookup.ok) throw new Error(`GitHub lookup failed (${lookup.status}).`);
    const { sha } = await lookup.json() as { sha: string };
    const deletion = await fetch(url, { method: 'DELETE', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify({ message: `Delete hospitality demo: ${slug}`, sha, branch }) });
    if (!deletion.ok) throw new Error(`GitHub deletion failed (${deletion.status}): ${(await deletion.text()).slice(0,300)}`);
    return send(res, 200, { ok: true, slug });
  } catch (error) {
    return send(res, 400, { error: error instanceof Error ? error.message : 'Delete failed' });
  }
}
