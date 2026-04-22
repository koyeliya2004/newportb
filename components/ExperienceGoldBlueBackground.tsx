import React from 'react';

const ExperienceGoldBlueBackground: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(250,204,21,0.26),transparent_38%),radial-gradient(circle_at_82%_10%,rgba(59,130,246,0.25),transparent_36%),radial-gradient(circle_at_50%_78%,rgba(29,78,216,0.22),transparent_40%),linear-gradient(180deg,#020817_0%,#08112a_45%,#0a1a3d_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(250,204,21,0.06)_0%,transparent_35%,rgba(96,165,250,0.08)_65%,rgba(250,204,21,0.06)_100%)] animate-[goldBlueSweep_15s_linear_infinite]" />
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-yellow-300/25 blur-[90px] animate-[floatGold_11s_ease-in-out_infinite]" />
      <div className="absolute right-0 top-52 h-96 w-96 rounded-full bg-blue-400/25 blur-[100px] animate-[floatBlue_13s_ease-in-out_infinite]" />
      <div className="absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-amber-200/20 blur-[100px] animate-[floatGold_14s_ease-in-out_infinite_reverse]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(250,204,21,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.13)_1px,transparent_1px)] [background-size:72px_72px]" />
      <style>{`
        @keyframes floatGold {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(34px, -24px, 0) scale(1.06); }
        }
        @keyframes floatBlue {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-30px, 30px, 0) scale(1.08); }
        }
        @keyframes goldBlueSweep {
          0% { transform: translateX(-12%); opacity: 0.35; }
          50% { opacity: 0.7; }
          100% { transform: translateX(12%); opacity: 0.35; }
        }
      `}</style>
    </div>
  );
};

export default ExperienceGoldBlueBackground;
