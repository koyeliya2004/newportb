
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

// Scroll to top on route change component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen pt-20">
      {children}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-black text-white selection:bg-pink-500 selection:text-white min-h-screen flex flex-col">
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

        <footer className="py-12 px-6 border-t border-white/5 bg-[#050505]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-white text-black font-bold flex items-center justify-center rounded-sm">BT</div>
               <p className="font-bold tracking-tighter uppercase">Bhumika Tewari</p>
            </div>
            
            <p className="text-gray-600 text-sm">© 2024 Bhumika Tewari. All rights reserved.</p>
            
            <div className="flex gap-8 text-sm text-gray-400 font-bold uppercase tracking-widest text-[10px]">
               <a href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
               <a href="https://github.com" target="_blank" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
