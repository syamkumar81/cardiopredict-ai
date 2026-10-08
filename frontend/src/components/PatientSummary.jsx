import React from 'react';
import { 
  User, Activity, Heart, Droplets, Zap, Gauge, 
  Dna, Stethoscope, FileSpreadsheet, CheckCircle2 
} from 'lucide-react';

export default function PatientSummary({ patientData }) {
  if (!patientData) return null;

  const sexMap = { 0: 'Female', 1: 'Male' };
  const cpMap = {
    0: 'Typical Angina',
    1: 'Atypical Angina',
    2: 'Non-Anginal Pain',
    3: 'Asymptomatic',
  };
  const fbsMap = { 0: 'Normal (≤ 120 mg/dL)', 1: 'High (> 120 mg/dL)' };
  const ecgMap = {
    0: 'Normal',
    1: 'ST-T Wave Abnormality',
    2: 'Left Ventricular Hypertrophy',
  };
  const exangMap = { 0: 'No', 1: 'Yes' };
  const slopeMap = { 0: 'Downsloping', 1: 'Flat', 2: 'Upsloping' };
  const thalMap = { 0: '0 (Normal/Ref)', 1: '1 (Fixed Defect)', 2: '2 (Normal)', 3: '3 (Reversible Defect)' };

  const summaryItems = [
    {
      label: 'Age',
      value: `${patientData.age} years`,
      icon: User,
      category: 'Basic',
    },
    {
      label: 'Biological Sex',
      value: `${sexMap[patientData.sex] || patientData.sex} (${patientData.sex})`,
      icon: User,
      category: 'Basic',
    },
    {
      label: 'Chest Pain Type',
      value: `${cpMap[patientData.chest_pain_type] || patientData.chest_pain_type} (${patientData.chest_pain_type})`,
      icon: Heart,
      category: 'Clinical',
    },
    {
      label: 'Resting Blood Pressure',
      value: `${patientData.resting_blood_pressure} mmHg`,
      icon: Gauge,
      category: 'Measurements',
    },
    {
      label: 'Serum Cholesterol',
      value: `${patientData.cholesterol} mg/dL`,
      icon: Droplets,
      category: 'Measurements',
    },
    {
      label: 'Fasting Blood Sugar',
      value: `${fbsMap[patientData.fasting_blood_sugar] || patientData.fasting_blood_sugar}`,
      icon: Activity,
      category: 'Clinical',
    },
    {
      label: 'Resting ECG',
      value: `${ecgMap[patientData.resting_ecg] || patientData.resting_ecg}`,
      icon: Stethoscope,
      category: 'Cardiac Tests',
    },
    {
      label: 'Maximum Heart Rate',
      value: `${patientData.max_heart_rate} bpm`,
      icon: Zap,
      category: 'Measurements',
    },
    {
      label: 'Exercise Angina',
      value: `${exangMap[patientData.exercise_induced_angina] || patientData.exercise_induced_angina}`,
      icon: Activity,
      category: 'Clinical',
    },
    {
      label: 'ST Depression (Oldpeak)',
      value: `${patientData.oldpeak}`,
      icon: Activity,
      category: 'Cardiac Tests',
    },
    {
      label: 'ST Slope',
      value: `${slopeMap[patientData.st_slope] || patientData.st_slope} (${patientData.st_slope})`,
      icon: Activity,
      category: 'Cardiac Tests',
    },
    {
      label: 'Major Vessels (Fluoroscopy)',
      value: `${patientData.num_major_vessels} vessels`,
      icon: Dna,
      category: 'Cardiac Tests',
    },
    {
      label: 'Thalassemia Status',
      value: `${thalMap[patientData.thalassemia] || patientData.thalassemia}`,
      icon: Dna,
      category: 'Cardiac Tests',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-cyan-500" />
          <span>Patient Health Parameter Summary</span>
        </h3>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          13 Standardized Inputs
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {summaryItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1.5">
                <Icon className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
                  {item.label}
                </span>
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white font-mono pl-6">
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
