"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAPI } from "@/lib/api";
import { 
  Users2, 
  TrendingUp, 
  ShieldCheck, 
  Wallet, 
  ArrowRight,
  Loader2,
  Heart,
  Plus,
  Trash2,
  Zap,
  Split,
  Scale
} from "lucide-react";

interface CouplePlan {
  optimizationStrategy: string;
  sipSplits: Array<{
    scheme: string;
    partner1: string;
    partner2: string;
  }>;
  jointNetWorth: string;
}

export default function CouplePlanner() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<CouplePlan | null>(null);
  
  const [formData, setFormData] = useState({
    partner1: { name: "Partner 1", income: 120000, rent: 40000, nps: 0 },
    partner2: { name: "Partner 2", income: 80000, rent: 0, nps: 0 },
    goals: ["Buy a Home", "Child Education", "Retirement"]
  });

  const handlePartnerChange = (partner: 'partner1' | 'partner2', key: string, value: any) => {
    setFormData({
      ...formData,
      [partner]: { ...formData[partner], [key]: value }
    });
  };

  const renderText = (val: any) => {
    if (!val) return "";
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val.advice || val.summary || val.strategy || val.details || JSON.stringify(val);
    }
    return String(val);
  };

  const optimizeFinances = async () => {
    setLoading(true);
    try {
      const data = await fetchAPI("/api/couple-planner", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setPlan(data);
    } catch (error) {
      console.error("Couple Planner Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
              <Users2 className="w-6 h-6 text-rose-500" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              Couple <span className="text-rose-500">Planner</span>
            </h1>
          </div>
          <p className="text-gray-400 font-medium max-w-md">
            Optimize your joint finances and build wealth together with AI-driven splitting strategies.
          </p>
        </div>

        {plan && (
           <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl px-6 py-4 border-rose-500/20 bg-rose-500/[0.02] flex items-center gap-4"
           >
              <div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Combined Net Worth</span>
                <div className="text-xl font-black text-white tracking-tight">{plan.jointNetWorth}</div>
              </div>
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500/20" />
           </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Partners Input Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Partner 1 Card */}
             <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-[2rem] p-8 border-white/5 bg-white/[0.01]"
             >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                    <span className="text-indigo-400 font-black">P1</span>
                  </div>
                  <input 
                    type="text" value={formData.partner1.name}
                    onChange={(e) => handlePartnerChange('partner1', 'name', e.target.value)}
                    className="bg-transparent text-white font-black uppercase tracking-wider focus:outline-none w-full"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Monthly Income (₹)</label>
                    <input 
                      type="number" value={formData.partner1.income}
                      onChange={(e) => handlePartnerChange('partner1', 'income', Number(e.target.value))}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500/50 transition-colors font-bold text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Rent Paid (₹)</label>
                    <input 
                      type="number" value={formData.partner1.rent}
                      onChange={(e) => handlePartnerChange('partner1', 'rent', Number(e.target.value))}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500/50 transition-colors font-bold text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">NPS Contrib. (₹)</label>
                    <input 
                      type="number" value={formData.partner1.nps}
                      onChange={(e) => handlePartnerChange('partner1', 'nps', Number(e.target.value))}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500/50 transition-colors font-bold text-sm"
                    />
                  </div>
                </div>
             </motion.div>

             {/* Partner 2 Card */}
             <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-[2rem] p-8 border-white/5 bg-white/[0.01]"
             >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                    <span className="text-rose-400 font-black">P2</span>
                  </div>
                  <input 
                    type="text" value={formData.partner2.name}
                    onChange={(e) => handlePartnerChange('partner2', 'name', e.target.value)}
                    className="bg-transparent text-white font-black uppercase tracking-wider focus:outline-none w-full"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Monthly Income (₹)</label>
                    <input 
                      type="number" value={formData.partner2.income}
                      onChange={(e) => handlePartnerChange('partner2', 'income', Number(e.target.value))}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500/50 transition-colors font-bold text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Rent Paid (₹)</label>
                    <input 
                      type="number" value={formData.partner2.rent}
                      onChange={(e) => handlePartnerChange('partner2', 'rent', Number(e.target.value))}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500/50 transition-colors font-bold text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">NPS Contrib. (₹)</label>
                    <input 
                      type="number" value={formData.partner2.nps}
                      onChange={(e) => handlePartnerChange('partner2', 'nps', Number(e.target.value))}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-500/50 transition-colors font-bold text-sm"
                    />
                  </div>
                </div>
             </motion.div>
          </div>

          <div className="glass-card rounded-[2rem] p-8 border-white/5 bg-white/[0.01]">
            <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Shared Goals
            </h3>
            <div className="flex flex-wrap gap-2">
              {formData.goals.map((goal, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-full group">
                  <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">{goal}</span>
                  <button onClick={() => setFormData({...formData, goals: formData.goals.filter((_, i) => i !== idx)})}>
                    <Trash2 className="w-3 h-3 text-gray-600 hover:text-rose-500 transition-colors" />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => setFormData({...formData, goals: [...formData.goals, "New Goal"]})}
                className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <button 
              onClick={optimizeFinances}
              disabled={loading}
              className="w-full mt-10 py-5 bg-gradient-to-r from-rose-500 to-indigo-600 rounded-2xl text-white font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-xl shadow-rose-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Calculate Optimization <ArrowRight className="w-4 h-4" /></>}
            </button>
          </div>
        </div>

        {/* Results Column */}
        <div className="space-y-6 min-h-[600px]">
           <AnimatePresence mode="wait">
            {!plan ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center glass-card rounded-[2.5rem] p-12 text-center"
              >
                <div className="w-24 h-24 rounded-full bg-rose-500/5 flex items-center justify-center mb-6">
                  <Split className="w-12 h-12 text-rose-500/30" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight leading-none uppercase italic mb-4">
                  Better <span className="text-rose-500">Together</span>
                </h2>
                <p className="text-sm text-gray-600 max-w-sm leading-relaxed font-bold uppercase tracking-widest opacity-60">
                  Combine your powers to unlock massive tax savings and faster wealth creation.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Optimization Strategy */}
                <div className="glass-card rounded-[2.5rem] p-10 border-indigo-500/20 bg-indigo-500/[0.02] flex items-start gap-8">
                  <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <Zap className="w-8 h-8 text-indigo-500" />
                  </div>
                  <div>
                    <h3 className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px] mb-3">AI Optimization Strategy</h3>
                    <p className="text-lg font-bold text-white tracking-tight leading-relaxed italic">
                      "{renderText(plan.optimizationStrategy)}"
                    </p>
                  </div>
                </div>

                {/* SIP Splits */}
                <div className="glass-card rounded-[2.5rem] p-8 border-white/5">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                      <Scale className="w-5 h-5 text-rose-500" />
                      Optimized SIP Splits
                    </h4>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Monthly Allocation</span>
                  </div>

                  <div className="space-y-4">
                    {Array.isArray(plan.sipSplits) ? plan.sipSplits.map((split, idx) => (
                      <div key={idx} className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 group hover:border-rose-500/30 transition-all">
                        <div className="flex items-center justify-between mb-6">
                          <h5 className="font-black text-white tracking-tight uppercase italic">{split.scheme}</h5>
                          <div className="flex -space-x-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-black" />
                            <div className="w-8 h-8 rounded-full bg-rose-500 border-2 border-black" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8 relative">
                          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5" />
                          <div>
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-2">{formData.partner1.name}</span>
                            <span className="text-2xl font-black text-white">{split.partner1}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block mb-2">{formData.partner2.name}</span>
                            <span className="text-2xl font-black text-white">{split.partner2}</span>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <p className="text-gray-600 text-xs italic py-10 text-center uppercase tracking-widest opacity-20 font-bold">Waiting for optimization data...</p>
                    )}
                  </div>
                </div>

                {/* Additional Insights */}
                <div className="p-8 rounded-[2rem] bg-emerald-500/[0.03] border border-emerald-500/10 flex items-center gap-6">
                   <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6 text-emerald-500" />
                   </div>
                   <p className="text-sm text-emerald-400 font-bold leading-relaxed italic">
                     By optimizing your HRA claims across {formData.partner1.name}'s income, you can save an additional ₹{34000}.
                   </p>
                </div>
              </motion.div>
            )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
