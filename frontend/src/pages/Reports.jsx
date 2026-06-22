import React, { useState } from 'react';
import IntelligenceReport from '../components/IntelligenceReport';

export default function Reports({ report }) {
  const [inputText, setInputText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [customReport, setCustomReport] = useState(null);

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setAnalyzing(true);
    setTimeout(() => {
      // Create a dynamic custom report based on input
      const text = inputText.toLowerCase();
      let detectedType = 'accident';
      let icon = '💥';
      let severity = 'Medium';
      let color = '#f59e0b';
      let recs = [
        'Dispatch local emergency response teams to the area.',
        'Establish direct communication with field coordinators.',
        'Issue travel advisory for the surrounding region.'
      ];

      if (text.includes('flood') || text.includes('water') || text.includes('rain')) {
        detectedType = 'Flood';
        icon = '🌊';
        severity = 'High';
        color = '#ef4444';
        recs = [
          'Initiate mandatory evacuations for low-lying sectors.',
          'Coordinate with local disaster response teams for rescue boats.',
          'Stockpile emergency resources at designated safe shelters.'
        ];
      } else if (text.includes('fire') || text.includes('blaze') || text.includes('smoke')) {
        detectedType = 'Fire';
        icon = '🔥';
        severity = 'Critical';
        color = '#dc2626';
        recs = [
          'Deploy air tankers and ground containment teams immediately.',
          'Issue evacuation warnings for zones downwind of smoke propagation.',
          'Activate health advisories regarding critical air quality index.'
        ];
      } else if (text.includes('earthquake') || text.includes('quake') || text.includes('tremor')) {
        detectedType = 'Earthquake';
        icon = '🌍';
        severity = 'Critical';
        color = '#dc2626';
        recs = [
          'Search and rescue teams dispatched to locate building collapses.',
          'Verify structural integrity of bridge pathways and major infrastructure.',
          'Advise citizens to prepare emergency bags for potential aftershocks.'
        ];
      }

      setCustomReport({
        crisisType: detectedType,
        icon,
        iconBg: `${color}15`,
        severity,
        severityColor: color,
        confidence: Math.floor(Math.random() * 15) + 82,
        location: 'Extracted from context',
        affectedPop: 'Pending assessment',
        timestamp: new Date().toISOString(),
        summary: `Sentiment and keyword analysis indicates an active ${detectedType.toUpperCase()} incident. Details: "${inputText.substring(0, 150)}..."`,
        recommendations: recs
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="settings-grid" style={{ animation: 'fadeIn 0.6s ease-out' }}>
      <div className="setting-group">
        <div className="glass-card">
          <div className="card-header">
            <div className="card-title">
              <span className="icon">🧠</span> Run AI Analysis Engine
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
            Submit social posts, dispatch logs, or news reports to classify event type, evaluate credibility, and generate recommendations.
          </p>
          <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <textarea
              className="input-field"
              style={{ width: '100%', height: '140px', resize: 'none', borderRadius: 'var(--radius-md)' }}
              placeholder="Paste social media feeds or emergency logs here to test SentinelGPT NLP processing..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              disabled={analyzing}
            />
            <button type="submit" className="btn btn-primary" disabled={analyzing} style={{ alignSelf: 'flex-start' }}>
              {analyzing ? 'Analyzing NLP Pipeline...' : 'Generate AI Intelligence Report'}
            </button>
          </form>
        </div>

        {customReport && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <IntelligenceReport report={customReport} />
          </div>
        )}
      </div>

      <div className="setting-group">
        <IntelligenceReport report={report} />
      </div>
    </div>
  );
}
