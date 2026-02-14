
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { useTheme } from '../App';

const ProjectCard: React.FC<{ proj: any; isDark: boolean }> = ({ proj, isDark }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`group flex flex-col rounded-[2.5rem] overflow-hidden border transition-all duration-700 ${isDark ? 'bg-[#0a0a0a] border-white/5 hover:border-white/10' : 'bg-white border-black/5 shadow-xl hover:shadow-2xl'}`}>
      <div className="relative h-72 overflow-hidden">
        <img 
          src={proj.image} 
          alt={proj.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className={`absolute inset-0 transition-opacity duration-700 ${isDark ? 'bg-black/40 group-hover:opacity-40' : 'bg-black/10 group-hover:opacity-0'}`}></div>
        
        {/* Project Number Badge */}
        <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black tracking-[0.3em] uppercase text-white">
           Project {proj.id.replace('proj', '')}
        </div>
      </div>
      
      <div className="p-10 flex-1 flex flex-col">
        <h3 className={`text-2xl font-black mb-6 leading-tight transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{proj.title}</h3>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {proj.techStack.map((tag: string) => (
            <span key={tag} className={`text-[9px] uppercase font-black tracking-widest px-3 py-1.5 rounded-lg border transition-all ${isDark ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-slate-100 border-black/5 text-slate-600'}`}>
              {tag}
            </span>
          ))}
        </div>

        {/* View Details Toggle */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] mb-6 transition-all group/btn ${isDark ? 'text-pink-500 hover:text-white' : 'text-pink-600 hover:text-pink-800'}`}
        >
           {isExpanded ? 'Hide Details' : 'View Details'}
           <svg 
             className={`w-4 h-4 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} 
             fill="none" stroke="currentColor" viewBox="0 0 24 24"
           >
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
           </svg>
        </button>

        {/* Expandable Content */}
        <div 
          className={`overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}
        >
          <ul className="space-y-6">
            {proj.description.map((line: string, idx: number) => (
              <li key={idx} className={`text-[13px] leading-relaxed flex gap-4 transition-colors font-medium ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                 <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 shrink-0 shadow-[0_0_10px_rgba(236,72,153,0.5)]"></span>
                 <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center">
           <div className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/10"></div>
           </div>
           <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white/20' : 'text-black/10'}`}>Live Case Study</span>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="projects" className={`py-32 px-6 transition-colors duration-700 min-h-screen ${isDark ? 'bg-black' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <p className="text-blue-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4">Portfolio</p>
            <h2 className={`text-6xl md:text-9xl font-black tracking-tighter transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
              MAJOR <span className="text-pink-600 italic font-playfair">PROJECTS</span>
            </h2>
            <p className={`mt-8 text-xl font-light leading-relaxed transition-colors ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Deeply technical engineering solutions leveraging AI, Full-stack ecosystems, and Enterprise Data Architecture.
            </p>
          </div>
          <div className="text-right hidden md:block">
             <div className={`text-7xl font-black tracking-tighter transition-colors ${isDark ? 'text-white/10' : 'text-slate-200'}`}>
               0{PROJECTS.length}
             </div>
             <p className={`uppercase tracking-[0.3em] text-[10px] font-black mt-2 ${isDark ? 'text-gray-600' : 'text-slate-400'}`}>TOTAL BUILDS</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-10">
          {PROJECTS.map((proj) => (
            <ProjectCard key={proj.id} proj={proj} isDark={isDark} />
          ))}
        </div>
        
        {/* Aesthetic Decorative Background elements specifically for Projects */}
        <div className="absolute top-[40%] right-0 w-[600px] h-[600px] bg-pink-600/5 blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-[20%] left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Projects;
