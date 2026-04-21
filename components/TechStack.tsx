import React, { useEffect, useRef, useState } from 'react';

const useScrollReveal = () => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isActive };
};

const useParallaxScroll = () => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const offset = (elementCenter - viewportCenter) * 0.1;
        setOffset(offset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, offset };
};

const TechStack: React.FC = () => {
  const { ref, isActive } = useScrollReveal();
  const { ref: parallaxRef, offset } = useParallaxScroll();

  const stack = [
    // Row 1
    { name: 'PY', color: '#3776AB', logo: 'https://cdn.simpleicons.org/python/3776AB' },
    { name: 'JS', color: '#F7DF1E', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
    { name: 'TS', color: '#3178C6', logo: 'https://cdn.simpleicons.org/typescript/3178C6' },
    { name: 'C', color: '#A8B9CC', logo: 'https://cdn.simpleicons.org/c/A8B9CC' },
    { name: 'REACT', color: '#61DAFB', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
    { name: 'NEXTJS', color: '#FFFFFF', logo: 'https://cdn.simpleicons.org/nextdotjs/white' },
    { name: 'NODEJS', color: '#339933', logo: 'https://cdn.simpleicons.org/nodedotjs/339933' },
    { name: 'EXPRESS', color: '#FFFFFF', logo: 'https://cdn.simpleicons.org/express/white' },
    { name: 'MONGODB', color: '#47A248', logo: 'https://cdn.simpleicons.org/mongodb/47A248' },
    { name: 'MYSQL', color: '#4479A1', logo: 'https://cdn.simpleicons.org/mysql/4479A1' },
    { name: 'POSTGRES', color: '#4169E1', logo: 'https://cdn.simpleicons.org/postgresql/4169E1' },
    { name: 'SUPABASE', color: '#3ECF8E', logo: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
    
    // Row 2
    { name: 'AWS', color: '#FF9900', logo: 'https://cdn.simpleicons.org/amazonaws/FF9900' },
    { name: 'DOCKER', color: '#2496ED', logo: 'https://cdn.simpleicons.org/docker/2496ED' },
    { name: 'KUBERNETES', color: '#326CE5', logo: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
    { name: 'GIT', color: '#F05032', logo: 'https://cdn.simpleicons.org/git/F05032' },
    { name: 'GITHUB', color: '#FFFFFF', logo: 'https://cdn.simpleicons.org/github/white' },
    { name: 'FLASK', color: '#FFFFFF', logo: 'https://cdn.simpleicons.org/flask/white' },
    { name: 'REDIS', color: '#DC382D', logo: 'https://cdn.simpleicons.org/redis/DC382D' },
    { name: 'PRISMA', color: '#FFFFFF', logo: 'https://cdn.simpleicons.org/prisma/white' },
    { name: 'TAILWIND', color: '#06B6D4', logo: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
    { name: 'CSS', color: '#1572B6', logo: 'https://cdn.simpleicons.org/css3/1572B6' },
    { name: 'HTML', color: '#E34F26', logo: 'https://cdn.simpleicons.org/html5/E34F26' },
    { name: 'FIGMA', color: '#F24E1E', logo: 'https://cdn.simpleicons.org/figma/F24E1E' },

    // Row 3
    { name: 'NOTION', color: '#FFFFFF', logo: 'https://cdn.simpleicons.org/notion/white' },
    { name: 'MD', color: '#FFFFFF', logo: 'https://cdn.simpleicons.org/markdown/white' },
    { name: 'LINUX', color: '#FCC624', logo: 'https://cdn.simpleicons.org/linux/FCC624' },
    { name: 'FASTAPI', color: '#05998B', logo: 'https://cdn.simpleicons.org/fastapi/05998B' },
    { name: 'POSTMAN', color: '#FF6C37', logo: 'https://cdn.simpleicons.org/postman/FF6C37' },
    { name: 'TENSORFLOW', color: '#FF6F00', logo: 'https://cdn.simpleicons.org/tensorflow/FF6F00' },
    { name: 'SCIKIT LEARN', color: '#F7931E', logo: 'https://cdn.simpleicons.org/scikitlearn/F7931E' },
  ];

  return (
    <div 
      ref={ref}
      className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-yellow-500/5 blur-[120px]" />
        {/* Animated Waves */}
        <svg className="absolute w-full h-full opacity-10" viewBox="0 0 1440 800" preserveAspectRatio="none">
          <path d="M0,400 Q360,200 720,400 T1440,400" stroke="#FFD700" fill="none" strokeWidth="1" className="animate-pulse" />
          <path d="M0,500 Q360,300 720,500 T1440,500" stroke="#FFD700" fill="none" strokeWidth="0.5" />
        </svg>
      </div>

      <div 
        ref={parallaxRef}
        className="relative z-10 w-full max-w-6xl mx-auto transition-transform duration-300 ease-out"
        style={{
          transform: isActive ? `translateY(${offset}px)` : 'translateY(100px)',
          opacity: isActive ? 1 : 0,
        }}
      >
        {/* Section Title */}
        <div className="flex items-center gap-6 mb-16 md:mb-20">
          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase">
            DEVELOPER ECOSYSTEM
          </h3>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-yellow-500/50 via-yellow-400 to-transparent opacity-50"></div>
        </div>

        {/* Tech Stack Grid */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-10 md:gap-x-10 md:gap-y-14">
          {stack.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center group cursor-pointer"
              style={{
                animation: isActive ? `slideIn 0.6s ease-out ${index * 0.03}s forwards` : 'none',
                opacity: 0,
              }}
            >
              {/* Icon Container */}
              <div 
                className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-[20px] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] border border-white/10 bg-[#161616] group-hover:scale-110 group-hover:border-white/30"
                style={{
                  boxShadow: `0 0 20px -8px ${item.color}88`,
                }}
              >
                {/* Background Shadow/Glow (Visible on hover) */}
                <div 
                  className="absolute inset-0 rounded-[20px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-xl"
                  style={{ backgroundColor: item.color }}
                />
                
                {/* Logo Image */}
                <img 
                  src={item.logo} 
                  alt={item.name}
                  className="w-8 h-8 md:w-10 md:h-10 relative z-10 transition-transform duration-500 group-hover:scale-110"
                  style={{ filter: `drop-shadow(0 0 8px ${item.color}66)` }}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const nextSibling = target.nextSibling as HTMLElement;
                    if (nextSibling) nextSibling.style.display = 'block';
                  }}
                />

                {/* Fallback Label if Image Fails */}
                <span className="hidden relative z-10 text-xs font-bold" style={{ color: item.color }}>
                  {item.name}
                </span>

                {/* Subtle outer ring */}
                <div 
                  className="absolute inset-[-1px] rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ border: `1.5px solid ${item.color}44` }}
                />
              </div>

              {/* Label */}
              <span className="mt-4 text-[10px] md:text-[11px] font-black tracking-[0.2em] text-gray-500 group-hover:text-white transition-all duration-300 uppercase">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
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

        @keyframes subtle-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
};

export default TechStack;
