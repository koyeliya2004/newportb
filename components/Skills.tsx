import React, { useEffect, useRef, useState } from 'react';
import { SKILL_CATEGORIES, CV_DATA } from '../constants';
import { useTheme } from '../App';

const useScrollReveal = () => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, active };
};

const FuturisticFluidBlob: React.FC = () => {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollPos(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[900px] aspect-square z-0 pointer-events-none overflow-visible"
      style={{ 
        transform: `translate3d(-50%, ${scrollPos * 0.05}px, 0)`,
        transition: 'transform 0.4s cubic-bezier(0.2, 0, 0.2, 1)',
        willChange: 'transform'
      }}
    >
      {/* 3D Iridescent Liquid Body - Grayscale Base Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#333] via-[#888] to-[#222] blur-[100px] rounded-full animate-iridescent-morph opacity-30 mix-blend-screen"></div>
      
      {/* Shimmering Core Layer - Silver tones */}
      <div className="absolute inset-16 bg-gradient-to-bl from-[#aaa] via-[#555] to-[#eee] blur-[80px] rounded-full animate-iridescent-morph-alt opacity-40 mix-blend-color-dodge"></div>
      
      {/* Glowing Edges - Silver/White highlight */}
      <div className="absolute inset-8 border-[1px] border-white/20 blur-[15px] rounded-full animate-iridescent-morph opacity-30 shadow-[0_0_80px_rgba(255,255,255,0.15)]"></div>
      
      {/* Cinematic Highlight Flares - Subtle White */}
      <div className="absolute -top-10 left-1/3 w-40 h-40 bg-gradient-to-br from-white/60 via-transparent to-transparent blur-[40px] opacity-40"></div>
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-gradient-to-tr from-white/40 via-transparent to-transparent blur-[40px] opacity-40"></div>
    </div>
  );
};

const BackgroundAtmosphere: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Subtle star field */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)',
          backgroundSize: '80px 80px'
        }}
      ></div>

      {/* Horizon glow */}
      <div
        className={`absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[140%] h-[60%] rounded-[50%] blur-[120px] ${
          isDark ? 'bg-gradient-to-t from-slate-900 via-blue-900/40 to-transparent' : 'bg-gradient-to-t from-slate-300 via-blue-200/40 to-transparent'
        }`}
      ></div>

      {/* Soft orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[1200px] h-[1200px] rounded-full border border-white/5" />
        <div className="w-[900px] h-[900px] rounded-full border border-white/5" />
        <div className="w-[600px] h-[600px] rounded-full border border-white/5" />
      </div>
    </div>
  );
};

const ColorfulSkillIcon: React.FC<{ icon: string; index: number; isDark: boolean }> = ({ icon, index, isDark }) => {
  const palette = [
    '#22c55e',
    '#3b82f6',
    '#a855f7',
    '#ec4899',
    '#eab308',
    '#06b6d4'
  ];
  const color = palette[index % palette.length];

  return (
    <div
      className={`relative flex items-center justify-center w-16 h-16 rounded-2xl border text-xs font-black uppercase tracking-[0.25em] ${
        isDark ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-slate-900 text-white border-black/10'
      }`}
      style={{
        boxShadow: `0 18px 40px ${color}33`,
        backgroundImage: `radial-gradient(circle at 0 0, ${color}33, transparent 60%)`
      }}
    >
      <span>{icon}</span>
    </div>
  );
};

const Skills: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const techStack = [
    'py',
    'js',
    'ts',
    'c',
    'react',
    'nextjs',
    'nodejs',
    'express',
    'mongodb',
    'mysql',
    'postgres',
    'supabase',
    'aws',
    'docker',
    'kubernetes',
    'git',
    'github',
    'flask',
    'redis',
    'prisma',
    'tailwind',
    'css',
    'html',
    'figma',
    'notion',
    'md',
    'linux',
    'fastapi',
    'postman',
    'tensorflow',
    'sklearn'
  ];

  const careerRoadmap = [
    {
      label: '2024 – Present',
      title: 'B.Tech (Information Technology)',
      detail: 'RCC Institute of Information Technology, Kolkata — building foundations in CS, systems, and data.'
    },
    {
      label: 'Feb 2025 – Oct 2025',
      title: 'SDE Intern (Full Stack)',
      detail:
        'Bihar Innovation Hub — 30+ full‑stack apps, 45+ REST APIs, and deep exposure to production databases and cloud.'
    },
    {
      label: 'Nov 2025 – Dec 2025',
      title: 'MERN Stack & AI Engineer (Teaching Assistant)',
      detail:
        'Stealth Ed‑Tech Startup — mentoring 120+ learners, resolving 250+ issues, and building LLM assistants for learning.'
    },
    {
      label: '2026 →',
      title: 'AI, Data, and Platform Engineering Roles',
      detail:
        'Focused on AI systems, data pipelines, and production‑grade full‑stack products that create real impact.'
    }
  ];

  return (
    <section
      id="about"
      className={`relative py-32 px-6 overflow-hidden min-h-screen transition-colors duration-500 ${
        isDark ? 'bg-black' : 'bg-[#f8f9fa]'
      }`}
    >
      <BackgroundAtmosphere isDark={isDark} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section with Summary */}
        <div className="relative mb-32 md:mb-52 text-center py-24 md:py-32">
          <FuturisticFluidBlob />
          
          <div className="relative z-10">
            <h2
              className={`text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none select-none transition-colors duration-500 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              ABOUT <span className="text-pink-500 italic font-playfair animate-glow-pulse">ME</span>
            </h2>
            
            <div
              className={`mt-16 max-w-4xl mx-auto px-6 text-sm md:text-lg font-medium leading-relaxed transition-colors duration-500 drop-shadow-sm ${
                isDark ? 'text-gray-300' : 'text-slate-700'
              }`}
            >
              <p className="italic bg-black/10 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-8 rounded-[3rem] md:p-0">
                "{CV_DATA.summary}"
              </p>
            </div>
          </div>
        </div>

        {/* Knowledge Matrix Section */}
        <div className="text-left mb-20 flex items-center gap-6">
          <h3
            className={`text-2xl md:text-3xl font-black tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            KNOWLEDGE MATRIX
          </h3>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-gray-500 via-blue-500 to-transparent opacity-30"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-32">
          {SKILL_CATEGORIES.map((category, idx) => {
            const { ref, active } = useScrollReveal();
            return (
              <div
                key={category.name}
                ref={ref}
                className={`p-10 rounded-[3rem] border transition-all duration-1000 transform ${
                  active ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
                } ${isDark ? 'bg-black/40 border-white/5 backdrop-blur-xl' : 'bg-white border-black/5 shadow-2xl'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.6)]"></div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.4em]">{category.name}</h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`px-4 py-2.5 rounded-2xl text-[10px] md:text-[11px] font-bold uppercase tracking-widest border transition-all ${
                        isDark
                          ? 'bg-[#151515] border-white/5 text-gray-400 hover:text-white hover:border-pink-500/50 hover:bg-pink-500/5'
                          : 'bg-slate-50 border-black/5 text-slate-600 hover:text-pink-600'
                      }`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Career Roadmap Section */}
        <div className="mb-32">
          <div className="flex items-center gap-6 mb-12">
            <h3
              className={`text-2xl md:text-3xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              CAREER ROADMAP
            </h3>
            <div className="h-0.5 flex-1 bg-gradient-to-r from-pink-500 via-blue-500 to-transparent opacity-40"></div>
          </div>

          <div className="relative pl-6 md:pl-10">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500 via-blue-500 to-transparent opacity-40" />
            <div className="space-y-10">
              {careerRoadmap.map((step, idx) => (
                <div key={step.label} className="relative flex flex-col md:flex-row gap-4 md:gap-10">
                  <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.6)]">
                    <div className="w-2 h-2 rounded-full bg-pink-500" />
                  </div>
                  <div className="md:w-48 text-xs uppercase tracking-[0.25em] font-black text-pink-500/80 pt-1">
                    {step.label}
                  </div>
                  <div
                    className={`flex-1 p-6 md:p-8 rounded-3xl border backdrop-blur-xl transition-all ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-gray-200'
                        : 'bg-white border-black/5 text-slate-800 shadow-xl'
                    }`}
                    style={{ transitionDelay: `${idx * 80}ms` }}
                  >
                    <h4 className="text-lg md:text-xl font-black mb-2">{step.title}</h4>
                    <p className="text-sm md:text-base leading-relaxed opacity-80">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Engine Tech Stack */}
        <div className="mt-32 mb-20">
          <div className="text-center mb-20">
            <h3
              className={`text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              CORE <span className="text-pink-500">ENGINE</span>
            </h3>
            <p
              className={`text-[11px] font-black uppercase tracking-[0.6em] ${
                isDark ? 'text-gray-500' : 'text-slate-400'
              }`}
            >
              Technologies powering my builds
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl mx-auto px-4">
            {techStack.map((icon, idx) => (
              <ColorfulSkillIcon key={icon} icon={icon} index={idx} isDark={isDark} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { text-shadow: 0 0 30px rgba(236, 72, 153, 0.4); opacity: 1; }
          50% { text-shadow: 0 0 10px rgba(236, 72, 153, 0.1); opacity: 0.9; }
        }
        .animate-glow-pulse { animation: glow-pulse 5s ease-in-out infinite; }
        @keyframes iridescent-morph {
          0% { transform: scale(1) translate3d(0, 0, 0); }
          50% { transform: scale(1.05) translate3d(10px, -10px, 0); }
          100% { transform: scale(1.02) translate3d(-10px, 10px, 0); }
        }
        @keyframes iridescent-morph-alt {
          0% { transform: scale(1.05) translate3d(10px, 0, 0); }
          50% { transform: scale(1.02) translate3d(-10px, 10px, 0); }
          100% { transform: scale(1.08) translate3d(0, -10px, 0); }
        }
        .animate-iridescent-morph { animation: iridescent-morph 22s ease-in-out infinite alternate; }
        .animate-iridescent-morph-alt { animation: iridescent-morph-alt 26s ease-in-out infinite alternate; }
      `}</style>
    </section>
  );
};

export default Skills;
