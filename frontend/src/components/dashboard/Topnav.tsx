"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

export default function Topnav() {
  const { transactions } = useDashboard();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Simple alert logic
  const alerts = [];
  if (transactions.length > 0) {
    const foodExpenses = transactions.filter(tx => tx.category === 'Food' || tx.category === 'Dining');
    const totalFood = foodExpenses.reduce((sum, tx) => sum + Number(tx.amount), 0);
    if (totalFood > 5000) {
      alerts.push({
        id: 1,
        type: 'warning',
        title: 'Budget Alert',
        message: 'You exceeded your food budget 🍔',
        time: 'Just now'
      });
    }

    const today = new Date().toLocaleDateString();
    const todayTxs = transactions.filter(tx => tx.date === today);
    const todaySum = todayTxs.reduce((sum, tx) => sum + Number(tx.amount), 0);
    if (todaySum > 10000) {
      alerts.push({
        id: 2,
        type: 'danger',
        title: 'Unusual Spending',
        message: 'Sudden spike in spending detected ⚠️',
        time: '2 mins ago'
      });
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center md:hidden">
        <button className="p-2 -ml-2 text-gray-400 hover:text-white rounded-md">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link href="/dashboard" className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          MoneyMitra
        </Link>
      </div>

      <div className="hidden md:flex flex-1 items-center max-w-md ml-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-full leading-5 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors text-xs font-medium"
            placeholder="Search AI insights..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors relative group"
          >
            {alerts.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-black animate-pulse group-hover:scale-125 transition-transform"></span>
            )}
            <Bell className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-80 bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
              >
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">Smart Alerts</h3>
                  <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full font-bold">{alerts.length} New</span>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {alerts.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                         <CheckCircle className="w-6 h-6 text-gray-600" />
                      </div>
                      <p className="text-gray-500 text-xs font-medium italic">All clear! No alerts today.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {alerts.map(alert => (
                        <div key={alert.id} className="p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                          <div className="flex gap-3">
                            <div className={`mt-1 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${alert.type === 'danger' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                              {alert.type === 'danger' ? <AlertTriangle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                            </div>
                            <div>
                               <div className="flex justify-between items-start">
                                 <h4 className="text-xs font-black text-white uppercase tracking-tight">{alert.title}</h4>
                                 <span className="text-[9px] text-gray-600 font-bold">{alert.time}</span>
                               </div>
                               <p className="text-[11px] text-gray-400 mt-1 leading-relaxed group-hover:text-gray-300 transition-colors">{alert.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-white/10 text-center bg-white/[0.02]">
                  <button className="text-[10px] font-black text-blue-400 hover:text-blue-300 uppercase tracking-widest transition-colors">Clear All notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md cursor-pointer border border-white/10 hover:scale-110 transition-transform">
          JD
        </div>
      </div>
    </header>
  );
}
