
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { useTheme } from '../App';
import { motion } from 'motion/react';
import { ArrowLeft, Github, ExternalLink, Cpu, Layers, Shield, Zap, BookOpen, CheckCircle2 } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const project = PROJECTS.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-black mb-4">Project Not Found</h2>
          <Link 
            to="/projects"
            className="text-pink-500 font-bold uppercase tracking-widest"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const details = project.fullDetails;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen transition-colors duration-700 ${isDark ? 'bg-black text-white' : 'bg-slate-50 text-slate-900'}`}
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black via-black/60 to-transparent' : 'from-slate-50 via-slate-50/60 to-transparent'}`}></div>
        
        <div className="absolute inset-0 flex items-end z-10">
          <div className="max-w-7xl mx-auto px-6 w-full pb-12 md:pb-24">
            <Link 
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] mb-8 hover:text-pink-500 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-7xl font-black tracking-tighter mb-4 uppercase"
            >
              {project.title}
            </motion.h1>
            
            {project.subtitle && (
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl font-playfair italic text-pink-500 mb-8"
              >
                {project.subtitle}
              </motion.p>
            )}

            <div className="flex flex-wrap gap-4">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${isDark ? 'bg-white text-black hover:bg-pink-500 hover:text-white' : 'bg-slate-900 text-white hover:bg-pink-600'}`}
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
              {project.live && (
                <a 
                  href={project.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${isDark ? 'bg-pink-500 text-white hover:bg-white hover:text-black' : 'bg-pink-600 text-white hover:bg-slate-900'}`}
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16 md:gap-24">
          
          {/* Left Column: Detailed Info */}
          <div className="space-y-24">
            
            {/* Intro & Overview */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-black tracking-tight uppercase flex items-center gap-4">
                  <span className="w-8 h-1 bg-pink-500 rounded-full"></span>
                  Project Overview
                </h2>
                <p className={`text-lg md:text-xl leading-relaxed font-light ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  {details?.intro || project.description[0]}
                </p>
                {details?.overview && (
                  <p className={`text-lg md:text-xl leading-relaxed font-light ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    {details.overview}
                  </p>
                )}
              </div>
            </div>

            {/* Key Features */}
            {details?.features && (
              <div className="space-y-12">
                <h2 className="text-3xl font-black tracking-tight uppercase flex items-center gap-4">
                  <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {details.features.map((feature, idx) => (
                    <div 
                      key={idx}
                      className={`p-8 rounded-3xl border transition-all ${isDark ? 'bg-white/5 border-white/5 hover:border-pink-500/30' : 'bg-white border-black/5 shadow-xl hover:shadow-2xl'}`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6 text-pink-500">
                        {idx === 0 && <Cpu className="w-6 h-6" />}
                        {idx === 1 && <Layers className="w-6 h-6" />}
                        {idx === 2 && <Zap className="w-6 h-6" />}
                        {idx === 3 && <Shield className="w-6 h-6" />}
                        {idx === 4 && <BookOpen className="w-6 h-6" />}
                        {idx >= 5 && <CheckCircle2 className="w-6 h-6" />}
                      </div>
                      <h3 className="text-xl font-black mb-3">{feature.title}</h3>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Architecture */}
            {details?.systemArchitecture && (
              <div className="space-y-12">
                <h2 className="text-3xl font-black tracking-tight uppercase flex items-center gap-4">
                  <span className="w-8 h-1 bg-purple-500 rounded-full"></span>
                  System Architecture
                </h2>
                <div className={`p-10 rounded-[3rem] border font-mono text-sm leading-loose text-center ${isDark ? 'bg-white/5 border-white/5 text-pink-400' : 'bg-slate-900 border-black/5 text-pink-300'}`}>
                  {details.systemArchitecture.split(' → ').map((step, i, arr) => (
                    <React.Fragment key={i}>
                      <span className="inline-block px-4 py-2 rounded-xl bg-white/5 border border-white/10 my-2">{step}</span>
                      {i < arr.length - 1 && <span className="mx-4 text-white/20">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Model Details */}
            {details?.modelDetails && (
              <div className="space-y-12">
                <h2 className="text-3xl font-black tracking-tight uppercase flex items-center gap-4">
                  <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                  Model Details
                </h2>
                <div className="flex flex-wrap gap-3">
                  {details.modelDetails.map((condition, idx) => (
                    <span 
                      key={idx}
                      className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest border ${isDark ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-white border-black/5 text-slate-600 shadow-sm'}`}
                    >
                      {condition}
                    </span>
                  ))}
                </div>
                <p className={`text-sm italic ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                  * Each condition is represented as a probability value between 0 and 1, indicating the likelihood of its presence.
                </p>
              </div>
            )}

            {/* Challenges & Learnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {details?.challenges && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-black tracking-tight uppercase flex items-center gap-4">
                    Challenges
                  </h2>
                  <ul className="space-y-6">
                    {details.challenges.map((challenge, idx) => (
                      <li key={idx} className={`text-sm leading-relaxed flex gap-4 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {details?.learnings && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-black tracking-tight uppercase flex items-center gap-4">
                    What I Learned
                  </h2>
                  <ul className="space-y-6">
                    {details.learnings.map((learning, idx) => (
                      <li key={idx} className={`text-sm leading-relaxed flex gap-4 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                        <span>{learning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Outcome */}
            {details?.outcome && (
              <div className="space-y-8 pt-12 border-t border-white/10">
                <h2 className="text-3xl font-black tracking-tight uppercase">Outcome</h2>
                <p className={`text-lg leading-relaxed font-light ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  {details.outcome}
                </p>
              </div>
            )}

          </div>

          {/* Right Column: Sidebar Stats */}
          <div className="space-y-12">
            
            {/* Tech Stack Sidebar */}
            <div className={`p-10 rounded-[3rem] border sticky top-32 ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-black/5 shadow-2xl'}`}>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-10 text-pink-500">Tech Stack</h3>
              
              <div className="space-y-10">
                {(details?.techStackDetails || []).map((stack, idx) => (
                  <div key={idx} className="space-y-4">
                    <h4 className={`text-[10px] font-black uppercase tracking-widest opacity-40 ${isDark ? 'text-white' : 'text-black'}`}>
                      {stack.category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {stack.items.map((item, i) => (
                        <span key={i} className={`text-[10px] font-bold px-3 py-1.5 rounded-lg ${isDark ? 'bg-white/5 text-gray-400' : 'bg-slate-100 text-slate-600'}`}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* Fallback to main techStack if details not present */}
                {(!details?.techStackDetails || details.techStackDetails.length === 0) && (
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((item, i) => (
                      <span key={i} className={`text-[10px] font-bold px-3 py-1.5 rounded-lg ${isDark ? 'bg-white/5 text-gray-400' : 'bg-slate-100 text-slate-600'}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-12 pt-12 border-t border-white/10">
                <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-6 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Project Links</p>
                <div className="flex flex-col gap-4">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs font-bold hover:text-pink-500 transition-colors">
                      <Github className="w-4 h-4" />
                      GitHub Repository
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-xs font-bold hover:text-pink-500 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      Live Application
                    </a>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer Navigation */}
      <section className={`py-24 border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link 
            to="/projects"
            className="text-xs font-black uppercase tracking-[0.4em] hover:text-pink-500 transition-colors"
          >
            All Projects
          </Link>
          
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-pink-500"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ProjectDetail;
