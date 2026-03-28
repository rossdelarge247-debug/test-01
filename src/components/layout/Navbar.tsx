import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isCandidatePath = location.pathname === '/candidate' || location.pathname.startsWith('/candidate/');
  const isEmployerPath  = location.pathname === '/employer'  || location.pathname.startsWith('/employer/');

  const navLinks = [
    { to: '/about',    label: 'About' },
    { to: '/candidate', label: 'Candidates', active: isCandidatePath },
    { to: '/employer',  label: 'Employers',  active: isEmployerPath },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Wordmark */}
        <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center">
          <span className="font-semibold text-lg tracking-tight text-gray-900">Fit.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map(({ to, label, active }) => (
            <Link
              key={to}
              to={to}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                active
                  ? 'text-indigo-700 bg-indigo-50'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile right side */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="p-2 -mr-1 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md px-4 py-3 space-y-1">
          {navLinks.map(({ to, label, active }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                active
                  ? 'text-indigo-700 bg-indigo-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
