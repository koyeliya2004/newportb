import React from 'react';

type BlobFieldBackgroundProps = {
  variant: 'about' | 'experience';
  scrollProgress: number;
};

const blobPalettes = {
  about: [
    'from-fuchsia-500/35 via-pink-400/20 to-transparent',
    'from-sky-500/30 via-blue-400/15 to-transparent',
    'from-amber-400/35 via-yellow-300/20 to-transparent',
  ],
  experience: [
    'from-blue-500/35 via-cyan-400/20 to-transparent',
    'from-amber-400/30 via-orange-300/20 to-transparent',
    'from-violet-500/30 via-indigo-400/20 to-transparent',
  ],
};

const BlobFieldBackground: React.FC<BlobFieldBackgroundProps> = ({ variant, scrollProgress }) => {
  const palette = blobPalettes[variant];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-gradient-to-br blur-3xl animate-blob-drift"
        style={{
          opacity: 0.65,
          transform: `translate3d(${scrollProgress * 24}px, ${scrollProgress * -18}px, 0) scale(${1 + scrollProgress * 0.08})`,
        }}
      >
        <div className={`h-full w-full rounded-full bg-gradient-to-br ${palette[0]}`} />
      </div>
      <div
        className="absolute right-[-8rem] top-[36%] h-96 w-96 rounded-full bg-gradient-to-br blur-3xl animate-blob-drift-reverse"
        style={{
          opacity: 0.55,
          transform: `translate3d(${scrollProgress * -28}px, ${scrollProgress * 20}px, 0) scale(${1 + scrollProgress * 0.1})`,
        }}
      >
        <div className={`h-full w-full rounded-full bg-gradient-to-br ${palette[1]}`} />
      </div>
      <div
        className="absolute left-1/3 bottom-[-8rem] h-[26rem] w-[26rem] rounded-full bg-gradient-to-br blur-3xl animate-blob-pulse"
        style={{
          opacity: 0.45,
          transform: `translate3d(${scrollProgress * 12}px, ${scrollProgress * -24}px, 0) scale(${1 + scrollProgress * 0.12})`,
        }}
      >
        <div className={`h-full w-full rounded-full bg-gradient-to-br ${palette[2]}`} />
      </div>

      <style>{`
        @keyframes blob-drift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(30px, -24px, 0) scale(1.08); }
        }

        @keyframes blob-drift-reverse {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-34px, 28px, 0) scale(1.1); }
        }

        @keyframes blob-pulse {
          0%, 100% { transform: scale(1); opacity: 0.45; }
          50% { transform: scale(1.12); opacity: 0.6; }
        }

        .animate-blob-drift {
          animation: blob-drift 13s ease-in-out infinite;
        }

        .animate-blob-drift-reverse {
          animation: blob-drift-reverse 15s ease-in-out infinite;
        }

        .animate-blob-pulse {
          animation: blob-pulse 11s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BlobFieldBackground;
