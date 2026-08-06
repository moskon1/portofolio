import { useEffect, useState } from 'react';
import { ExternalLink, Github, Loader2, Save, Sparkles } from 'lucide-react';
import type { GeneratedHospitalityDemo } from '@/src/tourism-theme/src/generated/types';

export default function HospitalityAdmin() {
  const [secret,setSecret] = useState(()=>sessionStorage.getItem('nodestack-admin-secret') || '');
  const [sourceUrl,setSourceUrl] = useState('');
  const [demo,setDemo] = useState<GeneratedHospitalityDemo|null>(null);
  const [json,setJson] = useState('');
  const [busy,setBusy] = useState<'import'|'publish'|''>('');
  const [message,setMessage] = useState('');

  useEffect(()=>{ if(demo) setJson(JSON.stringify(demo,null,2)); },[demo]);
  const headers = {'Content-Type':'application/json','x-admin-secret':secret};
  const importListing = async () => {
    setBusy('import'); setMessage(''); sessionStorage.setItem('nodestack-admin-secret',secret);
    try {
      const response=await fetch('/api/import-demo',{method:'POST',headers,body:JSON.stringify({sourceUrl})});
      const value=await response.json(); if(!response.ok) throw new Error(value.error||'Import failed');
      setDemo(value.demo); setMessage('Import complete. Review every generated field before publishing.');
    } catch(error) { setMessage(error instanceof Error?error.message:'Import failed'); } finally { setBusy(''); }
  };
  const applyJson = () => { try { setDemo(JSON.parse(json)); setMessage('JSON changes applied.'); } catch { setMessage('The JSON is invalid.'); } };
  const preview = () => { if(!demo)return; sessionStorage.setItem('nodestack-demo-preview',JSON.stringify(demo)); window.open('/demo/preview','_blank'); };
  const publish = async () => {
    if(!demo)return; setBusy('publish'); setMessage('');
    try {
      const response=await fetch('/api/publish-demo',{method:'POST',headers,body:JSON.stringify({demo})});
      const value=await response.json(); if(!response.ok) throw new Error(value.error||'Publish failed');
      setMessage(`Committed to GitHub. The demo will be available after deployment: ${value.path}`);
    } catch(error) { setMessage(error instanceof Error?error.message:'Publish failed'); } finally { setBusy(''); }
  };

  return <main className="min-h-screen bg-slate-950 text-slate-200 p-4 sm:p-8"><div className="max-w-7xl mx-auto">
    <div className="flex flex-col sm:flex-row justify-between gap-5 mb-10"><div><p className="text-emerald-400 font-mono text-xs uppercase tracking-widest">Internal tool · noindex</p><h1 className="text-3xl sm:text-5xl font-bold mt-3">Hospitality demo generator</h1><p className="text-slate-500 mt-3">Import a TuristInfo listing, review AI-assisted demo data, then publish through GitHub.</p></div><a href="/" className="text-sm text-slate-500">← NodeStack</a></div>
    <section className="rounded-3xl border border-white/10 bg-white/[.035] p-6 mb-7"><div className="grid lg:grid-cols-[.7fr_1.6fr_auto] gap-4 items-end"><label className="text-xs font-bold text-slate-400">Admin secret<input type="password" value={secret} onChange={e=>setSecret(e.target.value)} className="mt-2 w-full rounded-xl bg-slate-900 border border-white/10 p-3 text-white outline-none focus:border-emerald-400"/></label><label className="text-xs font-bold text-slate-400">TuristInfo listing URL<input type="url" value={sourceUrl} onChange={e=>setSourceUrl(e.target.value)} placeholder="https://www.turistinfo.ro/..." className="mt-2 w-full rounded-xl bg-slate-900 border border-white/10 p-3 text-white outline-none focus:border-emerald-400"/></label><button disabled={!secret||!sourceUrl||!!busy} onClick={importListing} className="h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 px-6 font-bold text-white flex items-center justify-center gap-2">{busy==='import'?<Loader2 className="animate-spin"/>:<Sparkles/>}Import & generate</button></div></section>
    {message&&<div className="rounded-xl border border-blue-400/20 bg-blue-400/10 px-5 py-4 mb-7 text-sm text-blue-100">{message}</div>}
    {demo&&<div className="grid xl:grid-cols-[.75fr_1.25fr] gap-7"><aside className="space-y-5"><div className="rounded-3xl border border-white/10 bg-white/[.035] p-6"><p className="text-xs uppercase tracking-widest text-slate-500">Imported property</p><h2 className="text-2xl mt-2">{demo.property.name}</h2><p className="text-sm text-slate-500 mt-2">/{demo.slug}</p><div className="grid grid-cols-2 gap-3 mt-6 text-sm"><div className="rounded-xl bg-slate-900 p-3"><b className="block text-white">{demo.images.length}</b>images</div><div className="rounded-xl bg-slate-900 p-3"><b className="block text-white">{demo.reviews.length}</b>real reviews</div><div className="rounded-xl bg-slate-900 p-3"><b className="block text-white">{demo.rooms.length}</b>room cards</div><div className="rounded-xl bg-slate-900 p-3"><b className="block text-white">{demo.facilities.length}</b>facilities</div></div></div><div className="rounded-3xl border border-white/10 bg-white/[.035] p-6"><p className="text-xs uppercase tracking-widest text-slate-500 mb-4">Image check</p><div className="grid grid-cols-3 gap-2">{demo.images.slice(0,12).map((image,i)=><img key={i} src={image} alt="" referrerPolicy="no-referrer" className="aspect-square object-cover rounded-lg bg-slate-900"/>)}</div></div></aside><section><div className="flex flex-wrap gap-3 mb-4"><button onClick={applyJson} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold flex gap-2"><Save className="h-4 w-4"/>Apply JSON</button><button onClick={preview} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold flex gap-2"><ExternalLink className="h-4 w-4"/>Preview</button><button disabled={!!busy} onClick={publish} className="rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white flex gap-2 disabled:opacity-40">{busy==='publish'?<Loader2 className="h-4 w-4 animate-spin"/>:<Github className="h-4 w-4"/>}Commit & deploy</button></div><textarea value={json} onChange={e=>setJson(e.target.value)} spellCheck={false} className="w-full min-h-[75vh] rounded-2xl bg-[#080d19] border border-white/10 p-5 font-mono text-xs leading-5 text-slate-300 outline-none focus:border-brand"/></section></div>}
  </div></main>;
}
