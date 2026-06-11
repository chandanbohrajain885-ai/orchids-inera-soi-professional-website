import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { Target, Eye, Lightbulb, Award, Zap, Shield, TrendingUp, Users2, ArrowRight } from 'lucide-react';

const values = [
  { icon: Lightbulb, label: 'Innovation', desc: 'Constantly pushing the boundaries of what technology can achieve.' },
  { icon: Zap, label: 'Intelligence', desc: 'AI-first thinking embedded in every solution we build.' },
  { icon: Shield, label: 'Integrity', desc: 'Transparent, honest, and committed to excellence in every engagement.' },
  { icon: TrendingUp, label: 'Scalability', desc: 'Building systems that grow with your ambitions.' },
  { icon: Award, label: 'Execution Excellence', desc: 'Delivering results that exceed expectations, every time.' },
  { icon: Users2, label: 'Technology Leadership', desc: 'Staying ahead of industry trends to lead digital transformation.' },
];

export default function AboutPage() {
  const { data } = useAdmin();
  const au = data.aboutUs || {};

  return (
    <div className="pt-20 overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 px-4 md:px-8 grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-blue/10 to-deep-black" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-electric-blue/8 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-electric-blue/20">
            <span className="text-neon-cyan text-xs font-medium uppercase tracking-widest">{au.tagline || 'Our Story'}</span>
          </div>
          <h1 className="font-sora text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            {au.headline || 'Who We Are'}
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            {au.aboutText || 'A modern technology company building intelligent software systems for a future-ready world.'}
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-neon-cyan text-xs uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-neon-cyan" /> About INERA
            </div>
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-6">
              {au.headline || 'Intelligence at the<br /><span className="blue-gradient">Speed of Thought</span>'}
            </h2>
            <div className="space-y-4 text-white/60 text-sm leading-relaxed">
              <p>{au.aboutText || 'INERA Software Private Limited is a modern technology company focused on building intelligent software systems, enterprise applications, automation platforms, and digital transformation solutions.'}</p>
              <p>{au.aboutText2 || 'The company specializes in scalable technology ecosystems that help organizations improve efficiency, streamline operations, and embrace intelligent digital innovation.'}</p>
              <p>{au.aboutText3 || 'INERA combines technology, strategy, and execution to create future-ready digital systems for businesses and institutions across India and beyond.'}</p>
            </div>
            <Link to="/contact" className="mt-8 btn-primary inline-flex items-center gap-2">
              Work With Us <ArrowRight size={16} />
            </Link>
          </div>
          <div className="space-y-4">
            <div className="glass-dark rounded-2xl p-6 border border-electric-blue/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-electric-blue/20 flex items-center justify-center">
                  <Target size={18} className="text-electric-blue" />
                </div>
                <h3 className="font-sora font-semibold text-white">Our Mission</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed italic">{au.mission || '"To empower businesses through intelligent technology, scalable software systems, and innovative digital solutions."'}</p>
            </div>
            <div className="glass-dark rounded-2xl p-6 border border-neon-cyan/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-neon-cyan/20 flex items-center justify-center">
                  <Eye size={18} className="text-neon-cyan" />
                </div>
                <h3 className="font-sora font-semibold text-white">Our Vision</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed italic">{au.vision || '"To become a globally recognized technology company driving the future of intelligent digital transformation."'}</p>
            </div>
            <div className="glass-dark rounded-2xl p-6 border border-yellow-600/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-600/20 flex items-center justify-center">
                  <img src="/inera-logo.jpg" alt="InEra" className="w-7 h-7 object-cover rounded" />
                </div>
                <h3 className="font-sora font-semibold text-white">INERA Software Pvt. Ltd.</h3>
              </div>
              <div className="flex gap-4 text-xs text-white/50">
                <span>📍 {au.location || 'Belagavi, Karnataka'}</span>
                <span>🏢 Offices: {au.offices || 'Bangalore, Pune, Belagavi'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-gradient-to-b from-navy-blue/10 to-deep-black border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-neon-cyan text-xs uppercase tracking-widest mb-3">
              <div className="w-8 h-px bg-neon-cyan" /> What We Stand For <div className="w-8 h-px bg-neon-cyan" />
            </div>
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-white">Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(({ icon: Icon, label, desc }, i) => (
              <div key={i} className="glass rounded-2xl p-6 border border-white/5 card-hover group text-center">
                <div className="w-14 h-14 rounded-2xl bg-electric-blue/15 flex items-center justify-center mx-auto mb-4 group-hover:bg-electric-blue/25 transition-colors group-hover:scale-110 duration-300">
                  <Icon size={24} className="text-electric-blue" />
                </div>
                <h3 className="font-sora font-semibold text-white text-lg mb-2">{label}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="glass-dark rounded-3xl p-8 md:p-12 border border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full glass border border-yellow-600/30 flex items-center justify-center mx-auto mb-6 overflow-hidden">
              <img src="/inera-logo.jpg" alt="Founder" className="w-full h-full object-cover" />
            </div>
            <div className="inline-flex items-center gap-2 text-yellow-400/80 text-xs uppercase tracking-widest mb-4">
              <div className="w-6 h-px bg-yellow-600" /> Founder Message <div className="w-6 h-px bg-yellow-600" />
            </div>
            <blockquote className="font-sora text-xl md:text-2xl text-white/90 font-medium italic leading-relaxed mb-6">
              &ldquo;{(au.founderMessage || 'We built INERA Software with one conviction — technology should not just support business, it should intelligently drive it. Our mission is to build systems that think, adapt, and execute at the speed of modern business.')}&rdquo;
            </blockquote>
            <div className="text-white/50 text-sm">
              <div className="font-semibold text-white">{au.founderName || 'Founder & CEO'}</div>
              <div className="text-xs text-white/40 mt-1">{au.founderTitle || 'INERA SOFTWARE PRIVATE LIMITED'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="section-padding bg-gradient-to-b from-deep-black to-navy-blue/10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4">Technology-First Culture</h2>
            <p className="text-white/50 text-sm max-w-xl mx-auto">
              At INERA, innovation is not a department — it's a mindset embedded in everything we do.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { emoji: '🧠', title: 'Innovation Culture', desc: 'Every team member is encouraged to explore, experiment, and innovate.' },
              { emoji: '🚀', title: 'Technology-First', desc: 'AI and automation are built into the core of our development process.' },
              { emoji: '🤝', title: 'Collaborative', desc: 'Cross-functional teams working together toward shared goals.' },
              { emoji: '🌍', title: 'Global Mindset', desc: 'Building solutions with global scalability and standards in mind.' },
            ].map((item, i) => (
              <div key={i} className="glass rounded-2xl p-6 border border-white/5 card-hover text-center">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-sora font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}