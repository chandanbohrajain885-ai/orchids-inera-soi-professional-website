import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import CorePillars from '../components/CorePillars';
import ReviewsSection from '../components/ReviewsSection';
import ContactModal from '../components/ContactModal';
import {
  ArrowRight, Brain, Code2, Globe, BarChart3, Users, GraduationCap,
  CheckCircle2, Zap, Shield, TrendingUp, ChevronRight, Award,
  Building2, Cpu, Database, Layers, ImageIcon
} from 'lucide-react';

const services = [
  { icon: Brain, title: 'AI Development & Automation', desc: 'Intelligent AI systems, workflow automation, and AI-powered business solutions.', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/20' },
  { icon: Code2, title: 'Custom Software Development', desc: 'Enterprise SaaS platforms, scalable applications, and cloud-native systems.', color: 'from-purple-500/20 to-blue-500/20', border: 'border-purple-500/20' },
  { icon: Globe, title: 'Web Development', desc: 'Responsive enterprise web platforms, dashboards, and premium UI/UX systems.', color: 'from-cyan-500/20 to-teal-500/20', border: 'border-cyan-500/20' },
  { icon: BarChart3, title: 'Business Intelligence', desc: 'Analytics dashboards, KPI monitoring, and operational intelligence systems.', color: 'from-green-500/20 to-cyan-500/20', border: 'border-green-500/20' },
  { icon: Users, title: 'HR Technology', desc: 'Smart HR systems, recruitment automation, and employee analytics platforms.', color: 'from-orange-500/20 to-yellow-500/20', border: 'border-orange-500/20' },
  { icon: GraduationCap, title: 'Educational Technology', desc: 'Digital learning platforms, institutional management, and student systems.', color: 'from-pink-500/20 to-purple-500/20', border: 'border-pink-500/20' },
];

// Placeholder gradient tiles shown when no gallery photos are uploaded yet
// Plain gradient placeholders — no labels, just pure photo-like tiles
const PLACEHOLDER_COLORS = [
  'from-blue-700 to-cyan-600',
  'from-purple-700 to-blue-600',
  'from-cyan-700 to-teal-500',
  'from-green-700 to-cyan-600',
  'from-orange-600 to-yellow-500',
  'from-pink-700 to-purple-600',
  'from-indigo-700 to-blue-600',
  'from-red-700 to-orange-500',
  'from-teal-700 to-green-500',
  'from-blue-800 to-indigo-600',
];

function GalleryMarquee() {
  const { data, loadGallery } = useAdmin();
  useEffect(() => { loadGallery(); }, [loadGallery]);

  const photos = (data.galleryItems || []).filter(i => i.active !== false);

  const SPACERS = PLACEHOLDER_COLORS.map((color, i) => ({
    id: `sp${i}`, color, image: '', title: '', _spacer: true,
  }));

  let baseTiles;
  if (photos.length === 0) {
    baseTiles = SPACERS;
  } else if (photos.length < 6) {
    baseTiles = [];
    photos.forEach((p, i) => {
      baseTiles.push(p);
      baseTiles.push(SPACERS[i * 2 % SPACERS.length]);
      baseTiles.push(SPACERS[(i * 2 + 1) % SPACERS.length]);
    });
  } else {
    baseTiles = photos;
  }

  // Ensure strip always covers viewport width × 2 (for seamless loop)
  const minRepeat = Math.max(Math.ceil(16 / baseTiles.length) + 1, 3);
  // First half: the visible scrolling set; second half: seamless duplicate
  const halfTiles = Array.from({ length: minRepeat }, (_, r) =>
    baseTiles.map((t, i) => ({ ...t, _key: `a${r}-${i}` }))
  ).flat();
  const loopTiles = [
    ...halfTiles,
    ...halfTiles.map(t => ({ ...t, _key: `b${t._key}` })),
  ];

  // Tile width: 176px (w-44) on mobile, 240px on md+; gap: 16px
  // Use 176px as base for safe mobile calculation
  const tileW = 192; // 176 + 16 gap ≈ 192px per tile
  const halfDist = halfTiles.length * tileW;
  const speed = 45; // px/s — comfortable reading pace
  const durationSec = Math.round(halfDist / speed);

  return (
    <section className="py-16 border-y border-white/5 overflow-hidden bg-gradient-to-b from-deep-black to-navy-blue/8">
      <div className="text-center mb-10 px-4">
        <div className="inline-flex items-center gap-2 text-neon-cyan text-xs uppercase tracking-widest mb-3">
          <div className="w-8 h-px bg-neon-cyan" /> Our Gallery <div className="w-8 h-px bg-neon-cyan" />
        </div>
        <h2 className="font-sora text-3xl md:text-4xl font-bold text-white">
          Moments from <span className="blue-gradient">InEra</span>
        </h2>
        <p className="text-white/45 text-sm mt-3 max-w-lg mx-auto">
          A glimpse into our activities, events, team culture, and milestones.
        </p>
      </div>

      {/* Single continuous photo strip */}
      <div className="relative" style={{ touchAction: 'pan-y' }}>
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <div
            className="marquee-track flex"
            style={{
              '--marquee-duration': `${durationSec}s`,
              width: 'max-content',
            }}
          >
            {loopTiles.map((tile) => (
              <div
                key={tile._key}
                className="flex-shrink-0 w-40 h-32 sm:w-48 sm:h-40 md:w-60 md:h-48 mx-2 rounded-xl overflow-hidden border border-white/10 group relative shadow-lg"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                {tile.image ? (
                  <>
                    <img
                      src={tile.image}
                      alt={tile.title || ''}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      style={{ display: 'block', WebkitBackfaceVisibility: 'hidden' }}
                    />
                    {tile.title && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                        <span className="text-white text-[10px] font-semibold leading-snug line-clamp-2">{tile.title}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${tile.color} opacity-60`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-10 px-4">
        <Link to="/gallery" className="btn-secondary inline-flex items-center gap-2 text-sm">
          View Full Gallery <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { data } = useAdmin();
  const highlights = data.highlights.filter(h => h.active);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-black via-navy-blue/20 to-deep-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-neon-cyan/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-0 w-64 h-64 bg-navy-blue/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16 text-center">
          {/* InEra Logo — top of hero */}
          <div className="flex justify-center mb-6 animate-fade-in">
            <div className="w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-yellow-600/40 shadow-xl shadow-yellow-900/20 animate-float">
              <img src="/inera-logo.jpg" alt="InEra Software" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-electric-blue/20 animate-fade-in">
            <Zap size={14} className="text-neon-cyan" />
            <span className="text-white/80 text-xs font-medium uppercase tracking-widest">Intelligence at the Speed of Thought</span>
          </div>

          {/* Headline */}
          <h1 className="font-sora text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
            Building Intelligent
            <br />
            <span className="blue-gradient">Technology</span> for the Future
          </h1>

          {/* Sub */}
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            INERA Software Private Limited delivers intelligent software systems, automation solutions, enterprise technology services, and digital transformation platforms that help organizations grow faster and operate smarter.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/services" className="btn-primary inline-flex items-center gap-2 justify-center">
              Explore Services <ArrowRight size={16} />
            </Link>
            <Link to="/soi" className="btn-gold inline-flex items-center gap-2 justify-center">
              Join SOI <ChevronRight size={16} />
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="btn-secondary inline-flex items-center gap-2 justify-center"
            >
              Book Consultation
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {((data.stats || []).filter(s => s.active !== false)).map((s, i) => (
              <div key={i} className="glass rounded-xl py-4 px-3 text-center card-hover">
                <div className="font-sora font-bold text-2xl text-gradient">{s.value}</div>
                <div className="text-white/50 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-0.5 h-6 bg-gradient-to-b from-white/30 to-transparent rounded-full" />
        </div>
      </section>

      {/* PHOTO MARQUEE STRIP */}
      <GalleryMarquee />

      {/* SOI BANNER */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-navy-blue/30 via-deep-black to-navy-blue/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="glass-dark rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-yellow-600/30 shadow-xl shadow-yellow-900/20 animate-float">
                <img src="/soi-logo.jpg" alt="SOI Logo" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="text-yellow-400/80 text-xs uppercase tracking-widest mb-2">School of Internships</div>
              <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-3">SOI — Learn. Build. Deploy.</h2>
              <p className="text-white/60 text-sm max-w-xl">SOI is the execution-focused internship ecosystem by INERA Software. Bridge the gap between theory and real industry experience through AI-first environments.</p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link to="/soi" className="btn-gold inline-flex items-center gap-2 justify-center whitespace-nowrap">
                Register as Student <ArrowRight size={16} />
              </Link>
              <Link to="/soi" className="inline-flex items-center gap-2 justify-center whitespace-nowrap px-6 py-3 rounded-xl border-2 border-yellow-500/70 text-yellow-300 font-sora font-semibold text-sm hover:bg-yellow-600/15 hover:border-yellow-400 transition-all duration-300">
                Register Your College <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      {highlights.length > 0 && (
        <section className="section-padding max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-neon-cyan text-xs uppercase tracking-widest mb-3">
              <div className="w-8 h-px bg-neon-cyan" /> Latest Updates <div className="w-8 h-px bg-neon-cyan" />
            </div>
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-white">Latest Highlights at InEra</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {highlights.map((h, i) => (
              <div key={h.id || i} className="glass rounded-2xl p-6 border border-white/5 card-hover group">
                <div className={`inline-flex text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
                  h.tag === 'Achievement' ? 'bg-green-500/20 text-green-400' :
                  h.tag === 'News' ? 'bg-blue-500/20 text-blue-400' :
                  h.tag === 'Milestone' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>{h.tag}</div>
                <h3 className="font-sora font-semibold text-white mb-2 group-hover:text-neon-cyan transition-colors">{h.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CORE PILLARS */}
      <div className="bg-gradient-to-b from-navy-blue/8 to-deep-black border-y border-white/5">
        <CorePillars />
      </div>

      {/* WHY INERA */}
      <section className="section-padding bg-gradient-to-b from-deep-black to-navy-blue/10 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-neon-cyan text-xs uppercase tracking-widest mb-4">
                <div className="w-8 h-px bg-neon-cyan" /> Why INERA
              </div>
              <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-6">
                Technology-First.<br /><span className="blue-gradient">Execution-Driven.</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                INERA Software combines cutting-edge technology with strategic execution to deliver solutions that drive real business outcomes. We build systems that scale, automate, and transform.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Brain, label: 'AI-First Approach' },
                  { icon: Shield, label: 'Enterprise Security' },
                  { icon: TrendingUp, label: 'Scalable Systems' },
                  { icon: Zap, label: 'Fast Execution' },
                  { icon: Layers, label: 'Full-Stack Expertise' },
                  { icon: Award, label: 'Quality Assured' },
                ].map(({ icon: Icon, label }, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-electric-blue/15 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-electric-blue" />
                    </div>
                    <span className="text-white/70 text-sm">{label}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="mt-8 btn-primary inline-flex items-center gap-2">
                About INERA <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Cpu, title: 'AI Systems', desc: 'Advanced AI and ML implementations for business automation', color: 'blue' },
                { icon: Code2, title: 'Custom Software', desc: 'Tailored enterprise software built for your specific needs', color: 'cyan' },
                { icon: Database, title: 'Data Systems', desc: 'Scalable database architectures and analytics platforms', color: 'purple' },
                { icon: Building2, title: 'Enterprise Grade', desc: 'Production-ready systems built for scale and reliability', color: 'green' },
              ].map(({ icon: Icon, title, desc, color }, i) => (
                <div key={i} className={`glass rounded-2xl p-5 border border-${color}-500/15 card-hover`}>
                  <Icon size={24} className={`text-${color}-400 mb-3`} />
                  <h4 className="font-sora font-semibold text-white text-sm mb-1">{title}</h4>
                  <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <ReviewsSection />

      {/* CTA SECTION */}
      <section className="section-padding max-w-7xl mx-auto text-center">
        <div className="glass-dark rounded-3xl p-12 border border-electric-blue/20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-electric-blue/10 blur-3xl rounded-full" />
          <div className="relative z-10">
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Something <span className="blue-gradient">Intelligent?</span>
            </h2>
            <p className="text-white/60 text-sm max-w-lg mx-auto mb-8">
              Connect with INERA Software to explore intelligent technology solutions that transform how your organization operates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary inline-flex items-center gap-2 justify-center"
              >
                Book Free Consultation <ArrowRight size={16} />
              </button>
              <Link to="/services" className="btn-secondary inline-flex items-center gap-2 justify-center">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} mode="consultation" />
    </div>
  );
}
