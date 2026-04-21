import React, { useEffect, useRef, useState } from 'react';
import { SKILL_CATEGORIES, CV_DATA } from '../constants';
import WaveBackground from './WaveBackground';
import TechStack from './TechStack';

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

  const careerRoadmap = [
    {
      label: 'Nov 2025 – Dec 2025',
      title: 'MERN Stack and AI Engineer (Teaching Assistant)',
      company: 'Stealth Startup (Ed-Tech Platform)',
      bullets: [
        'Mentored 120+ learners in MERN development, simplifying full-stack architecture, debugging workflows.',
        'Resolved 250+ frontend/backend issues and delivered 20+ sessions on APIs, routing, authentication, and schemas.',
        'Developed and trained LLM-powered chat assistants to support student queries, improving explanation accuracy.',
        'Designed AI-driven learning workflows using structured prompts and contextual retrieval to improve chatbot performance.'
      ]
    },
    {
      label: 'Feb 2025 – Oct 2025',
      title: 'SDE Intern (Full Stack)',
      company: 'Bihar Innovation',
      bullets: [
        'Developed 30+ full-stack applications using React.js, Node.js, Express.js, MongoDB, MySQL.',
        'Built 45+ REST APIs improving data flow & response time across multiple feature modules.',
        'Improved query performance by 40–60% with optimized indexing and schema-level refactors.',
        'Integrated AWS/Azure microservices & external API layers enhancing platform reliability.'
      ]
    }
  ];

  return (
    <section
      id="about"
      className="relative py-32 px-6 overflow-hidden min-h-screen"
    >
      <WaveBackground />
      
      <div className="max-w-7xl mx-auto relative z-20">
        {/* Header Section with Summary */}
        <div className="relative mb-32 md:mb-52 text-center py-24 md:py-32">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none select-none text-white">
              ABOUT <span className="text-pink-500 italic font-playfair animate-glow-pulse">ME</span>
            </h2>
            
            <div className="mt-16 max-w-4xl mx-auto px-6 text-sm md:text-lg font-medium leading-relaxed drop-shadow-sm text-gray-200">
              <p className="italic bg-black/30 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-8 rounded-[3rem] md:p-0">
                "{CV_DATA.summary}"
              </p>
            </div>
          </div>
        </div>

        {/* Knowledge Matrix Section */}
        <div className="text-left mb-20 flex items-center gap-6">
          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            KNOWLEDGE MATRIX
          </h3>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-gray-500 via-blue-500 to-transparent opacity-30"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          {[
            {
              title: 'Languages',
              content: 'Python, JavaScript, TypeScript, C Programming.'
            },
            {
              title: 'Web Development',
              content: 'React.js, Next.js, Node.js, Express.js, MERN Stack, REST APIs, JWT Auth, WebSockets.'
            },
            {
              title: 'AI/ML & LLMs',
              content: 'LangChain, Transformers, RAG Systems, TensorFlow, Llama/GPT/Gemini Models, Prompt Engineering, Machine Learning, Gen AI, NLP, GAN, FAISS, ChromaDB.'
            },
            {
              title: 'Data Engineering & Analysis',
              content: 'ETL Pipelines, SQL, PostgreSQL, MongoDB, MySQL, Supabase, Power BI, DAX, Tableau, Apache Airflow, Data Modeling, Data Lakes and Warehousing, Incremental Loads, Vector Databases.'
            },
            {
              title: 'Cloud & DevOps',
              content: 'AWS, Docker, Kubernetes (Basics), Git/GitHub, CI/CD Mindset.'
            },
            {
              title: 'Tools & Frameworks',
              content: 'Flask, Redis, Prisma, Streamlit, FastAPI, Tailwind CSS, Clerk/AuthJS, n8n, Zapier.'
            },
            {
              title: 'Project Management & Collaboration',
              content: 'Jira, Trello, Agile Practices, Stakeholder Communication.'
            },
            {
              title: 'Soft Skills',
              content: 'Analytical Thinking, Product Thinking, Technical Mentoring, Team Collaboration, Detail-Oriented.'
            }
          ].map((skillGroup, idx) => (
            <div
              key={skillGroup.title}
              className={`p-8 rounded-3xl border transition-all duration-1000 transform`}
              style={{
                opacity: 1,
                transform: 'translateY(0) scale(1)',
                transitionDelay: `${idx * 80}ms`,
              }}
            >
              <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.6)]"></div>
                  <h4 className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-white">
                    {skillGroup.title}
                  </h4>
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  {skillGroup.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Career Roadmap Section */}
        <div className="mb-32">
          <div className="flex items-center gap-6 mb-12">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              CAREER ROADMAP
            </h3>
            <div className="h-0.5 flex-1 bg-gradient-to-r from-pink-500 via-blue-500 to-transparent opacity-40"></div>
          </div>

          <div className="relative pl-6 md:pl-10">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500 via-blue-500 to-transparent opacity-40" />
            <div className="space-y-10">
              {careerRoadmap.map((step, idx) => (
                <div key={step.label} className="relative flex flex-col md:flex-row gap-4 md:gap-10">
                  <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.6)]">
                    <div className="w-2 h-2 rounded-full bg-pink-500" />
                  </div>
                  <div className="md:w-48 text-xs uppercase tracking-[0.25em] font-black text-pink-500/80 pt-1">
                    {step.label}
                  </div>
                  <div
                    className="flex-1 p-6 md:p-8 rounded-3xl border backdrop-blur-xl transition-all bg-white/5 border-white/10 text-gray-200"
                    style={{ transitionDelay: `${idx * 80}ms` }}
                  >
                    <h4 className="text-lg md:text-xl font-black mb-1">{step.title}</h4>
                    <p className="text-xs md:text-sm font-semibold text-pink-500/60 mb-4">{step.company}</p>
                    <ul className="space-y-3">
                      {step.bullets?.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="flex gap-3 text-sm md:text-base leading-relaxed opacity-80">
                          <span className="text-pink-500 font-bold mt-1 flex-shrink-0">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {/* More to Come Indicator */}
              <div className="relative flex flex-col md:flex-row gap-4 md:gap-10">
                <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.6)]">
                  <div className="w-2 h-2 rounded-full bg-pink-500" />
                </div>
                <div className="md:w-48 text-xs uppercase tracking-[0.25em] font-black text-pink-500/80 pt-1">
                  2026 →
                </div>
                <div className="flex-1 p-6 md:p-8 rounded-3xl border backdrop-blur-xl bg-white/5 border-white/10 text-gray-200 flex items-center justify-center min-h-[120px]">
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-4xl font-black text-pink-500">+</div>
                    <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">More Opportunities Coming</p>
                  </div>
                </div>
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
