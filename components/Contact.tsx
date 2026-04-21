import React, { useEffect, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ChevronRight,
  Lock,
  MessageCircle,
} from 'lucide-react';

const CV_DATA = {
  name: 'Bhumika',
  email: 'bhumikatewariit@gmail.com',
  phone: '+91 8420399560',
  location: 'Kolkata, India',
  links: {
    github: 'https://github.com/Bhumika2006-hue',
    linkedin: 'https://www.linkedin.com/in/bhumika',
    whatsapp: 'https://wa.me/918420399560',
  },
};

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface StarType {
  x: number;
  y: number;
  size: number;
  opacity: number;
  blink: number;
}

const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    const particles: ParticleClass[] = [];
    const stars: StarType[] = [];

    const colors: Record<string, RGB> = {
      gold: { r: 251, g: 191, b: 36 },
      blue: { r: 59, g: 130, b: 246 },
      purple: { r: 168, g: 85, b: 247 },
      magenta: { r: 217, g: 70, b: 239 },
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class ParticleClass {
      type: string;
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speed: number = 0;
      angle: number = 0;
      opacity: number = 0;
      color: RGB = { r: 255, g: 255, b: 255 };

      constructor(type = 'flow') {
        this.type = type;
        this.reset(type);
      }

      reset(type: string) {
        this.type = type;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.5 + 0.2;
        this.angle = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.5 + 0.2;

        if (this.x < canvas.width * 0.4 && this.y < canvas.height * 0.4) {
          this.color = colors.gold;
        } else if (this.x > canvas.width * 0.6 && this.y > canvas.height * 0.6) {
          this.color = colors.purple;
        } else if (this.x < canvas.width * 0.4 && this.y > canvas.height * 0.6) {
          this.color = colors.blue;
        } else {
          this.color = { r: 100, g: 100, b: 255 };
        }
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.angle += 0.01;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset(this.type);
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.fill();
        if (this.size > 1.5) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.5)`;
        } else {
          ctx.shadowBlur = 0;
        }
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < 150; i++) particles.push(new ParticleClass('flow'));
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.2,
          opacity: Math.random(),
          blink: Math.random() * 0.02,
        });
      }
    };

    const drawNetworks = () => {
      if (!ctx) return;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = (1 - distance / 100) * 0.15;
            ctx.strokeStyle = `rgba(${particles[i].color.r}, ${particles[i].color.g}, ${particles[i].color.b}, ${opacity})`;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0;

      stars.forEach((star) => {
        star.opacity += star.blink;
        if (star.opacity > 1 || star.opacity < 0.2) star.blink *= -1;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.5})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });

      ctx.save();
      ctx.filter = 'blur(40px)';

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.15)';
      ctx.lineWidth = 100;
      ctx.moveTo(-100, 300);
      ctx.bezierCurveTo(200, 400, 400, 100, 600, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(217, 70, 239, 0.15)';
      ctx.lineWidth = 120;
      ctx.moveTo(canvas.width + 100, canvas.height - 200);
      ctx.bezierCurveTo(
        canvas.width - 300, canvas.height - 400,
        canvas.width - 500, canvas.height,
        canvas.width - 800, canvas.height + 100
      );
      ctx.stroke();

      ctx.restore();

      drawNetworks();
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 bg-[#020205]" />;
};

interface ContactCardProps {
  ref_id: string;
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  colorClass: string;
  borderGlow: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  ref_id,
  title,
  value,
  description,
  icon: Icon,
  colorClass,
  borderGlow,
}) => (
  <div
    className={`relative group p-10 rounded-[32px] bg-black/40 border border-white/10 backdrop-blur-2xl transition-all duration-700 hover:-translate-y-4 hover:border-white/25 ${borderGlow}`}
  >
    <div className="absolute top-8 left-1/2 -translate-x-1/2">
      <span className="text-[10px] tracking-[0.4em] text-gray-500 font-bold uppercase">{ref_id}</span>
    </div>

    <div className="mt-10 mb-8 flex justify-center">
      <div
        className={`relative p-5 rounded-full border border-white/10 ${colorClass} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
      >
        <Icon size={32} className="relative z-10" />
        <div
          className={`absolute inset-0 rounded-full blur-2xl opacity-40 group-hover:opacity-80 transition-opacity ${colorClass.split(' ')[0]}`}
        ></div>
      </div>
    </div>

    <div className="text-center">
      <h3 className="text-xs tracking-[0.4em] font-black text-white/90 mb-6 uppercase">{title}</h3>
      <div className="w-10 h-[1px] bg-white/10 mx-auto mb-6 group-hover:w-20 group-hover:bg-white/30 transition-all duration-700"></div>
      <p className="text-xl font-semibold text-white mb-3 tracking-tight">{value}</p>
      <p className="text-sm text-gray-400 leading-relaxed font-light">{description}</p>
    </div>
  </div>
);

interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    className="flex items-center gap-4 text-gray-500 hover:text-white transition-all duration-700 group"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 group-hover:-translate-y-2 group-hover:shadow-[0_10px_20px_-5px_rgba(59,130,246,0.2)] transition-all duration-700">
      <Icon size={24} />
    </div>
    <span className="text-[10px] font-black tracking-[0.3em] hidden lg:inline uppercase">{label}</span>
  </a>
);

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020205] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden relative">
      <CosmicBackground />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-24 space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-amber-400/20 bg-amber-400/5 backdrop-blur-md">
            <Lock size={14} className="text-amber-400" />
            <span className="text-[11px] font-black tracking-[0.4em] text-amber-400 uppercase">
              Secure Communication
            </span>
          </div>

          <h1 className="text-7xl md:text-9xl font-serif tracking-tighter leading-none">
            Let&apos;s{' '}
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Connect
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            Available for high-impact roles in{' '}
            <span className="text-white border-b border-white/20">AI Systems</span>,{' '}
            <br className="hidden md:block" />
            <span className="text-white border-b border-white/20">Full-Stack Dev</span>, and{' '}
            <span className="text-white border-b border-white/20">Data Pipelines</span>.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16">
          <ContactCard
            ref_id="REF_01"
            title="Email"
            value={CV_DATA.email}
            description="Drop me an email anytime, I'll get back to you within 24 hours."
            icon={Mail}
            colorClass="text-amber-400 border-amber-400/20 bg-amber-400/5"
            borderGlow="hover:shadow-[0_0_60px_-15px_rgba(251,191,36,0.3)]"
          />
          <ContactCard
            ref_id="REF_02"
            title="Phone"
            value={CV_DATA.phone}
            description="Available for voice calls and technical discussions."
            icon={Phone}
            colorClass="text-blue-400 border-blue-400/20 bg-blue-400/5"
            borderGlow="hover:shadow-[0_0_60px_-15px_rgba(59,130,246,0.3)]"
          />
          <ContactCard
            ref_id="REF_03"
            title="Location"
            value={CV_DATA.location}
            description="Remote-first professional based in West Bengal, India."
            icon={MapPin}
            colorClass="text-purple-400 border-purple-400/20 bg-purple-400/5"
            borderGlow="hover:shadow-[0_0_60px_-15px_rgba(168,85,247,0.3)]"
          />
        </div>

        {/* WhatsApp Channel */}
        <a
          href={CV_DATA.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full group max-w-4xl"
        >
          <div className="relative p-[1px] rounded-[40px] overflow-hidden mb-20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-amber-500 opacity-20 group-hover:opacity-100 transition-opacity duration-1000 animate-gradient-xy"></div>

            <div className="relative bg-[#05050a]/90 rounded-[39px] px-10 py-8 flex flex-col md:flex-row items-center justify-between backdrop-blur-3xl">
              <div className="flex items-center gap-10 mb-6 md:mb-0">
                <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-[0_0_30px_rgba(139,92,246,0.3)] group-hover:scale-110 transition-transform duration-700">
                  <MessageCircle size={32} className="text-white fill-white/10" />
                </div>
                <div>
                  <span className="text-[11px] tracking-[0.4em] font-black text-purple-400 uppercase">
                    Preferred Channel
                  </span>
                  <h4 className="text-3xl font-bold text-white mt-2">Chat on WhatsApp</h4>
                  <p className="text-gray-400 mt-2 font-light text-lg">
                    Instant communication for project ideas.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all duration-700 group-hover:rotate-90">
                <ChevronRight className="text-white" size={32} />
              </div>
            </div>
          </div>
        </a>

        {/* Footer Navigation */}
        <footer className="w-full max-w-4xl px-12 py-10 rounded-[50px] border border-white/5 bg-white/[0.02] backdrop-blur-3xl flex flex-col md:flex-row items-center justify-between gap-10">
          <p className="text-lg font-light text-gray-400 tracking-tight">
            Let&apos;s build something{' '}
            <span className="italic text-amber-400 font-medium">extraordinary</span>.
          </p>

          <div className="hidden md:block h-10 w-[1px] bg-white/10"></div>

          <div className="flex items-center gap-12">
            <SocialLink href={CV_DATA.links.github} icon={Github} label="GitHub" />
            <SocialLink href={CV_DATA.links.linkedin} icon={Linkedin} label="LinkedIn" />
            <SocialLink href={`mailto:${CV_DATA.email}`} icon={Mail} label="Email" />
          </div>
        </footer>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200;0,400;0,700;1,200;1,400&family=Plus+Jakarta+Sans:wght@200;400;600;800&display=swap');
        
        :root { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Crimson Pro', serif; }

        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 12s ease infinite;
        }

        .animate-fade-in {
          animation: fadeIn 2s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `,
        }}
      />
    </div>
  );
};

export default Contact;
