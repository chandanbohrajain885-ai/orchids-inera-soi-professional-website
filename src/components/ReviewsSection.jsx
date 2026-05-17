import { Star } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: Math.min(count, 5) }).map((_, i) => (
        <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }) {
  const isStudent = review.type === 'student';
  return (
    <div
      className="glass rounded-2xl p-6 border border-white/8 card-hover group flex flex-col gap-4 relative overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
          isStudent
            ? 'bg-yellow-600/20 text-yellow-300 border border-yellow-600/30'
            : 'bg-electric-blue/20 text-blue-300 border border-blue-500/30'
        }`}>
          {isStudent ? '🎓 SOI Student' : '🏢 Enterprise Client'}
        </span>
        <StarRating count={review.rating} />
      </div>

      <p className="text-white/65 text-sm leading-relaxed flex-1 italic group-hover:text-white/80 transition-colors duration-300">
        "{review.text}"
      </p>

      <div className="flex items-center gap-3 pt-3 border-t border-white/5">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center flex-shrink-0 font-sora font-bold text-white text-sm shadow-lg`}>
          {review.avatar || review.name?.slice(0, 2).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="font-sora font-semibold text-white text-sm truncate">{review.name}</div>
          <div className="text-white/40 text-xs truncate">{review.role}</div>
          {(review.location || review.college) && (
            <div className="text-white/30 text-[10px] truncate mt-0.5">
              📍 {review.location || review.college}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const { data } = useAdmin();

  const clientReviews = (data.clientReviews || []).filter(r => r.active !== false);
  const studentReviews = (data.studentReviews || []).filter(r => r.active !== false);

  if (clientReviews.length === 0 && studentReviews.length === 0) return null;

  return (
    <section className="section-padding bg-gradient-to-b from-navy-blue/8 to-deep-black border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-neon-cyan text-xs uppercase tracking-widest mb-3">
            <div className="w-8 h-px bg-neon-cyan" /> Reviews &amp; Feedback <div className="w-8 h-px bg-neon-cyan" />
          </div>
          <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Clients &amp;<br /><span className="blue-gradient">Loved by Students</span>
          </h2>
          <p className="text-white/50 text-sm max-w-xl mx-auto">
            Real experiences from enterprise clients and SOI program students — in their own words.
          </p>
        </div>

        {clientReviews.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-electric-blue/20 flex items-center justify-center">
                <span className="text-sm">🏢</span>
              </div>
              <h3 className="font-sora font-semibold text-white text-lg">Enterprise Client Reviews</h3>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {clientReviews.map((review, i) => (
                <ReviewCard key={review.id || i} review={{ ...review, type: 'client' }} index={i} />
              ))}
            </div>
          </div>
        )}

        {studentReviews.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-yellow-600/20 flex items-center justify-center">
                <span className="text-sm">🎓</span>
              </div>
              <h3 className="font-sora font-semibold text-white text-lg">SOI Student Experiences</h3>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {studentReviews.map((review, i) => (
                <ReviewCard key={review.id || i} review={{ ...review, type: 'student' }} index={i} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 glass-dark rounded-2xl p-6 border border-white/8 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
          <div>
            <div className="font-sora font-bold text-5xl text-white">5.0</div>
            <StarRating count={5} />
            <div className="text-white/40 text-xs mt-1">Overall Rating</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden sm:block" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {[
              { label: 'Enterprise Clients', value: `${clientReviews.length}+`, sub: 'Satisfied clients' },
              { label: 'SOI Students', value: '200+', sub: 'Program alumni' },
              { label: 'Recommendation', value: '100%', sub: 'Would recommend' },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-sora font-bold text-2xl text-gradient">{s.value}</div>
                <div className="text-white/60 text-xs">{s.label}</div>
                <div className="text-white/30 text-[10px]">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
