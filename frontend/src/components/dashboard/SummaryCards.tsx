"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  PieChart,
  Target
} from "lucide-react";

interface SummaryCardsProps {
  transactions: any[];
}

function Card({ title, amount, trend, isPositive, icon, color, borderColor }: any) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`group relative overflow-hidden glass-card rounded-[2rem] p-6 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/5`}
    >
      {/* Dynamic Background Glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-[0.05] rounded-full blur-[60px] group-hover:opacity-[0.15] transition-opacity duration-700`}></div>
      
      <div className="flex flex-col h-full relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-primary-500/50 transition-all duration-500 shadow-xl">
            {icon}
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-wider uppercase border border-white/[0.03] ${isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-gray-500 text-[11px] font-black uppercase tracking-[0.2em] opacity-80">
            {title}
          </h3>
          <p className="text-3xl font-black text-white tracking-tighter leading-none py-1">
            {amount}
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.03] flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest opacity-40">
          <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></div>
          Live Intelligence
        </div>
      </div>
    </motion.div>
  );
}

export default function SummaryCards({ transactions }: SummaryCardsProps) {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(tx => {
    if (tx.type === "Income") totalIncome += Number(tx.amount);
    else if (tx.type === "Expense") totalExpense += Number(tx.amount);
  });

  const balance = totalIncome - totalExpense;

  const fmt = (n: number) => {
    const abs = Math.abs(n);
    const prefix = n < 0 ? "-₹" : "₹";
    if (abs >= 10000000) return `${prefix}${(abs / 10000000).toFixed(2)} Cr`;
    if (abs >= 100000) return `${prefix}${(abs / 100000).toFixed(2)} L`;
    return `${prefix}${Math.floor(abs).toLocaleString('en-IN')}`;
  };

  const balanceChange = totalIncome > 0 ? (((balance) / totalIncome) * 100).toFixed(1) : "0";
  const cards = [
    {
      title: "Total Balance",
      amount: fmt(balance),
      trend: `${Number(balanceChange) >= 0 ? '+' : ''}${balanceChange}%`,
      isPositive: balance >= 0,
      icon: <Wallet className="w-6 h-6 text-indigo-400" />,
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "Incoming Assets",
      amount: fmt(totalIncome),
      trend: `+${transactions.filter(t => t.type === 'Income').length} txns`,
      isPositive: true,
      icon: <ArrowUpRight className="w-6 h-6 text-emerald-400" />,
      color: "from-emerald-400 to-teal-500",
    },
    {
      title: "Active Burn",
      amount: fmt(totalExpense),
      trend: `${transactions.filter(t => t.type === 'Expense').length} txns`,
      isPositive: false,
      icon: <ArrowDownRight className="w-6 h-6 text-rose-400" />,
      color: "from-rose-500 to-red-600",
    },
    {
      title: "Projected 30d",
      amount: fmt(Math.max(0, balance * 1.15)),
      trend: "+15.8%",
      isPositive: true,
      icon: <Target className="w-6 h-6 text-amber-400" />,
      color: "from-amber-400 to-orange-500",
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div 
          key={index} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
        >
          <Card {...card} />
        </motion.div>
      ))}
    </div>
  );
}
