
import React, { useState } from 'react';
import { SKILL_CATEGORIES, CV_DATA } from '../constants';

const SkillIcon: React.FC<{ name: string; icon?: string; className?: string }> = ({ name, icon, className }) => {
  const [hasError, setHasError] = useState(false);

  // Generate a consistent gradient based on the name string
  const stringToGradient = (str: string) => {
    const hash = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      'from-pink-500 to-rose-500',
      'from-blue-500 to-indigo-500',
      'from-emerald-500 to-teal-500',
      'from-amber-500 to-orange-500',
      'from-purple-500 to-violet-500',
      'from-cyan-500 to-blue-500'
    ];
    return colors[hash % colors.length];
  };

  if (!icon || hasError) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br ${stringToGradient(name)} rounded-xl shadow-lg ${className}`}>
        <span className="text-white font-black text-lg select-none">
          {name.substring(0, 2).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <img 
      src={`https://skillicons.dev/icons?i=${icon}`} 
      alt={name}
      className={`object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] ${className}`}
      onError={() => setHasError(true)}
    />
  );
};

const Skills: React.FC = () => {
  const featuredSkills = SKILL_CATEGORIES.flatMap(cat => cat.skills).slice(0, 24);

  const getCategoryGradient = (index: number) => {
    const gradients = [
      'from-pink-600 via-purple-600 to-indigo-600',
      'from-blue-600 via-cyan-600 to-teal-600',
      'from-emerald-600 via-green-600 to-lime-600',
      'from-orange-600 via-red-600 to-rose-600',
      'from-indigo-600 via-blue-600 to-cyan-600',
    ];
    return gradients[index % gradients.length];
  };

  return (
    <section id="about" className="py-24 bg-black px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Professional Summary Section */}
        <div className="text-center mb-40 max-w-5xl mx-auto relative group">
          <div className="absolute -inset-20 bg-gradient-to-r from-pink-500/20 via-blue-500/20 to-purple-500/20 blur-[120px] opacity-30 group-hover:opacity-60 transition-opacity duration-1000"></div>
          <p className="text-xs font-bold uppercase tracking-[0.6em] text-pink-500 mb-12 animate-pulse">Professional Summary</p>
          <h2 className="text-2xl md:text-5xl font-light leading-relaxed text-white/90 italic relative z-10 px-4 transition-all duration-700">
            {CV_DATA.summary.split('. ').map((sentence, i) => (
              <span key={i} className="block mb-6 hover:text-white hover:scale-[1.02] cursor-default transition-transform origin-center">
                {sentence}{i === CV_DATA.summary.split('. ').length - 1 ? '' : '.'}
              </span>
            ))}
          </h2>
        </div>

        {/* The Secret Sauce Arc */}
        <div className="relative text-center mb-64">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-t from-pink-500/10 via-blue-500/5 to-transparent blur-[180px] rounded-full pointer-events-none -z-10"></div>
           
           <div className="mb-24">
             <p className="text-[10px] uppercase tracking-[0.8em] font-black text-gray-400 mb-8 opacity-70">UNVEILING THE TECH STACK</p>
             <h3 className="text-7xl md:text-9xl font-black tracking-tighter text-white">
               The Secret <span className="font-playfair italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-400 to-purple-600 gradient-animate drop-shadow-[0_0_30px_rgba(236,72,153,0.3)]">Sauce</span>
             </h3>
           </div>

           {/* Colorful Icon Arc */}
           <div className="relative h-[450px] flex items-end justify-center perspective-[2500px]">
              <div className="flex flex-wrap justify-center gap-8 max-w-6xl px-4">
                {featuredSkills.map((skill, idx) => {
                  const col = idx % 8;
                  const row = Math.floor(idx / 8);
                  const offset = (Math.abs(3.5 - col) * 20) + (row * 25);
                  const delay = idx * 0.08;
                  
                  return (
                    <div 
                      key={idx}
                      className="group/icon relative w-16 h-16 md:w-24 md:h-24 bg-[#0a0a0a] border border-white/10 rounded-3xl p-4 md:p-6 flex items-center justify-center transition-all duration-700 hover:scale-125 hover:z-50 hover:border-white/30 hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] animate-float overflow-visible"
                      style={{ 
                        transform: `translateY(${offset}px)`,
                        animationDelay: `${delay}s`,
                      }}
                    >
                      {/* Vibrant Radial Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity rounded-3xl"></div>
                      
                      <SkillIcon name={skill.name} icon={skill.icon} className="w-full h-full" />
                      
                      {/* Floating Tooltip */}
                      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-white text-black px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/icon:opacity-100 transition-all scale-75 group-hover/icon:scale-100 whitespace-nowrap z-[100] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                        {skill.name}
                      </div>
                    </div>
                  );
                })}
              </div>
           </div>
        </div>

        {/* Categories Section with Glowing Headers and Vibrant Grids */}
        <div className="space-y-48 mt-80 pb-20">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <div key={category.name} className="group/section">
              <div className="flex flex-col md:flex-row items-baseline gap-4 md:gap-12 mb-24 relative px-4">
                <div className={`absolute -left-12 top-0 bottom-0 w-3 bg-gradient-to-b ${getCategoryGradient(catIdx)} opacity-0 group-hover/section:opacity-100 blur-sm transition-all duration-700 rounded-full`}></div>
                
                <h4 className="text-4xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none">
                   {category.name} 
                </h4>
                <div className={`h-1.5 flex-1 bg-gradient-to-r ${getCategoryGradient(catIdx)} transform scale-x-0 group-hover/section:scale-x-100 transition-transform duration-1000 origin-left rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]`}></div>
                <span className="text-xl md:text-4xl font-playfair italic text-white/20 group-hover/section:text-white transition-colors">expertise</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10">
                {category.skills.map((skill, skillIdx) => (
                  <div 
                    key={skill.name} 
                    className="group/card relative bg-[#060606] border border-white/[0.03] rounded-[3rem] p-12 flex flex-col items-center gap-10 transition-all duration-700 hover:bg-[#090909] hover:-translate-y-6 hover:shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
                  >
                    {/* Inner glowing core */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                    
                    <div className="w-24 h-24 relative flex items-center justify-center">
                       {/* Double glow rings */}
                       <div className={`absolute inset-0 bg-gradient-to-tr ${getCategoryGradient(catIdx)} rounded-full scale-0 group-hover/card:scale-150 group-hover/card:opacity-0 transition-all duration-1000 ease-out`}></div>
                       <div className={`absolute inset-0 border-2 border-white/20 rounded-full scale-0 group-hover/card:scale-[1.3] group-hover/card:opacity-0 transition-all duration-700 delay-100`}></div>
                       
                       <SkillIcon name={skill.name} icon={skill.icon} className="w-20 h-20 z-10" />
                    </div>
                    
                    <div className="text-center relative z-10">
                      <span className="text-[13px] font-black uppercase tracking-[0.4em] text-gray-500 group-hover/card:text-white transition-all duration-500 group-hover:tracking-[0.6em]">
                        {skill.name}
                      </span>
                    </div>

                    {/* Animated side borders */}
                    <div className={`absolute top-0 right-0 w-1 h-0 bg-gradient-to-b ${getCategoryGradient(catIdx)} group-hover/card:h-full transition-all duration-700 delay-300 rounded-full`}></div>
                    <div className={`absolute bottom-0 left-0 w-1 h-0 bg-gradient-to-t ${getCategoryGradient(catIdx)} group-hover/card:h-full transition-all duration-700 delay-300 rounded-full`}></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Bottom Section */}
        <div className="mt-64 text-center pb-20">
           <div className="inline-block relative p-1 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-blue-500 to-purple-600 rounded-full blur-2xl opacity-20 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"></div>
              <button 
                onClick={() => window.location.hash = '#/experience'}
                className="relative px-16 py-7 bg-black rounded-full text-white font-black uppercase tracking-[0.5em] text-sm hover:bg-white hover:text-black transition-all duration-500 border border-white/10 group-hover:border-transparent overflow-hidden"
              >
                <span className="relative z-10">Browse Experience</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white to-white transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
              </button>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
