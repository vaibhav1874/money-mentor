"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAPI } from "@/lib/api";
import { 
  ReceiptText, 
  ChevronRight, 
  ArrowRight, 
  Info, 
  PieChart, 
  Lightbulb, 
  CheckCircle2, 
  ShieldAlert,
  Loader2,
  TrendingDown,
  TrendingUp,
  Landmark
} from "lucide-react";

interface TaxResult {
  oldRegimeTax: number;
  newRegimeTax: number;
  recommendation: string;
  tips: string[];
}

export default function TaxWizard() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TaxResult | null>(null);
  
  const [formData, setFormData] = useState({
    salaryStructure: {
      basic: 800000,
      hra: 320000,
      specialAllowance: 200000,
      lta: 50000
    },
    deductions: {
      section80C: 150000,
      section80D: 25000,
      hraClaimed: 240000,
      nps: 50000
    }
  });

  const handleSalaryChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      salaryStructure: { ...formData.salaryStructure, [key]: Number(value) }
    });
  };

  const handleDeductionChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      deductions: { ...formData.deductions, [key]: Number(value) }
    });
  };

  const renderText = (val: any) => {
    if (!val) return "";
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val.details || val.action || val.summary || val.description || JSON.stringify(val);
    }
    return String(val);
  };

  const calculateTax = async () => {
    setLoading(true);
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 20000);
    try {
      const data = await fetchAPI("/api/tax-wizard", {
        method: "POST",
        body: JSON.stringify(formData),
        signal: controller.signal
      });
      clearTimeout(id);
      setResult(data);
    } catch (error) {
      console.error("Tax calculation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
              <ReceiptText className="w-6 h-6 text-indigo-500" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              Tax <span className="text-indigo-500">Wizard</span>
            </h1>
          </div>
          <p className="text-gray-400 font-medium max-w-md">
            Uncover every deduction you're missing and optimize your tax regime for max savings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Column */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-[2rem] p-8 border-white/5 bg-white/[0.01]"
          >
            <div className="mb-10">
              <h3 className="text-sm font-black text-indigo-400 uppercase tracking-[0.3em] flex items-center gap-2 mb-6">
                <Landmark className="w-4 h-4" />
                Salary Structure
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(formData.salaryStructure).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input 
                      type="number" value={value} 
                      onChange={(e) => handleSalaryChange(key, e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-colors font-bold text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black text-emerald-400 uppercase tracking-[0.3em] flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-4 h-4" />
                Deductions Checklist
              </h3>
              <div className="space-y-4">
                {Object.entries(formData.deductions).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-white/10 transition-all">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <input 
                      type="number" value={value} 
                      onChange={(e) => handleDeductionChange(key, e.target.value)}
                      className="bg-transparent text-right text-white font-black focus:outline-none focus:text-emerald-400 transition-colors w-24"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={calculateTax}
              disabled={loading}
              className="w-full mt-10 py-5 premium-gradient-primary rounded-2xl text-white font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Optimize My Tax <ArrowRight className="w-4 h-4" /></>}
            </button>
          </motion.div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-6">
           <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[500px] flex flex-col items-center justify-center glass-card rounded-[2.5rem] p-12 text-center border-dashed border-white/10"
              >
                <div className="w-24 h-24 rounded-full bg-indigo-500/5 flex items-center justify-center mb-6">
                  <PieChart className="w-12 h-12 text-indigo-500/30" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight leading-none uppercase italic mb-4">
                  Compare & <span className="text-indigo-500">Conquer</span>
                </h2>
                <p className="text-sm text-gray-600 max-w-sm leading-relaxed font-bold uppercase tracking-widest opacity-60">
                  Input your numbers to get a detailed regime comparison and AI-driven tax saving strategies.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Regime Comparison Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`glass-card rounded-[2.5rem] p-8 border-white/5 relative overflow-hidden ${result.oldRegimeTax <= result.newRegimeTax ? 'ring-2 ring-indigo-500/50' : 'opacity-60'}`}>
                    {result.oldRegimeTax <= result.newRegimeTax && (
                      <div className="absolute top-4 right-6 px-3 py-1 bg-indigo-500/20 border border-indigo-500/40 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-widest">Better Choice</div>
                    )}
                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Old Tax Regime</h4>
                    <div className="text-4xl font-black text-white mb-2">₹{result.oldRegimeTax?.toLocaleString() || "0"}</div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Estimated Annual Tax</p>
                  </div>

                  <div className={`glass-card rounded-[2.5rem] p-8 border-white/5 relative overflow-hidden ${result.newRegimeTax < result.oldRegimeTax ? 'ring-2 ring-indigo-500/50' : 'opacity-60'}`}>
                    {result.newRegimeTax < result.oldRegimeTax && (
                      <div className="absolute top-4 right-6 px-3 py-1 bg-indigo-500/20 border border-indigo-500/40 rounded-full text-[10px] font-black text-indigo-400 uppercase tracking-widest">Better Choice</div>
                    )}
                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">New Tax Regime</h4>
                    <div className="text-4xl font-black text-white mb-2">₹{result.newRegimeTax?.toLocaleString() || "0"}</div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Estimated Annual Tax</p>
                  </div>
                </div>

                {/* AI Recommendation */}
                <div className="glass-card rounded-[2.5rem] p-10 border-indigo-500/20 bg-indigo-500/[0.02] flex items-center gap-8">
                  <div className="hidden md:flex w-24 h-24 rounded-3xl bg-indigo-500/10 items-center justify-center shrink-0">
                    <Lightbulb className="w-12 h-12 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="text-indigo-400 font-black uppercase tracking-[0.3em] text-xs mb-3">AI Recommendation</h3>
                    <p className="text-xl font-bold text-white tracking-tight leading-snug">{result.recommendation}</p>
                  </div>
                </div>

                {/* Tips & Tricks */}
                <div className="glass-card rounded-[2.5rem] p-10 border-white/5">
                  <h4 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                    <TrendingDown className="w-5 h-5 text-emerald-500" />
                    Tax Saving Strategies
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array.isArray(result.tips) && result.tips.map((tip, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group">
                        <div className="flex items-start gap-4">
                          <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-black flex items-center justify-center shrink-0 mt-1">
                            {idx + 1}
                          </span>
                          <p className="text-sm text-gray-400 font-medium group-hover:text-white transition-colors leading-relaxed">
                            {renderText(tip)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
