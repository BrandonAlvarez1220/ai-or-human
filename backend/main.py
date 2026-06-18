from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

# Cargar modelo y vectorizer
model = joblib.load("models/model.pkl")
vectorizer = joblib.load("models/vectorizer.pkl")

# Inicializar app
app = FastAPI()

# Permitir requests desde el frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Esquema del request
class TextInput(BaseModel):
    text: str

# Endpoint de predicción
@app.post("/predict")
def predict(input: TextInput):
    vector = vectorizer.transform([input.text])
    prediction = model.predict(vector)[0]
    probability = model.predict_proba(vector)[0]
    confidence = float(np.max(probability))

    return {
        "label": "AI" if prediction == 1 else "Human",
        "confidence": round(confidence * 100, 2)
    }

# Health check
@app.get("/")
def root():
    return {"status": "ok"}
