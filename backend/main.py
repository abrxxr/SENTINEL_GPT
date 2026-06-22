import os
import random
import asyncio
from datetime import datetime
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sse_starlette.sse import EventSourceResponse

# DB components
from database.db import engine, get_db, Base
from database.models import Event as DBEvent, Alert as DBAlert, IntelligenceReport as DBIntelReport

# NLP and collectors
from preprocessing.text_cleaner import TextCleaner
from nlp_engine.event_detector import EventDetector
from nlp_engine.fake_detector import FakeDetector
from nlp_engine.sentiment import SentimentAnalyzer
from intelligence.summarizer import ExtractiveSummarizer
from intelligence.report_generator import ReportGenerator
from data_collection.news_collector import NewsCollector
from data_collection.social_collector import SocialCollector
from alerts.alert_manager import AlertManager

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="SentinelGPT API", description="AI Crisis Intelligence API Layer")

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize engines
cleaner = TextCleaner()
detector = EventDetector()
fake_news_detector = FakeDetector()
sentiment_analyzer = SentimentAnalyzer()
summarizer = ExtractiveSummarizer()
report_gen = ReportGenerator()
alert_manager = AlertManager()
news_col = NewsCollector()
social_col = SocialCollector()

# Load initial seed data
@app.on_event("startup")
def startup_event():
    db = next(get_db())
    if db.query(DBEvent).count() == 0:
        # Seed initial crisis database records
        seed_events = [
            DBEvent(
                id="evt_seed1",
                type="flood",
                title="Severe Flooding Reported — Rescue Operations Active",
                icon="🌊",
                color="#3b82f6",
                severity="critical",
                confidence=96,
                location="Chennai, India",
                lat=13.0827,
                lng=80.2707,
                country="India",
                source="Reuters",
                credibility=95,
                timestamp=datetime.utcnow(),
                time_ago="10 min ago",
                affected_population=120000
            ),
            DBEvent(
                id="evt_seed2",
                type="earthquake",
                title="Magnitude 6.2 Earthquake Strikes coastal region",
                icon="🌍",
                color="#f97316",
                severity="high",
                confidence=92,
                location="Tokyo, Japan",
                lat=35.6762,
                lng=139.6503,
                country="Japan",
                source="BBC News",
                credibility=93,
                timestamp=datetime.utcnow(),
                time_ago="45 min ago",
                affected_population=450000
            ),
            DBEvent(
                id="evt_seed3",
                type="fire",
                title="Outof-control wildfire threatens forest edge",
                icon="🔥",
                color="#ef4444",
                severity="high",
                confidence=89,
                location="Los Angeles, USA",
                lat=34.0522,
                lng=-118.2437,
                country="USA",
                source="AP News",
                credibility=94,
                timestamp=datetime.utcnow(),
                time_ago="1 hr ago",
                affected_population=12000
            )
        ]
        for e in seed_events:
            db.add(e)
            
        # Seed initial Alert record
        seed_alert = DBAlert(
            id="alrt_seed1",
            severity="critical",
            title="CRITICAL WARNING: Chennai Dam Gates Open Warning",
            description="Water levels critical. Downstream area evacuations required.",
            time="5 min ago",
            acknowledged=False,
            icon="🌊"
        )
        db.add(seed_alert)
        db.commit()

@app.get("/api/stats")
def get_stats(db: Session = Depends(get_db)):
    active = db.query(DBEvent).filter(DBEvent.severity != "low").count()
    scanned = db.query(DBEvent).count() * 142 + 2500
    alerts = db.query(DBAlert).count()
    return {
        "activeEvents": active,
        "articlesScanned": scanned,
        "fakeNewsBlocked": int(scanned * 0.05),
        "alertsSent": alerts
    }

@app.get("/api/events")
def get_events(db: Session = Depends(get_db)):
    return db.query(DBEvent).all()

@app.post("/api/analyze")
def analyze_text(text: str, source: str = "Unknown"):
    cleaned = cleaner.clean(text)
    event_info = detector.detect_event_type(cleaned)
    fake_info = fake_news_detector.check_credibility(cleaned, source)
    sentiment_info = sentiment_analyzer.analyze(cleaned)
    summary = summarizer.summarize(text)
    report = report_gen.generate_report(event_info["type"], "Extracted Context", event_info["confidence"], cleaned)
    
    return {
        "cleaned_text": cleaned,
        "classification": event_info,
        "credibility": fake_info,
        "sentiment": sentiment_info,
        "summary": summary,
        "report": report
    }

@app.get("/api/reports")
def get_reports():
    # Return structured intelligence report mock database mapping
    report = report_gen.generate_report("flood", "North Chennai, India", 94, "Heavy monsoon rainfall triggered flash floods across Chennai coastal zones.")
    return [report]

@app.get("/api/alerts")
def get_alerts(db: Session = Depends(get_db)):
    return db.query(DBAlert).all()

@app.post("/api/alerts/{alert_id}/acknowledge")
def acknowledge_alert(alert_id: str, db: Session = Depends(get_db)):
    alert = db.query(DBAlert).filter(DBAlert.id == alert_id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    alert.acknowledged = True
    db.commit()
    return {"status": "success"}

# Real-time event streaming endpoint (SSE)
@app.get("/api/events/stream")
async def events_stream():
    async def event_generator():
        while True:
            await asyncio.sleep(12)
            # Yield random event triggers simulating active scraping pipelines
            types = ["flood", "earthquake", "fire", "disease", "storm"]
            chosen = random.choice(types)
            yield {
                "event": "message",
                "id": str(random.randint(1000, 9999)),
                "data": f"New simulated crisis detected: {chosen.upper()} event in automated ingestion queue."
            }
    return EventSourceResponse(event_generator())

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
