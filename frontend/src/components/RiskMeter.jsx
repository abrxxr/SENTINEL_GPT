import { useState, useEffect } from 'react';

export default function RiskMeter({ value = 78 }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    const duration = 2000;
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setAnimatedValue(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);

  const getColor = (v) => {
    if (v >= 80) return '#ef4444'; // Red
    if (v >= 60) return '#f97316'; // Orange
    if (v >= 40) return '#f59e0b'; // Yellow
    return '#10b981'; // Green
  };

  const getStatusText = (v) => {
    if (v >= 80) return 'DEFCON 2';
    if (v >= 60) return 'DEFCON 3';
    if (v >= 40) return 'DEFCON 4';
    return 'DEFCON 5';
  };

  const color = getColor(animatedValue);

  return (
    <div className="glass-card" style={{ 
      position: 'relative', 
      overflow: 'hidden', 
      background: 'linear-gradient(180deg, rgba(15,23,42,0.9) 0%, rgba(2,6,23,0.95) 100%)',
      border: `1px solid ${color}40`,
      boxShadow: `0 0 30px ${color}15 inset`,
      padding: '1rem'
    }}>
      {/* Radar Grid Background */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        opacity: 0.3,
        pointerEvents: 'none'
      }}></div>

      <div className="card-header" style={{ position: 'relative', zIndex: 2, borderBottom: `1px solid ${color}30` }}>
        <div className="card-title">
          <span className="icon" style={{ animation: 'pulse 2s infinite' }}>⚡</span> Global Risk Level
        </div>
        <span style={{ fontSize: '0.7rem', color: color, fontWeight: 'bold', border: `1px solid ${color}`, padding: '0.2rem 0.5rem', borderRadius: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          {getStatusText(animatedValue)}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem', position: 'relative', zIndex: 2 }}>
        
        {/* Main Gauge */}
        <div style={{ position: 'relative', width: '180px', height: '180px', marginBottom: '1.5rem' }}>
          {/* Radar Sweep Animation (CSS hidden in style tag below) */}
          <style>{`
            @keyframes sweep { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            .radar-sweep {
              position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px;
              border-radius: 50%;
              background: conic-gradient(from 0deg, transparent 70%, ${color}80 100%);
              animation: sweep 4s linear infinite;
              pointer-events: none;
            }
          `}</style>
          
          <div className="radar-sweep"></div>
          
          <svg viewBox="0 0 160 160" style={{ width: '100%', height: '100%', filter: `drop-shadow(0 0 8px ${color}80)` }}>
            {/* Inner Ring */}
            <circle cx="80" cy="80" r="50" fill="none" stroke={`${color}20`} strokeWidth="1" strokeDasharray="4 4" />
            
            {/* Track */}
            <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
            
            {/* Animated Progress */}
            <circle
              cx="80" cy="80" r={radius}
              fill="none"
              stroke={color}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
              style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)' }}
            />
          </svg>
          
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-100)', lineHeight: 1, textShadow: `0 0 10px ${color}` }}>
              {animatedValue}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-400)', letterSpacing: '2px', textTransform: 'uppercase' }}>INDEX</div>
          </div>
        </div>

        {/* Breakdown Sub-metrics */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.8rem', background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-400)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Threat Breakdown</div>
          
          {/* Sub-metric 1 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              <span style={{ color: 'var(--text-200)' }}>Geopolitical Conflict</span>
              <span style={{ color: 'var(--accent-orange)' }}>84%</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'var(--bg-400)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '84%', height: '100%', background: 'var(--accent-orange)', boxShadow: '0 0 5px var(--accent-orange)' }}></div>
            </div>
          </div>

          {/* Sub-metric 2 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              <span style={{ color: 'var(--text-200)' }}>Information Warfare</span>
              <span style={{ color: 'var(--accent-red)' }}>92%</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'var(--bg-400)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '92%', height: '100%', background: 'var(--accent-red)', boxShadow: '0 0 5px var(--accent-red)', animation: 'pulse 1.5s infinite' }}></div>
            </div>
          </div>

          {/* Sub-metric 3 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
              <span style={{ color: 'var(--text-200)' }}>Environmental</span>
              <span style={{ color: 'var(--accent-blue)' }}>45%</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'var(--bg-400)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '45%', height: '100%', background: 'var(--accent-blue)' }}></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
