"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from "framer-motion";

interface SpendingData {
  name: string;
  value: number;
}

export default function SpendingAnalyticsChart({ transactions }: { transactions: any[] }) {
  const expenses = transactions.filter(t => t.type === 'Expense');
  
  const categoryTotals: Record<string, number> = {};
  expenses.forEach(t => {
    const amount = Number(t.amount);
    if (!isNaN(amount)) {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + amount;
    }
  });
  
  const data: SpendingData[] = Object.keys(categoryTotals).map(cat => ({
    name: cat,
    value: categoryTotals[cat]
  }));
  
  data.sort((a, b) => b.value - a.value);
  
  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#eab308', '#22c55e', '#ef4444'];
  
  if (data.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center h-[380px] text-center"
      >
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/5">
           <PieChart className="w-8 h-8 text-gray-600" />
        </div>
        <p className="text-gray-500 text-sm font-medium max-w-[200px] leading-relaxed italic">
          No expenses recorded yet. Import a statement or add transactions to see analysis.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden h-[380px] flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white tracking-tight">Spending by Category</h3>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={4}
              dataKey="value"
              stroke="none"
              animationBegin={0}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  className="hover:opacity-80 transition-opacity outline-none"
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: any) => `₹${Number(value || 0).toLocaleString('en-IN')}`}
              contentStyle={{ 
                backgroundColor: 'rgba(15,15,15,0.95)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '16px', 
                color: '#fff',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
              itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
            />
            <Legend 
              verticalAlign="bottom" 
              align="center"
              iconType="circle" 
              wrapperStyle={{ 
                paddingTop: '20px', 
                fontSize: '11px', 
                fontWeight: 'bold', 
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              formatter={(value) => <span className="text-gray-400 group-hover:text-white">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
