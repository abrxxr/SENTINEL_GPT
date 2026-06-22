from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .db import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(String, primary_key=True, index=True)
    type = Column(String, index=True)
    title = Column(String)
    icon = Column(String)
    color = Column(String)
    severity = Column(String, index=True)
    confidence = Column(Integer)
    location = Column(String)
    lat = Column(Float)
    lng = Column(Float)
    country = Column(String)
    source = Column(String)
    credibility = Column(Integer)
    timestamp = Column(DateTime, default=datetime.utcnow)
    time_ago = Column(String)
    affected_population = Column(Integer)

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, index=True)
    severity = Column(String, index=True)
    title = Column(String)
    description = Column(Text)
    time = Column(String)
    acknowledged = Column(Boolean, default=False)
    icon = Column(String)

class IntelligenceReport(Base):
    __tablename__ = "intelligence_reports"

    id = Column(String, primary_key=True, index=True)
    crisis_type = Column(String)
    icon = Column(String)
    severity = Column(String)
    severity_color = Column(String)
    confidence = Column(Integer)
    location = Column(String)
    affected_pop = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    summary = Column(Text)
    recommendations = Column(Text) # JSON serialized list
    sources = Column(Text)         # JSON serialized list of source objects
