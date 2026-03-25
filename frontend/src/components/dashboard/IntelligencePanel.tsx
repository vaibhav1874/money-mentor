"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  Zap,
  ChevronRight,
  Sparkles,
  Scale,
  Rocket
} from "lucide-react";

interface IntelligenceMetrics {
  thisMonthIncome: number;
  lastMonthIncome: number;
  thisMonthExpense: number;
  lastMonthExpense: number;
  persona: "Saver" | "Spender" | "Balanced";
  savingsRatio: number;
  streak: number;
}

export default function IntelligencePanel({ metrics, onGenerateReport }: { metrics: IntelligenceMetrics, onGenerateReport: () => void }) {
  const expenseChange = metrics.lastMonthExpense > 0 
    ? ((metrics.thisMonthExpense - metrics.lastMonthExpense) / metrics.lastMonthExpense) * 100 
    : 0;

  const incomeChange = metrics.lastMonthIncome > 0 
    ? ((metrics.thisMonthIncome - metrics.lastMonthIncome) / metrics.lastMonthIncome) * 100 
    : 0;

  const getPersonaBadge = () => {
    switch (metrics.persona) {
      case "Saver":
        return { 
          icon: <Award className="w-4 h-4 text-green-400" />, 
          label: "Master Saver", 
          color: "text-green-400", 
          bg: "bg-green-500/10",
          border: "border-green-500/20"
        };
      case "Spender":
        return { 
          icon: <Rocket className="w-4 h-4 text-orange-400" />, 
          label: "Active Spender", 
          color: "text-orange-400", 
          bg: "bg-orange-500/10",
          border: "border-orange-500/20"
        };
      case "Balanced":
      default:
        return { 
          icon: <Scale className="w-4 h-4 text-blue-400" />, 
          label: "Balanced Pro", 
          color: "text-blue-400", 
          bg: "bg-blue-500/10",
          border: "border-blue-500/20"
        };
    }
  };

  const personaBadge = getPersonaBadge();

  return (
    <div className="space-y-6">
      {/* Monthly Comparison & Persona */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              Monthly Analysis
            </h3>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${personaBadge.bg} ${personaBadge.color} border ${personaBadge.border}`}>
              {personaBadge.icon}
              {personaBadge.label}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm font-medium">Expenses vs Last Month</span>
              <div className={`flex items-center gap-1 font-black ${expenseChange <= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {expenseChange <= 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                {Math.abs(expenseChange).toFixed(1)}%
              </div>
            </div>
            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${Math.min(100, Math.abs(expenseChange + 50))}%` }}
                 className={`h-full ${expenseChange <= 0 ? 'bg-green-500' : 'bg-red-500'}`}
               />
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-400 text-sm font-medium">Income vs Last Month</span>
              <div className={`flex items-center gap-1 font-black ${incomeChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {incomeChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(incomeChange).toFixed(1)}%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Savings Streak & Achievements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors"></div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-yellow-500" />
            Financial Streak
          </h3>

          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
                <motion.circle 
                   cx="40" cy="40" r="36" stroke="url(#streakGradient)" strokeWidth="6" fill="transparent"
                   strokeDasharray={226}
                   initial={{ strokeDashoffset: 226 }}
                   animate={{ strokeDashoffset: 226 - (metrics.streak / 30) * 226 }}
                   strokeLinecap="round"
                />
                <defs>
                   <linearGradient id="streakGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ef4444" />
                   </linearGradient>
                </defs>
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-white">{metrics.streak}</span>
                <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Days</span>
              </div>
            </div>
            <div>
              <p className="text-white font-bold text-sm">🔥 {metrics.streak}-Day Savings Streak!</p>
              <p className="text-xs text-gray-400 mt-1 max-w-[150px]">You've maintained a balanced budget for {metrics.streak} days straight. Keep it up!</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Trigger for Report */}
      <motion.button 
        onClick={onGenerateReport}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 flex items-center justify-between group shadow-xl shadow-blue-600/10"
      >
        <div className="flex items-center gap-4 text-left">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-black text-white leading-none">Generate Intelligence Report</h4>
            <p className="text-blue-100 text-xs font-medium mt-1">Get AI-driven strengths, weaknesses, and actionable tips.</p>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  );
}
