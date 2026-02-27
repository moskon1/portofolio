import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-brand" />
              <span className="text-2xl font-bold text-white tracking-tight font-mono">moskon1<span className="text-brand">.</span></span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand",
                  location.pathname === link.href ? "text-brand" : "text-slate-400"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-brand text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-brand transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/5 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === link.href ? "text-brand bg-brand/10" : "text-slate-400 hover:text-brand hover:bg-white/5"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-brand text-white px-3 py-3 rounded-md text-base font-semibold mt-4"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
