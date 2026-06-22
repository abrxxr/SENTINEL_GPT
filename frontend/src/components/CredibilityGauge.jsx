import { useState, useEffect } from 'react';

export default function CredibilityGauge({ value = 82 }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const duration = 1800;
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

  // Semi-circular gauge
  const radius = 65;
  const circumference = Math.PI * radius; // half circle
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  const getColor = (v) => {
    if (v >= 80) return '#10b981';
    if (v >= 60) return '#f59e0b';
    if (v >= 40) return '#f97316';
    return '#ef4444';
  };

  const getLabel = (v) => {
    if (v >= 80) return 'Reliable';
    if (v >= 60) return 'Moderate';
    if (v >= 40) return 'Questionable';
    return 'Unreliable';
  };

  const color = getColor(animatedValue);

  return (
    <div className="glass-card credibility-section">
      <div className="card-header">
        <div className="card-title">
          <span className="icon">🔍</span> Source Credibility
        </div>
      </div>
      <div className="gauge-container">
        <svg viewBox="0 0 180 110" style={{ width: '180px', height: '110px' }}>
          {/* Background arc */}
          <path
            d="M 15 100 A 65 65 0 0 1 165 100"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Filled arc */}
          <path
            d="M 15 100 A 65 65 0 0 1 165 100"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 1.8s cubic-bezier(0.4,0,0.2,1)',
              filter: `drop-shadow(0 0 8px ${color}40)`,
            }}
          />
          {/* Value text */}
          <text x="90" y="85" textAnchor="middle" style={{
            fontSize: '2rem',
            fontWeight: 800,
            fill: color,
            fontFamily: 'var(--font-main)',
          }}>
            {animatedValue}%
          </text>
          <text x="90" y="105" textAnchor="middle" style={{
            fontSize: '0.7rem',
            fill: 'var(--text-secondary)',
            fontFamily: 'var(--font-main)',
            fontWeight: 500,
          }}>
            {getLabel(animatedValue)}
          </text>
        </svg>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.68rem',
        color: 'var(--text-muted)',
        padding: '0 var(--space-md)',
        marginTop: 'var(--space-sm)',
      }}>
        <span>Unreliable</span>
        <span>Reliable</span>
      </div>
    </div>
  );
}
