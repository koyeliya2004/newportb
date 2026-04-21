import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../App';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

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
    { name: 'Contact', path: '/contact' },
  ];

  const isDark = theme === 'dark';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 ${
        isScrolled
          ? isDark
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10'
            : 'bg-white/90 backdrop-blur-md border-b border-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo — lime square with A icon only, no name text */}
        <NavLink to="/" className="flex items-center group">
          <div className="w-9 h-9 bg-[#b5f23d] text-black font-black flex items-center justify-center rounded-sm text-base tracking-tighter group-hover:scale-105 transition-transform select-none">
            A
          </div>
        </NavLink>

        {/* Nav pill — all links visible */}
        <div
          className={`hidden md:flex items-center gap-1 border px-2 py-1.5 rounded-full transition-colors ${
            isDark
              ? 'bg-white/5 border-white/10'
              : 'bg-black/5 border-black/10'
          }`}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `px-4 py-1.5 rounded-full text-xs uppercase font-bold tracking-widest transition-all ${
                  isActive
                    ? 'bg-[#b5f23d] text-black shadow-[0_0_14px_rgba(181,242,61,0.5)]'
                    : isDark
                      ? 'text-white hover:text-[#b5f23d]'
                      : 'text-slate-800 hover:text-[#6aab00]'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all ${
              isDark
                ? 'border-white/10 bg-white/5 text-white hover:bg-[#b5f23d] hover:text-black hover:border-[#b5f23d]'
                : 'border-black/10 bg-black/5 text-black hover:bg-[#b5f23d] hover:border-[#b5f23d]'
            }`}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M7.757 7.757l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Hire Me */}
          <NavLink
            to="/contact"
            className="bg-[#b5f23d] text-black px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(181,242,61,0.3)] hover:shadow-[0_0_35px_rgba(181,242,61,0.55)] hover:scale-105 active:scale-95"
          >
            Hire Me
          </NavLink>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
