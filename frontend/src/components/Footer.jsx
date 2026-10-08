import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldAlert, Cpu, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-cyan-500/10 bg-white/50 dark:bg-[#050814]/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-md shadow-cyan-500/20">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-cyan-200 bg-clip-text text-transparent">
                CardioPredict <span className="text-cyan-500">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              AI-powered heart disease prediction using deep learning.
            </p>
          </div>

          {/* Technology Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100/70 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/20">
              React
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/70 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20">
              FastAPI
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100/70 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-500/20">
              TensorFlow
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100/70 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20">
              Scikit-learn
            </span>
          </div>

          {/* Quick Nav Links */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-cyan-500 transition-colors">Home</Link>
            <Link to="/predict" className="hover:text-cyan-500 transition-colors">Predict</Link>
            <Link to="/how-it-works" className="hover:text-cyan-500 transition-colors">How It Works</Link>
            <Link to="/model" className="hover:text-cyan-500 transition-colors">Model</Link>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200/90 text-xs flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 flex-shrink-0 text-amber-500 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Medical Disclaimer:</strong> CardioPredict AI is an educational and research-oriented prediction system. It is not a medical diagnosis and should not replace evaluation by a qualified healthcare professional.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} CardioPredict AI • Deep Learning ANN Heart Health Prediction
        </div>
      </div>
    </footer>
  );
}
