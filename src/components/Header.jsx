import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ContactModal from './ContactModal';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'SOI', path: '/soi' },
  { label: 'Careers', path: '/careers' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-deep-black/90 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-lg overflow-hidden ring-1 ring-yellow-600/30 group-hover:ring-yellow-500/60 transition-all duration-300">
              <img src="/inera-logo.jpg" alt="InEra Logo" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-white font-sora leading-tight group-hover:text-yellow-400 transition-colors">InEra</div>
              <div className="text-[9px] text-white/50 uppercase tracking-widest leading-tight">Software Pvt. Ltd.</div>
            </div>
          </Link>

          {/* Center Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                  location.pathname === link.path
                    ? 'text-neon-cyan'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-neon-cyan rounded-full transition-all duration-300 ${
                  location.pathname === link.path ? 'w-4/5' : 'w-0 group-hover:w-4/5'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Right Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => { setModalOpen(true); setMenuOpen(false); }}
              className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-electric-blue hover:bg-blue-500 text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
            >
              Book Consultation
            </button>
            <Link
              to="/soi"
              className="text-sm font-semibold px-5 py-2.5 rounded-lg border border-yellow-600/60 text-yellow-400 hover:bg-yellow-600/10 transition-all duration-300 hover:border-yellow-500"
            >
              Join SOI
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-deep-black/95 backdrop-blur-xl border-t border-white/5 px-4 py-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'bg-electric-blue/20 text-neon-cyan'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-3 pt-3 border-t border-white/10">
              <button
                onClick={() => { setModalOpen(true); setMenuOpen(false); }}
                className="flex-1 text-center text-sm font-semibold px-4 py-2.5 rounded-lg bg-electric-blue text-white"
              >
                Book Consultation
              </button>
              <Link to="/soi" className="flex-1 text-center text-sm font-semibold px-4 py-2.5 rounded-lg border border-yellow-600/60 text-yellow-400">
                Join SOI
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} mode="consultation" />
    </>
  );
}
