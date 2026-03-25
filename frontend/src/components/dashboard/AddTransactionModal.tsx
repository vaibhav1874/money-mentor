"use client";

import { useState } from "react";

export default function AddTransactionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food & Dining");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:8000/api/transactions', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, amount: Number(amount), category, date, note })
      });
      
      if (res.ok) {
        setIsOpen(false);
        // Dispatch an event or refresh the page to update widgets in a real app
        window.location.reload(); 
      }
    } catch (error) {
      console.error("Failed to add transaction", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-sm font-medium text-white shadow-lg shadow-purple-500/20 hover:from-blue-500 hover:to-purple-500 transition-all"
      >
        + Add Transaction
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">New Transaction</h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 ml-1">Type</label>
                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={() => setType("Expense")}
                      className={`flex-1 py-2 ${type === 'Expense' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-white/5 text-gray-400 border-white/10'} border rounded-xl font-medium text-sm transition-all`}
                    >
                      Expense
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setType("Income")}
                      className={`flex-1 py-2 ${type === 'Income' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-white/5 text-gray-400 border-white/10'} border rounded-xl font-medium text-sm transition-all`}
                    >
                      Income
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-400 ml-1">Amount (₹)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl pl-8 pr-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 ml-1">Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                      required
                    >
                      <option>Food & Dining</option>
                      <option>Shopping</option>
                      <option>Transport</option>
                      <option>Salary</option>
                      <option>Investment Return</option>
                      <option>Bills</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 ml-1">Date</label>
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-400 ml-1">Note (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="What was this for?" 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3 bg-white text-black font-bold rounded-xl mt-6 hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Transaction"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
