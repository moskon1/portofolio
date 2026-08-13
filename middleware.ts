import { NextRequest, NextResponse } from 'next/server';

const locales = ['ro', 'en', 'de', 'no'];
const publicPath = /^\/(?:portfolio|contact|services(?:\/.*)?|demos\/hospitality)?\/?$/;

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const segments = url.pathname.split('/').filter(Boolean);
  const pathLocale = locales.includes(segments[0]) ? segments[0] : undefined;
  const queryLocale = url.searchParams.get('lang');
  const cookieLocale = request.cookies.get('nodestack-locale')?.value;
  const locale = locales.includes(queryLocale || '') ? queryLocale! : pathLocale || (locales.includes(cookieLocale || '') ? cookieLocale! : 'ro');

  if (pathLocale) {
    if (!queryLocale) return NextResponse.next();
    segments[0] = locale;
    url.pathname = `/${segments.join('/')}`;
  } else if (publicPath.test(url.pathname)) {
    url.pathname = `/${locale}${url.pathname === '/' ? '' : url.pathname.replace(/\/$/, '')}`;
  } else {
    return NextResponse.next();
  }
  url.searchParams.delete('lang');
  return NextResponse.redirect(url, 308);
}

export const config = { matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'] };
