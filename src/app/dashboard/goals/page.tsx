export default function GoalPlanner() {
  const goals = [
    {
      id: 1,
      name: "Dream Home Downpayment",
      target: 2500000,
      current: 850000,
      deadline: "Dec 2026",
      suggestedSip: 45000,
      icon: "🏠",
      color: "blue"
    },
    {
      id: 2,
      name: "Europe Vacation",
      target: 400000,
      current: 120000,
      deadline: "Jun 2025",
      suggestedSip: 18000,
      icon: "✈️",
      color: "purple"
    },
    {
      id: 3,
      name: "Emergency Fund",
      target: 600000,
      current: 550000,
      deadline: "Dec 2024",
      suggestedSip: 8000,
      icon: "🛡️",
      color: "green"
    }
  ];

  const formatCurrency = (val: number) => `₹${val.toLocaleString('en-IN')}`;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Goal Planner</h1>
          <p className="text-gray-400 mt-1">Track your financial milestones and get smart SIP recommendations.</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-sm font-medium text-white shadow-lg shadow-purple-500/20 hover:from-blue-500 hover:to-purple-500 transition-all flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
          
          return (
            <div key={goal.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden flex flex-col hover:bg-white/10 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-${goal.color}-500/10 border border-${goal.color}-500/20 shadow-[0_0_15px_rgba(0,0,0,0)] font-emoji`}>
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
                  className={`bg-gradient-to-r from-${goal.color}-500 to-${goal.color}-400 h-3 rounded-full relative`}
                  style={{ width: `${progress}%` }}
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
                  <p className={`text-sm font-bold text-${goal.color}-400`}>{formatCurrency(goal.suggestedSip)}</p>
                </div>
                <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-white transition-colors">
                  Invest Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
