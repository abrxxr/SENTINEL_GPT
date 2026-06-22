import React, { useState, useEffect, Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Prevents any single component crash from blanking the whole app
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', color: '#ef4444', fontSize: '0.85rem' }}>
          ⚠️ Component error: {this.state.error?.message}
        </div>
      );
    }
    return this.props.children;
  }
}
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import HeatMap from './components/HeatMap';
import LiveFeed from './components/LiveFeed';
import SentimentChart from './components/SentimentChart';
import TrendAnalysis from './components/TrendAnalysis';
import AlertPanel from './components/AlertPanel';
import FactCheck from './pages/FactCheck';
import PipelineSandbox from './pages/PipelineSandbox';

// Demo Data Engines
import {
  generateStats,
  generateEvents,
  generateSentiment,
  generateTrendData,
  generateAlerts,
  generateIntelReport,
  generatePipelineStatus,
  generateEventCounts,
  generateTimeline,
  generateEvent
} from './utils/demoData';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [stats, setStats] = useState(generateStats());
  const [events, setEvents] = useState(generateEvents(20));
  const [sentiment, setSentiment] = useState(generateSentiment());
  const [trendData, setTrendData] = useState(generateTrendData());
  const [alerts, setAlerts] = useState(generateAlerts());
  const [report, setReport] = useState(generateIntelReport());
  const [pipelineSteps, setPipelineSteps] = useState(generatePipelineStatus());
  const [eventCounts, setEventCounts] = useState(generateEventCounts());
  const [timelineItems, setTimelineItems] = useState(generateTimeline());

  // SSE Stream simulation & mock database updates in frontend
  useEffect(() => {
    // Poll updates to simulate live pipeline processing
    const interval = setInterval(() => {
      // 1. Randomly add new event
      if (Math.random() > 0.4) {
        const newEvent = generateEvent();
        setEvents(prev => [newEvent, ...prev.slice(0, 49)]);

        // Update stats
        setStats(prev => ({
          ...prev,
          activeEvents: prev.activeEvents + (Math.random() > 0.6 ? 1 : 0),
          articlesScanned: prev.articlesScanned + Math.floor(Math.random() * 4) + 1,
          fakeNewsBlocked: prev.fakeNewsBlocked + (Math.random() > 0.85 ? 1 : 0),
          alertsSent: prev.alertsSent + (newEvent.severity === 'critical' || newEvent.severity === 'high' ? 1 : 0)
        }));

        // If high severity event, spawn critical alert
        if (newEvent.severity === 'critical' || newEvent.severity === 'high') {
          const newAlert = {
            id: `alrt_${Date.now()}`,
            severity: newEvent.severity,
            title: `CRITICAL ALERT: ${newEvent.title}`,
            description: `Emerging event detected in ${newEvent.location} from ${newEvent.source}.`,
            time: 'Just now',
            acknowledged: false,
            icon: newEvent.icon
          };
          setAlerts(prev => [newAlert, ...prev]);
        }

        // Add to timeline
        const newTimeline = {
          id: `tl_${Date.now()}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: newEvent.title.split('—')[0].trim(),
          description: `${newEvent.icon} Detected event in ${newEvent.location} via NLP engines.`,
          type: newEvent.type,
          severity: newEvent.severity
        };
        setTimelineItems(prev => [newTimeline, ...prev.slice(0, 15)]);
      }

      // 2. Animate pipeline status running
      setPipelineSteps(generatePipelineStatus());
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleAcknowledgeAlert = (id) => {
    setAlerts(prev =>
      prev.map(alrt => (alrt.id === id ? { ...alrt, acknowledged: true } : alrt))
    );
  };

  const triggerCollection = () => {
    // Generate new event instantly
    const newEvent = generateEvent();
    setEvents(prev => [newEvent, ...prev]);
    // Flash pipeline steps as working
    setPipelineSteps(prev =>
      prev.map(step => ({ ...step, status: 'done' }))
    );
  };

  const activeAlertsCount = alerts.filter(alrt => !alrt.acknowledged).length;

  return (
    <ErrorBoundary>
      <Router>
      <div className="app-layout">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

        <div className={`main-content ${collapsed ? 'sidebar-collapsed' : ''}`}>
          <Header collapsed={collapsed} alertCount={activeAlertsCount} onRefresh={triggerCollection} />

          <main className="page-content">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    stats={stats}
                    events={events}
                    sentiment={sentiment}
                    trendData={trendData}
                    alerts={alerts}
                    report={report}
                    pipelineSteps={pipelineSteps}
                    eventCounts={eventCounts}
                    timelineItems={timelineItems}
                    onAcknowledgeAlert={handleAcknowledgeAlert}
                    triggerCollection={triggerCollection}
                  />
                }
              />
              <Route path="/events" element={<Events events={events} />} />
              <Route path="/reports" element={<Reports report={report} />} />
              <Route path="/map" element={<HeatMap events={events} />} />
              <Route path="/feed" element={<LiveFeed events={events} />} />
              <Route path="/sentiment" element={<SentimentChart data={sentiment} />} />
              <Route path="/sandbox" element={<PipelineSandbox />} />
              <Route path="/trends" element={<TrendAnalysis trendData={trendData} />} />
              <Route path="/credibility" element={<FactCheck />} />
              <Route
                path="/alerts"
                element={<AlertPanel alerts={alerts} onAcknowledge={handleAcknowledgeAlert} />}
              />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
    </ErrorBoundary>
  );
}
