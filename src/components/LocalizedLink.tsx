'use client';

import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { useLocale } from '@/src/lib/i18n';

type Props = LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & { children?: ReactNode };
export default function LocalizedLink({ href, children, ...props }: Props) {
  const { locale } = useLocale();
  const localizedHref = typeof href === 'string' && href.startsWith('/') && !href.startsWith('/demo/') && !href.startsWith('/admin/')
    ? `/${locale}${href === '/' ? '' : href}`
    : href;
  return <Link href={localizedHref} {...props}>{children}</Link>;
}
