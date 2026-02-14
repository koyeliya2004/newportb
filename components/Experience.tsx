
import React from 'react';
import { EXPERIENCES, VIRTUAL_SIMULATIONS } from '../constants';
import { useTheme } from '../App';

const TechNode: React.FC<{ color: string; icon: string; number: number; isDark: boolean }> = ({ color, icon, number, isDark }) => (
  <div className="relative flex flex-col items-center group cursor-pointer z-30">
    {/* Concentric Pulsating Rings */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div 
        className="absolute w-20 h-20 rounded-full opacity-20 animate-ping"
        style={{ backgroundColor: color }}
      ></div>
      <div 
        className="absolute w-12 h-12 rounded-full border border-white/20 animate-spin-slow"
        style={{ borderTopColor: color }}
      ></div>
    </div>

    {/* The Core Node */}
    <div 
      className={`w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-2xl relative z-20 transition-all duration-500 group-hover:scale-110 border-2 ${isDark ? 'border-white/20' : 'border-black/5'}`}
      style={{ 
        background: isDark ? `linear-gradient(135deg, ${color}99, #111)` : `linear-gradient(135deg, white, ${color}22)`,
        boxShadow: `0 0 30px ${color}33`
      }}
    >
      <span className="drop-shadow-sm filter brightness-110">{icon}</span>
      
      {/* Floating Counter Badge */}
      <div 
        className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg backdrop-blur-md"
        style={{ backgroundColor: color, color: 'white' }}
      >
        {number}
      </div>
    </div>
    
    {/* Vertical Connection Filament (to the road) */}
    <div className="w-px h-12 bg-gradient-to-b from-transparent via-current to-transparent opacity-20 mt-2" style={{ color }}></div>
  </div>
);

const StopCard: React.FC<{ index: number; simulation: any; isDark: boolean }> = ({ index, simulation, isDark }) => (
  <div className={`group relative p-8 md:p-10 rounded-3xl transition-all duration-700 hover:scale-[1.02] hover:-translate-y-2 max-w-sm border backdrop-blur-2xl overflow-hidden ${isDark ? 'bg-black/40 border-white/5 hover:border-white/10' : 'bg-white/80 border-black/5 shadow-2xl hover:shadow-pink-500/5'}`}>
    
    {/* Subtle Gradient Glow */}
    <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-10 transition-opacity group-hover:opacity-20" style={{ backgroundColor: simulation.color }}></div>
    
    <div className="flex items-center gap-4 mb-6 relative z-10">
      <div 
        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white shadow-lg" 
        style={{ backgroundColor: simulation.color }}
      >
        0{index}
      </div>
      <h4 className={`text-xl font-black tracking-tight transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{simulation.category}</h4>
    </div>
    
    <p className={`text-[14px] font-medium leading-relaxed transition-colors relative z-10 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
      {simulation.companies}
    </p>

    <div className="mt-8 flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
       <div className="h-1 w-12 rounded-full" style={{ backgroundColor: simulation.color }}></div>
       <div className="h-1 w-2 rounded-full" style={{ backgroundColor: simulation.color }}></div>
    </div>
  </div>
);

const Experience: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="experience" className={`relative py-32 px-6 transition-colors duration-700 overflow-hidden ${isDark ? 'bg-transparent' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Main Timeline Header */}
        <div className="mb-32">
          <p className="text-pink-500 font-black uppercase tracking-[0.4em] text-[11px] mb-4">Trajectory</p>
          <h2 className={`text-5xl md:text-8xl font-black tracking-tighter leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
            CAREER <br />
            <span className="font-playfair italic font-light text-blue-500">EVOLUTION</span>
          </h2>
        </div>

        {/* Professional Experience Section */}
        <div className="relative space-y-24 mb-64">
          <div className="absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-blue-500 via-pink-500 to-transparent hidden md:block opacity-20"></div>

          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative md:pl-24 group">
              <div className={`absolute left-0 top-2 w-12 h-12 border rounded-full flex items-center justify-center z-10 hidden md:flex transition-all duration-500 ${isDark ? 'bg-black border-white/10 group-hover:border-pink-500' : 'bg-white border-black/10 group-hover:border-pink-500 shadow-lg'}`}>
                <div className={`w-2 h-2 rounded-full transition-all duration-500 group-hover:scale-150 ${isDark ? 'bg-white' : 'bg-slate-900'}`}></div>
              </div>

              <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-16">
                <div className={`${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                  <p className="text-[10px] font-black uppercase tracking-widest mb-1">{exp.duration}</p>
                  <p className="text-sm tracking-tight opacity-60 uppercase">{exp.location}</p>
                </div>

                <div className={`p-10 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-1 ${isDark ? 'bg-[#0a0a0a] border-white/5 hover:border-white/10' : 'bg-white border-black/5 shadow-xl hover:shadow-2xl'}`}>
                  <h3 className={`text-3xl font-black mb-1 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h3>
                  <p className="text-pink-600 font-bold uppercase tracking-widest text-[11px] mb-8">{exp.company}</p>
                  
                  <ul className="space-y-4">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className={`flex gap-4 text-sm leading-relaxed transition-colors ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* THE ADVANCED SPIRAL ROADMAP SECTION */}
        <div className="relative pt-20">
           <div className="text-center mb-48 relative">
              <p className="text-blue-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4">Knowledge Nexus</p>
              <h3 className={`text-5xl md:text-8xl font-black tracking-tighter transition-colors duration-700 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                VIRTUAL <span className="text-pink-600 italic">HUB</span>
              </h3>
              <p className={`mt-6 max-w-2xl mx-auto text-lg font-light transition-colors ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                A professional spiral of cross-industry virtual work simulations.
              </p>
           </div>

           {/* SPIRAL INFOGRAPHIC CONTAINER */}
           <div className="relative w-full max-w-6xl mx-auto min-h-[1600px] flex justify-center">
              
              {/* THE ADVANCED FILAMENT PATH (SVG) */}
              <div className="absolute inset-0 pointer-events-none flex justify-center">
                <svg width="600" height="1600" viewBox="0 0 600 1600" fill="none" className="h-full">
                  <defs>
                    <linearGradient id="filamentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#EC4899" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* The Subtle Spiral Line */}
                  <path 
                    d="M 300 0 C 450 150, 450 250, 300 400 C 150 550, 150 650, 300 800 C 450 950, 450 1050, 300 1200 C 150 1350, 150 1450, 300 1600" 
                    stroke="url(#filamentGradient)" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    opacity="0.3" 
                    filter="url(#glow)"
                    strokeDasharray="10 10"
                    className="animate-filament"
                  />

                  {/* Stronger Core Path */}
                  <path 
                    d="M 300 0 C 450 150, 450 250, 300 400 C 150 550, 150 650, 300 800 C 450 950, 450 1050, 300 1200 C 150 1350, 150 1450, 300 1600" 
                    stroke="url(#filamentGradient)" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    opacity="0.6"
                  />
                </svg>
              </div>

              {/* ROADMAP CONTENT NODES & CARDS */}
              <div className="relative z-10 w-full">
                
                {/* Node 1 - Right Side */}
                <div className="absolute top-[180px] left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[55%] flex flex-col items-center md:items-start group">
                  <TechNode color="#EF4444" icon="☁️" number={1} isDark={isDark} />
                  <div className="mt-4 md:ml-4">
                    <StopCard index={1} simulation={VIRTUAL_SIMULATIONS[0]} isDark={isDark} />
                  </div>
                </div>

                {/* Node 2 - Left Side */}
                <div className="absolute top-[580px] left-1/2 -translate-x-1/2 md:-translate-x-full md:left-[45%] flex flex-col items-center md:items-end group">
                  <TechNode color="#10B981" icon="📊" number={2} isDark={isDark} />
                  <div className="mt-4 md:mr-4 text-center md:text-right">
                    <StopCard index={2} simulation={VIRTUAL_SIMULATIONS[1]} isDark={isDark} />
                  </div>
                </div>

                {/* Node 3 - Right Side */}
                <div className="absolute top-[980px] left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[55%] flex flex-col items-center md:items-start group">
                  <TechNode color="#F59E0B" icon="💼" number={3} isDark={isDark} />
                  <div className="mt-4 md:ml-4">
                    <StopCard index={3} simulation={VIRTUAL_SIMULATIONS[2]} isDark={isDark} />
                  </div>
                </div>

                {/* Node 4 - Left Side */}
                <div className="absolute top-[1380px] left-1/2 -translate-x-1/2 md:-translate-x-full md:left-[45%] flex flex-col items-center md:items-end group">
                  <TechNode color="#3B82F6" icon="🚀" number={4} isDark={isDark} />
                  <div className="mt-4 md:mr-4 text-center md:text-right">
                    <StopCard index={4} simulation={VIRTUAL_SIMULATIONS[3]} isDark={isDark} />
                  </div>
                </div>

              </div>
           </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        @keyframes filament-pulse {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 100; }
        }
        .animate-filament {
          animation: filament-pulse 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Experience;
