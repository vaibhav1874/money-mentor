export default function SmartInsights() {
  const insights = [
    {
      id: 1,
      type: "alert",
      title: "High Dining Expenses Detected",
      description: "You've spent ₹14,500 on dining out this month, which is 45% higher than your average. Consider cooking at home to stay on budget.",
      actionText: "Review Budget",
      icon: "🍽️",
      color: "red"
    },
    {
      id: 2,
      type: "opportunity",
      title: "Tax Saving Opportunity",
      description: "You haven't fully utilized your Section 80C limit. Investing ₹45,000 more can save you up to ₹14,040 in taxes this financial year.",
      actionText: "Explore ELSS Funds",
      icon: "💰",
      color: "green"
    },
    {
      id: 3,
      type: "achievement",
      title: "Emergency Fund On Track",
      description: "Great job! You are consistently saving ₹8,000 per month towards your Emergency Fund. You will reach your goal 2 months earlier than planned.",
      actionText: "View Goals",
      icon: "⭐",
      color: "yellow"
    },
    {
      id: 4,
      type: "insight",
      title: "Subscription Audit",
      description: "We noticed you are paying for 3 streaming services but haven't used Netflix in 45 days. Canceling could save you ₹7,800 annually.",
      actionText: "Manage Subscriptions",
      icon: "📺",
      color: "purple"
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <svg className="w-8 h-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Smart Insights
          </h1>
          <p className="text-gray-400 mt-1">AI-powered recommendations to optimize your wealth and habits.</p>
        </div>
        <div className="flex space-x-3">
          <select className="bg-black border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>This Month</option>
            <option>Last 3 Months</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"></div>
        
        {insights.map((insight) => (
          <div key={insight.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm hover:bg-white/10 transition-colors group">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${insight.color}-500/10 rounded-full blur-2xl group-hover:bg-${insight.color}-500/20 transition-all`}></div>
            
            <div className="flex items-start gap-4 relative z-10">
              <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-2xl bg-${insight.color}-500/10 border border-${insight.color}-500/20 shadow-md font-emoji`}>
                {insight.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white">{insight.title}</h3>
                  {insight.type === "alert" && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {insight.description}
                </p>
                <button className={`text-sm font-medium text-${insight.color}-400 hover:text-${insight.color}-300 flex items-center gap-1 transition-colors`}>
                  {insight.actionText}
                  <svg className="w-4 h-4 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Category breakdown snippet */}
      <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">Spending vs Income Analysis</h3>
        <div className="h-64 flex items-end justify-between gap-2 px-4 border-b border-white/10 pb-4 relative">
          <div className="absolute inset-x-0 bottom-4 border-t border-dashed border-white/10 z-0"></div>
          <div className="absolute inset-x-0 bottom-32 border-t border-dashed border-white/10 z-0"></div>
          <div className="absolute inset-x-0 bottom-60 border-t border-dashed border-white/10 z-0"></div>
          
          {/* Mock bars */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full max-w-[40px] flex flex-col justify-end gap-1 z-10">
              <div className="w-full bg-blue-500/80 rounded-t-sm hover:bg-blue-400 transition-colors cursor-pointer" style={{ height: `${Math.floor(Math.random() * 60) + 40}%` }}></div>
              <div className="w-full bg-purple-500/80 rounded-t-sm hover:bg-purple-400 transition-colors cursor-pointer" style={{ height: `${Math.floor(Math.random() * 40) + 20}%` }}></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between px-4 mt-4 text-xs text-gray-500">
          <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
        </div>
        <div className="flex justify-center gap-6 mt-6 text-sm">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span><span className="text-gray-400">Income</span></div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-500"></span><span className="text-gray-400">Expenses</span></div>
        </div>
      </div>
    </div>
  );
}
