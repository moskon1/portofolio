import { motion } from 'motion/react';
import { Globe, Database, Settings, CheckCircle2, ShieldCheck, Cloud, CalendarCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            Technical <span className="text-gradient">Capabilities</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto"
          >
            Leveraging the latest technologies to build robust, scalable, and secure digital solutions.
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
                <h2 className="text-2xl font-bold text-white mb-4">{service.title}</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  {service.description}
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
            <span className="text-brand font-mono text-sm uppercase tracking-[0.25em]">For hotels, villas & guesthouses</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mt-4 mb-5">Hospitality Website Packages</h2>
            <p className="text-slate-400 text-lg">
              Modern, mobile-first websites designed to build trust, attract direct reservations, and reduce reliance on third-party platforms.
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
                  <p className="text-brand font-mono text-xs uppercase tracking-widest mb-2">Essential</p>
                  <h3 className="text-2xl font-bold text-white">Hospitality Launch</h3>
                </div>
                <Globe className="h-10 w-10 text-brand shrink-0" />
              </div>
              <div className="mb-8">
                <span className="text-4xl lg:text-5xl font-bold text-white">€300</span>
                <span className="text-slate-500 ml-2">or 1,500 LEI</span>
                <p className="text-sm text-slate-400 mt-2">One-time website setup</p>
              </div>
              <ul className="space-y-3 mb-9 flex-1">
                {[
                  'Modern responsive website',
                  'Domain registration included for the first year',
                  'Cloudflare hosting, CDN, SSL & security',
                  'Basic on-page SEO setup',
                  'Google Business Profile setup or optimization',
                  'WhatsApp, phone and inquiry actions',
                  'Google Maps and social media links',
                  'Performance and mobile optimization',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-brand shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 flex items-center gap-3">
                <Cloud className="h-5 w-5 text-accent shrink-0" />
                <p className="text-sm text-slate-300"><strong className="text-white">50 LEI/month</strong> hosting and maintenance</p>
              </div>
              <Link to="/contact" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 border border-white/10 text-white py-3.5 px-6 rounded-xl font-bold transition">
                Choose Essential <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl p-8 lg:p-10 flex flex-col bg-gradient-to-b from-brand/20 to-white/5 border border-brand/40 shadow-2xl shadow-brand/10 relative"
            >
              <span className="absolute top-0 right-8 -translate-y-1/2 bg-brand text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full">For growth</span>
              <div className="flex items-start justify-between gap-5 mb-8">
                <div>
                  <p className="text-accent font-mono text-xs uppercase tracking-widest mb-2">Advanced</p>
                  <h3 className="text-2xl font-bold text-white">Direct Booking Growth</h3>
                </div>
                <CalendarCheck className="h-10 w-10 text-accent shrink-0" />
              </div>
              <div className="mb-8">
                <span className="text-4xl lg:text-5xl font-bold text-white">Custom</span>
                <span className="text-slate-500 ml-2">quote</span>
                <p className="text-sm text-slate-400 mt-2">Based on rooms, platforms and required integrations</p>
              </div>
              <ul className="space-y-3 mb-9 flex-1">
                {[
                  'Everything included in Hospitality Launch',
                  'Advanced local and technical SEO',
                  'Booking.com & Airbnb connection',
                  'Availability calendar and iCal synchronization',
                  'Direct reservation request flow',
                  'Room, villa and seasonal pricing pages',
                  'Google Analytics & Search Console',
                  'Conversion tracking and monthly reporting',
                  'Multilingual content structure',
                  'Review, gallery and local-attractions sections',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <Link to="/demos/hospitality" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 border border-white/10 text-white py-3.5 px-5 rounded-xl font-bold transition">
                  View live demo
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center bg-brand hover:bg-brand-dark text-white py-3.5 px-5 rounded-xl font-bold transition shadow-lg shadow-brand/20">
                  Request a quote
                </Link>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Platform subscriptions, channel-manager fees and third-party commissions are not included. Integration availability depends on the client’s platform access.
              </p>
            </motion.article>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Working Process</h2>
            <p className="text-slate-400">Bringing ideas to life through engineering.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your goals and audience." },
              { step: "02", title: "Design", desc: "Creating intuitive and beautiful interfaces." },
              { step: "03", title: "Development", desc: "Building robust and scalable code." },
              { step: "04", title: "Launch", desc: "Deploying and optimizing for success." }
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
