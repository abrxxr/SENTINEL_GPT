import React, { useState } from 'react';

export default function PipelineStatus({ steps }) {
  const [selectedStep, setSelectedStep] = useState(null);

  const getLogForStep = (stepName) => {
    switch (stepName) {
      case 'Data Collection':
        return `[2026-06-22 22:45:01] CONNECTED to Firehose API\n[2026-06-22 22:45:02] Ingested 1,402 social media posts, 342 news articles.\n[2026-06-22 22:45:02] Filtering by geo-fences... done.`;
      case 'Text Preprocessing':
        return `> Cleaning text data...\n> Removing stop words and special chars...\n> Tokenization complete.\n> Standardized 1,744 documents for downstream analysis.`;
      case 'NER & Entity Extraction':
        return `Extracted Entities:\n- LOC: "Chennai", "Tokyo", "Los Angeles"\n- ORG: "FEMA", "Red Cross"\n- MISC: "Magnitude 6.2", "Category 4"\nConfidence: 94.2%`;
      case 'Event Detection (BERT)':
        return `Loading BERT-base-uncased...\nClassifying event types...\n-> EVENT: FLOOD (Prob: 0.98)\n-> EVENT: EARTHQUAKE (Prob: 0.92)\nClustering related articles into unique events.`;
      case 'Fake News Detection':
        return `Running source cross-referencing...\nAnalyzing linguistic patterns for hyperbole...\n[!] FLAGGED: "Dam breach imminent" (Source: Unverified Blog)\nStatus: 41 sources blocked as misinformation.`;
      case 'Sentiment Analysis':
        return `Calculating VADER sentiment scores...\nAverage Polarity: -0.84 (Highly Negative)\nPublic Panic Index: HIGH (Critical threshold exceeded)\nTriggering escalation.`;
      case 'AI Summarization':
        return `Generating abstractive summary via DistilBART...\nSummary generated in 0.4s.\nCompressing 42 articles into 3 paragraph intel report.`;
      case 'Report Generation':
        return `Compiling full Crisis Intelligence Brief...\nInjecting geo-coordinates...\nDispatching payload to frontend dashboard and Alert Manager.\n[PIPELINE SUCCESS]`;
      default:
        return `Awaiting data payload for ${stepName}...`;
    }
  };

  return (
    <div className="glass-card pipeline-section" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <div className="card-title">
          <span className="icon">⛓️</span> NLP & Summarization Pipeline
        </div>
        <span className="card-badge" style={{ background: 'rgba(59,130,246,0.2)', color: '#3b82f6' }}>INTERACTIVE</span>
      </div>
      
      <div style={{ padding: '0 1rem 1rem 1rem', fontSize: '0.85rem', color: 'var(--text-400)' }}>
        Click any processing step below to view the live AI execution logs.
      </div>

      <div className="pipeline-flow" style={{ flex: 1, overflowY: 'auto', paddingBottom: '1rem' }}>
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div 
              className="pipeline-step" 
              onClick={() => setSelectedStep(selectedStep === step.name ? null : step.name)}
              style={{ 
                cursor: 'pointer', 
                background: selectedStep === step.name ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                borderRadius: '8px',
                padding: '0.5rem',
                margin: '-0.5rem',
                transition: 'background 0.2s'
              }}
            >
              <div className={`step-status ${step.status}`}>
                {step.status === 'done' ? '✓' : step.status === 'active' ? '●' : '○'}
              </div>
              <div className="step-name" style={{ fontWeight: selectedStep === step.name ? 'bold' : 'normal', color: selectedStep === step.name ? 'var(--text-100)' : 'var(--text-200)' }}>
                <span style={{ marginRight: '8px' }}>{step.icon}</span>
                {step.name}
              </div>
              <div className="step-time">{step.time}</div>
            </div>
            
            {/* Expanded Console Log */}
            {selectedStep === step.name && (
              <div style={{
                margin: '1rem 0',
                padding: '1rem',
                background: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                color: '#10b981',
                whiteSpace: 'pre-wrap',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
                animation: 'slideDown 0.2s ease-out'
              }}>
                <div style={{ color: '#64748b', marginBottom: '0.5rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  &gt; Terminal output: {step.name}
                </div>
                {getLogForStep(step.name)}
              </div>
            )}

            {idx < steps.length - 1 && (
              <div className="pipeline-connector"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
