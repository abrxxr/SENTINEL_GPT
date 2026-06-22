import React, { useState } from 'react';

export default function Settings() {
  const [config, setConfig] = useState({
    newsApiEnabled: false,
    rssEnabled: true,
    socialScraper: true,
    alertSms: false,
    alertEmail: true,
    alertTelegram: true,
    updateInterval: '30s',
    newsApiKey: ''
  });

  const toggle = (key) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelect = (key, val) => {
    setConfig(prev => ({ ...prev, [key]: val }));
  };

  const handleInput = (key, val) => {
    setConfig(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="settings-grid" style={{ animation: 'fadeIn 0.6s ease-out' }}>
      <div className="setting-group">
        <div className="glass-card">
          <div className="card-header">
            <div className="card-title">
              <span className="icon">📡</span> Data Collection Config
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div className="setting-item">
              <div className="setting-info">
                <h4>NewsAPI Integration</h4>
                <p>Enable live news feeds (requires API key)</p>
              </div>
              <button
                className={`toggle-switch ${config.newsApiEnabled ? 'active' : ''}`}
                onClick={() => toggle('newsApiEnabled')}
              />
            </div>

            {config.newsApiEnabled && (
              <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
                <div className="setting-info">
                  <h4>NewsAPI Credentials</h4>
                  <p>Enter your secret API key</p>
                </div>
                <input
                  type="password"
                  className="input-field"
                  style={{ width: '100%' }}
                  placeholder="Paste NewsAPI key here..."
                  value={config.newsApiKey}
                  onChange={e => handleInput('newsApiKey', e.target.value)}
                />
              </div>
            )}

            <div className="setting-item">
              <div className="setting-info">
                <h4>RSS Feed Collector</h4>
                <p>Poll global hazard alerts & meteorological feeds</p>
              </div>
              <button
                className={`toggle-switch ${config.rssEnabled ? 'active' : ''}`}
                onClick={() => toggle('rssEnabled')}
              />
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Social Stream Simulation</h4>
                <p>Mock streams from Twitter/X, Facebook, and messaging outlets</p>
              </div>
              <button
                className={`toggle-switch ${config.socialScraper ? 'active' : ''}`}
                onClick={() => toggle('socialScraper')}
              />
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Poll/Update Interval</h4>
                <p>Frequency to scan for new alerts and process raw feeds</p>
              </div>
              <select
                className="input-field"
                value={config.updateInterval}
                onChange={e => handleSelect('updateInterval', e.target.value)}
              >
                <option value="10s">10 seconds</option>
                <option value="30s">30 seconds</option>
                <option value="1m">1 minute</option>
                <option value="5m">5 minutes</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="setting-group">
        <div className="glass-card">
          <div className="card-header">
            <div className="card-title">
              <span className="icon">🚨</span> Dispatch & Notification Channels
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div className="setting-item">
              <div className="setting-info">
                <h4>Email Alerts</h4>
                <p>Send instant intelligence bulletins to agency teams</p>
              </div>
              <button
                className={`toggle-switch ${config.alertEmail ? 'active' : ''}`}
                onClick={() => toggle('alertEmail')}
              />
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Telegram Bot Alerts</h4>
                <p>Push critical status updates directly to response chat groups</p>
              </div>
              <button
                className={`toggle-switch ${config.alertTelegram ? 'active' : ''}`}
                onClick={() => toggle('alertTelegram')}
              />
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>SMS Notification Service</h4>
                <p>Broadcast alerts to registered emergency leaders (Twilio)</p>
              </div>
              <button
                className={`toggle-switch ${config.alertSms ? 'active' : ''}`}
                onClick={() => toggle('alertSms')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
