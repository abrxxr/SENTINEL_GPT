import React from 'react';
import StatsCards from '../components/StatsCards';
import HeatMap from '../components/HeatMap';
import RiskMeter from '../components/RiskMeter';
import LiveFeed from '../components/LiveFeed';
import SentimentChart from '../components/SentimentChart';
import CredibilityGauge from '../components/CredibilityGauge';
import EventDetection from '../components/EventDetection';
import Timeline from '../components/Timeline';
import CrisisBoard from '../components/CrisisBoard';
import IntelligenceReport from '../components/IntelligenceReport';
import AlertPanel from '../components/AlertPanel';
import TrendAnalysis from '../components/TrendAnalysis';
import PipelineStatus from '../components/PipelineStatus';
import NodeHealth from '../components/NodeHealth';
import ActiveStreams from '../components/ActiveStreams';
import ResponseTracker from '../components/ResponseTracker';

export default function Dashboard({
  stats,
  events,
  sentiment,
  trendData,
  alerts,
  report,
  pipelineSteps,
  eventCounts,
  timelineItems,
  onAcknowledgeAlert,
  triggerCollection
}) {
  return (
    <div className="dashboard-grid">
      {/* Row 1: Stat Cards */}
      <StatsCards stats={stats} />

      {/* Row 2: Map & Risk Indicators */}
      <HeatMap events={events} />
      <div className="risk-section" style={{ alignSelf: 'flex-start' }}>
        <RiskMeter value={78} />
        <PipelineStatus steps={pipelineSteps} />
      </div>

      {/* Row 3: Live Feed, Sentiment & Credibility */}
      <LiveFeed events={events} />
      <SentimentChart data={sentiment} />
      <CredibilityGauge value={84} />

      {/* Row 4: Left = Crisis Intelligence Board, Right = NLP Cluster + Response Tracker */}
      <div style={{ gridColumn: '1 / 3', minHeight: '520px' }}>
        <CrisisBoard eventCounts={eventCounts} timelineItems={timelineItems} events={events} />
      </div>

      {/* NLP Cluster + Response Tracker side by side on the right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-lg)', gridColumn: '3 / 5' }}>
        <NodeHealth />
        <ResponseTracker />
      </div>

      {/* Row 5: Trends & Intelligence Report */}
      <TrendAnalysis trendData={trendData} />
      <IntelligenceReport report={report} />

      {/* Row 6: Alerts */}
      <div className="alerts-section" style={{ gridColumn: '1 / -1' }}>
        <AlertPanel alerts={alerts} onAcknowledge={onAcknowledgeAlert} />
      </div>
    </div>
  );
}
