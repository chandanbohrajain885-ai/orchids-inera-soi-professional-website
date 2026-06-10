import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Search, CheckCircle, XCircle, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VerifyCertificatePage() {
  const { data } = useAdmin();
  const [certNo, setCertNo] = useState('');
  const [result, setResult] = useState(null); // null | 'found' | 'notfound'
  const [certificate, setCertificate] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    if (!certNo.trim()) {
      setResult(null);
      setCertificate(null);
      return;
    }
    const found = (data.certificates || []).find(
      c => c.certificateNumber?.toLowerCase() === certNo.trim().toLowerCase()
    );
    if (found) {
      setResult('found');
      setCertificate(found);
    } else {
      setResult('notfound');
      setCertificate(null);
    }
  };

  return (
    <div className="min-h-screen bg-deep-black grid-pattern">
      {/* Simple header bar */}
      <div className="border-b border-white/5 bg-[#0a0a0e]/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link to="/" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all flex-shrink-0">
            <ArrowLeft size={16} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-yellow-600/30 flex-shrink-0">
              <img src="/inera-logo.jpg" alt="InEra" className="w-full h-full object-cover" />
            </div>
            <span className="text-white/60 text-sm font-medium">Certificate Verification Portal</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 md:py-20">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-flex items-center gap-2 text-neon-cyan text-xs uppercase tracking-widest mb-3 md:mb-4">
            <Shield size={14} /> Verify
          </div>
          <h1 className="font-sora text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3">
            Certificate Verification
          </h1>
          <p className="text-white/45 text-xs md:text-base max-w-lg mx-auto px-2">
            Verify certificates issued by Inera Software.
          </p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-6 md:mb-10">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={certNo}
                onChange={e => { setCertNo(e.target.value); setSearched(false); }}
                placeholder="Enter Certificate Number"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-base placeholder-white/30 focus:outline-none focus:border-electric-blue/60 focus:ring-1 focus:ring-electric-blue/30 transition-all"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-4 bg-electric-blue hover:bg-blue-500 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-electric-blue/20"
            >
              <Search size={18} />
              Verify Certificate
            </button>
          </div>
        </form>

        {/* Result */}
        {searched && certNo.trim() && (
          <div className="max-w-xl mx-auto">
            {result === 'found' && certificate ? (
              <div className="bg-white/5 border border-green-500/30 rounded-2xl p-5 md:p-8 shadow-xl shadow-green-500/5">
                {/* Success header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                    <CheckCircle size={36} className="text-green-400" />
                  </div>
                  <h2 className="text-green-400 font-sora font-semibold text-lg">Certificate Verified Successfully</h2>
                </div>

                {/* Candidate name — prominent */}
                <div className="text-center mb-6 border-b border-white/10 pb-6">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Candidate Name</p>
                  <h3 className="font-sora text-2xl md:text-3xl font-bold text-white">
                    {certificate.candidateName}
                  </h3>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-white/40 text-sm">Certificate Number</span>
                    <span className="text-white font-medium text-sm font-mono">{certificate.certificateNumber}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-white/40 text-sm">Specialization</span>
                    <span className="text-white font-medium text-sm">{certificate.specialization}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/5">
                    <span className="text-white/40 text-sm">Date of Issue</span>
                    <span className="text-white font-medium text-sm">{certificate.dateOfIssue}</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-white/40 text-sm">Status</span>
                    <span className="inline-flex items-center gap-1.5 text-green-400 font-semibold text-sm bg-green-500/10 px-3 py-1 rounded-full">
                      <CheckCircle size={12} />
                      VALID CERTIFICATE
                    </span>
                  </div>
                </div>
              </div>
            ) : result === 'notfound' ? (
              <div className="bg-white/5 border border-red-500/30 rounded-2xl p-5 md:p-8 shadow-xl shadow-red-500/5 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4">
                  <XCircle size={36} className="text-red-400" />
                </div>
                <h2 className="text-red-400 font-sora font-semibold text-lg mb-2">Certificate Not Found</h2>
                <p className="text-white/50 text-sm max-w-md mx-auto">
                  The entered certificate number does not exist in our records.
                </p>
                <p className="text-white/40 text-xs mt-4">
                  Please contact Inera Software for assistance at{' '}
                  <a href="mailto:inerasoftware@gmail.com" className="text-electric-blue hover:underline">inerasoftware@gmail.com</a>
                </p>
              </div>
            ) : null}
          </div>
        )}

        {/* Hint when no search */}
        {!searched && (
          <p className="text-center text-white/20 text-xs mt-4">
            Enter a certificate number above and click "Verify Certificate" to check its authenticity.
          </p>
        )}
      </div>
    </div>
  );
}