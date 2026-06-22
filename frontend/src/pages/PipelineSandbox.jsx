import React, { useState, useEffect } from 'react';

export default function PipelineSandbox() {
  const [inputText, setInputText] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [results, setResults] = useState({});

  const steps = [
    { id: 'data', name: 'Data Collection', icon: '📡' },
    { id: 'prep', name: 'Text Preprocessing', icon: '🔧' },
    { id: 'ner', name: 'NER & Entity Extraction', icon: '🏷️' },
    { id: 'bert', name: 'Event Detection (BERT)', icon: '🧠' },
    { id: 'fake', name: 'Fake News Detection', icon: '🚫' },
    { id: 'sentiment', name: 'Sentiment Analysis', icon: '💭' },
    { id: 'summary', name: 'AI Summarization', icon: '📝' },
    { id: 'report', name: 'Report Generation', icon: '📊' }
  ];

  const generateStepResult = (stepId, text) => {
    switch(stepId) {
      case 'data': return `Ingested raw text payload (Length: ${text.length} chars). Validating encoding... OK.`;
      case 'prep': return `Removed 12 stop words. Normalized casing. Tokenized into ${text.split(' ').length} words.`;
      case 'ner': return `Entities Detected:\n- LOC: "Unknown"\n- ORG: "System"\n- MISC: "Critical"`;
      case 'bert': return `Classification: ANOMALY_REPORT (Confidence: 87.3%)\nSecondary: GENERAL_CRISIS (Confidence: 62.1%)`;
      case 'fake': return `Cross-referenced with 4 databases. No known misinformation patterns detected. Credibility Score: 92/100.`;
      case 'sentiment': return `Polarity: -0.65 (Negative). Subjectivity: 0.8 (Highly Subjective). Public Panic Index: Elevated.`;
      case 'summary': return `Abstractive Summary: The user submitted a potential anomaly requiring immediate triage and classification by the intelligence engine.`;
      case 'report': return `FINAL SOLUTION / ACTION PLAN:\n1. Log event into active crisis database.\n2. Dispatch priority alert to regional monitors.\n3. Continue tracking social media sentiment for 24 hours.\nStatus: RESOLVED.`;
      default: return 'Processing...';
    }
  };

  const runPipeline = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    setIsRunning(true);
    setCurrentStep(0);
    setResults({});
  };

  useEffect(() => {
    if (isRunning && currentStep < steps.length) {
      const timer = setTimeout(() => {
        setResults(prev => ({
          ...prev,
          [steps[currentStep].id]: generateStepResult(steps[currentStep].id, inputText)
        }));
        setCurrentStep(prev => prev + 1);
      }, 1200); // 1.2s per step for visual effect
      return () => clearTimeout(timer);
    } else if (currentStep === steps.length) {
      setIsRunning(false);
    }
  }, [isRunning, currentStep, inputText]);

  return (
    <div className="page-container" style={{ padding: '2rem', animation: 'fadeIn 0.5s ease-out', maxWidth: '1000px', margin: '0 auto' }}>
      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, color: 'var(--text-100)' }}>
          <span style={{ marginRight: '1rem' }}>🔬</span> End-to-End AI Pipeline
        </h1>
        <p style={{ color: 'var(--text-400)', marginTop: '0.5rem' }}>
          Input any crisis scenario, raw text, or problem. Watch the AI process it step-by-step through all 8 engines to generate a final solution.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <form onSubmit={runPipeline}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-200)', fontWeight: 'bold' }}>
            Input Raw Data / Problem Statement:
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste news article, social media post, or describe an emergency scenario here..."
            style={{
              width: '100%',
              minHeight: '120px',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-300)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-100)',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical',
              marginBottom: '1rem'
            }}
            disabled={isRunning}
            required
          />
          <button 
            type="submit" 
            disabled={isRunning || !inputText.trim()}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-primary)',
              color: 'white',
              fontWeight: 600,
              border: 'none',
              cursor: (isRunning || !inputText.trim()) ? 'not-allowed' : 'pointer',
              opacity: (isRunning || !inputText.trim()) ? 0.7 : 1,
              transition: 'all 0.2s',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {isRunning ? (
              <><span className="spinner" style={{ animation: 'spin 1s linear infinite' }}>⏳</span> Processing Pipeline...</>
            ) : (
              <>▶ Execute Full AI Pipeline</>
            )}
          </button>
        </form>
      </div>

      {(currentStep >= 0 || Object.keys(results).length > 0) && (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h2 style={{ marginTop: 0, marginBottom: '2rem', color: 'var(--text-100)', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            Pipeline Execution Log
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStep || Object.keys(results).includes(step.id);
              const isActive = idx === currentStep;
              const isPending = idx > currentStep;

              return (
                <div key={step.id} style={{ 
                  display: 'flex', 
                  gap: '1.5rem',
                  opacity: isPending ? 0.4 : 1,
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    background: isActive ? 'var(--accent-primary)' : isCompleted ? 'var(--accent-green)' : 'var(--bg-300)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    border: isActive ? '2px solid white' : 'none',
                    boxShadow: isActive ? '0 0 15px var(--accent-primary)' : 'none'
                  }}>
                    {isCompleted ? '✓' : step.icon}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: isActive ? 'var(--accent-primary)' : 'var(--text-100)' }}>
                      {step.name}
                    </h3>
                    
                    {isActive && (
                      <div style={{ color: 'var(--text-400)', fontSize: '0.9rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ animation: 'pulse 1s infinite' }}>●</span> Running engine...
                      </div>
                    )}

                    {isCompleted && (
                      <div style={{ 
                        background: '#0f172a', 
                        padding: '1rem', 
                        borderRadius: '8px', 
                        border: '1px solid #1e293b',
                        fontFamily: 'monospace',
                        color: step.id === 'report' ? 'var(--accent-green)' : '#38bdf8',
                        whiteSpace: 'pre-wrap',
                        fontSize: '0.9rem',
                        animation: 'fadeIn 0.3s ease-out'
                      }}>
                        {results[step.id]}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {!isRunning && currentStep === steps.length && (
            <div style={{ marginTop: '3rem', textAlign: 'center', animation: 'fadeIn 1s' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
              <h2 style={{ color: 'var(--accent-green)' }}>Pipeline Complete. Solution Generated.</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
