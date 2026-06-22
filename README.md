# 🛡️ SentinelGPT — Real-Time Crisis Intelligence Platform

SentinelGPT is a real-time crisis monitoring and intelligence gathering platform that tracks disaster reports, filters fake news/misinformation, performs public sentiment analysis, and automatically generates actionable emergency response briefs.

## Key Features
- **Real-Time Interactive Map**: Live tracking of geographical alerts with pulsing hazard markers.
- **NLP Analysis Pipeline**: Automated classification of crisis types (floods, fires, storms, outbreaks, earthquakes, terror, accidents).
- **Misinformation Evaluator**: Rule-based scoring to flag clickbait patterns, excessive styling, and identify unverified platforms.
- **Sentiment Gauge**: Instant tracking of local panic levels and emotional intensity.
- **Llama 3 Intelligence Briefs**: Extraction of key emergency details along with structured action recommendations.
- **Interactive Dispatches**: Active alert panel with acknowledgment toggles.
- **Trend Charts**: Dynamic visualizations of event rates and flagged misinformation over 24 hours.

---

## 🚀 Quick Start Guide

### 1. Run the Frontend Dashboard
Navigate to the frontend folder, install dependencies, and start the development server:
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser.

### 2. Run the Backend API Server
Navigate to the backend folder, install dependencies, and run the FastAPI server:
```bash
cd backend
pip install -r requirements.txt
python main.py
```
API docs will be available at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## 📂 Project Structure
```
SentinelGPT/
├── frontend/                  # React + Vite Dashboard
│   ├── src/
│   │   ├── components/        # Glassmorphism visual widgets
│   │   ├── pages/             # Dashboard, Events, Reports, Settings
│   │   ├── utils/             # Demo Data engine
│   │   └── App.jsx            # State & routing manager
│   └── index.html
└── backend/                   # FastAPI Web Server
    ├── data_collection/       # NewsAPI and RSS scrapers
    ├── preprocessing/         # Text cleaners
    ├── nlp_engine/            # Event, Fake, and Sentiment classifiers
    ├── intelligence/          # Summarizers and Report builders
    ├── database/              # SQLite connection and SQLAlchemy models
    └── main.py                # Server entry & SSE stream
```
