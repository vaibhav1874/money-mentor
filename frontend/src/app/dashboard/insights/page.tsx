"use client";

import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SmartInsights() {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAIGeneratedInsights = async (userUid: string) => {
      try {
        setLoading(true);
        // Step 1: Fetch real user transactions from Firestore without requiring a composite index
        const q = query(
          collection(db, "transactions"), 
          where("userId", "==", userUid)
        );
        const snapshot = await getDocs(q);
        const allTxs: any[] = [];
        snapshot.forEach(doc => {
          allTxs.push(doc.data());
        });
        
        // Sort locally and extract most recent 30
        allTxs.sort((a, b) => {
           const tA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
           const tB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
           return tB - tA;
        });
        
        const txs = allTxs.slice(0, 30).map(data => ({
          type: data.type,
          amount: data.amount,
          category: data.category,
          date: data.date
        }));

        // Step 2: Send them to Python Backend to prompt Gemini
        const res = await fetch('http://localhost:8000/api/generate-insights', {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ transactions: txs })
        });
        
        if (res.ok) {
          const json = await res.json();
          setInsights(json);
        }
      } catch (error) {
        console.error("Failed to generate AI insights", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchAIGeneratedInsights(user.uid);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
        <div className="text-purple-400 font-medium animate-pulse">Gemini AI is analyzing your transactions...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
          Smart Insights
          <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-400 text-xs font-bold border border-purple-500/30 uppercase tracking-wide">
            Powered by Gemini
          </span>
        </h1>
        <p className="text-gray-400 mt-1">AI-driven analysis of your recent spending habits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {insights.map((insight: any) => (
          <div key={insight.id} className={`bg-gradient-to-br from-${insight.color}-900/10 to-black border border-${insight.color}-500/20 rounded-2xl p-6 relative overflow-hidden flex flex-col hover:bg-white/5 transition-colors`}>
            
            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-${insight.color}-500 to-transparent`}></div>
            
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-full bg-${insight.color}-500/10 flex items-center justify-center text-2xl shrink-0 font-emoji`}>
                {insight.icon}
              </div>
              <div>
                <span className={`inline-block px-2 py-1 bg-${insight.color}-500/10 text-${insight.color}-400 text-[10px] font-bold uppercase tracking-wider rounded mb-2`}>
                  {insight.type}
                </span>
                <h3 className="text-lg font-bold text-white leading-snug">{insight.title}</h3>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {insight.description}
            </p>
            
            <button className={`mt-auto align-self-start px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors w-max`}>
              {insight.actionText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
