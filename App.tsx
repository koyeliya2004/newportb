import React, { useEffect, useState, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';
import { Logo } from './components/Logo';

type Theme = 'dark' | 'light';
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const CustomCursor: React.FC = () => {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setTrail((prev) => [
        { x: clientX, y: clientY, id: Math.random() },
        ...prev.slice(0, 15),
      ]);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {trail.map((dot, index) => {
        const ratio = 1 - index / trail.length;
        const size = (isHovering ? 12 : 8) * Math.pow(ratio, 1.4);
        const opacity = Math.pow(ratio, 1.9) * (isHovering ? 0.75 : 0.55);
        const hue = 38 + index * 8;
        return (
          <div
            key={dot.id}
            className="fixed top-0 left-0 rounded-full z-[9998] pointer-events-none blur-[1.5px]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transform: `translate(${dot.x}px, ${dot.y}px) translate(-50%, -50%)`,
              opacity,
              transition: 'opacity 0.25s ease, width 0.25s ease, height 0.25s ease',
              background: theme === 'dark'
                ? `radial-gradient(circle, hsla(${hue}, 95%, 70%, 1), hsla(${hue + 28}, 95%, 62%, 0.7))`
                : 'radial-gradient(circle, rgba(17,24,39,1), rgba(17,24,39,0.45))',
              boxShadow: theme === 'dark' ? '0 0 18px rgba(243,198,35,0.42), 0 0 26px rgba(59,130,246,0.22)' : '0 0 10px rgba(17,24,39,0.18)',
            }}
          />
        );
      })}
    </>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="min-h-screen pt-20 transition-colors duration-500">{children}</div>;
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <div className={`min-h-screen flex flex-col transition-colors duration-500 ${theme === 'dark' ? 'bg-black text-white' : 'bg-[#fff8df] text-slate-900'} selection:bg-[#f3c623] selection:text-black`}>
          <ScrollToTop />
          <CustomCursor />
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/home" element={<Hero />} />
              <Route path="/about" element={<PageWrapper><Skills /></PageWrapper>} />
              <Route path="/experience" element={<PageWrapper><Experience /></PageWrapper>} />
              <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
              <Route path="/projects/:id" element={<PageWrapper><ProjectDetail /></PageWrapper>} />
              <Route path="/certifications" element={<PageWrapper><Certifications /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            </Routes>
          </main>

          <footer className={`py-16 px-6 border-t ${theme === 'dark' ? 'border-[#f3c623]/10 bg-black' : 'border-black/10 bg-[#fff8df]'} backdrop-blur-sm transition-colors duration-500`}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-3">
                <Logo className={`w-8 h-8 rounded-sm transition-colors duration-500 drop-shadow-[0_0_12px_rgba(243,198,35,0.4)]`} />
                <p className="font-bold tracking-tighter uppercase">Bhumika</p>
              </div>

              <p className={`${theme === 'dark' ? 'text-white/40' : 'text-slate-500'} text-sm transition-colors`}>© 2026 Bhumika. All rights reserved.</p>

              <div className={`flex gap-8 text-sm ${theme === 'dark' ? 'text-white/70' : 'text-slate-600'} font-bold uppercase tracking-widest text-[10px] transition-colors`}>
                <a href="https://www.linkedin.com/in/bhumika-tewari-21294027a/" target="_blank" rel="noopener noreferrer" className="hover:text-[#f3c623] transition-colors">LinkedIn</a>
                <a href="https://github.com/Bhumika2006-hue" target="_blank" rel="noopener noreferrer" className="hover:text-[#f3c623] transition-colors">GitHub</a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
