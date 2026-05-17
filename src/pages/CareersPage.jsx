import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { sendToEmail, buildCareerBody, COMPANY_EMAIL } from '../utils/sendEmail';
import { Briefcase, MapPin, ArrowRight, Upload, CheckCircle2, Users2, Zap, Globe, Building2 } from 'lucide-react';

export default function CareersPage() {
  const { data } = useAdmin();
  const activeJobs = data.careers.filter(j => j.active);
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (job) => {
    setSelectedJob(job);
    document.getElementById('apply-form').scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactHR = () => {
    const subject = encodeURIComponent('HR Inquiry — INERA Software');
    const body = encodeURIComponent('Hi HR Team,\n\nI would like to connect regarding career opportunities at INERA Software.\n\nName: \nPhone: \nLinkedIn: \n\nRegards');
    window.open(`mailto:${COMPANY_EMAIL}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    sendToEmail(
      COMPANY_EMAIL,
      `Job Application: ${selectedJob?.title || 'Unsolicited'} — ${form.name}`,
      buildCareerBody(form, selectedJob?.title)
    );
    setSubmitted(true);
  };

  const inputClass = 'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-electric-blue/60 transition-all';
  const labelClass = 'block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wide';

  return (
    <div className="pt-20 overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 px-4 md:px-8 grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-blue/10 to-deep-black" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-electric-blue/8 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-electric-blue/20">
            <Zap size={14} className="text-neon-cyan" />
            <span className="text-neon-cyan text-xs font-medium uppercase tracking-widest">Join Our Team</span>
          </div>
          <h1 className="font-sora text-4xl md:text-6xl font-bold text-white mb-6">
            Build the Future<br /><span className="blue-gradient">with InEra</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            Join a team of innovators, engineers, and technology leaders building intelligent systems for the future. We're looking for people who think differently.
          </p>
        </div>
      </section>

      {/* Culture */}
      <section className="py-12 px-4 md:px-8 border-y border-white/5 bg-deep-black/50">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Zap, title: 'Innovation-First', desc: 'Work on cutting-edge AI and software projects.' },
            { icon: Globe, title: 'Remote-Friendly', desc: 'Flexible work arrangements across India.' },
            { icon: Users2, title: 'Collaborative Culture', desc: 'Work with diverse, talented technology professionals.' },
            { icon: Building2, title: 'Growth Environment', desc: 'Fast career growth in a dynamic startup environment.' },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="glass rounded-2xl p-6 border border-white/5 card-hover text-center">
              <div className="w-12 h-12 rounded-xl bg-electric-blue/15 flex items-center justify-center mx-auto mb-3">
                <Icon size={20} className="text-electric-blue" />
              </div>
              <h3 className="font-sora font-semibold text-white mb-2">{title}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-neon-cyan text-xs uppercase tracking-widest mb-3">
            <div className="w-8 h-px bg-neon-cyan" /> Open Positions <div className="w-8 h-px bg-neon-cyan" />
          </div>
          <h2 className="font-sora text-3xl md:text-4xl font-bold text-white">
            {activeJobs.length > 0 ? 'Current Openings' : 'We\'re Hiring'}
          </h2>
        </div>

        {activeJobs.length > 0 ? (
          <div className="space-y-4">
            {activeJobs.map((job, i) => (
              <div key={job.id || i} className="glass rounded-2xl p-6 border border-white/8 card-hover group flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-electric-blue/20 text-electric-blue font-medium">{job.department}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/8 text-white/50">{job.type}</span>
                  </div>
                  <h3 className="font-sora font-bold text-white text-xl group-hover:text-neon-cyan transition-colors mb-1">{job.title}</h3>
                  <p className="text-white/50 text-sm mb-2">{job.description}</p>
                  <div className="flex items-center gap-1 text-white/40 text-xs">
                    <MapPin size={12} />
                    <span>{job.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleApply(job)}
                  className="btn-primary inline-flex items-center gap-2 whitespace-nowrap flex-shrink-0"
                >
                  Apply Now <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center glass rounded-2xl p-12 border border-white/5">
            <Briefcase size={40} className="text-white/20 mx-auto mb-4" />
            <h3 className="font-sora text-xl font-semibold text-white mb-2">No Current Openings</h3>
            <p className="text-white/50 text-sm max-w-md mx-auto mb-6">We don't have any open positions right now, but we're always looking for talented people. Send us your resume!</p>
            <button onClick={() => document.getElementById('apply-form').scrollIntoView({ behavior: 'smooth' })} className="btn-primary inline-flex items-center gap-2">
              Upload Resume <Upload size={15} />
            </button>
          </div>
        )}
      </section>

      {/* Application Form */}
      <section id="apply-form" className="section-padding max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-sora text-3xl font-bold text-white mb-3">
            {selectedJob ? `Apply for ${selectedJob.title}` : 'Apply / Upload Resume'}
          </h2>
          {selectedJob && <p className="text-electric-blue text-sm">{selectedJob.department} · {selectedJob.location}</p>}
        </div>

        {submitted ? (
          <div className="glass-dark rounded-3xl p-12 border border-green-500/30 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-400" />
            </div>
            <h3 className="font-sora text-2xl font-bold text-white mb-3">Application Submitted!</h3>
            <p className="text-white/60 text-sm max-w-md mx-auto mb-4">Your email client has been opened to deliver your application to <span className="text-neon-cyan">{COMPANY_EMAIL}</span>. Our HR team will contact you within 5-7 business days.</p>
            <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm px-5 py-2">Apply Again</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 border border-electric-blue/20">
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div><label className={labelClass}>Full Name *</label><input required className={inputClass} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your Full Name" /></div>
              <div><label className={labelClass}>Email Address *</label><input required type="email" className={inputClass} value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" /></div>
              <div><label className={labelClass}>Phone Number *</label><input required className={inputClass} value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" /></div>
              <div>
                <label className={labelClass}>Position</label>
                <input className={inputClass} value={selectedJob?.title || ''} readOnly placeholder="Unsolicited Application" />
              </div>
            </div>
            <div className="mb-5">
              <label className={labelClass}>Cover Message</label>
              <textarea rows={4} className={inputClass} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell us about yourself and why you want to join INERA..." />
            </div>
            <div className="mb-6">
              <label className={labelClass}>Upload Resume</label>
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-white/15 rounded-xl cursor-pointer hover:border-electric-blue/40 transition-colors group">
                <Upload size={24} className="text-white/30 group-hover:text-electric-blue mb-2 transition-colors" />
                <span className="text-white/40 text-sm group-hover:text-white/70 transition-colors">Click to upload your resume (PDF, DOCX)</span>
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
              </label>
            </div>
            <div className="flex gap-4">
              <button type="submit" className="flex-1 btn-primary py-4 font-sora font-bold flex items-center justify-center gap-2">
                Submit Application <ArrowRight size={16} />
              </button>
              <button type="button" onClick={handleContactHR} className="btn-secondary px-6 py-4 font-semibold text-sm flex items-center gap-2">
                Contact HR
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
