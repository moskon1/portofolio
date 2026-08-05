import { motion } from 'motion/react';
import { Globe, Database, Settings, CheckCircle2, ShieldCheck, Cloud, CalendarCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { localize, useLocale } from '@/src/lib/i18n';

const services = [
  {
    icon: <ShieldCheck className="h-12 w-12 text-brand" />,
    title: "Smart Contract Engineering",
    description: "We engineer secure decentralized applications and smart contracts using high-performance architectures like Rust and Solidity.",
    features: [
      "Solana & EVM Development",
      "Smart Contract Audits",
      "DeFi Protocol Engineering",
      "NFT Marketplaces & Minting",
      "Web3 Wallet Integrations"
    ]
  },
  {
    icon: <Globe className="h-12 w-12 text-brand" />,
    title: "Full-Stack Development",
    description: "End-to-end development of modern web applications with a focus on performance and user experience.",
    features: [
      "React & Next.js Apps",
      "Responsive UI/UX Design",
      "State Management Systems",
      "Performance Optimization",
      "SEO & Growth Strategy"
    ]
  },
  {
    icon: <Database className="h-12 w-12 text-brand" />,
    title: "Backend & AI Integration",
    description: "Scalable server-side architectures and intelligent AI integrations to power your next-gen applications.",
    features: [
      "RESTful & GraphQL API Dev",
      "LLM & AI Agent Integration",
      "Real-time Data Processing",
      "Microservices Architecture",
      "Database Design & Optimization"
    ]
  },
  {
    icon: <Settings className="h-12 w-12 text-brand" />,
    title: "Maintenance & Support",
    description: "Ongoing technical support to ensure your digital products stay secure and up-to-date.",
    features: [
      "24/7 Monitoring",
      "Security Patches & Updates",
      "Cloud Hosting Management",
      "Bug Fixes & Improvements",
      "Performance Audits"
    ]
  }
];

export default function Services() {
  const { locale } = useLocale();
  const t = (ro: string, en: string, de: string, no: string) => localize(locale, { ro, en, de, no });
  const serviceCopy = [
    t('Dezvoltăm aplicații descentralizate și contracte inteligente sigure folosind Rust și Solidity.', services[0].description, 'Wir entwickeln sichere dezentrale Anwendungen und Smart Contracts mit Rust und Solidity.', 'Vi utvikler sikre desentraliserte applikasjoner og smartkontrakter med Rust og Solidity.'),
    t('Dezvoltare completă de aplicații web moderne, rapide și ușor de utilizat.', services[1].description, 'End-to-End-Entwicklung moderner Webanwendungen mit Fokus auf Leistung und Benutzerfreundlichkeit.', 'Komplett utvikling av moderne webapplikasjoner med fokus på ytelse og brukeropplevelse.'),
    t('Arhitecturi backend scalabile și integrări AI pentru aplicații de nouă generație.', services[2].description, 'Skalierbare Backend-Architekturen und KI-Integrationen für Anwendungen der nächsten Generation.', 'Skalerbare backendarkitekturer og KI-integrasjoner for neste generasjons applikasjoner.'),
    t('Suport tehnic continuu pentru produse digitale sigure, rapide și actualizate.', services[3].description, 'Kontinuierlicher technischer Support für sichere, schnelle und aktuelle digitale Produkte.', 'Kontinuerlig teknisk støtte for sikre, raske og oppdaterte digitale produkter.'),
  ];
  const serviceTitles = [
    t('Inginerie Smart Contract', services[0].title, 'Smart-Contract-Entwicklung', 'Smartkontraktutvikling'),
    t('Dezvoltare Full-Stack', services[1].title, 'Full-Stack-Entwicklung', 'Fullstack-utvikling'),
    t('Backend & Integrare AI', services[2].title, 'Backend & KI-Integration', 'Backend og KI-integrasjon'),
    t('Mentenanță & Suport', services[3].title, 'Wartung & Support', 'Vedlikehold og støtte'),
  ];
  const launchPrice = locale === 'ro' ? '1.500 LEI' : locale === 'no' ? '3.500 NOK' : '€300';
  const monthlyPrice = locale === 'ro' ? '50 LEI/lună' : locale === 'no' ? '120 NOK/mnd.' : locale === 'de' ? '€10/Monat' : '€10/month';
  return (
    <div className="pt-20 bg-slate-950">
      {/* Header */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-brand/5 blur-3xl rounded-full -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-7xl font-bold text-white mb-6"
          >
            {t('Capabilități', 'Technical', 'Technische', 'Tekniske')} <span className="text-gradient">{t('Tehnice', 'Capabilities', 'Kompetenzen', 'tjenester')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto"
          >
            {t('Folosim tehnologii moderne pentru a construi soluții digitale robuste, scalabile și sigure.', 'Leveraging the latest technologies to build robust, scalable, and secure digital solutions.', 'Wir nutzen moderne Technologien für robuste, skalierbare und sichere digitale Lösungen.', 'Vi bruker moderne teknologi for å bygge robuste, skalerbare og sikre digitale løsninger.')}
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-10 rounded-3xl hover:border-brand/50 transition-all group"
              >
                <div className="mb-8 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-brand group-hover:text-white transition-all">
                  {service.icon}
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{serviceTitles[idx]}</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  {serviceCopy[idx]}
                </p>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center space-x-3 text-slate-300 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospitality Packages */}
      <section className="py-24 bg-slate-900/40 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.12),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-brand font-mono text-sm uppercase tracking-[0.25em]">{t('Pentru hoteluri, vile și pensiuni', 'For hotels, villas & guesthouses', 'Für Hotels, Villen & Pensionen', 'For hoteller, villaer og gjestehus')}</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mt-4 mb-5">{t('Pachete Web pentru Turism', 'Hospitality Website Packages', 'Website-Pakete für Gastgeber', 'Nettsidepakker for reiseliv')}</h2>
            <p className="text-slate-400 text-lg">
              {t('Website-uri moderne, optimizate pentru mobil, create pentru încredere, rezervări directe și mai puțină dependență de platforme terțe.', 'Modern, mobile-first websites designed to build trust, attract direct reservations, and reduce reliance on third-party platforms.', 'Moderne, mobile Websites für mehr Vertrauen, Direktbuchungen und weniger Abhängigkeit von Drittplattformen.', 'Moderne, mobiltilpassede nettsider som bygger tillit, gir flere direktebestillinger og reduserer avhengigheten av tredjepartsplattformer.')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 lg:p-10 flex flex-col"
            >
              <div className="flex items-start justify-between gap-5 mb-8">
                <div>
                  <p className="text-brand font-mono text-xs uppercase tracking-widest mb-2">{t('Esențial', 'Essential', 'Basis', 'Basis')}</p>
                  <h3 className="text-2xl font-bold text-white">{t('Lansare Hospitality', 'Hospitality Launch', 'Gastgeber-Website Start', 'Lanseringspakke')}</h3>
                </div>
                <Globe className="h-10 w-10 text-brand shrink-0" />
              </div>
              <div className="mb-8">
                <span className="text-4xl lg:text-5xl font-bold text-white">{launchPrice}</span>
                <p className="text-sm text-slate-400 mt-2">{t('Plată unică pentru realizarea website-ului', 'One-time website setup', 'Einmalige Website-Erstellung', 'Engangspris for nettsiden')}</p>
              </div>
              <ul className="space-y-3 mb-9 flex-1">
                {[
                  t('Website modern și responsive', 'Modern responsive website', 'Moderne responsive Website', 'Moderne responsiv nettside'),
                  t('Domeniu inclus în primul an', 'Domain registration included for the first year', 'Domainregistrierung im ersten Jahr inklusive', 'Domeneregistrering inkludert første år'),
                  t('Hosting Cloudflare, CDN, SSL și securitate', 'Cloudflare hosting, CDN, SSL & security', 'Cloudflare-Hosting, CDN, SSL & Sicherheit', 'Cloudflare-hosting, CDN, SSL og sikkerhet'),
                  t('Configurare SEO on-page de bază', 'Basic on-page SEO setup', 'Grundlegende On-Page-SEO', 'Grunnleggende on-page SEO'),
                  t('Configurare sau optimizare Profil Companie Google', 'Google Business Profile setup or optimization', 'Einrichtung oder Optimierung des Google-Unternehmensprofils', 'Oppsett eller optimalisering av Google-bedriftsprofil'),
                  t('Acțiuni WhatsApp, telefon și solicitări', 'WhatsApp, phone and inquiry actions', 'WhatsApp-, Telefon- und Anfragefunktionen', 'WhatsApp-, telefon- og forespørselshandlinger'),
                  t('Google Maps și linkuri social media', 'Google Maps and social media links', 'Google Maps und Social-Media-Links', 'Google Maps og lenker til sosiale medier'),
                  t('Optimizare pentru performanță și mobil', 'Performance and mobile optimization', 'Performance- und Mobiloptimierung', 'Ytelses- og mobiloptimalisering'),
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-brand shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 flex items-center gap-3">
                <Cloud className="h-5 w-5 text-accent shrink-0" />
                <p className="text-sm text-slate-300"><strong className="text-white">{monthlyPrice}</strong> {t('hosting și mentenanță', 'hosting and maintenance', 'Hosting und Wartung', 'hosting og vedlikehold')}</p>
              </div>
              <Link to="/contact" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 border border-white/10 text-white py-3.5 px-6 rounded-xl font-bold transition">
                {t('Alege pachetul Esențial', 'Choose Essential', 'Basispaket wählen', 'Velg basispakken')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl p-8 lg:p-10 flex flex-col bg-gradient-to-b from-brand/20 to-white/5 border border-brand/40 shadow-2xl shadow-brand/10 relative"
            >
              <span className="absolute top-0 right-8 -translate-y-1/2 bg-brand text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">{t('Pentru creștere', 'For growth', 'Für Wachstum', 'For vekst')}</span>
              <div className="flex items-start justify-between gap-5 mb-8">
                <div>
                  <p className="text-accent font-mono text-xs uppercase tracking-widest mb-2">{t('Avansat', 'Advanced', 'Erweitert', 'Avansert')}</p>
                  <h3 className="text-2xl font-bold text-white">{t('Creștere prin Rezervări Directe', 'Direct Booking Growth', 'Wachstum durch Direktbuchungen', 'Vekst med direktebestilling')}</h3>
                </div>
                <CalendarCheck className="h-10 w-10 text-accent shrink-0" />
              </div>
              <div className="mb-8">
                <span className="text-4xl lg:text-5xl font-bold text-white">{t('Ofertă', 'Custom', 'Individuell', 'Tilpasset')}</span>
                <span className="text-slate-500 ml-2">{t('personalizată', 'quote', 'Angebot', 'tilbud')}</span>
                <p className="text-sm text-slate-400 mt-2">{t('În funcție de camere, platforme și integrările necesare', 'Based on rooms, platforms and required integrations', 'Basierend auf Zimmern, Plattformen und erforderlichen Integrationen', 'Basert på rom, plattformer og nødvendige integrasjoner')}</p>
              </div>
              <ul className="space-y-3 mb-9 flex-1">
                {[
                  t('Tot ce este inclus în pachetul Esențial', 'Everything included in Hospitality Launch', 'Alles aus dem Basispaket', 'Alt i basispakken'),
                  t('SEO local și tehnic avansat', 'Advanced local and technical SEO', 'Erweiterte lokale und technische SEO', 'Avansert lokal og teknisk SEO'),
                  t('Conectare Booking.com și Airbnb', 'Booking.com & Airbnb connection', 'Anbindung an Booking.com & Airbnb', 'Tilkobling til Booking.com og Airbnb'),
                  t('Calendar de disponibilitate și sincronizare iCal', 'Availability calendar and iCal synchronization', 'Verfügbarkeitskalender und iCal-Synchronisierung', 'Tilgjengelighetskalender og iCal-synkronisering'),
                  t('Flux pentru solicitări de rezervare directă', 'Direct reservation request flow', 'Ablauf für direkte Buchungsanfragen', 'Flyt for direkte bestillingsforespørsler'),
                  t('Pagini pentru camere, vile și prețuri sezoniere', 'Room, villa and seasonal pricing pages', 'Zimmer-, Villen- und Saisonpreisseiten', 'Sider for rom, villaer og sesongpriser'),
                  'Google Analytics & Search Console',
                  t('Urmărirea conversiilor și raportare lunară', 'Conversion tracking and monthly reporting', 'Conversion-Tracking und monatliche Berichte', 'Konverteringssporing og månedlig rapportering'),
                  t('Structură de conținut multilingvă', 'Multilingual content structure', 'Mehrsprachige Inhaltsstruktur', 'Flerspråklig innholdsstruktur'),
                  t('Secțiuni pentru recenzii, galerie și atracții locale', 'Review, gallery and local-attractions sections', 'Bereiche für Bewertungen, Galerie und lokale Attraktionen', 'Seksjoner for anmeldelser, galleri og lokale attraksjoner'),
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <Link to="/demos/hospitality" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 border border-white/10 text-white py-3.5 px-5 rounded-xl font-bold transition">
                  {t('Vezi demo live', 'View live demo', 'Live-Demo ansehen', 'Se live-demo')}
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center bg-brand hover:bg-brand-dark text-white py-3.5 px-5 rounded-xl font-bold transition shadow-lg shadow-brand/20">
                  {t('Solicită o ofertă', 'Request a quote', 'Angebot anfordern', 'Be om tilbud')}
                </Link>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {t('Abonamentele platformelor, taxele channel manager și comisioanele terților nu sunt incluse. Integrările depind de accesul clientului la platforme.', 'Platform subscriptions, channel-manager fees and third-party commissions are not included. Integration availability depends on the client’s platform access.', 'Plattformabonnements, Channel-Manager-Gebühren und Drittanbieterprovisionen sind nicht enthalten. Integrationen hängen vom Plattformzugang des Kunden ab.', 'Plattformabonnementer, channel-manager-gebyrer og tredjepartsprovisjoner er ikke inkludert. Integrasjoner avhenger av kundens plattformtilgang.')}
              </p>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">{t('Procesul nostru', 'Working Process', 'Unser Prozess', 'Arbeidsprosessen vår')}</h2>
            <p className="text-slate-400">{t('Transformăm ideile în produse digitale.', 'Bringing ideas to life through engineering.', 'Wir verwandeln Ideen in digitale Produkte.', 'Vi gjør ideer til digitale produkter.')}</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: t('Descoperire', 'Discovery', 'Analyse', 'Kartlegging'),
                desc: t('Înțelegem obiectivele și publicul afacerii tale.', 'Understanding your goals and audience.', 'Wir verstehen Ihre Ziele und Ihre Zielgruppe.', 'Vi kartlegger målene dine og målgruppen din.'),
              },
              {
                step: "02",
                title: t('Design', 'Design', 'Design', 'Design'),
                desc: t('Creăm interfețe moderne, intuitive și atractive.', 'Creating intuitive and beautiful interfaces.', 'Wir gestalten intuitive und ansprechende Benutzeroberflächen.', 'Vi lager intuitive og attraktive brukergrensesnitt.'),
              },
              {
                step: "03",
                title: t('Dezvoltare', 'Development', 'Entwicklung', 'Utvikling'),
                desc: t('Construim cod robust, rapid și scalabil.', 'Building robust and scalable code.', 'Wir entwickeln robusten und skalierbaren Code.', 'Vi bygger robust og skalerbar kode.'),
              },
              {
                step: "04",
                title: t('Lansare', 'Launch', 'Veröffentlichung', 'Lansering'),
                desc: t('Publicăm produsul și îl optimizăm pentru rezultate.', 'Deploying and optimizing for success.', 'Wir veröffentlichen und optimieren das Produkt für nachhaltigen Erfolg.', 'Vi publiserer og optimaliserer produktet for gode resultater.'),
              }
            ].map((p, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-bold text-brand/20 mb-4">{p.step}</div>
                <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
