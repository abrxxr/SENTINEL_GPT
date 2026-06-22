import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { section: 'Overview' },
  { path: '/', icon: '📊', label: 'Dashboard', badge: null },
  { path: '/events', icon: '🎯', label: 'Events', badge: 12 },
  { path: '/reports', icon: '📋', label: 'Intelligence', badge: null },
  { section: 'Monitoring' },
  { path: '/map', icon: '🗺️', label: 'Crisis Map', badge: null },
  { path: '/feed', icon: '📡', label: 'Live Feed', badge: 3 },
  { path: '/sentiment', icon: '💭', label: 'Sentiment', badge: null },
  { section: 'Analysis' },
  { path: '/sandbox', icon: '🔬', label: 'AI Sandbox', badge: null },
  { path: '/trends', icon: '📈', label: 'Trends', badge: null },
  { path: '/credibility', icon: '🔍', label: 'Fact Check', badge: null },
  { section: 'System' },
  { path: '/alerts', icon: '🚨', label: 'Alerts', badge: 5 },
  { path: '/settings', icon: '⚙️', label: 'Settings', badge: null },
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-icon">🛡️</div>
        <div className="logo-text">
          <h1>SentinelGPT</h1>
          <span>Crisis Intelligence</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item, i) => {
          if (item.section) {
            return (
              <div key={`section-${i}`} className="nav-section-title">
                {item.section}
              </div>
            );
          }
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.badge && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-toggle" onClick={onToggle}>
          {collapsed ? '→' : '← Collapse'}
          <span className="sidebar-footer-text"> sidebar</span>
        </button>
      </div>
    </aside>
  );
}
