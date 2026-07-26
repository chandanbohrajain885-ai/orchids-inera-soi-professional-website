import { useAdmin } from '../context/AdminContext';
import { Newspaper } from 'lucide-react';

// Fixed to the bottom of the viewport (not the page) — stays visible on screen
// while the rest of the site scrolls underneath it. Only renders when there's
// at least one active news item in the admin panel.
export default function NewsTicker() {
  const { data } = useAdmin();
  const active = (data.newsTicker || []).filter(n => n.active && n.text?.trim());
  if (!active.length) return null;

  const items = [...active, ...active]; // duplicated for a seamless scroll loop

  return (
    <>
      {/* Spacer so the fixed bar never covers footer content */}
      <div className="h-9" aria-hidden="true" />
      <div className="fixed bottom-0 left-0 right-0 z-40 h-9 bg-gradient-to-r from-navy-blue via-deep-black to-navy-blue border-t border-yellow-600/20 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
        <div className="flex items-center h-full">
          <div className="flex-shrink-0 flex items-center gap-1.5 px-3 h-full bg-yellow-600 z-10">
            <Newspaper size={12} className="text-black" />
            <span className="text-black text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">News</span>
          </div>
          <div className="overflow-hidden flex-1 h-full flex items-center">
            <div className="marquee-inner flex gap-16 whitespace-nowrap">
              {items.map((n, i) => (
                <span key={i} className="text-white/90 text-xs font-medium inline-flex items-center gap-2 px-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block flex-shrink-0" />
                  {n.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
