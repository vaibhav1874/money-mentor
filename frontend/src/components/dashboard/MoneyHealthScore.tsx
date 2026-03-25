"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Activity } from "lucide-react";

export default function MoneyHealthScore({ score = 0 }: { score?: number }) {
  const r = 54;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let label = "Fair";
  let desc = "You're doing okay, but your spending rate is high.";
  let colorClass = "text-yellow-400";
  let icon = <Minus className="w-5 h-5" />;

  if (score >= 85) { 
    label = "Excellent"; 
    desc = "Your finances are in great shape! High savings rate."; 
    colorClass = "text-green-400"; 
    icon = <TrendingUp className="w-5 h-5" />;
  } else if (score >= 65) { 
    label = "Good"; 
    desc = "You're consistently saving money, keep it up."; 
    colorClass = "text-blue-400"; 
    icon = <Activity className="w-5 h-5" />;
  } else if (score > 0) { 
    label = "Needs Action"; 
    desc = "Warning: you are spending more than you earn."; 
    colorClass = "text-red-400";
    icon = <TrendingDown className="w-5 h-5" />;
  } else {
    label = "No Data";
    desc = "Add transactions to calculate your score.";
    colorClass = "text-gray-500";
    icon = <Activity className="w-5 h-5 opacity-30" />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden h-[380px] flex flex-col items-center justify-center group"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-[60px] group-hover:bg-blue-500/10 transition-colors"></div>
      
      <h3 className="text-lg font-bold text-white w-full text-left self-start absolute top-8 left-8 tracking-tight">Financial Health</h3>
      
      <div className="relative flex flex-col items-center justify-center mt-4">
        <div className="relative flex items-center justify-center w-48 h-48 mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="96" cy="96" r={r} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
            <motion.circle 
              cx="96" cy="96" r={r} 
              stroke="url(#scoreGradient)" strokeWidth="12" fill="transparent"
              strokeDasharray={circumference} 
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
              className="drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-5xl font-black text-white tracking-tighter"
            >
              {score}
            </motion.span>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 opacity-60">Score</span>
          </div>
        </div>
        
        <div className="text-center">
          <motion.p 
            key={label}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${colorClass} font-black text-xl flex items-center justify-center gap-2 uppercase tracking-tight`}
          >
            {icon}
            {label}
          </motion.p>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-[200px] mx-auto font-medium italic">
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
