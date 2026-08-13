'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TourismApp from '@/src/tourism-theme/src/App';
import type { GeneratedHospitalityDemo } from '@/src/tourism-theme/src/generated/types';

export default function GeneratedHospitalityDemo({ slug }: { slug: string }) {
  const [demo,setDemo] = useState<GeneratedHospitalityDemo|null>(null);
  const [error,setError] = useState('');

  useEffect(()=>{
    document.querySelector('meta[name="robots"]')?.setAttribute('content','noindex, nofollow, noarchive');
    if(slug==='preview'){
      const value=sessionStorage.getItem('nodestack-demo-preview');
      if(value){try{setDemo(JSON.parse(value));}catch{setError('Datele de previzualizare sunt invalide.');}}
      else setError('Datele de previzualizare lipsesc.');
      return;
    }
    fetch(`/generated-demos/${encodeURIComponent(slug)}.json`,{cache:'no-store'})
      .then(response=>{if(!response.ok)throw new Error('Demo-ul nu a fost gÄƒsit.');return response.json();})
      .then(setDemo).catch(error=>setError(error.message));
  },[slug]);

  if(error)return <div className="min-h-screen bg-slate-950 text-white grid place-items-center text-center p-6"><div><h1 className="text-3xl mb-3">Demo indisponibil</h1><p className="text-slate-400 mb-6">{error}</p><Link href="/" className="text-emerald-400">NodeStack</Link></div></div>;
  if(!demo)return <div className="min-h-screen bg-slate-950 grid place-items-center"><div className="h-9 w-9 rounded-full border-2 border-amber-400 border-t-transparent animate-spin"/></div>;
  return <TourismApp generatedDemo={demo}/>;
}
