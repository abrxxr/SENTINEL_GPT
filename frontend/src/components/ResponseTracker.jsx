import React, { useState, useEffect } from 'react';

const SEVERITIES = [
  { level: 'Critical', color: '#ef4444', target: 45, icon: '🔴' },
  { level: 'High',     color: '#f97316', target: 120, icon: '🟠' },
  { level: 'Medium',   color: '#f59e0b', target: 300, icon: '🟡' },
  { level: 'Low',      color: '#3b82f6', target: 600, icon: '🔵' },
];

function formatTime(seconds) {
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

export default function ResponseTracker() {
  const [times, setTimes] = useState(
    SEVERITIES.map(s => ({
      ...s,
      current: s.target + Math.floor(Math.random() * 20 - 10),
      history: Array.from({ length: 8 }, () => s.target + Math.floor(Math.random() * 30 - 15)),
    }))
  );

  const [totalToday, setTotalToday] = useState(77);
  const [avgRate, setAvgRate] = useState(98.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimes(prev => prev.map(s => ({
        ...s,
        current: Math.max(10, s.target + Math.floor(Math.random() * 30 - 15)),
        history: [...s.history.slice(1), s.target + Math.floor(Math.random() * 30 - 15)],
      })));
      setTotalToday(t => t + (Math.random() > 0.7 ? 1 : 0));
      setAvgRate(r => Math.min(99.9, Math.max(96, r + (Math.random() - 0.5) * 0.2)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <div className="card-title">
          <span className="icon">⚡</span> Alert Response Tracker
        </div>
        <span className="card-badge" style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981' }}>
          LIVE
        </span>
      </div>

      {/* Summary Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ background: 'var(--bg-300,rgba(15,23,42,0.6))', borderRadius: '10px', padding: '0.75rem', textAlign: 'center', border: '1px solid rgba(59,130,246,0.15)' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#60a5fa' }}>{totalToday}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-400,#64748b)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Alerts Dispatched Today</div>
        </div>
        <div style={{ background: 'var(--bg-300,rgba(15,23,42,0.6))', borderRadius: '10px', padding: '0.75rem', textAlign: 'center', border: '1px solid rgba(16,185,129,0.15)' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981' }}>{avgRate.toFixed(1)}%</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-400,#64748b)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Delivery Success Rate</div>
        </div>
      </div>

      {/* Per-severity rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
        {times.map((s) => {
          const pct = Math.min(100, (s.target / s.current) * 100);
          const onTime = s.current <= s.target * 1.2;
          return (
            <div key={s.level}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#e2e8f0' }}>
                  <span>{s.icon}</span>
                  <span style={{ fontWeight: 600 }}>{s.level}</span>
                  <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Target: ≤{formatTime(s.target)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.9rem', fontWeight: 700, color: onTime ? '#10b981' : '#ef4444' }}>
                    {formatTime(s.current)}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: onTime ? '#10b981' : '#ef4444' }}>
                    {onTime ? '✓ ON TIME' : '⚠ DELAYED'}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  width: `${pct}%`,
                  height: '100%',
                  background: onTime ? s.color : '#ef4444',
                  borderRadius: '3px',
                  boxShadow: `0 0 8px ${onTime ? s.color : '#ef4444'}80`,
                  transition: 'width 0.8s ease'
                }} />
              </div>

              {/* Mini sparkline bars */}
              <div style={{ display: 'flex', gap: '3px', marginTop: '0.4rem', alignItems: 'flex-end', height: '20px' }}>
                {s.history.map((val, i) => {
                  const h = Math.max(4, Math.min(20, (s.target / val) * 16));
                  return (
                    <div key={i} style={{
                      flex: 1,
                      height: `${h}px`,
                      background: val <= s.target * 1.2 ? `${s.color}80` : 'rgba(239,68,68,0.5)',
                      borderRadius: '2px',
                      transition: 'height 0.5s ease'
                    }} />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
