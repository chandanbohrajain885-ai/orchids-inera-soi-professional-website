import { Link } from 'react-router-dom';
import { Brain, Code2, Globe, BarChart3, Users, GraduationCap, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'AI Development & Automation',
    tagline: 'Intelligent systems that think and act.',
    desc: 'We design and develop advanced AI systems, intelligent automation workflows, and AI-powered business solutions that reduce manual effort and drive smarter decision-making.',
    features: ['AI System Architecture', 'Workflow Automation', 'Machine Learning Models', 'AI-Powered Analytics', 'Intelligent Chatbots', 'Process Optimization'],
    color: 'blue',
    gradient: 'from-blue-600/20 to-cyan-600/20',
    border: 'border-blue-500/25',
  },
  {
    icon: Code2,
    title: 'Custom Software Development',
    tagline: 'Software built exactly for your needs.',
    desc: 'Enterprise-grade SaaS platforms, scalable applications, and cloud-native systems tailored to your specific business requirements and built for long-term growth.',
    features: ['Enterprise SaaS Platforms', 'Cloud-Native Applications', 'Microservices Architecture', 'API Development', 'System Integration', 'Performance Optimization'],
    color: 'purple',
    gradient: 'from-purple-600/20 to-blue-600/20',
    border: 'border-purple-500/25',
  },
  {
    icon: Globe,
    title: 'Web Development',
    tagline: 'Digital presence that commands attention.',
    desc: 'Responsive enterprise web platforms, sophisticated admin dashboards, and premium UI/UX systems that deliver outstanding user experiences across all devices.',
    features: ['Enterprise Web Platforms', 'Admin Dashboards', 'Progressive Web Apps', 'UI/UX Design', 'Performance Optimization', 'SEO & Accessibility'],
    color: 'cyan',
    gradient: 'from-cyan-600/20 to-teal-600/20',
    border: 'border-cyan-500/25',
  },
  {
    icon: BarChart3,
    title: 'Business Intelligence Solutions',
    tagline: 'Data-driven insights for smarter decisions.',
    desc: 'Comprehensive analytics dashboards, real-time reporting systems, KPI monitoring platforms, and operational intelligence solutions that transform raw data into actionable insights.',
    features: ['Analytics Dashboards', 'Real-Time Reporting', 'KPI Monitoring', 'Predictive Analytics', 'Data Visualization', 'Operational Intelligence'],
    color: 'green',
    gradient: 'from-green-600/20 to-cyan-600/20',
    border: 'border-green-500/25',
  },
  {
    icon: Users,
    title: 'HR Technology Solutions',
    tagline: 'Intelligent HR systems for modern organizations.',
    desc: 'Smart recruitment systems, employee analytics platforms, automated HR workflows, and comprehensive HR management solutions that streamline people operations.',
    features: ['Recruitment Automation', 'Employee Analytics', 'Onboarding Systems', 'HR Workflow Automation', 'Performance Management', 'Smart HR Portals'],
    color: 'orange',
    gradient: 'from-orange-600/20 to-yellow-600/20',
    border: 'border-orange-500/25',
  },
  {
    icon: GraduationCap,
    title: 'Educational Technology Systems',
    tagline: 'Future-ready platforms for modern education.',
    desc: 'Digital learning platforms, institutional management systems, student information platforms, and educational automation ecosystems that transform the learning experience.',
    features: ['LMS Development', 'Student Management', 'Digital Learning Platforms', 'Assessment Systems', 'Institutional Automation', 'EdTech Integration'],
    color: 'pink',
    gradient: 'from-pink-600/20 to-purple-600/20',
    border: 'border-pink-500/25',
  },
];

const colorMap = {
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/15', check: 'text-blue-400' },
  purple: { text: 'text-purple-400', bg: 'bg-purple-500/15', check: 'text-purple-400' },
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/15', check: 'text-cyan-400' },
  green: { text: 'text-green-400', bg: 'bg-green-500/15', check: 'text-green-400' },
  orange: { text: 'text-orange-400', bg: 'bg-orange-500/15', check: 'text-orange-400' },
  pink: { text: 'text-pink-400', bg: 'bg-pink-500/15', check: 'text-pink-400' },
};

export default function ServicesPage() {
  return (
    <div className="pt-20 overflow-hidden">
      {/* Hero */}
      <section className="relative py-20 px-4 md:px-8 grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-blue/10 to-deep-black" />
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-electric-blue/8 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-electric-blue/20">
            <Zap size={14} className="text-neon-cyan" />
            <span className="text-neon-cyan text-xs font-medium uppercase tracking-widest">What We Deliver</span>
          </div>
          <h1 className="font-sora text-4xl md:text-6xl font-bold text-white mb-6">
            Comprehensive<br /><span className="blue-gradient">Technology Services</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            From AI development to enterprise software, we deliver end-to-end technology solutions that drive real business transformation.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((svc, i) => {
            const c = colorMap[svc.color];
            return (
              <div key={i} className={`glass rounded-2xl p-7 border ${svc.border} card-hover group bg-gradient-to-br ${svc.gradient}`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <svc.icon size={22} className={c.text} />
                  </div>
                  <div>
                    <h3 className="font-sora font-bold text-white text-xl mb-1">{svc.title}</h3>
                    <p className={`text-xs font-medium ${c.text} italic`}>{svc.tagline}</p>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-5">{svc.desc}</p>
                <div className="grid grid-cols-2 gap-2">
                  {svc.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle2 size={12} className={c.check} />
                      <span className="text-white/60 text-xs">{f}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact" className={`mt-5 inline-flex items-center gap-1 text-xs font-semibold ${c.text} hover:opacity-80 transition-opacity`}>
                  Inquire About This Service <ArrowRight size={12} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-gradient-to-b from-navy-blue/10 to-deep-black border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-sora text-3xl md:text-4xl font-bold text-white mb-4">Our Delivery Process</h2>
            <p className="text-white/50 text-sm">How we turn your vision into reality</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: '01', title: 'Discovery & Strategy', desc: 'Deep dive into your business goals, challenges, and technology requirements.' },
              { step: '02', title: 'Architecture & Design', desc: 'System design, UI/UX prototyping, and technical architecture planning.' },
              { step: '03', title: 'Development & Testing', desc: 'Agile development with continuous testing, QA, and iteration.' },
              { step: '04', title: 'Deploy & Scale', desc: 'Production deployment with ongoing support, monitoring, and optimization.' },
            ].map((step, i) => (
              <div key={i} className="glass rounded-2xl p-6 border border-white/5 card-hover relative overflow-hidden">
                <div className="absolute top-4 right-4 font-sora font-bold text-4xl text-white/5">{step.step}</div>
                <div className="w-8 h-8 rounded-lg bg-electric-blue flex items-center justify-center mb-4">
                  <span className="text-white text-xs font-bold">{step.step}</span>
                </div>
                <h3 className="font-sora font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding max-w-7xl mx-auto text-center">
        <div className="glass-dark rounded-3xl p-10 border border-electric-blue/20">
          <h2 className="font-sora text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/60 text-sm max-w-md mx-auto mb-8">
            Let's discuss your requirements and build intelligent technology solutions together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2 justify-center">
              Book a Free Consultation <ArrowRight size={16} />
            </Link>
            <Link to="/soi" className="btn-gold inline-flex items-center gap-2 justify-center">
              Join SOI Program
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
