import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Zap, Cpu, Code2, Database, Layout, Mail, ShieldCheck, Globe, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

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
    title: "4Chad",
    category: "Solana Launchpad",
    image: "https://4chad.xyz/4chad.webp",
  },
  {
    title: "ChadBet",
    category: "Solana iGaming",
    image: "https://chadbet.xyz/icon-512.png",
  },
  {
    title: "SpinSaga",
    category: "Solana Gamified Utility",
    image: "https://spinsaga.fun/icon-512.png",
  },
  {
    title: "Jah Order",
    category: "Web Application",
    logoText: "JAH ORDER",
  },
  {
    title: "ProArt Chi",
    category: "Portfolio Website",
    logoText: "PROART CHI",
  },
  {
    title: "Royal Dice",
    category: "Gaming Website",
    logoText: "ROYAL DICE",
  }
];

export default function Home() {
  return (
    <div className="pt-20 bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-brand/10 border border-brand/20 px-4 py-1.5 rounded-full text-brand text-sm font-mono mb-8">
                <Github className="h-4 w-4" />
                <span>moskon1 on GitHub</span>
              </div>
              <h1 className="text-5xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-8">
                Engineering <span className="text-gradient">Full-Stack Systems</span>
              </h1>
              <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                High-performance decentralized systems, scalable backends, and AI integrations. 
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/moskon1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-brand text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-dark transition-all shadow-lg shadow-brand/25 group"
                >
                  View My GitHub
                  <Github className="ml-2 h-5 w-5" />
                </a>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center justify-center bg-white/5 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all border border-white/10"
                >
                  View Projects
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GitHub Showcase Section */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass p-8 lg:p-12 rounded-[2rem] border border-white/5 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-6">Open Source & Contributions</h2>
              <p className="text-slate-400 text-lg mb-8">
                My work is public. I believe in open-source development and building in public. Check out my repositories for full-stack applications, scalable backend architectures, and decentralized systems.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm font-mono text-slate-300">
                  100+ Contributions
                </div>
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm font-mono text-slate-300">
                  Solana Programs
                </div>
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm font-mono text-slate-300">
                  Rust & Anchor
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3">
              <a 
                href="https://github.com/moskon1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-brand/20 group-hover:border-brand transition-colors">
                  <img 
                    src="https://avatars.githubusercontent.com/u/104387877?v=4" 
                    alt="moskon1 GitHub" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                  <div className="absolute inset-0 bg-brand/10 group-hover:bg-transparent transition-colors" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 border-y border-white/5 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 font-mono text-sm uppercase tracking-widest mb-12">My Core Technology Stack</p>
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
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">What I <span className="text-brand">Build</span>.</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                I specialize in high-throughput systems and decentralized applications. I focus on performance, security, and scalability.
              </p>
              <ul className="space-y-4 mb-10">
                {['Full-Stack Web Applications', 'AI-Powered Backend Systems', 'Decentralized Systems (Rust/Solidity)', 'Cloud Infrastructure'].map((item) => (
                  <li key={item} className="flex items-center space-x-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/services" className="text-brand font-bold flex items-center hover:underline">
                View all services <ArrowRight className="ml-2 h-4 w-4" />
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
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">Featured <span className="text-brand">Work</span></h2>
              <p className="text-slate-400 max-w-xl">A selection of technical projects I've engineered across the stack.</p>
            </div>
            <Link to="/portfolio" className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl font-bold transition-all">
              View All Work
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolioPreview.map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] glass border border-white/5"
              >
                <div className="absolute inset-0 flex items-center justify-center p-16">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-24 h-24 object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                    />
                  ) : (
                    <span className="text-slate-200 text-xl md:text-2xl font-black tracking-wider text-center group-hover:scale-110 transition-transform duration-500">
                      {project.logoText || project.title}
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-8 flex flex-col justify-end">
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
          <h2 className="text-3xl lg:text-6xl font-bold text-white mb-8">Let's <span className="text-slate-900">Build</span> Something.</h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new projects or technical challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-slate-950 text-white px-10 py-4 rounded-xl font-bold text-xl hover:bg-slate-900 transition-all shadow-2xl"
            >
              Get In Touch
            </Link>
            <a
              href="mailto:catalin.taras@gmail.com"
              className="inline-flex items-center justify-center bg-white/10 text-white px-10 py-4 rounded-xl font-bold text-xl hover:bg-white/20 transition-all border border-white/20"
            >
              <Mail className="mr-2 h-5 w-5" />
              Email Me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
