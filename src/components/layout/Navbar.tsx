import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const TAGLINES = [
  'Less CV. More you.',
  'Skip the CV foreplay.',
  'Chemistry, not keywords.',
];

const tagline = TAGLINES[Math.floor(Math.random() * TAGLINES.length)];

function BrandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
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
            <BrandIcon />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-semibold text-lg tracking-tight text-gray-900">
              Fit.
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
