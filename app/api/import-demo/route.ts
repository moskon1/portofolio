import handler from '@/src/server/import-demo';
import { runLegacyHandler } from '../_adapter';
export const maxDuration = 60;
export const POST = (request: Request) => runLegacyHandler(request, handler);
