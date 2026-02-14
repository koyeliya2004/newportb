
import React, { useEffect, useRef, useState } from 'react';
import { SKILL_CATEGORIES, CV_DATA } from '../constants';
import { useTheme } from '../App';

const useScrollReveal = () => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle active status based on visibility for "comes in and moves out" effect
        setActive(entry.isIntersecting);
      },
      { threshold: 0.05 } // Low threshold for early reveal
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, active };
};

const PlasmaGlobe: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] opacity-60">
        {/* The Core Glowing Sphere */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-pink-500 blur-[80px] animate-pulse"></div>
        
        {/* Swirling wispy energy paths */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible">
          <defs>
            <filter id="plasma-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="plasma-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          {[...Array(6)].map((_, i) => (
            <path
              key={i}
              d={`M 50 50 Q ${20 + i * 10} ${10 + i * 5}, 80 ${50 + i * 2} T 50 50`}
              fill="none"
              stroke="url(#plasma-grad)"
              strokeWidth="0.4"
              filter="url(#plasma-glow)"
              className="animate-wisp"
              style={{
                animationDelay: `${i * 1.5}s`,
                transformOrigin: '50% 50%',
                opacity: 0.6
              }}
            />
          ))}
        </svg>

        <div className="absolute inset-0 border-[0.5px] border-white/10 rounded-full scale-110 animate-spin-slow"></div>
        <div className="absolute inset-0 border-[0.5px] border-pink-500/10 rounded-full scale-105 animate-spin-reverse"></div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes wisp {
          0% { transform: rotate(0deg) scale(1); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: rotate(360deg) scale(1.1); opacity: 0; }
        }
        .animate-spin-slow { animation: spin-slow 40s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 55s linear infinite; }
        .animate-wisp { animation: wisp 10s linear infinite; }
      `}</style>
    </div>
  );
};

const SkillLogo: React.FC<{ name: string; icon?: string; delay: number; isDark: boolean }> = ({ name, icon, delay, isDark }) => {
  const [error, setError] = useState(false);
  const iconId = icon || name.toLowerCase().replace(/\s+/g, '').replace(/\.js/g, '').replace(/\//g, '');
  const url = `https://skillicons.dev/icons?i=${iconId}`;

  return (
    <div 
      className="group relative flex flex-col items-center gap-2 animate-fadeInScale"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div 
        className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl transition-all duration-500 hover:scale-110 animate-logo-pulse hover:animate-none ${isDark ? 'bg-[#111] border border-white/5 hover:border-pink-500/50 hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]' : 'bg-white border border-black/5 hover:border-pink-500/50 shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] hover:-translate-y-1'}`}
      >
        {!error ? (
          <img 
            src={url} 
            alt={name} 
            className="w-8 h-8 md:w-10 md:h-10 object-contain transition-all duration-500 group-hover:brightness-110"
            onError={() => setError(true)}
          />
        ) : (
          <span className={`text-[10px] font-black transition-colors ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{name.substring(0, 3)}</span>
        )}
      </div>
      <span className={`text-[9px] font-black uppercase tracking-widest transition-colors pointer-events-none text-center max-w-[70px] leading-tight ${isDark ? 'text-gray-500 group-hover:text-pink-500' : 'text-slate-500 group-hover:text-pink-600'}`}>
        {name}
      </span>
    </div>
  );
};

const SkillLogoGrid: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const logos = [
    { name: 'React', icon: 'react' },
    { name: 'Next.js', icon: 'nextjs' },
    { name: 'TypeScript', icon: 'ts' },
    { name: 'Tailwind', icon: 'tailwind' },
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'Express', icon: 'express' },
    { name: 'Redis', icon: 'redis' },
    { name: 'Postgres', icon: 'postgres' },
    { name: 'MongoDB', icon: 'mongodb' },
    { name: 'Prisma', icon: 'prisma' },
    { name: 'Python', icon: 'py' },
    { name: 'Git', icon: 'git' },
    { name: 'GitHub', icon: 'github' },
    { name: 'Docker', icon: 'docker' },
    { name: 'AWS', icon: 'aws' },
    { name: 'K8s', icon: 'kubernetes' },
    { name: 'TensorFlow', icon: 'tensorflow' },
    { name: 'FastAPI', icon: 'fastapi' },
    { name: 'Supabase', icon: 'supabase' },
    { name: 'MySQL', icon: 'mysql' },
    { name: 'Flask', icon: 'flask' },
    { name: 'Figma', icon: 'figma' },
    { name: 'Postman', icon: 'postman' },
    { name: 'Vercel', icon: 'vercel' }
  ];

  return (
    <div className="mt-20 flex flex-wrap justify-center gap-x-6 gap-y-10 md:gap-x-10 md:gap-y-14 max-w-6xl mx-auto">
      {logos.map((logo, i) => (
        <SkillLogo key={logo.name} name={logo.name} icon={logo.icon} delay={i * 30} isDark={isDark} />
      ))}
    </div>
  );
};

const Skills: React.FC = () => {
  const { ref: headerRef, active: headerActive } = useScrollReveal();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="about" className={`relative py-32 px-6 overflow-hidden min-h-screen transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-slate-50'}`}>
      {/* Moving background blue blob */}
      <div className={`absolute top-[30%] left-[20%] w-[800px] h-[800px] rounded-full blur-[180px] animate-blob-drift ${isDark ? 'bg-blue-600/10' : 'bg-blue-600/5'}`}></div>
      
      <div ref={headerRef} className={`reveal-custom ${headerActive ? 'active' : 'exit'} mb-40 text-center relative z-10 pt-20`}>
        <PlasmaGlobe />
        <p className="text-pink-500 font-bold uppercase tracking-[0.5em] text-[10px] mb-4 relative z-20">Discovery</p>
        <h2 className={`text-5xl md:text-9xl font-black tracking-tighter uppercase leading-none select-none relative z-20 transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          ABOUT <span className="text-pink-600">ME</span>
        </h2>
        
        <div className={`mt-16 max-w-4xl mx-auto px-4 text-lg md:text-xl font-light leading-relaxed relative z-20 transition-colors duration-500 ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
          <p className="italic">"{CV_DATA.summary}"</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 pb-48">
          {SKILL_CATEGORIES.map((category) => {
            const { ref: catRef, active: catActive } = useScrollReveal();
            return (
              <div 
                key={category.name} 
                ref={catRef} 
                className={`reveal-custom ${catActive ? 'active' : 'exit'} p-10 backdrop-blur-sm rounded-[2.5rem] transition-all duration-700 group border ${isDark ? 'bg-[#0a0a0a]/80 border-white/5 hover:bg-[#111] hover:border-white/10' : 'bg-white/80 border-black/5 hover:bg-white hover:border-pink-500/20 shadow-xl'}`}
              >
                <h4 className="text-[10px] md:text-xs font-black tracking-[0.3em] uppercase mb-8 text-pink-600 flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-pink-600 rounded-full"></span>
                   {category.name} 
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill.name} 
                      className={`px-4 py-2 rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-wider transition-all cursor-default border ${isDark ? 'bg-[#151515] text-gray-400 border-white/5 hover:border-pink-500/30 hover:text-white' : 'bg-slate-50 text-slate-600 border-black/5 hover:border-pink-500/30 hover:text-pink-600'}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* The Animated Logo Grid - "Nexus of Innovation" */}
        <div className="mt-20 mb-32 relative">
          <div className="text-center mb-24">
            <h3 className={`text-4xl md:text-6xl font-black tracking-tighter transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Nexus of <span className="text-pink-600 italic font-playfair">Innovation</span>
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-600 to-blue-600 mx-auto mt-6 mb-8 rounded-full"></div>
            <p className={`mt-4 uppercase tracking-[0.4em] text-[10px] font-black transition-colors duration-500 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Immersive Ecosystem of Modern Technologies</p>
          </div>
          
          <div className={`relative p-12 md:p-20 rounded-[4rem] backdrop-blur-xl border transition-all duration-500 ${isDark ? 'bg-[#050505]/50 border-white/5' : 'bg-white/50 border-black/5 shadow-2xl'}`}>
             <div className="absolute top-0 right-0 p-8 text-pink-500/10 pointer-events-none">
                <svg className="w-40 h-40" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
                </svg>
             </div>
             <SkillLogoGrid isDark={isDark} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob-drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(100px, 50px) scale(1.1); }
          66% { transform: translate(-50px, 120px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob-drift {
          animation: blob-drift 25s infinite ease-in-out;
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        
        /* Custom scroll reveal for "moves comes in and moves out" */
        .reveal-custom {
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-custom.active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .reveal-custom.exit {
          opacity: 0;
          transform: translateY(-20px) scale(0.98);
        }

        @keyframes logo-pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 rgba(236, 72, 153, 0); }
          50% { transform: scale(1.02); box-shadow: 0 0 10px rgba(236, 72, 153, 0.1); }
          100% { transform: scale(1); box-shadow: 0 0 0 rgba(236, 72, 153, 0); }
        }
        .animate-logo-pulse {
          animation: logo-pulse 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;
