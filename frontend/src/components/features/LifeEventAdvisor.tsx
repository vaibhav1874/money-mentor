"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarCheck, 
  ChevronRight, 
  ArrowRight, 
  Gift, 
  Heart, 
  Baby, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles,
  Loader2,
  Banknote,
  Navigation
} from "lucide-react";

const events = [
  { id: "bonus", title: "Annual Bonus", icon: Gift, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
  { id: "inheritance", title: "Inheritance", icon: Banknote, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
  { id: "marriage", title: "Marriage", icon: Heart, color: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/20" },
  { id: "baby", title: "New Baby", icon: Baby, color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/20" }
];

export default function LifeEventAdvisor() {
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [amount, setAmount] = useState(500000);
  const [details, setDetails] = useState("");
  const [result, setResult] = useState<any>(null);

  const renderText = (val: any) => {
    if (!val) return "";
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val.advice || val.description || val.action || val.details || JSON.stringify(val);
    }
    return String(val);
  };

  const getAdvice = async () => {
    setLoading(true);
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("http://localhost:8000/api/life-event-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: selectedEvent.id, amount, details }),
        signal: controller.signal
      });
      clearTimeout(id);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Advice error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-[0.4em] mb-2"
        >
          <Sparkles className="w-3 h-3" /> Life Event Advisor
        </motion.div>
        <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
          Navigate Life's <span className="text-purple-500">Big Moments</span>
        </h1>
        <p className="text-gray-500 font-medium max-w-xl mx-auto">
          AI-driven financial guidance triggered by your most important life milestones.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {events.map((event) => (
          <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            key={event.id}
            onClick={() => { setSelectedEvent(event); setResult(null); }}
            className={`p-8 rounded-[2.5rem] border transition-all flex flex-col items-center justify-center gap-4 ${selectedEvent.id === event.id ? `${event.bg} ${event.border} ring-1 ring-white/10` : 'bg-white/[0.01] border-white/5 opacity-40 hover:opacity-100 hover:bg-white/[0.03]'}`}
          >
            <event.icon className={`w-10 h-10 ${event.color}`} />
            <span className="text-xs font-black text-white uppercase tracking-widest leading-none">{event.title}</span>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Card */}
        <div className="lg:col-span-5">
           <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card rounded-[2.5rem] p-10 border-white/5 bg-white/[0.01]"
           >
              <div className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{selectedEvent.title} Amount (₹)</label>
                    <input 
                      type="number" value={amount} 
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-2xl font-black text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Additional Context (Optional)</label>
                    <textarea 
                      placeholder="e.g. Planning to use this for a house... I'm already in 30% tax bracket..."
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="w-full h-32 bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-sm text-gray-400 focus:outline-none focus:border-purple-500/50 transition-all leading-relaxed"
                    />
                 </div>

                 <button 
                  onClick={getAdvice}
                  disabled={loading}
                  className="w-full py-5 premium-gradient-purple rounded-2xl text-white font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 shadow-xl shadow-purple-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Get Expert Advice <Navigation className="w-4 h-4 fill-white flex-shrink-0" /></>}
                </button>
              </div>
           </motion.div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-7 h-full">
           <AnimatePresence mode="wait">
            {!result ? (
               <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center glass-card rounded-[2.5rem] p-12 text-center border-dashed border-white/10"
               >
                  <CalendarCheck className="w-16 h-16 text-gray-700 mb-6 opacity-20" />
                  <h3 className="text-xl font-black text-white/40 uppercase italic tracking-widest">Ready for Guidance</h3>
               </motion.div>
            ) : (
               <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
               >
                  {/* Advice Card */}
                  <div className="glass-card rounded-[2.5rem] p-10 border-purple-500/30 bg-purple-500/[0.03]">
                     <div className="mb-6 flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-purple-400" />
                        <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Global Financial Context</span>
                     </div>
                     <p className="text-xl font-bold text-white leading-relaxed tracking-tight italic">
                        "{renderText(result.advice)}"
                     </p>
                  </div>

                  {/* Action Steps */}
                  <div className="glass-card rounded-[2.5rem] p-10 border-white/5">
                     <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-8">Strategic Implementation</h4>
                     <div className="space-y-4">
                        {Array.isArray(result.actions) && result.actions.map((action: any, idx: number) => (
                           <motion.div 
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={idx} 
                            className="flex items-center gap-6 p-5 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-purple-500/30 transition-all"
                           >
                              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/10 group-hover:border-purple-500/30 transition-all">
                                 <ShieldCheck className="w-5 h-5 text-purple-500" />
                              </div>
                              <p className="text-sm text-gray-400 font-bold group-hover:text-white transition-colors leading-snug">
                                {renderText(action)}
                              </p>
                           </motion.div>
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
