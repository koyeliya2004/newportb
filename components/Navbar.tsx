import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../App';

// Golden accent
const GOLD = '#f5c518';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 ${
      isScrolled
        ? isDark ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-white/90 backdrop-blur-md border-b border-black/10'
        : 'bg-transparent'
    }`}>
      <div className="max-w-screen-xl mx-auto flex justify-between items-center gap-4">

        {/* Logo */}
        <NavLink to="/" className="flex-shrink-0">
          <div className="w-9 h-9 text-black font-black flex items-center justify-center rounded-sm text-base tracking-tighter hover:scale-105 transition-transform select-none"
            style={{ background: GOLD }}>
            A
          </div>
        </NavLink>

        {/* Nav pill */}
        <div className={`hidden md:flex items-center gap-0.5 border px-1.5 py-1 rounded-full transition-colors flex-1 justify-center ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
        }`}>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-full text-[11px] uppercase font-bold tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-black shadow-[0_0_12px_rgba(245,197,24,0.5)]'
                    : isDark ? 'text-white/80' : 'text-slate-700'
                }`
              }
              style={({ isActive }) => isActive ? { background: GOLD } : {}}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all ${
              isDark
                ? 'border-white/10 bg-white/5 text-white'
                : 'border-black/10 bg-black/5 text-black'
            }`}
            style={{}}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.color = 'black'; (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = ''; (e.currentTarget as HTMLElement).style.borderColor = ''; }}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M7.757 7.757l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <NavLink
            to="/contact"
            className="text-black px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            style={{ background: GOLD, boxShadow: '0 0 20px rgba(245,197,24,0.35)' }}
          >
            Hire Me
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
