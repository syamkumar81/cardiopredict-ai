import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, FileText, Scale, Cpu, Activity 
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Disclaimer from '../components/Disclaimer';

export default function HowItWorks() {
  const pipelineSteps = [
    {
      num: '01',
      title: 'Enter Patient Data',
      description: 'The user enters 13 clinical health parameters through the prediction form.',
      icon: FileText,
      color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    },
    {
      num: '02',
      title: 'Preprocess Input',
      description: 'StandardScaler transforms the 13 input features using the saved mean and scale parameters.',
      icon: Scale,
      color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    },
    {
      num: '03',
      title: 'ANN Prediction',
      description: 'The trained Keras ANN processes the scaled input across its hidden layers with ReLU activations.',
      icon: Cpu,
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    },
    {
      num: '04',
      title: 'Prediction Result',
      description: 'The API returns probability and prediction with a 0.5 threshold and risk classification.',
      icon: Activity,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen cyber-grid py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              How It Works
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              The real-time prediction pipeline from input parameters to model output.
            </p>
          </div>

          {/* Visual Flow Diagram */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800 shadow-xl space-y-6">
            <h2 className="text-sm font-mono font-bold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase text-center">
              Data Flow
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              {[
                { label: 'Patient Data', sub: '13 Features' },
                { label: 'Preprocessing', sub: 'StandardScaler' },
                { label: 'ANN Model', sub: 'Keras .keras' },
                { label: 'Prediction', sub: 'Probability & Risk' },
              ].map((node, index, arr) => (
                <React.Fragment key={node.label}>
                  <div className="w-full md:w-auto flex-1 p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      {node.label}
                    </div>
                    <div className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">
                      {node.sub}
                    </div>
                  </div>
                  {index < arr.length - 1 && (
                    <div className="hidden md:flex text-slate-400">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 4 Pipeline Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pipelineSteps.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.num}
                  className="p-6 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-sm hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-cyan-500">
                      {st.num}
                    </span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${st.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {st.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center pt-2">
            <Link
              to="/predict"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20 transition-all"
            >
              <span>Test Prediction</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Medical Disclaimer */}
          <Disclaimer />
        </div>
      </div>
    </PageTransition>
  );
}
