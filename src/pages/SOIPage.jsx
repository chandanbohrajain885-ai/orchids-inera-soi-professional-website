import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { sendToEmail, buildSOIStudentBody, buildSOICollegeBody, SOI_EMAIL } from '../utils/sendEmail';
import {
  GraduationCap, Target, Zap, Brain, Users2, Award, CheckCircle2,
  ArrowRight, Building2, User, Upload,
  Rocket, Lightbulb, Star
} from 'lucide-react';

const whySOI = [
  { icon: Rocket, title: 'Execution-Focused Learning', desc: 'Students learn through practical implementation, not just theory.', color: 'blue' },
  { icon: Brain, title: 'AI-First Environment', desc: 'Exposure to AI systems, automation tools, and intelligent workflows.', color: 'purple' },
  { icon: Building2, title: 'Professional Exposure', desc: 'Understand real execution systems, modern workflows, and digital collaboration.', color: 'cyan' },
  { icon: Lightbulb, title: 'Innovation Ecosystem', desc: 'Encourages creativity, experimentation, and problem-solving.', color: 'green' },
  { icon: Users2, title: 'Practical Activities', desc: 'Students participate in real workflow systems and execution tasks.', color: 'orange' },
  { icon: Star, title: 'Future-Ready Environment', desc: 'Built around modern industry ecosystems and AI-first tools.', color: 'pink' },
];

const colorMap = {
  blue: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  purple: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
  green: 'bg-green-500/15 text-green-400 border-green-500/20',
  orange: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
  pink: 'bg-pink-500/15 text-pink-400 border-pink-500/20',
};

const programSteps = [
  { step: 1, title: 'Orientation', desc: 'Understanding AI-first environments, workflow systems, and execution ecosystems.' },
  { step: 2, title: 'Technology Exposure', desc: 'Students explore AI tools, automation systems, digital platforms, and workflow technologies.' },
  { step: 3, title: 'Practical Activities', desc: 'Students participate in projects, execution tasks, and collaborative workflows.' },
  { step: 4, title: 'Real Implementation', desc: 'Students work on automation activities, AI-based workflows, and execution systems.' },
  { step: 5, title: 'Certification & Growth', desc: 'Students receive internship certificate, professional exposure, and recommendation opportunities.' },
];

const studentBenefits = [
  'Practical exposure to real technology systems',
  'AI understanding and automation skills',
  'Execution-focused learning approach',
  'Teamwork and collaboration experience',
  'Digital confidence and industry readiness',
  'Professional networking opportunities',
  'Internship certification on completion',
  'Recommendation letter opportunities',
];

const institutionBenefits = [
  'Structured internship ecosystem for students',
  'AI & technology awareness programs',
  'Practical exposure beyond classroom',
  'Professional industry interaction',
  'Measurable student development',
  'Industry-academia collaboration framework',
];

export default function SOIPage() {
  const { data } = useAdmin();
  const [activeTab, setActiveTab] = useState('student');
  const [studentForm, setStudentForm] = useState({
    fullName: '', dob: '', gender: '', mobile: '', whatsapp: '', email: '',
    college: '', department: '', semester: '', rollNumber: '', skills: '',
    track: '', duration: '', timing: '',
    ndaAccepted: false, agreementAccepted: false, privacyAccepted: false,
  });
  const [collegeForm, setCollegeForm] = useState({
    collegeName: '', institutionType: '', university: '', aicte: '', naac: '', website: '',
    address: '', city: '', state: '', pin: '', officialEmail: '', landline: '',
    principalName: '', principalDesignation: '', principalMobile: '', principalEmail: '',
    placementName: '', placementDesignation: '', placementWhatsapp: '', placementEmail: '',
    numStudents: '', departments: '', duration: '', startDate: '', requirements: '',
    authorized: false,
  });
  const [submitted, setSubmitted] = useState({ student: false, college: false });
  const [errors, setErrors] = useState({});

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!studentForm.fullName) errs.fullName = 'Required';
    if (!studentForm.email) errs.email = 'Required';
    if (!studentForm.mobile) errs.mobile = 'Required';
    if (!studentForm.college) errs.college = 'Required';
    if (!studentForm.ndaAccepted) errs.nda = 'Please accept NDA';
    if (!studentForm.agreementAccepted) errs.agreement = 'Please accept the internship agreement';
    if (!studentForm.privacyAccepted) errs.privacy = 'Please accept the privacy policy';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    sendToEmail(
      SOI_EMAIL,
      `SOI Student Registration — ${studentForm.fullName} (${studentForm.college})`,
      buildSOIStudentBody(studentForm)
    );
    setSubmitted(p => ({ ...p, student: true }));
  };

  const handleCollegeSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!collegeForm.collegeName) errs.collegeName = 'Required';
    if (!collegeForm.officialEmail) errs.officialEmail = 'Required';
    if (!collegeForm.principalName) errs.principalName = 'Required';
    if (!collegeForm.authorized) errs.authorized = 'Please confirm authorization';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    sendToEmail(
      SOI_EMAIL,
      `SOI Institutional Registration — ${collegeForm.collegeName}`,
      buildSOICollegeBody(collegeForm)
    );
    setSubmitted(p => ({ ...p, college: true }));
  };

  const inputClass = (err) => `w-full bg-white/5 border ${err ? 'border-red-500/60' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-electric-blue/60 focus:bg-white/8 transition-all`;
  const labelClass = 'block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wide';
  const selectClass = (err) => `w-full bg-[#0d1117] border ${err ? 'border-red-500/60' : 'border-white/10'} rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-electric-blue/60 transition-all appearance-none`;

  return (
    <div className="pt-20 overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 px-4 md:px-8 grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-blue/15 to-deep-black" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-yellow-600/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-28 h-28 rounded-2xl overflow-hidden ring-2 ring-yellow-600/40 shadow-xl shadow-yellow-900/20 animate-float">
              <img src="/soi-logo.jpg" alt="SOI" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 border border-yellow-600/20">
            <span className="text-yellow-400 text-xs font-medium uppercase tracking-widest">A Program of INERA Software Pvt. Ltd.</span>
          </div>
          <h1 className="font-sora text-4xl md:text-6xl font-bold text-white mb-3">SOI — School of Internships</h1>
          <p className="text-yellow-400 text-xl md:text-2xl font-sora font-semibold mb-4">"Learn. Build. Deploy."</p>
          <p className="text-white/50 text-sm italic mb-8">"Driven by Ambition, Defined by Execution"</p>
          <h2 className="font-sora text-2xl md:text-3xl font-bold text-white mb-4">Build Real Skills Through Real Execution</h2>
          <p className="text-white/60 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            SOI helps ambitious students move beyond theory and step into the future of AI, automation, and intelligent digital systems through execution-focused internship experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => { setActiveTab('student'); document.getElementById('register').scrollIntoView({ behavior: 'smooth' }); }} className="btn-gold inline-flex items-center gap-2 justify-center">
              <User size={16} /> Register as Student
            </button>
            <button onClick={() => { setActiveTab('college'); document.getElementById('register').scrollIntoView({ behavior: 'smooth' }); }} className="btn-secondary inline-flex items-center gap-2 justify-center">
              <Building2 size={16} /> Register Your College
            </button>
            <a href="mailto:ineraschoolofinternships@gmail.com" className="btn-primary inline-flex items-center gap-2 justify-center">
              Contact SOI Team
            </a>
          </div>
        </div>
      </section>

      {/* What is SOI */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-yellow-400/80 text-xs uppercase tracking-widest mb-4">
              <div className="w-8 h-px bg-yellow-600" /> About SOI
            </div>
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-6">What is SOI?</h2>
            <div className="space-y-4 text-white/60 text-sm leading-relaxed">
              <p>SOI (School of Internships) is the professional internship ecosystem powered by INERA SOFTWARE PRIVATE LIMITED.</p>
              <p>SOI bridges the gap between academic learning and real industry execution through practical exposure, modern technology environments, and execution-focused learning.</p>
              <p className="font-semibold text-white/80">SOI is not a traditional classroom-style internship. It is a Learn + Work ecosystem where students:</p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {['Learn modern technologies', 'Work on practical systems', 'Understand AI-first environments', 'Gain professional exposure', 'Improve collaboration & communication', 'Develop future-ready skills'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-yellow-400 flex-shrink-0" />
                  <span className="text-white/60 text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="glass-dark rounded-2xl p-6 border border-yellow-600/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-600/20 flex items-center justify-center">
                  <GraduationCap size={18} className="text-yellow-400" />
                </div>
                <div>
                  <div className="font-sora font-semibold text-white">Internship Mode</div>
                  <div className="text-yellow-400 text-sm font-bold">{data.soi.mode}</div>
                </div>
              </div>
            </div>
            <div className="glass-dark rounded-2xl p-6 border border-electric-blue/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-electric-blue/20 flex items-center justify-center">
                  <Users2 size={18} className="text-electric-blue" />
                </div>
                <div>
                  <div className="font-sora font-semibold text-white">Institutional Fee</div>
                  <div className="text-electric-blue text-sm font-bold">{data.soi.feePerStudent} per student</div>
                </div>
              </div>
            </div>
            <div className="glass-dark rounded-2xl p-6 border border-neon-cyan/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-neon-cyan/20 flex items-center justify-center">
                  <Target size={18} className="text-neon-cyan" />
                </div>
                <div>
                  <div className="font-sora font-semibold text-white">Minimum Requirement</div>
                  <div className="text-neon-cyan text-sm font-bold">Minimum {data.soi.minStudents} students per institution</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why SOI */}
      <section className="section-padding bg-gradient-to-b from-navy-blue/10 to-deep-black border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4">Why SOI?</h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">Six pillars that make SOI a transformative experience.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whySOI.map(({ icon: Icon, title, desc, color }, i) => (
              <div key={i} className={`glass rounded-2xl p-6 border card-hover group ${colorMap[color]}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${colorMap[color]}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-sora font-semibold text-white text-lg mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Structure */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4">Program Structure</h2>
          <p className="text-white/50 text-sm">5 stages from orientation to certification</p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-8 bottom-8 w-px bg-gradient-to-b from-electric-blue/50 via-neon-cyan/50 to-electric-blue/10" />
          <div className="space-y-6">
            {programSteps.map((step, i) => (
              <div key={i} className={`flex items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="flex-1 md:flex-[0.45]">
                  <div className={`glass rounded-2xl p-6 border border-white/8 card-hover ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="text-neon-cyan font-sora font-bold text-sm mb-1">Step {step.step}</div>
                    <h3 className="font-sora font-semibold text-white text-lg mb-2">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full bg-electric-blue/20 border-2 border-electric-blue items-center justify-center z-10">
                  <span className="font-sora font-bold text-electric-blue">{step.step}</span>
                </div>
                <div className="hidden md:block flex-[0.45]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Students / For Colleges */}
      <section className="section-padding bg-gradient-to-b from-navy-blue/10 to-deep-black border-y border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Students */}
          <div className="glass rounded-2xl p-8 border border-yellow-600/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-yellow-600/20 flex items-center justify-center">
                <User size={22} className="text-yellow-400" />
              </div>
              <h3 className="font-sora text-2xl font-bold text-white">For Students</h3>
            </div>
            <div className="space-y-3">
              {studentBenefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={14} className="text-yellow-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{b}</span>
                </div>
              ))}
            </div>
            <button onClick={() => { setActiveTab('student'); document.getElementById('register').scrollIntoView({ behavior: 'smooth' }); }} className="mt-6 btn-gold inline-flex items-center gap-2">
              Register Now <ArrowRight size={16} />
            </button>
          </div>

          {/* Colleges */}
          <div className="glass rounded-2xl p-8 border border-electric-blue/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-electric-blue/20 flex items-center justify-center">
                <Building2 size={22} className="text-electric-blue" />
              </div>
              <h3 className="font-sora text-2xl font-bold text-white">For Institutions & Colleges</h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              SOI collaborates with educational institutions to provide students with practical industry exposure, execution-focused learning environments, and technology-oriented experiences.
            </p>
            <div className="space-y-3">
              {institutionBenefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={14} className="text-electric-blue flex-shrink-0" />
                  <span className="text-white/70 text-sm">{b}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-electric-blue/10 rounded-xl border border-electric-blue/20">
              <div className="text-xs text-white/50 uppercase tracking-wide mb-1">Important</div>
              <div className="text-sm text-white/80">Fee: <span className="text-electric-blue font-bold">{data.soi.feePerStudent}/student</span> · Min: <span className="text-electric-blue font-bold">{data.soi.minStudents} students</span> · Mode: <span className="text-electric-blue font-bold">{data.soi.mode}</span></div>
            </div>
            <button onClick={() => { setActiveTab('college'); document.getElementById('register').scrollIntoView({ behavior: 'smooth' }); }} className="mt-6 btn-primary inline-flex items-center gap-2">
              Register Your College <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Registration Forms */}
      <section id="register" className="section-padding max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4">Register for SOI</h2>
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => setActiveTab('student')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'student' ? 'bg-yellow-600 text-black' : 'glass border border-white/10 text-white/60 hover:text-white'
              }`}
            >
              <User size={15} /> Student Registration
            </button>
            <button
              onClick={() => setActiveTab('college')}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'college' ? 'bg-electric-blue text-white' : 'glass border border-white/10 text-white/60 hover:text-white'
              }`}
            >
              <Building2 size={15} /> Institutional Registration
            </button>
          </div>
        </div>

        {/* Student Form */}
        {activeTab === 'student' && (
          submitted.student ? (
            <div className="glass-dark rounded-3xl p-12 border border-yellow-600/30 text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-600/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-yellow-400" />
              </div>
              <h3 className="font-sora text-2xl font-bold text-white mb-3">Registration Submitted!</h3>
              <p className="text-white/60 text-sm max-w-md mx-auto">Your email client has been opened to deliver your registration to <span className="text-yellow-400">{SOI_EMAIL}</span>. The SOI team will review and contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleStudentSubmit} className="glass rounded-3xl p-8 border border-yellow-600/20">
              <h3 className="font-sora text-xl font-bold text-white mb-6 flex items-center gap-2">
                <User size={20} className="text-yellow-400" /> Student Registration
              </h3>

              {/* Personal Details */}
              <div className="mb-6">
                <div className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-white/5">Personal Details</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Full Name *</label><input className={inputClass(errors.fullName)} value={studentForm.fullName} onChange={e => setStudentForm(p => ({ ...p, fullName: e.target.value }))} placeholder="Your Full Name" />{errors.fullName && <span className="text-red-400 text-xs mt-1 block">{errors.fullName}</span>}</div>
                  <div><label className={labelClass}>Date of Birth</label><input type="date" className={inputClass()} value={studentForm.dob} onChange={e => setStudentForm(p => ({ ...p, dob: e.target.value }))} /></div>
                  <div><label className={labelClass}>Gender</label>
                    <select className={selectClass()} value={studentForm.gender} onChange={e => setStudentForm(p => ({ ...p, gender: e.target.value }))}>
                      <option value="">Select Gender</option>
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>Mobile Number *</label><input className={inputClass(errors.mobile)} value={studentForm.mobile} onChange={e => setStudentForm(p => ({ ...p, mobile: e.target.value }))} placeholder="+91 XXXXX XXXXX" />{errors.mobile && <span className="text-red-400 text-xs mt-1 block">{errors.mobile}</span>}</div>
                  <div><label className={labelClass}>WhatsApp Number</label><input className={inputClass()} value={studentForm.whatsapp} onChange={e => setStudentForm(p => ({ ...p, whatsapp: e.target.value }))} placeholder="+91 XXXXX XXXXX" /></div>
                  <div><label className={labelClass}>Email Address *</label><input type="email" className={inputClass(errors.email)} value={studentForm.email} onChange={e => setStudentForm(p => ({ ...p, email: e.target.value }))} placeholder="student@email.com" />{errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email}</span>}</div>
                </div>
              </div>

              {/* Academic Details */}
              <div className="mb-6">
                <div className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-white/5">Academic Details</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>College Name *</label><input className={inputClass(errors.college)} value={studentForm.college} onChange={e => setStudentForm(p => ({ ...p, college: e.target.value }))} placeholder="Your College/University" />{errors.college && <span className="text-red-400 text-xs mt-1 block">{errors.college}</span>}</div>
                  <div><label className={labelClass}>Department</label><input className={inputClass()} value={studentForm.department} onChange={e => setStudentForm(p => ({ ...p, department: e.target.value }))} placeholder="CSE, IT, ECE, etc." /></div>
                  <div><label className={labelClass}>Semester</label>
                    <select className={selectClass()} value={studentForm.semester} onChange={e => setStudentForm(p => ({ ...p, semester: e.target.value }))}>
                      <option value="">Select Semester</option>
                      {[1,2,3,4,5,6,7,8].map(s => <option key={s}>{s}th Semester</option>)}
                    </select>
                  </div>
                  <div><label className={labelClass}>Roll Number</label><input className={inputClass()} value={studentForm.rollNumber} onChange={e => setStudentForm(p => ({ ...p, rollNumber: e.target.value }))} placeholder="Your Roll Number" /></div>
                  <div className="sm:col-span-2"><label className={labelClass}>Skills</label><input className={inputClass()} value={studentForm.skills} onChange={e => setStudentForm(p => ({ ...p, skills: e.target.value }))} placeholder="Python, Web Dev, AI/ML, etc." /></div>
                </div>
              </div>

              {/* Internship Details */}
              <div className="mb-6">
                <div className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-white/5">Internship Details</div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div><label className={labelClass}>Preferred Track</label>
                    <select className={selectClass()} value={studentForm.track} onChange={e => setStudentForm(p => ({ ...p, track: e.target.value }))}>
                      <option value="">Select Track</option>
                      <option>AI & Automation</option><option>Web Development</option><option>Software Engineering</option><option>Business Intelligence</option><option>HR Technology</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>Duration</label>
                    <select className={selectClass()} value={studentForm.duration} onChange={e => setStudentForm(p => ({ ...p, duration: e.target.value }))}>
                      <option value="">Select Duration</option>
                      <option>1 Month</option><option>2 Months</option><option>3 Months</option><option>6 Months</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>Preferred Timing</label>
                    <select className={selectClass()} value={studentForm.timing} onChange={e => setStudentForm(p => ({ ...p, timing: e.target.value }))}>
                      <option value="">Select Timing</option>
                      <option>Morning</option><option>Afternoon</option><option>Evening</option><option>Flexible</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Uploads */}
              <div className="mb-6">
                <div className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-white/5">Uploads</div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {['Resume (PDF)', 'College ID', 'Passport Photo'].map(label => (
                    <div key={label}>
                      <label className={labelClass}>{label}</label>
                      <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-white/15 rounded-lg cursor-pointer hover:border-yellow-600/40 transition-colors group">
                        <Upload size={18} className="text-white/30 group-hover:text-yellow-400 mb-1 transition-colors" />
                        <span className="text-white/30 text-xs group-hover:text-white/60 transition-colors">Click to upload</span>
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agreements */}
              <div className="mb-6 space-y-3">
                <div className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-3 pb-2 border-b border-white/5">Agreements</div>
                {[
                  { key: 'ndaAccepted', label: 'I accept the Non-Disclosure Agreement (NDA)', errKey: 'nda' },
                  { key: 'agreementAccepted', label: 'I accept the Internship Agreement terms and conditions', errKey: 'agreement' },
                  { key: 'privacyAccepted', label: 'I accept the Privacy Policy', errKey: 'privacy' },
                ].map(({ key, label, errKey }) => (
                  <label key={key} className="flex items-start gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${studentForm[key] ? 'bg-yellow-600 border-yellow-600' : 'border-white/20 group-hover:border-yellow-600/50'}`}
                      onClick={() => setStudentForm(p => ({ ...p, [key]: !p[key] }))}>
                      {studentForm[key] && <CheckCircle2 size={12} className="text-black" />}
                    </div>
                    <span className="text-white/60 text-xs leading-relaxed">{label}</span>
                    {errors[errKey] && <span className="text-red-400 text-xs">{errors[errKey]}</span>}
                  </label>
                ))}
              </div>

              <button type="submit" className="w-full btn-gold py-4 font-sora font-bold text-base flex items-center justify-center gap-2">
                Register as Student <ArrowRight size={18} />
              </button>
            </form>
          )
        )}

        {/* College Form */}
        {activeTab === 'college' && (
          submitted.college ? (
            <div className="glass-dark rounded-3xl p-12 border border-electric-blue/30 text-center">
              <div className="w-16 h-16 rounded-full bg-electric-blue/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-electric-blue" />
              </div>
              <h3 className="font-sora text-2xl font-bold text-white mb-3">Registration Submitted!</h3>
              <p className="text-white/60 text-sm max-w-md mx-auto">Your email client has been opened to deliver your institutional registration to <span className="text-electric-blue">{SOI_EMAIL}</span>. The SOI team will review and contact your institution officially.</p>
            </div>
          ) : (
            <form onSubmit={handleCollegeSubmit} className="glass rounded-3xl p-8 border border-electric-blue/20">
              <h3 className="font-sora text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Building2 size={20} className="text-electric-blue" /> Institutional Registration
              </h3>

              {/* Institution Info */}
              <div className="mb-6">
                <div className="text-electric-blue text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-white/5">Institution Information</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>College Name *</label><input className={inputClass(errors.collegeName)} value={collegeForm.collegeName} onChange={e => setCollegeForm(p => ({ ...p, collegeName: e.target.value }))} placeholder="Institution Name" />{errors.collegeName && <span className="text-red-400 text-xs mt-1 block">{errors.collegeName}</span>}</div>
                  <div><label className={labelClass}>Institution Type</label>
                    <select className={selectClass()} value={collegeForm.institutionType} onChange={e => setCollegeForm(p => ({ ...p, institutionType: e.target.value }))}>
                      <option value="">Select Type</option>
                      <option>Engineering College</option><option>Arts & Science College</option><option>Management Institute</option><option>Polytechnic</option><option>University</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>Affiliated University</label><input className={inputClass()} value={collegeForm.university} onChange={e => setCollegeForm(p => ({ ...p, university: e.target.value }))} placeholder="Affiliated University" /></div>
                  <div><label className={labelClass}>AICTE Approval No.</label><input className={inputClass()} value={collegeForm.aicte} onChange={e => setCollegeForm(p => ({ ...p, aicte: e.target.value }))} placeholder="AICTE Number" /></div>
                  <div><label className={labelClass}>NAAC Grade</label>
                    <select className={selectClass()} value={collegeForm.naac} onChange={e => setCollegeForm(p => ({ ...p, naac: e.target.value }))}>
                      <option value="">Select Grade</option>
                      <option>A++</option><option>A+</option><option>A</option><option>B++</option><option>B+</option><option>B</option><option>C</option><option>Not Graded</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>Official Website</label><input className={inputClass()} value={collegeForm.website} onChange={e => setCollegeForm(p => ({ ...p, website: e.target.value }))} placeholder="https://college.edu.in" /></div>
                  <div className="sm:col-span-2"><label className={labelClass}>Address</label><input className={inputClass()} value={collegeForm.address} onChange={e => setCollegeForm(p => ({ ...p, address: e.target.value }))} placeholder="Full Address" /></div>
                  <div><label className={labelClass}>City</label><input className={inputClass()} value={collegeForm.city} onChange={e => setCollegeForm(p => ({ ...p, city: e.target.value }))} placeholder="City" /></div>
                  <div><label className={labelClass}>State</label><input className={inputClass()} value={collegeForm.state} onChange={e => setCollegeForm(p => ({ ...p, state: e.target.value }))} placeholder="State" /></div>
                  <div><label className={labelClass}>PIN Code</label><input className={inputClass()} value={collegeForm.pin} onChange={e => setCollegeForm(p => ({ ...p, pin: e.target.value }))} placeholder="PIN Code" /></div>
                  <div><label className={labelClass}>Official Email *</label><input type="email" className={inputClass(errors.officialEmail)} value={collegeForm.officialEmail} onChange={e => setCollegeForm(p => ({ ...p, officialEmail: e.target.value }))} placeholder="college@edu.in" />{errors.officialEmail && <span className="text-red-400 text-xs mt-1 block">{errors.officialEmail}</span>}</div>
                  <div><label className={labelClass}>Landline Number</label><input className={inputClass()} value={collegeForm.landline} onChange={e => setCollegeForm(p => ({ ...p, landline: e.target.value }))} placeholder="STD-XXXXXXXX" /></div>
                </div>
              </div>

              {/* Principal Details */}
              <div className="mb-6">
                <div className="text-electric-blue text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-white/5">Principal Details</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Full Name *</label><input className={inputClass(errors.principalName)} value={collegeForm.principalName} onChange={e => setCollegeForm(p => ({ ...p, principalName: e.target.value }))} placeholder="Principal Full Name" />{errors.principalName && <span className="text-red-400 text-xs mt-1 block">{errors.principalName}</span>}</div>
                  <div><label className={labelClass}>Designation</label><input className={inputClass()} value={collegeForm.principalDesignation} onChange={e => setCollegeForm(p => ({ ...p, principalDesignation: e.target.value }))} placeholder="Principal / Director" /></div>
                  <div><label className={labelClass}>Mobile Number</label><input className={inputClass()} value={collegeForm.principalMobile} onChange={e => setCollegeForm(p => ({ ...p, principalMobile: e.target.value }))} placeholder="+91 XXXXX XXXXX" /></div>
                  <div><label className={labelClass}>Official Email</label><input type="email" className={inputClass()} value={collegeForm.principalEmail} onChange={e => setCollegeForm(p => ({ ...p, principalEmail: e.target.value }))} placeholder="principal@college.edu" /></div>
                </div>
              </div>

              {/* Placement Officer */}
              <div className="mb-6">
                <div className="text-electric-blue text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-white/5">Placement Officer Details</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Full Name</label><input className={inputClass()} value={collegeForm.placementName} onChange={e => setCollegeForm(p => ({ ...p, placementName: e.target.value }))} placeholder="Placement Officer Name" /></div>
                  <div><label className={labelClass}>Designation</label><input className={inputClass()} value={collegeForm.placementDesignation} onChange={e => setCollegeForm(p => ({ ...p, placementDesignation: e.target.value }))} placeholder="Placement Coordinator" /></div>
                  <div><label className={labelClass}>WhatsApp Number</label><input className={inputClass()} value={collegeForm.placementWhatsapp} onChange={e => setCollegeForm(p => ({ ...p, placementWhatsapp: e.target.value }))} placeholder="+91 XXXXX XXXXX" /></div>
                  <div><label className={labelClass}>Email Address</label><input type="email" className={inputClass()} value={collegeForm.placementEmail} onChange={e => setCollegeForm(p => ({ ...p, placementEmail: e.target.value }))} placeholder="placement@college.edu" /></div>
                </div>
              </div>

              {/* Internship Requirements */}
              <div className="mb-6">
                <div className="text-electric-blue text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b border-white/5">Internship Requirements</div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className={labelClass}>Number of Students</label><input type="number" min="100" className={inputClass()} value={collegeForm.numStudents} onChange={e => setCollegeForm(p => ({ ...p, numStudents: e.target.value }))} placeholder="Min. 100" /></div>
                  <div><label className={labelClass}>Departments</label><input className={inputClass()} value={collegeForm.departments} onChange={e => setCollegeForm(p => ({ ...p, departments: e.target.value }))} placeholder="CSE, IT, ECE, etc." /></div>
                  <div><label className={labelClass}>Preferred Duration</label>
                    <select className={selectClass()} value={collegeForm.duration} onChange={e => setCollegeForm(p => ({ ...p, duration: e.target.value }))}>
                      <option value="">Select Duration</option>
                      <option>1 Month</option><option>2 Months</option><option>3 Months</option><option>6 Months</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>Preferred Start Date</label><input type="date" className={inputClass()} value={collegeForm.startDate} onChange={e => setCollegeForm(p => ({ ...p, startDate: e.target.value }))} /></div>
                  <div className="sm:col-span-2"><label className={labelClass}>Special Requirements</label><textarea rows={3} className={inputClass()} value={collegeForm.requirements} onChange={e => setCollegeForm(p => ({ ...p, requirements: e.target.value }))} placeholder="Any specific requirements or notes..." /></div>
                </div>
              </div>

              {/* Confirmation */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${collegeForm.authorized ? 'bg-electric-blue border-electric-blue' : 'border-white/20 group-hover:border-electric-blue/50'}`}
                    onClick={() => setCollegeForm(p => ({ ...p, authorized: !p.authorized }))}>
                    {collegeForm.authorized && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                  <span className="text-white/60 text-sm leading-relaxed">"I confirm that all information provided is officially authorized and accurate."</span>
                </label>
                {errors.authorized && <span className="text-red-400 text-xs mt-1 block ml-8">{errors.authorized}</span>}
              </div>

              <button type="submit" className="w-full btn-primary py-4 font-sora font-bold text-base flex items-center justify-center gap-2">
                Submit Institutional Registration <ArrowRight size={18} />
              </button>
            </form>
          )
        )}
      </section>
    </div>
  );
}
