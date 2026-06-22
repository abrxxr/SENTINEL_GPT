import React from 'react';

export default function IntelligenceReport({ report }) {
  if (!report) return null;

  return (
    <div className="glass-card report-section">
      <div className="card-header">
        <div className="card-title">
          <span className="icon">📝</span> Llama 3 Intelligence Report
        </div>
        <span className="card-badge" style={{ backgroundColor: `${report.severityColor}20`, color: report.severityColor }}>
          {report.severity} Severity
        </span>
      </div>

      <div className="intel-report">
        <div className="intel-header">
          <div className="intel-type-icon" style={{ backgroundColor: report.iconBg, color: report.severityColor }}>
            {report.icon}
          </div>
          <div className="intel-details">
            <h3>{report.crisisType} crisis detected</h3>
            <div className="intel-subtitle">Confidence Level: {report.confidence}% • Location: {report.location}</div>
          </div>
        </div>

        <div className="intel-metrics">
          <div className="intel-metric">
            <div className="metric-label">Crisis Type</div>
            <div className="metric-value">{report.crisisType}</div>
          </div>
          <div className="intel-metric">
            <div className="metric-label">Severity</div>
            <div className="metric-value" style={{ color: report.severityColor }}>{report.severity}</div>
          </div>
          <div className="intel-metric">
            <div className="metric-label">Confidence</div>
            <div className="metric-value">{report.confidence}%</div>
          </div>
        </div>

        <div className="intel-summary">
          <strong>Situation Summary:</strong><br />
          {report.summary}
        </div>

        <div className="intel-actions">
          <strong>Recommended Actions:</strong>
          {report.recommendations.map((action, index) => (
            <div key={index} className="intel-action">
              <span className="action-bullet"></span>
              <span>{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
