import os
import aiohttp
import random
from datetime import datetime

# Fallback crisis data if NewsAPI fails or isn't enabled
FALLBACK_NEWS = [
    {
        "title": "Severe flooding reported in Chennai following heavy rainfall, rescue teams deployed",
        "description": "Heavy monsoon showers triggered extreme urban flooding in parts of Chennai, forcing residents to evacuate low-lying areas. Authorities are on high alert.",
        "source": "Reuters",
        "type": "flood",
        "location": "Chennai, India",
        "lat": 13.0827,
        "lng": 80.2707,
        "country": "India",
        "severity": "high"
    },
    {
        "title": "Magnitude 6.2 earthquake strikes Tokyo, minor damage reported in older districts",
        "description": "A strong earthquake shook Tokyo and surrounding prefectures. High-speed trains were temporarily suspended, and fire crews are assessing building integrity.",
        "source": "BBC News",
        "type": "earthquake",
        "location": "Tokyo, Japan",
        "lat": 35.6762,
        "lng": 139.6503,
        "country": "Japan",
        "severity": "medium"
    },
    {
        "title": "Outof-control wildfire threatens forest edge near Los Angeles suburb",
        "description": "Wind-driven brush fire has prompted voluntary evacuations in foothill communities. Containment is currently at 15% as high winds hamper aerial drops.",
        "source": "AP News",
        "type": "fire",
        "location": "Los Angeles, USA",
        "lat": 34.0522,
        "lng": -118.2437,
        "country": "USA",
        "severity": "high"
    },
    {
        "title": "Local health department flags spike in severe respiratory virus cases",
        "description": "Health authorities have activated alert networks after a sudden cluster of unidentified pneumonia cases emerged in the region. Diagnostic labs are sequencing samples.",
        "source": "Government Alert",
        "type": "disease",
        "location": "Nairobi, Kenya",
        "lat": -1.2921,
        "lng": 36.8219,
        "country": "Kenya",
        "severity": "medium"
    }
]

class NewsCollector:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("NEWS_API_KEY")
        self.url = "https://newsapi.org/v2/everything"

    async def fetch_crisis_news(self, query: str = "flood OR earthquake OR wildfire OR disaster OR outbreak"):
        if not self.api_key:
            return self.get_fallback_news()

        params = {
            "q": query,
            "sortBy": "publishedAt",
            "pageSize": 10,
            "apiKey": self.api_key
        }

        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(self.url, params=params) as response:
                    if response.status == 200:
                        data = await response.json()
                        articles = data.get("articles", [])
                        return self.parse_articles(articles)
                    else:
                        return self.get_fallback_news()
        except Exception:
            return self.get_fallback_news()

    def parse_articles(self, articles):
        parsed = []
        for art in articles:
            # Basic mapping of keyword to crisis type
            title = art.get("title", "").lower()
            desc = art.get("description", "").lower()
            content = title + " " + desc

            crisis_type = "accident"
            if "flood" in content or "rain" in content or "water" in content:
                crisis_type = "flood"
            elif "earthquake" in content or "quake" in content or "seismic" in content:
                crisis_type = "earthquake"
            elif "fire" in content or "blaze" in content or "burn" in content:
                crisis_type = "fire"
            elif "virus" in content or "outbreak" in content or "disease" in content or "covid" in content:
                crisis_type = "disease"
            elif "storm" in content or "hurricane" in content or "cyclone" in content:
                crisis_type = "storm"

            parsed.append({
                "title": art.get("title"),
                "description": art.get("description"),
                "source": art.get("source", {}).get("name", "News Feed"),
                "type": crisis_type,
                "location": "Global Report",
                "lat": random.uniform(-60, 60),
                "lng": random.uniform(-120, 120),
                "country": "Global",
                "severity": random.choice(["high", "medium", "low"])
            })
        return parsed

    def get_fallback_news(self):
        return [random.choice(FALLBACK_NEWS) for _ in range(3)]
