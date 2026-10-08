import React, { useEffect, useState } from 'react';
import { Cpu, ArrowDown } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Disclaimer from '../components/Disclaimer';

export default function Model() {
  const [paramCount, setParamCount] = useState(10565);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/model-info`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.total_params) {
          setParamCount(data.total_params);
        }
      })
      .catch(() => {});
  }, []);

  const modelMetadata = [
    { label: 'Model', value: 'Artificial Neural Network' },
    { label: 'Task', value: 'Binary Classification' },
    { label: 'Input Features', value: '13' },
    { label: 'Output', value: 'Heart Disease / No Heart Disease' },
    { label: 'Activation', value: 'ReLU + Sigmoid' },
    { label: 'Optimizer', value: 'Adam' },
    { label: 'Loss', value: 'Binary Crossentropy' },
    { label: 'Parameters', value: '10,565 Parameters' },
  ];

  const architectureLayers = [
    { title: 'Input', detail: '13 Input Features', color: 'border-cyan-500/40 text-cyan-500' },
    { title: 'Dense 64', detail: 'ReLU Activation', color: 'border-sky-500/40 text-sky-500' },
    { title: 'Dropout 30%', detail: 'Regularization', color: 'border-amber-500/40 text-amber-500' },
    { title: 'Dense 32', detail: 'ReLU Activation', color: 'border-indigo-500/40 text-indigo-500' },
    { title: 'Dropout 20%', detail: 'Regularization', color: 'border-amber-500/40 text-amber-500' },
    { title: 'Dense 16', detail: 'ReLU Activation', color: 'border-purple-500/40 text-purple-500' },
    { title: 'Output 1 Sigmoid', detail: 'Probability [0, 1]', color: 'border-rose-500/40 text-rose-500' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen cyber-grid py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              ANN Model
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Architecture and configuration of the trained Keras Deep Learning model.
            </p>
          </div>

          {/* Model Information Grid */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800 shadow-xl space-y-6">
            <h2 className="text-sm font-mono font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase">
              Model Specifications
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {modelMetadata.map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-1"
                >
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {item.label}
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Diagram */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800 shadow-xl space-y-6">
            <div className="text-center">
              <h2 className="text-sm font-mono font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase">
                Layer Topology
              </h2>
            </div>

            <div className="max-w-md mx-auto space-y-2.5">
              {architectureLayers.map((layer, idx) => (
                <React.Fragment key={layer.title}>
                  <div className={`p-3.5 rounded-2xl border ${layer.color} bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm flex items-center justify-between`}>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {layer.title}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {layer.detail}
                    </span>
                  </div>

                  {idx < architectureLayers.length - 1 && (
                    <div className="flex justify-center text-slate-400 dark:text-slate-600 py-0.5">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Medical Disclaimer */}
          <Disclaimer />
        </div>
      </div>
    </PageTransition>
  );
}
