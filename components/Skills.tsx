
import React, { useState, useEffect, useRef } from 'react';
import { SKILL_CATEGORIES, CV_DATA } from '../constants';

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

  if (!hasLogo || hasError || (!icon && !isCustom)) {
    const acronym = name.split(/[ /]/).map(word => word[0]).join('').substring(0, 3).toUpperCase();
    return (
      <div className={`group relative bg-[#0d0d0d] border border-white/5 rounded-xl p-3 md:p-4 flex flex-col items-center justify-center gap-2 transition-all duration-500 hover:border-pink-500/30 hover:bg-[#121212] hover:-translate-y-1 shadow-lg ${className}`}>
        <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-white/5 to-white/10 text-white/30 font-black text-[8px] md:text-[10px] group-hover:text-pink-500 transition-all">
          {acronym}
        </div>
        <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-gray-600 group-hover:text-white transition-colors text-center leading-tight">
          {name}
        </span>
      </div>
    );
  }

  return (
    <div className={`group relative flex flex-col items-center gap-3 transition-all duration-700 ${className}`}>
      <div className="w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center bg-[#151515] rounded-xl border border-white/5 p-2 transition-all duration-500 group-hover:scale-110 group-hover:border-white/20 shadow-xl overflow-hidden">
        {(name === 'OpenAI/GPT' || name === 'Gemini') && (
          <div className={`absolute inset-0 opacity-10 blur-md ${name === 'Gemini' ? 'bg-blue-500' : 'bg-[#74aa9c]'}`}></div>
        )}
        <img 
          src={logoSrc} 
          alt={name}
          className="w-full h-full object-contain relative z-10 transition-transform duration-500 drop-shadow-md"
          onError={() => setHasError(true)}
        />
      </div>
      <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-white transition-all duration-500 group-hover:tracking-[0.3em] block text-center max-w-[80px] leading-tight">
        {name}
      </span>
    </div>
  );
};

const EcoIcon: React.FC<{ icon: string; name: string; delay: number; active: boolean }> = ({ icon, name, delay, active }) => (
  <div 
    className={`group relative flex flex-col items-center justify-center transition-all duration-700 transform ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="w-14 h-14 md:w-16 md:h-16 bg-[#0f0f0f] border border-white/5 rounded-2xl flex items-center justify-center p-3.5 transition-all duration-500 hover:bg-[#181818] hover:border-white/20 hover:-translate-y-2 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <img 
        src={`https://skillicons.dev/icons?i=${icon}`} 
        alt={name} 
        className="w-full h-full object-contain relative z-10 transition-all duration-500 group-hover:scale-110" 
      />
    </div>
    <span className="mt-2 text-[8px] font-black uppercase tracking-widest text-gray-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
      {name}
    </span>
  </div>
);

const RotatingGlobeEffect: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none flex items-center justify-center ${className}`}>
      {/* Central Cosmic Glow */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full animate-pulse"></div>
      
      {/* Professional Rotating Globe Core */}
      <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-globe">
           {/* Longitude / Latitude Lines */}
           <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="0.1" />
           <circle cx="50" cy="50" r="30" fill="none" stroke="white" strokeWidth="0.05" strokeDasharray="2 4" />
           <ellipse cx="50" cy="50" rx="48" ry="18" fill="none" stroke="purple" strokeWidth="0.15" />
           <ellipse cx="50" cy="50" rx="18" ry="48" fill="none" stroke="blue" strokeWidth="0.15" />
           <ellipse cx="50" cy="50" rx="48" ry="48" fill="none" stroke="white" strokeWidth="0.05" transform="rotate(45 50 50)" />
           <ellipse cx="50" cy="50" rx="48" ry="48" fill="none" stroke="white" strokeWidth="0.05" transform="rotate(-45 50 50)" />
        </svg>
      </div>

      {/* Satellite Particles */}
      <div className="absolute w-full h-full max-w-[600px] max-h-[600px]">
         {[...Array(8)].map((_, i) => (
           <div 
             key={i}
             className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full opacity-30 animate-float"
             style={{
               animationDelay: `${i * 1.2}s`,
               transform: `rotate(${i * 45}deg) translate(220px) rotate(-${i * 45}deg)`
             }}
           />
         ))}
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  const { ref: summaryRef, active: summaryActive } = useScrollReveal();
  const { ref: ecosystemRef, active: ecosystemActive } = useScrollReveal();

  const getCategoryGradient = (index: number) => {
    const gradients = ['from-pink-500 via-purple-600 to-indigo-600', 'from-blue-500 via-cyan-500 to-teal-500', 'from-emerald-500 via-green-600 to-lime-500', 'from-orange-500 via-red-600 to-rose-600'];
    return gradients[index % gradients.length];
  };

  const ecoIcons = [
    { i: 'react', n: 'React' }, { i: 'nextjs', n: 'Next.js' }, { i: 'ts', n: 'TypeScript' }, 
    { i: 'py', n: 'Python' }, { i: 'nodejs', n: 'Node.js' }, { i: 'express', n: 'Express' },
    { i: 'fastapi', n: 'FastAPI' }, { i: 'flask', n: 'Flask' }, { i: 'tensorflow', n: 'TF' },
    { i: 'pytorch', n: 'PyTorch' }, { i: 'postgres', n: 'PostgreSQL' }, { i: 'mongodb', n: 'MongoDB' },
    { i: 'redis', n: 'Redis' }, { i: 'docker', n: 'Docker' }, { i: 'aws', n: 'AWS' },
    { i: 'git', n: 'Git' }, { i: 'github', n: 'GitHub' }, { i: 'prisma', n: 'Prisma' },
    { i: 'supabase', n: 'Supabase' }, { i: 'tailwind', n: 'Tailwind' }, { i: 'figma', n: 'Figma' },
    { i: 'linux', n: 'Linux' }, { i: 'postman', n: 'Postman' }, { i: 'mysql', n: 'MySQL' }
  ];

  return (
    <section id="about" className="relative py-24 bg-transparent px-6 overflow-hidden min-h-screen">
      {/* Professional Visual Centerpiece */}
      <div className="absolute top-0 left-0 w-full h-[75vh] flex items-center justify-center overflow-hidden pointer-events-none">
        <RotatingGlobeEffect />
        
        <div ref={summaryRef} className={`reveal ${summaryActive ? 'active' : ''} text-center z-10 transition-all duration-1000`}>
          <h2 className="text-7xl md:text-9xl font-black tracking-tight text-[#e5e7eb] uppercase leading-none select-none drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">
            ABOUT
          </h2>
          <h2 className="text-7xl md:text-9xl font-black tracking-tight text-[#c026d3] uppercase leading-[0.7] select-none drop-shadow-[0_0_50px_rgba(192,38,211,0.2)]">
            ME
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-[60vh] relative z-20">
        
        {/* About Summary Box */}
        <div className="mb-64 flex justify-center">
          <div className={`reveal ${summaryActive ? 'active' : ''} max-w-3xl bg-black/50 backdrop-blur-2xl p-8 md:p-14 rounded-[2.5rem] border border-white/10 shadow-2xl text-center`}>
            <p className="text-lg md:text-xl font-light leading-relaxed text-white/90 italic">
              {CV_DATA.summary}
            </p>
          </div>
        </div>

        {/* Skill Categories Section */}
        <div className="space-y-48 pb-40">
          {SKILL_CATEGORIES.map((category, catIdx) => {
            const { ref: catRef, active: catActive } = useScrollReveal();
            return (
              <div key={category.name} ref={catRef} className={`reveal ${catActive ? 'active' : ''} group/section`}>
                <div className="flex flex-col md:flex-row items-baseline gap-4 md:gap-6 mb-16 relative px-4">
                  <div className={`absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b ${getCategoryGradient(catIdx)} opacity-0 group-hover/section:opacity-100 blur-sm transition-all duration-700 rounded-full`}></div>
                  <h4 className="text-xl md:text-4xl font-black tracking-tighter text-white uppercase leading-none">
                     {category.name} 
                  </h4>
                  <div className={`h-[1px] flex-1 bg-white/10 transform scale-x-0 group-hover/section:scale-x-100 transition-transform duration-1000 origin-left opacity-30`}></div>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6 md:gap-10">
                  {category.skills.map((skill) => (
                    <SkillIcon key={skill.name} name={skill.name} icon={skill.icon} hasLogo={skill.hasLogo} className="w-full" />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Professional Technical Ecosystem Section */}
        <div ref={ecosystemRef} className="pt-32 pb-48 border-t border-white/5 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          <div className="text-center mb-32">
             <p className="text-pink-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-6">Expertise Stack</p>
             <h2 className="text-5xl md:text-8xl font-playfair font-normal text-white">
                Technical <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Ecosystem</span>
             </h2>
          </div>

          <div className="max-w-6xl mx-auto px-4">
             <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 md:gap-12">
                {ecoIcons.map((icon, idx) => (
                  <EcoIcon 
                    key={idx} 
                    icon={icon.i} 
                    name={icon.n} 
                    delay={idx * 30} 
                    active={ecosystemActive}
                  />
                ))}
             </div>
          </div>
        </div>

        {/* Explore Journey */}
        <div className="text-center pb-32">
           <div className="inline-block relative p-0.5 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-blue-500 to-purple-600 rounded-full blur-2xl opacity-20 group-hover:opacity-60 transition-all duration-1000"></div>
              <button 
                onClick={() => window.location.hash = '#/experience'}
                className="relative px-16 py-6 bg-black rounded-full text-white font-black uppercase tracking-[0.8em] text-[11px] hover:bg-white hover:text-black transition-all duration-700 border border-white/10 group-hover:border-transparent shadow-[0_30px_60px_rgba(255,255,255,0.05)]"
              >
                Experience
              </button>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
