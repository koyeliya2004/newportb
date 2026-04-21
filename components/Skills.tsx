
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
      <div className="absolute top-1/3 left-1/3 w-1/4 h-1/4 bg-white/20 blur-[50px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/3 w-1/5 h-1/5 bg-white/10 blur-[40px] rounded-full animate-bounce-slow"></div>

      <style>{`
        @keyframes iridescent-morph {
          0%, 100% { 
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; 
            transform: translate3d(0,0,0) scale(1) rotate(0deg); 
            filter: contrast(1.1); 
          }
          33% { 
            border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; 
            transform: translate3d(0,0,0) scale(1.05) rotate(120deg); 
            filter: contrast(1.3); 
          }
          66% { 
            border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; 
            transform: translate3d(0,0,0) scale(0.95) rotate(240deg); 
            filter: contrast(1.0); 
          }
        }
        @keyframes iridescent-morph-alt {
          0%, 100% { 
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; 
            transform: translate3d(0,0,0) rotate(360deg) scale(1.0); 
            filter: brightness(1.1);
          }
          50% { 
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; 
            transform: translate3d(0,0,0) rotate(180deg) scale(0.98); 
            filter: brightness(0.9);
          }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -20px, 0); }
        }
        .animate-iridescent-morph { animation: iridescent-morph 18s ease-in-out infinite; }
        .animate-iridescent-morph-alt { animation: iridescent-morph-alt 22s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

const BackgroundAtmosphere: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Dimmed subtle grid */}
      <div className={`absolute inset-0 opacity-[0.02] ${isDark ? 'invert' : ''}`} 
        style={{ 
          backgroundImage: `linear-gradient(rgba(192, 38, 211, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(192, 38, 211, 0.3) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 10%, transparent 80%)'
        }}>
      </div>
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-pink-300/10' : 'bg-pink-600/5'}`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float-particle ${15 + Math.random() * 10}s linear infinite`,
            animationDelay: `-${Math.random() * 10}s`
          }}
        ></div>
      ))}
    </div>
  );
};

const ColorfulSkillIcon: React.FC<{ icon: string; index: number; isDark: boolean }> = ({ icon, index, isDark }) => {
  const { ref, active } = useScrollReveal();
  const [hasError, setHasError] = useState(false);
  
  if (hasError) return null;

  return (
    <div 
      ref={ref}
      className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] flex items-center justify-center transition-all duration-1000 transform hover:scale-110 group ${
        active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${isDark ? 'bg-[#080808]/80 border border-white/5 hover:border-pink-500/50 shadow-2xl backdrop-blur-sm' : 'bg-white border border-black/5 shadow-xl hover:shadow-pink-500/20'}`}
      style={{ 
        transitionDelay: `${(index % 8) * 30}ms`,
        animation: `icon-float ${6 + Math.random() * 4}s ease-in-out infinite alternate`,
        animationDelay: `${index * 0.1}s`,
        willChange: 'transform, opacity'
      }}
    >
      <img 
        src={`https://skillicons.dev/icons?i=${icon}`} 
        alt={icon}
        className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform duration-500 group-hover:scale-110"
        onError={() => setHasError(true)}
      />
      <div className="absolute inset-0 rounded-2xl md:rounded-[2rem] bg-gradient-to-tr from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <style>{`
        @keyframes icon-float {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(0, -5px, 0); }
        }
      `}</style>
    </div>
  );
};

const Skills: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const techStack = [
    "py", "js", "ts", "c", "react", "nextjs", "nodejs", "express", "mongodb", "mysql", "postgres", "supabase", 
    "aws", "docker", "kubernetes", "git", "github", "flask", "redis", "prisma", "tailwind", "css", 
    "html", "figma", "notion", "md", "linux", "fastapi", "postman", "tensorflow", "sklearn"
  ];

  return (
    <section id="about" className={`relative py-32 px-6 overflow-hidden min-h-screen transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-[#f8f9fa]'}`}>
      
      <BackgroundAtmosphere isDark={isDark} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section with Subtle Gray Fluid Blob */}
        <div className="relative mb-32 md:mb-52 text-center py-24 md:py-32">
          <FuturisticFluidBlob />
          
          <div className="relative z-10">
            <h2 className={`text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none select-none transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ABOUT <span className="text-pink-500 italic font-playfair animate-glow-pulse">ME</span>
            </h2>
            
            <div className={`mt-16 max-w-4xl mx-auto px-6 text-sm md:text-lg font-medium leading-relaxed transition-colors duration-500 drop-shadow-sm ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
              <p className="italic bg-black/10 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-8 rounded-[3rem] md:p-0">
                "{CV_DATA.summary}"
              </p>
            </div>
          </div>
        </div>

        {/* Knowledge Matrix Section */}
        <div className="text-left mb-20 flex items-center gap-6">
           <h3 className={`text-2xl md:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>KNOWLEDGE MATRIX</h3>
           <div className="h-0.5 flex-1 bg-gradient-to-r from-gray-500 via-blue-500 to-transparent opacity-30"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-40">
          {SKILL_CATEGORIES.map((category, idx) => {
            const { ref, active } = useScrollReveal();
            return (
              <div 
                key={category.name}
                ref={ref}
                className={`p-10 rounded-[3rem] border transition-all duration-1000 transform ${active ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'} ${isDark ? 'bg-black/40 border-white/5 backdrop-blur-xl' : 'bg-white border-black/5 shadow-2xl'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.6)]"></div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.4em]">{category.name}</h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span key={skill.name} className={`px-4 py-2.5 rounded-2xl text-[10px] md:text-[11px] font-bold uppercase tracking-widest border transition-all ${isDark ? 'bg-[#151515] border-white/5 text-gray-400 hover:text-white hover:border-pink-500/50 hover:bg-pink-500/5' : 'bg-slate-50 border-black/5 text-slate-600 hover:text-pink-600'}`}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Core Engine Tech Stack */}
        <div className="mt-40 mb-20">
          <div className="text-center mb-20">
            <h3 className={`text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>CORE <span className="text-pink-500">ENGINE</span></h3>
            <p className={`text-[11px] font-black uppercase tracking-[0.6em] ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Technologies powering my builds</p>
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
        @keyframes float-particle {
          0% { transform: translate3d(0, 0, 0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate3d(100px, -400px, 0); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Skills;
