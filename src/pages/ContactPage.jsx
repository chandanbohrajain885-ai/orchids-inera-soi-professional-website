import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { sendToEmail, buildContactBody, COMPANY_EMAIL } from '../utils/sendEmail';
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, Twitter, Facebook, MessageCircle, Send, Calendar, CheckCircle2 } from 'lucide-react';
import ContactModal from '../components/ContactModal';

export default function ContactPage() {
  const { data } = useAdmin();
  const { contact, socialLinks } = data;
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name) errs.name = 'Required';
    if (!form.email) errs.email = 'Required';
    if (!form.message) errs.message = 'Required';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // Send email to company
    sendToEmail(
      COMPANY_EMAIL,
      `New Inquiry from ${form.name} — ${form.service || 'General'}`,
      buildContactBody(form)
    );
    setSubmitted(true);
  };


  const inputClass = (err) => `w-full bg-white/5 border ${err ? 'border-red-500/60' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-electric-blue/60 transition-all`;
  const labelClass = 'block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wide';

  const socials = [
    { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn', color: 'hover:text-blue-400 hover:border-blue-400/40' },
    { icon: Instagram, href: socialLinks.instagram, label: 'Instagram', color: 'hover:text-pink-400 hover:border-pink-400/40' },
    { icon: Youtube, href: socialLinks.youtube, label: 'YouTube', color: 'hover:text-red-400 hover:border-red-400/40' },
    { icon: Twitter, href: socialLinks.twitter, label: 'Twitter / X', color: 'hover:text-sky-400 hover:border-sky-400/40' },
    { icon: Facebook, href: socialLinks.facebook, label: 'Facebook', color: 'hover:text-blue-500 hover:border-blue-500/40' },
  ];

  return (
    <div className="pt-20 overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 px-4 md:px-8 grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-blue/10 to-deep-black" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-electric-blue/8 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-electric-blue/20">
            <Send size={14} className="text-neon-cyan" />
            <span className="text-neon-cyan text-xs font-medium uppercase tracking-widest">Get In Touch</span>
          </div>
          <h1 className="font-sora text-4xl md:text-5xl font-bold text-white mb-5">
            Let's Build Something<br /><span className="blue-gradient">Intelligent Together</span>
          </h1>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            Connect with INERA Software Private Limited to explore intelligent technology solutions, automation systems, and future-ready digital innovation.
          </p>
        </div>
      </section>

      <section className="section-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div>
            <h2 className="font-sora text-2xl font-bold text-white mb-6">Send an Inquiry</h2>
            {submitted ? (
              <div className="glass-dark rounded-3xl p-10 border border-green-500/30 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-green-400" />
                </div>
                <h3 className="font-sora text-xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-white/60 text-sm max-w-sm mx-auto mb-4">Your inquiry has been submitted. Your default email client has been opened to complete delivery to <span className="text-neon-cyan">{COMPANY_EMAIL}</span>.</p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary text-sm px-5 py-2">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-7 border border-electric-blue/15 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input className={inputClass(errors.name)} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your Name" />
                    {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name}</span>}
                  </div>
                  <div>
                    <label className={labelClass}>Company Name</label>
                    <input className={inputClass()} value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} placeholder="Your Company" />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input type="email" className={inputClass(errors.email)} value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="email@company.com" />
                    {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email}</span>}
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input className={inputClass()} value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Service Required</label>
                  <select className="w-full bg-[#0d1117] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-electric-blue/60 transition-all appearance-none" value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))}>
                    <option value="">Select Service</option>
                    <option>AI Development & Automation</option>
                    <option>Custom Software Development</option>
                    <option>Web Development</option>
                    <option>Business Intelligence</option>
                    <option>HR Technology</option>
                    <option>Educational Technology</option>
                    <option>SOI / Internship Program</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Message *</label>
                  <textarea rows={4} className={inputClass(errors.message)} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell us about your project or inquiry..." />
                  {errors.message && <span className="text-red-400 text-xs mt-1 block">{errors.message}</span>}
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="flex-1 btn-primary py-3.5 font-sora font-semibold flex items-center justify-center gap-2">
                    <Send size={15} /> Send Inquiry to {COMPANY_EMAIL}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setMeetingModalOpen(true)}
                  className="w-full btn-secondary py-3 font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Calendar size={15} /> Schedule a Meeting
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h2 className="font-sora text-2xl font-bold text-white mb-6">Contact Details</h2>

            {/* Headquarters */}
            <div className="glass rounded-2xl p-6 border border-white/8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-electric-blue/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-electric-blue" />
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-wide mb-1">Headquarters</div>
                  <div className="text-white font-semibold">{contact.headquarters}</div>
                  <div className="text-white/50 text-xs mt-2">Branch Offices: {contact.branches?.join(' · ')}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <a href={`mailto:${contact.email}`} className="glass rounded-2xl p-5 border border-white/8 card-hover group block">
                <div className="w-9 h-9 rounded-lg bg-neon-cyan/15 flex items-center justify-center mb-3">
                  <Mail size={16} className="text-neon-cyan" />
                </div>
                <div className="text-white/40 text-xs uppercase tracking-wide mb-1">Email</div>
                <div className="text-white text-xs font-medium group-hover:text-neon-cyan transition-colors break-all">{contact.email}</div>
              </a>
              <a href={`tel:${contact.phone}`} className="glass rounded-2xl p-5 border border-white/8 card-hover group block">
                <div className="w-9 h-9 rounded-lg bg-green-500/15 flex items-center justify-center mb-3">
                  <Phone size={16} className="text-green-400" />
                </div>
                <div className="text-white/40 text-xs uppercase tracking-wide mb-1">Phone</div>
                <div className="text-white text-xs font-medium group-hover:text-green-400 transition-colors">{contact.phone}</div>
              </a>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl p-5 border border-green-500/20 hover:border-green-500/40 transition-colors flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={22} className="text-green-400" fill="currentColor" />
              </div>
              <div>
                <div className="font-sora font-semibold text-white group-hover:text-green-400 transition-colors">Chat on WhatsApp</div>
                <div className="text-white/50 text-xs">Quick response during business hours</div>
              </div>
            </a>

            {/* Social Links */}
            <div className="glass rounded-2xl p-6 border border-white/8">
              <div className="text-white/40 text-xs uppercase tracking-wide mb-4">Follow Us</div>
              <div className="grid grid-cols-5 gap-2">
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl glass border border-white/8 text-white/40 ${color} transition-all duration-300 hover:scale-105`}
                  >
                    <Icon size={16} />
                    <span className="text-[9px] text-center leading-tight">{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* SOI Contact */}
            <div className="glass rounded-2xl p-5 border border-yellow-600/20">
              <div className="text-yellow-400/80 text-xs uppercase tracking-wide mb-2">SOI — School of Intelligence</div>
              <a href="mailto:ineraschoolofinternships@gmail.com" className="text-white hover:text-yellow-400 transition-colors text-sm font-medium">
                ineraschoolofinternships@gmail.com
              </a>
              <p className="text-white/40 text-xs mt-1">For internship, SOI program & institutional queries</p>
            </div>
          </div>
        </div>
      </section>

      <ContactModal open={meetingModalOpen} onClose={() => setMeetingModalOpen(false)} mode="meeting" />
    </div>
  );
}
