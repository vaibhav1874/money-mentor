"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ScanSearch, 
  ChevronRight, 
  ArrowRight, 
  Info, 
  PieChart as PieChartIcon, 
  Zap, 
  CheckCircle2, 
  ShieldAlert,
  Loader2,
  TrendingUp,
  Microscope,
  FileText,
  RefreshCw,
  Layers
} from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";

interface XRayResult {
  portfolioBreakdown: Array<{ name: string; value: number }>;
  overlap: string;
  xirr: string;
  rebalancePlan: string[];
}

const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316'];

export default function MFXRay() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<XRayResult | null>(null);
  const [rawText, setRawText] = useState("");
  
  const [holdings, setHoldings] = useState([
    { scheme: "Parag Parikh Flexi Cap", amount: 500000, category: "Equity" },
    { scheme: "HDFC Index Nifty 50", amount: 300000, category: "Equity" },
    { scheme: "ICICI Prudential Bluechip", amount: 200000, category: "Equity" }
  ]);

  const renderText = (val: any) => {
    if (!val) return "";
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val.action || val.details || val.summary || val.tip || JSON.stringify(val);
    }
    return String(val);
  };

  const analyzePortfolio = async () => {
    setLoading(true);
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("http://localhost:8000/api/mf-xray", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ holdings, rawText }),
        signal: controller.signal
      });
      clearTimeout(id);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("X-Ray analysis error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
              <Microscope className="w-6 h-6 text-cyan-500" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              MF Portfolio <span className="text-cyan-500">X-Ray</span>
            </h1>
          </div>
          <p className="text-gray-400 font-medium max-w-md">
            Scan your mutual fund portfolio for hidden overlaps and performance drags in under 10 seconds.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-[2rem] p-8 border-white/5 bg-white/[0.01]"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <FileText className="w-3 h-3" /> 
                  Upload/Paste Statement
                </h3>
                <textarea 
                  placeholder="Paste your CAMS/KFintech statement text here for AI extraction..." 
                  className="w-full h-40 bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-xs text-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all font-mono leading-relaxed"
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[10px] font-black text-gray-700 uppercase tracking-widest bg-[#050505] px-4">
                  Or manual entry
                </div>
              </div>

              <div className="space-y-3">
                {holdings.map((h, idx) => (
                  <div key={idx} className="flex gap-3">
                    <input 
                      type="text" value={h.scheme} 
                      className="flex-[2] bg-white/[0.02] border border-white/5 rounded-xl px-4 py-2 text-xs text-white font-bold"
                      onChange={(e) => {
                        const newHoldings = [...holdings];
                        newHoldings[idx].scheme = e.target.value;
                        setHoldings(newHoldings);
                      }}
                    />
                    <input 
                      type="number" value={h.amount}
                      className="flex-1 bg-white/[0.02] border border-white/5 rounded-xl px-4 py-2 text-xs text-white font-bold text-right"
                      onChange={(e) => {
                        const newHoldings = [...holdings];
                        newHoldings[idx].amount = Number(e.target.value);
                        setHoldings(newHoldings);
                      }}
                    />
                  </div>
                ))}
                <button 
                  onClick={() => setHoldings([...holdings, { scheme: "", amount: 0, category: "Equity" }])}
                  className="w-full py-2 bg-white/5 rounded-xl text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors border border-dashed border-white/10"
                >
                  + Add Scheme
                </button>
              </div>

              <button 
                onClick={analyzePortfolio}
                disabled={loading}
                className="w-full mt-6 py-5 premium-gradient-cyan rounded-2xl text-white font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Start Full Scan <Zap className="w-4 h-4 fill-white" /></>}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center glass-card rounded-[2.5rem] p-12 text-center"
              >
                <div className="w-32 h-32 rounded-full bg-cyan-500/5 flex items-center justify-center mb-8 relative">
                   <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full animate-ping opacity-20" />
                   <ScanSearch className="w-16 h-16 text-cyan-500/30" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight leading-none uppercase italic mb-4">
                  Deep <span className="text-cyan-500">Portfolio</span> Analysis
                </h2>
                <p className="text-sm text-gray-600 max-w-sm leading-relaxed font-bold uppercase tracking-widest opacity-60">
                  Ready to uncover portfolio overlap, sector concentration and true XIRR?
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass-card rounded-[2rem] p-8 border-white/5 relative overflow-hidden flex flex-col items-center justify-center h-[350px]">
                    <div className="w-full h-full min-h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={Array.isArray(result.portfolioBreakdown) ? result.portfolioBreakdown : []}
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={5}
                            dataKey="value"
                            isAnimationActive={true}
                          >
                            {Array.isArray(result.portfolioBreakdown) && result.portfolioBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="text-center mt-4">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Asset Allocation</span>
                    </div>
                  </div>

                  <div className="glass-card rounded-[2rem] p-8 border-white/5 flex flex-col items-center justify-center gap-2 h-[350px]">
                     <TrendingUp className="w-10 h-10 text-emerald-500 mb-2" />
                     <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">True XIRR</span>
                     <div className="text-5xl font-black text-white tracking-tighter">{result.xirr}</div>
                     <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">+4.2% vs Benchmark</span>
                  </div>
                </div>

                <div className="glass-card rounded-[2rem] p-10 border-rose-500/20 bg-rose-500/[0.02] flex items-start gap-8">
                   <div className="w-16 h-16 rounded-3xl bg-rose-500/10 flex items-center justify-center shrink-0">
                      <Layers className="w-8 h-8 text-rose-500" />
                   </div>
                   <div>
                      <h4 className="text-rose-400 font-black uppercase tracking-[0.3em] text-[10px] mb-3">Portfolio Overlap Alert</h4>
                      <p className="text-lg font-bold text-white tracking-tight leading-relaxed italic">"{result.overlap}"</p>
                   </div>
                </div>

                  <div className="glass-card rounded-[2.5rem] p-10 border-white/5">
                   <h4 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                      <RefreshCw className="w-5 h-5 text-cyan-500" />
                      Rebalancing Plan
                   </h4>
                   <div className="space-y-4">
                     {Array.isArray(result.rebalancePlan) ? result.rebalancePlan.map((action, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          key={idx} 
                          className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5"
                        >
                           <ArrowRight className="w-4 h-4 text-cyan-500 shrink-0" />
                           <p className="text-sm text-gray-400 font-medium">
                             {renderText(action)}
                           </p>
                        </motion.div>
                     )) : (
                       <p className="text-gray-600 text-xs italic">Rebalancing steps will appear here after analysis.</p>
                     )}
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
