import { motion } from 'motion/react';
import {
  ArrowRight, BarChart3, CalendarCheck, Check, CheckCircle2, Cloud,
  Code2, CreditCard, Gauge, Globe2, Hotel, Layers3, Search,
  ShieldCheck, Sparkles, TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { localize, useLocale } from '@/src/lib/i18n';

type ServiceKey = 'websites' | 'hospitality' | 'seo' | 'web-applications';
type Copy = { ro: string; en: string; de: string; no: string };

const serviceMeta = {
  websites: { icon: Globe2, number: '01', color: 'from-blue-500 to-cyan-400' },
  hospitality: { icon: Hotel, number: '02', color: 'from-emerald-500 to-teal-400' },
  seo: { icon: Search, number: '03', color: 'from-amber-500 to-orange-400' },
  'web-applications': { icon: Code2, number: '04', color: 'from-cyan-500 to-blue-500' },
} as const;

const copy = (ro: string, en: string, de: string, no: string): Copy => ({ ro, en, de, no });

const content = {
  websites: {
    eyebrow: copy('Website-uri de prezentare', 'Business websites', 'Unternehmenswebsites', 'Bedriftsnettsider'),
    title: copy('Prima impresie care aduce clienți.', 'A first impression that wins clients.', 'Ein erster Eindruck, der Kunden gewinnt.', 'Et førsteinntrykk som vinner kunder.'),
    subtitle: copy('Construim website-uri rapide, clare și convingătoare pentru afaceri care vor să inspire încredere și să genereze solicitări.', 'We build fast, clear and persuasive websites for businesses that want to earn trust and generate enquiries.', 'Wir entwickeln schnelle, klare und überzeugende Websites, die Vertrauen schaffen und Anfragen generieren.', 'Vi bygger raske, tydelige og overbevisende nettsider som skaper tillit og henvendelser.'),
    result: copy('Mai mult decât o carte de vizită', 'More than a digital business card', 'Mehr als eine digitale Visitenkarte', 'Mer enn et digitalt visittkort'),
    resultText: copy('Fiecare pagină conduce vizitatorul spre o acțiune: apel, WhatsApp sau cerere de ofertă.', 'Every page guides visitors towards a call, WhatsApp conversation or quote request.', 'Jede Seite führt Besucher gezielt zu Anruf, WhatsApp oder Angebotsanfrage.', 'Hver side leder besøkende mot samtale, WhatsApp eller tilbudsforespørsel.'),
    metrics: [copy('Design adaptat brandului', 'Brand-led design', 'Markengerechtes Design', 'Design tilpasset merkevaren'), copy('Încărcare rapidă', 'Fast loading', 'Schnelle Ladezeit', 'Rask lasting'), copy('Pregătit pentru Google', 'Google-ready', 'Bereit für Google', 'Klar for Google')],
    items: [copy('Structură și strategie de conținut', 'Content structure and strategy', 'Inhaltsstruktur und Strategie', 'Innholdsstruktur og strategi'), copy('Design responsive personalizat', 'Custom responsive design', 'Individuelles responsives Design', 'Tilpasset responsivt design'), copy('Formulare și acțiuni de contact', 'Forms and contact actions', 'Formulare und Kontaktaktionen', 'Skjemaer og kontakthandlinger'), copy('SEO tehnic și on-page de bază', 'Technical and basic on-page SEO', 'Technische und grundlegende On-Page-SEO', 'Teknisk og grunnleggende on-page SEO'), copy('Domeniu, SSL și Cloudflare', 'Domain, SSL and Cloudflare', 'Domain, SSL und Cloudflare', 'Domene, SSL og Cloudflare'), copy('Analytics și Search Console', 'Analytics and Search Console', 'Analytics und Search Console', 'Analytics og Search Console')],
    visual: 'website',
  },
  hospitality: {
    eyebrow: copy('Hoteluri, vile și pensiuni', 'Hotels, villas & guesthouses', 'Hotels, Villen & Pensionen', 'Hoteller, villaer og gjestehus'),
    title: copy('Transformă vizitele în rezervări directe.', 'Turn visits into direct bookings.', 'Machen Sie aus Besuchen Direktbuchungen.', 'Gjør besøk til direktebestillinger.'),
    subtitle: copy('O prezență digitală premium care prezintă experiența proprietății și reduce dependența de platformele cu comision.', 'A premium digital presence that showcases the guest experience and reduces reliance on commission-based platforms.', 'Ein hochwertiger digitaler Auftritt, der das Gästeerlebnis präsentiert und die Abhängigkeit von Provisionsplattformen reduziert.', 'En førsteklasses digital tilstedeværelse som viser gjesteopplevelsen og reduserer avhengigheten av provisjonsplattformer.'),
    result: copy('Proprietatea ta, rezervată direct', 'Your property, booked directly', 'Ihre Unterkunft, direkt gebucht', 'Din eiendom, bestilt direkte'),
    resultText: copy('Camere, facilități, galerie, atracții și disponibilitate într-o experiență creată să convingă.', 'Rooms, facilities, galleries, attractions and availability in one experience built to persuade.', 'Zimmer, Ausstattung, Galerie, Attraktionen und Verfügbarkeit in einem überzeugenden Erlebnis.', 'Rom, fasiliteter, galleri, attraksjoner og tilgjengelighet i én overbevisende opplevelse.'),
    metrics: [copy('Mai multe rezervări directe', 'More direct bookings', 'Mehr Direktbuchungen', 'Flere direktebestillinger'), copy('Calendar sincronizat', 'Synced calendar', 'Synchronisierter Kalender', 'Synkronisert kalender'), copy('Experiență multilingvă', 'Multilingual experience', 'Mehrsprachiges Erlebnis', 'Flerspråklig opplevelse')],
    items: [copy('Pagini pentru camere și facilități', 'Room and facility pages', 'Zimmer- und Ausstattungsseiten', 'Sider for rom og fasiliteter'), copy('Galerii și atracții locale', 'Galleries and local attractions', 'Galerien und lokale Attraktionen', 'Gallerier og lokale attraksjoner'), copy('Rezervări directe și plăți', 'Direct bookings and payments', 'Direktbuchungen und Zahlungen', 'Direktebestilling og betaling'), copy('Booking.com, Airbnb și iCal', 'Booking.com, Airbnb and iCal', 'Booking.com, Airbnb und iCal', 'Booking.com, Airbnb og iCal'), copy('Google Business și Google Travel', 'Google Business and Google Travel', 'Google Business und Google Travel', 'Google Business og Google Travel'), copy('SEO local și promovare video', 'Local SEO and video promotion', 'Lokale SEO und Video-Promotion', 'Lokal SEO og videopromotering')],
    visual: 'hotel',
  },
  seo: {
    eyebrow: copy('Optimizare SEO', 'Search visibility', 'SEO-Optimierung', 'SEO-optimalisering'),
    title: copy('Fii găsit exact când contează.', 'Be found when it matters most.', 'Gefunden werden, wenn es darauf ankommt.', 'Bli funnet når det betyr mest.'),
    subtitle: copy('Îmbunătățim fundația tehnică, conținutul și prezența locală pentru trafic relevant și creștere măsurabilă.', 'We improve technical foundations, content and local presence for qualified traffic and measurable growth.', 'Wir verbessern Technik, Inhalte und lokale Präsenz für qualifizierten Traffic und messbares Wachstum.', 'Vi forbedrer teknisk grunnlag, innhold og lokal synlighet for relevant trafikk og målbar vekst.'),
    result: copy('Vizibilitate care produce rezultate', 'Visibility that drives results', 'Sichtbarkeit, die Ergebnisse liefert', 'Synlighet som gir resultater'),
    resultText: copy('Deciziile sunt bazate pe date, iar progresul este urmărit prin obiective și rapoarte clare.', 'Decisions are based on data, with progress tracked through clear goals and reporting.', 'Entscheidungen basieren auf Daten, Fortschritte werden mit klaren Zielen und Berichten verfolgt.', 'Beslutninger baseres på data, med fremgang målt gjennom tydelige mål og rapportering.'),
    metrics: [copy('Audit tehnic', 'Technical audit', 'Technisches Audit', 'Teknisk revisjon'), copy('Strategie locală', 'Local strategy', 'Lokale Strategie', 'Lokal strategi'), copy('Raportare clară', 'Clear reporting', 'Klare Berichte', 'Tydelig rapportering')],
    items: [copy('Audit SEO și Core Web Vitals', 'SEO audit and Core Web Vitals', 'SEO-Audit und Core Web Vitals', 'SEO-revisjon og Core Web Vitals'), copy('Cercetare cuvinte cheie', 'Keyword research', 'Keyword-Recherche', 'Søkeordsanalyse'), copy('Optimizare pagini și conținut', 'Page and content optimization', 'Seiten- und Inhaltsoptimierung', 'Side- og innholdsoptimalisering'), copy('Google Business Profile', 'Google Business Profile', 'Google Business Profile', 'Google Business Profile'), copy('Indexare și date structurate', 'Indexing and structured data', 'Indexierung und strukturierte Daten', 'Indeksering og strukturerte data'), copy('Monitorizare și raport lunar', 'Monitoring and monthly reporting', 'Monitoring und Monatsbericht', 'Overvåking og månedsrapport')],
    visual: 'seo',
  },
  'web-applications': {
    eyebrow: copy('Aplicații web custom', 'Custom web applications', 'Individuelle Webanwendungen', 'Skreddersydde webapplikasjoner'),
    title: copy('Software construit în jurul afacerii tale.', 'Software built around your business.', 'Software, die zu Ihrem Unternehmen passt.', 'Programvare bygget rundt virksomheten din.'),
    subtitle: copy('Construim platforme, dashboard-uri și automatizări care elimină munca repetitivă și susțin creșterea.', 'We build platforms, dashboards and automation that remove repetitive work and support growth.', 'Wir entwickeln Plattformen, Dashboards und Automatisierungen, die Routinearbeit reduzieren und Wachstum fördern.', 'Vi bygger plattformer, dashbord og automatisering som fjerner rutinearbeid og støtter vekst.'),
    result: copy('De la proces manual la produs digital', 'From manual process to digital product', 'Vom manuellen Prozess zum digitalen Produkt', 'Fra manuell prosess til digitalt produkt'),
    resultText: copy('Analizăm fluxul real de lucru și dezvoltăm numai funcționalitățile care creează valoare.', 'We study the real workflow and build only the functionality that creates value.', 'Wir analysieren den realen Arbeitsablauf und entwickeln nur Funktionen, die Mehrwert schaffen.', 'Vi analyserer den virkelige arbeidsflyten og bygger bare funksjonalitet som skaper verdi.'),
    metrics: [copy('Arhitectură scalabilă', 'Scalable architecture', 'Skalierbare Architektur', 'Skalerbar arkitektur'), copy('Automatizări utile', 'Useful automation', 'Sinnvolle Automatisierung', 'Nyttig automatisering'), copy('Securitate integrată', 'Security built in', 'Integrierte Sicherheit', 'Innebygd sikkerhet')],
    items: [copy('Platforme și dashboard-uri', 'Platforms and dashboards', 'Plattformen und Dashboards', 'Plattformer og dashbord'), copy('API-uri și integrări externe', 'APIs and external integrations', 'APIs und externe Integrationen', 'API-er og eksterne integrasjoner'), copy('Automatizări și integrări AI', 'Automation and AI integrations', 'Automatisierung und KI-Integrationen', 'Automatisering og KI-integrasjoner'), copy('Autentificare și permisiuni', 'Authentication and permissions', 'Authentifizierung und Berechtigungen', 'Autentisering og tilganger'), copy('Plăți și modele de abonament', 'Payments and subscription models', 'Zahlungen und Abomodelle', 'Betaling og abonnementsmodeller'), copy('SEO tehnic pentru paginile publice', 'Technical SEO for public-facing pages', 'Technische SEO für öffentliche Seiten', 'Teknisk SEO for offentlige sider')],
    visual: 'app',
  },
} as const;

export function ServiceShowcaseVisual({ type, projectHref }: { type: string; projectHref?: string }) {
  if (type === 'website') {
    const projects = [
      { name: 'ProArt Studio', image: 'https://proartstudio.ro/about-800.webp', href: 'https://proartstudio.ro/' },
      { name: 'Jah Order', image: 'https://jah-order.vercel.app/book.jpg', href: 'https://jah-order.vercel.app/' },
      { name: 'Hospitality Demo', image: '/hospitality.jpg', href: '/demos/hospitality' },
    ];
    return <div className="p-4 sm:p-5 grid grid-cols-2 gap-3 h-[310px]">{projects.map((project, i) => <a key={project.name} href={projectHref || project.href} className={`${i === 0 ? 'row-span-2' : ''} group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900`} target={!projectHref && project.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"><img src={project.image} alt={project.name} referrerPolicy="no-referrer" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"/><span className="absolute bottom-3 left-3 right-3 text-xs sm:text-sm font-bold text-white">{project.name}</span></a>)}</div>;
  }
  if (type === 'hotel') return <a href={projectHref || '/demos/hospitality'} className="group relative block h-[310px] overflow-hidden"><img src="/hospitality.jpg" alt="NodeStack hospitality website demo" className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent"/><div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7"><span className="inline-flex rounded-full bg-emerald-400/15 border border-emerald-300/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300 mb-3">Live demo</span><p className="text-xl font-bold text-white">Hospitality Demo</p><p className="text-xs text-slate-300 mt-1">Hotel & villa booking experience</p></div></a>;
  if (type === 'seo') return <div className="p-6 h-[310px] flex flex-col justify-center"><div className="flex items-end gap-3 h-40 border-b border-l border-white/10 px-4">{[35,55,48,76,92].map((h,i)=><motion.div initial={{height:0}} whileInView={{height:`${h}%`}} key={i} className="flex-1 bg-gradient-to-t from-amber-500/30 to-amber-300 rounded-t-md"/>)}</div><div className="flex justify-between mt-5"><span className="text-xs text-slate-500">Visibility</span><span className="text-emerald-400 text-sm font-bold flex items-center gap-1"><TrendingUp className="h-4 w-4"/> +68%</span></div></div>;
  if (type === 'app') {
    const projects = [
      { name: 'SpinSaga', image: '/spinsaga-preview.png', href: 'https://spinsaga.fun' },
      { name: '4Chad', image: '/4chad-preview.png', href: 'https://4chad.xyz' },
      { name: 'Fusemon', image: '/fusemon-preview.png', href: 'https://www.fusemon.fun/' },
    ];
    return <div className="p-4 sm:p-5 grid grid-cols-2 gap-3 h-[310px]">{projects.map((project, i) => <a key={project.name} href={projectHref || project.href} target={projectHref ? undefined : '_blank'} rel="noreferrer" className={`${i === 2 ? 'col-span-2' : ''} group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900`}><img src={project.image} alt={project.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"/><span className="absolute bottom-3 left-3 text-sm font-bold text-white">{project.name}</span></a>)}</div>;
  }
  return <div className="p-5"><div className="h-8 rounded-lg bg-white/5 border border-white/10 mb-3 flex items-center px-3 gap-1.5"><i className="w-2 h-2 rounded-full bg-red-400/60"/><i className="w-2 h-2 rounded-full bg-amber-400/60"/><i className="w-2 h-2 rounded-full bg-emerald-400/60"/></div><div className="h-40 rounded-xl bg-gradient-to-br from-blue-500/25 to-cyan-400/5 p-6 flex flex-col justify-center"><div className="h-3 bg-white/60 rounded w-2/3 mb-3"/><div className="h-2 bg-white/20 rounded w-full mb-2"/><div className="h-2 bg-white/20 rounded w-4/5 mb-5"/><div className="h-8 bg-blue-500 rounded-lg w-24"/></div></div>;
}

const brandSets: Record<ServiceKey, { name: string; logo: string; tone: string }[]> = {
  websites: [
    { name: 'Cloudflare', logo: 'https://cdn.simpleicons.org/cloudflare/F38020', tone: 'bg-orange-500/10' },
    { name: 'Google', logo: 'https://cdn.simpleicons.org/google/4285F4', tone: 'bg-blue-500/10' },
    { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB', tone: 'bg-cyan-500/10' },
    { name: 'Analytics', logo: 'https://cdn.simpleicons.org/googleanalytics/E37400', tone: 'bg-amber-500/10' },
  ],
  hospitality: [
    { name: 'Booking.com', logo: 'https://cdn.simpleicons.org/bookingdotcom/003580', tone: 'bg-blue-500/10' },
    { name: 'Airbnb', logo: 'https://cdn.simpleicons.org/airbnb/FF5A5F', tone: 'bg-rose-500/10' },
    { name: 'Google Travel', logo: 'https://cdn.simpleicons.org/google/4285F4', tone: 'bg-emerald-500/10' },
    { name: 'WhatsApp', logo: 'https://cdn.simpleicons.org/whatsapp/25D366', tone: 'bg-green-500/10' },
  ],
  seo: [
    { name: 'Google', logo: 'https://cdn.simpleicons.org/google/4285F4', tone: 'bg-blue-500/10' },
    { name: 'Search Console', logo: 'https://cdn.simpleicons.org/googlesearchconsole/458CF5', tone: 'bg-cyan-500/10' },
    { name: 'Analytics', logo: 'https://cdn.simpleicons.org/googleanalytics/E37400', tone: 'bg-amber-500/10' },
    { name: 'Business Profile', logo: 'https://cdn.simpleicons.org/googlemybusiness/4285F4', tone: 'bg-emerald-500/10' },
  ],
  'web-applications': [
    { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB', tone: 'bg-cyan-500/10' },
    { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/3178C6', tone: 'bg-blue-500/10' },
    { name: 'Cloudflare', logo: 'https://cdn.simpleicons.org/cloudflare/F38020', tone: 'bg-orange-500/10' },
    { name: 'Google SEO', logo: 'https://cdn.simpleicons.org/google/4285F4', tone: 'bg-emerald-500/10' },
  ],
};

function BrandStrip({ serviceKey, label }: { serviceKey: ServiceKey; label: string }) {
  return <section className="border-y border-white/5 bg-white/[.015]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9">
      <p className="text-center text-xs uppercase tracking-[.2em] text-slate-600 mb-6">{label}</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">{brandSets[serviceKey].map((brand) => <div key={brand.name} className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-4"><span className={`grid place-items-center h-10 w-10 shrink-0 rounded-xl ${brand.tone}`}><img src={brand.logo} alt="" className="h-5 w-5 object-contain" loading="lazy"/></span><span className="text-sm sm:text-base text-slate-300 font-semibold">{brand.name}</span></div>)}</div>
    </div>
  </section>;
}

function OutcomeVisual({ serviceKey, labels, locale }: { serviceKey: ServiceKey; labels: string[]; locale: 'ro' | 'en' | 'de' | 'no' }) {
  const l = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });
  if (serviceKey === 'seo') return <div className="relative overflow-hidden rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-500/10 to-slate-900 p-6 sm:p-8">
    <div className="flex items-center justify-between mb-10"><div><p className="text-xs uppercase tracking-widest text-slate-500">{l('Vizibilitate organică','Organic visibility','Organische Sichtbarkeit','Organisk synlighet')}</p><p className="text-3xl font-bold text-white mt-2">+68%</p></div><span className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-300"><TrendingUp className="h-4 w-4"/> {l('Creștere','Growing','Wachsend','Vekst')}</span></div>
    <div className="relative h-44 border-b border-l border-white/10"><svg viewBox="0 0 500 150" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible"><defs><linearGradient id="seoFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f59e0b" stopOpacity=".35"/><stop offset="1" stopColor="#f59e0b" stopOpacity="0"/></linearGradient></defs><path d="M0,130 C65,125 80,110 125,115 S190,90 235,95 S305,58 350,70 S420,25 500,18 L500,150 L0,150Z" fill="url(#seoFill)"/><path d="M0,130 C65,125 80,110 125,115 S190,90 235,95 S305,58 350,70 S420,25 500,18" fill="none" stroke="#fbbf24" strokeWidth="3"/></svg></div>
    <div className="grid grid-cols-3 gap-2 mt-6">{labels.map(label=><p key={label} className="text-center text-[11px] sm:text-xs text-slate-400">{label}</p>)}</div>
  </div>;

  if (serviceKey === 'hospitality') return <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-slate-900 p-6 sm:p-8">
    <div className="flex items-center justify-between mb-8"><div><p className="text-xs uppercase tracking-widest text-slate-500">{l('Parcurs rezervare directă','Direct booking journey','Direktbuchungsprozess','Direktebestilling')}</p><p className="text-xl font-bold text-white mt-2">{l('Oaspete → Rezervare','Guest → Reservation','Gast → Buchung','Gjest → Bestilling')}</p></div><CalendarCheck className="h-9 w-9 text-emerald-400"/></div>
    <div className="flex items-center"><span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/5 border border-white/10"><Search className="h-5 w-5 text-slate-300"/></span><span className="h-px flex-1 bg-gradient-to-r from-white/10 to-emerald-400/50 relative"><i className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-400"/></span><span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-400/10 border border-emerald-400/30"><Hotel className="h-5 w-5 text-emerald-300"/></span><span className="h-px flex-1 bg-gradient-to-r from-emerald-400/50 to-emerald-400 relative"><i className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-400"/></span><span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-400 text-slate-950"><Check className="h-6 w-6"/></span></div>
    <div className="grid grid-cols-3 gap-2 mt-8">{labels.map(label=><p key={label} className="text-center text-[11px] sm:text-xs text-slate-400">{label}</p>)}</div>
  </div>;

  if (serviceKey === 'web-applications') return <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-slate-900 p-6 sm:p-8">
    <div className="flex items-center justify-between mb-7"><div><p className="text-xs uppercase tracking-widest text-slate-500">{l('Flux conectat','Connected workflow','Vernetzter Workflow','Tilkoblet arbeidsflyt')}</p><p className="text-xl font-bold text-white mt-2">{l('Un sistem. Mai puțină muncă manuală.','One system. Less manual work.','Ein System. Weniger manuelle Arbeit.','Ett system. Mindre manuelt arbeid.')}</p></div><Layers3 className="h-9 w-9 text-cyan-400"/></div>
    <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center"><div className="space-y-3">{[l('Date','Data','Daten','Data'),l('Utilizatori','Users','Benutzer','Brukere'),l('Plăți','Payments','Zahlungen','Betalinger')].map((item,i)=><div key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-300 flex items-center gap-2"><i className={`h-2 w-2 rounded-full ${i===0?'bg-violet-400':i===1?'bg-blue-400':'bg-emerald-400'}`}/>{item}</div>)}</div><ArrowRight className="h-5 w-5 text-cyan-400"/><div className="grid place-items-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 h-full min-h-36 text-center p-4"><Code2 className="h-8 w-8 text-cyan-300 mb-2"/><span className="text-sm font-bold text-white">{l('Platforma ta','Your platform','Ihre Plattform','Din plattform')}</span></div></div>
    <div className="grid grid-cols-3 gap-2 mt-7">{labels.map(label=><p key={label} className="text-center text-[11px] sm:text-xs text-slate-400">{label}</p>)}</div>
  </div>;

  return <div className="relative overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-slate-900 p-6 sm:p-8">
    <div className="flex items-center justify-between mb-9"><div><p className="text-xs uppercase tracking-widest text-slate-500">{l('Performanță website','Website performance','Website-Performance','Nettsideytelse')}</p><p className="text-xl font-bold text-white mt-2">{l('Creat pentru prima impresie','Built for the first impression','Für den ersten Eindruck gebaut','Bygget for førsteinntrykket')}</p></div><Gauge className="h-9 w-9 text-blue-400"/></div>
    <div className="flex justify-around gap-3">{[98,96,100].map((score,i)=><div key={score} className="text-center"><div className="relative grid h-20 w-20 sm:h-24 sm:w-24 place-items-center rounded-full" style={{background:`conic-gradient(${i===2?'#22d3ee':'#60a5fa'} ${score}%, rgba(255,255,255,.07) 0)`}}><div className="absolute inset-[5px] rounded-full bg-slate-950"/><strong className="relative text-xl text-white">{score}</strong></div><p className="mt-3 max-w-24 text-[11px] sm:text-xs text-slate-400">{labels[i]}</p></div>)}</div>
  </div>;
}

function HospitalityPackages({ locale }: { locale: 'ro' | 'en' | 'de' | 'no' }) {
  const l = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });
  const freePresence = [
    l('Pagină de prezentare gratuită pe noul portal de turism rovista.ro', 'Free presentation page on the new rovista.ro tourism portal', 'Kostenlose Präsentationsseite auf dem neuen Tourismusportal rovista.ro', 'Gratis presentasjonsside på den nye reiselivsportalen rovista.ro'),
    l('Buton de contact direct prin WhatsApp', 'Direct WhatsApp contact button', 'Direkter WhatsApp-Kontaktbutton', 'Direkte kontaktknapp for WhatsApp'),
    l('Fotografii și descriere furnizate de proprietate', 'Photos and description supplied by the property', 'Fotos und Beschreibung werden von der Unterkunft bereitgestellt', 'Bilder og beskrivelse leveres av overnattingsstedet'),
    l('Publicare în maximum 48 de ore', 'Published within 48 hours', 'Veröffentlichung innerhalb von 48 Stunden', 'Publiseres innen 48 timer'),
    l('Ideal pentru vizibilitate suplimentară', 'Ideal for additional visibility', 'Ideal für zusätzliche Sichtbarkeit', 'Ideelt for ekstra synlighet'),
  ];
  const customWebsite = [
    l('Website complet personalizat, pe domeniul propriu', 'Fully custom website on your own domain', 'Vollständig individuelle Website auf der eigenen Domain', 'Fullt tilpasset nettside på eget domene'),
    l('Design și structură create pentru proprietatea ta', 'Custom design and layout for your property', 'Individuelles Design und Layout für Ihre Unterkunft', 'Tilpasset design og struktur for eiendommen'),
    l('Optimizare SEO inclusă', 'SEO optimization included', 'SEO-Optimierung inklusive', 'SEO-optimalisering inkludert'),
    l('Integrare sistem de rezervări', 'Booking system integration', 'Integration eines Buchungssystems', 'Integrasjon av bookingsystem'),
    l('6 luni de suport incluse', '6 months of support included', '6 Monate Support inklusive', '6 måneders support inkludert'),
    l('Plătești doar după aprobarea finală — fără risc', 'Pay only after final approval — no risk', 'Zahlung erst nach finaler Freigabe — ohne Risiko', 'Betal først etter endelig godkjenning — uten risiko'),
  ];
  return <section className="py-24 lg:py-32 bg-slate-900/40 border-y border-white/5 relative overflow-hidden">
    <img src="/hospitality-packages-bg.png" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-[.09] mix-blend-luminosity"/>
    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-slate-950/90"/>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(16,185,129,.12),transparent_45%)]"/>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mb-14"><span className="text-emerald-400 font-mono text-sm uppercase tracking-[.2em]">{l('Pachete pentru turism', 'Tourism packages', 'Tourismus-Pakete', 'Reiselivspakker')}</span><h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-5">{l('Alege prezența potrivită proprietății tale.', 'Choose the right presence for your property.', 'Wählen Sie den passenden Auftritt für Ihre Unterkunft.', 'Velg riktig digital tilstedeværelse for eiendommen din.')}</h2><p className="text-lg text-slate-400">{l('Două opțiuni clare pentru hoteluri, vile și pensiuni din România: vizibilitate gratuită sau un website construit integral pentru tine.', 'Two clear options for Romanian hotels, villas and guesthouses: free visibility or a fully custom website.', 'Zwei klare Optionen für Hotels, Villen und Pensionen in Rumänien: kostenlose Sichtbarkeit oder eine individuelle Website.', 'To tydelige alternativer for hoteller, villaer og gjestehus i Romania: gratis synlighet eller en skreddersydd nettside.')}</p></div>
      <div className="grid lg:grid-cols-2 gap-7">
        <article className="glass rounded-3xl p-7 sm:p-10 flex flex-col"><div className="flex justify-between gap-5 mb-8"><div><p className="text-brand font-mono text-xs uppercase tracking-widest mb-2">{l('Pachetul 01', 'Package 01', 'Paket 01', 'Pakke 01')}</p><h3 className="text-2xl font-bold">{l('Prezență Gratuită', 'Free Presence', 'Kostenlose Präsenz', 'Gratis tilstedeværelse')}</h3></div><Globe2 className="h-9 w-9 text-brand"/></div><div className="mb-8"><strong className="text-4xl lg:text-5xl text-white">0 RON</strong><p className="text-sm text-slate-500 mt-2">{l('Fără taxă de publicare', 'No publishing fee', 'Keine Veröffentlichungsgebühr', 'Ingen publiseringsavgift')}</p></div><ul className="space-y-4 mb-9 flex-1">{freePresence.map(item=><li key={item} className="flex gap-3 text-sm text-slate-300 leading-relaxed"><CheckCircle2 className="h-5 w-5 text-brand shrink-0"/>{item}</li>)}</ul><Link to="/contact?package=free-presence" className="inline-flex justify-center items-center rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-6 py-4 text-white font-bold transition">{l('Solicită pagina gratuită', 'Request Free Page', 'Kostenlose Seite anfragen', 'Be om gratis side')}<ArrowRight className="ml-2 h-4 w-4"/></Link></article>
        <article className="rounded-3xl p-7 sm:p-10 flex flex-col bg-gradient-to-b from-emerald-500/15 to-white/[.03] border border-emerald-400/40 shadow-2xl shadow-emerald-500/10 relative"><span className="absolute top-0 right-8 -translate-y-1/2 rounded-full bg-emerald-500 text-slate-950 px-4 py-2 text-xs font-black uppercase">{l('Ofertă de lansare', 'Launch offer', 'Einführungsangebot', 'Lanseringstilbud')}</span><div className="flex justify-between gap-5 mb-8"><div><p className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-2">{l('Pachetul 02', 'Package 02', 'Paket 02', 'Pakke 02')}</p><h3 className="text-2xl font-bold">{l('Website Personalizat', 'Custom Website', 'Individuelle Website', 'Skreddersydd nettside')}</h3></div><CalendarCheck className="h-9 w-9 text-emerald-400"/></div><div className="mb-8"><div className="flex flex-wrap items-baseline gap-x-4 gap-y-2"><strong className="text-4xl lg:text-5xl text-white">1.500 RON</strong><span className="text-xl text-slate-500 line-through decoration-slate-400">3.500 RON</span></div><p className="text-sm font-semibold text-emerald-300 mt-3">{l('Ofertă specială pentru primele 10 locații', 'Special offer for the first 10 properties', 'Sonderangebot für die ersten 10 Unterkünfte', 'Spesialtilbud for de første 10 eiendommene')}</p></div><ul className="space-y-4 mb-9 flex-1">{customWebsite.map(item=><li key={item} className="flex gap-3 text-sm text-slate-300 leading-relaxed"><CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0"/>{item}</li>)}</ul><Link to="/contact?package=custom-hospitality" className="inline-flex justify-center items-center rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-4 text-slate-950 font-black transition">{l('Solicită website personalizat', 'Request Custom Site', 'Individuelle Website anfragen', 'Be om skreddersydd nettside')}<ArrowRight className="ml-2 h-4 w-4"/></Link></article>
      </div>
      <div className="mt-7 rounded-2xl border border-emerald-400/20 bg-emerald-400/[.06] px-5 py-4 text-sm text-emerald-100"><strong>{l('Notă:', 'Note:', 'Hinweis:', 'Merk:')}</strong> {l('oferta de 1.500 RON este limitată la primele 10 locații din sectorul turistic.', 'the 1,500 RON offer is limited to the first 10 properties in the tourism sector.', 'das Angebot über 1.500 RON ist auf die ersten 10 Unterkünfte im Tourismussektor begrenzt.', 'tilbudet på 1 500 RON er begrenset til de første 10 eiendommene i reiselivssektoren.')}</div>
    </div>
  </section>;
}

function WebsitePackages({ locale }: { locale: 'ro' | 'en' | 'de' | 'no' }) {
  const l = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });
  const price = locale === 'ro' ? '1.500 LEI' : locale === 'no' ? '3.500 NOK' : '€300';
  const maintenance = locale === 'ro' ? '50 LEI/lună' : locale === 'no' ? '120 NOK/mnd.' : locale === 'de' ? '€10/Monat' : '€10/month';
  const essential = [
    l('Website de prezentare modern și responsive', 'Modern responsive presentation website', 'Moderne responsive Unternehmenswebsite', 'Moderne responsiv presentasjonsnettside'),
    l('Până la 5 pagini esențiale', 'Up to 5 essential pages', 'Bis zu 5 wichtige Seiten', 'Opptil 5 viktige sider'),
    l('Domeniu inclus în primul an', 'Domain included for the first year', 'Domain im ersten Jahr inklusive', 'Domene inkludert første år'),
    l('Cloudflare, CDN, SSL și securitate', 'Cloudflare, CDN, SSL and security', 'Cloudflare, CDN, SSL und Sicherheit', 'Cloudflare, CDN, SSL og sikkerhet'),
    l('SEO de bază și indexare Google', 'Basic SEO and Google indexing', 'Basis-SEO und Google-Indexierung', 'Grunnleggende SEO og Google-indeksering'),
    l('Google Business Profile', 'Google Business Profile', 'Google Business Profile', 'Google Business Profile'),
    l('WhatsApp, telefon, hartă și social media', 'WhatsApp, phone, map and social media', 'WhatsApp, Telefon, Karte und Social Media', 'WhatsApp, telefon, kart og sosiale medier'),
  ];
  const growth = [
    l('Tot ce este inclus în pachetul Esențial', 'Everything in the Essential package', 'Alles aus dem Basispaket', 'Alt i basispakken'),
    l('Structură extinsă și pagini personalizate', 'Extended structure and custom pages', 'Erweiterte Struktur und individuelle Seiten', 'Utvidet struktur og tilpassede sider'),
    l('Strategie SEO și cercetare de cuvinte cheie', 'SEO strategy and keyword research', 'SEO-Strategie und Keyword-Recherche', 'SEO-strategi og søkeordsanalyse'),
    l('Conținut optimizat pentru conversii', 'Conversion-focused content', 'Conversion-optimierte Inhalte', 'Konverteringsfokusert innhold'),
    l('Analytics, Search Console și conversii', 'Analytics, Search Console and conversions', 'Analytics, Search Console und Conversions', 'Analytics, Search Console og konverteringer'),
    l('Integrări și funcționalități personalizate', 'Custom integrations and functionality', 'Individuelle Integrationen und Funktionen', 'Tilpassede integrasjoner og funksjonalitet'),
    l('Optimizare continuă după lansare', 'Ongoing post-launch optimization', 'Fortlaufende Optimierung nach dem Start', 'Løpende optimalisering etter lansering'),
  ];
  return <section className="py-24 lg:py-32 bg-slate-900/40 border-y border-white/5 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(59,130,246,.14),transparent_45%)]"/>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mb-14"><span className="text-brand font-mono text-sm uppercase tracking-[.2em]">{l('Pachete website', 'Website packages', 'Website-Pakete', 'Nettsidepakker')}</span><h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-5">{l('Un început simplu sau o fundație pentru creștere.', 'A simple start or a foundation for growth.', 'Ein einfacher Start oder eine Basis für Wachstum.', 'En enkel start eller et grunnlag for vekst.')}</h2><p className="text-lg text-slate-400">{l('Alege nivelul potrivit obiectivelor afacerii tale. Fără costuri ascunse.', 'Choose the level that fits your business goals. No hidden costs.', 'Wählen Sie das passende Niveau für Ihre Geschäftsziele. Keine versteckten Kosten.', 'Velg nivået som passer forretningsmålene dine. Ingen skjulte kostnader.')}</p></div>
      <div className="grid lg:grid-cols-2 gap-7">
        <article className="glass rounded-3xl p-7 sm:p-10 flex flex-col"><div className="flex justify-between gap-5 mb-8"><div><p className="text-brand font-mono text-xs uppercase tracking-widest mb-2">{l('Esențial', 'Essential', 'Basis', 'Basis')}</p><h3 className="text-2xl">{l('Prezență Online', 'Online Presence', 'Online-Präsenz', 'Digital tilstedeværelse')}</h3></div><Globe2 className="h-9 w-9 text-brand"/></div><div className="mb-8"><strong className="text-4xl lg:text-5xl text-white">{price}</strong><p className="text-sm text-slate-500 mt-2">{l('Plată unică pentru website', 'One-time website setup', 'Einmalige Website-Erstellung', 'Engangspris for nettsiden')}</p></div><ul className="space-y-3 mb-9 flex-1">{essential.map(item=><li key={item} className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="h-5 w-5 text-brand shrink-0"/>{item}</li>)}</ul><div className="rounded-xl bg-white/5 border border-white/10 p-4 mb-5 text-sm"><b className="text-white">{maintenance}</b> <span className="text-slate-400">{l('hosting și mentenanță', 'hosting and maintenance', 'Hosting und Wartung', 'hosting og vedlikehold')}</span></div><Link to="/contact" className="inline-flex justify-center items-center rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 px-6 py-4 text-white font-bold transition">{l('Alege Esențial', 'Choose Essential', 'Basis wählen', 'Velg basis')}<ArrowRight className="ml-2 h-4 w-4"/></Link></article>
        <article className="rounded-3xl p-7 sm:p-10 flex flex-col bg-gradient-to-b from-brand/20 to-white/[.03] border border-brand/40 shadow-2xl shadow-brand/10 relative"><span className="absolute top-0 right-8 -translate-y-1/2 rounded-full bg-brand text-white px-4 py-2 text-xs font-black uppercase">{l('Pentru creștere', 'For growth', 'Für Wachstum', 'For vekst')}</span><div className="flex justify-between gap-5 mb-8"><div><p className="text-accent font-mono text-xs uppercase tracking-widest mb-2">{l('Avansat', 'Advanced', 'Erweitert', 'Avansert')}</p><h3 className="text-2xl">{l('Website pentru Creștere', 'Growth Website', 'Wachstums-Website', 'Nettside for vekst')}</h3></div><TrendingUp className="h-9 w-9 text-accent"/></div><div className="mb-8"><strong className="text-4xl lg:text-5xl text-white">{l('Ofertă', 'Custom', 'Individuell', 'Tilpasset')}</strong><p className="text-sm text-slate-500 mt-2">{l('În funcție de structură și funcționalități', 'Based on structure and functionality', 'Je nach Struktur und Funktionen', 'Basert på struktur og funksjonalitet')}</p></div><ul className="space-y-3 mb-9 flex-1">{growth.map(item=><li key={item} className="flex gap-3 text-sm text-slate-300"><CheckCircle2 className="h-5 w-5 text-accent shrink-0"/>{item}</li>)}</ul><Link to="/contact" className="inline-flex justify-center items-center rounded-xl bg-brand hover:bg-brand-dark px-6 py-4 text-white font-bold transition">{l('Solicită o ofertă', 'Request a quote', 'Angebot anfragen', 'Be om tilbud')}<ArrowRight className="ml-2 h-4 w-4"/></Link></article>
      </div>
    </div>
  </section>;
}

function ServicePortfolio({ serviceKey, locale }: { serviceKey: 'websites' | 'seo' | 'web-applications'; locale: 'ro' | 'en' | 'de' | 'no' }) {
  const l = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });
  const websiteProjects = [
    { title: 'ProArt Studio', category: l('Website studio de înregistrări','Recording studio website','Tonstudio-Website','Nettside for lydstudio'), image: 'https://proartstudio.ro/about-800.webp', link: 'https://proartstudio.ro/' },
    { title: 'Jah Order', category: l('Website soundsystem','Soundsystem website','Soundsystem-Website','Soundsystem-nettside'), image: 'https://jah-order.vercel.app/book.jpg', link: 'https://jah-order.vercel.app/' },
    { title: 'Hospitality Demo', category: l('Website hotel & vilă','Hotel & villa website','Hotel- & Villenwebsite','Hotell- og villanettside'), image: '/hospitality.jpg', link: '/demos/hospitality' },
  ];
  const applicationProjects = [
    { title: 'SpinSaga', category: l('Aplicație gamificată Solana','Solana gamified application','Gamifizierte Solana-Anwendung','Spillbasert Solana-applikasjon'), image: '/spinsaga-preview.png', link: 'https://spinsaga.fun' },
    { title: '4Chad', category: l('Platformă launchpad Solana','Solana launchpad platform','Solana-Launchpad-Plattform','Solana launchpad-plattform'), image: '/4chad-preview.png', link: 'https://4chad.xyz' },
    { title: 'Fusemon', category: l('Joc de cărți Web3','Web3 trading card game','Web3-Sammelkartenspiel','Web3-samlekortspill'), image: '/fusemon-preview.png', link: 'https://www.fusemon.fun/' },
  ];
  const projects = serviceKey === 'websites' ? websiteProjects : serviceKey === 'web-applications' ? applicationProjects : [...websiteProjects, ...applicationProjects];
  return <section className="py-24 lg:py-32 bg-slate-900/30"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-14"><div><span className="text-brand font-mono text-sm uppercase tracking-[.2em]">{l('Portofoliu','Portfolio','Portfolio','Portefølje')}</span><h2 className="text-4xl lg:text-5xl font-bold mt-4">{l('Proiecte selectate','Featured work','Ausgewählte Projekte','Utvalgte prosjekter')}</h2></div><Link to="/portfolio" className="w-fit rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-3 text-white font-bold transition">{l('Vezi tot portofoliul','View all work','Alle Projekte','Se alle prosjekter')}</Link></div><div className="grid md:grid-cols-3 gap-7">{projects.map((project)=><motion.div key={project.title} whileHover={{y:-10}} className="group rounded-3xl overflow-hidden glass border border-white/5"><Link to="/portfolio" className="block h-full"><div className="aspect-video overflow-hidden bg-slate-900"><img src={project.image} alt={project.title} referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"/></div><div className="p-6 border-t border-white/5 bg-slate-950/70"><p className="text-brand font-mono text-xs uppercase tracking-widest mb-2">{project.category}</p><div className="flex items-center justify-between"><h3 className="text-xl">{project.title}</h3><ArrowRight className="h-5 w-5 text-slate-600 group-hover:text-brand group-hover:translate-x-1 transition"/></div></div></Link></motion.div>)}</div></div></section>;
}

export default function ServiceDetail({ serviceKey }: { serviceKey: ServiceKey }) {
  const { locale } = useLocale();
  const t = (value: Copy) => localize(locale, value);
  const c = content[serviceKey];
  const meta = serviceMeta[serviceKey];
  const Icon = meta.icon;
  const steps = [
    copy('Strategie', 'Strategy', 'Strategie', 'Strategi'),
    copy('Design', 'Design', 'Design', 'Design'),
    copy('Dezvoltare', 'Development', 'Entwicklung', 'Utvikling'),
    copy('Lansare & creștere', 'Launch & growth', 'Start & Wachstum', 'Lansering og vekst'),
  ];

  return <main className="pt-20 bg-slate-950 min-h-screen overflow-hidden">
    <section className="relative min-h-[720px] flex items-center border-b border-white/5">
      <div className={`absolute top-[-15%] right-[-10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br ${meta.color} opacity-[.12] blur-3xl`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-[1.08fr_.92fr] gap-14 items-center relative">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}>
          <div className="inline-flex items-center gap-3 text-sm font-mono uppercase tracking-[.2em] text-slate-400 mb-7"><span className={`grid place-items-center h-9 w-9 rounded-full bg-gradient-to-br ${meta.color} text-white font-bold tracking-normal`}>{meta.number}</span>{t(c.eyebrow)}</div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] leading-[.98] font-bold text-white mb-7">{t(c.title)}</h1>
          <p className="text-lg lg:text-xl leading-relaxed text-slate-400 max-w-2xl mb-9">{t(c.subtitle)}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact" className="inline-flex items-center justify-center bg-brand hover:bg-brand-dark text-white px-7 py-4 rounded-xl font-bold transition shadow-xl shadow-brand/20">{localize(locale,{ro:'Solicită o ofertă',en:'Request a quote',de:'Angebot anfragen',no:'Be om tilbud'})}<ArrowRight className="ml-2 h-5 w-5"/></Link>
            {serviceKey === 'hospitality' && <Link to="/demos/hospitality" className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-white px-7 py-4 rounded-xl font-bold transition">{localize(locale,{ro:'Vezi demo live',en:'View live demo',de:'Live-Demo ansehen',no:'Se live-demo'})}</Link>}
          </div>
        </motion.div>
        <motion.div initial={{opacity:0,scale:.94,y:20}} animate={{opacity:1,scale:1,y:0}} transition={{delay:.15}} className="relative">
          <div className="absolute -inset-6 bg-brand/10 blur-3xl rounded-full"/>
          <div className="relative glass rounded-[2rem] p-3 shadow-2xl rotate-1 hover:rotate-0 transition duration-500">
            <div className="rounded-[1.4rem] bg-slate-950/90 border border-white/10 overflow-hidden min-h-[310px]"><ServiceShowcaseVisual type={c.visual} projectHref="/portfolio"/></div>
          </div>
        </motion.div>
      </div>
    </section>

    <BrandStrip serviceKey={serviceKey} label={localize(locale,{ro:'Platforme și tehnologii pe care le putem integra',en:'Platforms and technology we can integrate',de:'Plattformen und Technologien, die wir integrieren',no:'Plattformer og teknologi vi kan integrere'})}/>

    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-start">
        <div className="lg:sticky lg:top-32">
          <span className="text-brand font-mono text-sm uppercase tracking-[.2em]">{localize(locale,{ro:'Rezultatul',en:'The outcome',de:'Das Ergebnis',no:'Resultatet'})}</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">{t(c.result)}</h2>
          <p className="text-lg text-slate-400 leading-relaxed mb-9">{t(c.resultText)}</p>
          <OutcomeVisual serviceKey={serviceKey} labels={c.metrics.map(metric => t(metric))} locale={locale}/>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-6">{localize(locale,{ro:'Ce este inclus',en:"What's included",de:'Was enthalten ist',no:'Dette er inkludert'})}</h3>
          <div className="grid sm:grid-cols-2 gap-4">{c.items.map((item,i)=><motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.05}} key={i} className="group min-h-36 p-6 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-brand/40 transition"><div className="flex items-center justify-between mb-6"><span className="font-mono text-xs text-slate-600">0{i+1}</span><Check className="h-5 w-5 text-brand"/></div><p className="text-white font-semibold leading-snug">{t(item)}</p></motion.div>)}</div>
        </div>
      </div>
    </section>

    {serviceKey === 'websites' && <WebsitePackages locale={locale}/>} 
    {serviceKey === 'hospitality' && <HospitalityPackages locale={locale}/>} 
    {(serviceKey === 'websites' || serviceKey === 'seo' || serviceKey === 'web-applications') && <ServicePortfolio serviceKey={serviceKey} locale={locale}/>} 

    <section className="py-24 bg-slate-900/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14"><span className="text-brand font-mono text-sm uppercase tracking-[.2em]">{localize(locale,{ro:'Cum lucrăm',en:'How we work',de:'So arbeiten wir',no:'Slik jobber vi'})}</span><h2 className="text-4xl lg:text-5xl font-bold mt-4">{localize(locale,{ro:'Un proces clar, fără surprize.',en:'A clear process. No surprises.',de:'Ein klarer Prozess. Keine Überraschungen.',no:'En tydelig prosess. Ingen overraskelser.'})}</h2></div>
        <div className="grid md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">{steps.map((step,i)=><div key={i} className="bg-slate-950 p-7 lg:p-9 min-h-52"><span className="font-mono text-brand text-sm">0{i+1}</span><h3 className="text-xl mt-8 mb-3">{t(step)}</h3><p className="text-sm text-slate-500 leading-relaxed">{localize(locale,{ro:['Înțelegem obiectivele și publicul.','Definim experiența și direcția vizuală.','Construim, integrăm și testăm.','Publicăm, măsurăm și îmbunătățim.'][i],en:['We understand your goals and audience.','We define the experience and visual direction.','We build, integrate and test.','We publish, measure and improve.'][i],de:['Wir verstehen Ziele und Zielgruppe.','Wir definieren Erlebnis und visuelle Richtung.','Wir entwickeln, integrieren und testen.','Wir veröffentlichen, messen und verbessern.'][i],no:['Vi forstår målene og målgruppen.','Vi definerer opplevelsen og det visuelle.','Vi bygger, integrerer og tester.','Vi publiserer, måler og forbedrer.'][i]})}</p></div>)}</div>
      </div>
    </section>

    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_auto] items-center gap-10">
        <div><div className="flex items-center gap-3 mb-5"><Cloud className="h-6 w-6 text-accent"/><span className="font-mono text-xs uppercase tracking-[.2em] text-slate-500">Modern stack</span></div><h2 className="text-3xl font-bold mb-3">{localize(locale,{ro:'Tehnologie solidă, invizibilă pentru client.',en:'Solid technology, invisible to your customer.',de:'Solide Technologie, unsichtbar für Ihre Kunden.',no:'Solid teknologi, usynlig for kunden.'})}</h2><p className="text-slate-400">React · TypeScript · Cloudflare · Analytics · SEO · Security</p></div>
        <div className="flex gap-3 text-slate-500">{[Gauge,ShieldCheck,Layers3,BarChart3].map((I,i)=><span key={i} className="grid place-items-center h-12 w-12 rounded-xl border border-white/10 bg-white/[.03]"><I className="h-5 w-5"/></span>)}</div>
      </div>
    </section>

    <section className="pb-24 px-4 sm:px-6 lg:px-8"><div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-blue-700 p-8 sm:p-12 lg:p-16"><Sparkles className="absolute right-10 top-10 h-40 w-40 text-white/10"/><div className="relative max-w-3xl"><p className="text-blue-100 font-mono text-sm uppercase tracking-[.2em] mb-5">NodeStack</p><h2 className="text-4xl lg:text-6xl font-bold mb-7">{localize(locale,{ro:'Ai un proiect în minte?',en:'Have a project in mind?',de:'Haben Sie ein Projekt im Kopf?',no:'Har du et prosjekt i tankene?'})}</h2><p className="text-lg text-blue-100 mb-9">{localize(locale,{ro:'Spune-ne ce vrei să construiești. Îți răspundem cu o direcție clară și pașii următori.',en:"Tell us what you want to build. We'll reply with a clear direction and next steps.",de:'Erzählen Sie uns, was Sie entwickeln möchten. Wir antworten mit einer klaren Richtung und den nächsten Schritten.',no:'Fortell oss hva du vil bygge. Vi svarer med en tydelig retning og neste steg.'})}</p><Link to="/contact" className="inline-flex items-center bg-white text-blue-700 hover:bg-blue-50 px-7 py-4 rounded-xl font-bold transition">{localize(locale,{ro:'Începe o conversație',en:'Start a conversation',de:'Gespräch beginnen',no:'Start en samtale'})}<ArrowRight className="ml-2 h-5 w-5"/></Link></div></div></section>
  </main>;
}
