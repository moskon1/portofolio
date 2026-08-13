import type { ApiRequest, ApiResponse } from '@/src/server/_shared';

type LegacyHandler = (req: ApiRequest, res: ApiResponse) => unknown;

export async function runLegacyHandler(request: Request, handler: LegacyHandler) {
  const headers = Object.fromEntries(request.headers.entries());
  const requestBody = request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.json().catch(() => ({}));
  const legacyRequest = { method: request.method, headers, body: requestBody } as unknown as ApiRequest;
  let status = 200;
  let payload: unknown = null;
  const responseHeaders = new Headers();
  const legacyResponse = {
    statusCode: 200,
    setHeader(name: string, value: string) { responseHeaders.set(name, value); },
    end(value?: string) { status = this.statusCode; payload = value ? JSON.parse(value) : null; },
    status(code: number) { this.statusCode = code; return this; },
    json(value: unknown) { payload = value; },
  } as unknown as ApiResponse;
  await handler(legacyRequest, legacyResponse);
  return Response.json(payload, { status, headers: responseHeaders });
}
