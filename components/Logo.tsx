import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#eab308" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <path
      d="M50 15 L75 35 L50 85 L25 35 Z"
      stroke="url(#logo-gradient)"
      strokeWidth="5"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="transparent"
    />
    <path
      d="M50 15 L50 85"
      stroke="url(#logo-gradient)"
      strokeWidth="5"
      strokeLinecap="round"
    />
    {/* Left bracket < */}
    <path
      d="M40 45 L32 50 L40 55"
      stroke="url(#logo-gradient)"
      strokeWidth="5"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    {/* Right bracket > */}
    <path
      d="M60 45 L68 50 L60 55"
      stroke="url(#logo-gradient)"
      strokeWidth="5"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <circle cx="50" cy="72" r="4" fill="#000" stroke="url(#logo-gradient)" strokeWidth="3" />
  </svg>
);
