"use client";

import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SummaryCards() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, set up snapshot listener for real-time transactions
        const q = query(collection(db, "transactions"), where("userId", "==", user.uid));
        
        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          let income = 0;
          let expense = 0;
          
          snapshot.forEach(doc => {
            const data = doc.data();
            if (data.type === "Income") income += data.amount;
            else if (data.type === "Expense") expense += data.amount;
          });
          
          // Using exactly what is in Firestore (no mock offsets)
          setData({
             totalBalance: `₹${(income - expense).toLocaleString('en-IN')}`,
             monthlyIncome: `₹${income.toLocaleString('en-IN')}`,
             monthlyExpenses: `₹${expense.toLocaleString('en-IN')}`,
             totalInvestments: "₹0", // Extend this if you add an Investments category mapping
          });
          setLoading(false);
        }, (error) => {
          console.error("Firestore Error:", error);
          setLoading(false);
        });
        
        return () => unsubscribeSnapshot();
      } else {
        // Not logged in, redirect to login
        router.push("/login");
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  const cards = [
    {
      title: "Total Balance",
      amount: data?.totalBalance || "₹0",
      trend: "+2.5%",
      isPositive: true,
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-blue-600/20 to-blue-600/5",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Monthly Income",
      amount: data?.monthlyIncome || "₹0",
      trend: "+12%",
      isPositive: true,
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      color: "from-green-600/20 to-green-600/5",
      borderColor: "border-green-500/20"
    },
    {
      title: "Monthly Expenses",
      amount: data?.monthlyExpenses || "₹0",
      trend: "-5.2%",
      isPositive: true,
      icon: (
        <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      ),
      color: "from-red-600/20 to-red-600/5",
      borderColor: "border-red-500/20"
    },
    {
      title: "Total Investments",
      amount: data?.totalInvestments || "₹0",
      trend: "+15.8%",
      isPositive: true,
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "from-purple-600/20 to-purple-600/5",
      borderColor: "border-purple-500/20"
    }
  ];

  if (loading) {
    return <div className="text-gray-400 text-sm animate-pulse">Loading Live Firestore Database...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card, index) => (
        <div 
          key={index} 
          className={`bg-gradient-to-br ${card.color} border ${card.borderColor} rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center">
              {card.icon}
            </div>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${card.isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
              {card.trend}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">{card.title}</p>
            <h3 className="text-2xl font-bold text-white tracking-tight">{card.amount}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
