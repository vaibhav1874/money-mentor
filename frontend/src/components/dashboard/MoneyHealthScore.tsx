export default function MoneyHealthScore() {
  const score = 84;
  const circumference = 2 * Math.PI * 45; // r=45
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden h-full flex flex-col items-center justify-center dashboard-card">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
      
      <h3 className="text-lg font-medium text-white mb-6 w-full text-left">Money Health Score</h3>
      
      <div className="relative flex items-center justify-center w-40 h-40 mb-6">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="45"
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-white/10"
          />
          {/* Progress Circle (Gradient via CSS or inline stroke) */}
          <circle
            cx="80"
            cy="80"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
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
      
      <div className="text-center">
        <p className="text-green-400 font-medium text-lg flex items-center justify-center gap-1">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          Excellent
        </p>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed">
          Your finances are in great shape. Your savings rate is optimal.
        </p>
      </div>
    </div>
  );
}
