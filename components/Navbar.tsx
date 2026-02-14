
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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
    { name: 'Certifications', path: '/certifications' },
    { name: 'Contact', path: '/contact' }
  ];

  // Dynamic colors based on page and scroll state
  // On home, we use the dark/light contrast requested before
  const textColor = (isHome && !isScrolled) ? 'text-black' : 'text-white';
  const bgColor = isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent';
  const logoBg = (isHome && !isScrolled) ? 'bg-black text-white' : 'bg-white text-black';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-6 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-2">
          <div className={`w-10 h-10 ${logoBg} font-black flex items-center justify-center rounded-sm text-xl tracking-tighter transition-colors`}>
            BT
          </div>
          <span className={`font-black text-xl hidden sm:inline-block tracking-tighter uppercase ${textColor}`}>Bhumika</span>
        </NavLink>
        
        <div className={`hidden md:flex items-center gap-1 ${isScrolled || !isHome ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border px-2 py-1.5 rounded-full transition-colors`}>
          {navItems.map((item) => (
            <NavLink 
              key={item.name} 
              to={item.path}
              className={({ isActive }) => `
                px-4 py-1.5 rounded-full text-xs uppercase font-bold tracking-widest transition-all
                ${isActive ? (isHome && !isScrolled ? 'bg-black/10 text-black' : 'bg-white/10 text-white') : textColor}
                hover:opacity-70
              `}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <NavLink 
          to="/contact"
          className={`${(isHome && !isScrolled) ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'} px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-xl`}
        >
          Hire Me
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
