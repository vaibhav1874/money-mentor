export default function MoneyHealthScore({ score = 84 }: { score?: number }) {
  const circumference = 2 * Math.PI * 45; // r=45
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let label = "Fair";
  let desc = "You're doing okay, but your spending rate is high.";
  let colorClass = "text-yellow-400";
  let icon = (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
    </svg>
  );

  if (score >= 80) { 
    label = "Excellent"; 
    desc = "Your finances are in great shape! High savings rate."; 
    colorClass = "text-green-400"; 
    icon = (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    );
  } else if (score >= 60) { 
    label = "Good"; 
    desc = "You're consistently saving money, keep it up."; 
    colorClass = "text-blue-400"; 
    icon = (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    );
  } else if (score < 50 && score > 0) { 
    label = "Needs Action"; 
    desc = "Warning: you are spending more than you earn."; 
    colorClass = "text-red-400";
    icon = (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    );
  } else if (score === 0) {
    label = "No Data";
    desc = "Add transactions to unlock score.";
    colorClass = "text-gray-400";
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden h-[350px] flex flex-col items-center justify-center dashboard-card">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
      
      <h3 className="text-lg font-medium text-white w-full text-left self-start absolute top-6 left-6">Money Health Score</h3>
      
      <div className="relative flex flex-col items-center justify-center mt-6">
        <div className="relative flex items-center justify-center w-40 h-40 mb-4">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="80" cy="80" r="45" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/10" />
            {/* Progress Circle (Gradient via CSS or inline stroke) */}
            <circle cx="80" cy="80" r="45" stroke="url(#gradient)" strokeWidth="10" fill="transparent"
              strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
              className="transition-all duration-1000 ease-out" />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white tracking-tighter">{score}</span>
            <span className="text-xs text-gray-400 mt-1">out of 100</span>
          </div>
        </div>
        
        <div className="text-center px-2">
          <p className={`${colorClass} font-medium text-lg flex items-center justify-center gap-1`}>
            {icon}
            {label}
          </p>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
