import React, { useEffect, useRef, useState } from 'react';
import { SKILL_CATEGORIES, CV_DATA } from '../constants';
import WaveBackground from './WaveBackground';
import TechStack from './TechStack';
import { useTheme } from '../App';
import BlobFieldBackground from './BlobFieldBackground';

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

const ColorfulSkillIcon: React.FC<{ icon: string; index: number }> = ({ icon, index }) => {
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
      className="relative flex items-center justify-center w-16 h-16 rounded-2xl border text-xs font-black uppercase tracking-[0.25em] bg-white/5 border-white/10 text-gray-200"
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
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
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


  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const viewed = window.innerHeight - rect.top;
      const progress = Math.min(Math.max(viewed / total, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme-aware class helpers
  const bodyText = isDark ? 'text-gray-300' : 'text-slate-700';
  const headingText = isDark ? 'text-white' : 'text-slate-900';
  const cardBg = isDark ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-black/5 border-black/10 text-slate-800';
  const sectionDivider = isDark
    ? 'bg-gradient-to-r from-gray-500 via-blue-500 to-transparent opacity-30'
    : 'bg-gradient-to-r from-slate-400 via-blue-400 to-transparent opacity-40';

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`relative py-32 px-6 overflow-hidden min-h-screen transition-colors duration-500 ${
        isDark ? 'bg-black' : 'bg-[#fff8df]'
      }`}
    >
      <WaveBackground />
      <BlobFieldBackground variant="about" scrollProgress={scrollProgress} />
      <div className="absolute right-4 top-24 z-20 hidden h-[70vh] w-px md:block">
        <div className={`absolute inset-0 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
        <div
          className="absolute left-1/2 h-10 w-10 -translate-x-1/2 rounded-full border border-white/30 bg-gradient-to-br from-pink-500/70 to-blue-500/60 blur-[1px]"
          style={{ top: `calc(${scrollProgress * 100}% - 1.25rem)` }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-20" style={{ transform: `translateY(${(1 - scrollProgress) * 16}px)` }}>
        {/* Header Section with Summary */}
        <div className="relative mb-32 md:mb-52 text-left py-24 md:py-32">
          <div className="relative z-10 max-w-4xl mx-auto pl-4 md:pl-0">
            {/* Header */}
            <h2 className="text-3xl md:text-5xl font-black tracking-wide flex items-center mb-8 font-sans drop-shadow-md">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-yellow-600 mr-4">&lt;/&gt;</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500">ABOUT ME</span>
            </h2>
            
            {/* Horizontal glow line under header */}
            <div className="relative w-full md:w-[90%] h-[2px] bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 mb-16 shadow-[0_0_15px_rgba(236,72,153,0.5)]">
              <div className="absolute left-0 -top-[3px] w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_12px_#facc15]"></div>
            </div>
            
            {/* Timeline wrapper */}
            <div className="relative pl-10 md:pl-16 mt-16 font-sans">
              {/* Vertical Gradient Line */}
              <div className="absolute left-0 top-3 bottom-0 w-[2px] bg-gradient-to-b from-yellow-400 via-pink-500 to-blue-500">
                {/* Dots */}
                <div className="absolute -left-[3px] top-0 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15]"></div>
                <div className="absolute -left-[3px] top-[48%] w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]"></div>
              </div>
              
              {/* Text Blocks */}
              <div className={`mb-14 ${bodyText} text-base md:text-xl leading-relaxed md:leading-relaxed font-light transition-colors duration-500`}>
                <p>
                  I'm a developer focused on building <span className="text-pink-400 font-normal">AI-powered</span> 
                  <br className="hidden md:block"/>applications and scalable web systems. I enjoy 
                  <br className="hidden md:block"/>transforming ideas into real-world products using 
                  <br className="hidden md:block"/><span className="text-pink-400 font-normal">clean architecture</span> and <span className="text-purple-400 font-normal">modern technologies</span>.
                </p>
              </div>
              
              <div className={`mb-14 ${bodyText} text-base md:text-xl leading-relaxed md:leading-relaxed font-light transition-colors duration-500`}>
                <p>
                  My experience spans across <span className="text-purple-400 font-normal">full-stack development</span>,
                  <br className="hidden md:block"/><span className="text-pink-400 font-normal">machine learning</span>, and <span className="text-purple-400 font-normal">cloud-based systems</span> — 
                  <br className="hidden md:block"/>allowing me to design complete end-to-end
                  <br className="hidden md:block"/>solutions.
                </p>
              </div>

              {/* Terminal cursor part */}
              <div className="mt-10 text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 tracking-widest font-mono drop-shadow-md">
                &gt;_
              </div>
            </div>
          </div>
        </div>

        {/* Knowledge Matrix Section */}
        <div className="text-left mb-20 flex items-center gap-6">
          <h3 className={`text-2xl md:text-3xl font-black tracking-tight ${headingText} transition-colors duration-500`}>
            KNOWLEDGE MATRIX
          </h3>
          <div className={`h-0.5 flex-1 ${sectionDivider}`}></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          {[
            {
              title: 'Languages',
              content: 'Python, JavaScript, TypeScript, C Programming.',
              dotColor: 'bg-pink-500',
              glowColor: 'rgba(236,72,153,0.6)'
            },
            {
              title: 'Web Development',
              content: 'React.js, Next.js, Node.js, Express.js, MERN Stack, REST APIs, JWT Auth, WebSockets.',
              dotColor: 'bg-pink-500',
              glowColor: 'rgba(236,72,153,0.6)'
            },
            {
              title: 'AI/ML & LLMs',
              content: 'LangChain, Transformers, RAG Systems, TensorFlow, Llama/GPT/Gemini Models, Prompt Engineering, Machine Learning, Gen AI, NLP, GAN, FAISS, ChromaDB.',
              dotColor: 'bg-pink-500',
              glowColor: 'rgba(236,72,153,0.6)'
            },
            {
              title: 'Data Engineering & Analysis',
              content: 'ETL Pipelines, SQL, PostgreSQL, MongoDB, MySQL, Supabase, Power BI, DAX, Tableau, Apache Airflow, Data Modeling, Data Lakes and Warehousing, Incremental Loads, Vector Databases.',
              dotColor: 'bg-pink-500',
              glowColor: 'rgba(236,72,153,0.6)'
            },
            {
              title: 'Cloud & DevOps',
              content: 'AWS, Docker, Kubernetes (Basics), Git/GitHub, CI/CD Mindset.',
              dotColor: 'bg-pink-500',
              glowColor: 'rgba(236,72,153,0.6)'
            },
            {
              title: 'Tools & Frameworks',
              content: 'Flask, Redis, Prisma, Streamlit, FastAPI, Tailwind CSS, Clerk/AuthJS, n8n, Zapier.',
              dotColor: 'bg-pink-500',
              glowColor: 'rgba(236,72,153,0.6)'
            },
            {
              title: 'Project Management & Collaboration',
              content: 'Jira, Trello, Agile Practices, Stakeholder Communication.',
              dotColor: 'bg-pink-500',
              glowColor: 'rgba(236,72,153,0.6)'
            },
            {
              title: 'Soft Skills',
              content: 'Analytical Thinking, Product Thinking, Technical Mentoring, Team Collaboration, Detail-Oriented.',
              dotColor: 'bg-pink-500',
              glowColor: 'rgba(236,72,153,0.6)'
            }
          ].map((skillGroup, idx) => (
            <div
              key={skillGroup.title}
              className={`p-[1px] rounded-3xl border transition-all duration-700 transform hover:scale-[1.02] ${
                isDark
                  ? 'bg-[#1f1a18]/60 border-white/5 hover:bg-white/5 hover:border-white/20'
                  : 'bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20'
              }`}
              style={{
                opacity: 1,
                transform: 'translateY(0) scale(1)',
                transitionDelay: `${idx * 80}ms`,
              }}
            >
              <div className="bg-transparent h-full p-8 md:p-10 rounded-3xl">
                <div className="flex items-center gap-3 mb-6 relative">
                  <div className={`w-2.5 h-2.5 rounded-full ${skillGroup.dotColor}`}></div>
                  <h4 className={`text-[17px] font-black uppercase tracking-[0.25em] ${headingText} drop-shadow-md pb-0.5 transition-colors duration-500`}>
                    {skillGroup.title}
                  </h4>
                </div>
                <p className={`${bodyText} text-[16px] leading-relaxed font-normal opacity-95 transition-colors duration-500`}>
                  {skillGroup.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="mb-32">
          <div className="flex items-center gap-6 mb-12">
            <h3 className={`text-2xl md:text-3xl font-black tracking-tight ${headingText} transition-colors duration-500`}>
              EDUCATION
            </h3>
            <div className={`h-0.5 flex-1 ${sectionDivider}`}></div>
          </div>

          <div className="relative pl-6 md:pl-10">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500 via-blue-500 to-transparent opacity-40" />
            <div className="space-y-10">
              {[
                {
                  label: 'Aug 2024 – Aug 2028',
                  title: 'Bachelor of Technology (B.Tech) – Information Technology',
                  institute: 'RCC Institute of Information Technology, Kolkata'
                },
                {
                  label: 'Mar 2021 – Mar 2023',
                  title: 'ISC',
                  institute: 'St. Thomas School'
                },
                {
                  label: 'Mar 2009 – Mar 2021',
                  title: 'ICSE',
                  institute: 'St. Thomas School',
                  score: 'Score: 95%'
                }
              ].map((item, idx) => (
                <div key={item.title + item.label} className="relative flex flex-col md:flex-row gap-4 md:gap-10">
                  <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.6)] ${
                    isDark ? 'bg-slate-900' : 'bg-[#fff8df]'
                  }`}>
                    <div className="w-2 h-2 rounded-full bg-pink-500" />
                  </div>
                  <div className="md:w-56 text-xs uppercase tracking-[0.2em] font-black text-pink-500/80 pt-1">
                    {item.label}
                  </div>
                  <div
                    className={`flex-1 p-6 md:p-8 rounded-3xl border backdrop-blur-xl transition-all ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-gray-200'
                        : 'bg-black/5 border-black/10 text-slate-800'
                    }`}
                    style={{ transitionDelay: `${idx * 80}ms` }}
                  >
                    <h4 className={`text-lg md:text-xl font-black mb-2 ${headingText}`}>{item.title}</h4>
                    <p className="text-sm md:text-base font-semibold text-pink-500/70 mb-2">{item.institute}</p>
                    {item.score && <p className={`text-sm ${bodyText}`}>{item.score}</p>}
                  </div>
                </div>
              ))}

              <div className={`ml-0 md:ml-[15.5rem] mt-2 p-6 md:p-8 rounded-3xl border backdrop-blur-xl ${
                isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-black/5 border-black/10 text-slate-700'
              }`}>
                <p className="text-xs uppercase tracking-[0.2em] font-black text-pink-500/80 mb-3">Activities</p>
                <p className="text-sm md:text-base">Content Writing, Script Writing, Journalism</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Engine Tech Stack */}
        <TechStack />
      </div>

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { text-shadow: 0 0 30px rgba(236, 72, 153, 0.4); opacity: 1; }
          50% { text-shadow: 0 0 10px rgba(236, 72, 153, 0.1); opacity: 0.9; }
        }
        .animate-glow-pulse { animation: glow-pulse 5s ease-in-out infinite; }
        
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(-8px); }
          50% { transform: translateY(8px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(8px); }
          50% { transform: translateY(-12px); }
        }
        
        float-0 { animation: float-0 6s ease-in-out infinite; }
        float-1 { animation: float-1 6s ease-in-out infinite; }
        float-2 { animation: float-2 6s ease-in-out infinite; }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
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
