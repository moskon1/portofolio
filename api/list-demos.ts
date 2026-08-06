import type { ApiRequest, ApiResponse } from './_shared.js';
import { authorized, send } from './_shared.js';

type GitHubFile = { name: string; type: string; download_url: string | null };

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'GET') return send(res, 405, { error: 'Method not allowed' });
  if (!authorized(req)) return send(res, 401, { error: 'Invalid admin secret' });
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) throw new Error('GITHUB_TOKEN is not configured.');
    const owner = process.env.GITHUB_OWNER || 'moskon1';
    const repo = process.env.GITHUB_REPO || 'portofolio';
    const branch = process.env.GITHUB_BRANCH || 'main';
    const headers = { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'NodeStack-Demo-Publisher' };
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/public/generated-demos?ref=${encodeURIComponent(branch)}`;
    const directoryResponse = await fetch(url, { headers });
    if (directoryResponse.status === 404) return send(res, 200, { demos: [] });
    if (!directoryResponse.ok) throw new Error(`GitHub demo lookup failed (${directoryResponse.status}).`);
    const files = (await directoryResponse.json()) as GitHubFile[];
    const demos = (await Promise.all(files.filter(file => file.type === 'file' && file.name.endsWith('.json') && file.download_url).map(async file => {
      const response = await fetch(file.download_url!, { headers });
      if (!response.ok) return null;
      try { return await response.json() as Record<string, unknown>; } catch { return null; }
    }))).filter((demo): demo is Record<string, unknown> => Boolean(demo)).sort((a,b)=>String(b.generatedAt||'').localeCompare(String(a.generatedAt||'')));
    return send(res, 200, { demos });
  } catch (error) {
    return send(res, 400, { error: error instanceof Error ? error.message : 'Could not load demos' });
  }
}
