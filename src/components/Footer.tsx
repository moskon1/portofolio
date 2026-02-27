import { Link } from 'react-router-dom';
import { Code2, Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-brand" />
              <span className="text-2xl font-bold text-white tracking-tight">moskon1</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Engineering high-performance decentralized systems, scalable backends, and AI integrations.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/moskon1" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors"><Github className="h-5 w-5" /></a>
              <a href="#" className="hover:text-brand transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-brand transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/services" className="hover:text-brand transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-brand transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-brand transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/services" className="hover:text-brand transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="hover:text-brand transition-colors">Mobile Apps</Link></li>
              <li><Link to="/services" className="hover:text-brand transition-colors">UI/UX Design</Link></li>
              <li><Link to="/services" className="hover:text-brand transition-colors">Maintenance</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-brand shrink-0" />
                <span>hello@moskon1.dev</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs">
            © {new Date().getFullYear()} moskon1. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
