import { Linkedin, Mail } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

// Color scheme map — keeps card styles consistent per colorScheme string
const COLOR_SCHEMES = {
  blue:   { gradient: 'from-blue-600/20 via-cyan-600/10 to-transparent',    border: 'border-blue-500/30',   glow: 'hover:shadow-blue-500/20',   badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',     ring: 'ring-blue-500/40' },
  purple: { gradient: 'from-purple-600/20 via-blue-600/10 to-transparent',  border: 'border-purple-500/30', glow: 'hover:shadow-purple-500/20', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30', ring: 'ring-purple-500/40' },
  pink:   { gradient: 'from-pink-600/20 via-purple-600/10 to-transparent',  border: 'border-pink-500/30',   glow: 'hover:shadow-pink-500/20',   badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30',       ring: 'ring-pink-500/40' },
  yellow: { gradient: 'from-yellow-600/15 via-orange-600/8 to-transparent', border: 'border-yellow-600/30', glow: 'hover:shadow-yellow-500/20', badge: 'bg-yellow-600/20 text-yellow-300 border-yellow-600/30', ring: 'ring-yellow-500/40' },
  cyan:   { gradient: 'from-cyan-600/20 via-blue-600/10 to-transparent',    border: 'border-cyan-500/30',   glow: 'hover:shadow-cyan-500/20',   badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',       ring: 'ring-cyan-500/40' },
  green:  { gradient: 'from-green-600/20 via-teal-600/10 to-transparent',   border: 'border-green-500/30',  glow: 'hover:shadow-green-500/20',  badge: 'bg-green-500/20 text-green-300 border-green-500/30',    ring: 'ring-green-500/40' },
  orange: { gradient: 'from-orange-600/20 via-red-600/10 to-transparent',   border: 'border-orange-500/30', glow: 'hover:shadow-orange-500/20', badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30', ring: 'ring-orange-500/40' },
  red:    { gradient: 'from-red-600/20 via-pink-600/10 to-transparent',     border: 'border-red-500/30',    glow: 'hover:shadow-red-500/20',    badge: 'bg-red-500/20 text-red-300 border-red-500/30',          ring: 'ring-red-500/40' },
};
const DEFAULT_SCHEME = COLOR_SCHEMES.blue;

export default function CorePillars() {
  const { data } = useAdmin();
  const pillars = data.pillars || [];

  if (pillars.length === 0) return null;

  return (
    <section className="section-padding max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 text-neon-cyan text-xs uppercase tracking-widest mb-3">
          <div className="w-8 h-px bg-neon-cyan" /> Leadership <div className="w-8 h-px bg-neon-cyan" />
        </div>
        <h2 className="font-sora text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          The Core Pillars<br /><span className="blue-gradient">Behind InEra</span>
        </h2>
        <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Meet the visionaries and leaders driving innovation, execution, and the future of intelligent technology at INERA SOFTWARE PRIVATE LIMITED.
        </p>
      </div>

      {/* Cards Grid */}
      <div className={`grid gap-6 ${pillars.length <= 2 ? 'sm:grid-cols-2 max-w-2xl mx-auto' : pillars.length === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-4'}`}>
        {pillars.map((person, i) => {
          const scheme = COLOR_SCHEMES[person.colorScheme] || DEFAULT_SCHEME;
          return (
            <div
              key={person.id}
              className={`
                relative group glass rounded-3xl p-6 border ${scheme.border}
                bg-gradient-to-b ${scheme.gradient}
                transition-all duration-500 hover:-translate-y-3
                hover:shadow-2xl ${scheme.glow}
                overflow-hidden flex flex-col
                animate-fade-in-up
              `}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Glow orb on hover */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-white/3 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Profile Image */}
              <div className="relative flex justify-center mb-5">
                <div className={`
                  w-28 h-28 rounded-full overflow-hidden
                  ring-2 ${scheme.ring} ring-offset-2 ring-offset-transparent
                  shadow-xl group-hover:scale-105 transition-transform duration-500
                  ${person.whiteBg ? 'bg-white' : ''}
                `}>
                  {person.image ? (
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/10 text-white/60 font-sora font-bold text-2xl">
                      {person.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                {/* Online dot */}
                <span className="absolute bottom-0 right-[calc(50%-56px+4px)] w-4 h-4 bg-green-400 rounded-full border-2 border-deep-black shadow-lg shadow-green-400/50" />
              </div>

              {/* Name & Designation */}
              <div className="text-center mb-4">
                <h3 className="font-sora font-bold text-white text-base leading-tight mb-2">{person.name}</h3>
                <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${scheme.badge}`}>
                  {person.designation}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px w-12 mx-auto mb-4 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-all duration-500" />

              {/* Quote */}
              {person.quote && (
                <blockquote className="text-white/55 text-xs leading-relaxed text-center italic group-hover:text-white/75 transition-colors duration-300 flex-1">
                  "{person.quote}"
                </blockquote>
              )}

              {/* Action buttons */}
              {(person.linkedin || person.contactEmail) && (
                <div className="mt-5 flex gap-2 justify-center flex-wrap">
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-white/10 text-white/40 hover:text-blue-400 hover:border-blue-400/40 transition-all duration-300 text-xs font-medium hover:scale-105"
                    >
                      <Linkedin size={12} /> LinkedIn
                    </a>
                  )}
                  {person.contactEmail && (
                    <a
                      href={`mailto:${person.contactEmail}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-white/10 text-white/40 hover:text-neon-cyan hover:border-neon-cyan/40 transition-all duration-300 text-xs font-medium hover:scale-105"
                      title={person.contactEmail}
                    >
                      <Mail size={12} /> Contact
                    </a>
                  )}
                </div>
              )}

              {/* Bottom glow line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/30 transition-all duration-500" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
