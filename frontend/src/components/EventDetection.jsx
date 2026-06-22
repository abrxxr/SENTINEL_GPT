import React from 'react';

export default function EventDetection({ eventCounts }) {
  return (
    <div className="glass-card events-section">
      <div className="card-header">
        <div className="card-title">
          <span className="icon">🎯</span> Event Classification (NLP Classifier)
        </div>
      </div>
      <div className="events-grid">
        {eventCounts.map((evt, i) => (
          <div key={evt.type} className="event-card" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="event-icon" style={{ background: `${evt.color}15`, color: evt.color }}>
              {evt.icon}
            </div>
            <div className="event-name">{evt.name}</div>
            <div className="event-count">{evt.count}</div>
            <div className="event-trend" style={{ color: evt.trend >= 0 ? 'var(--accent-emerald)' : 'var(--accent-red)' }}>
              {evt.trend >= 0 ? `+${evt.trend}%` : `${evt.trend}%`} vs last 24h
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
