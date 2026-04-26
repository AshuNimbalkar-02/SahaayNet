from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import uvicorn

app = FastAPI(title="SahaayNet AI Matcher")

class MatchRequest(BaseModel):
    item: str
    location: str
    urgency: str

@app.get("/")
def read_root():
    return {"message": "SahaayNet AI Matching Engine is Active"}

@app.post("/ai/match")
def match_resources(request: MatchRequest):
    # Mock AI Logic
    matches = [
        {"id": 1, "provider": "Community Center", "distance": "0.5km", "item": request.item},
        {"id": 2, "provider": "Local NGO", "distance": "1.2km", "item": request.item}
    ]
    return {
        "intent": request.item,
        "recommendations": matches,
        "status": "AI Analysis Complete"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
