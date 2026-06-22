import re
from textblob import TextBlob

PANIC_KEYWORDS = [
    "run", "escape", "terrified", "panic", "trapped", "help", "dying",
    "destroyed", "danger", "scared", "screaming", "chaos", "emergency"
]

class SentimentAnalyzer:
    def analyze(self, text: str) -> dict:
        blob = TextBlob(text)
        polarity = blob.sentiment.polarity
        
        # Keyword-based Panic Score
        panic_matches = 0
        text_lower = text.lower()
        for kw in PANIC_KEYWORDS:
            if kw in text_lower:
                panic_matches += 1
                
        panic_score = min(panic_matches * 25, 100)
        
        # Categorization based on TextBlob polarity and panic metrics
        if panic_score >= 50:
            category = "Panic"
        elif polarity < -0.15:
            category = "Negative"
        elif polarity > 0.15:
            category = "Positive"
        else:
            category = "Neutral"
            
        return {
            "polarity": polarity,
            "subjectivity": blob.sentiment.subjectivity,
            "panic_score": panic_score,
            "category": category
        }
