'use client';

import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ChevronDown, MessageCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { localize, useLocale } from '@/src/lib/i18n';
import { ServiceShowcaseVisual } from './ServiceDetail';

const techStack: { name: string; logo: string; invert?: boolean }[] = [
  { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF' },
  { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs/5FA04E' },
  { name: 'Python', logo: 'https://cdn.simpleicons.org/python/3776AB' },
  { name: 'OpenAI / AI', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/openai.svg', invert: true },
  { name: 'REST APIs', logo: 'https://cdn.simpleicons.org/swagger/85EA2D' },
  { name: 'FastAPI', logo: 'https://cdn.simpleicons.org/fastapi/009688' },
  { name: 'Express.js', logo: 'https://cdn.simpleicons.org/express/FFFFFF' },
  { name: 'Postman', logo: 'https://cdn.simpleicons.org/postman/FF6C37' },
  { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'Supabase', logo: 'https://cdn.simpleicons.org/supabase/3FCF8E' },
  { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker/2496ED' },
  { name: 'Linux', logo: 'https://cdn.simpleicons.org/linux/FCC624' },
  { name: 'Cloudflare', logo: 'https://cdn.simpleicons.org/cloudflare/F38020' },
  { name: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Git', logo: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'Rust', logo: 'https://cdn.simpleicons.org/rust/FFFFFF' },
  { name: 'Solana', logo: 'https://cdn.simpleicons.org/solana/9945FF' },
  { name: 'Ethereum / EVM', logo: 'https://cdn.simpleicons.org/ethereum/8C8C8C' },
  { name: 'Solidity', logo: 'https://cdn.simpleicons.org/solidity/FFFFFF' },
  { name: 'Polygon', logo: 'https://cdn.simpleicons.org/polygon/8247E5' },
  { name: 'Vite', logo: 'https://cdn.simpleicons.org/vite/646CFF' },
];

const portfolioPreview = [
  {
    title: "RoVista",
    category: "Romania Travel Guide",
    image: "/rovista-preview.png",
    link: "https://rovista.ro/",
  },
    {
    title: "Hospitality Demo",
    category: "Hotel & Villa Website",
    image: "/hospitality.jpg",
    link: "/demos/hospitality",
  },
    {
    title: "ProArt Studio",
    category: "Recording Studio Website",
    image: "https://proartstudio.ro/about-800.webp",
    
  },
    {
    title: "Fusemon",
    category: "Solana Trading Card Game",
    image: "/fusemon-preview.png",
    link: "https://www.fusemon.fun/",
  },
  {
    title: "4Chad",
    category: "Solana Launchpad",
    image: "/4chad-preview.png",
  },

  {
    title: "SpinSaga",
    category: "Solana Gamified Utility",
    image: "/spinsaga-preview.png",
  },
  {
    title: "Jah Order",
    category: "Soundsystem Website",
    image: "https://jah-order.vercel.app/book.jpg",
  },
  // {
  //   title: "Royal Dice",
  //   category: "Gaming Website",
  //   logoText: "ROYAL DICE",
  // },

];

const heroShowcaseProjects = [
  { title: 'RoVista', image: '/rovista-preview.png', url: 'rovista.ro' },
  { title: 'Hospitality Demo', image: '/hospitality.jpg', url: 'nodestack.pro/demos/hospitality' },
  { title: 'ProArt Studio', image: 'https://proartstudio.ro/about-800.webp', url: 'proartstudio.ro' },
];

export default function Home() {
  const { locale } = useLocale();
  const t = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '40700000000';
  const stackCarousel = useRef<HTMLDivElement>(null);
  const servicesCarousel = useRef<HTMLDivElement>(null);
  const [heroProjectIndex, setHeroProjectIndex] = useState(0);
  const heroProject = heroShowcaseProjects[heroProjectIndex];
  const moveStack = (direction: -1 | 1) => {
    const carousel = stackCarousel.current;
    if (!carousel) return;
    carousel.scrollLeft += direction * carousel.clientWidth * 0.9;
  };
  const moveServices = (direction: -1 | 1) => servicesCarousel.current?.scrollBy({ left: direction * servicesCarousel.current.clientWidth * 0.82, behavior: 'smooth' });

  useEffect(() => {
    const carousel = stackCarousel.current;
    if (!carousel) return;
    const getSetWidth = () => {
      const firstItem = carousel.children[0] as HTMLElement | undefined;
      const repeatedItem = carousel.children[techStack.length] as HTMLElement | undefined;
      return firstItem && repeatedItem ? repeatedItem.offsetLeft - firstItem.offsetLeft : carousel.scrollWidth / 3;
    };
    carousel.scrollLeft = getSetWidth();
    const timer = window.setInterval(() => {
      const setWidth = getSetWidth();
      carousel.scrollLeft += 1;
      if (carousel.scrollLeft >= setWidth * 2) carousel.scrollLeft -= setWidth;
      if (carousel.scrollLeft <= 0) carousel.scrollLeft += setWidth;
    }, 30);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroProjectIndex((current) => (current + 1) % heroShowcaseProjects.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="pt-20 bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.14),transparent_42%),radial-gradient(circle_at_25%_40%,rgba(59,130,246,0.12),transparent_40%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-[1.02fr_.98fr] gap-14 lg:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 px-4 py-1.5 rounded-full text-brand text-sm font-mono mb-8">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span>{t('Agenție de produse digitale', 'Digital products agency', 'Agentur für digitale Produkte', 'Digital produktbyrå')}</span>
              </div>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.02] tracking-tight mb-8">
                {t('Construim produse care', 'We build products that', 'Wir entwickeln Produkte, die', 'Vi bygger produkter som')} <span className="text-gradient">{t('dezvoltă afaceri.', 'move businesses forward.', 'Unternehmen voranbringen.', 'driver bedrifter fremover.')}</span>
              </h1>
              <p className="text-lg lg:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
                {t('NodeStack proiectează platforme full-stack, sisteme backend scalabile, produse Web3 și experiențe bazate pe AI.', 'NodeStack designs and engineers full-stack platforms, scalable backends, Web3 products, and AI-powered experiences.', 'NodeStack konzipiert Full-Stack-Plattformen, skalierbare Backends, Web3-Produkte und KI-gestützte Erlebnisse.', 'NodeStack utvikler fullstack-plattformer, skalerbare backender, Web3-produkter og KI-drevne opplevelser.')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-brand text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-dark transition-all shadow-lg shadow-brand/25 group"
                >
                  {t('Începe un proiect', 'Start a project', 'Projekt starten', 'Start et prosjekt')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center bg-white/5 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all border border-white/10"
                >
                  {t('Vezi proiectele', 'View Projects', 'Projekte ansehen', 'Se prosjekter')}
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{opacity:0,x:35}} animate={{opacity:1,x:0}} transition={{duration:.7,delay:.12}} className="relative lg:pl-5">
              <div className="absolute -inset-10 bg-gradient-to-br from-brand/20 via-cyan-500/5 to-transparent rounded-full blur-3xl"/>
              <Link href="/portfolio" className="relative block rounded-[1.75rem] border border-white/15 bg-slate-900 p-2.5 shadow-2xl shadow-black/40 rotate-1 hover:rotate-0 transition duration-500 group">
                <div className="h-8 rounded-t-[1.15rem] bg-slate-950 border-b border-white/10 flex items-center gap-1.5 px-4"><i className="h-2 w-2 rounded-full bg-red-400/60"/><i className="h-2 w-2 rounded-full bg-amber-400/60"/><i className="h-2 w-2 rounded-full bg-emerald-400/60"/><span className="ml-3 text-[9px] text-slate-600">{heroProject.url}</span></div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-b-[1.15rem]">
                  <AnimatePresence mode="wait">
                    <motion.img key={heroProject.title} src={heroProject.image} alt={`${heroProject.title} website shown in a browser`} referrerPolicy="no-referrer" initial={{opacity:0,scale:1.03}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.98}} transition={{duration:.55}} className="absolute inset-0 h-full w-full object-cover group-hover:scale-[1.02]"/>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent"/>
                  <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-slate-950/80 backdrop-blur px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">{heroProject.title}</span>
                  <div className="absolute bottom-5 right-4 flex gap-1.5" aria-hidden="true">{heroShowcaseProjects.map((project, index) => <span key={project.title} className={`h-1.5 rounded-full transition-all ${index === heroProjectIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/45'}`}/>)}</div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 border-y border-white/5 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div><p className="text-slate-500 font-mono text-sm uppercase tracking-widest mb-2">{t('Tehnologiile noastre principale', 'Our Core Technology Stack', 'Unser Technologie-Stack', 'Vår teknologistack')}</p><p className="text-sm text-slate-600">Frontend · Backend · AI · REST APIs · Databases · Cloud · Web3</p></div>
          </div>
          <div className="relative">
            <div ref={stackCarousel} className="flex gap-4 overflow-x-auto px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {[...techStack, ...techStack, ...techStack].map((tech, index) => (
                <div key={`${tech.name}-${index}`} aria-hidden={index >= techStack.length ? true : undefined} className="shrink-0 w-36 sm:w-40 h-36 rounded-2xl bg-white/[.035] border border-white/10 flex flex-col items-center justify-center gap-4 group hover:border-brand/40 hover:bg-white/[.06] transition">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-950 border border-white/10 group-hover:scale-105 transition"><img src={tech.logo} alt="" loading="lazy" className={`h-7 w-7 object-contain ${tech.invert ? 'brightness-0 invert' : ''}`}/></div>
                  <span className="text-slate-400 text-sm font-semibold group-hover:text-white transition-colors">{tech.name}</span>
                </div>
              ))}
            </div>
            <button onClick={()=>moveStack(-1)} aria-label={t('Tehnologia anterioară','Previous technology','Vorherige Technologie','Forrige teknologi')} className="absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-slate-950/90 text-white shadow-xl hover:bg-brand transition"><ArrowLeft className="h-4 w-4"/></button>
            <button onClick={()=>moveStack(1)} aria-label={t('Tehnologia următoare','Next technology','Nächste Technologie','Neste teknologi')} className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-slate-950/90 text-white shadow-xl hover:bg-brand transition"><ArrowRight className="h-4 w-4"/></button>
          </div>
        </div>
      </section>

      {/* Services Landing Section */}
      <section className="py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="max-w-3xl">
              <span className="text-brand font-mono text-sm uppercase tracking-[.2em]">{t('Serviciile noastre','Our services','Unsere Leistungen','Våre tjenester')}</span>
              <h2 className="text-4xl lg:text-6xl font-bold mt-4 mb-5">{t('Ce putem construi pentru tine.','What we can build for you.','Was wir für Sie entwickeln können.','Hva vi kan bygge for deg.')}</h2>
              <p className="text-lg text-slate-400">{t('De la prezență online și vizibilitate în Google până la platforme digitale complexe.','From online presence and Google visibility to complex digital platforms.','Von Online-Präsenz und Google-Sichtbarkeit bis zu komplexen digitalen Plattformen.','Fra digital tilstedeværelse og Google-synlighet til komplekse digitale plattformer.')}</p>
            </div>
          </div>
          <div className="relative">
          <div ref={servicesCarousel} className="flex gap-5 sm:gap-7 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-5 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { title:t('Website-uri de prezentare','Business Websites','Unternehmenswebsites','Bedriftsnettsider'), desc:t('Website-uri rapide și convingătoare care transformă vizitatorii în clienți.','Fast, persuasive websites that turn visitors into clients.','Schnelle, überzeugende Websites, die Besucher in Kunden verwandeln.','Raske, overbevisende nettsider som gjør besøkende til kunder.'), href:'/services/websites', visual:'website' },
              { title:t('Website-uri Hospitality','Hospitality Websites','Hospitality-Websites','Nettsider for reiseliv'), desc:t('Experiențe premium pentru hoteluri și vile, create pentru rezervări directe.','Premium hotel and villa experiences designed for direct bookings.','Premium-Erlebnisse für Hotels und Villen, entwickelt für Direktbuchungen.','Førsteklasses opplevelser for hotell og villa, bygget for direktebestilling.'), href:'/services/hospitality', visual:'hotel' },
              { title:t('Aplicații Web','Web Applications','Webanwendungen','Webapplikasjoner'), desc:t('Platforme, automatizări și produse custom construite în jurul afacerii tale.','Platforms, automation and custom products built around your business.','Plattformen, Automatisierungen und individuelle Produkte für Ihr Unternehmen.','Plattformer, automatisering og skreddersydde produkter for virksomheten din.'), href:'/services/web-applications', visual:'app' },
              { title:t('Optimizare SEO','SEO Optimization','SEO-Optimierung','SEO-optimalisering'), desc:t('Fundație tehnică, conținut și SEO local pentru vizibilitate măsurabilă.','Technical foundations, content and local SEO for measurable visibility.','Technik, Inhalte und lokale SEO für messbare Sichtbarkeit.','Teknisk grunnlag, innhold og lokal SEO for målbar synlighet.'), href:'/services/seo', visual:'seo' },
            ].map((service,i)=><motion.article key={service.href} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.07}} className="group glass rounded-[2rem] overflow-hidden hover:border-brand/40 transition shrink-0 snap-start w-[88vw] sm:w-[72vw] lg:w-[calc(50%-0.875rem)]"><div className="bg-slate-950 border-b border-white/5"><ServiceShowcaseVisual type={service.visual} projectHref="/portfolio"/></div><div className="p-7 sm:p-8"><h3 className="text-2xl mb-3">{service.title}</h3><p className="text-slate-400 leading-relaxed mb-6 min-h-14">{service.desc}</p><Link href={service.href} className="inline-flex items-center text-brand font-bold">{t('Descoperă serviciul','Explore service','Leistung entdecken','Utforsk tjenesten')}<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition"/></Link></div></motion.article>)}
          </div>
          <button onClick={()=>moveServices(-1)} aria-label={t('Serviciul anterior','Previous service','Vorherige Leistung','Forrige tjeneste')} className="absolute left-1 sm:-left-6 top-1/2 -translate-y-1/2 z-30 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-slate-950/90 backdrop-blur text-white shadow-xl hover:bg-brand hover:border-brand transition"><ArrowLeft className="h-5 w-5"/></button>
          <button onClick={()=>moveServices(1)} aria-label={t('Serviciul următor','Next service','Nächste Leistung','Neste tjeneste')} className="absolute right-1 sm:-right-6 top-1/2 -translate-y-1/2 z-30 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-slate-950/90 backdrop-blur text-white shadow-xl hover:bg-brand hover:border-brand transition"><ArrowRight className="h-5 w-5"/></button>
          </div>
          <p className="mt-3 text-xs text-slate-600 md:hidden">{t('Glisează pentru mai multe servicii','Swipe for more services','Wischen für weitere Leistungen','Sveip for flere tjenester')} →</p>
        </div>
      </section>

      {/* Process & FAQ */}
      <section className="py-24 lg:py-32 border-y border-white/5 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-brand font-mono text-sm uppercase tracking-[.2em]">{t('Cum lucrăm','How we work','So arbeiten wir','Slik jobber vi')}</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-5">{t('De la idee la lansare.','From idea to launch.','Von der Idee bis zum Start.','Fra idé til lansering.')}</h2>
            <p className="text-lg text-slate-400">{t('Un proces simplu și transparent, cu pași clari și comunicare directă.','A simple, transparent process with clear steps and direct communication.','Ein einfacher, transparenter Prozess mit klaren Schritten und direkter Kommunikation.','En enkel og transparent prosess med tydelige steg og direkte kommunikasjon.')}</p>
          </div>
          <div className="grid md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden mb-24">
            {[
              {title:t('Descoperire','Discovery','Analyse','Kartlegging'),desc:t('Înțelegem afacerea, publicul și obiectivele tale.','We understand your business, audience and goals.','Wir verstehen Ihr Unternehmen, Ihre Zielgruppe und Ihre Ziele.','Vi forstår virksomheten, målgruppen og målene dine.')},
              {title:t('Design','Design','Design','Design'),desc:t('Definim structura, experiența și direcția vizuală.','We define structure, experience and visual direction.','Wir definieren Struktur, Erlebnis und visuelle Richtung.','Vi definerer struktur, opplevelse og visuell retning.')},
              {title:t('Dezvoltare','Development','Entwicklung','Utvikling'),desc:t('Construim, integrăm și testăm pe toate dispozitivele.','We build, integrate and test across devices.','Wir entwickeln, integrieren und testen auf allen Geräten.','Vi bygger, integrerer og tester på alle enheter.')},
              {title:t('Lansare','Launch','Veröffentlichung','Lansering'),desc:t('Publicăm, măsurăm rezultatele și îmbunătățim.','We publish, measure results and improve.','Wir veröffentlichen, messen Ergebnisse und optimieren.','Vi publiserer, måler resultater og forbedrer.')},
            ].map((step,i)=><motion.article key={step.title} initial={{opacity:0,y:15}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}} className="bg-slate-950 p-7 lg:p-9 min-h-56 group"><div className="flex items-center justify-between"><span className="font-mono text-brand text-sm">0{i+1}</span><span className="h-px w-10 bg-white/10 group-hover:bg-brand transition"/></div><h3 className="text-xl mt-10 mb-3">{step.title}</h3><p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p></motion.article>)}
          </div>

          <div className="grid lg:grid-cols-[.75fr_1.25fr] gap-12 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-32"><span className="text-brand font-mono text-sm uppercase tracking-[.2em]">FAQ</span><h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-5">{t('Întrebări frecvente.','Common questions.','Häufige Fragen.','Vanlige spørsmål.')}</h2><p className="text-slate-400 leading-relaxed">{t('Răspunsuri rapide despre costuri, termene și colaborarea cu NodeStack.','Quick answers about costs, timelines and working with NodeStack.','Kurze Antworten zu Kosten, Zeitrahmen und der Zusammenarbeit mit NodeStack.','Raske svar om kostnader, tidslinjer og samarbeid med NodeStack.')}</p></div>
            <div className="space-y-3">
              {[
                {q:t('Cât durează realizarea unui website?','How long does a website take?','Wie lange dauert eine Website?','Hvor lang tid tar en nettside?'),a:t('Un website de prezentare simplu durează, de regulă, între 1 și 3 săptămâni. Proiectele cu integrări sau conținut complex necesită mai mult timp.','A simple presentation website usually takes 1–3 weeks. Projects with integrations or complex content require more time.','Eine einfache Unternehmenswebsite dauert in der Regel 1–3 Wochen. Projekte mit Integrationen oder komplexen Inhalten benötigen mehr Zeit.','En enkel presentasjonsnettside tar vanligvis 1–3 uker. Prosjekter med integrasjoner eller komplekst innhold krever mer tid.')},
                {q:t('Domeniul și găzduirea sunt incluse?','Are domain and hosting included?','Sind Domain und Hosting inklusive?','Er domene og hosting inkludert?'),a:t('Da. Pachetul Esențial include domeniul pentru primul an, Cloudflare, SSL, securitate și găzduire administrată.','Yes. The Essential package includes the first-year domain, Cloudflare, SSL, security and managed hosting.','Ja. Das Basispaket enthält die Domain im ersten Jahr, Cloudflare, SSL, Sicherheit und verwaltetes Hosting.','Ja. Basispakken inkluderer domene første år, Cloudflare, SSL, sikkerhet og administrert hosting.')},
                {q:t('SEO este inclus în website?','Is SEO included with the website?','Ist SEO in der Website enthalten?','Er SEO inkludert med nettsiden?'),a:t('Toate website-urile includ fundația SEO tehnică și on-page. Pentru cercetare avansată, conținut și creștere continuă oferim serviciul SEO dedicat.','Every website includes technical and basic on-page SEO. For advanced research, content and continuous growth, we offer a dedicated SEO service.','Jede Website enthält technische und grundlegende On-Page-SEO. Für erweiterte Recherche, Inhalte und kontinuierliches Wachstum bieten wir einen eigenen SEO-Service.','Alle nettsider inkluderer teknisk og grunnleggende on-page SEO. For avansert analyse, innhold og kontinuerlig vekst tilbyr vi en egen SEO-tjeneste.')},
                {q:t('Putem continua colaborarea după lansare?','Can we continue working together after launch?','Können wir nach dem Start weiter zusammenarbeiten?','Kan vi fortsette samarbeidet etter lansering?'),a:t('Da. Oferim mentenanță, monitorizare, actualizări, optimizare SEO și dezvoltarea de funcționalități noi.','Yes. We provide maintenance, monitoring, updates, SEO optimization and development of new functionality.','Ja. Wir bieten Wartung, Monitoring, Updates, SEO-Optimierung und die Entwicklung neuer Funktionen.','Ja. Vi tilbyr vedlikehold, overvåking, oppdateringer, SEO-optimalisering og utvikling av ny funksjonalitet.')},
              ].map((item,i)=><details key={item.q} className="group rounded-2xl border border-white/10 bg-slate-950/70 open:border-brand/30 transition"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 text-white font-semibold [&::-webkit-details-marker]:hidden"><span><span className="font-mono text-xs text-slate-600 mr-4">0{i+1}</span>{item.q}</span><ChevronDown className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180 group-open:text-brand"/></summary><div className="px-6 pb-6 pl-14 text-sm leading-relaxed text-slate-400">{item.a}</div></details>)}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Landing Section */}
      <section className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">{t('Proiecte', 'Featured', 'Ausgewählte', 'Utvalgte')} <span className="text-brand">{t('Selectate', 'Work', 'Projekte', 'prosjekter')}</span></h2>
              <p className="text-slate-400 max-w-xl">{t('O selecție de produse digitale construite de echipa noastră.', 'A selection of digital products engineered by our team.', 'Eine Auswahl digitaler Produkte, die von unserem Team entwickelt wurden.', 'Et utvalg digitale produkter utviklet av teamet vårt.')}</p>
            </div>
            <Link href="/portfolio" className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl font-bold transition-all">
              {t('Vezi portofoliul', 'View All Work', 'Alle Projekte', 'Se alle prosjekter')}
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolioPreview.map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl overflow-hidden glass border border-white/5"
              >
                <Link href="/portfolio" className="absolute inset-0 z-20" aria-label={`Open portfolio: ${project.title}`} />
                <div className="relative aspect-video flex items-center justify-center overflow-hidden bg-slate-900/50">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <span className="text-slate-200 text-xl md:text-2xl tracking-wider font-black text-center group-hover:scale-110 transition-transform duration-500">
                      {project.title}
                    </span>
                  )}
                </div>
                <div className="p-6 border-t border-white/5 bg-slate-950/70">
                  <p className="text-brand font-mono text-xs uppercase tracking-widest mb-2">{project.category}</p>
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Landing Section */}
      <section className="py-24 bg-brand relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl lg:text-6xl font-bold text-white mb-8">{t('Hai să', "Let's", 'Lassen Sie uns', 'La oss')} <span className="text-slate-900">{t('Construim', 'Build', 'etwas', 'bygge')}</span> {t('Ceva.', 'Something.', 'entwickeln.', 'noe sammen.')}</h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
            {t('Suntem pregătiți să discutăm despre următorul produs, platformă sau provocare tehnică.', "We're ready to discuss your next product, platform, or technical challenge.", 'Wir sind bereit, über Ihr nächstes Produkt, Ihre Plattform oder technische Herausforderung zu sprechen.', 'Vi er klare til å diskutere ditt neste produkt, din plattform eller tekniske utfordring.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-slate-950 text-white px-10 py-4 rounded-xl font-bold text-xl hover:bg-slate-900 transition-all shadow-2xl"
            >
              {t('Contactează-ne', 'Get In Touch', 'Kontakt aufnehmen', 'Ta kontakt')}
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white/10 text-white px-10 py-4 rounded-xl font-bold text-xl hover:bg-white/20 transition-all border border-white/20"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              {t('Scrie-ne pe WhatsApp', 'WhatsApp Us', 'WhatsApp-Nachricht', 'Kontakt oss på WhatsApp')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
