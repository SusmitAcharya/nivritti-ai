from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import pickle
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load .env if needed
load_dotenv()

# Load models
with open("models/forecast_model.pkl", "rb") as f:
    forecast_model = pickle.load(f)

with open("models/segmentation_model.pkl", "rb") as f:
    segmentation_model = pickle.load(f)

with open("models/churn_model.pkl", "rb") as f:
    churn_model = pickle.load(f)

# Initialize app
app = FastAPI(title="Nivritti AI Backend")

# CORS (allow frontend on localhost or any other domain)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust to specific domain in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =============================
# Request Schemas
# =============================

class ForecastInput(BaseModel):
    date: str
    marketing_spend: float
    footfall: int
    weather_index: float
    inventory_level: float
    competitor_price: float
    promotions: int

class SegmentInput(BaseModel):
    total_spent: float
    avg_cart_value: float
    visits: int
    days_since_last_visit: int
    loyalty_score: float
    email_engagement_: float  # trailing underscore due to `%` in original
    category_preference: int
    preferred_payment_method: int

class ChurnInput(BaseModel):
    monthly_visits: int
    avg_ticket_size: float
    total_revenue: float
    support_tickets: int
    complaint_rate: float
    satisfaction_score: float
    used_coupon: int

# =============================
# API Endpoints
# =============================

@app.get("/")
def root():
    return {"message": "Nivritti AI backend is live."}

@app.post("/predict/forecast")
def predict_forecast(data: ForecastInput):
    df = pd.DataFrame([data.dict()])
    try:
        prediction = forecast_model.predict(df)[0]
        return {"predicted_sales": round(prediction, 2)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/segment")
def predict_segment(data: SegmentInput):
    df = pd.DataFrame([data.dict()])
    try:
        cluster = segmentation_model.predict(df)[0]
        return {"customer_segment": int(cluster)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict/churn")
def predict_churn(data: ChurnInput):
    df = pd.DataFrame([data.dict()])
    try:
        churn_prob = churn_model.predict_proba(df)[0][1]
        churn_label = int(churn_prob > 0.5)
        return {
            "churn_probability": round(churn_prob, 3),
            "churn_risk": "High" if churn_label else "Low"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
