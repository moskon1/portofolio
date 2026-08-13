import handler from '@/api/list-demos';
import { runLegacyHandler } from '../_adapter';
export const dynamic = 'force-dynamic';
export const GET = (request: Request) => runLegacyHandler(request, handler);
