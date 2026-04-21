import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = [
    { name: 'ABOUT', path: '/about' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'AI-CHAT', path: '/contact' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-5 px-6 flex justify-between items-center ${
          isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-[#b5f23d] text-black font-black flex items-center justify-center rounded-sm text-base tracking-tighter group-hover:scale-105 transition-transform">
            K
          </div>
        </NavLink>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="flex flex-col gap-[5px] group"
        >
          <span className="block w-7 h-[2px] bg-white group-hover:bg-[#b5f23d] transition-colors" />
          <span className="block w-5 h-[2px] bg-white group-hover:bg-[#b5f23d] transition-colors" />
          <span className="block w-7 h-[2px] bg-white group-hover:bg-[#b5f23d] transition-colors" />
        </button>
      </nav>

      {/* Full-screen Overlay Menu */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(10,12,10,0.97)' }}
      >
        {/* Lime accent blob */}
        <div className="absolute top-0 right-0 w-[55%] h-[75%] rounded-bl-[3rem] bg-[#b5f23d] z-0" />

        {/* Close button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-6 z-10 bg-black text-white text-xs font-black uppercase tracking-widest px-5 py-2 rounded-full border border-white/20 hover:bg-[#b5f23d] hover:text-black transition-colors"
        >
          CLOSE
        </button>

        {/* Nav Links */}
        <div className="relative z-10 flex flex-col justify-center h-full pl-10 sm:pl-20 gap-2">
          {navItems.map((item, i) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="group block"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span
                className={`text-5xl sm:text-7xl font-black uppercase tracking-tight text-black leading-tight group-hover:text-white transition-colors duration-200 ${
                  menuOpen ? 'animate-slideInMenu' : ''
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {item.name}
              </span>
            </NavLink>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideInMenu {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInMenu {
          animation: slideInMenu 0.45s cubic-bezier(0.16,1,0.3,1) both;
        }
      `}</style>
    </>
  );
};

export default Navbar;
