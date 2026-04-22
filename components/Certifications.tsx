
import React from 'react';
import { CERTIFICATIONS, ACHIEVEMENTS } from '../constants';
import { useTheme } from '../App';
import CertificationWaveBackground from './CertificationWaveBackground';

const CertCard: React.FC<{ cert: any; isDark: boolean; index: number }> = ({ cert, isDark, index }) => {
  return (
    <div className={`relative p-4 md:p-5 rounded-2xl border transition-all duration-500 flex items-center gap-4 group hover:scale-[1.02] overflow-hidden ${isDark ? 'bg-white/5 border-white/5 hover:border-[#3b82f6]/40 backdrop-blur-xl' : 'bg-white/80 border-white/60 hover:border-[#3b82f6]/60 shadow-[0_20px_50px_rgba(15,23,42,0.12)]'}`}>
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#3b82f6] via-[#06b6d4] to-[#a855f7] opacity-70"></div>
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#3b82f6] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.4)]">
        <span className="text-white font-black text-[10px] md:text-[12px]">{index + 1}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h5 className={`text-[12px] md:text-[14px] font-black uppercase tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{cert.name}</h5>
      </div>
    </div>
  );
};

const AchievementCard: React.FC<{ item: any; color: string; isDark: boolean; index: number }> = ({ item, color, isDark, index }) => {
  return (
    <div 
      className={`relative p-8 md:p-10 rounded-[3rem] overflow-hidden border transition-all duration-1000 group h-full flex flex-col ${
        isDark ? 'bg-[#080808] border-white/5 hover:border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)]' : 'bg-white border-black/5 shadow-xl'
      }`}
      style={{ 
        animation: `side-float ${12 + index}s ease-in-out infinite alternate`,
        animationDelay: `${index * 0.6}s`
      }}
    >
      <div className="absolute top-0 right-0 p-8 text-current opacity-5 group-hover:opacity-10 transition-opacity" style={{ color }}>
         <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
      </div>
      
      <div className="mb-6 relative z-10">
        <div className="w-14 h-14 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-2xl" style={{ backgroundColor: color }}>
          <span className="text-white font-black text-xl">{index + 1}</span>
        </div>
        <h4 className={`text-xl md:text-2xl font-black mb-4 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
        <div className="w-20 h-1.5 rounded-full" style={{ backgroundColor: color }}></div>
      </div>
      
      <p className={`text-sm md:text-base leading-relaxed font-medium mb-8 flex-grow ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
        {item.description}
      </p>

      <div className="pt-6 border-t border-current/10 flex items-center justify-between" style={{ color }}>
        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Milestone Record</span>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-current"></div>
          <div className="w-2 h-2 rounded-full bg-current opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

const Certifications: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const achievementColors = ['#3b82f6', '#10b981', '#a855f7', '#ec4899', '#f59e0b', '#06b6d4'];

  return (
    <div className={`relative transition-colors duration-1000 ${isDark ? 'bg-black' : 'bg-white'}`}>
      
      {/* 1. STACK 1: HERO (REFINED BLUE TECH SECTION) */}
      <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center z-10 bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#1d4ed8] overflow-hidden px-6">
        <CertificationWaveBackground />

        {/* Animated Background Layers */}
        <div className="absolute inset-0 z-[1]">
          <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-white/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] bg-blue-400/20 rounded-full blur-[100px] animate-bounce-slow"></div>

          <div className="absolute inset-0 opacity-20" style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', 
            backgroundSize: '60px 60px' 
          }}></div>

          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent animate-scan-line"></div>
        </div>

        {/* HUD Elements (Professional Decals) */}
        <div className="absolute bottom-10 right-10 hidden md:block opacity-40 text-right">
           <div className="text-[10px] font-mono text-white/80 tracking-widest leading-none mb-1">VERIFIED_CREDENTIALS_SEC</div>
           <div className="w-48 h-0.5 bg-white/20 ml-auto"></div>
        </div>

        <div className="max-w-[1600px] w-full text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[0.9] uppercase select-none drop-shadow-2xl mb-4">
            PROFESSIONAL <span className="text-blue-200 italic font-playfair">CREDENTIALS</span>
          </h2>
          
          <div className="flex items-center justify-center gap-6 my-8">
            <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent to-white/40"></div>
            <h2 className="text-lg md:text-2xl font-bold text-white/70 tracking-tighter uppercase select-none">
              ACHIEVEMENTS & EXPERIENCE
            </h2>
            <div className="h-px w-12 md:w-24 bg-gradient-to-l from-transparent to-white/40"></div>
          </div>
          
          <div className="mt-12 flex justify-center gap-4">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
        
        {/* Subtle Bottom Glow */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      </section>

      {/* 2. STACK 2: CERTIFICATIONS */}
      <section className={`sticky top-0 h-screen w-full flex flex-col items-center justify-center z-20 py-10 transition-colors duration-1000 shadow-[0_-50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden ${isDark ? 'bg-[#05070f]' : 'bg-slate-50'}`}>
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-24 -left-24 w-[45vw] h-[45vw] bg-blue-500/20 rounded-full blur-[140px] animate-pulse"></div>
          <div className="absolute -bottom-28 -right-24 w-[40vw] h-[40vw] bg-cyan-400/20 rounded-full blur-[140px] animate-bounce-slow"></div>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(59,130,246,0.35) 1px, transparent 0)',
              backgroundSize: '26px 26px'
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 py-10 relative z-10">
          <div className="text-center mb-10 md:mb-12">
            <h3 className={`text-3xl md:text-5xl font-black tracking-tighter uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
              CERTIFICATIONS & TRAININGS
            </h3>
            <div className="w-28 h-1.5 bg-[#3b82f6] mx-auto mt-4 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.5)]"></div>
            <p className={`mt-4 text-sm md:text-base font-medium ${isDark ? 'text-blue-100/70' : 'text-slate-500'}`}>
              Scroll to explore verified credentials and training milestones.
            </p>
          </div>

          <div
            className={`cert-scroll max-h-[70vh] overflow-y-auto rounded-[2.75rem] border px-5 md:px-8 py-8 md:py-10 ${isDark ? 'bg-white/5 border-white/10 backdrop-blur-2xl' : 'bg-white/80 border-white/60 shadow-[0_30px_80px_rgba(15,23,42,0.12)]'}`}
            style={{
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)'
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto text-left">
              {CERTIFICATIONS.map((cert, idx) => (
                <CertCard key={idx} cert={cert} index={idx} isDark={isDark} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. STACK 3: ACHIEVEMENTS & ACTIVITIES */}
      <section className={`sticky top-0 h-screen w-full flex flex-col items-center justify-center z-30 py-10 transition-colors duration-1000 shadow-[0_-50px_100px_rgba(0,0,0,0.5)] ${isDark ? 'bg-[#050505]' : 'bg-white'}`}>
        <div className="max-w-[1800px] w-full px-6 overflow-y-auto max-h-[85vh] py-10">
          <div className="text-center mb-12 md:mb-20">
            <h3 className={`text-3xl md:text-5xl font-black tracking-tighter leading-none uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ACHIEVEMENTS <br className="hidden md:block" /> & <span className="text-[#3b82f6] italic font-playfair glow-blue">ACTIVITIES</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {ACHIEVEMENTS.map((item, idx) => (
              <AchievementCard 
                key={idx} 
                item={item} 
                index={idx}
                color={achievementColors[idx % achievementColors.length]} 
                isDark={isDark} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Spacer for final section accessibility */}
      <div className="h-[20vh] bg-transparent pointer-events-none"></div>

      <style>{`
        @keyframes side-float {
          from { transform: translateX(-15px) rotate(-0.5deg); }
          to { transform: translateX(15px) rotate(0.5deg); }
        }
        @keyframes scan-line {
          0% { transform: translate3d(0, -100px, 0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate3d(0, 100vh, 0); opacity: 0; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-30px, 40px, 0); }
        }
        .animate-scan-line {
          animation: scan-line 6s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 15s ease-in-out infinite;
        }
        .glow-blue {
          text-shadow: 0 0 50px rgba(59, 130, 246, 0.3);
        }
        .cert-scroll {
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: rgba(59, 130, 246, 0.65) transparent;
        }
        .cert-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .cert-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .cert-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(59, 130, 246, 0.9), rgba(6, 182, 212, 0.8), rgba(168, 85, 247, 0.9));
          border-radius: 999px;
        }
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        section.sticky {
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default Certifications;
