import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function SentimentChart({ data }) {
  return (
    <div className="glass-card sentiment-section">
      <div className="card-header">
        <div className="card-title">
          <span className="icon">💭</span> Public Sentiment
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
        <div style={{ width: 120, height: 120, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={32}
                outerRadius={52}
                paddingAngle={3}
                dataKey="value"
                animationBegin={200}
                animationDuration={1200}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="transparent"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="sentiment-list" style={{ flex: 1 }}>
          {data.map((item, i) => (
            <div key={i} className="sentiment-item">
              <div
                className="sentiment-dot"
                style={{ background: item.color }}
              />
              <span className="sentiment-name">{item.name}</span>
              <div className="sentiment-bar-track">
                <div
                  className="sentiment-bar-fill"
                  style={{
                    width: `${item.value}%`,
                    background: item.color,
                    transitionDelay: `${i * 150}ms`,
                  }}
                />
              </div>
              <span className="sentiment-value">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
