"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Shield, 
  Lightbulb, 
  ArrowUpRight, 
  Wallet,
  Clock,
  CheckCircle2,
  Trophy
} from "lucide-react";

interface IntelligenceProps {
  savingsRate: number;
  monthlyIncome: number;
  monthlyExpense: number;
}

export default function AdvancedIntelligence({ savingsRate, monthlyIncome, monthlyExpense }: IntelligenceProps) {
  const monthlySavings = monthlyIncome - monthlyExpense;
  const sixMonthSavings = monthlySavings * 6;
  const yearlySavings = monthlySavings * 12;

  const recommendations = [
    {
      title: "Start a SIP",
      desc: `Invest ₹${Math.floor(monthlySavings * 0.3).toLocaleString('en-IN')} in Index Funds.`,
      icon: <TrendingUp className="w-4 h-4 text-blue-400" />,
      color: "blue"
    },
    {
      title: "Emergency Fund",
      desc: `Aim for ₹${Math.floor(monthlyExpense * 6).toLocaleString('en-IN')} (6 months of expenses).`,
      icon: <Shield className="w-4 h-4 text-purple-400" />,
      color: "purple"
    },
    {
      title: "Cut Dining Costs",
      desc: "Reducing food delivery by 15% could save ₹2,400 monthly.",
      icon: <Lightbulb className="w-4 h-4 text-yellow-400" />,
      color: "yellow"
    }
  ];

  return (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Future Prediction */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all"></div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-400" />
                Financial Future
              </h3>
              <p className="text-sm text-gray-500 font-medium">Predictive analysis based on current savings rate of {savingsRate.toFixed(1)}%</p>
            </div>
            <div className="text-right">
               <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">AI Projection</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 group/card hover:border-blue-500/30 transition-all">
               <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">6-Month Outlook</p>
               <h4 className="text-2xl font-black text-white mb-2">₹{sixMonthSavings.toLocaleString('en-IN')}</h4>
               <p className="text-[11px] text-green-400 font-bold flex items-center gap-1">
                 <ArrowUpRight className="w-3 h-3" />
                 Potential Growth
               </p>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 group/card hover:border-blue-500/40 transition-all">
               <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">1-Year Target</p>
               <h4 className="text-2xl font-black text-white mb-2">₹{yearlySavings.toLocaleString('en-IN')}</h4>
               <p className="text-[11px] text-blue-100 font-medium leading-relaxed">
                 {yearlySavings > 100000 ? "You're on track to a major milestone! 🚀" : "Consistent saving will build wealth."}
               </p>
            </div>
          </div>
        </motion.div>

        {/* Gamification / Achievements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0f0f0f] border border-white/10 rounded-3xl p-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl"></div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 mb-6">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Achievements
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 group/ach">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20 group-hover/ach:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-tight">Consistent Saver</h4>
                <p className="text-[10px] text-gray-500 font-bold">7-day savings streak</p>
              </div>
            </div>
            <div className="flex items-center gap-4 opacity-40 grayscale filter">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Wallet className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-tight">Debt-Free Guru</h4>
                <p className="text-[10px] text-gray-500 font-bold italic">Keep going to unlock</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* AI Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((rec, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="p-5 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-${rec.color}-500/10 border border-${rec.color}-500/20 group-hover:scale-110 transition-transform`}>
              {rec.icon}
            </div>
            <h4 className="text-white font-black text-sm uppercase tracking-tight mb-2">{rec.title}</h4>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">{rec.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
