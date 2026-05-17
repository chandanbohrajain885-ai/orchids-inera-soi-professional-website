import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Megaphone, Star, Briefcase, Link2, Users,
  Phone, Lock, LogOut, Eye, EyeOff, Save, Plus, Trash2, Check,
  X, ChevronRight, ArrowLeft, Globe, GraduationCap, MessageSquare, Image
} from 'lucide-react';

const tabs = [
  { id: 'dashboard',   label: 'Dashboard',        icon: LayoutDashboard },
  { id: 'social',      label: 'Social Links',      icon: Link2 },
  { id: 'contact',     label: 'Contact Info',      icon: Phone },
  { id: 'announcements', label: 'Announcements',   icon: Megaphone },
  { id: 'highlights',  label: 'Highlights',        icon: Star },
  { id: 'careers',     label: 'Careers',           icon: Briefcase },
  { id: 'soi',         label: 'SOI Settings',      icon: GraduationCap },
  { id: 'pillars',     label: 'Core Pillars',      icon: Users },
  { id: 'gallery',     label: 'Gallery',           icon: Image },
  { id: 'clientreviews', label: 'Client Reviews',  icon: MessageSquare },
  { id: 'studentreviews', label: 'Student Reviews', icon: MessageSquare },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const Section = ({ title, sub, children }) => (
  <div className="glass rounded-2xl p-6 border border-white/8">
    <h3 className="font-sora font-semibold text-white text-lg pb-3 border-b border-white/8 mb-1">{title}</h3>
    {sub && <p className="text-white/40 text-xs mb-5">{sub}</p>}
    {!sub && <div className="mb-5" />}
    {children}
  </div>
);

const SaveBtn = ({ onClick, saved }) => (
  <button
    onClick={onClick}
    disabled={saved === 'saving'}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 disabled:opacity-60 ${
      saved === true ? 'bg-green-600 text-white' : saved === 'saving' ? 'bg-yellow-600/80 text-white' : 'bg-electric-blue hover:bg-blue-500 text-white'
    }`}
  >
    {saved === true ? <><Check size={15} /> Saved!</> : saved === 'saving' ? <><Save size={15} /> Saving...</> : <><Save size={15} /> Save Changes</>}
  </button>
);

const iCls = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-electric-blue/60 transition-all';
const lCls = 'block text-white/50 text-xs uppercase tracking-wide mb-1.5';

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const ok = onLogin(password);
      if (!ok) setError('Invalid password. Please try again.');
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-deep-black grid-pattern flex items-center justify-center p-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-yellow-600/30 mx-auto mb-4">
            <img src="/inera-logo.jpg" alt="InEra" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-sora text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-white/40 text-sm mt-1">INERA SOFTWARE PRIVATE LIMITED</p>
        </div>
        <div className="glass rounded-2xl p-8 border border-white/10">
          <h2 className="font-sora font-semibold text-white mb-6 text-center flex items-center justify-center gap-2">
            <Lock size={16} className="text-electric-blue" /> Secure Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/50 text-xs uppercase tracking-wide mb-2">Admin Password</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  className={`w-full bg-white/5 border ${error ? 'border-red-500/60' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-electric-blue/60 transition-all pr-12`}
                />
                <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-electric-blue hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Authenticating...' : 'Login to Admin Panel'}
            </button>
          </form>
        </div>
        <Link to="/" className="flex items-center justify-center gap-2 mt-6 text-white/40 hover:text-white text-sm transition-colors">
          <ArrowLeft size={14} /> Back to Website
        </Link>
      </div>
    </div>
  );
}

// ─── Dashboard (all hooks here — no conditional returns above hooks) ──────────
function AdminDashboard({ data, updateData, updateGallery, persistGallery, deleteGalleryItem, logout, isSupabaseConnected }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [saved, setSaved] = useState({});

  // All local state declared unconditionally
  const [socialState,   setSocialState]   = useState(() => ({ ...data.socialLinks }));
  const [contactState,  setContactState]  = useState(() => ({ ...data.contact }));
  const [annState,      setAnnState]      = useState(() => [...data.announcements]);
  const [highState,     setHighState]     = useState(() => [...data.highlights]);
  const [careersState,  setCareersState]  = useState(() => [...data.careers]);
  const [soiState,      setSoiState]      = useState(() => ({ ...data.soi }));
  const [pillarsState,  setPillarsState]  = useState(() => JSON.parse(JSON.stringify(data.pillars || [])));
  const [clientRev,     setClientRev]     = useState(() => JSON.parse(JSON.stringify(data.clientReviews || [])));
  const [studentRev,    setStudentRev]    = useState(() => JSON.parse(JSON.stringify(data.studentReviews || [])));
  const [galleryItems,  setGalleryItems]  = useState(() => JSON.parse(JSON.stringify(data.galleryItems || [])));
  const [galleryCats,   setGalleryCats]   = useState(() => [...(data.galleryCategories || [])]);
  const [newCatInput,   setNewCatInput]   = useState('');

  const flag = (key) => {
    setSaved(p => ({ ...p, [key]: true }));
    setTimeout(() => setSaved(p => ({ ...p, [key]: false })), 2500);
  };

  // ── Social ──────────────────────────────────────────────────────────────────
  const saveSocial = () => { updateData('socialLinks', socialState); flag('social'); };

  // ── Contact ─────────────────────────────────────────────────────────────────
  const saveContact = () => { updateData('contact', contactState); flag('contact'); };

  // ── Announcements ───────────────────────────────────────────────────────────
  const addAnn = () => setAnnState(p => [...p, { id: Date.now(), text: '', active: true }]);
  const removeAnn = (id) => setAnnState(p => p.filter(a => a.id !== id));
  const toggleAnn = (id) => setAnnState(p => p.map(a => a.id === id ? { ...a, active: !a.active } : a));
  const updateAnnText = (id, text) => setAnnState(p => p.map(a => a.id === id ? { ...a, text } : a));
  const saveAnn = () => { updateData('announcements', annState); flag('ann'); };

  // ── Highlights ──────────────────────────────────────────────────────────────
  const addHighlight = () => setHighState(p => [...p, { id: Date.now(), title: '', description: '', tag: 'News', active: true }]);
  const removeHighlight = (id) => setHighState(p => p.filter(h => h.id !== id));
  const toggleHighlight = (id) => setHighState(p => p.map(h => h.id === id ? { ...h, active: !h.active } : h));
  const updateHighlight = (id, field, val) => setHighState(p => p.map(h => h.id === id ? { ...h, [field]: val } : h));
  const saveHighlights = () => { updateData('highlights', highState); flag('highlights'); };

  // ── Careers ─────────────────────────────────────────────────────────────────
  const addJob = () => setCareersState(p => [...p, { id: Date.now(), title: '', department: '', type: 'Full-time', location: '', description: '', active: true }]);
  const removeJob = (id) => setCareersState(p => p.filter(j => j.id !== id));
  const toggleJob = (id) => setCareersState(p => p.map(j => j.id === id ? { ...j, active: !j.active } : j));
  const updateJob = (id, field, val) => setCareersState(p => p.map(j => j.id === id ? { ...j, [field]: val } : j));
  const saveJobs = () => { updateData('careers', careersState); flag('careers'); };

  // ── SOI ─────────────────────────────────────────────────────────────────────
  const saveSoi = () => { updateData('soi', soiState); flag('soi'); };

  // ── Pillars CRUD ────────────────────────────────────────────────────────────
  const PILLAR_COLORS = ['blue', 'purple', 'pink', 'yellow', 'cyan', 'green', 'orange', 'red'];
  const addPillar = () => setPillarsState(p => [...p, {
    id: Date.now(),
    name: '',
    designation: '',
    image: '',
    quote: '',
    contactEmail: '',
    linkedin: '',
    colorScheme: PILLAR_COLORS[p.length % PILLAR_COLORS.length],
    whiteBg: false,
  }]);
  const removePillar = (id) => setPillarsState(p => p.filter(x => x.id !== id));
  const updatePillar = (id, field, val) => setPillarsState(p => p.map(x => x.id === id ? { ...x, [field]: val } : x));
  const savePillars = () => { updateData('pillars', pillarsState); flag('pillars'); };

  // ── Gallery ─────────────────────────────────────────────────────────────────
  const addGalleryItem = () => setGalleryItems(p => [...p, { id: Date.now(), title: '', category: galleryCats[0] || '', image: '', active: true }]);
  const removeGalleryItem = (id) => {
    setGalleryItems(p => p.filter(x => x.id !== id && String(x.id) !== String(id)));
    deleteGalleryItem(id); // sync delete to Supabase + localStorage
  };
  const toggleGalleryItem = (id) => setGalleryItems(p => p.map(x => x.id === id ? { ...x, active: !x.active } : x));
  const updateGalleryItem = (id, field, val) => setGalleryItems(p => p.map(x => x.id === id ? { ...x, [field]: val } : x));

  // Compress image via canvas before storing — keeps each image ~50–100KB max
  const compressImage = (file, callback) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const MAX = 700; // keep dimensions small — fine for gallery display
      let { width, height } = img;
      if (width > height && width > MAX) { height = Math.round(height * MAX / width); width = MAX; }
      else if (height > MAX) { width = Math.round(width * MAX / height); height = MAX; }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      callback(canvas.toDataURL('image/jpeg', 0.60)); // 0.60 quality ≈ 40–70KB per image
    };
    img.src = url;
  };

  const handleImageUpload = (id, file) => {
    if (!file) return;
    compressImage(file, (compressed) => {
      const updated = galleryItems.map(x => x.id === id ? { ...x, image: compressed } : x);
      setGalleryItems(updated);
      updateGallery(updated);
    });
  };

  const saveGallery = async () => {
    setSaved(p => ({ ...p, gallery: 'saving' }));
    await persistGallery(galleryItems);
    updateData('galleryCategories', galleryCats);
    flag('gallery');
  };
  const addGalleryCat = () => {
    const trimmed = newCatInput.trim();
    if (trimmed && !galleryCats.includes(trimmed)) {
      setGalleryCats(p => [...p, trimmed]);
      setNewCatInput('');
    }
  };
  const removeGalleryCat = (cat) => setGalleryCats(p => p.filter(c => c !== cat));

  // ── Client Reviews ──────────────────────────────────────────────────────────
  const COLORS = ['from-blue-600 to-blue-800', 'from-purple-600 to-purple-800', 'from-cyan-600 to-blue-700', 'from-green-600 to-teal-700', 'from-orange-600 to-red-700', 'from-pink-600 to-purple-700'];
  const makeAvatar = (name) => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const addClientReview = () => setClientRev(p => [...p, { id: Date.now(), name: '', role: '', location: '', avatar: 'NEW', color: COLORS[p.length % COLORS.length], rating: 5, text: '', active: true }]);
  const removeClientReview = (id) => setClientRev(p => p.filter(r => r.id !== id));
  const toggleClientReview = (id) => setClientRev(p => p.map(r => r.id === id ? { ...r, active: !r.active } : r));
  const updateClientReview = (id, field, val) => setClientRev(p => p.map(r => r.id === id ? { ...r, [field]: val, ...(field === 'name' ? { avatar: makeAvatar(val) } : {}) } : r));
  const saveClientReviews = () => { updateData('clientReviews', clientRev); flag('clientreviews'); };

  // ── Student Reviews ─────────────────────────────────────────────────────────
  const addStudentReview = () => setStudentRev(p => [...p, { id: Date.now(), name: '', role: '', college: '', avatar: 'NEW', color: COLORS[p.length % COLORS.length], rating: 5, text: '', active: true }]);
  const removeStudentReview = (id) => setStudentRev(p => p.filter(r => r.id !== id));
  const toggleStudentReview = (id) => setStudentRev(p => p.map(r => r.id === id ? { ...r, active: !r.active } : r));
  const updateStudentReview = (id, field, val) => setStudentRev(p => p.map(r => r.id === id ? { ...r, [field]: val, ...(field === 'name' ? { avatar: makeAvatar(val) } : {}) } : r));
  const saveStudentReviews = () => { updateData('studentReviews', studentRev); flag('studentreviews'); };

  // ── Render ──────────────────────────────────────────────────────────────────
  const renderContent = () => {
    switch (activeTab) {

      case 'dashboard':
        return (
          <div className="space-y-5">
            <div className="glass-dark rounded-2xl p-6 border border-yellow-600/20 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden ring-2 ring-yellow-600/30 flex-shrink-0">
                <img src="/inera-logo.jpg" alt="InEra" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-sora font-bold text-white text-xl">Welcome, Admin</h2>
                <p className="text-white/50 text-sm">INERA SOFTWARE PRIVATE LIMITED — Admin Control Panel</p>
                <p className="text-green-400/70 text-xs mt-1">● All changes save instantly to the live website</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {[
                { label: 'Announcements', value: data.announcements.filter(a => a.active).length, color: 'text-electric-blue' },
                { label: 'Highlights', value: data.highlights.filter(h => h.active).length, color: 'text-neon-cyan' },
                { label: 'Open Positions', value: data.careers.filter(j => j.active).length, color: 'text-green-400' },
                { label: 'Gallery Photos', value: (data.galleryItems || []).filter(i => i.active !== false).length, color: 'text-orange-400' },
                { label: 'Client Reviews', value: (data.clientReviews || []).filter(r => r.active !== false).length, color: 'text-purple-400' },
                { label: 'SOI Reviews', value: (data.studentReviews || []).filter(r => r.active !== false).length, color: 'text-yellow-400' },
              ].map((s, i) => (
                <div key={i} className="glass rounded-2xl p-4 border border-white/8 text-center">
                  <div className={`font-sora font-bold text-2xl ${s.color} mb-1`}>{s.value}</div>
                  <div className="text-white/50 text-xs">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tabs.slice(1).map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex items-center gap-3 p-4 glass rounded-xl border border-white/8 hover:border-electric-blue/40 transition-colors text-left group">
                  <tab.icon size={18} className="text-electric-blue flex-shrink-0" />
                  <span className="text-white/70 group-hover:text-white text-sm transition-colors">{tab.label}</span>
                  <ChevronRight size={14} className="text-white/30 ml-auto" />
                </button>
              ))}
            </div>
          </div>
        );

      case 'social':
        return (
          <Section title="Social Media Links" sub="Update social media URLs. Changes reflect immediately on the website footer and contact page.">
            <div className="space-y-4">
              {Object.entries(socialState).map(([key, val]) => (
                <div key={key}>
                  <label className={lCls}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  <input className={iCls} value={val} onChange={e => setSocialState(p => ({ ...p, [key]: e.target.value }))} placeholder={`https://${key}.com/...`} />
                </div>
              ))}
              <SaveBtn onClick={saveSocial} saved={saved.social} />
            </div>
          </Section>
        );

      case 'contact':
        return (
          <Section title="Contact Information" sub="Update company contact details shown on the Contact page and footer.">
            <div className="space-y-4">
              <div><label className={lCls}>Company Email</label><input className={iCls} value={contactState.email} onChange={e => setContactState(p => ({ ...p, email: e.target.value }))} /></div>
              <div><label className={lCls}>Phone Number</label><input className={iCls} value={contactState.phone} onChange={e => setContactState(p => ({ ...p, phone: e.target.value }))} /></div>
              <div><label className={lCls}>Headquarters</label><input className={iCls} value={contactState.headquarters} onChange={e => setContactState(p => ({ ...p, headquarters: e.target.value }))} /></div>
              <div>
                <label className={lCls}>Branch Offices (comma separated)</label>
                <input className={iCls} value={contactState.branches?.join(', ') || ''} onChange={e => setContactState(p => ({ ...p, branches: e.target.value.split(',').map(b => b.trim()).filter(Boolean) }))} placeholder="Belagavi, Pune, Bangalore" />
              </div>
              <SaveBtn onClick={saveContact} saved={saved.contact} />
            </div>
          </Section>
        );

      case 'announcements':
        return (
          <Section title="Live Announcements" sub="Manage announcement items stored in site data. Toggle active/inactive, edit, add or remove.">
            <div className="space-y-3 mb-4">
              {annState.map(ann => (
                <div key={ann.id} className="flex items-center gap-3 p-3 bg-white/3 rounded-xl border border-white/5">
                  <button onClick={() => toggleAnn(ann.id)} className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${ann.active ? 'bg-green-600/30 text-green-400' : 'bg-white/5 text-white/30'}`}>
                    {ann.active ? <Check size={14} /> : <X size={14} />}
                  </button>
                  <input className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-white/30 min-w-0" value={ann.text} onChange={e => updateAnnText(ann.id, e.target.value)} placeholder="Announcement text..." />
                  <button onClick={() => removeAnn(ann.id)} className="w-7 h-7 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 flex items-center justify-center flex-shrink-0">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              <button onClick={addAnn} className="btn-secondary text-sm flex items-center gap-2"><Plus size={14} /> Add</button>
              <SaveBtn onClick={saveAnn} saved={saved.ann} />
            </div>
          </Section>
        );

      case 'highlights':
        return (
          <Section title="Homepage Highlights" sub="Cards shown on the homepage. Toggle visibility, edit, add or remove.">
            <div className="space-y-4 mb-4">
              {highState.map(h => (
                <div key={h.id} className="p-4 bg-white/3 rounded-xl border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <button onClick={() => toggleHighlight(h.id)} className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors ${h.active ? 'bg-green-600/30 text-green-400' : 'bg-white/8 text-white/40'}`}>
                      {h.active ? '● Active' : '○ Hidden'}
                    </button>
                    <button onClick={() => removeHighlight(h.id)} className="w-7 h-7 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 flex items-center justify-center"><Trash2 size={13} /></button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input className={iCls} value={h.title} onChange={e => updateHighlight(h.id, 'title', e.target.value)} placeholder="Title" />
                    <select className={`${iCls} bg-[#0d1117] appearance-none`} value={h.tag} onChange={e => updateHighlight(h.id, 'tag', e.target.value)}>
                      <option>Achievement</option><option>News</option><option>Milestone</option><option>Expansion</option><option>Update</option>
                    </select>
                  </div>
                  <textarea rows={2} className={iCls} value={h.description} onChange={e => updateHighlight(h.id, 'description', e.target.value)} placeholder="Description..." />
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              <button onClick={addHighlight} className="btn-secondary text-sm flex items-center gap-2"><Plus size={14} /> Add Highlight</button>
              <SaveBtn onClick={saveHighlights} saved={saved.highlights} />
            </div>
          </Section>
        );

      case 'careers':
        return (
          <Section title="Job Openings" sub="Manage positions shown on the Careers page.">
            <div className="space-y-4 mb-4">
              {careersState.map(job => (
                <div key={job.id} className="p-4 bg-white/3 rounded-xl border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <button onClick={() => toggleJob(job.id)} className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors ${job.active ? 'bg-green-600/30 text-green-400' : 'bg-white/8 text-white/40'}`}>
                      {job.active ? '● Active' : '○ Hidden'}
                    </button>
                    <button onClick={() => removeJob(job.id)} className="w-7 h-7 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 flex items-center justify-center"><Trash2 size={13} /></button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input className={iCls} value={job.title} onChange={e => updateJob(job.id, 'title', e.target.value)} placeholder="Job Title" />
                    <input className={iCls} value={job.department} onChange={e => updateJob(job.id, 'department', e.target.value)} placeholder="Department" />
                    <select className={`${iCls} bg-[#0d1117] appearance-none`} value={job.type} onChange={e => updateJob(job.id, 'type', e.target.value)}>
                      <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
                    </select>
                    <input className={iCls} value={job.location} onChange={e => updateJob(job.id, 'location', e.target.value)} placeholder="Location" />
                  </div>
                  <textarea rows={2} className={iCls} value={job.description} onChange={e => updateJob(job.id, 'description', e.target.value)} placeholder="Job description..." />
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              <button onClick={addJob} className="btn-secondary text-sm flex items-center gap-2"><Plus size={14} /> Add Job</button>
              <SaveBtn onClick={saveJobs} saved={saved.careers} />
            </div>
          </Section>
        );

      case 'soi':
        return (
          <Section title="SOI Program Settings" sub="Update SOI program details shown on the SOI page.">
            <div className="space-y-4">
              <div><label className={lCls}>Tagline</label><input className={iCls} value={soiState.tagline} onChange={e => setSoiState(p => ({ ...p, tagline: e.target.value }))} /></div>
              <div><label className={lCls}>Main Headline</label><input className={iCls} value={soiState.headline} onChange={e => setSoiState(p => ({ ...p, headline: e.target.value }))} /></div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className={lCls}>Fee Per Student</label><input className={iCls} value={soiState.feePerStudent} onChange={e => setSoiState(p => ({ ...p, feePerStudent: e.target.value }))} /></div>
                <div><label className={lCls}>Minimum Students</label><input type="number" className={iCls} value={soiState.minStudents} onChange={e => setSoiState(p => ({ ...p, minStudents: parseInt(e.target.value) || 100 }))} /></div>
                <div>
                  <label className={lCls}>Mode</label>
                  <select className={`${iCls} bg-[#0d1117] appearance-none`} value={soiState.mode} onChange={e => setSoiState(p => ({ ...p, mode: e.target.value }))}>
                    <option>Online Only</option><option>Offline Only</option><option>Hybrid</option>
                  </select>
                </div>
                <div className="flex items-center gap-3 pt-5">
                  <button onClick={() => setSoiState(p => ({ ...p, openForRegistration: !p.openForRegistration }))} className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${soiState.openForRegistration ? 'bg-green-600/30 text-green-400 border border-green-600/30' : 'bg-red-500/15 text-red-400 border border-red-500/30'}`}>
                    {soiState.openForRegistration ? '● Registrations OPEN' : '○ Registrations CLOSED'}
                  </button>
                </div>
              </div>
              <SaveBtn onClick={saveSoi} saved={saved.soi} />
            </div>
          </Section>
        );

      case 'pillars': {
        const PillarRow = ({ p }) => (
          <div className="p-4 bg-white/3 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-electric-blue/20 flex items-center justify-center text-xs font-bold text-electric-blue flex-shrink-0">
                  {p.name ? p.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : '?'}
                </div>
                <span className="text-white/60 text-sm font-medium truncate">{p.name || 'New Member'}</span>
              </div>
              <button onClick={() => removePillar(p.id)} className="w-7 h-7 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 flex items-center justify-center flex-shrink-0">
                <Trash2 size={13} />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><label className={lCls}>Full Name</label><input className={iCls} value={p.name} onChange={e => updatePillar(p.id, 'name', e.target.value)} placeholder="e.g. Chandan Bohra Jain" /></div>
              <div><label className={lCls}>Designation / Role</label><input className={iCls} value={p.designation} onChange={e => updatePillar(p.id, 'designation', e.target.value)} placeholder="e.g. Founder & CEO" /></div>
              <div><label className={lCls}>Contact Email</label><input className={iCls} value={p.contactEmail} onChange={e => updatePillar(p.id, 'contactEmail', e.target.value)} placeholder="name@gmail.com (leave blank to hide)" /></div>
              <div><label className={lCls}>LinkedIn URL</label><input className={iCls} value={p.linkedin} onChange={e => updatePillar(p.id, 'linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" /></div>
              <div><label className={lCls}>Photo URL or /filename.jpg</label><input className={iCls} value={p.image} onChange={e => updatePillar(p.id, 'image', e.target.value)} placeholder="/pillar-name.jpg" /></div>
              <div>
                <label className={lCls}>Card Color Theme</label>
                <select className={`${iCls} bg-[#0d1117] appearance-none capitalize`} value={p.colorScheme} onChange={e => updatePillar(p.id, 'colorScheme', e.target.value)}>
                  {['blue','purple','pink','yellow','cyan','green','orange','red'].map(c => (
                    <option key={c} value={c} className="capitalize">{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className={lCls}>Quote / Tagline</label>
              <textarea rows={2} className={iCls} value={p.quote} onChange={e => updatePillar(p.id, 'quote', e.target.value)} placeholder="Their personal quote shown on the leadership card..." />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updatePillar(p.id, 'whiteBg', !p.whiteBg)}
                className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-colors ${p.whiteBg ? 'bg-white/15 text-white border-white/30' : 'bg-white/5 text-white/40 border-white/10'}`}
              >
                {p.whiteBg ? '● White photo background' : '○ Dark photo background'}
              </button>
              <span className="text-white/30 text-[10px]">Use white bg if photo has a white/light background</span>
            </div>
          </div>
        );
        return (
          <Section title="Core Pillars — Leadership Team" sub="Add, edit, or remove leadership cards shown on the homepage. Control name, role, quote, photo, LinkedIn, and color theme.">
            <div className="space-y-5 mb-4">
              {pillarsState.map(p => <PillarRow key={p.id} p={p} />)}
              {pillarsState.length === 0 && (
                <div className="text-center py-8 text-white/30 text-sm">No pillars yet. Add your first team member below.</div>
              )}
            </div>
            <div className="flex gap-3 flex-wrap">
              <button onClick={addPillar} className="btn-secondary text-sm flex items-center gap-2"><Plus size={14} /> Add Member</button>
              <SaveBtn onClick={savePillars} saved={saved.pillars} />
            </div>
          </Section>
        );
      }

      case 'gallery': {
        // Bulk upload — compress each file before adding
        const handleBulkUpload = (files) => {
          Array.from(files).forEach((file) => {
            compressImage(file, (compressed) => {
              setGalleryItems(prev => [...prev, {
                id: Date.now() + Math.random(),
                title: file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
                category: galleryCats[0] || 'All',
                image: compressed,
                active: true,
              }]);
            });
          });
        };

        const GalleryRow = ({ item }) => (
          <div className="p-4 bg-white/3 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <button onClick={() => toggleGalleryItem(item.id)} className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors ${item.active !== false ? 'bg-green-600/30 text-green-400' : 'bg-white/8 text-white/40'}`}>
                {item.active !== false ? '● Visible' : '○ Hidden'}
              </button>
              <button onClick={() => removeGalleryItem(item.id)} className="w-7 h-7 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 flex items-center justify-center flex-shrink-0">
                <Trash2 size={13} />
              </button>
            </div>

            {/* Preview + controls side by side */}
            <div className="flex gap-4 items-start">
              {/* Preview box */}
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center">
                {item.image
                  ? <img src={item.image} alt={item.title || ''} className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                  : null}
                <div className={`w-full h-full items-center justify-center ${item.image ? 'hidden' : 'flex'}`}>
                  <Image size={24} className="text-white/20" />
                </div>
              </div>

              <div className="flex-1 space-y-2 min-w-0">
                {/* Upload a new file to replace */}
                <div>
                  <label className={lCls}>Replace / Upload Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => e.target.files[0] && handleImageUpload(item.id, e.target.files[0])}
                    className="w-full text-xs text-white/50 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-electric-blue/20 file:text-electric-blue file:text-xs file:font-semibold hover:file:bg-electric-blue/30 cursor-pointer"
                  />
                </div>
                {/* URL — only shown / active when no uploaded image */}
                {(!item.image || !item.image.startsWith('data:')) && (
                  <div>
                    <label className={lCls}>Or Image URL</label>
                    <input
                      className={iCls}
                      value={item.image || ''}
                      onChange={e => updateGalleryItem(item.id, 'image', e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                )}
                {item.image?.startsWith('data:') && (
                  <p className="text-green-400/70 text-[10px]">✓ Photo uploaded successfully</p>
                )}
              </div>
            </div>

            {/* Title + Category */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className={lCls}>Title / Caption</label>
                <input className={iCls} value={item.title} onChange={e => updateGalleryItem(item.id, 'title', e.target.value)} placeholder="e.g. SOI Orientation Day" />
              </div>
              <div>
                <label className={lCls}>Category</label>
                <select className={`${iCls} bg-[#0d1117] appearance-none`} value={item.category} onChange={e => updateGalleryItem(item.id, 'category', e.target.value)}>
                  {galleryCats.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>
        );

        return (
          <div className="space-y-5">
            {/* Categories Manager */}
            <Section title="Gallery Categories" sub="Add or remove category filter tabs shown on the Gallery page.">
              <div className="flex flex-wrap gap-2 mb-4">
                {galleryCats.map(cat => (
                  <div key={cat} className="flex items-center gap-1.5 bg-white/8 border border-white/10 rounded-full px-3 py-1">
                    <span className="text-white/70 text-xs font-medium">{cat}</span>
                    <button onClick={() => removeGalleryCat(cat)} className="text-red-400/60 hover:text-red-400 transition-colors ml-1">
                      <X size={11} />
                    </button>
                  </div>
                ))}
                {galleryCats.length === 0 && <span className="text-white/30 text-xs">No categories yet</span>}
              </div>
              <div className="flex gap-2">
                <input className={`${iCls} flex-1`} value={newCatInput} onChange={e => setNewCatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addGalleryCat()} placeholder="New category name..." />
                <button onClick={addGalleryCat} className="btn-secondary text-sm flex items-center gap-1.5 flex-shrink-0"><Plus size={13} /> Add</button>
              </div>
            </Section>

            {/* Bulk Upload */}
            <Section title="Bulk Upload" sub="Select multiple photos at once — they all get added instantly to your gallery.">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/15 rounded-xl cursor-pointer hover:border-electric-blue/50 hover:bg-electric-blue/5 transition-all group">
                <div className="flex flex-col items-center gap-2 text-center px-4">
                  <Image size={28} className="text-white/25 group-hover:text-electric-blue/60 transition-colors" />
                  <span className="text-white/50 text-sm group-hover:text-white/70 transition-colors font-medium">Click to select multiple photos</span>
                  <span className="text-white/25 text-xs">JPG, PNG, WEBP — select as many as you want at once</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={e => { if (e.target.files?.length) handleBulkUpload(e.target.files); e.target.value = ''; }}
                />
              </label>
              <p className="text-white/30 text-xs mt-2">After bulk uploading, hit <strong className="text-white/50">Save Changes</strong> below to make photos live.</p>
            </Section>

            {/* Individual Photos */}
            <Section title={`Gallery Photos (${galleryItems.length})`} sub="Manage each photo individually — edit title, category, toggle visibility, or remove.">
              <div className="space-y-4 mb-4">
                {galleryItems.length === 0 ? (
                  <div className="text-center py-10 text-white/30 text-sm border border-dashed border-white/10 rounded-xl">
                    No photos yet. Use Bulk Upload above or click "Add Single Photo".
                  </div>
                ) : (
                  galleryItems.map(item => <GalleryRow key={item.id} item={item} />)
                )}
              </div>
              <div className="flex gap-3 flex-wrap">
                <button onClick={addGalleryItem} className="btn-secondary text-sm flex items-center gap-2"><Plus size={14} /> Add Single Photo</button>
                <SaveBtn onClick={saveGallery} saved={saved.gallery} />
              </div>
            </Section>
          </div>
        );
      }

      case 'clientreviews': {
        const ReviewRow = ({ r }) => (
          <div className="p-4 bg-white/3 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <button onClick={() => toggleClientReview(r.id)} className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors ${r.active !== false ? 'bg-green-600/30 text-green-400' : 'bg-white/8 text-white/40'}`}>
                {r.active !== false ? '● Visible' : '○ Hidden'}
              </button>
              <button onClick={() => removeClientReview(r.id)} className="w-7 h-7 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 flex items-center justify-center"><Trash2 size={13} /></button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><label className={lCls}>Full Name</label><input className={iCls} value={r.name} onChange={e => updateClientReview(r.id, 'name', e.target.value)} placeholder="Rajesh Malhotra" /></div>
              <div><label className={lCls}>Role / Company</label><input className={iCls} value={r.role} onChange={e => updateClientReview(r.id, 'role', e.target.value)} placeholder="CTO, Company Name" /></div>
              <div><label className={lCls}>Location / City</label><input className={iCls} value={r.location || ''} onChange={e => updateClientReview(r.id, 'location', e.target.value)} placeholder="Bangalore" /></div>
              <div>
                <label className={lCls}>Star Rating</label>
                <select className={`${iCls} bg-[#0d1117] appearance-none`} value={r.rating} onChange={e => updateClientReview(r.id, 'rating', parseInt(e.target.value))}>
                  <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4)</option>
                  <option value={3}>⭐⭐⭐ (3)</option>
                </select>
              </div>
            </div>
            <div><label className={lCls}>Review Text</label><textarea rows={3} className={iCls} value={r.text} onChange={e => updateClientReview(r.id, 'text', e.target.value)} placeholder="Write the client's review..." /></div>
          </div>
        );
        return (
          <Section title="Enterprise Client Reviews" sub="Add, edit, toggle or remove enterprise client testimonials shown on the homepage.">
            <div className="space-y-4 mb-4">
              {clientRev.map(r => <ReviewRow key={r.id} r={r} />)}
            </div>
            <div className="flex gap-3 flex-wrap">
              <button onClick={addClientReview} className="btn-secondary text-sm flex items-center gap-2"><Plus size={14} /> Add Review</button>
              <SaveBtn onClick={saveClientReviews} saved={saved.clientreviews} />
            </div>
          </Section>
        );
      }

      case 'studentreviews': {
        const StudentRow = ({ r }) => (
          <div className="p-4 bg-white/3 rounded-xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <button onClick={() => toggleStudentReview(r.id)} className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors ${r.active !== false ? 'bg-green-600/30 text-green-400' : 'bg-white/8 text-white/40'}`}>
                {r.active !== false ? '● Visible' : '○ Hidden'}
              </button>
              <button onClick={() => removeStudentReview(r.id)} className="w-7 h-7 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 flex items-center justify-center"><Trash2 size={13} /></button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><label className={lCls}>Full Name</label><input className={iCls} value={r.name} onChange={e => updateStudentReview(r.id, 'name', e.target.value)} placeholder="Ananya Kulkarni" /></div>
              <div><label className={lCls}>Internship Track / Role</label><input className={iCls} value={r.role} onChange={e => updateStudentReview(r.id, 'role', e.target.value)} placeholder="SOI Intern — Web Development Track" /></div>
              <div><label className={lCls}>College / University</label><input className={iCls} value={r.college || ''} onChange={e => updateStudentReview(r.id, 'college', e.target.value)} placeholder="KLE Technological University" /></div>
              <div>
                <label className={lCls}>Star Rating</label>
                <select className={`${iCls} bg-[#0d1117] appearance-none`} value={r.rating} onChange={e => updateStudentReview(r.id, 'rating', parseInt(e.target.value))}>
                  <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4)</option>
                  <option value={3}>⭐⭐⭐ (3)</option>
                </select>
              </div>
            </div>
            <div><label className={lCls}>Review Text</label><textarea rows={3} className={iCls} value={r.text} onChange={e => updateStudentReview(r.id, 'text', e.target.value)} placeholder="Write the student's experience..." /></div>
          </div>
        );
        return (
          <Section title="SOI Student Experiences" sub="Add, edit, toggle or remove SOI student testimonials shown on the homepage.">
            <div className="space-y-4 mb-4">
              {studentRev.map(r => <StudentRow key={r.id} r={r} />)}
            </div>
            <div className="flex gap-3 flex-wrap">
              <button onClick={addStudentReview} className="btn-secondary text-sm flex items-center gap-2"><Plus size={14} /> Add Review</button>
              <SaveBtn onClick={saveStudentReviews} saved={saved.studentreviews} />
            </div>
          </Section>
        );
      }

      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-deep-black flex overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} flex-shrink-0 bg-[#0a0a0e] border-r border-white/5 flex flex-col transition-all duration-300 min-h-screen`}>
        <div className="p-4 border-b border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-yellow-600/30 flex-shrink-0">
            <img src="/inera-logo.jpg" alt="InEra" className="w-full h-full object-cover" />
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <div className="text-white text-xs font-bold font-sora truncate">InEra Admin</div>
              <div className="text-white/30 text-[9px] uppercase tracking-wide">Control Panel</div>
            </div>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-electric-blue/20 text-electric-blue border border-electric-blue/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={16} className="flex-shrink-0" />
              {sidebarOpen && <span className="truncate font-medium">{tab.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5 space-y-1">
          <Link to="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors">
            <Globe size={16} className="flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">View Site</span>}
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/8 transition-colors">
            <LogOut size={16} className="flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0e] flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(o => !o)} className="text-white/40 hover:text-white transition-colors p-1">
              <LayoutDashboard size={16} />
            </button>
            <span className="text-white/30 text-xs">Admin</span>
            <span className="text-white/15 text-xs">/</span>
            <span className="text-white/60 text-xs font-medium">{tabs.find(t => t.id === activeTab)?.label}</span>
          </div>
          <div className="flex items-center gap-4">
            {isSupabaseConnected ? (
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                <span className="text-emerald-400/70 text-xs font-medium">Supabase</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5" title="Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env to enable cloud sync">
                <span className="w-2 h-2 rounded-full bg-yellow-500/60 inline-block" />
                <span className="text-yellow-500/50 text-xs">Local only</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
              <span className="text-white/40 text-xs">Live</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-deep-black">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h1 className="font-sora font-bold text-white text-2xl">{tabs.find(t => t.id === activeTab)?.label}</h1>
              <p className="text-white/40 text-sm mt-1">Changes are saved and reflect on the live site immediately</p>
            </div>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export default function AdminPage() {
  const { data, updateData, updateGallery, persistGallery, deleteGalleryItem, login, logout, isSupabaseConnected } = useAdmin();
  if (!data.isAdminLoggedIn) return <LoginScreen onLogin={login} />;
  return (
    <AdminDashboard
      data={data}
      updateData={updateData}
      updateGallery={updateGallery}
      persistGallery={persistGallery}
      deleteGalleryItem={deleteGalleryItem}
      logout={logout}
      isSupabaseConnected={isSupabaseConnected}
    />
  );
}
