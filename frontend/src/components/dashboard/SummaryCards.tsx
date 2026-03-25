"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  PieChart 
} from "lucide-react";

interface SummaryCardsProps {
  transactions: any[];
}

export default function SummaryCards({ transactions }: SummaryCardsProps) {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(tx => {
    if (tx.type === "Income") totalIncome += Number(tx.amount);
    else if (tx.type === "Expense") totalExpense += Number(tx.amount);
  });

  const balance = totalIncome - totalExpense;

  const cards = [
    {
      title: "Total Balance",
      amount: `₹${balance.toLocaleString('en-IN')}`,
      trend: "+2.4%", // Simulated trend
      isPositive: true,
      icon: <Wallet className="w-5 h-5 text-blue-400" />,
      color: "from-blue-600/20 to-blue-600/5",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Monthly Income",
      amount: `₹${totalIncome.toLocaleString('en-IN')}`,
      trend: "+12%",
      isPositive: true,
      icon: <ArrowUpRight className="w-5 h-5 text-green-400" />,
      color: "from-green-600/20 to-green-600/5",
      borderColor: "border-green-500/20"
    },
    {
      title: "Monthly Expenses",
      amount: `₹${totalExpense.toLocaleString('en-IN')}`,
      trend: "-5.2%",
      isPositive: false,
      icon: <ArrowDownRight className="w-5 h-5 text-red-400" />,
      color: "from-red-600/20 to-red-600/5",
      borderColor: "border-red-500/20"
    },
    {
      title: "Total Savings",
      amount: `₹${(totalIncome * 0.15).toLocaleString('en-IN')}`, // Simulated savings
      trend: "+15.8%",
      isPositive: true,
      icon: <PieChart className="w-5 h-5 text-purple-400" />,
      color: "from-purple-600/20 to-purple-600/5",
      borderColor: "border-purple-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card, index) => (
        <motion.div 
          key={index} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`group bg-gradient-to-br ${card.color} border ${card.borderColor} rounded-3xl p-5 sm:p-6 relative overflow-hidden backdrop-blur-md transition-all hover:scale-[1.02] hover:bg-white/[0.08]`}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              {card.icon}
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${card.isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
              {card.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {card.trend}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 mb-1 uppercase tracking-widest leading-none">{card.title}</p>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{card.amount}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
