from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pathlib import Path
import pandas as pd, joblib

from utils.preprocessing import prep_segments
from utils.supabase_client import supabase

router = APIRouter(prefix="/api/segments", tags=["segments"])

MODEL_PATH = Path(__file__).resolve().parent.parent / "models" / "segmentation_model.pkl"
kmeans_model = joblib.load(MODEL_PATH)

class SegmentsRequest(BaseModel):
    rows: list[dict]    # customer features
    token: str          # Supabase JWT

@router.post("/")
def segments(req: SegmentsRequest):
    try:
        user = supabase.auth.api.get_user(req.token)
        user_id = user.id
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    df = pd.DataFrame(req.rows)
    X = prep_segments(df)
    labels = kmeans_model.predict(X)

    counts = pd.Series(labels).value_counts().to_dict()
    response = [
        {"name": f"Segment {seg}", "value": int(count)}
        for seg, count in counts.items()
    ]

    supabase.table("predictions").insert(
        {"user_id": user_id, "type": "segments", "data": response}
    ).execute()

    return {"segments": response}
