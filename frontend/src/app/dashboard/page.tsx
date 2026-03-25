"use client";

import { useState, useEffect } from "react";
import MoneyHealthScore from "@/components/dashboard/MoneyHealthScore";
import SummaryCards from "@/components/dashboard/SummaryCards";
import AddTransactionModal from "@/components/dashboard/AddTransactionModal";
import SpendingAnalyticsChart from "@/components/dashboard/SpendingAnalyticsChart";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [healthScore, setHealthScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(
          collection(db, "transactions"), 
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(50)
        );
        
        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const txs: any[] = [];
          let totalIncome = 0;
          let totalExpense = 0;
          
          snapshot.forEach(doc => {
            const data = doc.data();
            txs.push({ id: doc.id, ...data });
            
            if (data.type === "Income") totalIncome += data.amount;
            if (data.type === "Expense") totalExpense += data.amount;
          });
          
          setTransactions(txs);
          
          let score = 50; 
          if (totalIncome > 0) {
            const savingsRate = ((totalIncome - totalExpense) / totalIncome) * 100;
            if (savingsRate > 40) score = 95;
            else if (savingsRate > 20) score = 85;
            else if (savingsRate > 10) score = 75;
            else if (savingsRate > 0) score = 60;
            else score = 40;
          } else if (totalExpense > 0) {
             score = 30; 
          }
          setHealthScore(score);
          
        });
        
        return () => unsubscribeSnapshot();
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 mt-1">Welcome back, your real-time financial hub.</p>
        </div>
        <div className="flex space-x-3">
          <AddTransactionModal />
        </div>
      </div>

      <SummaryCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <MoneyHealthScore score={healthScore} />
        </div>
        
        <div className="lg:col-span-2">
          <SpendingAnalyticsChart transactions={transactions} />
        </div>
      </div>
      
      {/* Recent Transactions List */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-8">
        <h3 className="text-lg font-medium text-white mb-6">Recent Transactions</h3>
        {transactions.length === 0 ? (
          <p className="text-gray-500 italic h-32 flex items-center justify-center border border-dashed border-white/10 rounded-xl">No transactions yet. Add one above!</p>
        ) : (
          <div className="space-y-4">
            {transactions.slice(0, 5).map(tx => (
              <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'Income' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {tx.type === 'Income' ? '↓' : '↑'}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{tx.category}</h4>
                    <p className="text-sm text-gray-500">{tx.note || tx.date}</p>
                  </div>
                </div>
                <div className={`font-bold ${tx.type === 'Income' ? 'text-green-400' : 'text-white'}`}>
                  {tx.type === 'Income' ? '+' : '-'}₹{Number(tx.amount).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
