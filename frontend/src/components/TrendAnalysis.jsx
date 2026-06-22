import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function TrendAnalysis({ trendData }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid var(--border-color)',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)'
        }}>
          <p className="label" style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-100)' }}>
            {label}
          </p>
          {payload.map((entry, index) => (
            <div key={index} style={{ color: entry.color, display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.25rem 0' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: entry.color }}></span>
              <span style={{ textTransform: 'capitalize' }}>{entry.name}:</span>
              <span style={{ fontWeight: 'bold' }}>{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card trend-section">
      <div className="card-header">
        <div className="card-title">
          <span className="icon">📈</span> Event Volume & Misinformation Trends
        </div>
      </div>
      <div className="trend-chart-container" style={{ width: '100%', height: '300px', marginTop: '1rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorFake" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
            <XAxis dataKey="time" stroke="var(--text-400)" tick={{ fill: 'var(--text-400)' }} />
            <YAxis stroke="var(--text-400)" tick={{ fill: 'var(--text-400)' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
            <Area type="monotone" dataKey="events" name="Verified Events" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValid)" />
            <Area type="monotone" dataKey="fakeNews" name="Detected Misinformation" stroke="#ef4444" fillOpacity={1} fill="url(#colorFake)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
        <h4 style={{ color: '#3b82f6', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>💡</span> AI Trend Insight
        </h4>
        <p style={{ color: 'var(--text-200)', fontSize: '0.9rem', lineHeight: 1.5 }}>
          The chart tracks the volume of total incoming reports vs. flagged misinformation over the last 12 hours. A sudden spike in the red area indicates a coordinated misinformation campaign or panic reporting during a crisis.
        </p>
      </div>
    </div>
  );
}
