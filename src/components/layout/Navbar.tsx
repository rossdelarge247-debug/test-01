import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const TAGLINES = [
  'Less CV. More you.',
  'Skip the CV foreplay.',
  'Chemistry, not keywords.',
];

const tagline = TAGLINES[Math.floor(Math.random() * TAGLINES.length)];

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      {/* Eye outline */}
      <path
        d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Iris — filled for readability at small sizes */}
      <circle cx="12" cy="12" r="3" fill="white" />
      {/* Lash — single elegant cat-eye sweep */}
      <path
        d="M7 8 Q11 4.5 17 7"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Navbar() {
  const location = useLocation();
  const isCandidatePath = location.pathname.startsWith('/candidate');
  const isEmployerPath = location.pathname.startsWith('/employer');

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
            <EyeIcon />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-semibold text-lg tracking-tight">
              <span className="text-gray-900">Be seen</span>
              <span className="text-gray-300 font-light mx-1.5">/</span>
              <span className="text-indigo-600">Get found</span>
            </span>
            <span className="text-[10px] text-gray-400 tracking-wide mt-0.5">{tagline}</span>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/how-it-works"
            className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
          >
            How it works
          </Link>
          <Link
            to="/candidate/dashboard"
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              isCandidatePath
                ? 'text-indigo-700 bg-indigo-50'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Candidate
          </Link>
          <Link
            to="/employer/dashboard"
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              isEmployerPath
                ? 'text-indigo-700 bg-indigo-50'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Employer
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
