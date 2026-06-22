import React, { useState, useEffect } from 'react';

export default function NodeHealth() {
  const [nodes, setNodes] = useState([]);

  // Initialize 48 nodes (6x8 grid)
  useEffect(() => {
    const initialNodes = Array.from({ length: 48 }, (_, i) => ({
      id: i,
      status: Math.random() > 0.9 ? 'warning' : 'optimal',
      load: Math.floor(Math.random() * 80) + 10
    }));
    setNodes(initialNodes);

    // Randomly update node status
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => {
        if (Math.random() > 0.95) {
          return {
            ...node,
            status: Math.random() > 0.8 ? 'warning' : 'optimal',
            load: Math.floor(Math.random() * 90) + 10
          };
        }
        return node;
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <div className="card-title">
          <span className="icon" style={{ animation: 'pulse 2s infinite' }}>🖥️</span> NLP Cluster Health
        </div>
        <span className="card-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-emerald)' }}>98.2% UPTIME</span>
      </div>
      
      <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '6px', marginBottom: '1.5rem', flex: 1 }}>
          {nodes.map(node => (
            <div 
              key={node.id}
              style={{
                background: node.status === 'optimal' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.3)',
                border: `1px solid ${node.status === 'optimal' ? 'rgba(16, 185, 129, 0.5)' : 'var(--accent-orange)'}`,
                borderRadius: '4px',
                aspectRatio: '1',
                boxShadow: node.status === 'warning' ? '0 0 10px rgba(245, 158, 11, 0.4)' : 'none',
                animation: node.status === 'warning' ? 'pulse 1s infinite' : 'none',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Load indicator bar inside node */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                height: `${node.load}%`,
                background: node.status === 'optimal' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.6)'
              }}></div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-400)', background: 'var(--bg-300)', padding: '0.75rem', borderRadius: '8px' }}>
          <div><span style={{ color: 'var(--accent-emerald)' }}>■</span> 45/48 Nodes Optimal</div>
          <div><span style={{ color: 'var(--accent-orange)' }}>■</span> 3 Rebalancing</div>
        </div>

      </div>
    </div>
  );
}
