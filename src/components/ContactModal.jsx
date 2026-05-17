import { useState, useEffect } from 'react';
import { X, Send, Calendar, User, Mail, Phone, Building2, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { sendToEmail, buildConsultationBody, buildContactBody, COMPANY_EMAIL } from '../utils/sendEmail';

const EMPTY_FORM = {
  name: '', company: '', email: '', phone: '', service: '', preferredTime: '', message: ''
};

const iCls = 'w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-electric-blue/60 transition-all';
const iErrCls = 'w-full bg-white/5 border border-red-500/60 rounded-lg px-3.5 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-red-500/80 transition-all';
const lCls = 'flex items-center gap-1.5 text-white/50 text-xs font-medium uppercase tracking-wide mb-1.5';

/**
 * ContactModal — reusable modal for "Book Consultation" and "Schedule Meeting" actions.
 * Props:
 *   open: boolean
 *   onClose: () => void
 *   mode: 'consultation' | 'meeting'   (defaults to 'consultation')
 */
export default function ContactModal({ open, onClose, mode = 'consultation' }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Reset form whenever modal is opened
  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setErrors({});
      setSubmitted(false);
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const isMeeting = mode === 'meeting';
  const title = isMeeting ? 'Schedule a Meeting' : 'Book a Free Consultation';
  const subtitle = isMeeting
    ? "Fill in your details and we'll get back to confirm a time."
    : "Tell us about yourself and what you need — we'll reach out within 24 hours.";
  const submitLabel = isMeeting ? 'Request Meeting' : 'Book Consultation';
  const emailSubject = isMeeting
    ? 'Meeting Request — INERA Software'
    : 'Book Consultation Request — INERA Software';

  const set = (k, v) => {
    setForm(p => ({ ...p, [k]: v }));
    if (errors[k]) setErrors(p => ({ ...p, [k]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Your name is required';
    if (!form.email.trim()) errs.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    if (isMeeting && !form.preferredTime.trim()) errs.preferredTime = 'Please mention a preferred time';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const body = isMeeting
      ? buildConsultationBody({ ...form, message: form.message || 'I would like to schedule a meeting.' })
      : buildConsultationBody({ ...form, message: form.message || 'I would like to book a free consultation.' });

    sendToEmail(COMPANY_EMAIL, emailSubject, body);
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg glass rounded-3xl border border-white/10 shadow-2xl shadow-black/60 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-white/8 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-electric-blue/20 flex items-center justify-center flex-shrink-0">
              {isMeeting ? <Calendar size={18} className="text-electric-blue" /> : <Send size={18} className="text-electric-blue" />}
            </div>
            <div>
              <h2 className="font-sora font-bold text-white text-lg leading-tight">{title}</h2>
              <p className="text-white/40 text-xs mt-0.5">INERA SOFTWARE PRIVATE LIMITED</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all flex-shrink-0 ml-2"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1">
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12 px-8">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-5">
                <CheckCircle2 size={32} className="text-green-400" />
              </div>
              <h3 className="font-sora text-xl font-bold text-white mb-2">Request Submitted!</h3>
              <p className="text-white/55 text-sm leading-relaxed max-w-xs">
                Your email client has opened with your request pre-filled and ready to send to{' '}
                <span className="text-neon-cyan font-medium">{COMPANY_EMAIL}</span>.
                We'll respond within 24 business hours.
              </p>
              <button
                onClick={onClose}
                className="mt-6 btn-secondary text-sm px-6 py-2.5"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <p className="text-white/45 text-sm leading-relaxed -mt-1 mb-5">{subtitle}</p>

              {/* Name + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={lCls}><User size={11} /> Full Name <span className="text-red-400">*</span></label>
                  <input
                    className={errors.name ? iErrCls : iCls}
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className={lCls}><Phone size={11} /> Phone <span className="text-red-400">*</span></label>
                  <input
                    className={errors.phone ? iErrCls : iCls}
                    value={form.phone}
                    onChange={e => set('phone', e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                  {errors.phone && <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={lCls}><Mail size={11} /> Email Address <span className="text-red-400">*</span></label>
                <input
                  type="email"
                  className={errors.email ? iErrCls : iCls}
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
              </div>

              {/* Company */}
              <div>
                <label className={lCls}><Building2 size={11} /> Company / Organization</label>
                <input
                  className={iCls}
                  value={form.company}
                  onChange={e => set('company', e.target.value)}
                  placeholder="Company name (optional)"
                />
              </div>

              {/* Service */}
              <div>
                <label className={lCls}><MessageSquare size={11} /> What can we help you with?</label>
                <select
                  className="w-full bg-[#0d1117] border border-white/10 rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-electric-blue/60 transition-all appearance-none"
                  value={form.service}
                  onChange={e => set('service', e.target.value)}
                >
                  <option value="">Select a service...</option>
                  <option>AI Development & Automation</option>
                  <option>Custom Software Development</option>
                  <option>Web Development</option>
                  <option>Business Intelligence</option>
                  <option>HR Technology</option>
                  <option>Educational Technology</option>
                  <option>SOI / Internship Program</option>
                  <option>General Inquiry</option>
                  <option>Partnership Opportunity</option>
                </select>
              </div>

              {/* Preferred Time — only for meeting mode */}
              {isMeeting && (
                <div>
                  <label className={lCls}><Clock size={11} /> Preferred Date & Time <span className="text-red-400">*</span></label>
                  <input
                    className={errors.preferredTime ? iErrCls : iCls}
                    value={form.preferredTime}
                    onChange={e => set('preferredTime', e.target.value)}
                    placeholder="e.g. Monday 3 PM, or 20 June after 2 PM"
                  />
                  {errors.preferredTime && <p className="text-red-400 text-[11px] mt-1">{errors.preferredTime}</p>}
                </div>
              )}

              {/* Message */}
              <div>
                <label className={lCls}><MessageSquare size={11} /> Additional Message</label>
                <textarea
                  rows={3}
                  className={iCls}
                  value={form.message}
                  onChange={e => set('message', e.target.value)}
                  placeholder={isMeeting ? 'What topics would you like to discuss?' : 'Briefly describe your project or requirements...'}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full btn-primary py-3 font-sora font-semibold text-sm flex items-center justify-center gap-2 mt-2"
              >
                {isMeeting ? <Calendar size={15} /> : <Send size={15} />}
                {submitLabel}
              </button>
              <p className="text-white/25 text-[11px] text-center pb-1">
                Your email client will open with your details pre-filled. We respond within 24 hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
