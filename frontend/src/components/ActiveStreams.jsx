import React, { useState, useEffect } from 'react';

export default function ActiveStreams() {
  const [streams, setStreams] = useState([
    { id: 1, source: 'Twitter Firehose', rate: '2,405 req/s', status: 'connected' },
    { id: 2, source: 'Global News Wire', rate: '142 req/s', status: 'connected' },
    { id: 3, source: 'Reddit /r/all', rate: '853 req/s', status: 'connected' },
    { id: 4, source: 'Seismic Sensors API', rate: '12 req/s', status: 'syncing' },
    { id: 5, source: 'Dark Web Scraper', rate: '---', status: 'offline' }
  ]);

  // Rotate random matrix characters
  const [matrixText, setMatrixText] = useState('');
  
  useEffect(() => {
    const chars = '0123456789ABCDEF!@#$%^&*()_+-=[]{}|;:,.<>?';
    const generateMatrix = () => {
      let text = '';
      for(let i=0; i<150; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
        if (i % 30 === 0) text += '\n';
      }
      return text;
    };

    const interval = setInterval(() => {
      setMatrixText(generateMatrix());
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <div className="card-title">
          <span className="icon">🌐</span> Active Data Streams
        </div>
      </div>
      
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
        
        {/* Matrix Code Window */}
        <div style={{ 
          background: '#020617', 
          border: '1px solid #1e293b', 
          borderRadius: '8px', 
          padding: '0.75rem', 
          height: '100px', 
          overflow: 'hidden',
          fontFamily: 'monospace',
          color: '#0ea5e9',
          fontSize: '0.7rem',
          lineHeight: '1.2',
          wordBreak: 'break-all',
          opacity: 0.7,
          boxShadow: 'inset 0 0 20px rgba(0,0,0,1)'
        }}>
          {matrixText}
        </div>

        {/* Stream List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {streams.map(stream => (
            <div key={stream.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-100)' }}>
                <span style={{ 
                  display: 'inline-block', 
                  width: '8px', height: '8px', 
                  borderRadius: '50%', 
                  background: stream.status === 'connected' ? 'var(--accent-emerald)' : stream.status === 'syncing' ? 'var(--accent-amber)' : 'var(--accent-red)',
                  boxShadow: `0 0 5px ${stream.status === 'connected' ? 'var(--accent-emerald)' : 'transparent'}`
                }}></span>
                {stream.source}
              </div>
              <div style={{ color: 'var(--text-400)', fontFamily: 'monospace' }}>
                {stream.rate}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
