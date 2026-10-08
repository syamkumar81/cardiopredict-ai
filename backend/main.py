import os
import sys
from pathlib import Path
from typing import Dict, Any
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
import numpy as np
import joblib

# Paths
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "heart_disease_ann_model.keras"
SCALER_PATH = BASE_DIR / "heart_disease_scaler.pkl"

# Global references for loaded artifacts
model = None
scaler = None

# Feature order strictly matching the trained model and scaler
FEATURE_ORDER = [
    "age",
    "sex",
    "chest_pain_type",
    "resting_blood_pressure",
    "cholesterol",
    "fasting_blood_sugar",
    "resting_ecg",
    "max_heart_rate",
    "exercise_induced_angina",
    "oldpeak",
    "st_slope",
    "num_major_vessels",
    "thalassemia",
]


def load_artifacts():
    global model, scaler
    try:
        # Load scaler
        if not SCALER_PATH.exists():
            raise FileNotFoundError(f"Scaler not found at {SCALER_PATH}")
        scaler = joblib.load(SCALER_PATH)
        print(f"[INFO] Scaler loaded successfully from {SCALER_PATH}")

        # Load Keras model
        if not MODEL_PATH.exists():
            raise FileNotFoundError(f"Model not found at {MODEL_PATH}")
        
        # Import TensorFlow/Keras only here or globally
        import tensorflow as tf
        model = tf.keras.models.load_model(MODEL_PATH)
        print(f"[INFO] ANN Model loaded successfully from {MODEL_PATH}")
    except Exception as e:
        print(f"[ERROR] Failed to load model or scaler: {e}", file=sys.stderr)
        raise e


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Load the model and scaler
    load_artifacts()
    yield
    # Shutdown logic if needed


app = FastAPI(
    title="CardioPredict AI API",
    description="Production-grade AI Heart Disease Prediction Service using Deep Learning ANN",
    version="1.0.0",
    lifespan=lifespan,
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins including localhost:5173
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PatientData(BaseModel):
    age: float = Field(..., ge=1, le=120, description="Age in years (1 - 120)")
    sex: int = Field(..., ge=0, le=1, description="0 = Female, 1 = Male")
    chest_pain_type: int = Field(
        ..., ge=0, le=3, description="0 = Typical Angina, 1 = Atypical Angina, 2 = Non-Anginal Pain, 3 = Asymptomatic"
    )
    resting_blood_pressure: float = Field(
        ..., ge=50, le=300, description="Resting blood pressure in mmHg"
    )
    cholesterol: float = Field(
        ..., ge=50, le=700, description="Serum cholesterol in mg/dL"
    )
    fasting_blood_sugar: int = Field(
        ..., ge=0, le=1, description="0 = Normal (<=120 mg/dL), 1 = High (>120 mg/dL)"
    )
    resting_ecg: int = Field(
        ..., ge=0, le=2, description="0 = Normal, 1 = ST-T Wave Abnormality, 2 = Left Ventricular Hypertrophy"
    )
    max_heart_rate: float = Field(
        ..., ge=40, le=250, description="Maximum heart rate achieved in bpm"
    )
    exercise_induced_angina: int = Field(
        ..., ge=0, le=1, description="0 = No, 1 = Yes"
    )
    oldpeak: float = Field(
        ..., ge=0.0, le=10.0, description="ST depression induced by exercise relative to rest"
    )
    st_slope: int = Field(
        ..., ge=0, le=2, description="0 = Downsloping, 1 = Flat, 2 = Upsloping"
    )
    num_major_vessels: int = Field(
        ..., ge=0, le=3, description="Number of major vessels (0-3) colored by fluoroscopy"
    )
    thalassemia: int = Field(
        ..., ge=0, le=3, description="Thalassemia category (0, 1, 2, 3)"
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "age": 55,
                "sex": 1,
                "chest_pain_type": 2,
                "resting_blood_pressure": 140,
                "cholesterol": 250,
                "fasting_blood_sugar": 0,
                "resting_ecg": 1,
                "max_heart_rate": 145,
                "exercise_induced_angina": 0,
                "oldpeak": 1.2,
                "st_slope": 1,
                "num_major_vessels": 1,
                "thalassemia": 2,
            }
        }
    }


class PredictionResponse(BaseModel):
    prediction: int = Field(..., description="0 = No Heart Disease, 1 = Heart Disease")
    prediction_label: str = Field(..., description="'Heart Disease' or 'No Heart Disease'")
    probability: float = Field(..., description="Likelihood percentage (0.0 to 100.0)")
    risk_level: str = Field(..., description="'Low', 'Moderate', or 'High'")


@app.get("/health", tags=["System"])
async def health_check() -> Dict[str, str]:
    """Health check endpoint to verify system status."""
    return {"status": "healthy"}


@app.get("/model-info", tags=["Model"])
async def model_info() -> Dict[str, Any]:
    """Provides architecture details and metadata regarding the trained ANN model."""
    total_params = model.count_params() if model else 10565
    return {
        "model_name": "Artificial Neural Network (ANN)",
        "task": "Binary Classification",
        "input_features": FEATURE_ORDER,
        "input_count": len(FEATURE_ORDER),
        "total_params": total_params,
        "architecture": [
            {"layer": "Input", "units": 13, "activation": "Standardized"},
            {"layer": "Dense 1", "units": 64, "activation": "ReLU"},
            {"layer": "Dropout 1", "rate": "30%", "activation": "None"},
            {"layer": "Dense 2", "units": 32, "activation": "ReLU"},
            {"layer": "Dropout 2", "rate": "20%", "activation": "None"},
            {"layer": "Dense 3", "units": 16, "activation": "ReLU"},
            {"layer": "Output", "units": 1, "activation": "Sigmoid"},
        ],
        "optimizer": "Adam",
        "loss": "Binary Crossentropy",
        "scaler": "StandardScaler",
    }


@app.post("/predict", response_model=PredictionResponse, tags=["Prediction"])
async def predict_heart_disease(patient: PatientData):
    """
    Predict heart disease risk probability given 13 clinical parameters.
    Pipeline:
    1. Extract features in exact training order
    2. Standardize using StandardScaler
    3. Pass to Deep Learning ANN Model
    4. Compute risk level and return response
    """
    global model, scaler

    if model is None or scaler is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Predictive model or scaler is not loaded. Please verify backend artifacts.",
        )

    try:
        # 1. Feature extraction in exact specified order
        feature_dict = patient.model_dump()
        input_values = [feature_dict[feat] for feat in FEATURE_ORDER]
        
        # 2. Reshape to (1, 13) 2D array
        input_array = np.array(input_values, dtype=np.float32).reshape(1, -1)

        # 3. Standardize features
        scaled_features = scaler.transform(input_array)

        # 4. Predict using Deep Learning ANN
        # Keras output for Sigmoid is single float probability in [0, 1]
        raw_pred = model.predict(scaled_features, verbose=0)
        prob_float = float(raw_pred[0][0])
        prob_percentage = round(prob_float * 100.0, 2)

        # 5. Threshold at 0.5
        prediction = 1 if prob_float >= 0.5 else 0
        prediction_label = "Heart Disease" if prediction == 1 else "No Heart Disease"

        # 6. Risk classification:
        # 0–39%: Low Risk
        # 40–69%: Moderate Risk
        # 70–100%: High Risk
        if prob_percentage < 40.0:
            risk_level = "Low"
        elif prob_percentage < 70.0:
            risk_level = "Moderate"
        else:
            risk_level = "High"

        return PredictionResponse(
            prediction=prediction,
            prediction_label=prediction_label,
            probability=prob_percentage,
            risk_level=risk_level,
        )

    except Exception as e:
        print(f"[ERROR] Prediction failed: {e}", file=sys.stderr)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while evaluating the prediction: {str(e)}",
        )
