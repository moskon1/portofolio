import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: "4Chad",
    category: "Solana Launchpad & Trading",
    image: "https://4chad.xyz/4chad.webp",
    description: "A decentralized launchpad and trading platform for trending SOL tokens. Discover, buy, and trade with sub-second finality using Jupiter's liquidity aggregation.",
    tech: ["Next.js", "Rust", "Anchor", "Supabase", "Jupiter SDK"],
    outcome: "Successfully launched 100+ tokens with a seamless trading experience and high community engagement.",
    link: "https://4chad.xyz"
  },
  {
    title: "ChadBet",
    category: "Solana iGaming",
    image: "https://chadbet.xyz/icon-512.png",
    description: "A high-performance decentralized betting platform on Solana. Provably fair gaming with instant payouts and zero-latency interactions powered by custom RPCs.",
    tech: ["Rust", "Anchor", "WebSockets", "React", "Solana Web3.js"],
    outcome: "Processed over 1M SOL in volume with sub-second transaction finality and 99.9% uptime.",
    link: "https://chadbet.xyz/"
  },
  {
    title: "SpinSaga",
    category: "Solana Gamified Utility",
    image: "https://spinsaga.fun/icon-512.png",
    description: "An immersive gamified experience on Solana that provides utility to NFT collections through on-chain RNG and rewards.",
    tech: ["Rust", "Anchor", "Unity WebGL", "React"],
    outcome: "Successfully integrated with 50+ top-tier Solana NFT collections, driving significant user retention.",
    link: "https://spinsaga.fun"
  },
  {
    title: "Jah Order Sound System",
    category: "Web Application",
    logoText: "JAH ORDER",
    description: "A production web app focused on a clean ordering flow and straightforward user experience.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    outcome: "Delivered a fast and reliable experience optimized for everyday usage.",
    link: "https://jah-order.vercel.app/"
  },
  {
    title: "ProArt Studio",
    category: "Portfolio Website",
    logoText: "PROART STUDIO",
    description: "A modern presentation website designed to highlight services and projects with a polished look.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    outcome: "Shipped a responsive and performant website with clear content hierarchy.",
    link: "https://proart-chi.vercel.app/"
  },
  {
    title: "Royal Dice",
    category: "Gaming Website",
    logoText: "ROYAL DICE",
    description: "An interactive website with a game-oriented visual style and conversion-focused layout.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    outcome: "Launched a stable and engaging web presence with smooth navigation.",
    link: "https://royal-dice.vercel.app/"
  }
];

export default function Portfolio() {
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
            Case <span className="text-gradient">Studies</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 max-w-3xl"
          >
            A selection of technical projects where I've engineered high-performance solutions and scalable architectures.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-3xl overflow-hidden hover:border-brand/50 transition-all group"
              >
                <div className="aspect-video overflow-hidden relative bg-slate-900/50 flex items-center justify-center p-12">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-20 h-20 object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-slate-200 text-xl md:text-2xl font-black tracking-wider group-hover:scale-110 transition-transform duration-500">
                      {project.logoText || project.title}
                    </span>
                  )}
                  <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-brand uppercase tracking-wider border border-white/10">
                    {project.category}
                  </div>
                </div>
                <div className="p-8 lg:p-10">
                  <h2 className="text-2xl font-bold text-white mb-4">{project.title}</h2>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-8">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span key={i} className="bg-white/5 text-slate-300 px-3 py-1 rounded-md text-xs font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-brand/10 p-6 rounded-2xl border border-brand/20 mb-8">
                    <h3 className="text-xs font-bold text-brand uppercase tracking-widest mb-2">Impact</h3>
                    <p className="text-slate-300 text-sm italic">
                      {project.outcome}
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
                      <span>Live Demo</span>
                    </a>
                    <button className="flex items-center space-x-2 text-slate-500 font-bold hover:text-slate-300 transition-colors">
                      <Github className="h-5 w-5" />
                      <span>Case Study</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
