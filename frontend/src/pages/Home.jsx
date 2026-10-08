import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, Zap, SlidersHorizontal, ArrowRight, ChevronRight 
} from 'lucide-react';
import HeroSection from '../components/HeroSection';
import FeatureCard from '../components/FeatureCard';
import PageTransition from '../components/PageTransition';
import Disclaimer from '../components/Disclaimer';

export default function Home() {
  const features = [
    {
      icon: Cpu,
      title: 'AI Powered',
      description: 'Deep Learning Artificial Neural Network (ANN) trained on clinical records to evaluate cardiovascular risk.',
      accent: 'cyan',
    },
    {
      icon: Zap,
      title: 'Fast Prediction',
      description: 'Instant probabilistic inference through an optimized FastAPI backend and StandardScaler transformation.',
      accent: 'blue',
    },
    {
      icon: SlidersHorizontal,
      title: '13 Clinical Parameters',
      description: 'Comprehensive analysis of patient demographics, hemodynamics, and cardiac diagnostic markers.',
      accent: 'indigo',
    },
  ];

  const workflowSteps = [
    { step: '01', title: 'Patient Data', desc: '13 Clinical Parameters' },
    { step: '02', title: 'Preprocessing', desc: 'StandardScaler Transform' },
    { step: '03', title: 'ANN Model', desc: 'Deep Learning Inference' },
    { step: '04', title: 'Prediction', desc: 'Probability & Risk Tier' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen cyber-grid pb-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Feature Cards Section (Only 3 required cards) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((item, idx) => (
              <FeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                accent={item.accent}
                delay={idx * 0.1}
              />
            ))}
          </div>
        </section>

        {/* Simple Visual Workflow Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="p-8 sm:p-10 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Prediction Pipeline
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  How patient data flows to the trained deep learning model
                </p>
              </div>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
              >
                <span>Pipeline Details</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              {workflowSteps.map((st, i) => (
                <div
                  key={st.step}
                  className="relative p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2 hover:border-cyan-500/40 transition-all text-center sm:text-left"
                >
                  <div className="text-2xl font-black font-mono text-cyan-500/80 dark:text-cyan-400/90">
                    {st.step}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Direct inference using the trained Keras ANN model • No random mock outputs
              </span>
              <Link
                to="/predict"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-md shadow-cyan-500/20 transition-all"
              >
                <span>Start Prediction</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Medical Disclaimer */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Disclaimer />
        </section>
      </div>
    </PageTransition>
  );
}
