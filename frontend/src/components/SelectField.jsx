import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function SelectField({
  id,
  label,
  value,
  onChange,
  options = [],
  placeholder,
  helperText,
  error,
  required = true,
}) {
  const isUnselected = value === '' || value === null || value === undefined;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>

      <div className="relative rounded-xl shadow-sm">
        <select
          id={id}
          name={id}
          value={value ?? ''}
          onChange={onChange}
          className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200 bg-white dark:bg-slate-900/90 border cursor-pointer ${
            error
              ? 'border-rose-400 dark:border-rose-500/80 text-rose-900 dark:text-rose-200 focus:ring-rose-500/30'
              : 'border-slate-300 dark:border-slate-700 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-cyan-500/20'
          } ${
            isUnselected
              ? 'text-slate-400 dark:text-slate-500'
              : 'text-slate-900 dark:text-white'
          } focus:outline-none focus:ring-2`}
        >
          {placeholder && (
            <option value="" disabled className="text-slate-400 dark:text-slate-500">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
              {opt.label}
            </option>
          ))}
        </select>
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
