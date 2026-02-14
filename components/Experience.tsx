
import React, { useEffect, useRef, useState } from 'react';
import { EXPERIENCES, VIRTUAL_SIMULATIONS } from '../constants';
import { useTheme } from '../App';

const useScrollProgress = (ref: React.RefObject<HTMLElement>) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      const visibleStart = -rect.top;
      const p = Math.min(Math.max(visibleStart / totalHeight, 0), 1);
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return progress;
};

const ScrollReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
    >
      {children}
    </div>
  );
};

const TechNode: React.FC<{ color: string; icon: string; number: number; isDark: boolean }> = ({ color, icon, number, isDark }) => (
  <div className="relative flex flex-col items-center group cursor-pointer z-30">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute w-20 h-20 rounded-full opacity-20 animate-ping" style={{ backgroundColor: color }}></div>
      <div className="absolute w-12 h-12 rounded-full border border-white/20 animate-spin-slow" style={{ borderTopColor: color }}></div>
    </div>
    <div 
      className={`w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-2xl relative z-20 transition-all duration-500 group-hover:scale-110 border-2 ${isDark ? 'border-white/20' : 'border-black/5'}`}
      style={{ 
        background: isDark ? `linear-gradient(135deg, ${color}99, #111)` : `linear-gradient(135deg, white, ${color}22)`,
        boxShadow: `0 0 30px ${color}33`
      }}
    >
      <span>{icon}</span>
      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg" style={{ backgroundColor: color, color: 'white' }}>{number}</div>
    </div>
    <div className="w-px h-12 bg-gradient-to-b from-transparent via-current to-transparent opacity-20 mt-2" style={{ color }}></div>
  </div>
);

const StopCard: React.FC<{ index: number; simulation: any; isDark: boolean }> = ({ index, simulation, isDark }) => (
  <div className={`group relative p-8 md:p-10 rounded-3xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 max-w-sm border backdrop-blur-2xl overflow-hidden ${isDark ? 'bg-black/60 border-white/5 hover:border-white/10' : 'bg-white/90 border-black/5 shadow-2xl'}`}>
    <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-10" style={{ backgroundColor: simulation.color }}></div>
    <div className="flex items-center gap-4 mb-6 relative z-10">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white shadow-lg" style={{ backgroundColor: simulation.color }}>0{index}</div>
      <h4 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{simulation.category}</h4>
    </div>
    <p className={`text-[14px] font-medium leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{simulation.companies}</p>
  </div>
);

const Experience: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const spiralRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(spiralRef);

  return (
    <section id="experience" className={`relative py-32 px-6 transition-colors duration-700 overflow-hidden ${isDark ? 'bg-transparent' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-32">
            <p className="text-pink-500 font-black uppercase tracking-[0.4em] text-[11px] mb-4">Trajectory</p>
            <h2 className={`text-5xl md:text-8xl font-black tracking-tighter leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
              CAREER <br />
              <span className="font-playfair italic font-light text-blue-500">EVOLUTION</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative space-y-24 mb-64">
          <div className="absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-blue-500 via-pink-500 to-transparent hidden md:block opacity-20"></div>

          {EXPERIENCES.map((exp, idx) => (
            <ScrollReveal key={exp.id} delay={idx * 150}>
              <div className="relative md:pl-24 group">
                <div className={`absolute left-0 top-2 w-12 h-12 border rounded-full flex items-center justify-center z-10 hidden md:flex transition-all duration-500 ${isDark ? 'bg-black border-white/10 group-hover:border-pink-500' : 'bg-white border-black/10 group-hover:border-pink-500 shadow-lg'}`}>
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 group-hover:scale-150 ${isDark ? 'bg-white' : 'bg-slate-900'}`}></div>
                </div>
                <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-16">
                  <div className={`${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">{exp.duration}</p>
                    <p className="text-sm tracking-tight opacity-60 uppercase">{exp.location}</p>
                  </div>
                  <div className={`p-10 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-1 ${isDark ? 'bg-[#0a0a0a] border-white/5 hover:border-white/10 shadow-2xl' : 'bg-white border-black/5 shadow-xl hover:shadow-2xl'}`}>
                    <h3 className={`text-3xl font-black mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h3>
                    <p className="text-pink-600 font-bold uppercase tracking-widest text-[11px] mb-8">{exp.company}</p>
                    <ul className="space-y-4">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className={`flex gap-4 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div ref={spiralRef} className="relative pt-20">
           <ScrollReveal>
             <div className="text-center mb-48">
                <p className="text-blue-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4">Knowledge Nexus</p>
                <h3 className={`text-5xl md:text-8xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  VIRTUAL <span className="text-pink-600 italic">HUB</span>
                </h3>
                <p className={`mt-6 max-w-2xl mx-auto text-lg font-light ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>A professional spiral of cross-industry virtual work simulations.</p>
             </div>
           </ScrollReveal>

           <div className="relative w-full max-w-6xl mx-auto min-h-[1600px] flex justify-center">
              <div className="absolute inset-0 pointer-events-none flex justify-center">
                <svg width="600" height="1600" viewBox="0 0 600 1600" fill="none" className="h-full">
                  <path 
                    d="M 300 0 C 450 150, 450 250, 300 400 C 150 550, 150 650, 300 800 C 450 950, 450 1050, 300 1200 C 150 1350, 150 1450, 300 1600" 
                    stroke={isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(0,0,0,0.05)"} 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                  />
                  <path 
                    d="M 300 0 C 450 150, 450 250, 300 400 C 150 550, 150 650, 300 800 C 450 950, 450 1050, 300 1200 C 150 1350, 150 1450, 300 1600" 
                    stroke="url(#spiralGrad)" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeDasharray="2500"
                    strokeDashoffset={2500 * (1 - scrollProgress)}
                    style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                  />
                  <defs>
                    <linearGradient id="spiralGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="relative z-10 w-full">
                {[0, 1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className={`absolute left-1/2 -translate-x-1/2 md:translate-x-0 flex flex-col items-center group transition-all duration-1000 ${scrollProgress > (i * 0.2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                    style={{ 
                      top: `${180 + (i * 400)}px`, 
                      left: i % 2 === 0 ? '55%' : 'auto', 
                      right: i % 2 === 1 ? '55%' : 'auto',
                      alignItems: i % 2 === 0 ? 'flex-start' : 'flex-end'
                    }}
                  >
                    <TechNode color={VIRTUAL_SIMULATIONS[i].color} icon={VIRTUAL_SIMULATIONS[i].icon} number={i + 1} isDark={isDark} />
                    <div className="mt-4"><StopCard index={i+1} simulation={VIRTUAL_SIMULATIONS[i]} isDark={isDark} /></div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
