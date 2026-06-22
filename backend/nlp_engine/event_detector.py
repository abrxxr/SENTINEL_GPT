import re

CRISIS_KEYWORDS = {
    "flood": ["flood", "flooding", "water level", "submerged", "inundated", "heavy rain", "overflow", "deluge"],
    "earthquake": ["earthquake", "quake", "tremor", "aftershock", "seismic", "shaking", " Richter"],
    "fire": ["fire", "wildfire", "blaze", "flames", "smoke", "burning", "hazmat"],
    "disease": ["virus", "outbreak", "pneumonia", "infection", "epidemic", "health advisory", "pathogen", "contagious"],
    "storm": ["storm", "hurricane", "cyclone", "tornado", "wind speed", "typhoon", "blizzard"],
    "terror": ["terrorist", "bombing", "shooting", "hostage", "attack", "suspicious package", "counter-terrorism"],
    "accident": ["accident", "collision", "derailment", "bridge collapse", "explosion", "chemical spill"]
}

class EventDetector:
    def detect_event_type(self, text: str) -> dict:
        cleaned_text = text.lower()
        scores = {}
        for category, keywords in CRISIS_KEYWORDS.items():
            score = 0
            for kw in keywords:
                if kw.lower() in cleaned_text:
                    score += 1
            if score > 0:
                scores[category] = score

        if not scores:
            return {"type": "accident", "confidence": 50}

        best_category = max(scores, key=scores.get)
        total_score = sum(scores.values())
        confidence = int((scores[best_category] / total_score) * 100) if total_score > 0 else 50
        # Map logical scale
        confidence = max(min(confidence, 98), 65)

        return {
            "type": best_category,
            "confidence": confidence
        }
