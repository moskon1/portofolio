import handler from '@/src/server/publish-demo';
import { runLegacyHandler } from '../_adapter';
export const POST = (request: Request) => runLegacyHandler(request, handler);
