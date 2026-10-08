import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ProbabilityGauge({
  probability = 0,
  riskLevel = 'Low',
  size = 220,
  strokeWidth = 14,
}) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(probability);
    }, 150);
    return () => clearTimeout(timer);
  }, [probability]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference;

  // Determine styling based on riskLevel
  const getScheme = () => {
    if (riskLevel === 'High') {
      return {
        strokeStart: '#f43f5e',
        strokeEnd: '#e11d48',
        glow: 'rgba(244, 63, 94, 0.45)',
        badgeBg: 'bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400',
        text: 'text-rose-600 dark:text-rose-400',
      };
    }
    if (riskLevel === 'Moderate') {
      return {
        strokeStart: '#f59e0b',
        strokeEnd: '#f97316',
        glow: 'rgba(245, 158, 11, 0.45)',
        badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400',
        text: 'text-amber-600 dark:text-amber-400',
      };
    }
    // Low Risk
    return {
      strokeStart: '#10b981',
      strokeEnd: '#06b6d4',
      glow: 'rgba(16, 185, 129, 0.45)',
      badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
      text: 'text-emerald-600 dark:text-emerald-400',
    };
  };

  const scheme = getScheme();
  const gradientId = `gauge-gradient-${riskLevel.toLowerCase()}`;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow backdrop */}
        <div
          className="absolute inset-4 rounded-full blur-2xl opacity-40 transition-all duration-700 pointer-events-none"
          style={{ background: scheme.glow }}
        />

        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={scheme.strokeStart} />
              <stop offset="100%" stopColor={scheme.strokeEnd} />
            </linearGradient>
          </defs>

          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-200 dark:text-slate-800"
          />

          {/* Animated active stroke */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <span className="text-[11px] font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
            AI Likelihood
          </span>
          <div className="flex items-baseline justify-center">
            <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${scheme.text}`}>
              {probability.toFixed(1)}
            </span>
            <span className={`text-2xl font-bold ml-0.5 ${scheme.text}`}>%</span>
          </div>
          <span className={`mt-1.5 px-3 py-0.5 text-xs font-bold rounded-full border ${scheme.badgeBg}`}>
            {riskLevel} Risk
          </span>
        </div>
      </div>
    </div>
  );
}
