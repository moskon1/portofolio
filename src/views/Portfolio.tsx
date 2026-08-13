'use client';

import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { localize, useLocale } from '@/src/lib/i18n';

const projects = [
    {
    title: "Hospitality Booking Demo",
    category: "Hotel & Villa Website",
    image: "/hospitality.jpg",
    description: "A customizable hospitality website for hotels, villas, and resorts, featuring accommodation filters, galleries, reviews, room details, and direct WhatsApp booking.",
    tech: ["React", "TypeScript", "Tailwind CSS", "WhatsApp"],
    outcome: "A reusable client-ready demo that can be branded and configured for individual hospitality businesses.",
    link: "/demos/hospitality"
  },
    {
    title: "ProArt Studio",
    category: "Recording Studio Website",
    image: "https://proartstudio.ro/about-800.webp",
    description: "A modern presentation website designed to highlight services and projects with a polished look.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    outcome: "Shipped a responsive and performant website with clear content hierarchy.",
    link: "https://proartstudio.ro/"
  },
    {
    title: "Fusemon",
    category: "Solana Trading Card Game",
    image: "/fusemon-preview.png",
    description: "A competitive blockchain trading card game with collectible cards, booster packs, marketplace trading, spectator betting, and live PvP battles powered by Solana.",
    tech: ["React", "TypeScript", "Solana", "Web3"],
    outcome: "Built a connected game economy spanning card collection, deck building, marketplace activity, and competitive token-powered battles.",
    link: "https://www.fusemon.fun/"
  },
  {
    title: "4Chad",
    category: "Solana Launchpad & Trading",
    image: "/4chad-preview.png",
    description: "A decentralized launchpad and trading platform for trending SOL tokens. Discover, buy, and trade with sub-second finality using Jupiter's liquidity aggregation.",
    tech: ["Next.js", "Rust", "Anchor", "Supabase", "Jupiter SDK"],
    outcome: "Successfully launched 100+ tokens with a seamless trading experience and high community engagement.",
    link: "https://4chad.xyz"
  },

  {
    title: "SpinSaga",
    category: "Solana Gamified Utility",
    image: "/spinsaga-preview.png",
    description: "An immersive gamified experience on Solana that provides utility to NFT collections through on-chain RNG and rewards.",
    tech: ["Rust", "Anchor", "Unity WebGL", "React"],
    outcome: "Successfully integrated with 50+ top-tier Solana NFT collections, driving significant user retention.",
    link: "https://spinsaga.fun"
  },
  {
    title: "Jah Order Sound System",
    category: "Web Application",
    image: "https://jah-order.vercel.app/book.jpg",
    description: "A production web app focused on a clean ordering flow and straightforward user experience.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    outcome: "Delivered a fast and reliable experience optimized for everyday usage.",
    link: "https://jah-order.vercel.app/"
  },
  {
    title: "RoVista",
    category: "Romania Travel Guide",
    image: "/rovista-preview.png",
    description: "An independent bilingual travel guide for discovering Romania through curated attractions, regions, practical context, and saved places.",
    tech: ["React", "TypeScript", "PWA", "Responsive Design"],
    outcome: "Delivered a fast, installable and mobile-friendly discovery experience with clear regional navigation and multilingual content.",
    link: "https://rovista.ro/"
  }
  // {
  //   title: "Royal Dice",
  //   category: "Gaming Website",
  //   logoText: "ROYAL DICE",
  //   description: "An interactive website with a game-oriented visual style and conversion-focused layout.",
  //   tech: ["React", "TypeScript", "Tailwind CSS"],
  //   outcome: "Launched a stable and engaging web presence with smooth navigation.",
  //   link: "https://royal-dice.vercel.app/"
  // }

];

export default function Portfolio() {
  const { locale } = useLocale();
  const t = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });
  const descriptions = [
    t('Demo personalizabil pentru hoteluri și vile, cu camere, galerii, recenzii și rezervări directe pe WhatsApp.', projects[0].description, 'Anpassbare Hotel- und Villenwebsite mit Zimmern, Galerien, Bewertungen und direkter WhatsApp-Buchung.', 'Tilpassbar nettside for hoteller og villaer med rom, galleri, anmeldelser og direkte WhatsApp-bestilling.'),
    t('Website modern pentru prezentarea serviciilor și proiectelor unui studio de înregistrări.', projects[1].description, 'Moderne Präsentationswebsite für die Leistungen und Projekte eines Tonstudios.', 'Moderne presentasjonsnettside for tjenestene og prosjektene til et lydstudio.'),
    t('Joc competitiv de cărți pe Solana, cu pachete, marketplace și lupte PvP.', projects[2].description, 'Kompetitives Solana-Sammelkartenspiel mit Boostern, Marktplatz und PvP-Kämpfen.', 'Konkurransebasert samlekortspill på Solana med kortpakker, markedsplass og PvP-kamper.'),
    t('Platformă descentralizată de lansare și tranzacționare a tokenurilor Solana.', projects[3].description, 'Dezentrale Plattform zum Starten und Handeln von Solana-Token.', 'Desentralisert plattform for lansering og handel av Solana-tokens.'),
    t('Experiență gamificată pe Solana care oferă utilitate colecțiilor NFT.', projects[4].description, 'Gamifiziertes Solana-Erlebnis mit Nutzen für NFT-Sammlungen.', 'Spillbasert Solana-opplevelse som gir nytte til NFT-samlinger.'),
    t('Aplicație web de producție cu un flux simplu și o experiență intuitivă.', projects[5].description, 'Produktionsreife Webanwendung mit klarem Ablauf und intuitiver Bedienung.', 'Produksjonsklar webapplikasjon med enkel flyt og intuitiv brukeropplevelse.'),
    t('Ghid de calatorie independent pentru descoperirea Romaniei prin atractii atent selectate, regiuni, context practic si locuri salvate.', projects[6].description, 'Unabhangiger zweisprachiger Reisefuhrer zur Entdeckung Rumaniens mit ausgewahlten Sehenswurdigkeiten, Regionen und praktischen Informationen.', 'Uavhengig tospraklig reiseguide for a oppdage Romania gjennom utvalgte attraksjoner, regioner og praktisk informasjon.'),
  ];
  const outcomes = [
    t('Un demo reutilizabil, pregătit pentru personalizarea fiecărui client.', projects[0].outcome, 'Eine wiederverwendbare, kundenspezifisch anpassbare Demo.', 'En gjenbrukbar demo som kan tilpasses hver kunde.'),
    t('Website responsive și rapid, cu o ierarhie clară a conținutului.', projects[1].outcome, 'Responsive, schnelle Website mit klarer Inhaltshierarchie.', 'Responsiv og rask nettside med tydelig innholdshierarki.'),
    t('Economie de joc conectată pentru colecționare, tranzacționare și competiție.', projects[2].outcome, 'Vernetzte Spielökonomie für Sammeln, Handel und Wettbewerb.', 'Sammenkoblet spilløkonomi for samling, handel og konkurranse.'),
    t('Experiență rapidă de lansare și tranzacționare pentru comunitatea Solana.', projects[3].outcome, 'Schnelles Launch- und Handelserlebnis für die Solana-Community.', 'Rask lanserings- og handelsopplevelse for Solana-miljøet.'),
    t('Integrare cu numeroase colecții NFT și retenție crescută.', projects[4].outcome, 'Integration zahlreicher NFT-Sammlungen mit hoher Nutzerbindung.', 'Integrasjon med mange NFT-samlinger og høy brukerbevaring.'),
    t('Experiență stabilă, rapidă și optimizată pentru utilizarea zilnică.', projects[5].outcome, 'Stabiles, schnelles Erlebnis für den täglichen Einsatz.', 'Stabil og rask opplevelse optimalisert for daglig bruk.'),
    t('Experienta rapida, instalabila si optimizata pentru mobil, cu navigare clara pe regiuni si continut multilingv.', projects[6].outcome, 'Schnelles, installierbares und mobilfreundliches Erlebnis mit klarer regionaler Navigation und mehrsprachigen Inhalten.', 'Rask, installerbar og mobilvennlig opplevelse med tydelig regional navigasjon og flerspraklig innhold.'),
  ];
  return (
    <div className="pt-20 bg-slate-950">
      {/* Header */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand/5 blur-3xl rounded-full translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-bold text-white mb-6"
          >
            {t('Studii de', 'Case', 'Fall', 'Kunde')} <span className="text-gradient">{t('Caz', 'Studies', 'studien', 'prosjekter')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 max-w-3xl"
          >
            {t('O selecție de proiecte în care am construit soluții performante și arhitecturi scalabile.', "A selection of technical projects where we've engineered high-performance solutions and scalable architectures.", 'Eine Auswahl technischer Projekte mit leistungsstarken Lösungen und skalierbaren Architekturen.', 'Et utvalg tekniske prosjekter med høytytende løsninger og skalerbar arkitektur.')}
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {[6, 0, 1, 2, 3, 4, 5].map((idx) => {
              const project = projects[idx];
              return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-3xl overflow-hidden hover:border-brand/50 transition-all group"
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`${t('Vizitează', 'Visit', 'Besuchen', 'Besøk')} ${project.title}`} className="aspect-video overflow-hidden relative bg-slate-900/50 flex items-center justify-center">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className={`${project.title === 'ProArt Studio' ? 'translate-y-5 text-[10px] md:text-xs tracking-[0.16em] max-w-24 text-center' : project.title === 'Jah Order Sound System' ? 'text-base md:text-lg tracking-wider' : 'text-xl md:text-2xl tracking-wider'} text-slate-200 font-black group-hover:scale-110 transition-transform duration-500`}>
                      {project.title || project.title}
                    </span>
                  )}
                  <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-brand uppercase tracking-wider border border-white/10">
                    {project.category}
                  </div>
                </a>
                <div className="p-8 lg:p-10">
                  <h2 className="text-2xl font-bold text-white mb-4">{project.title}</h2>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {descriptions[idx]}
                  </p>
                  
                  <div className="mb-8">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">{t('Tehnologii', 'Stack', 'Technologien', 'Teknologi')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span key={i} className="bg-white/5 text-slate-300 px-3 py-1 rounded-md text-xs font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-brand/10 p-6 rounded-2xl border border-brand/20 mb-8">
                    <h3 className="text-xs font-bold text-brand uppercase tracking-widest mb-2">{t('Impact', 'Impact', 'Ergebnis', 'Resultat')}</h3>
                    <p className="text-slate-300 text-sm italic">
                      {outcomes[idx]}
                    </p>
                  </div>

                  <div className="flex space-x-6">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-brand font-bold hover:text-brand-dark transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span>{t('Vizitează', 'Visit', 'Besuchen', 'Besøk')}</span>
                    </a>
                    <button className="flex items-center space-x-2 text-slate-500 font-bold hover:text-slate-300 transition-colors">
                      <Github className="h-5 w-5" />
                      <span>{t('Studiu de caz', 'Case Study', 'Fallstudie', 'Kundehistorie')}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
