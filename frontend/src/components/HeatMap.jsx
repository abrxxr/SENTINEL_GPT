import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix: force Leaflet to use CDN icons safely
try {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
} catch(e) { /* silently ignore */ }

function InvalidateOnMount() {
  const map = useMap();
  useEffect(() => { setTimeout(() => map.invalidateSize(), 100); }, [map]);
  return null;
}

export default function HeatMap({ events }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay ensures DOM is ready before Leaflet initialises
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  const SEVERITY_COLORS = {
    critical: '#ef4444',
    high:     '#f97316',
    medium:   '#f59e0b',
    low:      '#3b82f6',
  };

  return (
    <div className="glass-card map-section">
      <div className="card-header">
        <div className="card-title">
          <span className="icon">🗺️</span> Real-Time Crisis Map
        </div>
        <span className="card-badge live">LIVE FEED</span>
      </div>

      {/* Fixed pixel height — critical for Leaflet to render */}
      <div style={{ height: '420px', width: '100%', position: 'relative', zIndex: 1, borderRadius: '12px', overflow: 'hidden', marginTop: '0.5rem' }}>
        {mounted && (
          <MapContainer
            center={[20, 10]}
            zoom={2}
            scrollWheelZoom={false}
            style={{ height: '420px', width: '100%' }}
            attributionControl={false}
          >
            <InvalidateOnMount />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap &copy; CARTO'
            />

            {events.filter(e => e.lat != null && e.lng != null).slice(0, 40).map(evt => {
              const color = SEVERITY_COLORS[evt.severity] || '#3b82f6';
              const icon = L.divIcon({
                className: '',
                html: `<div style="
                  width:14px; height:14px; border-radius:50%;
                  background:${color};
                  border:2px solid #fff;
                  box-shadow:0 0 10px ${color}, 0 0 20px ${color}60;
                "></div>`,
                iconSize:   [14, 14],
                iconAnchor: [7, 7],
              });

              return (
                <Marker key={evt.id} position={[evt.lat, evt.lng]} icon={icon}>
                  <Popup>
                    <div style={{ minWidth: 180 }}>
                      <strong>{evt.icon} {evt.title}</strong><br/>
                      📍 {evt.location}<br/>
                      Severity: <span style={{ color, fontWeight: 700, textTransform: 'uppercase' }}>{evt.severity}</span><br/>
                      Confidence: {evt.confidence}%<br/>
                      Source: {evt.source}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}
      </div>
    </div>
  );
}
