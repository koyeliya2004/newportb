import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../App';

const BhumikaLogo: React.FC = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#d946ef" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
    </defs>
    {/* Background rounded square */}
    <rect width="40" height="40" rx="8" fill="url(#bgGrad)" />
    {/* Leaf shape left */}
    <ellipse cx="13" cy="26" rx="5" ry="8" transform="rotate(-30 13 26)" fill="url(#leafGrad)" opacity="0.85" />
    {/* Main circle body */}
    <circle cx="24" cy="22" r="9" fill="#1e1b4b" />
    {/* Code icon </> inside circle */}
    <text x="24" y="26" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#c4b5fd" fontFamily="monospace">&lt;/&gt;</text>
    {/* Antenna lines */}
    <line x1="30" y1="16" x2="36" y2="11" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="31" y1="19" x2="38" y2="16" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="30" y1="22" x2="37" y2="21" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
    {/* Antenna dots */}
    <circle cx="36" cy="11" r="1.5" fill="#a855f7" />
    <circle cx="38" cy="16" r="1.5" fill="#a855f7" />
    <circle cx="37" cy="21" r="1.5" fill="#a855f7" />
    {/* Stem / tail */}
    <path d="M18 14 Q14 6 20 4" stroke="#c4b5fd" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/home';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certifications & Training', path: '/certifications' },
    { name: 'Contact', path: '/contact' }
  ];

  const isDark = theme === 'dark';
  
  const textColor = (isHome && !isScrolled && isDark)
    ? 'text-black'
    : isDark
      ? 'text-white'
      : 'text-slate-900';

  const bgColor = isScrolled 
    ? (isDark
        ? 'bg-black/90 backdrop-blur-md border-b border-white/10'
        : 'bg-white/90 backdrop-blur-md border-b border-black/10')
    : 'bg-transparent';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-6 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="transition-all hover:scale-105 active:scale-95">
            <BhumikaLogo />
          </div>
          <span
            className={`font-black text-xl hidden sm:inline-block tracking-tighter uppercase ${textColor} transition-colors`}
          >
            Bhumika
          </span>
        </NavLink>
        
        <div className="flex items-center gap-4">
          <div
            className={`hidden md:flex items-center gap-1 ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
            } border px-2 py-1.5 rounded-full transition-colors`}
          >
            {navItems.map((item) => (
              <NavLink 
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  px-4 py-1.5 rounded-full text-xs uppercase font-bold tracking-widest transition-all
                  ${isActive 
                    ? isDark
                      ? 'bg-white/10 text-white'
                      : 'bg-black/10 text-black'
                    : textColor}
                  hover:opacity-70
                `}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className={`w-10 h-10 flex items-center justify-center rounded-full border ${
              isDark
                ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                : 'border-black/10 bg-black/5 text-black hover:bg-black/10'
            } transition-all`}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M7.757 7.757l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          <NavLink 
            to="/contact"
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-xl hover:scale-105 active:scale-95"
          >
            Hire Me
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
