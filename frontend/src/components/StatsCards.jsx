import { useState, useEffect } from 'react';

export default function StatsCards({ stats }) {
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    {
      id: 'crises',
      color: 'blue',
      icon: '🎯',
      value: stats.activeEvents,
      label: 'Active Crises',
      change: '+3 from last hour',
      changeType: 'up',
      details: [
        { title: 'Severe Flooding', desc: 'Chennai, India • 10 mins ago', severity: 'critical' },
        { title: 'Earthquake 6.2', desc: 'Tokyo, Japan • 45 mins ago', severity: 'high' },
        { title: 'Wildfire', desc: 'Los Angeles, USA • 1 hr ago', severity: 'high' }
      ]
    },
    {
      id: 'articles',
      color: 'purple',
      icon: '📰',
      value: stats.articlesScanned,
      label: 'Articles Scanned',
      change: '+847 today',
      changeType: 'up',
      details: [
        { title: 'News Websites', desc: 'Reuters, AP, BBC', severity: 'info', count: '1.2K' },
        { title: 'Social Media', desc: 'Twitter, Reddit, TikTok', severity: 'info', count: '1.5K' },
        { title: 'Gov Alerts', desc: 'FEMA, WHO, IMD', severity: 'info', count: '500' }
      ]
    },
    {
      id: 'fake_news',
      color: 'red',
      icon: '🚫',
      value: stats.fakeNewsBlocked,
      label: 'Fake News Blocked',
      change: '+23% vs yesterday',
      changeType: 'up',
      details: [
        { title: 'Dam Breach Hoax', desc: 'Debunked: Old footage from 2015 floods', severity: 'critical' },
        { title: 'Fake Tsunami Warning', desc: 'Debunked: Zero seismic activity detected', severity: 'high' },
        { title: 'AI Generated Image', desc: 'Debunked: Fake explosion near LA wildfire', severity: 'medium' }
      ]
    },
    {
      id: 'alerts',
      color: 'green',
      icon: '🔔',
      value: stats.alertsSent,
      label: 'Alerts Dispatched',
      change: '98.5% delivery rate',
      changeType: 'up',
      details: [
        { title: 'SMS Broadcast', desc: 'Delivered to 45,000 residents in Chennai', severity: 'success' },
        { title: 'API Push to NGO', desc: 'Delivered to Red Cross dispatch systems', severity: 'success' },
        { title: 'Mobile App Push', desc: 'Delivered to 120,000 active users', severity: 'success' }
      ]
    },
  ];

  return (
    <>
      <div className="stats-row">
        {cards.map((card, i) => (
          <AnimatedStatCard 
            key={i} 
            {...card} 
            delay={i * 100} 
            onClick={() => setSelectedCard(card)} 
          />
        ))}
      </div>

      {selectedCard && (
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
        }} onClick={() => setSelectedCard(null)}>
          <div className="glass-card" style={{
            width: '90%',
            maxWidth: '500px',
            background: 'var(--bg-200)',
            border: `1px solid var(--accent-${selectedCard.color})`,
            padding: '2rem',
            boxShadow: `0 0 30px rgba(var(--accent-${selectedCard.color}-rgb, 0,0,0), 0.2)`
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: 'var(--text-100)' }}>
                <span>{selectedCard.icon}</span> Detailed Breakdown: {selectedCard.label}
              </h2>
              <button 
                onClick={() => setSelectedCard(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-400)', fontSize: '1.5rem', cursor: 'pointer' }}
              >×</button>
            </div>
            
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: `var(--accent-${selectedCard.color})`, marginBottom: '1.5rem', textAlign: 'center' }}>
              {selectedCard.value.toLocaleString()} Total
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {selectedCard.details.map((detail, idx) => (
                <div key={idx} style={{ 
                  background: 'var(--bg-300)', 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderLeft: `4px solid var(--accent-${detail.severity === 'critical' ? 'red' : detail.severity === 'success' ? 'green' : 'blue'})`
                }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-100)' }}>{detail.title}</h4>
                    <p style={{ margin: 0, color: 'var(--text-400)', fontSize: '0.9rem' }}>{detail.desc}</p>
                  </div>
                  {detail.count && <span style={{ fontWeight: 'bold', color: 'var(--accent-purple)' }}>{detail.count}</span>}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setSelectedCard(null)}
              style={{
                width: '100%',
                padding: '0.75rem',
                marginTop: '2rem',
                background: 'var(--bg-300)',
                color: 'var(--text-200)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >Close Details</button>
          </div>
        </div>
      )}
    </>
  );
}

function AnimatedStatCard({ color, icon, value, label, change, changeType, delay, onClick }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const startTime = Date.now();
    const startDelay = delay || 0;

    const timer = setTimeout(() => {
      const animate = () => {
        const elapsed = Date.now() - startTime - startDelay;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(eased * value));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  const formattedValue = displayValue >= 1000
    ? `${(displayValue / 1000).toFixed(1)}K`
    : displayValue.toLocaleString();

  return (
    <div 
      className={`stat-card ${color}`} 
      onClick={onClick}
      style={{ cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = `0 10px 25px rgba(var(--accent-${color}-rgb), 0.2)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{formattedValue}</div>
      <div className="stat-label">{label}</div>
      <span className={`stat-change ${changeType}`}>
        {changeType === 'up' ? '↑' : '↓'} {change}
      </span>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-400)', marginTop: '0.5rem', textAlign: 'right' }}>
        Click for details ↗
      </div>
    </div>
  );
}
