"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAPI } from "@/lib/api";
import { 
  Activity, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2,
  PieChart,
  Wallet,
  Coins,
  Receipt,
  HeartPulse,
  Monitor
} from "lucide-react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from "recharts";

const steps = [
  {
    title: "Emergency Preparedness",
    question: "How many months of basic expenses can your current savings cover?",
    icon: ShieldCheck,
    key: "emergencyFundMonths",
    type: "range",
    min: 0,
    max: 12,
    suffix: "Months"
  },
  {
    title: "Insurance Coverage",
    question: "Do you have active Life and Health insurance policies?",
    icon: HeartPulse,
    key: "insuranceCoverage",
    type: "boolean"
  },
  {
    title: "Debt Health",
    question: "Are you currently free from any high-interest consumer debt (e.g., Credit Cards, Personal Loans)?",
    icon: Wallet,
    key: "isDebtFree",
    type: "boolean"
  },
  {
    title: "Investment Discipline",
    question: "Do you invest at least 20% of your income consistently?",
    icon: Coins,
    key: "isInvesting",
    type: "boolean"
  },
  {
    title: "Tax Efficiency",
    question: "How efficient is your current tax planning (Section 80C, 80D, NPS, etc.)?",
    icon: Receipt,
    key: "taxEfficiencyScore",
    type: "range",
    min: 1,
    max: 10,
    suffix: "/ 10"
  },
  {
    title: "Retirement Readiness",
    question: "Do you have a clear, documented retirement goal and strategy?",
    icon: Monitor,
    key: "retirementPlanned",
    type: "boolean"
  }
];

export default function MoneyHealthOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<any>({
    emergencyFundMonths: 3,
    insuranceCoverage: true,
    isDebtFree: true,
    isInvesting: true,
    taxEfficiencyScore: 7,
    retirementPlanned: false
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateScore();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const calculateScore = async () => {
    setLoading(true);
    setResult(null); // Clear previous result
    setError(null);
    try {
      const data = await fetchAPI("/api/money-health-score", {
        method: "POST",
        body: JSON.stringify(responses),
      });
      setResult(data);
    } catch (error: any) {
      console.error("Health calculation error:", error);
      setError(error.message || "Failed to calculate health score. Please try again.");
      // If error occurs, reset current step so user can try again
      setCurrentStep(steps.length - 1);
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    const chartData = [
      { subject: 'Emergency', A: result.dimensions.emergency, fullMark: 100 },
      { subject: 'Insurance', A: result.dimensions.insurance, fullMark: 100 },
      { subject: 'Debt', A: result.dimensions.debt, fullMark: 100 },
      { subject: 'Investment', A: result.dimensions.investment, fullMark: 100 },
      { subject: 'Tax', A: result.dimensions.tax, fullMark: 100 },
      { subject: 'Retirement', A: result.dimensions.retirement, fullMark: 100 },
    ];

    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">
            Money Health <span className="text-primary-500">Report</span>
          </h1>
          <p className="text-gray-400 font-medium">Your 6-dimension financial wellness breakdown.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center cursor-default">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-[3rem] p-12 flex flex-col items-center justify-center bg-white/[0.02]"
          >
            <div className="relative w-64 h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="rgba(255,255,255,0.05)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '900' }} />
                  <Radar
                    name="Score"
                    dataKey="A"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="flex flex-col items-center">
                    <span className="text-5xl font-black text-white">{result.score}</span>
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Score</span>
                 </div>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-2xl font-black text-white tracking-tight uppercase">
                {result.score >= 80 ? "Elite Health" : result.score >= 60 ? "Healthy" : "Needs Attention"}
              </div>
              <p className="text-gray-500 text-sm max-w-[240px] leading-relaxed mx-auto italic">
                "{result.score >= 80 ? "You are in the top 5% of financial planners. Keep it up!" : "You have a solid foundation but significant gaps remain."}"
              </p>
            </div>
          </motion.div>

          <div className="space-y-4">
             {Object.entries(result.dimensions).map(([key, value]: any, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={key} 
                  className="glass-card rounded-2xl p-5 border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Activity className={`w-5 h-5 ${value >= 80 ? 'text-emerald-500' : value >= 50 ? 'text-yellow-500' : 'text-rose-500'}`} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm capitalize">{key} Prep</h4>
                      <p className="text-[10px] text-gray-500 font-medium">{value}% Complete</p>
                    </div>
                  </div>
                  <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      className={`h-full ${value >= 80 ? 'bg-emerald-500' : value >= 50 ? 'bg-yellow-500' : 'bg-rose-500'}`} 
                    />
                  </div>
                </motion.div>
             ))}
             <button 
                onClick={() => setResult(null)} 
                className="w-full mt-4 py-4 bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] transition-all"
             >
                Retake Assessment
             </button>
          </div>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="max-w-2xl mx-auto py-20">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Step {currentStep + 1} of {steps.length}</span>
          <div className="flex gap-1">
            {steps.map((_, idx) => (
              <div key={idx} className={`h-1 w-6 rounded-full transition-all duration-500 ${idx <= currentStep ? 'bg-primary-500' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>
        <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">
          Money <span className="text-primary-500">Health</span> Score
        </h1>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.02, y: -10 }}
          className="glass-card rounded-[2.5rem] p-12 border-white/5 bg-white/[0.01] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-[2rem] bg-primary-500/10 flex items-center justify-center mb-8 border border-primary-500/20 shadow-lg shadow-primary-500/10">
              <Icon className="w-10 h-10 text-primary-500" />
            </div>
            
            <h2 className="text-small font-black text-primary-500 uppercase tracking-[0.3em] mb-3">
              {step.title}
            </h2>
            <p className="text-2xl font-bold text-white tracking-tight leading-snug mb-10 max-w-sm">
              {step.question}
            </p>

            <div className="w-full mb-12">
              {step.type === "range" ? (
                <div className="space-y-6">
                  <div className="text-5xl font-black text-white tabular-nums tracking-tighter">
                    {responses[step.key]} <span className="text-sm text-gray-500 font-black uppercase tracking-widest">{step.suffix}</span>
                  </div>
                  <input 
                    type="range" min={step.min} max={step.max} 
                    value={responses[step.key]} 
                    onChange={(e) => setResponses({ ...responses, [step.key]: Number(e.target.value) })}
                    className="w-full accent-primary-500 opacity-80"
                  />
                  <div className="flex justify-between text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    <span>{step.min} {step.suffix}</span>
                    <span>{step.max} {step.suffix}</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setResponses({ ...responses, [step.key]: true })}
                    className={`py-6 rounded-2xl border transition-all flex flex-col items-center gap-3 ${responses[step.key] === true ? 'bg-primary-500/10 border-primary-500/50 text-white shadow-lg shadow-primary-500/5' : 'bg-white/[0.02] border-white/5 text-gray-500 hover:border-white/10'}`}
                  >
                    <CheckCircle2 className={`w-8 h-8 ${responses[step.key] === true ? 'text-primary-500' : 'opacity-20'}`} />
                    <span className="font-black uppercase tracking-widest text-[11px]">Yes</span>
                  </button>
                  <button 
                    onClick={() => setResponses({ ...responses, [step.key]: false })}
                    className={`py-6 rounded-2xl border transition-all flex flex-col items-center gap-3 ${responses[step.key] === false ? 'bg-white/[0.05] border-white/20 text-white shadow-inner' : 'bg-white/[0.02] border-white/5 text-gray-500 hover:border-white/10'}`}
                  >
                    <AlertCircle className={`w-8 h-8 ${responses[step.key] === false ? 'text-gray-400' : 'opacity-20'}`} />
                    <span className="font-black uppercase tracking-widest text-[11px]">No</span>
                  </button>
                </div>
              )}
            </div>

            <div className="w-full flex gap-3">
              <button 
                onClick={handleBack} disabled={currentStep === 0 || loading}
                className="flex-1 py-4 bg-white/5 rounded-2xl text-gray-400 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-white/10 transition-all disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button 
                onClick={handleNext} disabled={loading}
                className="flex-[2] py-4 premium-gradient-primary rounded-2xl text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 hover:opacity-90 transition-all"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : currentStep === steps.length - 1 ? "Get My Score" : "Continue"}
                {!loading && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-center"
              >
                <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Loader2({ className }: { className?: string }) {
  return (
    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className={className}>
      <Activity className="w-full h-full" />
    </motion.div>
  );
}
