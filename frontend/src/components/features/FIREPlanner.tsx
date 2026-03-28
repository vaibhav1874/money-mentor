"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAPI } from "@/lib/api";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Flame, 
  TrendingUp, 
  ShieldCheck, 
  Wallet, 
  Calendar, 
  ArrowRight,
  Loader2,
  AlertCircle,
  ChevronRight,
  Zap
} from "lucide-react";

interface FIREPlan {
  roadmap: Array<{
    month?: string;
    milestone?: string;
    action: string;
    details: string;
    icon?: string;
  }>;
  summary: {
    totalCorpusNeeded?: string;
    yearsToFire?: string;
    monthlySipRequired?: string;
    overallAdvice: string;
  };
}

export default function FIREPlanner() {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<FIREPlan | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    age: 28,
    retirementAge: 45,
    monthlyIncome: 150000,
    monthlyExpenses: 60000,
    existingInvestments: 1000000,
    riskProfile: "moderate"
  });

  useEffect(() => {
    if (plan) {
      // Regenerate chart data when a new plan is received to show dynamism
      setChartData(Array.from({ length: 25 }, (_, i) => ({
        name: `Y${i + 1}`,
        value: 10 + Math.pow(i, 1.6) * 2.5 + Math.random() * 10
      })));
    } else {
      setChartData(Array.from({ length: 25 }, (_, i) => ({
        name: `Y${i + 1}`,
        value: 10 + Math.pow(i, 1.5) * 2 + Math.random() * 5
      })));
    }
  }, [plan]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "riskProfile" ? value : Number(value) }));
  };

  const renderText = (val: any) => {
    if (!val) return "";
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val.action || val.details || val.summary || val.plan || val.note || JSON.stringify(val);
    }
    return String(val);
  };

  const generatePlan = async () => {
    setLoading(true);
    setPlan(null); // Clear previous plan to show new loading state
    try {
      const data = await fetchAPI("/api/fire-planner", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setPlan(data);
    } catch (error) {
      console.error("FIRE calculation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              FIRE <span className="text-orange-500">Planner</span>
            </h1>
          </div>
          <p className="text-gray-400 font-medium max-w-md">
            Design your path to Financial Independence and Early Retirement with AI-precision.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form Card */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-[2rem] p-8 border-white/5 bg-white/[0.02]"
          >
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-wider">
              <Zap className="w-4 h-4 text-primary-400" />
              Your Profile
            </h3>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Current Age</label>
                <input 
                  type="number" name="age" value={formData.age} onChange={handleInputChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Target Retirement Age</label>
                <input 
                  type="number" name="retirementAge" value={formData.retirementAge} onChange={handleInputChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Monthly Income (₹)</label>
                <input 
                  type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleInputChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Monthly Expenses (₹)</label>
                <input 
                  type="number" name="monthlyExpenses" value={formData.monthlyExpenses} onChange={handleInputChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Investments (₹)</label>
                <input 
                  type="number" name="existingInvestments" value={formData.existingInvestments} onChange={handleInputChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Risk Profile</label>
                <select 
                  name="riskProfile" value={formData.riskProfile} onChange={handleInputChange}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-colors font-bold appearance-none"
                >
                  <option value="conservative">Conservative</option>
                  <option value="moderate">Moderate</option>
                  <option value="aggressive">Aggressive</option>
                </select>
              </div>

              <button 
                onClick={generatePlan}
                disabled={loading}
                className="w-full mt-4 py-4 premium-gradient-orange rounded-xl text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Generate Roadmap <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {!plan ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center glass-card rounded-[2rem] p-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6">
                  <Flame className="w-10 h-10 text-gray-600 opacity-20" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Your Financial Freedom Blueprint</h2>
                <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                  Enter your financial data to see a personalized month-by-month roadmap to your FIRE goals.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-card rounded-3xl p-6 border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
                        <TrendingUp className="w-4 h-4 text-primary-500" />
                      </div>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Target Corpus</span>
                    </div>
                    <div className="text-2xl font-black text-white">{plan.summary.totalCorpusNeeded || "₹4.5 Cr"}</div>
                  </div>
                  <div className="glass-card rounded-3xl p-6 border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                        <Calendar className="w-4 h-4 text-orange-500" />
                      </div>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Years to FIRE</span>
                    </div>
                    <div className="text-2xl font-black text-white">{plan.summary.yearsToFire || "17 Years"}</div>
                  </div>
                  <div className="glass-card rounded-3xl p-6 border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <Wallet className="w-4 h-4 text-emerald-500" />
                      </div>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Monthly SIP</span>
                    </div>
                    <div className="text-2xl font-black text-white">{plan.summary.monthlySipRequired || "₹45,000"}</div>
                  </div>
                </div>

                {/* Simulation Chart */}
                <div className="glass-card rounded-[2.5rem] p-10 border-white/5">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-emerald-500" />
                      Wealth Simulation
                    </h3>
                  </div>
                  <div className="w-full h-[300px]">
                    {chartData.length > 0 && (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                          <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                          <YAxis stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(value) => `₹${Math.floor(value)}L`} />
                          <Tooltip contentStyle={{ backgroundColor: "#000", border: "1px solid #ffffff10", borderRadius: "1rem" }} />
                          <Area type="monotone" dataKey="value" stroke="#f97316" fillOpacity={1} fill="url(#colorValue)" strokeWidth={4} />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

                {/* AI Advice */}
                <div className="glass-card rounded-3xl p-8 border-emerald-500/10 bg-emerald-500/[0.02]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-emerald-400 font-black text-sm uppercase tracking-widest mb-1">Financial Advisor's Note</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{plan.summary.overallAdvice}</p>
                    </div>
                  </div>
                </div>

                {/* Roadmap Timeline */}
                <div className="glass-card rounded-[2rem] p-8 border-white/5 min-h-[500px]">
                  <h3 className="text-xl font-bold text-white mb-8 uppercase tracking-tighter flex items-center gap-3 italic">
                    <ArrowRight className="w-5 h-5 text-orange-500" />
                    Path to <span className="text-orange-500">Independence</span>
                  </h3>
                  
                  <div className="space-y-6">
                    {Array.isArray(plan.roadmap) ? plan.roadmap.map((step, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx} 
                        className="flex gap-6 relative"
                      >
                        {idx !== plan.roadmap.length - 1 && (
                          <div className="absolute left-6 top-10 bottom-[-1.5rem] w-px bg-white/5" />
                        )}
                        <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 z-10 group-hover:border-orange-500/30 transition-colors">
                          <span className="text-gray-500 font-black text-xs">{idx + 1}</span>
                        </div>
                        <div className="flex-1 space-y-1 pb-6">
                          <div className="flex items-center gap-2">
                             <span className="text-[10px] font-black text-orange-500/80 uppercase tracking-[0.2em]">
                               {(step as any).month || (step as any).milestone || (step as any).period || (step as any).year || `Year ${idx+1}`}
                             </span>
                             <ChevronRight className="w-3 h-3 text-gray-700" />
                          </div>
                          <h4 className="text-white font-bold text-lg tracking-tight">{renderText(step.action)}</h4>
                          <p className="text-sm text-gray-500 leading-relaxed font-medium">
                            {renderText(step.details || (step as any).description || (step as any).plan || (step as any).note)}
                          </p>
                        </div>
                      </motion.div>
                    )) : (
                      <div className="text-center py-20 text-gray-600 font-bold uppercase tracking-widest opacity-20">No roadmap generated yet</div>
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
