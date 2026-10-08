# CardioPredict AI 🫀⚡
> **Intelligent Heart Health Prediction**  
> *AI-powered heart disease prediction using deep learning.*

A clean, production-grade full-stack web application for cardiovascular risk estimation using a trained Deep Learning Artificial Neural Network (ANN) and StandardScaler pipeline.

---

## 🌟 Key Highlights

- **Original Trained Model**: Uses your original trained `backend/heart_disease_ann_model.keras` and `backend/heart_disease_scaler.pkl` without retraining.
- **Strict 13-Feature Pipeline**: Preserves the exact 13 training feature sequence:
  1. `age`
  2. `sex`
  3. `chest_pain_type`
  4. `resting_blood_pressure`
  5. `cholesterol`
  6. `fasting_blood_sugar`
  7. `resting_ecg`
  8. `max_heart_rate`
  9. `exercise_induced_angina`
  10. `oldpeak`
  11. `st_slope`
  12. `num_major_vessels`
  13. `thalassemia`
- **10,565 Model Parameters**: Multilayer ANN architecture (Input 13 → Dense 64 → Dropout 30% → Dense 32 → Dropout 20% → Dense 16 → Output 1 Sigmoid).
- **FastAPI Backend**: Validates inputs, scales with StandardScaler, evaluates via Keras ANN, applies 0.5 threshold, and returns prediction probability and risk classification.
- **Modern Futuristic UI**: Built with React, Vite, Tailwind CSS, Framer Motion, and Lucide React.
- **Theme Modes**: Clean Light Mode and Cyber Dark Mode with localStorage persistence.
- **Demo Patient Presets**: Quick test presets (*Low Risk*, *Moderate Risk*, *High Risk*) for seamless demonstrations.

---

## 📁 Project Structure

```
project/
│
├── backend/
│   ├── main.py                          # FastAPI backend application
│   ├── heart_disease_ann_model.keras     # Original trained Keras ANN model
│   ├── heart_disease_scaler.pkl          # Original trained StandardScaler
│   └── requirements.txt                  # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx                # Clean navbar (Home, Predict, How It Works, Model)
│   │   │   ├── Footer.jsx                # Minimal footer with technology badges & disclaimer
│   │   │   ├── ThemeToggle.jsx           # Dark / Light mode switcher
│   │   │   ├── HeroSection.jsx           # AI healthcare hero with animated visual
│   │   │   ├── FeatureCard.jsx           # Clean feature cards
│   │   │   ├── InputField.jsx            # Validated input control
│   │   │   ├── SelectField.jsx           # Validated select control
│   │   │   ├── ProbabilityGauge.jsx      # Circular SVG animated probability gauge
│   │   │   ├── PatientSummary.jsx        # 13-parameter clinical review grid
│   │   │   ├── Disclaimer.jsx            # Standardized medical disclaimer
│   │   │   └── PageTransition.jsx        # Smooth page transitions
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx                  # Main landing page
│   │   │   ├── Predict.jsx               # Clinical input & prediction page
│   │   │   ├── Results.jsx               # Prediction result dashboard
│   │   │   ├── HowItWorks.jsx            # Real 4-step pipeline & data flow
│   │   │   └── Model.jsx                 # ANN architecture & parameter count
│   │   │
│   │   ├── App.jsx                       # React Router configuration
│   │   ├── main.jsx                      # Vite entry point
│   │   └── index.css                     # Custom styling & glassmorphism
│   │
│   ├── .env                              # VITE_API_URL=http://localhost:8000
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

---

## 🚀 How to Run

### 1. Start the Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
- API Base URL: `http://localhost:8000`
- Swagger Documentation: `http://localhost:8000/docs`
- Health Check: `GET http://localhost:8000/health`
- Prediction: `POST http://localhost:8000/predict`

### 2. Start the Frontend

In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
- Web Application: `http://localhost:5173`

---

## 🩺 Clinical Parameters & Mappings

1. **Age**: Numeric (years)
2. **Sex**: `0 = Female`, `1 = Male`
3. **Chest Pain Type**: `0 = Typical Angina`, `1 = Atypical Angina`, `2 = Non-Anginal Pain`, `3 = Asymptomatic`
4. **Resting Blood Pressure**: Numeric (mmHg)
5. **Cholesterol**: Numeric (mg/dL)
6. **Fasting Blood Sugar**: `0 = Normal`, `1 = High`
7. **Resting ECG**: `0 = Normal`, `1 = ST-T Wave Abnormality`, `2 = Left Ventricular Hypertrophy`
8. **Maximum Heart Rate**: Numeric (bpm)
9. **Exercise-Induced Angina**: `0 = No`, `1 = Yes`
10. **Oldpeak**: Numeric decimal
11. **ST Slope**: `0 = Downsloping`, `1 = Flat`, `2 = Upsloping`
12. **Number of Major Vessels**: `0, 1, 2, 3`
13. **Thalassemia**: `0, 1, 2, 3`

---

## ⚖️ Medical Disclaimer
CardioPredict AI is an educational and research-oriented prediction system. It is not a medical diagnosis and should not replace evaluation by a qualified healthcare professional.
