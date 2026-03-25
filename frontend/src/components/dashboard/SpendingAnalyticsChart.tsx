"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, Sparkles } from "lucide-react";

export default function SpendingAnalyticsChart({ transactions }: { transactions: any[] }) {
  // Group transactions by date for the area chart
  const dailyData: Record<string, number> = {};
  
  // Sort and group last 7 days (mocking if no data)
  const sortedTxs = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  sortedTxs.forEach(tx => {
    if (tx.type === 'Expense') {
      const date = new Date(tx.date).toLocaleDateString('en-US', { weekday: 'short' });
      dailyData[date] = (dailyData[date] || 0) + Number(tx.amount);
    }
  });

  const chartData = Object.keys(dailyData).map(date => ({
    name: date,
    value: dailyData[date]
  }));

  // Fallback data if no transactions
  const data = chartData.length > 0 ? chartData : [
    { name: "Mon", value: 400 },
    { name: "Tue", value: 300 },
    { name: "Wed", value: 600 },
    { name: "Thu", value: 800 },
    { name: "Fri", value: 500 },
    { name: "Sat", value: 900 },
    { name: "Sun", value: 700 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-[2.5rem] p-8 h-[400px] flex flex-col relative overflow-hidden group shadow-2xl border border-white/5"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl"></div>
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-white font-black text-lg tracking-tight flex items-center gap-2">
            Spending Velocity
            <Sparkles className="w-4 h-4 text-primary-500" />
          </h3>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1 opacity-60">Neural Trend Audit</p>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-tight bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <TrendingUp className="w-4 h-4" />
          Optimal
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="100%">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#4b5563", fontSize: 10, fontWeight: "800" }}
              dy={15}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#4b5563", fontSize: 10, fontWeight: "800" }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "rgba(0, 0, 0, 0.9)", 
                border: "1px solid rgba(255, 255, 255, 0.1)", 
                borderRadius: "16px",
                backdropFilter: "blur(12px)",
                padding: "12px 16px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
              }}
              itemStyle={{ color: "#fff", fontWeight: "800", fontSize: "14px" }}
              labelStyle={{ color: "#6b7280", marginBottom: "4px", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em" }}
              cursor={{ stroke: "rgba(139, 92, 246, 0.3)", strokeWidth: 2 }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#8b5cf6" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
