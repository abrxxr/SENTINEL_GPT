import { useState } from 'react';

export default function Header({ collapsed, alertCount = 5, onRefresh }) {
  const [searchQuery, setSearchQuery] = useState('');
  const now = new Date();

  return (
    <header className={`header ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="header-left">
        <div className="header-page-title">
          Command <span>Center</span>
        </div>
        <div className="header-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search events, reports, locations..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            id="global-search"
          />
        </div>
      </div>

      <div className="header-right">
        <div className="system-status">
          <span className="status-dot"></span>
          System Online
        </div>

        <button className="header-btn" title="Refresh Data" id="btn-refresh" onClick={onRefresh}>
          🔄
        </button>

        <button className="header-btn" title="Notifications" id="btn-notifications">
          🔔
          {alertCount > 0 && (
            <span className="badge">{alertCount}</span>
          )}
        </button>

        <button className="header-btn" title="Full Screen" id="btn-fullscreen"
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
          }}
        >
          ⛶
        </button>

        <div className="user-avatar" title="Admin User">
          AD
        </div>
      </div>
    </header>
  );
}
