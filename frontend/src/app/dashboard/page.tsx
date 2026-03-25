import MoneyHealthScore from "@/components/dashboard/MoneyHealthScore";
import SummaryCards from "@/components/dashboard/SummaryCards";
import AddTransactionModal from "@/components/dashboard/AddTransactionModal";

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 mt-1">Welcome back, your finances are looking good today.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-colors">
            Export Report
          </button>
          <AddTransactionModal />
        </div>
      </div>

      {/* Top Section */}
      <SummaryCards />
      
      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Money Health Score (1/3 width) */}
        <div className="lg:col-span-1">
          <MoneyHealthScore />
        </div>
        
        {/* Placeholder for future charts (2/3 width) */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 z-0"></div>
          <p className="text-gray-500 italic relative z-10 w-full text-center border-t border-b border-white/5 py-12">
            Spending Analytics Chart will appear here
          </p>
          <div className="mt-4 flex gap-4 absolute bottom-6 right-6 z-10">
            <div className="h-4 w-24 bg-white/5 rounded"></div>
            <div className="h-4 w-16 bg-white/5 rounded"></div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
