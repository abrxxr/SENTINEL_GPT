import json

RECOMMENDATIONS = {
    "flood": [
        "Evacuate citizens from low-lying areas within 3km of active flood waters.",
        "Coordinate rescue boat dispatches to cut-off residential zones.",
        "Stockpile dry rations, clean drinking water, and medical kits at local shelters.",
        "Advise citizens to switch off household electricity grids before inundation."
    ],
    "earthquake": [
        "Deploy search and rescue canine squads to suspected rubble collapses.",
        "Inspect major highways, overpasses, and bridges for structural integrity.",
        "Establish immediate outdoor field hospital clinics outside structural danger zones.",
        "Conduct public broadcast warnings for potential seismic aftershocks."
    ],
    "fire": [
        "Issue immediate containment drop zones for aerial fire retardants.",
        "Establish physical windbreak boundaries and emergency escape corridors.",
        "Enforce N95 mask requirements due to hazardous particulate index levels.",
        "Coordinate utility outages in wildfire trajectory path."
    ],
    "disease": [
        "Activate district containment protocols and contact tracing centers.",
        "Distribute personal protective gear and verify negative pressure ward capacity.",
        "Broadcast sanitization advisories and symptoms check lists to the public.",
        "Accelerate clinical diagnostic analysis to sequence pathogen strain."
    ],
    "storm": [
        "Issue storm surge evacuation alerts for marine and shore communities.",
        "Verify emergency generator fuel supply for vital hospital systems.",
        "Deploy municipal crews to clear fallen debris blocking transit routes.",
        "Urge public to remain in secure interior building locations."
    ]
}

class ReportGenerator:
    def generate_report(self, event_type: str, location: str, confidence: int, details: str) -> dict:
        severity = "High" if confidence > 85 else "Medium"
        severity_colors = {
            "critical": "#dc2626",
            "high": "#ef4444",
            "medium": "#f59e0b",
            "low": "#10b981"
        }
        
        recs = RECOMMENDATIONS.get(event_type.lower(), [
            "Initiate standard disaster management team response.",
            "Establish direct emergency communication channel with field responders.",
            "Monitor local alerts for further situation escalations."
        ])
        
        return {
            "crisisType": event_type.capitalize(),
            "icon": "🌊" if event_type == "flood" else "🌍" if event_type == "earthquake" else "🔥" if event_type == "fire" else "🦠" if event_type == "disease" else "🌪️" if event_type == "storm" else "🚨",
            "iconBg": "rgba(59, 130, 246, 0.15)",
            "severity": severity,
            "severityColor": severity_colors.get(severity.lower(), "#f59e0b"),
            "confidence": confidence,
            "location": location,
            "affectedPop": "~50,000",
            "summary": f"Incident data suggests an active {event_type} event. Details: {details}",
            "recommendations": recs,
            "sources": [
                {"name": "Local RSS Alerts", "credibility": 90, "type": "Meteorological"},
                {"name": "Social Intelligence Engine", "credibility": 75, "type": "NLP Aggregator"}
            ]
        }

