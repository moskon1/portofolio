import type { Metadata } from 'next';
import GeneratedHospitalityDemo from '@/src/views/GeneratedHospitalityDemo';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <GeneratedHospitalityDemo slug={slug} />;
}
