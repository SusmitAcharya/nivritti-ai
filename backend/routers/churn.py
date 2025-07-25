from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pathlib import Path
import pandas as pd, joblib

from utils.preprocessing import prep_churn
from utils.supabase_client import supabase

router = APIRouter(prefix="/api/churn", tags=["churn"])

MODEL_PATH = Path(__file__).resolve().parent.parent / "models" / "churn_model.pkl"
churn_model = joblib.load(MODEL_PATH)

class ChurnRequest(BaseModel):
    rows: list[dict]
    token: str

@router.post("/")
def churn(req: ChurnRequest):
    try:
        user = supabase.auth.api.get_user(req.token)
        user_id = user.id
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    df = pd.DataFrame(req.rows)
    X = prep_churn(df)
    probs = churn_model.predict_proba(X)[:, 1]

    response = [
        {
            "customer_id": row.get("customer_id", idx),
            "churn_probability": float(p),
        }
        for idx, (row, p) in enumerate(zip(req.rows, probs))
    ]

    supabase.table("predictions").insert(
        {"user_id": user_id, "type": "churn", "data": response}
    ).execute()

    return {"churn": response}
