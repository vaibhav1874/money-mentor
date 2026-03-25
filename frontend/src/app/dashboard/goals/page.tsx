"use client";

import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import AddGoalModal from "@/components/dashboard/AddGoalModal";

export default function GoalPlanner() {
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(collection(db, "goals"), where("userId", "==", user.uid));
        
        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          const goalsList: any[] = [];
          snapshot.forEach(doc => {
            goalsList.push({ id: doc.id, ...doc.data() });
          });
          setGoals(goalsList);
          setLoading(false);
        }, (error) => {
          console.error("Firestore Error:", error);
          setLoading(false);
        });
        
        return () => unsubscribeSnapshot();
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  if (loading) {
    return <div className="text-gray-400 animate-pulse p-4">Loading your financial goals from Firebase...</div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Goal Planner</h1>
          <p className="text-gray-400 mt-1">Track your financial milestones and get smart SIP recommendations.</p>
        </div>
        <AddGoalModal />
      </div>

      {goals.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold text-white mb-2">No goals yet!</h3>
          <p className="text-gray-400">Click the button above to create your first financial goal.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {goals.map((goal: any) => {
            const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
            // Tailwind doesn't support dynamic arbitrary class names well without safelisting, 
            // so using inline styles for dynamic colors based on user selection is safer.
            const colorMap: Record<string, string> = {
              blue: "#3b82f6",
              purple: "#a855f7",
              green: "#22c55e",
              red: "#ef4444",
              yellow: "#eab308"
            };
            const themeColor = colorMap[goal.color] || colorMap.blue;
            
            return (
              <div key={goal.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-emoji"
                    style={{ backgroundColor: `${themeColor}20`, border: `1px solid ${themeColor}40` }}
                  >
                    {goal.icon}
                  </div>
                  <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium text-gray-300">
                    Target: {goal.deadline}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1">{goal.name}</h3>
                <div className="flex justify-between items-end mb-4">
                  <span className="text-2xl font-bold text-white">{formatCurrency(goal.current)}</span>
                  <span className="text-sm text-gray-400 mb-1">of {formatCurrency(goal.target)}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-black/50 rounded-full h-3 mb-2 overflow-hidden border border-white/5">
                  <div 
                    className="h-3 rounded-full relative"
                    style={{ width: `${progress}%`, backgroundColor: themeColor }}
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/20 blur-[2px] rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mb-6">
                  <span>{progress}% Completed</span>
                  <span>{formatCurrency(goal.target - goal.current)} left</span>
                </div>
                
                <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Suggested Monthly SIP</p>
                    <p className="text-sm font-bold" style={{ color: themeColor }}>{formatCurrency(goal.suggestedSip)}</p>
                  </div>
                  <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-white transition-colors">
                    Invest Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
