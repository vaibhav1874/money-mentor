"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  ChevronRight, 
  Lock, 
  Loader2, 
  CheckCircle2, 
  X, 
  ShieldCheck,
  CreditCard,
  ArrowRight
} from "lucide-react";

interface Bank {
  id: string;
  name: string;
  color: string;
  logo: string;
}

const INDIAN_BANKS: Bank[] = [
  { id: "sbi", name: "State Bank of India", color: "bg-blue-600", logo: "SBI" },
  { id: "hdfc", name: "HDFC Bank", color: "bg-blue-800", logo: "HDFC" },
  { id: "icici", name: "ICICI Bank", color: "bg-orange-600", logo: "ICICI" },
  { id: "axis", name: "Axis Bank", color: "bg-red-800", logo: "AXIS" },
  { id: "pnb", name: "Punjab National Bank", color: "bg-yellow-600", logo: "PNB" },
];

interface BankConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (transactions: any[]) => void;
}

export default function BankConnectModal({ isOpen, onClose, onConnect }: BankConnectModalProps) {
  const [step, setStep] = useState<"select" | "login" | "connecting" | "success">("select");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setStep("login");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("connecting");
    
    // Simulate connection flow
    await new Promise(r => setTimeout(r, 2000)); // "Connecting securely..."
    setStep("connecting"); // No change in step but let's simulate another phase if needed
    
    await new Promise(r => setTimeout(r, 2000)); // "Fetching transactions..."
    
    const mockTxs = [
      { id: 'b1', date: '2026-03-24', description: 'Zomato Food Delivery', amount: 560, type: 'Expense', category: 'Food 🍔' },
      { id: 'b2', date: '2026-03-23', description: 'Petrol Pump - Shell', amount: 3200, type: 'Expense', category: 'Travel 🚗' },
      { id: 'b3', date: '2026-03-22', description: 'Amazon Prime Video', amount: 149, type: 'Expense', category: 'Subscription 📺' },
      { id: 'b4', date: '2026-03-21', description: 'Refund from Myntra', amount: 1200, type: 'Income', category: 'Others 📦' },
      { id: 'b5', date: '2026-03-20', description: 'Starbucks Coffee', amount: 450, type: 'Expense', category: 'Food 🍔' },
    ];

    onConnect(mockTxs);
    setStep("success");
    
    await new Promise(r => setTimeout(r, 1500));
    onClose();
    // Reset for next time
    setTimeout(() => {
        setStep("select");
        setSelectedBank(null);
        setUsername("");
        setPassword("");
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-bold text-white tracking-tight">Secure Bank Connect</h2>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {step === "select" && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <p className="text-gray-400 text-sm mb-4">Select your primary bank account to sync transactions automatically.</p>
                <div className="space-y-2">
                  {INDIAN_BANKS.map((bank) => (
                    <button
                      key={bank.id}
                      onClick={() => handleBankSelect(bank)}
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl ${bank.color} flex items-center justify-center text-[10px] font-black text-white shadow-lg`}>
                          {bank.logo}
                        </div>
                        <span className="text-white font-medium">{bank.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "login" && selectedBank && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                   <div className={`w-12 h-12 rounded-xl ${selectedBank.color} flex items-center justify-center text-xs font-black text-white`}>
                     {selectedBank.logo}
                   </div>
                   <div>
                     <h3 className="text-white font-bold">{selectedBank.name}</h3>
                     <p className="text-xs text-blue-400 font-bold tracking-widest uppercase">Secure Portal</p>
                   </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Customer ID / Username</label>
                    <input 
                      required
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter ID"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Password</label>
                    <div className="relative">
                      <input 
                        required
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      />
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                    >
                      Authenticate Securely
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
                
                <p className="text-[10px] text-center text-gray-500 px-8 leading-relaxed">
                  By connecting, you agree to our Terms of Service. MoneyMitra uses bank-grade 256-bit encryption to keep your data safe.
                </p>
              </motion.div>
            )}

            {step === "connecting" && (
              <div className="py-12 flex flex-col items-center justify-center space-y-6">
                 <div className="relative">
                    <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <CreditCard className="w-6 h-6 text-white opacity-50" />
                    </div>
                 </div>
                 <div className="text-center">
                    <h3 className="text-white font-bold text-lg mb-1 animate-pulse">Establishing Connection...</h3>
                    <p className="text-gray-500 text-sm">Syncing latest transactions from {selectedBank?.name}</p>
                 </div>
              </div>
            )}

            {step === "success" && (
              <div className="py-12 flex flex-col items-center justify-center space-y-6">
                 <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                 </div>
                 <div className="text-center">
                    <h3 className="text-green-400 font-bold text-xl mb-1">Authenticated!</h3>
                    <p className="text-gray-400 text-sm">Welcome to your smarter dashboard</p>
                 </div>
              </div>
            )}
          </div>
          
          {/* Footer Footer */}
          <div className="p-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-center gap-2">
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">End-to-End Encrypted</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
