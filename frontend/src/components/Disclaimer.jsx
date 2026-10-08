import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function Disclaimer({ compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 p-3 text-xs rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300/90">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-500" />
        <p>
          <strong>Notice:</strong> Educational AI research system only. Not a medical diagnosis. Consult a qualified physician.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200/90 shadow-sm backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
            Medical & Clinical Disclaimer
          </h4>
          <p className="text-xs sm:text-sm leading-relaxed text-amber-800/90 dark:text-amber-200/80">
            CardioPredict AI is an educational and research-oriented prediction system. It is not a medical diagnosis and should not replace evaluation by a qualified healthcare professional. This deep learning tool provides statistical risk probabilities based solely on submitted parameters and does not constitute guaranteed clinical advice, medical certainty, or emergency triage.
          </p>
        </div>
      </div>
    </div>
  );
}
