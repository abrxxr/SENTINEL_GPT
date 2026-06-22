import React, { useState } from 'react';

export default function AlertPanel({ alerts, onAcknowledge }) {
  const [selectedAlert, setSelectedAlert] = useState(null);

  return (
    <>
      <div className="glass-card alerts-section">
        <div className="card-header">
          <div className="card-title">
            <span className="icon">🚨</span> Dispatch System & Alerts
          </div>
        </div>
        
        <div style={{ padding: '0 1rem 0.5rem 1rem', fontSize: '0.8rem', color: 'var(--text-400)' }}>
          Click any alert to view dispatch routing details.
        </div>

        <div className="alerts-list">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`alert-item ${alert.severity}`}
              style={{ cursor: 'pointer', transition: 'background 0.2s', position: 'relative' }}
              onClick={() => setSelectedAlert(alert)}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-200)'}
            >
              <span className="alert-icon">{alert.icon}</span>
              <div className="alert-content">
                <div className="alert-title">{alert.title}</div>
                <div className="alert-desc">{alert.description}</div>
              </div>
              <div className="alert-time" style={{ marginRight: '80px' }}>{alert.time}</div>
              
              <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
                {!alert.acknowledged ? (
                  <button 
                    className="alert-action-btn" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAcknowledge(alert.id);
                    }}
                  >
                    Acknowledge
                  </button>
                ) : (
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                    ✓ Ack
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAlert && (
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
        }} onClick={() => setSelectedAlert(null)}>
          <div className="glass-card" style={{
            width: '90%',
            maxWidth: '500px',
            background: 'var(--bg-200)',
            border: `1px solid ${selectedAlert.severity === 'critical' ? 'var(--accent-red)' : 'var(--accent-orange)'}`,
            padding: '2rem',
            boxShadow: `0 20px 40px rgba(${selectedAlert.severity === 'critical' ? '239,68,68' : '249,115,22'}, 0.2)`
          }} onClick={e => e.stopPropagation()}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '2rem' }}>{selectedAlert.icon}</span>
                <div>
                  <h2 style={{ margin: 0, color: 'var(--text-100)', fontSize: '1.25rem' }}>Alert Details</h2>
                  <span style={{ color: selectedAlert.severity === 'critical' ? 'var(--accent-red)' : 'var(--accent-orange)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>
                    {selectedAlert.severity} PRIORITY
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAlert(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-400)', fontSize: '1.5rem', cursor: 'pointer' }}
              >×</button>
            </div>
            
            <h3 style={{ color: 'var(--text-100)', marginTop: 0, marginBottom: '0.5rem' }}>{selectedAlert.title}</h3>
            <p style={{ color: 'var(--text-300)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              {selectedAlert.description}
            </p>

            <div style={{ background: 'var(--bg-300)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text-200)' }}>Automated Dispatch Routing</h4>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-400)' }}>Local Authorities:</span>
                <span style={{ color: 'var(--accent-green)' }}>✓ Transmitted</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-400)' }}>Public SMS Broadcast:</span>
                <span style={{ color: 'var(--accent-green)' }}>✓ Sent (45k reached)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-400)' }}>Social Media API:</span>
                <span style={{ color: selectedAlert.severity === 'critical' ? 'var(--accent-green)' : 'var(--text-500)' }}>
                  {selectedAlert.severity === 'critical' ? '✓ Auto-posted' : 'Pending Review'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {!selectedAlert.acknowledged && (
                <button 
                  onClick={() => {
                    onAcknowledge(selectedAlert.id);
                    setSelectedAlert(null);
                  }}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'var(--accent-blue)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = 0.8}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
                >
                  Acknowledge Alert
                </button>
              )}
              <button 
                onClick={() => setSelectedAlert(null)}
                style={{
                  flex: 1,
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
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
