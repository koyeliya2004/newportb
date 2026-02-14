
import React, { useState, useEffect, useRef } from 'react';
import { SKILL_CATEGORIES, CV_DATA } from '../constants';
import { useTheme } from '../App';

const useScrollReveal = () => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, active };
};

const SkillIcon: React.FC<{ name: string; icon?: string; hasLogo?: boolean; className?: string }> = ({ name, icon, hasLogo, className }) => {
  const [hasError, setHasError] = useState(false);

  const customLogos: Record<string, string> = {
    'Gemini': 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304fb62aa2586aed.svg',
    'OpenAI/GPT': 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    'Clerk/AuthJS': 'https://clerk.com/favicon/apple-touch-icon.png',
  };

  const isCustom = !!customLogos[name];
  const logoSrc = customLogos[name] || `https://skillicons.dev/icons?i=${icon}`;

  return (
    <div className="group relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-[#151515] border border-white/10 rounded-[1rem] transition-all duration-500 hover:scale-110 hover:-translate-y-2 hover:bg-[#1a1a1a] hover:border-pink-500/50 hover:shadow-[0_10px_30px_rgba(236,72,153,0.2)] overflow-hidden">
      {!hasLogo || hasError || (!icon && !isCustom) ? (
        <span className="text-[10px] font-black text-gray-500 group-hover:text-white uppercase tracking-tighter text-center px-1">
          {name.split(' ')[0]}
        </span>
      ) : (
        <img 
          src={logoSrc} 
          alt={name}
          className="w-8 h-8 md:w-10 md:h-10 object-contain relative z-10 transition-transform duration-500 drop-shadow-md"
          onError={() => setHasError(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

const GlobeWireframe: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
      <div className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px] animate-globe">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-pink-500/30 fill-none stroke-[0.2]">
          <circle cx="50" cy="50" r="45" />
          <ellipse cx="50" cy="50" rx="45" ry="15" />
          <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(90 50 50)" />
          <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(45 50 50)" />
          <ellipse cx="50" cy="50" rx="45" ry="15" transform="rotate(-45 50 50)" />
          <circle cx="50" cy="50" r="30" strokeDasharray="2 4" />
        </svg>
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { ref: summaryRef, active: summaryActive } = useScrollReveal();
  const { ref: headerRef, active: headerActive } = useScrollReveal();

  // Combine most important technical skills for the "Secret Sauce" section
  const secretSauceSkills = SKILL_CATEGORIES.flatMap(cat => cat.skills).filter(s => s.hasLogo).slice(0, 32);

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden min-h-screen">
      
      {/* Refined Header Section with World Globe */}
      <div ref={headerRef} className={`reveal ${headerActive ? 'active' : ''} mb-32 text-center relative pt-20`}>
        <GlobeWireframe />
        <p className="text-pink-500 font-bold uppercase tracking-[0.5em] text-[10px] mb-4">Discovery</p>
        <h2 className={`text-5xl md:text-8xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'} uppercase leading-none select-none relative z-10`}>
          ABOUT <span className="text-pink-600">ME</span>
        </h2>
        
        <div className={`mt-12 max-w-4xl mx-auto px-4 ${isDark ? 'text-white/70' : 'text-slate-600'} text-lg md:text-xl font-light leading-relaxed`}>
          <p className="italic">"{CV_DATA.summary}"</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* "The Secret Sauce" Section - Skill Icon Grid */}
        <div className="mt-40 mb-64 text-center">
           <div className="mb-20">
              <div className="flex justify-center mb-10">
                {/* 3D Glass Blob Representation */}
                <div className="relative w-40 h-40 md:w-64 md:h-64">
                   <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-purple-500/10 to-transparent blur-[50px] animate-pulse"></div>
                   <div className="absolute inset-0 border border-white/10 rounded-full scale-90 animate-globe" style={{animationDuration: '10s'}}></div>
                   <div className="absolute inset-0 border border-pink-500/10 rounded-full scale-75 animate-globe" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 shadow-2xl"></div>
                   </div>
                </div>
              </div>
              <p className="text-[10px] font-black tracking-[0.6em] text-gray-500 uppercase mb-4">MY SKILLS</p>
              <h3 className={`text-4xl md:text-6xl font-normal leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                The Secret <span className="font-playfair italic text-pink-500 font-light">Sauce</span>
              </h3>
           </div>

           {/* Aesthetically Spaced Icon Rows */}
           <div className="relative flex flex-col gap-4 md:gap-6 items-center">
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-4">
                 {secretSauceSkills.slice(0, 8).map((s, i) => <SkillIcon key={i} name={s.name} icon={s.icon} hasLogo={s.hasLogo} />)}
              </div>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-4">
                 {secretSauceSkills.slice(8, 17).map((s, i) => <SkillIcon key={i} name={s.name} icon={s.icon} hasLogo={s.hasLogo} />)}
              </div>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-4">
                 {secretSauceSkills.slice(17, 25).map((s, i) => <SkillIcon key={i} name={s.name} icon={s.icon} hasLogo={s.hasLogo} />)}
              </div>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 px-4">
                 {secretSauceSkills.slice(25, 32).map((s, i) => <SkillIcon key={i} name={s.name} icon={s.icon} hasLogo={s.hasLogo} />)}
              </div>
           </div>
        </div>

        {/* Categories breakdown for remaining technical details */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 pb-32">
          {SKILL_CATEGORIES.slice(0, 6).map((category, catIdx) => {
            const { ref: catRef, active: catActive } = useScrollReveal();
            return (
              <div key={category.name} ref={catRef} className={`reveal ${catActive ? 'active' : ''} p-8 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/[0.08] transition-all group`}>
                <h4 className={`text-xs font-black tracking-[0.3em] uppercase mb-6 ${isDark ? 'text-pink-500/70' : 'text-pink-600'}`}>
                   {category.name} 
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill.name} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${isDark ? 'bg-white/5 text-gray-400 border-white/5' : 'bg-black/5 text-slate-600 border-black/5'} border group-hover:border-pink-500/30 transition-colors`}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
