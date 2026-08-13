import handler from '@/api/delete-demo';
import { runLegacyHandler } from '../_adapter';
export const DELETE = (request: Request) => runLegacyHandler(request, handler);
