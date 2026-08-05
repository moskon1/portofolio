import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Cpu, Code2, Database, Layout, MessageCircle, ShieldCheck, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { localize, useLocale } from '@/src/lib/i18n';

const techStack = [
  { name: 'Rust', icon: <Cpu className="h-6 w-6" />, color: 'text-orange-500' },
  { name: 'Anchor', icon: <ShieldCheck className="h-6 w-6" />, color: 'text-brand' },
  { name: 'React', icon: <Code2 className="h-6 w-6" />, color: 'text-blue-400' },
  { name: 'TypeScript', icon: <Cpu className="h-6 w-6" />, color: 'text-blue-500' },
  { name: 'Solidity', icon: <ShieldCheck className="h-6 w-6" />, color: 'text-slate-300' },
  { name: 'Next.js', icon: <Layout className="h-6 w-6" />, color: 'text-white' },
];

const portfolioPreview = [
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

export default function Home() {
  const { locale } = useLocale();
  const t = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '40700000000';

  return (
    <div className="pt-20 bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.14),transparent_42%),radial-gradient(circle_at_25%_40%,rgba(59,130,246,0.12),transparent_40%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 px-4 py-1.5 rounded-full text-brand text-sm font-mono mb-8">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span>{t('Agenție de produse digitale', 'Digital product agency', 'Agentur für digitale Produkte', 'Digital produktbyrå')}</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-8">
                {t('Construim produse care', 'We build products that', 'Wir entwickeln Produkte, die', 'Vi bygger produkter som')} <span className="text-gradient">{t('dezvoltă afaceri.', 'move businesses forward.', 'Unternehmen voranbringen.', 'driver bedrifter fremover.')}</span>
              </h1>
              <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                {t('NodeStack proiectează platforme full-stack, sisteme backend scalabile, produse Web3 și experiențe bazate pe AI.', 'NodeStack designs and engineers full-stack platforms, scalable backends, Web3 products, and AI-powered experiences.', 'NodeStack konzipiert Full-Stack-Plattformen, skalierbare Backends, Web3-Produkte und KI-gestützte Erlebnisse.', 'NodeStack utvikler fullstack-plattformer, skalerbare backender, Web3-produkter og KI-drevne opplevelser.')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-brand text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-dark transition-all shadow-lg shadow-brand/25 group"
                >
                  {t('Începe un proiect', 'Start a project', 'Projekt starten', 'Start et prosjekt')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center justify-center bg-white/5 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all border border-white/10"
                >
                  {t('Vezi proiectele', 'View Projects', 'Projekte ansehen', 'Se prosjekter')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 border-y border-white/5 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 font-mono text-sm uppercase tracking-widest mb-12">{t('Tehnologiile noastre principale', 'Our Core Technology Stack', 'Unser Technologie-Stack', 'Vår teknologistack')}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {techStack.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center space-y-3 group grayscale hover:grayscale-0 transition-all">
                <div className={cn("p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-brand/50 transition-colors", tech.color)}>
                  {tech.icon}
                </div>
                <span className="text-slate-400 text-sm font-medium group-hover:text-white transition-colors">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Landing Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">{t('Ce', 'What We', 'Was wir', 'Hva vi')} <span className="text-brand">{t('Construim', 'Build', 'entwickeln', 'bygger')}</span>.</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                {t('Dezvoltăm sisteme performante și aplicații descentralizate, axate pe viteză, securitate și scalabilitate.', 'We engineer high-throughput systems and decentralized applications with a focus on performance, security, and scalability.', 'Wir entwickeln leistungsstarke Systeme und dezentrale Anwendungen mit Fokus auf Performance, Sicherheit und Skalierbarkeit.', 'Vi utvikler høytytende systemer og desentraliserte applikasjoner med fokus på ytelse, sikkerhet og skalerbarhet.')}
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  t('Aplicații web full-stack', 'Full-Stack Web Applications', 'Full-Stack-Webanwendungen', 'Fullstack-nettapplikasjoner'),
                  t('Sisteme backend bazate pe AI', 'AI-Powered Backend Systems', 'KI-gestützte Backend-Systeme', 'KI-drevne backendsystemer'),
                  t('Sisteme descentralizate (Rust/Solidity)', 'Decentralized Systems (Rust/Solidity)', 'Dezentrale Systeme (Rust/Solidity)', 'Desentraliserte systemer (Rust/Solidity)'),
                  t('Infrastructură cloud', 'Cloud Infrastructure', 'Cloud-Infrastruktur', 'Skyinfrastruktur'),
                ].map((item) => (
                  <li key={item} className="flex items-center space-x-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/services" className="text-brand font-bold flex items-center hover:underline">
                {t('Vezi toate serviciile', 'View all services', 'Alle Leistungen', 'Se alle tjenester')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="glass p-6 rounded-2xl">
                  <ShieldCheck className="h-8 w-8 text-brand mb-4" />
                  <h3 className="font-bold mb-2">Web3</h3>
                  <p className="text-xs text-slate-500">Rust, Anchor, Solana</p>
                </div>
                <div className="glass p-6 rounded-2xl">
                  <Database className="h-8 w-8 text-accent mb-4" />
                  <h3 className="font-bold mb-2">Backend</h3>
                  <p className="text-xs text-slate-500">APIs, AI Integration</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="glass p-6 rounded-2xl">
                  <Globe className="h-8 w-8 text-purple-400 mb-4" />
                  <h3 className="font-bold mb-2">Growth</h3>
                  <p className="text-xs text-slate-500">SEO, Analytics</p>
                </div>
                <div className="glass p-6 rounded-2xl">
                  <Code2 className="h-8 w-8 text-green-400 mb-4" />
                  <h3 className="font-bold mb-2">DevOps</h3>
                  <p className="text-xs text-slate-500">Cloud, CI/CD</p>
                </div>
              </div>
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
            <Link to="/portfolio" className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl font-bold transition-all">
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
                {project.link && (
                  <Link to={project.link} className="absolute inset-0 z-20" aria-label={`Open ${project.title}`} />
                )}
                <div className="relative aspect-video flex items-center justify-center overflow-hidden bg-slate-900/50">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
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
              to="/contact"
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
