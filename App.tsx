
import React, { useEffect, useState, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

// Theme Context
type Theme = 'dark' | 'light';
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

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
                 <div className={`w-8 h-8 ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} font-bold flex items-center justify-center rounded-sm transition-colors duration-500`}>BT</div>
                 <p className="font-bold tracking-tighter uppercase">Bhumika Tewari</p>
              </div>
              
              <p className={`${theme === 'dark' ? 'text-gray-600' : 'text-slate-400'} text-sm transition-colors`}>© 2024 Bhumika Tewari. All rights reserved.</p>
              
              <div className={`flex gap-8 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'} font-bold uppercase tracking-widest text-[10px] transition-colors`}>
                 <a href="https://linkedin.com" target="_blank" className="hover:text-pink-500 transition-colors">LinkedIn</a>
                 <a href="https://github.com" target="_blank" className="hover:text-pink-500 transition-colors">GitHub</a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
