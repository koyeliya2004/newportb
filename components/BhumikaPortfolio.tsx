import React, { useEffect, useRef } from 'react';

const BhumikaPortfolio: React.FC = () => {
  const heatmapRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Initialize heatmap
    if (heatmapRef.current) {
      const grid = heatmapRef.current;
      grid.innerHTML = '';
      for (let i = 0; i < 182; i++) {
        const cell = document.createElement('div');
        const r = Math.random();
        const cls = r < 0.38 ? '' : r < 0.55 ? ' l1' : r < 0.72 ? ' l2' : r < 0.86 ? ' l3' : ' l4';
        cell.className = 'hm-cell' + cls;
        grid.appendChild(cell);
      }
    }

    // Initialize graph
    if (graphRef.current) {
      const canvas = graphRef.current;
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.parentElement?.offsetWidth || 0;
      const H = canvas.parentElement?.offsetHeight || 0;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.scale(dpr, dpr);
      const days = [26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      const vals = [5, 55, 60, 40, 50, 42, 65, 70, 75, 80, 88, 50, 30, 100, 40, 110, 75, 40, 60, 45, 38];
      const pad = { l: 34, r: 14, t: 12, b: 36 };
      const cW = W - pad.l - pad.r,
        cH = H - pad.t - pad.b,
        maxV = 120;
      const xOf = (i: number) => pad.l + (i / (days.length - 1)) * cW;
      const yOf = (v: number) => pad.t + cH - (v / maxV) * cH;

      ctx.strokeStyle = 'rgba(245,200,66,0.07)';
      ctx.lineWidth = 1;
      [0, 40, 80, 120].forEach((v) => {
        ctx.beginPath();
        ctx.moveTo(pad.l, yOf(v));
        ctx.lineTo(pad.l + cW, yOf(v));
        ctx.stroke();
        ctx.fillStyle = 'rgba(245,200,66,0.38)';
        ctx.font = '10px Raleway,sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(v.toString(), pad.l - 6, yOf(v) + 4);
      });

      const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + cH);
      grad.addColorStop(0, 'rgba(245,200,66,0.26)');
      grad.addColorStop(1, 'rgba(245,200,66,0)');
      ctx.beginPath();
      ctx.moveTo(xOf(0), yOf(vals[0]));
      vals.forEach((v, i) => {
        if (!i) return;
        const cx = (xOf(i - 1) + xOf(i)) / 2;
        ctx.bezierCurveTo(cx, yOf(vals[i - 1]), cx, yOf(v), xOf(i), yOf(v));
      });
      ctx.lineTo(xOf(vals.length - 1), yOf(0));
      ctx.lineTo(xOf(0), yOf(0));
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(xOf(0), yOf(vals[0]));
      vals.forEach((v, i) => {
        if (!i) return;
        const cx = (xOf(i - 1) + xOf(i)) / 2;
        ctx.bezierCurveTo(cx, yOf(vals[i - 1]), cx, yOf(v), xOf(i), yOf(v));
      });
      ctx.strokeStyle = '#f5c842';
      ctx.lineWidth = 2.2;
      ctx.stroke();

      vals.forEach((v, i) => {
        const x = xOf(i),
          y = yOf(v);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#f5c842';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#080808';
        ctx.fill();
        ctx.fillStyle = 'rgba(245,200,66,0.42)';
        ctx.font = '9px Raleway,sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(days[i].toString(), x, pad.t + cH + 16);
      });
      ctx.fillStyle = 'rgba(245,200,66,0.42)';
      ctx.font = '10px Raleway,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Days', pad.l + cW / 2, pad.t + cH + 30);
    }
  }, []);

  return (
    <div className="bg-[#080808] text-white font-sans overflow-x-hidden">
      <style>{`
        :root {
          --gold: #f5c842;
          --gold-dim: #a8860c;
          --purple: #7c3aed;
          --pink: #ec4899;
          --blue: #3b82f6;
          --grad: linear-gradient(135deg, #ec4899, #7c3aed, #3b82f6);
          --bg: #080808;
          --card: #111;
          --card2: #141414;
          --border: rgba(245, 200, 66, 0.15);
          --text: #e8e0c8;
          --muted: #6b6355;
        }

        .bhumika-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          padding: 28px 20px 40px;
          display: grid;
          gap: 18px;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 12px rgba(245, 200, 66, 0.5)); }
          50% { filter: drop-shadow(0 0 25px rgba(245, 200, 66, 0.8)); }
        }

        .globe {
          width: 200px;
          height: 200px;
          animation: float 6s ease-in-out infinite;
        }

        .globe svg {
          width: 100%;
          height: 100%;
        }

        .brand {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .logo-wrap {
          animation: glow-pulse 4s ease-in-out infinite;
        }

        .logo-wrap svg {
          width: 250px;
        }

        .brand-name {
          font-family: 'Cinzel', serif;
          font-size: 2.1rem;
          letter-spacing: 0.12em;
          line-height: 1.1;
        }

        .brand-name .first {
          color: var(--text);
          font-weight: 600;
        }

        .brand-name .last {
          color: var(--gold);
          font-weight: 900;
        }

        .brand-title {
          font-size: 0.72rem;
          letter-spacing: 0.35em;
          color: var(--muted);
          text-transform: uppercase;
        }

        .tagline {
          display: flex;
          gap: 14px;
          align-items: center;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          color: var(--muted);
          margin-top: 4px;
        }

        .tagline span {
          color: var(--gold);
          font-size: 0.6rem;
        }

        .hero {
          display: grid;
          grid-template-columns: 200px 1fr 180px;
          align-items: center;
          min-height: 220px;
          position: relative;
          overflow: hidden;
        }

        .hero-status {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          overflow: hidden;
        }

        .hero-status::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--gold);
          animation: scan 3s linear infinite;
          opacity: 0.3;
        }

        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }

        .status-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .status-label {
          font-size: 0.55rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
        }

        .status-value {
          font-family: 'Fira Code', monospace;
          font-size: 0.7rem;
          color: var(--gold);
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.65rem;
          color: var(--gold);
          font-weight: 700;
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          background: var(--gold);
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(245, 200, 66, 0.7); }
          70% { box-shadow: 0 0 0 8px rgba(245, 200, 66, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 200, 66, 0); }
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 340px 1fr;
          gap: 18px;
        }

        .card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
          transition: border-color 0.3s;
        }

        .card:hover {
          border-color: rgba(245, 200, 66, 0.38);
        }

        .heatmap-months {
          display: flex;
          gap: 0;
          margin-bottom: 8px;
          font-size: 0.65rem;
          color: var(--muted);
          letter-spacing: 0.04em;
        }

        .heatmap-months span {
          flex: 1;
        }

        .heatmap-grid {
          display: grid;
          grid-template-columns: repeat(26, 1fr);
          gap: 3px;
          margin-bottom: 14px;
        }

        .hm-cell {
          aspect-ratio: 1;
          border-radius: 2px;
          background: #161b22;
          transition: transform 0.15s, filter 0.15s;
          cursor: default;
        }

        .hm-cell:hover {
          transform: scale(1.5);
          filter: brightness(1.4);
        }

        .hm-cell.l1 { background: #0e4429; }
        .hm-cell.l2 { background: #006d32; }
        .hm-cell.l3 { background: #26a641; }
        .hm-cell.l4 { background: #39d353; }

        .contrib-count {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--gold);
          display: inline;
          margin-right: 6px;
        }

        .contrib-label {
          font-size: 0.78rem;
          color: var(--muted);
        }

        .gh-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 14px;
        }

        .gh-icon {
          width: 28px;
          height: 28px;
          background: var(--card2);
          border-radius: 50%;
          display: grid;
          place-items: center;
          border: 1px solid var(--border);
        }

        .gh-footer a {
          font-size: 0.78rem;
          color: var(--gold);
          text-decoration: none;
          opacity: 0.85;
          transition: opacity 0.2s;
        }

        .gh-footer a:hover {
          opacity: 1;
          text-decoration: underline;
        }

        .graph-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
        }

        .graph-card:hover {
          border-color: rgba(245, 200, 66, 0.38);
        }

        .graph-title {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          color: var(--gold);
          text-align: center;
          margin-bottom: 16px;
          letter-spacing: 0.06em;
        }

        .chart-wrap {
          position: relative;
          height: 160px;
        }

        .grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 18px;
        }

        .icons-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .icon-box {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: var(--card2);
          border: 1px solid var(--border);
          display: grid;
          place-items: center;
          font-size: 1.1rem;
          transition: background 0.3s, border-color 0.3s;
        }

        .icon-box.active {
          background: rgba(245, 200, 66, 0.1);
          border-color: var(--gold);
        }

        .icon-connector {
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, var(--border), rgba(245, 200, 66, 0.3), var(--border));
        }

        .card-heading {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 8px;
        }

        .card-heading em {
          font-style: italic;
          color: var(--gold);
        }

        .card-body {
          font-size: 0.78rem;
          color: var(--muted);
          line-height: 1.65;
        }

        .collab-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--card2);
          border: 1px solid var(--border);
          display: grid;
          place-items: center;
          margin-bottom: 14px;
        }

        .collab-heading {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 8px;
        }

        .collab-heading em {
          color: var(--gold);
          font-style: italic;
          font-family: 'Dancing Script', cursive;
          font-size: 1.3rem;
        }

        .skills-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
          overflow: hidden;
          position: relative;
          transition: border-color 0.3s;
        }

        .skills-card:hover {
          border-color: rgba(245, 200, 66, 0.4);
        }

        .skills-title {
          font-family: 'Cinzel', serif;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          color: var(--gold);
          margin-bottom: 16px;
          text-transform: uppercase;
        }

        .skill-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .skill-label {
          font-family: 'Fira Code', monospace;
          font-size: 0.68rem;
          color: var(--muted);
          width: 54px;
          flex-shrink: 0;
        }

        .skill-bar-bg {
          flex: 1;
          height: 5px;
          background: #1e1e1e;
          border-radius: 3px;
          overflow: hidden;
        }

        .skill-bar-fill {
          height: 100%;
          border-radius: 3px;
          background: var(--gold);
        }

        .skill-pct {
          font-family: 'Fira Code', monospace;
          font-size: 0.62rem;
          color: rgba(245, 200, 66, 0.6);
          width: 28px;
          text-align: right;
          flex-shrink: 0;
        }

        .skills-card::before {
          content: '';
          position: absolute;
          bottom: -30px;
          right: -30px;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245, 200, 66, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .tag {
          font-size: 0.6rem;
          padding: 3px 8px;
          border-radius: 20px;
          font-family: 'Fira Code', monospace;
        }

        .tag-purple { background: rgba(124, 58, 237, 0.1); border: 1px solid rgba(124, 58, 237, 0.2); color: #a78bfa; }
        .tag-pink { background: rgba(236, 72, 153, 0.1); border: 1px solid rgba(236, 72, 153, 0.2); color: #f9a8d4; }
        .tag-gold { background: rgba(245, 200, 66, 0.1); border: 1px solid rgba(245, 200, 66, 0.25); color: #fde68a; }
        .tag-blue { background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); color: #93c5fd; }

        .footer {
          text-align: center;
          font-size: 0.65rem;
          color: var(--muted);
          letter-spacing: 0.15em;
          padding-top: 10px;
        }

        @media (max-width: 768px) {
          .hero {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .grid-2 {
            grid-template-columns: 1fr;
          }
          .grid-3 {
            grid-template-columns: 1fr;
          }
          .brand-name {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="bhumika-wrapper">
        <div className="hero">
          <div className="globe">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="gGlobe" cx="40%" cy="40%">
                  <stop offset="0%" stopColor="#3d2f00" />
                  <stop offset="60%" stopColor="#1a1200" />
                  <stop offset="100%" stopColor="#050400" />
                </radialGradient>
                <radialGradient id="gGlowO" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="rgba(245,200,66,0.22)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <clipPath id="cGlobe">
                  <circle cx="100" cy="100" r="90" />
                </clipPath>
              </defs>
              <circle cx="100" cy="100" r="96" fill="url(#gGlowO)" />
              <circle cx="100" cy="100" r="90" fill="url(#gGlobe)" stroke="rgba(245,200,66,0.28)" strokeWidth="1.5" />
              <g clipPath="url(#cGlobe)" stroke="rgba(245,200,66,0.18)" strokeWidth=".8" fill="none">
                <ellipse cx="100" cy="100" rx="90" ry="18" />
                <ellipse cx="100" cy="100" rx="90" ry="45" />
                <ellipse cx="100" cy="100" rx="90" ry="72" />
                <line x1="100" y1="10" x2="100" y2="190" />
                <line x1="55" y1="12" x2="145" y2="188" />
                <line x1="18" y1="40" x2="182" y2="160" />
                <line x1="10" y1="100" x2="190" y2="100" />
                <line x1="18" y1="160" x2="182" y2="40" />
              </g>
              <g fill="rgba(245,200,66,0.8)">
                <circle cx="80" cy="70" r="1.5" />
                <circle cx="120" cy="55" r="1" />
                <circle cx="60" cy="110" r="1.2" />
                <circle cx="140" cy="90" r="1.5" />
                <circle cx="100" cy="130" r="1" />
              </g>
            </svg>
          </div>

          <div className="brand">
            <div className="logo-wrap">
              <svg viewBox="0 0 260 145" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="gGoldCore" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f5c842" />
                    <stop offset="70%" stopColor="#8c6a00" />
                    <stop offset="100%" stopColor="#2a1f00" />
                  </radialGradient>
                  <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g stroke="#f5c842" strokeWidth="1" opacity="0.4" fill="none">
                  <line x1="20" y1="100" x2="230" y2="30" />
                  <line x1="230" y1="30" x2="190" y2="120" />
                  <line x1="190" y1="120" x2="130" y2="135" />
                  <line x1="130" y1="135" x2="20" y2="100" />
                  <line x1="230" y1="30" x2="150" y2="70" />
                  <line x1="150" y1="70" x2="190" y2="120" />
                </g>
                <g fill="#f5c842" filter="url(#goldGlow)">
                  <circle cx="20" cy="100" r="3" />
                  <circle cx="230" cy="30" r="4" />
                  <circle cx="190" cy="120" r="3" />
                  <circle cx="130" cy="135" r="2.5" />
                  <circle cx="150" cy="70" r="3.5" />
                </g>
                <g stroke="#f5c842" strokeWidth="3" strokeLinecap="round" filter="url(#goldGlow)">
                  <line x1="70" y1="65" x2="85" y2="65" />
                  <line x1="60" y1="75" x2="95" y2="75" />
                  <line x1="70" y1="85" x2="85" y2="85" />
                </g>
                <circle cx="118" cy="75" r="40" fill="url(#gGoldCore)" opacity="0.9" filter="url(#goldGlow)" />
                <circle cx="118" cy="75" r="36" stroke="#f5c842" fill="none" strokeWidth="1.5" opacity="0.6" />
                <path d="M 95,45 A 35,35 0 1,1 95,105" stroke="#f5c842" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" filter="url(#goldGlow)" />
                <circle cx="114" cy="45" r="3" fill="#f5c842" filter="url(#goldGlow)" />
                <text x="118" y="83" fontFamily="'Fira Code',monospace" fontSize="20" fontWeight="700" fill="#fff" textAnchor="middle" filter="url(#goldGlow)">
                  &lt;/&gt;
                </text>
              </svg>
            </div>

            <div className="brand-name">
              <span className="first">BHUMIKA </span>
              <span className="last">TEWARI</span>
            </div>
            <div className="brand-title">Computer Science Student</div>
            <div className="tagline">
              Code <span>●</span> Design <span>●</span> Data <span>●</span> Impact
            </div>
          </div>

          <div className="hero-status">
            <div className="status-row">
              <span className="status-label">Network Status</span>
              <div className="status-indicator">
                <div className="pulse-dot"></div>
                <span>SYSTEM: ACTIVE</span>
              </div>
            </div>
            <div className="status-row">
              <span className="status-label">Availability</span>
              <span className="status-value">&gt; OPEN TO COLLABS</span>
            </div>
            <div className="status-row">
              <span className="status-label">Connect</span>
              <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                <a href="https://github.com/Bhumika2006-hue" target="_blank" rel="noopener noreferrer" style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid rgba(245,200,66,0.15)', display: 'grid', placeItems: 'center', textDecoration: 'none', color: 'var(--text)', fontSize: '0.65rem', fontWeight: '700', transition: '0.3s', background: 'rgba(255,255,255,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.background = 'rgba(245,200,66,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(245,200,66,0.15)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>GH</a>
                <a href="#" style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid rgba(245,200,66,0.15)', display: 'grid', placeItems: 'center', textDecoration: 'none', color: 'var(--text)', fontSize: '0.65rem', fontWeight: '700', transition: '0.3s', background: 'rgba(255,255,255,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.background = 'rgba(245,200,66,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(245,200,66,0.15)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>LI</a>
                <a href="#" style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid rgba(245,200,66,0.15)', display: 'grid', placeItems: 'center', textDecoration: 'none', color: 'var(--text)', fontSize: '0.65rem', fontWeight: '700', transition: '0.3s', background: 'rgba(255,255,255,0.03)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.background = 'rgba(245,200,66,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(245,200,66,0.15)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}>IN</a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid-2">
          <div className="card">
            <div className="heatmap-months">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
            <div className="heatmap-grid" ref={heatmapRef}></div>
            <p style={{ marginBottom: '6px' }}>
              <span className="contrib-count">972</span>
              <span className="contrib-label">contributions in the last year</span>
            </p>
            <div className="gh-footer">
              <div className="gh-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(245,200,66,0.8)">
                  <path d="M12 .3C5.37.3 0 5.67 0 12.3c0 5.3 3.44 9.8 8.2 11.38.6.1.83-.26.83-.58 0-.28-.01-1.22-.01-2.2-3.04.56-3.8-.74-4.04-1.42-.14-.35-.73-1.42-1.25-1.7-.43-.23-1.04-.8-.01-.81.96-.01 1.65.88 1.88 1.25 1.1 1.84 2.86 1.32 3.56 1 .11-.8.43-1.32.78-1.63-2.72-.3-5.56-1.36-5.56-6.04 0-1.33.47-2.43 1.25-3.29-.13-.3-.55-1.56.12-3.25 0 0 1.02-.32 3.35 1.25a11.36 11.36 0 013.05-.41c1.03 0 2.07.14 3.05.41 2.33-1.58 3.35-1.25 3.35-1.25.67 1.69.25 2.95.12 3.25.78.86 1.25 1.96 1.25 3.29 0 4.69-2.85 5.74-5.57 6.04.44.38.82 1.12.82 2.27 0 1.63-.01 2.95-.01 3.35 0 .32.22.7.84.58A12.02 12.02 0 0024 12.3C24 5.67 18.63.3 12 .3z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginBottom: '2px' }}>GitHub Contributions</div>
                <a href="https://github.com/Bhumika2006-hue" target="_blank" rel="noopener noreferrer">
                  @Bhumika2006-hue
                </a>
              </div>
            </div>
          </div>

          <div className="graph-card">
            <div className="graph-title">Bhumika's Contribution Graph</div>
            <div className="chart-wrap">
              <canvas ref={graphRef}></canvas>
            </div>
          </div>
        </div>

        <div className="grid-3">
          <div className="card">
            <div className="icons-row">
              <div className="icon-box">🗄️</div>
              <div className="icon-connector"></div>
              <div className="icon-box active">🖥️</div>
              <div className="icon-connector"></div>
              <div className="icon-box">✏️</div>
            </div>
            <div className="card-heading">
              Dev &amp; <em>Design</em>
            </div>
            <div className="card-body">Excels in both development and design to create a seamless and intuitive user experience.</div>
          </div>

          <div className="card">
            <div className="collab-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="rgba(245,200,66,0.7)">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>
            <div className="collab-heading">
              Open to <em>Collaborations</em>
            </div>
            <div className="card-body">Whether a small project or your next big SaaS, I am always open to collaborate and build something impactful.</div>
          </div>

          <div className="skills-card">
            <div className="skills-title">⚡ Tech Stack</div>
            <div className="skill-row">
              <span className="skill-label">React</span>
              <div className="skill-bar-bg">
                <div className="skill-bar-fill" style={{ width: '90%' }}></div>
              </div>
              <span className="skill-pct">90%</span>
            </div>
            <div className="skill-row">
              <span className="skill-label">Node.js</span>
              <div className="skill-bar-bg">
                <div className="skill-bar-fill" style={{ width: '80%' }}></div>
              </div>
              <span className="skill-pct">80%</span>
            </div>
            <div className="skill-row">
              <span className="skill-label">Python</span>
              <div className="skill-bar-bg">
                <div className="skill-bar-fill" style={{ width: '75%' }}></div>
              </div>
              <span className="skill-pct">75%</span>
            </div>
            <div className="skill-row">
              <span className="skill-label">Figma</span>
              <div className="skill-bar-bg">
                <div className="skill-bar-fill" style={{ width: '85%' }}></div>
              </div>
              <span className="skill-pct">85%</span>
            </div>
            <div className="skill-row">
              <span className="skill-label">SQL</span>
              <div className="skill-bar-bg">
                <div className="skill-bar-fill" style={{ width: '70%' }}></div>
              </div>
              <span className="skill-pct">70%</span>
            </div>
            <div style={{ marginTop: '13px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              <span className="tag tag-purple">TypeScript</span>
              <span className="tag tag-pink">Tailwind</span>
              <span className="tag tag-gold">MongoDB</span>
              <span className="tag tag-blue">Git</span>
            </div>
          </div>
        </div>

        <div className="footer">BHUMIKA TEWARI &nbsp;·&nbsp; CODE · DESIGN · DATA · IMPACT</div>
      </div>
    </div>
  );
};

export default BhumikaPortfolio;
