import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function InputField({
  id,
  label,
  type = 'number',
  value,
  onChange,
  placeholder,
  unit,
  helperText,
  error,
  min,
  max,
  step = 'any',
  required = true,
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        {unit && (
          <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-medium">
            {unit}
          </span>
        )}
      </div>

      <div className="relative rounded-xl shadow-sm">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200 bg-white dark:bg-slate-900/90 border ${
            error
              ? 'border-rose-400 dark:border-rose-500/80 text-rose-900 dark:text-rose-200 focus:ring-rose-500/30'
              : 'border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-cyan-500/20'
          } focus:outline-none focus:ring-2`}
        />
      </div>

      {error ? (
        <p className="flex items-center gap-1 text-[11px] font-medium text-rose-600 dark:text-rose-400">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
}
