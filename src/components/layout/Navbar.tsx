import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const location = useLocation();
  const isCandidatePath = location.pathname === '/candidate' || location.pathname.startsWith('/candidate/');
  const isEmployerPath = location.pathname === '/employer' || location.pathname.startsWith('/employer/');

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-semibold text-lg tracking-tight text-gray-900">
            Fit.
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/about"
            className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
          >
            About
          </Link>
          <Link
            to="/candidate"
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              isCandidatePath
                ? 'text-indigo-700 bg-indigo-50'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            Candidate
          </Link>
          <Link
            to="/employer"
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
