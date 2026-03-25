"use client";

import { motion } from "framer-motion";
import { CreditCard, Calendar, ArrowRight, Zap } from "lucide-react";

interface Transaction {
  id: string;
  category: string;
  amount: number;
  date: string;
  type: string;
  note?: string;
}

const SUB_KEYWORDS = [
  "netflix", "spotify", "youtube", "icloud", "google one", 
  "amazon prime", "disney", "hotstar", "adobe", "chatgpt", 
  "midjourney", "canva", "github", "cursor", "vercel"
];

export default function SubscriptionTracker({ transactions }: { transactions: Transaction[] }) {
  const subscriptions = transactions.filter(tx => {
    const desc = (tx.note || tx.category).toLowerCase();
    return tx.type === "Expense" && SUB_KEYWORDS.some(kw => desc.includes(kw));
  });

  const uniqueSubs = Array.from(new Set(subscriptions.map(s => (s.note || s.category).toLowerCase())))
    .map(name => {
      const subTxs = subscriptions.filter(s => (s.note || s.category).toLowerCase() === name);
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        amount: subTxs[0].amount,
        date: subTxs[0].date
      };
    });

  const totalMonthly = uniqueSubs.reduce((sum, s) => sum + s.amount, 0);

  if (uniqueSubs.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-400" />
          Subscription Tracker
        </h3>
        <p className="text-gray-500 text-sm italic leading-relaxed">No active subscriptions detected in your recent transactions.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-400" />
            Active Subscriptions
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-widest">₹{totalMonthly.toLocaleString('en-IN')}/month total</p>
        </div>
        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
          <Zap className="w-5 h-5 text-blue-400" />
        </div>
      </div>

      <div className="space-y-3">
        {uniqueSubs.slice(0, 3).map((sub, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 group/item hover:bg-white/5 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-[10px] font-black text-blue-400 capitalize">
                {sub.name[0]}
              </div>
              <div>
                <h4 className="text-white font-bold text-xs capitalize">{sub.name}</h4>
                <p className="text-[10px] text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Next: {sub.date}
                </p>
              </div>
            </div>
            <div className="text-sm font-black text-white group-hover/item:text-blue-400 transition-colors">
              ₹{sub.amount}
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-4 flex items-center justify-center gap-2 text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-tighter transition-colors group/btn pt-2">
        See All Subscriptions
        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
