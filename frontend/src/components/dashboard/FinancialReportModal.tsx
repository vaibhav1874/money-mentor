"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Download, 
  Share2, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2,
  FileText,
  Sparkles,
  Zap,
  Plus
} from "lucide-react";

interface ReportProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: {
    thisMonthIncome: number;
    thisMonthExpense: number;
    savingsRatio: number;
    persona: string;
    healthScore: number;
  };
}

export default function FinancialReportModal({ isOpen, onClose, metrics }: ReportProps) {
  const savings = metrics.thisMonthIncome - metrics.thisMonthExpense;
  
  const strengths = [
    metrics.savingsRatio > 20 ? "Strong savings discipline (above 20%)" : "Consistent income flow",
    "Low debt-to-income ratio",
    "Emergency fund building is active"
  ];

  const weaknesses = [
    metrics.thisMonthExpense > metrics.thisMonthIncome * 0.7 ? "High overall expenditure" : "Occasional spending spikes",
    "Subscription costs are slightly high",
    "Discretionary spending could be optimized"
  ];

  const suggestions = [
    "Move ₹5,000 to a high-yield savings account.",
    "Review your 'Dining' category; it's 15% higher than last month.",
    "Consider a recurring deposit for your yearly travel goal."
  ];

  const handleDownload = () => {
    // Simulate PDF generation
    alert("Generating your PDF report... (Simulated)");
  };

  const handleShare = () => {
    const text = `My MoneyMitra AI Financial Health Score is ${metrics.healthScore}! I'm a ${metrics.persona}. Check out yours!`;
    if (navigator.share) {
      navigator.share({
        title: 'My Financial Insights',
        text: text,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Copying summary to clipboard: " + text);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-blue-600/10 to-purple-600/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">AI Financial Report</h2>
                  <p className="text-sm text-blue-300 font-bold uppercase tracking-widest mt-0.5">Month: March 2026</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors group"
              >
                <X className="w-6 h-6 text-gray-500 group-hover:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto space-y-8 flex-1 custom-scrollbar">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Health Score</p>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-black text-white">{metrics.healthScore}</span>
                    <span className="text-[10px] font-bold text-green-400 mb-1">Excellent</span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Savings</p>
                  <div className="flex items-end gap-1">
                    <span className="text-2xl font-black text-white">₹{savings.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] font-bold text-blue-400 mb-1">{metrics.savingsRatio.toFixed(0)}%</span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Persona</p>
                  <div className="flex items-end gap-1">
                    <span className="text-xl font-black text-purple-400">{metrics.persona}</span>
                  </div>
                </div>
              </div>

              {/* Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                  <h3 className="text-sm font-black text-white flex items-center gap-2 mb-4 uppercase tracking-widest">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Key Strengths
                  </h3>
                  <ul className="space-y-3">
                    {strengths.map((s, i) => (
                      <li key={i} className="text-xs text-gray-400 flex items-start gap-2 leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-green-400 mt-2 shrink-0"></span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3 className="text-sm font-black text-white flex items-center gap-2 mb-4 uppercase tracking-widest">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    Needs Attention
                  </h3>
                  <ul className="space-y-3">
                    {weaknesses.map((w, i) => (
                      <li key={i} className="text-xs text-gray-400 flex items-start gap-2 leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-red-400 mt-2 shrink-0"></span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* AI Recommendations */}
              <div className="p-6 rounded-3xl bg-blue-600/10 border border-blue-500/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                   <Sparkles className="w-8 h-8 text-blue-500/20" />
                </div>
                <h3 className="text-sm font-black text-blue-400 flex items-center gap-2 mb-4 uppercase tracking-widest">
                  <Zap className="w-4 h-4" />
                  AI Suggested Actions
                </h3>
                <div className="space-y-4">
                  {suggestions.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                       <p className="text-xs text-blue-100 font-medium">{s}</p>
                       <Plus className="w-4 h-4 text-blue-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-8 border-t border-white/10 bg-white/[0.02] flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleDownload}
                className="flex-1 py-4 bg-white text-black rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors shadow-xl shadow-white/5"
              >
                <Download className="w-4 h-4" />
                Download PDF Report
              </button>
              <button 
                onClick={handleShare}
                className="flex-1 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share Insights
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
