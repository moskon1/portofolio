import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '40700000000';
const whatsappLabel = import.meta.env.VITE_WHATSAPP_NUMBER ? `+${whatsappNumber}` : '+40 700 000 000';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="NodeStack" className="h-10 w-10 object-contain" />
              <span className="text-2xl font-bold text-white tracking-tight">Node<span className="text-brand">Stack</span></span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              A digital engineering agency building high-performance products, scalable backends, and Web3 systems.
            </p>
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
                <MessageCircle className="h-5 w-5 text-brand shrink-0" />
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">
                  {whatsappLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs">
            © {new Date().getFullYear()} NodeStack. All rights reserved.
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
