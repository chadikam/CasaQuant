from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware


model = joblib.load("backend/house_price_model.pkl")

app = FastAPI()

# Enable CORS for React (dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input data class (raw values)
class HouseData(BaseModel):
    category: int
    type: int
    city: int
    region: int
    room_count: int
    bathroom_count: int
    size: float  # m²
   

@app.post("/predict")
def predict(data: HouseData):
    # Raw inputs
    raw_inputs = {
        "category": data.category,
        "type": data.type,
        "city": data.city,
        "region": data.region,
        "room_count": data.room_count,
        "bathroom_count": data.bathroom_count,
        "size": data.size,
    }

    # Log transform specific inputs
    room_log = np.log1p(data.room_count)
    bath_log = np.log1p(data.bathroom_count)
    size_log = np.log1p(data.size)

    transformed_features = {
        "room_count_log": room_log,
        "bathroom_count_log": bath_log,
        "size_log": size_log
    }

    # Combine into feature vector
    features = [
        data.category,
        data.type,
        data.city,
        data.region,
        room_log,
        bath_log,
        size_log
    ]

    # Predict in log10 scale
    log10_price = model.predict([features])[0]

    # Convert log10(price) → price
    actual_price = 10 ** log10_price

    return {
        "predicted_price": round(actual_price),
        "log10_price": log10_price,
        "note": "Prediction based on log10 price model",
        "raw_inputs": raw_inputs,
        "transformed_inputs": transformed_features
    }
