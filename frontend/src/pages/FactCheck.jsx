import React, { useState } from 'react';
import CredibilityGauge from '../components/CredibilityGauge';

export default function FactCheck() {
  const [url, setUrl] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!url) return;
    
    setIsChecking(true);
    // Simulate network request
    setTimeout(() => {
      setIsChecking(false);
      setResult({
        score: Math.floor(Math.random() * 60) + 20, // 20-80 score
        url: url,
        entities: ['Government', 'Crisis Response'],
        sentiment: 'Negative',
        flags: ['Sensationalist Title', 'Unverified Source'],
        summary: 'This article claims widespread damage, but cross-referencing with official alerts shows discrepancies. The language used is highly emotive.'
      });
    }, 1500);
  };

  return (
    <div className="page-container" style={{ padding: '2rem', animation: 'fadeIn 0.5s ease-out' }}>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: 'var(--text-100)' }}>
          <span style={{ marginRight: '1rem' }}>🔍</span> Fact Check Engine
        </h1>
        <p style={{ color: 'var(--text-400)', marginTop: '0.5rem' }}>
          Analyze news articles and social media posts for misinformation and propaganda.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <form onSubmit={handleCheck} style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="url"
            placeholder="Paste article URL or social media post link here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              flex: 1,
              padding: '1rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-300)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-100)',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            required
          />
          <button 
            type="submit" 
            disabled={isChecking}
            style={{
              padding: '0 2rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-primary)',
              color: 'white',
              fontWeight: 600,
              border: 'none',
              cursor: isChecking ? 'not-allowed' : 'pointer',
              opacity: isChecking ? 0.7 : 1,
              transition: 'all 0.2s',
              fontSize: '1rem'
            }}
          >
            {isChecking ? 'Analyzing...' : 'Analyze Source'}
          </button>
        </form>
      </div>

      {result && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-300)' }}>Credibility Score</h3>
            <CredibilityGauge value={result.score} />
            <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-400)' }}>
              {result.score < 40 ? 'High Risk of Misinformation' : result.score < 70 ? 'Requires Verification' : 'Likely Credible'}
            </p>
          </div>
          
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-100)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Analysis Report
            </h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-400)', marginRight: '1rem' }}>Source:</span>
              <a href={result.url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
                {new URL(result.url).hostname}
              </a>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-400)', marginRight: '1rem' }}>Sentiment:</span>
              <span style={{ color: 'var(--accent-warning)' }}>{result.sentiment}</span>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-400)', marginRight: '1rem' }}>Red Flags Detected:</span>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                {result.flags.map((flag, i) => (
                  <span key={i} style={{ 
                    background: 'rgba(239, 68, 68, 0.2)', 
                    color: 'var(--accent-danger)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '1rem',
                    fontSize: '0.8rem',
                    border: '1px solid rgba(239, 68, 68, 0.3)'
                  }}>
                    {flag}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{ marginTop: '1.5rem' }}>
              <span style={{ color: 'var(--text-400)', display: 'block', marginBottom: '0.5rem' }}>AI Summary:</span>
              <p style={{ color: 'var(--text-200)', lineHeight: 1.6 }}>{result.summary}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
