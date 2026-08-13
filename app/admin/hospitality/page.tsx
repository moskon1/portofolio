import type { Metadata } from 'next';
import HospitalityAdmin from '@/src/views/HospitalityAdmin';

export const metadata: Metadata = { robots: { index: false, follow: false } };
export default function Page() { return <HospitalityAdmin />; }
