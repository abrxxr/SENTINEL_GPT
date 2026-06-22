import React from 'react';

export default function Timeline({ timelineItems }) {
  return (
    <div className="glass-card timeline-section">
      <div className="card-header">
        <div className="card-title">
          <span className="icon">📅</span> Crisis Timeline
        </div>
      </div>
      <div className="timeline-scroll">
        {timelineItems.map((item, i) => (
          <div key={item.id} className="timeline-item" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="tl-time">{item.time}</div>
            <div className="tl-title">{item.title}</div>
            <div className="tl-desc">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
