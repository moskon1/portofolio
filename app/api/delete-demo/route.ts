import handler from '@/src/server/delete-demo';
import { runLegacyHandler } from '../_adapter';
export const DELETE = (request: Request) => runLegacyHandler(request, handler);
