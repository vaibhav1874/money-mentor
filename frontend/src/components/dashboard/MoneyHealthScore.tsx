"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Activity, ShieldCheck, AlertCircle } from "lucide-react";

export default function MoneyHealthScore({ score = 0 }: { score?: number }) {
  const r = 70;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let label = "Fair";
  let desc = "You're doing okay, but your spending rate is high.";
  let statusColor = "from-yellow-400 to-orange-500";
  let textColor = "text-yellow-400";
  let StatusIcon = Activity;

  if (score >= 85) { 
    label = "Incredible"; 
    desc = "Your financial discipline is top-tier. Exceptional savings!"; 
    statusColor = "from-emerald-400 to-teal-500"; 
    textColor = "text-emerald-400";
    StatusIcon = ShieldCheck;
  } else if (score >= 65) { 
    label = "Healthy"; 
    desc = "You're consistently building wealth. Keep the momentum."; 
    statusColor = "from-indigo-400 to-primary-500"; 
    textColor = "text-indigo-400";
    StatusIcon = TrendingUp;
  } else if (score > 0) { 
    label = "Risk Detected"; 
    desc = "Your burn rate is exceeding healthy limits. Take action."; 
    statusColor = "from-rose-500 to-red-600";
    textColor = "text-rose-400";
    StatusIcon = AlertCircle;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-[2.5rem] p-10 relative overflow-hidden h-[420px] flex flex-col items-center justify-center group"
    >
      {/* Background Orbs */}
      <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${statusColor} opacity-[0.03] rounded-full blur-[80px] group-hover:opacity-[0.08] transition-opacity duration-700`}></div>
      
      <div className="absolute top-10 left-10 flex flex-col gap-1">
        <h3 className="text-sm font-bold text-gray-400 tracking-[0.2em] uppercase">Money Health</h3>
        <div className="h-1 w-8 bg-gradient-to-r from-primary-500 to-transparent rounded-full"></div>
      </div>
      
      <div className="relative flex flex-col items-center justify-center mt-6">
        <div className="relative flex items-center justify-center w-56 h-56">
          {/* Subtle Outer Glow */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${statusColor} opacity-5 blur-2xl`}></div>
          
          <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
            <circle cx="112" cy="112" r={r} stroke="rgba(255,255,255,0.03)" strokeWidth="14" fill="transparent" />
            <motion.circle 
              cx="112" cy="112" r={r} 
              stroke="url(#healthGradient)" strokeWidth="14" fill="transparent"
              strokeDasharray={circumference} 
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: strokeDashoffset }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              strokeLinecap="round"
              className="drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            />
            <defs>
              <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center"
            >
              <span className="text-6xl font-black text-white tracking-tighter leading-none">
                {score}
              </span>
              <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mt-2 opacity-50">Points</span>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-8 text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className={`flex flex-col items-center gap-1.5`}
          >
            <div className={`flex items-center gap-2 ${textColor} font-black text-2xl tracking-tight uppercase px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05]`}>
              <StatusIcon className="w-6 h-6" />
              {label}
            </div>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed max-w-[240px] font-medium opacity-80 italic">
              "{desc}"
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
