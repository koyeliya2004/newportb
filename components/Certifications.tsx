
import React from 'react';
import { CERTIFICATIONS, ACHIEVEMENTS } from '../constants';
import { useTheme } from '../App';

const Certifications: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="certifications" className={`py-32 px-6 transition-colors duration-500 min-h-screen ${isDark ? 'bg-black' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-24 text-center">
          <p className="text-pink-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4">Credentials</p>
          <h2 className={`text-5xl md:text-8xl font-black tracking-tighter transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
            VERIFIED <span className="text-blue-500 italic font-playfair">EXCELLENCE</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-pink-500 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Certifications Grid */}
        <div className="mb-40">
           <div className="flex items-center gap-4 mb-12">
              <h3 className={`text-2xl font-black uppercase tracking-widest ${isDark ? 'text-white/80' : 'text-slate-800'}`}>Professional Certifications</h3>
              <div className={`flex-grow h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`}></div>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <div 
                key={idx} 
                className={`group p-8 border relative overflow-hidden flex flex-col items-center text-center transition-all duration-500 rounded-3xl ${
                  isDark 
                  ? 'bg-[#0a0a0a] border-white/5 hover:border-blue-500/50 hover:bg-[#111]' 
                  : 'bg-white border-black/5 hover:shadow-2xl shadow-sm hover:border-blue-500/30'
                }`}
              >
                {/* Glow Effect */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/5 blur-[40px] rounded-full group-hover:opacity-100 opacity-0 transition-opacity"></div>
                
                <div className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                   <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04m17.236 0a11.952 11.952 0 00-6.831 12.407l.005.058a.996.996 0 001.978 0l.005-.058a11.952 11.952 0 00-6.831-12.407"></path>
                   </svg>
                </div>
                <p className={`text-sm md:text-base font-bold leading-tight transition-colors ${isDark ? 'text-white' : 'text-slate-800'}`}>{cert.name}</p>
                
                {/* Visual Accent */}
                <div className="mt-auto pt-6">
                   <div className="w-8 h-1 bg-blue-500/20 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements & Activities Section */}
        <div>
           <div className="flex items-center gap-4 mb-12">
              <h3 className={`text-2xl font-black uppercase tracking-widest ${isDark ? 'text-white/80' : 'text-slate-800'}`}>Achievements & Activities</h3>
              <div className={`flex-grow h-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`}></div>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ACHIEVEMENTS.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`group relative p-10 rounded-[2.5rem] border backdrop-blur-md transition-all duration-700 hover:-translate-y-2 ${
                    isDark 
                    ? 'bg-black/40 border-white/5 hover:border-pink-500/20' 
                    : 'bg-white border-black/5 shadow-xl hover:shadow-2xl'
                  }`}
                >
                  {/* Decorative Gradient Blob */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: '#EC4899' }}></div>
                  
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0">
                       <span className="text-pink-500 text-xs font-black">0{idx + 1}</span>
                    </div>
                    <h4 className={`text-xl font-black leading-tight transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h4>
                  </div>
                  
                  <div className={`h-px w-12 mb-6 transition-all duration-500 group-hover:w-full ${isDark ? 'bg-white/10' : 'bg-black/10'}`}></div>
                  
                  <p className={`text-sm leading-relaxed font-medium transition-colors ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                    {item.description}
                  </p>
                  
                  {/* Bottom Icon Mark */}
                  <div className="absolute bottom-8 right-8 text-pink-500/10 transition-transform duration-700 group-hover:scale-125 group-hover:rotate-12">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};

export default Certifications;
