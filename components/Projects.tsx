
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { useTheme } from '../App';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard: React.FC<{ proj: any; isDark: boolean }> = ({ proj, isDark }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/projects/${proj.id}`)}
      className={`group flex flex-col rounded-[2.5rem] overflow-hidden border transition-all duration-700 cursor-pointer ${isDark ? 'bg-[#0a0a0a] border-white/5 hover:border-pink-500/30' : 'bg-white border-black/5 shadow-xl hover:shadow-2xl'}`}
    >
      <div className="relative h-72 overflow-hidden">
        <img 
          src={proj.image} 
          alt={proj.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className={`absolute inset-0 transition-opacity duration-700 ${isDark ? 'bg-black/40 group-hover:opacity-20' : 'bg-black/10 group-hover:opacity-0'}`}></div>
        
        {/* Project Number Badge */}
        <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black tracking-[0.3em] uppercase text-white">
           Project {proj.id.replace('proj', '') === 'chest_disease' ? '04' : proj.id.replace('proj', '')}
        </div>

        <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <ArrowUpRight className="w-5 h-5" />
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

        <p className={`text-sm leading-relaxed mb-8 line-clamp-3 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
          {proj.description[0]}
        </p>
        
        <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center">
           <div className="flex gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/10"></div>
           </div>
           <span className={`text-[10px] font-black uppercase tracking-widest transition-colors group-hover:text-pink-500 ${isDark ? 'text-white/20' : 'text-black/10'}`}>View Details</span>
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
            <h2 className={`text-3xl md:text-5xl font-black tracking-tighter transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
              MAJOR <span className="text-pink-600 italic font-playfair">PROJECTS</span>
            </h2>
            <p className={`mt-8 text-lg font-light leading-relaxed transition-colors ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              Deeply technical engineering solutions leveraging AI, Full-stack ecosystems, and Enterprise Data Architecture.
            </p>
          </div>
          <div className="text-right hidden md:block">
             <div className={`text-5xl font-black tracking-tighter transition-colors ${isDark ? 'text-white/10' : 'text-slate-200'}`}>
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
