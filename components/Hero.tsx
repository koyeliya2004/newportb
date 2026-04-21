
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../App';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="home" className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 ${isDark ? 'bg-black/20' : 'bg-slate-100'}`}>
      {/* Background Marquee Text */}
      <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          <h1 className={`text-[20vw] font-black leading-none tracking-tighter uppercase opacity-10 pr-20 transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'}`}>
            BHUMIKA&nbsp;
          </h1>
          <h1 className={`text-[20vw] font-black leading-none tracking-tighter uppercase opacity-10 pr-20 transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'}`}>
            BHUMIKA&nbsp;
          </h1>
        </div>
      </div>

      {/* Aesthetic Overlay Lines - Behind the picture (z-0) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-0 left-1/4 w-px h-full animate-line-v ${isDark ? 'bg-white/10' : 'bg-black/10'}`}></div>
        <div className={`absolute top-0 left-3/4 w-px h-full animate-line-v-reverse ${isDark ? 'bg-white/10' : 'bg-black/10'}`}></div>
        <div className={`absolute top-1/3 left-0 w-full h-px animate-line-h ${isDark ? 'bg-white/10' : 'bg-black/10'}`}></div>
        <div className={`absolute top-2/3 left-0 w-full h-px animate-line-h-reverse ${isDark ? 'bg-white/10' : 'bg-black/10'}`}></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Side Labels */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className={`space-y-1 font-medium transition-colors duration-500 ${isDark ? 'text-white/80' : 'text-slate-900'}`}>
            <p className="text-lg">Freelance</p>
            <p className="text-lg">Software Engineer</p>
          </div>
        </div>

        {/* Centered Image */}
        <div className="relative mx-auto group">
          <div className="relative w-[300px] h-[400px] md:w-[500px] md:h-[650px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" 
              alt="Bhumika Tewari"
              className="w-full h-full object-cover object-top grayscale hover:grayscale-0 active:grayscale-0 transition-all duration-700 ease-in-out cursor-pointer transform group-hover:scale-[1.02]"
              style={{
                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
              }}
              onClick={() => navigate('/about')}
            />
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 ${isDark ? 'bg-white/5' : 'bg-black/5'}`}></div>
          </div>
          
          <div className={`lg:hidden mt-8 text-center transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <p className="text-xl font-bold uppercase tracking-widest">Software Engineer</p>
          </div>
        </div>

        {/* Right Side / Navigation Prompt */}
        <div className="absolute right-12 bottom-12 hidden lg:block">
           <button 
             onClick={() => navigate('/about')}
             className={`flex flex-col items-center gap-4 group transition-all hover:translate-y-2 ${isDark ? 'text-white' : 'text-slate-900'}`}
           >
             <span className="text-[10px] uppercase tracking-[0.4em] font-black rotate-90 origin-left mb-12">DISCOVER MORE</span>
             <div className={`w-px h-16 transition-colors duration-500 ${isDark ? 'bg-white/20' : 'bg-black/20'}`}></div>
           </button>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes line-v {
          0% { transform: translateX(-200px); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateX(200px); opacity: 0; }
        }
        @keyframes line-h {
          0% { transform: translateY(-200px); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateY(200px); opacity: 0; }
        }
        .animate-line-v { animation: line-v 8s infinite linear; }
        .animate-line-v-reverse { animation: line-v 10s infinite linear reverse; }
        .animate-line-h { animation: line-h 7s infinite linear; }
        .animate-line-h-reverse { animation: line-h 12s infinite linear reverse; }
      `}</style>
    </section>
  );
};

export default Hero;
