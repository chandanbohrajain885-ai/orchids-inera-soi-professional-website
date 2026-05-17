import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { Linkedin, Instagram, Youtube, Twitter, Facebook, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { data } = useAdmin();
  const { socialLinks, contact } = data;

  return (
    <footer className="bg-deep-black border-t border-white/5 pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden ring-1 ring-yellow-600/30">
                <img src="/inera-logo.jpg" alt="InEra" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-sm font-bold text-white font-sora">InEra</div>
                <div className="text-[9px] text-white/40 uppercase tracking-widest">Software Pvt. Ltd.</div>
              </div>
            </div>
            <p className="text-white/50 text-xs leading-relaxed mb-4 italic">"Intelligence at the Speed of Thought"</p>
            <div className="flex gap-2">
              {[
                { icon: Linkedin, href: socialLinks.linkedin, color: 'hover:text-blue-400' },
                { icon: Instagram, href: socialLinks.instagram, color: 'hover:text-pink-400' },
                { icon: Youtube, href: socialLinks.youtube, color: 'hover:text-red-400' },
                { icon: Twitter, href: socialLinks.twitter, color: 'hover:text-sky-400' },
                { icon: Facebook, href: socialLinks.facebook, color: 'hover:text-blue-500' },
              ].map(({ icon: Icon, href, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 glass rounded-lg flex items-center justify-center text-white/40 ${color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-sora">Company</h4>
            <ul className="space-y-2">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Services', path: '/services' },
                { label: 'SOI', path: '/soi' },
                { label: 'Careers', path: '/careers' },
                { label: 'Contact', path: '/contact' },
              ].map(item => (
                <li key={item.path}>
                  <Link to={item.path} className="text-white/50 hover:text-neon-cyan text-xs transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-sora">Services</h4>
            <ul className="space-y-2">
              {['AI Development', 'Software Development', 'Web Development', 'HR Technology', 'Business Intelligence', 'EdTech Systems'].map(s => (
                <li key={s}>
                  <Link to="/services" className="text-white/50 hover:text-neon-cyan text-xs transition-colors duration-200">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-sora">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: 'Gallery', path: '/gallery' },
                { label: 'Company Updates', path: '/' },
                { label: 'Admin Panel', path: '/admin' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.path} className="text-white/50 hover:text-neon-cyan text-xs transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-sora">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${contact.email}`} className="flex items-start gap-2 text-white/50 hover:text-neon-cyan text-xs transition-colors group">
                  <Mail size={12} className="mt-0.5 flex-shrink-0 group-hover:text-neon-cyan" />
                  <span className="break-all">{contact.email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-white/50 hover:text-neon-cyan text-xs transition-colors group">
                  <Phone size={12} className="flex-shrink-0 group-hover:text-neon-cyan" />
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/50 text-xs">
                <MapPin size={12} className="mt-0.5 flex-shrink-0" />
                <span>{contact.headquarters}</span>
              </li>
              <li>
                <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-green-400 text-xs transition-colors group">
                  <MessageCircle size={12} className="flex-shrink-0 group-hover:text-green-400" />
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © 2026 INERA SOFTWARE PRIVATE LIMITED. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/20 text-xs">CIN: U72200KA2024PTC000000</span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-white/20 text-xs">Made in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
