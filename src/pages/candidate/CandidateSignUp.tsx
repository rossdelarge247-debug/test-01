import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Shield, FileText } from 'lucide-react';
import { useCandidateSession } from '../../context/CandidateSessionContext';

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function CandidateSignUp() {
  const navigate = useNavigate();
  const { setAuthProvider } = useCandidateSession();

  function handleLinkedIn() {
    setAuthProvider('linkedin');
    navigate('/candidate/linkedin-import');
  }

  function handleEmail() {
    setAuthProvider('email');
    navigate('/candidate/onboarding');
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-20">
      {/* Header */}
      <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">
        Candidate sign-up
      </p>
      <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-3">
        Start with what you already have
      </h1>
      <p className="text-lg text-gray-500 leading-relaxed mb-12">
        Import your profile basics from LinkedIn, then build the part that actually shows fit.
      </p>

      {/* LinkedIn option */}
      <div className="mb-3">
        <button
          onClick={handleLinkedIn}
          className="w-full flex items-center gap-4 px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group text-left"
        >
          <div className="w-10 h-10 bg-[#0A66C2] rounded-xl flex items-center justify-center text-white flex-shrink-0">
            <LinkedInIcon />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm">Continue with LinkedIn</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Import name, headline, summary, and recent roles
            </p>
          </div>
          <ArrowRight
            size={16}
            className="text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0"
          />
        </button>
      </div>

      {/* What gets imported */}
      <div className="mb-8 px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
          What we import
        </p>
        <ul className="space-y-1.5 text-xs text-gray-500">
          {['Your name and professional headline', 'Your about / summary text', 'Your three most recent roles'].map(
            (item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 flex-shrink-0" />
                {item}
              </li>
            )
          )}
        </ul>
        <p className="text-xs text-gray-400 mt-3 leading-relaxed">
          You can edit or remove anything before continuing. Nothing is locked in.
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">or</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* CV upload option */}
      <button
        onClick={() => navigate('/candidate/cv-upload')}
        className="w-full flex items-center gap-4 px-5 py-4 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-all group text-left"
      >
        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 flex-shrink-0">
          <FileText size={18} />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-700 text-sm">Upload my CV instead</p>
          <p className="text-xs text-gray-400 mt-0.5">PDF, Word, or plain text — we extract the basics</p>
        </div>
        <ArrowRight
          size={16}
          className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0"
        />
      </button>

      {/* Email option */}
      <button
        onClick={handleEmail}
        className="w-full flex items-center gap-4 px-5 py-4 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-all group text-left"
      >
        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 flex-shrink-0">
          <Mail size={18} />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-gray-700 text-sm">Continue with email</p>
          <p className="text-xs text-gray-400 mt-0.5">Fill in your basics manually</p>
        </div>
        <ArrowRight
          size={16}
          className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0"
        />
      </button>

      {/* Trust note */}
      <div className="mt-8 flex items-start gap-2.5 text-xs text-gray-400">
        <Shield size={13} className="mt-0.5 flex-shrink-0 text-gray-300" />
        <p className="leading-relaxed">
          We only use LinkedIn to prefill the basics. Your signal profile is built separately through
          short, role-relevant tasks — that's the part that actually matters.
        </p>
      </div>
    </div>
  );
}
