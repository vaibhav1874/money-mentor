"use client";

import { useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AddGoalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [icon, setIcon] = useState("🏠");
  const [color, setColor] = useState("blue");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("You must be logged in to add a goal.");
      router.push("/login");
      return;
    }
    setLoading(true);
    try {
      // Rough SIP estimate: Target divided by 12 months for simplicity
      const suggestedSip = Math.round(Number(target) / 12);
      
      await addDoc(collection(db, "goals"), {
        userId: auth.currentUser.uid,
        name,
        target: Number(target),
        current: 0,
        deadline,
        suggestedSip,
        icon,
        color,
        createdAt: serverTimestamp()
      });
      
      setIsOpen(false);
      setName("");
      setTarget("");
      setDeadline("");
    } catch (error) {
      console.error("Failed to add goal to Firestore", error);
      alert("Error adding goal. Check permissions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-sm font-medium text-white shadow-lg shadow-purple-500/20 hover:from-blue-500 hover:to-purple-500 transition-all flex items-center gap-2 mt-4 sm:mt-0"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Create New Goal
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">New Financial Goal</h2>
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
                  <label className="text-xs text-gray-400 ml-1">Goal Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dream Car, Europe Trip..." 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-400 ml-1">Target Amount (₹)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input 
                      type="number" 
                      placeholder="500000" 
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl pl-8 pr-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 ml-1">Deadline</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Dec 2026" 
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 ml-1">Emoji Icon</label>
                    <input 
                      type="text" 
                      placeholder="🚗" 
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 font-emoji" 
                      maxLength={2}
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 ml-1">Theme Color</label>
                  <select 
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                    required
                  >
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
                    <option value="green">Green</option>
                    <option value="red">Red</option>
                    <option value="yellow">Yellow</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3 bg-white text-black font-bold rounded-xl mt-6 hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Create Goal"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
