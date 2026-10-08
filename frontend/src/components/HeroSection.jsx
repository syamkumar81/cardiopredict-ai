import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, HeartPulse, Cpu, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 md:pt-14 md:pb-20">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading and CTAs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>Intelligent Heart Health Prediction</span>
            </div>

            {/* Hero Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              AI-Powered <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
                Heart Disease Prediction
              </span>
            </h1>

            {/* Short Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Analyze patient health parameters using a trained Artificial Neural Network and receive an AI-based heart disease prediction.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/predict"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-base text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Activity className="w-5 h-5 animate-pulse" />
                <span>Start Prediction</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700/80 transition-all duration-200 shadow-sm"
              >
                <span>How It Works</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Futuristic AI Healthcare Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-3xl p-6 glass-card shadow-2xl shadow-cyan-500/10 flex flex-col justify-between overflow-hidden">
              {/* Glowing Corner Accents */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl pointer-events-none" />

              {/* Status Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-700/50 z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-300">
                    ANN INFERENCE ENGINE
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  READY
                </span>
              </div>

              {/* Central AI Healthcare Visualization */}
              <div className="relative flex-1 flex items-center justify-center py-6">
                {/* Concentric rings */}
                <div className="absolute w-56 h-56 rounded-full border border-dashed border-cyan-500/20 animate-spin" style={{ animationDuration: '30s' }} />
                <div className="absolute w-40 h-40 rounded-full border border-indigo-500/25 animate-pulse" />

                {/* Floating tags */}
                <div className="absolute -top-1 left-4 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-800/90 shadow-md border border-slate-200 dark:border-cyan-500/20 text-[11px] font-mono text-cyan-600 dark:text-cyan-300 flex items-center gap-1.5 animate-float">
                  <HeartPulse className="w-3.5 h-3.5 text-rose-500 animate-heartbeat" /> 13 Features
                </div>

                <div className="absolute bottom-2 right-4 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-slate-800/90 shadow-md border border-slate-200 dark:border-cyan-500/20 text-[11px] font-mono text-indigo-600 dark:text-indigo-300 flex items-center gap-1.5 animate-float" style={{ animationDelay: '1.5s' }}>
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" /> Keras Model
                </div>

                {/* Central Glowing Heart */}
                <div className="relative flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-500/20 via-sky-500/30 to-indigo-600/30 backdrop-blur-md border border-cyan-400/40 shadow-glow-cyan">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                    <HeartPulse className="w-9 h-9 text-white animate-heartbeat" />
                  </div>
                </div>

                {/* Simulated ECG Wave SVG in background */}
                <div className="absolute inset-x-4 bottom-8 h-12 flex items-center justify-center opacity-60 dark:opacity-40 pointer-events-none">
                  <svg className="w-full h-8" viewBox="0 0 300 40" fill="none">
                    <path
                      d="M0 20 H60 L75 5 L90 35 L105 10 L120 28 L130 20 H180 L195 5 L210 35 L225 10 L240 28 L250 20 H300"
                      stroke="url(#ecgGradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Bottom Feature strip */}
              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <span>StandardScaler Normalized</span>
                <span className="text-cyan-500 font-bold">P(Disease | X)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
