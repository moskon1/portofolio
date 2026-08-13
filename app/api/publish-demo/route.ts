import handler from '@/api/publish-demo';
import { runLegacyHandler } from '../_adapter';
export const POST = (request: Request) => runLegacyHandler(request, handler);
