import re

CLICKBAIT_PATTERNS = [
    r"you won't believe",
    r"shocking truth",
    r"secret the government",
    r"miracle cure",
    r"scientists are shocked",
    r"this is why",
    r"unbelievable discovery"
]

class FakeDetector:
    def check_credibility(self, text: str, source: str) -> dict:
        text_lower = text.lower()
        score = 100

        # 1. Evaluate Source Credibility
        source_scores = {
            "reuters": 95, "bbc news": 93, "ap news": 94,
            "cnn": 82, "government alert": 98, "local news blog": 55,
            "twitter/x": 45, "facebook": 35, "whatsapp": 20, "telegram": 30
        }
        source_score = source_scores.get(source.lower(), 60)
        
        # 2. Check Clickbait / Sensational Phrases
        clickbait_penalties = 0
        for pattern in CLICKBAIT_PATTERNS:
            if re.search(pattern, text_lower):
                clickbait_penalties += 20
        
        # 3. Check Capitalization and Punctuation (e.g. ALL CAPS, !!!)
        excessive_caps = sum(1 for c in text if c.isupper()) / (len(text) + 1)
        if excessive_caps > 0.35:
            score -= 15
        
        if "!!!" in text or "???" in text:
            score -= 10
            
        score = min(max(source_score - clickbait_penalties, 15), 98)
        
        return {
            "score": score,
            "reliable": score >= 75,
            "status": "Reliable" if score >= 75 else "Questionable" if score >= 45 else "Unreliable"
        }
