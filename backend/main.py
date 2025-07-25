from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from routers import forecast, segments, churn

app = FastAPI()

# ✅ Enable CORS (Frontend can communicate with backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict to "http://localhost:5173" if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Register API route modules
app.include_router(forecast.router)
app.include_router(segments.router)
app.include_router(churn.router)

# Optional root endpoint for health check
@app.get("/")
def read_root():
    return {"status": "Nivritti AI backend is running"}
