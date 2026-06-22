import React, { useState, useRef, useEffect } from 'react';

function CustomSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find(o => o.value === value) || options[0];

  return (
    <div ref={ref} style={{ position: 'relative', minWidth: '150px' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', padding: '0.5rem 1rem',
          background: '#0f172a', border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: '8px', color: '#e2e8f0',
          cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', fontFamily: 'inherit',
        }}
      >
        {selected.label}
        <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          background: '#0f172a', border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: '8px', zIndex: 999, overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        }}>
          {options.map(opt => (
            <div
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              style={{
                padding: '0.6rem 1rem', cursor: 'pointer', fontSize: '0.88rem',
                color: value === opt.value ? '#60a5fa' : '#cbd5e1',
                background: value === opt.value ? 'rgba(59,130,246,0.12)' : 'transparent',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = value === opt.value ? 'rgba(59,130,246,0.12)' : 'transparent'}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Events({ events }) {
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  const filteredEvents = events.filter(evt => {
    const typeMatch = filterType === 'all' || evt.type === filterType;
    const severityMatch = filterSeverity === 'all' || evt.severity === filterSeverity;
    return typeMatch && severityMatch;
  });

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'flood', label: '🌊 Flood' },
    { value: 'earthquake', label: '🌍 Earthquake' },
    { value: 'fire', label: '🔥 Fire' },
    { value: 'disease', label: '🦠 Disease' },
    { value: 'storm', label: '⛈️ Storm' },
    { value: 'terror', label: '💥 Terror' },
    { value: 'accident', label: '🚨 Accident' },
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: '🔴 Critical' },
    { value: 'high', label: '🟠 High' },
    { value: 'medium', label: '🟡 Medium' },
    { value: 'low', label: '🔵 Low' },
  ];


  return (
    <div className="page-container" style={{ padding: '2rem', animation: 'fadeIn 0.5s ease-out', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="glass-card" style={{ padding: '2rem' }}>
        <div className="page-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="page-title-area">
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, margin: 0, color: 'var(--text-100)' }}>
              <span style={{ marginRight: '0.5rem' }}>🎯</span> Detected Crisis Events
            </h2>
            <p style={{ color: 'var(--text-400)', marginTop: '0.5rem' }}>Real-time list of events detected by SentinelGPT NLP models</p>
          </div>
          <div className="page-actions" style={{ display: 'flex', gap: '1rem' }}>
            <CustomSelect value={filterType} onChange={setFilterType} options={typeOptions} />
            <CustomSelect value={filterSeverity} onChange={setFilterSeverity} options={severityOptions} />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-400)', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Event</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Type</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Location</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Severity</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Confidence</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Source</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Credibility</th>
                <th style={{ padding: '1rem', fontWeight: 600 }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((evt, idx) => (
                <tr key={evt.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s', background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-100)' }}>
                    {evt.icon} {evt.title}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span className={`feed-type ${evt.type}`} style={{ padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.8rem', background: 'var(--bg-300)' }}>{evt.type}</span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-200)' }}>📍 {evt.location}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.2rem 0.6rem', 
                      borderRadius: '4px', 
                      fontSize: '0.8rem', 
                      fontWeight: 'bold', 
                      textTransform: 'uppercase',
                      background: evt.severity === 'critical' ? 'rgba(239, 68, 68, 0.2)' : evt.severity === 'high' ? 'rgba(249, 115, 22, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                      color: evt.severity === 'critical' ? 'var(--accent-red)' : evt.severity === 'high' ? 'var(--accent-orange)' : 'var(--accent-blue)'
                    }}>
                      {evt.severity}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '60px', height: '6px', background: 'var(--bg-300)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ 
                          width: `${evt.confidence}%`, 
                          height: '100%', 
                          background: evt.confidence > 90 ? 'var(--accent-emerald)' : 'var(--accent-blue)' 
                        }}></div>
                      </div>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-200)' }}>{evt.confidence}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-300)' }}>📰 {evt.source}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      color: evt.credibility > 80 ? 'var(--accent-emerald)' : evt.credibility > 50 ? 'var(--accent-amber)' : 'var(--accent-red)',
                      fontWeight: 600
                    }}>
                      {evt.credibility}%
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-400)', fontSize: '0.9rem' }}>{evt.timeAgo}</td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-400)' }}>
                    No crisis events match your current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
