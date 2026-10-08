import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { RefreshCw, ArrowLeft, ShieldCheck } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import ProbabilityGauge from '../components/ProbabilityGauge';
import PatientSummary from '../components/PatientSummary';
import Disclaimer from '../components/Disclaimer';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState(() => {
    if (location.state && location.state.result) {
      return location.state;
    }
    const cached = sessionStorage.getItem('cpa_last_result');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (!data) {
      navigate('/predict', { replace: true });
    }
  }, [data, navigate]);

  if (!data || !data.result) {
    return null;
  }

  const { result, patientData } = data;
  const isHeartDisease = result.prediction === 1;
  const probability = Number(result.probability) || 0;
  const riskLevel = result.risk_level || (probability >= 70 ? 'High' : probability >= 40 ? 'Moderate' : 'Low');

  return (
    <PageTransition>
      <div className="min-h-screen cyber-grid py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Top Bar Actions */}
          <div className="flex items-center justify-between">
            <Link
              to="/predict"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Form</span>
            </Link>

            <button
              type="button"
              onClick={() => navigate('/predict')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 transition-all shadow-md shadow-cyan-500/20"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>New Prediction</span>
            </button>
          </div>

          {/* MAIN CARD: AI Prediction */}
          <div className={`p-6 sm:p-8 rounded-3xl glass-card border shadow-xl relative overflow-hidden ${
            riskLevel === 'High'
              ? 'border-rose-500/30 shadow-rose-500/5'
              : riskLevel === 'Moderate'
              ? 'border-amber-500/30 shadow-amber-500/5'
              : 'border-emerald-500/30 shadow-emerald-500/5'
          }`}>
            <div className="pb-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-sm font-mono font-bold tracking-wider text-slate-500 dark:text-cyan-400 uppercase">
                AI Prediction
              </h2>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Trained ANN Model
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-6">
              
              {/* Circular Gauge */}
              <div className="md:col-span-5 flex justify-center">
                <ProbabilityGauge
                  probability={probability}
                  riskLevel={riskLevel}
                  size={220}
                  strokeWidth={14}
                />
              </div>

              {/* Prediction Text & Risk Level */}
              <div className="md:col-span-7 space-y-3 text-center md:text-left">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {isHeartDisease ? (
                    <span className="text-rose-600 dark:text-rose-400">
                      Heart Disease
                    </span>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      No Heart Disease
                    </span>
                  )}
                </h1>

                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Probability: <span className="font-bold font-mono">{probability.toFixed(1)}%</span>
                </p>

                {/* Risk Bar */}
                <div className="pt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                    <span>Model Risk Classification:</span>
                    <span className="font-bold font-mono">{riskLevel} Risk</span>
                  </div>

                  <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        riskLevel === 'High'
                          ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                          : riskLevel === 'Moderate'
                          ? 'bg-gradient-to-r from-emerald-500 to-amber-500'
                          : 'bg-gradient-to-r from-teal-400 to-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(5, probability))}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Low (0–39%)</span>
                    <span>Moderate (40–69%)</span>
                    <span>High (70–100%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PATIENT SUMMARY */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
            <PatientSummary patientData={patientData} />
          </div>

          {/* ACTION BUTTON */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => navigate('/predict')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>New Prediction</span>
            </button>
          </div>

          {/* DISCLAIMER */}
          <div className="pt-4">
            <Disclaimer />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
