import React, { useEffect, useRef, useState } from 'react';
import { EXPERIENCES, VIRTUAL_SIMULATIONS } from '../constants';
import { useTheme } from '../App';

const SPIRAL_PATH =
  'M 300 0 C 450 150, 450 250, 300 400 C 150 550, 150 650, 300 800 C 450 950, 450 1050, 300 1200 C 150 1350, 150 1450, 300 1600';

const useScrollProgress = (ref: React.RefObject<HTMLElement>) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionTop = rect.top;
            const sectionHeight = rect.height;

            let p = 0;
            if (sectionTop < windowHeight) {
              p = Math.min(Math.max((windowHeight - sectionTop) / (sectionHeight + windowHeight), 0), 1);
            }
            setProgress(p);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
      }`}
    >
      {children}
    </div>
  );
};

const TechNode: React.FC<{ color: string; icon: string; number: number; isDark: boolean }> = ({ color, icon, number, isDark }) => (
  <div className="relative z-30 flex cursor-pointer flex-col items-center group">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute h-20 w-20 rounded-full opacity-20 animate-ping" style={{ backgroundColor: color }}></div>
      <div className="absolute h-12 w-12 rounded-full border border-white/20 animate-spin-slow" style={{ borderTopColor: color }}></div>
    </div>
    <div
      className={`relative z-20 flex h-14 w-14 items-center justify-center rounded-full border-2 text-xl shadow-2xl transition-all duration-500 group-hover:scale-110 ${
        isDark ? 'border-white/20' : 'border-black/5'
      }`}
      style={{
        background: isDark ? `linear-gradient(135deg, ${color}99, #111)` : `linear-gradient(135deg, white, ${color}22)`,
        boxShadow: `0 0 30px ${color}33`,
      }}
    >
      <span>{icon}</span>
      <div
        className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black shadow-lg"
        style={{ backgroundColor: color, color: 'white' }}
      >
        {number}
      </div>
    </div>
    <div className="mt-2 h-12 w-px bg-gradient-to-b from-transparent via-current to-transparent opacity-20" style={{ color }}></div>
  </div>
);

const StopCard: React.FC<{ index: number; simulation: any; isDark: boolean }> = ({ index, simulation, isDark }) => (
  <div
    className={`group relative max-w-sm overflow-hidden rounded-3xl border p-8 backdrop-blur-2xl transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02] md:p-10 ${
      isDark ? 'border-white/5 bg-black/60 hover:border-white/10' : 'border-black/5 bg-white/90 shadow-2xl'
    }`}
  >
    <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full blur-[80px] opacity-10" style={{ backgroundColor: simulation.color }}></div>
    <div className="relative z-10 mb-6 flex items-center gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white shadow-lg" style={{ backgroundColor: simulation.color }}>
        0{index}
      </div>
      <h4 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{simulation.category}</h4>
    </div>
    <p className={`text-[14px] font-medium leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>{simulation.companies}</p>
  </div>
);

const Experience: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const spiralRef = useRef<HTMLDivElement>(null);
  const trajectoryRef = useRef<HTMLDivElement>(null);
  const spiralPathRef = useRef<SVGPathElement>(null);
  const trajectoryProgress = useScrollProgress(trajectoryRef);
  const scrollProgress = useScrollProgress(spiralRef);
  const [orbPosition, setOrbPosition] = useState({ x: 300, y: 0 });

  useEffect(() => {
    const path = spiralPathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    const point = path.getPointAtLength(length * scrollProgress);
    setOrbPosition({ x: point.x, y: point.y });
  }, [scrollProgress]);

  return (
    <section
      id="experience"
      className={`relative overflow-hidden px-6 py-32 transition-colors duration-700 ${
        isDark
          ? 'bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.16),transparent_32%),radial-gradient(circle_at_90%_30%,rgba(236,72,153,0.14),transparent_36%),#000]'
          : 'bg-[radial-gradient(circle_at_10%_0%,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_95%_20%,rgba(236,72,153,0.09),transparent_35%),#f8fafc]'
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute inset-0 ${isDark ? 'bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)]'} bg-[size:56px_56px]`} />
        <div className="absolute -left-24 top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px] animate-drift-slow" />
        <div className="absolute -right-24 top-[35%] h-[26rem] w-[26rem] rounded-full bg-pink-500/20 blur-[120px] animate-drift-reverse" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-32">
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.4em] text-pink-500">Career Roadmap</p>
            <h2 className={`text-3xl font-black leading-none tracking-tighter md:text-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              CAREER <br />
              <span className="font-playfair font-light italic text-blue-500">ROADMAP</span>
            </h2>
          </div>
        </ScrollReveal>

        <div ref={trajectoryRef} className="relative mb-64 space-y-24">
          <div className={`absolute left-[23px] top-4 hidden w-px overflow-hidden md:block ${isDark ? 'bottom-4 bg-white/5' : 'bottom-4 bg-slate-300/40'}`}>
            <div
              className="absolute left-0 w-full bg-gradient-to-b from-blue-500 via-pink-500 to-blue-500 shadow-[0_0_22px_rgba(236,72,153,0.8)]"
              style={{
                height: '120px',
                transform: `translate3d(0, ${trajectoryProgress * 100}%, 0)`,
                transition: 'transform 0.08s linear',
                willChange: 'transform',
              }}
            />
            <div
              className="absolute left-0 top-0 w-full bg-gradient-to-b from-blue-500 via-pink-500 to-transparent"
              style={{
                height: `${trajectoryProgress * 100}%`,
                opacity: 0.36,
              }}
            />
          </div>

          {EXPERIENCES.map((exp, idx) => (
            <ScrollReveal key={exp.id} delay={idx * 150}>
              <div className="group relative md:pl-24">
                <div className={`absolute left-0 top-2 z-10 hidden h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 md:flex ${isDark ? 'border-white/10 bg-black group-hover:border-pink-500' : 'border-black/10 bg-white shadow-lg group-hover:border-pink-500'}`}>
                  <div className={`h-2 w-2 rounded-full transition-all duration-500 group-hover:scale-150 ${isDark ? 'bg-white' : 'bg-slate-900'}`}></div>
                </div>
                <div className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-16">
                  <div className={`${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                    <p className="mb-1 text-[10px] font-black uppercase tracking-widest">{exp.duration}</p>
                    <p className="text-sm uppercase tracking-tight opacity-60">{exp.location}</p>
                  </div>
                  <div className={`rounded-[2.5rem] border p-10 transition-all duration-500 hover:-translate-y-1 ${isDark ? 'border-white/5 bg-[#0a0a0a]/90 shadow-2xl hover:border-white/10' : 'border-black/5 bg-white/95 shadow-xl hover:shadow-2xl'}`}>
                    <h3 className={`mb-1 text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h3>
                    <p className="mb-8 text-[11px] font-bold uppercase tracking-widest text-pink-600">{exp.company}</p>
                    <ul className="space-y-4">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className={`flex gap-4 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span>
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
            <div className="mb-48 text-center">
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.5em] text-blue-500">Knowledge Nexus</p>
              <h3 className={`text-3xl font-black tracking-tighter md:text-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                VIRTUAL <span className="italic text-pink-600">HUB</span>
              </h3>
              <p className={`mx-auto mt-6 max-w-2xl text-lg font-light ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                A professional spiral of cross-industry virtual work simulations.
              </p>
            </div>
          </ScrollReveal>

          <div className="relative mx-auto flex min-h-[1600px] w-full max-w-6xl justify-center">
            <div className="pointer-events-none absolute inset-0 flex justify-center">
              <svg width="600" height="1600" viewBox="0 0 600 1600" fill="none" className="h-full">
                <path d={SPIRAL_PATH} stroke={isDark ? 'rgba(59,130,246,0.17)' : 'rgba(15,23,42,0.08)'} strokeWidth="4" strokeLinecap="round" />
                <path
                  d={SPIRAL_PATH}
                  stroke={isDark ? 'rgba(236,72,153,0.35)' : 'rgba(236,72,153,0.28)'}
                  strokeWidth="9"
                  strokeLinecap="round"
                  filter="url(#glowRoad)"
                  opacity={0.8}
                />
                <path
                  ref={spiralPathRef}
                  d={SPIRAL_PATH}
                  stroke="url(#spiralGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="2500"
                  strokeDashoffset={2500 * (1 - scrollProgress)}
                  style={{ transition: 'stroke-dashoffset 0.08s linear' }}
                />
                <path
                  d={SPIRAL_PATH}
                  stroke={isDark ? 'rgba(255,255,255,0.6)' : 'rgba(15,23,42,0.35)'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="16 24"
                  className="road-dash"
                />
                <circle cx={orbPosition.x} cy={orbPosition.y} r="10" fill="#EC4899" filter="url(#orbGlow)" />

                <defs>
                  <linearGradient id="spiralGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                  <filter id="glowRoad" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="orbGlow" x="-200%" y="-200%" width="500%" height="500%">
                    <feGaussianBlur stdDeviation="5" result="blurOrb" />
                    <feMerge>
                      <feMergeNode in="blurOrb" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>

            <div className="relative z-10 w-full">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`absolute left-1/2 flex -translate-x-1/2 flex-col items-center transition-all duration-1000 md:translate-x-0 ${
                    scrollProgress > i * 0.2 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  }`}
                  style={{
                    top: `${180 + i * 400}px`,
                    left: i % 2 === 0 ? '55%' : 'auto',
                    right: i % 2 === 1 ? '55%' : 'auto',
                    alignItems: i % 2 === 0 ? 'flex-start' : 'flex-end',
                  }}
                >
                  <TechNode color={VIRTUAL_SIMULATIONS[i].color} icon={VIRTUAL_SIMULATIONS[i].icon} number={i + 1} isDark={isDark} />
                  <div className="mt-4">
                    <StopCard index={i + 1} simulation={VIRTUAL_SIMULATIONS[i]} isDark={isDark} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes drift-slow {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(20px, -24px, 0) scale(1.08); }
        }

        @keyframes drift-reverse {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-20px, 22px, 0) scale(1.07); }
        }

        .animate-drift-slow {
          animation: drift-slow 10s ease-in-out infinite;
        }

        .animate-drift-reverse {
          animation: drift-reverse 12s ease-in-out infinite;
        }

        .road-dash {
          animation: road-flow 2.8s linear infinite;
        }

        @keyframes road-flow {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -80; }
        }
      `}</style>
    </section>
  );
};

export default Experience;
