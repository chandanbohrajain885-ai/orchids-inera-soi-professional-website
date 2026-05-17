import { useState } from 'react';
import { X, ZoomIn, ImageIcon } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

// Fallback placeholders shown only when no images have been uploaded yet
const placeholderItems = [
  { id: 'p1', title: 'Innovation Workshop', category: 'Workshops', color: 'from-blue-600 to-cyan-600' },
  { id: 'p2', title: 'Team Building', category: 'Team Collaborations', color: 'from-purple-600 to-blue-600' },
  { id: 'p3', title: 'Technology Summit', category: 'Technology Events', color: 'from-cyan-600 to-teal-600' },
  { id: 'p4', title: 'Office Environment', category: 'Office Environment', color: 'from-green-600 to-cyan-600' },
  { id: 'p5', title: 'AI Workshop', category: 'Workshops', color: 'from-orange-600 to-red-600' },
  { id: 'p6', title: 'Company Outing', category: 'Company Activities', color: 'from-pink-600 to-purple-600' },
];

export default function GalleryPage() {
  const { data } = useAdmin();
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const categories = ['All', ...(data.galleryCategories || [])];
  const galleryItems = (data.galleryItems || []).filter(i => i.active !== false);
  const usingPlaceholders = galleryItems.length === 0;
  const items = usingPlaceholders ? placeholderItems : galleryItems;

  const filtered = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="pt-20 overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 px-4 md:px-8 grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-blue/10 to-deep-black" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-electric-blue/20">
            <ImageIcon size={14} className="text-neon-cyan" />
            <span className="text-neon-cyan text-xs font-medium uppercase tracking-widest">Visual Stories</span>
          </div>
          <h1 className="font-sora text-4xl md:text-6xl font-bold text-white mb-6">Gallery</h1>
          <p className="text-white/60 text-lg">A visual journey through INERA Software's activities, events, and team culture.</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 md:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-electric-blue text-white shadow-lg shadow-blue-500/30'
                    : 'glass border border-white/10 text-white/60 hover:text-white hover:border-electric-blue/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className="break-inside-avoid group cursor-pointer rounded-2xl overflow-hidden border border-white/8 card-hover relative"
              onClick={() => setLightbox(item)}
              style={{ minHeight: i % 3 === 0 ? '200px' : i % 3 === 1 ? '160px' : '240px' }}
            >
              {item.image ? (
                <div className="relative" style={{ minHeight: 'inherit' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    style={{ minHeight: 'inherit', display: 'block' }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn size={18} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-white text-xs font-semibold">{item.title}</div>
                    <div className="text-white/60 text-[10px]">{item.category}</div>
                  </div>
                </div>
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${item.color || 'from-blue-600 to-cyan-600'} flex items-center justify-center relative`}
                  style={{ minHeight: 'inherit' }}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <ImageIcon size={32} className="text-white/30 mb-2" />
                    <span className="text-white/60 text-xs text-center">{item.title}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn size={18} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-white text-xs font-semibold">{item.title}</div>
                    <div className="text-white/60 text-[10px]">{item.category}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <ImageIcon size={48} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/50">No images in this category yet.</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            <X size={20} />
          </button>
          <div
            className="max-w-2xl w-full rounded-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {lightbox.image ? (
              <img src={lightbox.image} alt={lightbox.title} className="w-full max-h-[70vh] object-contain bg-black" />
            ) : (
              <div className={`w-full h-80 bg-gradient-to-br ${lightbox.color || 'from-blue-600 to-cyan-600'} flex items-center justify-center`}>
                <div className="text-center">
                  <ImageIcon size={48} className="text-white/30 mx-auto mb-3" />
                  <div className="text-white/60 text-sm">{lightbox.title}</div>
                </div>
              </div>
            )}
            <div className="bg-deep-black p-5">
              <h3 className="font-sora font-semibold text-white text-lg">{lightbox.title}</h3>
              <p className="text-white/50 text-sm mt-1">{lightbox.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
