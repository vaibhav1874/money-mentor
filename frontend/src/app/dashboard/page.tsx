"use client";

import { useState, useEffect, useCallback } from "react";
import MoneyHealthScore from "@/components/dashboard/MoneyHealthScore";
import SummaryCards from "@/components/dashboard/SummaryCards";
import AddTransactionModal from "@/components/dashboard/AddTransactionModal";
import SpendingAnalyticsChart from "@/components/dashboard/SpendingAnalyticsChart";
import BankStatementUpload from "@/components/dashboard/BankStatementUpload";
import BankConnectModal from "@/components/dashboard/BankConnectModal";
import IntelligencePanel from "@/components/dashboard/IntelligencePanel";
import SubscriptionTracker from "@/components/dashboard/SubscriptionTracker";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ShieldCheck, Zap } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

export default function DashboardPage() {
  const { 
    transactions, setTransactions, 
    isDemoMode, setIsDemoMode, 
    healthScore, setHealthScore 
  } = useDashboard();
  
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [importedData, setImportedData] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>({
    thisMonthIncome: 0,
    lastMonthIncome: 0,
    thisMonthExpense: 0,
    lastMonthExpense: 0,
    persona: "Balanced",
    savingsRatio: 0,
    streak: 7
  });
  const router = useRouter();

  const calculateIntelligence = useCallback((txs: any[]) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let tmIncome = 0;
    let lmIncome = 0;
    let tmExpense = 0;
    let lmExpense = 0;

    txs.forEach(tx => {
      const date = tx.date ? new Date(tx.date) : (tx.createdAt?.toDate ? tx.createdAt.toDate() : new Date());
      const txMonth = date.getMonth();
      const txYear = date.getFullYear();

      if (txYear === currentYear && txMonth === currentMonth) {
        if (tx.type === "Income") tmIncome += Number(tx.amount);
        else if (tx.type === "Expense") tmExpense += Number(tx.amount);
      } else if (txYear === currentYear && txMonth === currentMonth - 1) {
        if (tx.type === "Income") lmIncome += Number(tx.amount);
        else if (tx.type === "Expense") lmExpense += Number(tx.amount);
      }
    });

    const savingsRatio = tmIncome > 0 ? ((tmIncome - tmExpense) / tmIncome) * 100 : 0;
    let persona: "Saver" | "Spender" | "Balanced" = "Balanced";
    if (savingsRatio > 30) persona = "Saver";
    else if (savingsRatio < 10) persona = "Spender";

    setMetrics({
      thisMonthIncome: tmIncome,
      lastMonthIncome: lmIncome || (tmIncome * 0.95),
      thisMonthExpense: tmExpense,
      lastMonthExpense: lmExpense || (tmExpense * 1.05),
      persona,
      savingsRatio,
      streak: Math.max(7, Math.min(30, txs.length))
    });
  }, []);

  const calculateHealthScore = useCallback((txs: any[]) => {
    let totalIncome = 0;
    let totalExpense = 0;
    
    txs.forEach(data => {
      if (data.type === "Income") totalIncome += Number(data.amount);
      if (data.type === "Expense") totalExpense += Number(data.amount);
    });

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
    return score;
  }, []);

  useEffect(() => {
    if (isDemoMode) {
      setTransactions(importedData);
      setHealthScore(calculateHealthScore(importedData));
      calculateIntelligence(importedData);
      return;
    }

    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(collection(db, "transactions"), where("userId", "==", user.uid));
        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const txs: any[] = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            txs.push({ id: doc.id, ...data });
          });
          txs.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
          setTransactions(txs.slice(0, 50));
          setHealthScore(calculateHealthScore(txs));
          calculateIntelligence(txs);
        });
        return () => unsubscribeSnapshot();
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribeAuth();
  }, [router, isDemoMode, importedData, calculateHealthScore, calculateIntelligence]);

  const handleDataImported = (newTxs: any[]) => {
    setImportedData((prev) => [...newTxs, ...prev]);
    setIsDemoMode(true);
  };

  const handleBankConnect = (newTxs: any[]) => {
    setImportedData((prev) => [...newTxs, ...prev]);
    setIsDemoMode(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard Overview</h1>
            {isDemoMode && (
              <span className="flex items-center gap-1 text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                <ShieldCheck className="w-3 h-3" />
                Secure Simulation
              </span>
            )}
          </div>
          <p className="text-gray-400 mt-1">
            {isDemoMode ? "Viewing simulated data from your bank / statement." : "Welcome back, your real-time financial hub."}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 self-stretch">
            <span className="text-xs font-medium text-gray-400 mr-3">Demo Mode</span>
            <button 
              onClick={() => setIsDemoMode(!isDemoMode)}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${isDemoMode ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isDemoMode ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          <AddTransactionModal />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-6">
          <SummaryCards transactions={transactions} />
          
          <IntelligencePanel metrics={metrics} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MoneyHealthScore score={healthScore} />
            <SpendingAnalyticsChart transactions={transactions} />
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Recent Transactions
              </h3>
              {transactions.length > 0 && <span className="text-xs text-blue-400 font-bold hover:underline cursor-pointer">View All</span>}
            </div>
            
            {transactions.length === 0 ? (
              <div className="h-48 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-500 space-y-2">
                <p className="italic">No transactions yet.</p>
                <p className="text-xs">Import a statement or add one manually.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {transactions.slice(0, 6).map(tx => (
                  <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl bg-black/40 border border-white/5 hover:bg-white/5 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-inner transition-transform group-hover:scale-110 ${tx.type === 'Income' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                        {tx.type === 'Income' ? '+₹' : '-₹'}
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm tracking-tight">{tx.category}</h4>
                        <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">{tx.note || tx.date}</p>
                      </div>
                    </div>
                    <div className={`text-sm font-black ${tx.type === 'Income' ? 'text-green-400' : 'text-white'}`}>
                      {tx.type === 'Income' ? '+' : ''}₹{Number(tx.amount).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="xl:col-span-1 space-y-6">
          <BankStatementUpload onDataImported={handleDataImported} />
          
          <SubscriptionTracker transactions={transactions} />

          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
            <h3 className="text-lg font-bold text-white mb-2 leading-snug">Connect Your Bank</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">Securely sync your transactions for real-time AI insights.</p>
            <button 
              onClick={() => setIsBankModalOpen(true)}
              className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg shadow-white/5"
            >
              Connect Bank Account
            </button>
          </div>
        </div>
      </div>

      <BankConnectModal 
        isOpen={isBankModalOpen} 
        onClose={() => setIsBankModalOpen(false)} 
        onConnect={handleBankConnect}
      />
    </div>
  );
}
