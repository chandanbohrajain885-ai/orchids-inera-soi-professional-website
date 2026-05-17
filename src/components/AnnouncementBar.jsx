import { useAdmin } from '../context/AdminContext';
import { Megaphone } from 'lucide-react';

export default function AnnouncementBar() {
  const { data } = useAdmin();
  const active = data.announcements.filter(a => a.active);
  if (!active.length) return null;

  const items = [...active, ...active];

  return (
    <div className="bg-gradient-to-r from-navy-blue via-electric-blue to-navy-blue py-2 overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 flex items-center gap-2 px-4 bg-electric-blue py-1 z-10">
          <Megaphone size={14} className="text-white" />
          <span className="text-white text-xs font-semibold uppercase tracking-wider whitespace-nowrap">Live</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="marquee-inner flex gap-16 whitespace-nowrap">
            {items.map((ann, i) => (
              <span key={i} className="text-white/90 text-xs font-medium inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan inline-block" />
                {ann.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
