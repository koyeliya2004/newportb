import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../App';
import { Logo } from './Logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();
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
  
  const textColor = isDark
      ? 'text-white'
      : 'text-slate-900';

  const bgColor = isScrolled 
    ? (isDark
        ? 'bg-black/90 backdrop-blur-md border-b border-white/10'
        : 'bg-white/90 backdrop-blur-md border-b border-black/10')
    : (isHome && isDark)
      ? 'bg-black/45 backdrop-blur-sm border-b border-[#f3c623]/20'
      : 'bg-transparent';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-6 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="transition-all hover:scale-105 active:scale-95">
            <Logo className="h-10 w-10 drop-shadow-[0_0_16px_rgba(243,198,35,0.4)]" />
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
