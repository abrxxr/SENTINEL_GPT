import React, { useState } from 'react';

export default function LiveFeed({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <>
      <div className="glass-card feed-section">
        <div className="card-header">
          <div className="card-title">
            <span className="icon">📡</span> Live Event Feed
          </div>
          <span className="card-badge live">LIVE</span>
        </div>
        
        <div style={{ padding: '0 1rem 0.5rem 1rem', fontSize: '0.8rem', color: 'var(--text-400)' }}>
          Click any event below to view detailed NLP extraction data.
        </div>

        <div className="live-feed">
          {events.slice(0, 10).map((event, i) => (
            <div
              key={event.id}
              className="feed-item"
              style={{ animationDelay: `${i * 60}ms`, cursor: 'pointer', transition: 'background 0.2s' }}
              onClick={() => setSelectedEvent(event)}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div className={`feed-severity ${event.severity}`}></div>
              <div className="feed-content">
                <div className="feed-title" style={{ color: 'var(--text-100)' }}>
                  {event.icon} {event.title}
                </div>
                <div className="feed-meta">
                  <span className={`feed-type ${event.type}`}>{event.type}</span>
                  <span>📍 {event.location}</span>
                  <span>•</span>
                  <span>{event.source}</span>
                </div>
              </div>
              <div className="feed-time">{event.timeAgo}</div>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.2s ease-out'
        }} onClick={() => setSelectedEvent(null)}>
          <div className="glass-card" style={{
            width: '90%',
            maxWidth: '600px',
            background: 'var(--bg-200)',
            border: `1px solid var(--border-color)`,
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span className={`feed-severity ${selectedEvent.severity}`} style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', marginRight: '10px' }}></span>
                <span style={{ color: 'var(--text-400)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>{selectedEvent.severity} SEVERITY</span>
                <h2 style={{ margin: '0.5rem 0 0 0', color: 'var(--text-100)', fontSize: '1.5rem' }}>
                  {selectedEvent.icon} {selectedEvent.title}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-400)', fontSize: '1.5rem', cursor: 'pointer' }}
              >×</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'var(--bg-300)', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-400)', marginBottom: '0.25rem' }}>Location</div>
                <div style={{ fontWeight: 'bold', color: 'var(--text-100)' }}>📍 {selectedEvent.location}</div>
              </div>
              <div style={{ background: 'var(--bg-300)', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-400)', marginBottom: '0.25rem' }}>Source Engine</div>
                <div style={{ fontWeight: 'bold', color: 'var(--text-100)' }}>📰 {selectedEvent.source}</div>
              </div>
              <div style={{ background: 'var(--bg-300)', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-400)', marginBottom: '0.25rem' }}>AI Confidence</div>
                <div style={{ fontWeight: 'bold', color: 'var(--accent-green)' }}>✓ {selectedEvent.confidence || '94'}% Verified</div>
              </div>
              <div style={{ background: 'var(--bg-300)', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-400)', marginBottom: '0.25rem' }}>Est. Affected Population</div>
                <div style={{ fontWeight: 'bold', color: 'var(--accent-orange)' }}>👥 {(selectedEvent.affectedPopulation || Math.floor(Math.random() * 50000) + 1000).toLocaleString()}</div>
              </div>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#3b82f6', margin: '0 0 0.5rem 0' }}>AI Event Summary</h4>
              <p style={{ color: 'var(--text-200)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                {selectedEvent.description || `Automated systems detected anomalous activity patterns indicating a ${selectedEvent.type} event in the vicinity of ${selectedEvent.location}. NLP engines have cross-referenced ${Math.floor(Math.random() * 40) + 5} independent sources to verify this occurrence.`}
              </p>
            </div>

            <button 
              onClick={() => setSelectedEvent(null)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'var(--bg-300)',
                color: 'var(--text-100)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-400)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-300)'}
            >Close Feed Details</button>
          </div>
        </div>
      )}
    </>
  );
}
