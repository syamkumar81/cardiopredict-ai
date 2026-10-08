import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, AlertCircle, Loader2, RefreshCw, 
  User, Stethoscope, HeartPulse, ArrowRight 
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Disclaimer from '../components/Disclaimer';

export default function Predict() {
  const navigate = useNavigate();

  // Form State initialized for all 13 features (empty initial values, no default clinical selection)
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    chest_pain_type: '',
    resting_blood_pressure: '',
    cholesterol: '',
    fasting_blood_sugar: '',
    resting_ecg: '',
    max_heart_rate: '',
    exercise_induced_angina: '',
    oldpeak: '',
    st_slope: '',
    num_major_vessels: '',
    thalassemia: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Demo Patient Presets
  const loadPreset = (presetType) => {
    setErrors({});
    setApiError(null);

    if (presetType === 'low_risk') {
      setFormData({
        age: '38',
        sex: '0', // Female
        chest_pain_type: '1', // Atypical Angina
        resting_blood_pressure: '115',
        cholesterol: '180',
        fasting_blood_sugar: '0', // Normal
        resting_ecg: '0', // Normal
        max_heart_rate: '172',
        exercise_induced_angina: '0', // No
        oldpeak: '0.2',
        st_slope: '2', // Upsloping
        num_major_vessels: '0',
        thalassemia: '2', // 2
      });
    } else if (presetType === 'high_risk') {
      setFormData({
        age: '62',
        sex: '1', // Male
        chest_pain_type: '3', // Asymptomatic
        resting_blood_pressure: '155',
        cholesterol: '298',
        fasting_blood_sugar: '1', // High
        resting_ecg: '1', // ST-T Wave Abnormality
        max_heart_rate: '118',
        exercise_induced_angina: '1', // Yes
        oldpeak: '2.8',
        st_slope: '0', // Downsloping
        num_major_vessels: '2',
        thalassemia: '3', // 3
      });
    } else if (presetType === 'moderate_risk') {
      setFormData({
        age: '54',
        sex: '1', // Male
        chest_pain_type: '2', // Non-Anginal
        resting_blood_pressure: '135',
        cholesterol: '240',
        fasting_blood_sugar: '0', // Normal
        resting_ecg: '0', // Normal
        max_heart_rate: '142',
        exercise_induced_angina: '0', // No
        oldpeak: '1.4',
        st_slope: '1', // Flat
        num_major_vessels: '1',
        thalassemia: '2', // 2
      });
    }
  };

  const handleReset = () => {
    setFormData({
      age: '',
      sex: '',
      chest_pain_type: '',
      resting_blood_pressure: '',
      cholesterol: '',
      fasting_blood_sugar: '',
      resting_ecg: '',
      max_heart_rate: '',
      exercise_induced_angina: '',
      oldpeak: '',
      st_slope: '',
      num_major_vessels: '',
      thalassemia: '',
    });
    setErrors({});
    setApiError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    if (apiError) setApiError(null);
  };

  // Strict validation for all 13 features with designated ranges
  const validateForm = () => {
    const newErrors = {};

    // 1. Age (1–120)
    if (!formData.age || formData.age.trim() === '') {
      newErrors.age = 'Please enter age.';
    } else {
      const ageNum = Number(formData.age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        newErrors.age = 'Please enter a valid age (1–120).';
      }
    }

    // 2. Sex (0, 1)
    if (formData.sex === '' || formData.sex === null || formData.sex === undefined) {
      newErrors.sex = 'Please select sex.';
    } else if (!['0', '1'].includes(String(formData.sex))) {
      newErrors.sex = 'Please select sex.';
    }

    // 3. Chest Pain Type (0, 1, 2, 3)
    if (formData.chest_pain_type === '' || formData.chest_pain_type === null || formData.chest_pain_type === undefined) {
      newErrors.chest_pain_type = 'Please select chest pain type.';
    } else if (!['0', '1', '2', '3'].includes(String(formData.chest_pain_type))) {
      newErrors.chest_pain_type = 'Please select chest pain type.';
    }

    // 4. Resting Blood Pressure (70–250 mmHg)
    if (!formData.resting_blood_pressure || formData.resting_blood_pressure.trim() === '') {
      newErrors.resting_blood_pressure = 'Please enter resting blood pressure.';
    } else {
      const bpNum = Number(formData.resting_blood_pressure);
      if (isNaN(bpNum) || bpNum < 70 || bpNum > 250) {
        newErrors.resting_blood_pressure = 'Please enter a valid resting blood pressure (70–250 mmHg).';
      }
    }

    // 5. Cholesterol (50–600 mg/dL)
    if (!formData.cholesterol || formData.cholesterol.trim() === '') {
      newErrors.cholesterol = 'Please enter cholesterol.';
    } else {
      const cholNum = Number(formData.cholesterol);
      if (isNaN(cholNum) || cholNum < 50 || cholNum > 600) {
        newErrors.cholesterol = 'Please enter a valid cholesterol level (50–600 mg/dL).';
      }
    }

    // 6. Fasting Blood Sugar (0, 1)
    if (formData.fasting_blood_sugar === '' || formData.fasting_blood_sugar === null || formData.fasting_blood_sugar === undefined) {
      newErrors.fasting_blood_sugar = 'Please select fasting blood sugar.';
    } else if (!['0', '1'].includes(String(formData.fasting_blood_sugar))) {
      newErrors.fasting_blood_sugar = 'Please select fasting blood sugar.';
    }

    // 7. Resting ECG (0, 1, 2)
    if (formData.resting_ecg === '' || formData.resting_ecg === null || formData.resting_ecg === undefined) {
      newErrors.resting_ecg = 'Please select resting ECG.';
    } else if (!['0', '1', '2'].includes(String(formData.resting_ecg))) {
      newErrors.resting_ecg = 'Please select resting ECG.';
    }

    // 8. Max Heart Rate (50–220 bpm)
    if (!formData.max_heart_rate || formData.max_heart_rate.trim() === '') {
      newErrors.max_heart_rate = 'Please enter maximum heart rate.';
    } else {
      const hrNum = Number(formData.max_heart_rate);
      if (isNaN(hrNum) || hrNum < 50 || hrNum > 220) {
        newErrors.max_heart_rate = 'Please enter a valid maximum heart rate (50–220 bpm).';
      }
    }

    // 9. Exercise-Induced Angina (0, 1)
    if (formData.exercise_induced_angina === '' || formData.exercise_induced_angina === null || formData.exercise_induced_angina === undefined) {
      newErrors.exercise_induced_angina = 'Please select exercise-induced angina.';
    } else if (!['0', '1'].includes(String(formData.exercise_induced_angina))) {
      newErrors.exercise_induced_angina = 'Please select exercise-induced angina.';
    }

    // 10. Oldpeak (0–10, decimal allowed, no negative)
    if (formData.oldpeak === '' || formData.oldpeak === null || formData.oldpeak === undefined || formData.oldpeak.trim() === '') {
      newErrors.oldpeak = 'Please enter Oldpeak value.';
    } else {
      const oldpeakNum = Number(formData.oldpeak);
      if (isNaN(oldpeakNum)) {
        newErrors.oldpeak = 'Please enter a valid Oldpeak value (0–10).';
      } else if (oldpeakNum < 0) {
        newErrors.oldpeak = 'Oldpeak cannot be negative (0–10).';
      } else if (oldpeakNum > 10) {
        newErrors.oldpeak = 'Please enter a valid Oldpeak value (0–10).';
      }
    }

    // 11. ST Slope (0, 1, 2)
    if (formData.st_slope === '' || formData.st_slope === null || formData.st_slope === undefined) {
      newErrors.st_slope = 'Please select ST slope.';
    } else if (!['0', '1', '2'].includes(String(formData.st_slope))) {
      newErrors.st_slope = 'Please select ST slope.';
    }

    // 12. Major Vessels (0, 1, 2, 3)
    if (formData.num_major_vessels === '' || formData.num_major_vessels === null || formData.num_major_vessels === undefined) {
      newErrors.num_major_vessels = 'Please select number of major vessels.';
    } else if (!['0', '1', '2', '3'].includes(String(formData.num_major_vessels))) {
      newErrors.num_major_vessels = 'Please select number of major vessels.';
    }

    // 13. Thalassemia (0, 1, 2, 3)
    if (formData.thalassemia === '' || formData.thalassemia === null || formData.thalassemia === undefined) {
      newErrors.thalassemia = 'Please select thalassemia.';
    } else if (!['0', '1', '2', '3'].includes(String(formData.thalassemia))) {
      newErrors.thalassemia = 'Please select thalassemia.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setLoading(true);

    // Exact 13 features in training order
    const payload = {
      age: parseFloat(formData.age),
      sex: parseInt(formData.sex, 10),
      chest_pain_type: parseInt(formData.chest_pain_type, 10),
      resting_blood_pressure: parseFloat(formData.resting_blood_pressure),
      cholesterol: parseFloat(formData.cholesterol),
      fasting_blood_sugar: parseInt(formData.fasting_blood_sugar, 10),
      resting_ecg: parseInt(formData.resting_ecg, 10),
      max_heart_rate: parseFloat(formData.max_heart_rate),
      exercise_induced_angina: parseInt(formData.exercise_induced_angina, 10),
      oldpeak: parseFloat(formData.oldpeak),
      st_slope: parseInt(formData.st_slope, 10),
      num_major_vessels: parseInt(formData.num_major_vessels, 10),
      thalassemia: parseInt(formData.thalassemia, 10),
    };

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    try {
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errMessage = 'Prediction request failed.';
        try {
          const errData = await response.json();
          if (errData && errData.detail) {
            errMessage = typeof errData.detail === 'string' ? errData.detail : JSON.stringify(errData.detail);
          }
        } catch {
          errMessage = `Server error (${response.status})`;
        }
        throw new Error(errMessage);
      }

      const result = await response.json();

      sessionStorage.setItem('cpa_last_result', JSON.stringify({ result, patientData: payload }));

      navigate('/results', {
        state: {
          result,
          patientData: payload,
        },
      });
    } catch (err) {
      if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError'))) {
        setApiError('Prediction service is unavailable. Please start the backend server.');
      } else {
        setApiError(err.message || 'An unexpected error occurred during prediction evaluation.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen cyber-grid py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Heart Disease Prediction
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Enter the patient's clinical parameters to generate an AI-based prediction.
            </p>
          </div>

          {/* Demo Patient Presets */}
          <div className="mb-6 p-4 rounded-2xl glass-card border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <RefreshCw className="w-4 h-4 text-cyan-500" />
              <span>Demo Patient Presets:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => loadPreset('low_risk')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 transition-colors"
              >
                Demo Patient (Low Risk)
              </button>
              <button
                type="button"
                onClick={() => loadPreset('moderate_risk')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 transition-colors"
              >
                Demo Patient (Moderate Risk)
              </button>
              <button
                type="button"
                onClick={() => loadPreset('high_risk')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 transition-colors"
              >
                Demo Patient (High Risk)
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-500/10 hover:bg-slate-500/20 text-slate-600 dark:text-slate-400 border border-slate-500/20 transition-colors"
              >
                Clear Form
              </button>
            </div>
          </div>

          {/* Clean API Error Notice */}
          {apiError && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500 mt-0.5" />
              <div>
                <p className="font-semibold">Connection Notice</p>
                <p className="text-xs mt-0.5">{apiError}</p>
              </div>
            </div>
          )}

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* SECTION 1: Basic Information */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel shadow-sm border border-slate-200/90 dark:border-slate-800 space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Basic Information
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  id="age"
                  label="Age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g. 55"
                  unit="years"
                  min="1"
                  max="120"
                  step="1"
                  error={errors.age}
                />

                <SelectField
                  id="sex"
                  label="Sex"
                  value={formData.sex}
                  onChange={handleChange}
                  placeholder="Select Sex"
                  options={[
                    { value: '0', label: '0 = Female' },
                    { value: '1', label: '1 = Male' },
                  ]}
                  error={errors.sex}
                />
              </div>
            </div>

            {/* SECTION 2: Clinical Measurements */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel shadow-sm border border-slate-200/90 dark:border-slate-800 space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Clinical Measurements
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  id="resting_blood_pressure"
                  label="Resting Blood Pressure"
                  type="number"
                  value={formData.resting_blood_pressure}
                  onChange={handleChange}
                  placeholder="e.g. 130"
                  unit="mmHg"
                  min="70"
                  max="250"
                  step="1"
                  error={errors.resting_blood_pressure}
                />

                <InputField
                  id="cholesterol"
                  label="Cholesterol"
                  type="number"
                  value={formData.cholesterol}
                  onChange={handleChange}
                  placeholder="e.g. 240"
                  unit="mg/dL"
                  min="50"
                  max="600"
                  step="1"
                  error={errors.cholesterol}
                />

                <InputField
                  id="max_heart_rate"
                  label="Maximum Heart Rate"
                  type="number"
                  value={formData.max_heart_rate}
                  onChange={handleChange}
                  placeholder="e.g. 150"
                  unit="bpm"
                  min="50"
                  max="220"
                  step="1"
                  error={errors.max_heart_rate}
                />

                <InputField
                  id="oldpeak"
                  label="Oldpeak"
                  type="number"
                  value={formData.oldpeak}
                  onChange={handleChange}
                  placeholder="e.g. 1.2"
                  min="0"
                  max="10"
                  step="any"
                  helperText="Decimal values allowed (e.g. 1.2, 2.5, 0.8)"
                  error={errors.oldpeak}
                />
              </div>
            </div>

            {/* SECTION 3: Heart Test Information */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel shadow-sm border border-slate-200/90 dark:border-slate-800 space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Heart Test Information
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <SelectField
                  id="chest_pain_type"
                  label="Chest Pain Type"
                  value={formData.chest_pain_type}
                  onChange={handleChange}
                  placeholder="Select Chest Pain Type"
                  options={[
                    { value: '0', label: '0 = Typical Angina' },
                    { value: '1', label: '1 = Atypical Angina' },
                    { value: '2', label: '2 = Non-Anginal Pain' },
                    { value: '3', label: '3 = Asymptomatic' },
                  ]}
                  error={errors.chest_pain_type}
                />

                <SelectField
                  id="fasting_blood_sugar"
                  label="Fasting Blood Sugar"
                  value={formData.fasting_blood_sugar}
                  onChange={handleChange}
                  placeholder="Select Fasting Blood Sugar"
                  options={[
                    { value: '0', label: '0 = Normal' },
                    { value: '1', label: '1 = High' },
                  ]}
                  error={errors.fasting_blood_sugar}
                />

                <SelectField
                  id="resting_ecg"
                  label="Resting ECG"
                  value={formData.resting_ecg}
                  onChange={handleChange}
                  placeholder="Select Resting ECG"
                  options={[
                    { value: '0', label: '0 = Normal' },
                    { value: '1', label: '1 = ST-T Wave Abnormality' },
                    { value: '2', label: '2 = Left Ventricular Hypertrophy' },
                  ]}
                  error={errors.resting_ecg}
                />

                <SelectField
                  id="exercise_induced_angina"
                  label="Exercise-Induced Angina"
                  value={formData.exercise_induced_angina}
                  onChange={handleChange}
                  placeholder="Select Exercise-Induced Angina"
                  options={[
                    { value: '0', label: '0 = No' },
                    { value: '1', label: '1 = Yes' },
                  ]}
                  error={errors.exercise_induced_angina}
                />

                <SelectField
                  id="st_slope"
                  label="ST Slope"
                  value={formData.st_slope}
                  onChange={handleChange}
                  placeholder="Select ST Slope"
                  options={[
                    { value: '0', label: '0 = Downsloping' },
                    { value: '1', label: '1 = Flat' },
                    { value: '2', label: '2 = Upsloping' },
                  ]}
                  error={errors.st_slope}
                />

                <SelectField
                  id="num_major_vessels"
                  label="Number of Major Vessels"
                  value={formData.num_major_vessels}
                  onChange={handleChange}
                  placeholder="Select Number of Major Vessels"
                  options={[
                    { value: '0', label: '0' },
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' },
                  ]}
                  error={errors.num_major_vessels}
                />

                <div className="sm:col-span-2 lg:col-span-3">
                  <SelectField
                    id="thalassemia"
                    label="Thalassemia"
                    value={formData.thalassemia}
                    onChange={handleChange}
                    placeholder="Select Thalassemia"
                    options={[
                      { value: '0', label: '0' },
                      { value: '1', label: '1' },
                      { value: '2', label: '2' },
                      { value: '3', label: '3' },
                    ]}
                    error={errors.thalassemia}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Submit Button */}
            <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing Patient Data...</span>
                  </>
                ) : (
                  <>
                    <Activity className="w-5 h-5" />
                    <span>Predict Heart Disease</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Medical Disclaimer */}
          <div className="mt-6">
            <Disclaimer />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
