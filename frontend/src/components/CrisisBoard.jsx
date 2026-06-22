import React, { useState } from 'react';

const TYPE_COLORS = {
  flood:      { color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', icon: '🌊' },
  earthquake: { color: '#f97316', bg: 'rgba(249,115,22,0.15)', icon: '🌍' },
  fire:       { color: '#ef4444', bg: 'rgba(239,68,68,0.15)',  icon: '🔥' },
  disease:    { color: '#a855f7', bg: 'rgba(168,85,247,0.15)', icon: '🦠' },
  storm:      { color: '#06b6d4', bg: 'rgba(6,182,212,0.15)',  icon: '⛈️' },
  terror:     { color: '#dc2626', bg: 'rgba(220,38,38,0.15)',  icon: '💥' },
  accident:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', icon: '🚨' },
};

export default function CrisisBoard({ eventCounts, timelineItems, events }) {
  const [activeTab, setActiveTab] = useState('counts');

  const recentEvents = (events || []).slice(0, 6);

  const tabs = [
    { id: 'counts',   label: '📊 Event Types' },
    { id: 'timeline', label: '🕐 Timeline' },
    { id: 'recent',   label: '📡 Recent' },
  ];

  return (
    <div className="glass-card" style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(9,14,31,0.98) 100%)',
      border: '1px solid rgba(59,130,246,0.2)',
    }}>
      {/* Header */}
      <div className="card-header" style={{ borderBottom: '1px solid rgba(59,130,246,0.12)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
        <div className="card-title">
          <span className="icon">🎯</span> Crisis Intelligence Board
        </div>
        <span className="card-badge" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444', animation: 'breathe 3s infinite' }}>
          ● LIVE
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            flex: 1,
            padding: '0.5rem',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.78rem',
            fontWeight: 600,
            transition: 'all 0.2s',
            background: activeTab === tab.id ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.04)',
            color: activeTab === tab.id ? '#60a5fa' : '#64748b',
            borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : '2px solid transparent',
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>

        {/* EVENT TYPE COUNTS */}
        {activeTab === 'counts' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {(eventCounts || []).map((evt) => {
              const style = TYPE_COLORS[evt.type] || { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', icon: '📌' };
              const barWidth = Math.min(100, (evt.count / 20) * 100);
              return (
                <div key={evt.type} style={{
                  background: style.bg,
                  border: `1px solid ${style.color}30`,
                  borderRadius: '10px',
                  padding: '0.85rem',
                  transition: 'transform 0.2s',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>{evt.icon || style.icon}</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: style.color }}>{evt.count}</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '0.4rem' }}>{evt.name || evt.type}</div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${barWidth}%`, height: '100%', background: style.color, boxShadow: `0 0 6px ${style.color}` }} />
                  </div>
                  <div style={{ fontSize: '0.72rem', marginTop: '0.35rem', color: evt.trend >= 0 ? '#10b981' : '#ef4444' }}>
                    {evt.trend >= 0 ? `▲ +${evt.trend}%` : `▼ ${evt.trend}%`} vs 24h
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TIMELINE */}
        {activeTab === 'timeline' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {(timelineItems || []).slice(0, 8).map((item, i) => {
              const style = TYPE_COLORS[item.type] || { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', icon: '📌' };
              return (
                <div key={item.id || i} style={{ display: 'flex', gap: '0.75rem', paddingBottom: '1rem', position: 'relative' }}>
                  {/* Line */}
                  {i < 7 && <div style={{ position: 'absolute', left: '15px', top: '28px', bottom: 0, width: '2px', background: `${style.color}30` }} />}
                  {/* Dot */}
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: style.bg, border: `2px solid ${style.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.85rem' }}>
                    {style.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', lineHeight: 1.3 }}>{item.title}</div>
                      <span style={{ fontSize: '0.7rem', color: '#475569', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>{item.time}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>{item.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* RECENT EVENTS */}
        {activeTab === 'recent' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {recentEvents.map((evt) => {
              const sev = evt.severity;
              const sevColor = sev === 'critical' ? '#ef4444' : sev === 'high' ? '#f97316' : sev === 'medium' ? '#f59e0b' : '#3b82f6';
              return (
                <div key={evt.id} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.65rem 0.75rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderLeft: `3px solid ${sevColor}`,
                  borderRadius: '8px',
                }}>
                  <span style={{ fontSize: '1.2rem' }}>{evt.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.83rem', fontWeight: 600, color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{evt.title}</div>
                    <div style={{ fontSize: '0.73rem', color: '#64748b' }}>📍 {evt.location} · {evt.source}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: sevColor }}>{sev}</div>
                    <div style={{ fontSize: '0.7rem', color: '#475569' }}>{evt.timeAgo}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
