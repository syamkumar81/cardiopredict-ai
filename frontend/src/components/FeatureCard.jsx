import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ icon: Icon, title, description, accent = 'cyan', delay = 0 }) {
  const getAccentStyles = () => {
    switch (accent) {
      case 'cyan':
        return {
          iconBg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white',
          borderHover: 'hover:border-cyan-500/40 hover:shadow-cyan-500/10',
          dot: 'bg-cyan-400',
        };
      case 'blue':
        return {
          iconBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 group-hover:bg-sky-500 group-hover:text-white',
          borderHover: 'hover:border-sky-500/40 hover:shadow-sky-500/10',
          dot: 'bg-sky-400',
        };
      case 'purple':
        return {
          iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500 group-hover:text-white',
          borderHover: 'hover:border-purple-500/40 hover:shadow-purple-500/10',
          dot: 'bg-purple-400',
        };
      case 'indigo':
      default:
        return {
          iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white',
          borderHover: 'hover:border-indigo-500/40 hover:shadow-indigo-500/10',
          dot: 'bg-indigo-400',
        };
    }
  };

  const styles = getAccentStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={`group relative p-6 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl ${styles.borderHover} transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${styles.iconBg} shadow-sm`}>
            <Icon className="w-6 h-6 stroke-[2]" />
          </div>
          <span className={`w-2 h-2 rounded-full ${styles.dot} opacity-0 group-hover:opacity-100 transition-opacity`} />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
