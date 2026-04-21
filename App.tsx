import React, { useEffect, useState, createContext, useContext, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';

// Theme Context
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
        ...prev.slice(0, 15), // Longer trail for more fluid effect
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
      {/* Interactive ethereal trail */}
      {trail.map((dot, index) => {
        // Opacity and size decay curves
        const ratio = 1 - index / trail.length;
        const size = (isHovering ? 18 : 12) * Math.pow(ratio, 1.5);
        const opacity = Math.pow(ratio, 2) * (isHovering ? 0.6 : 0.4);
        
        return (
          <div 
            key={dot.id}
            className={`fixed top-0 left-0 rounded-full z-[9998] pointer-events-none blur-[2px] ${
              theme === 'dark' ? 'bg-pink-500' : 'bg-blue-500'
            }`}
            style={{ 
              width: `${size}px`,
              height: `${size}px`,
              transform: `translate(${dot.x}px, ${dot.y}px) translate(-50%, -50%)`,
              opacity: opacity,
              // No transition on transform to keep it perfectly synced with pointer
              transition: 'opacity 0.3s ease, width 0.3s ease, height 0.3s ease',
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
  return (
    <div className="min-h-screen pt-20 transition-colors duration-500">
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'dark';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
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
        <div className={`min-h-screen flex flex-col transition-colors duration-500 ${theme === 'dark' ? 'bg-transparent text-white' : 'bg-transparent text-slate-900'} selection:bg-pink-500 selection:text-white`}>
          <ScrollToTop />
          <CustomCursor />
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/home" element={<Hero />} />
              
              <Route path="/about" element={
                <PageWrapper>
                  <Skills />
                </PageWrapper>
              } />
              
              <Route path="/experience" element={
                <PageWrapper>
                  <Experience />
                </PageWrapper>
              } />
              
              <Route path="/projects" element={
                <PageWrapper>
                  <Projects />
                </PageWrapper>
              } />
              
              <Route path="/projects/:id" element={
                <PageWrapper>
                  <ProjectDetail />
                </PageWrapper>
              } />
              
              <Route path="/certifications" element={
                <PageWrapper>
                  <Certifications />
                </PageWrapper>
              } />
              
              <Route path="/contact" element={
                <PageWrapper>
                  <Contact />
                </PageWrapper>
              } />
            </Routes>
          </main>

          <footer className={`py-16 px-6 border-t ${theme === 'dark' ? 'border-white/5 bg-black/50' : 'border-black/5 bg-white/50'} backdrop-blur-sm transition-colors duration-500`}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-3">
                 <div className={`w-8 h-8 ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} font-bold flex items-center justify-center rounded-sm transition-colors duration-500`}>KG</div>
                 <p className="font-bold tracking-tighter uppercase">Koyeliya Ghosh</p>
              </div>
              
              <p className={`${theme === 'dark' ? 'text-gray-600' : 'text-slate-400'} text-sm transition-colors`}>© 2025 Koyeliya Ghosh. All rights reserved.</p>
              
              <div className={`flex gap-8 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'} font-bold uppercase tracking-widest text-[10px] transition-colors`}>
                 <a href="https://www.linkedin.com/in/bhumika-tewari-21294027a/" target="_blank" className="hover:text-pink-500 transition-colors">LinkedIn</a>
                 <a href="https://github.com/Bhumika2006-hue" target="_blank" className="hover:text-pink-500 transition-colors">GitHub</a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
