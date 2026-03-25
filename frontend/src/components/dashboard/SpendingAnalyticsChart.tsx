"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function SpendingAnalyticsChart({ transactions }: { transactions: any[] }) {
  const expenses = transactions.filter(t => t.type === 'Expense');
  
  const categoryTotals: Record<string, number> = {};
  expenses.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
  });
  
  const data = Object.keys(categoryTotals).map(cat => ({
    name: cat,
    value: categoryTotals[cat]
  }));
  
  data.sort((a, b) => b.value - a.value);
  
  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#a855f7', '#ec4899', '#22c55e'];
  
  if (data.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center h-[350px]">
        <p className="text-gray-500 italic">No expenses recorded yet. Add transactions to see your analysis.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden h-[350px]">
      <h3 className="text-lg font-medium text-white mb-2">Spending by Category</h3>
      <div className="w-full h-full pb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: any) => `₹${Number(value).toLocaleString('en-IN')}`}
              contentStyle={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
