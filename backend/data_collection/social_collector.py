import random

SOCIAL_MOCK_DATA = {
    "flood": [
        "Water level in Chennai reaches first floor! Need rescue in Velachery area! #ChennaiFloods",
        "Army and NDRF teams spotted rescuing senior citizens in north street. Good work!",
        "Warning: Chembarambakkam dam gates might open soon. Please move to safer zones.",
        "Rumor: Chennai airport completely shut down due to rain. Actually only domestic flights are delayed.",
        "Flooding on GST road makes it impossible to reach the hospital. Please share emergency contacts."
    ],
    "earthquake": [
        "Massive earthquake shook our apartment in Tokyo! Everyone is outside now.",
        "Tremors felt across all Kanto region. Magnitude estimated 6.1.",
        "No major damage seen nearby, but bullet trains have stopped for safety checks.",
        "Is there a tsunami warning after that Tokyo quake? Pls update.",
        "False alert going around about a 9.0 quake expected tonight. Ignore it, stay calm!"
      ],
    "fire": [
        "Huge forest fire spreading towards the residential area in LA! Smoke is everywhere.",
        "Evacuation warnings issued for sectors A & B. Stay safe and leave now.",
        "Sky turned completely orange. Extremely hard to breathe. #LAFire",
        "Air tankers dropping red fire retardant near our neighborhood.",
        "Fake news: Old video from Australia wildfire is circulating claiming to be current LA fire."
    ]
}

class SocialCollector:
    def collect_social_posts(self, crisis_type: str = "flood", count: int = 5):
        templates = SOCIAL_MOCK_DATA.get(crisis_type, SOCIAL_MOCK_DATA["flood"])
        collected = []
        for _ in range(count):
            text = random.choice(templates)
            source = random.choice(["Twitter/X", "Facebook", "Telegram", "Reddit"])
            collected.append({
                "text": text,
                "source": source,
                "timestamp": str(random.randint(1, 59)) + "m ago"
            })
        return collected
