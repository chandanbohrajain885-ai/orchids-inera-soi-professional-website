import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-deep-black grid-pattern">
      <div className="border-b border-white/5 bg-[#0a0a0e]/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all flex-shrink-0">
            <ArrowLeft size={16} />
          </Link>
          <span className="text-white/60 text-sm font-medium">Privacy Policy</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-neon-cyan text-xs uppercase tracking-widest mb-4">
            <Shield size={14} /> Legal
          </div>
          <h1 className="font-sora text-3xl md:text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-white/45 text-sm">Last updated: June 2026</p>
        </div>

        <div className="space-y-8 text-white/60 text-sm leading-relaxed">
          <section>
            <h2 className="font-sora font-semibold text-white text-lg mb-3">1. Information We Collect</h2>
            <p>
              INERA SOFTWARE PRIVATE LIMITED collects information you provide directly, such as your name, email address,
              phone number, and any other details submitted through our contact forms, consultation bookings,
              or SOI registration forms. We also collect basic usage data including page visits and browser information.
            </p>
          </section>

          <section>
            <h2 className="font-sora font-semibold text-white text-lg mb-3">2. How We Use Your Information</h2>
            <p>
              We use the collected information to respond to your inquiries, process SOI registrations,
              improve our services, send relevant updates about our programs, and comply with legal obligations.
              Your data is never sold to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-sora font-semibold text-white text-lg mb-3">3. Data Storage & Security</h2>
            <p>
              Your data is stored securely and accessed only by authorized personnel. We implement industry-standard
              security measures to protect your personal information from unauthorized access, alteration, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="font-sora font-semibold text-white text-lg mb-3">4. Third-Party Services</h2>
            <p>
              We may use third-party services for analytics, email communication, and hosting. These service providers
              are bound by data protection agreements and do not use your data for any purpose other than the services
              they provide to us.
            </p>
          </section>

          <section>
            <h2 className="font-sora font-semibold text-white text-lg mb-3">5. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal data held by us. To exercise these rights,
              please contact us at <a href="mailto:inerasoftware@gmail.com" className="text-electric-blue hover:underline">inerasoftware@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="font-sora font-semibold text-white text-lg mb-3">6. Contact</h2>
            <p>
              For any questions regarding this privacy policy, reach out to us at{' '}
              <a href="mailto:inerasoftware@gmail.com" className="text-electric-blue hover:underline">inerasoftware@gmail.com</a>{' '}
              or visit our <Link to="/contact" className="text-electric-blue hover:underline">Contact page</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}