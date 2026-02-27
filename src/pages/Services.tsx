import { motion } from 'motion/react';
import { Globe, Database, Settings, CheckCircle2, ShieldCheck } from 'lucide-react';

const services = [
  {
    icon: <ShieldCheck className="h-12 w-12 text-brand" />,
    title: "Smart Contract Engineering",
    description: "I engineer secure decentralized applications and smart contracts using high-performance architectures like Rust and Solidity.",
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
