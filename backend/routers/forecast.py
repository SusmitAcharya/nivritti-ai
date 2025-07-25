from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pathlib import Path
import pandas as pd, joblib

from utils.preprocessing import prep_forecast
from utils.supabase_client import supabase

router = APIRouter(prefix="/api/forecast", tags=["forecast"])

# ── Load model safely ──────────────────────────────────────────────
MODEL_PATH = Path(__file__).resolve().parent.parent / "models" / "forecast_model.pkl"
forecast_model = joblib.load(MODEL_PATH)

# ── Request schema ────────────────────────────────────────────────
class ForecastRequest(BaseModel):
    rows: list[dict]    # raw sales rows
    token: str          # Supabase JWT from frontend

# ── Route ─────────────────────────────────────────────────────────
@router.post("/")
def forecast(req: ForecastRequest):
    # Verify JWT
    try:
        user = supabase.auth.api.get_user(req.token)
        user_id = user.id
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    # Data → DataFrame → Preprocess
    df = pd.DataFrame(req.rows)
    X = prep_forecast(df)

    # Predict next 7‑day values
    preds = forecast_model.predict(X)

    result = [
        {
            "date": str(row.get("date")),
            "actual": row.get("sales"),
            "predicted": float(p),
        }
        for row, p in zip(req.rows, preds)
    ]

    # Optional: store in Supabase
    supabase.table("predictions").insert(
        {"user_id": user_id, "type": "forecast", "data": result}
    ).execute()

    return {"forecast": result}
