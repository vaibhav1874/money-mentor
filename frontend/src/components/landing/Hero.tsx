import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1000px] pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8">
          Your AI Money Mentor for <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Smarter Financial Decisions
          </span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10">
          Manage finances, track your health score, plan goals, and get intelligent insights through a simple, conversational experience.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full font-bold text-lg transition-all shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:shadow-[0_0_35px_rgba(59,130,246,0.7)] hover:-translate-y-1">
            Get Started
          </Link>
          <Link href="#demo" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold text-lg backdrop-blur-sm transition-all hover:-translate-y-1">
            Try Demo
          </Link>
        </div>
        
        {/* Mockup visualization */}
        <div className="mt-20 relative max-w-4xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-2 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 mix-blend-overlay"></div>
            <div className="rounded-xl overflow-hidden bg-[#050505] aspect-[16/9] w-full relative border border-white/5 flex flex-col pointer-events-none shadow-2xl">
              {/* Fake Topnav */}
              <div className="h-10 sm:h-12 border-b border-white/10 flex items-center px-3 sm:px-4 justify-between bg-white/5">
                <div className="flex gap-2 items-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                  <div className="text-white text-[10px] sm:text-xs font-bold hidden xs:block">MoneyMitra AI</div>
                </div>
                <div className="flex gap-2">
                  <div className="w-16 sm:w-20 h-5 sm:h-6 bg-white/10 rounded-full"></div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/10 rounded-full"></div>
                </div>
              </div>
              
              {/* Fake Layout */}
              <div className="flex flex-1 overflow-hidden">
                {/* Fake Sidebar */}
                <div className="w-1/4 max-w-[140px] border-r border-white/10 p-3 sm:p-4 space-y-3 hidden md:block bg-black/50">
                  <div className="h-3 bg-white/20 rounded w-3/4"></div>
                  <div className="h-3 bg-white/10 rounded w-full"></div>
                  <div className="h-3 bg-white/10 rounded w-5/6"></div>
                  <div className="h-3 bg-white/10 rounded w-2/3"></div>
                  <div className="h-3 bg-white/10 rounded w-4/5 mt-8"></div>
                </div>
                
                {/* Fake Main Area */}
                <div className="flex-1 p-3 sm:p-5 space-y-3 sm:space-y-4 flex flex-col">
                   <div className="flex justify-between items-center">
                     <div className="h-4 sm:h-5 bg-white/20 rounded w-1/3 max-w-[150px]"></div>
                     <div className="h-6 sm:h-8 bg-blue-500/20 border border-blue-500/30 rounded-md sm:rounded-lg w-16 sm:w-24"></div>
                   </div>
                   
                   {/* Fake Cards */}
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                     <div className="bg-white/5 border border-white/10 h-14 sm:h-16 rounded-lg sm:rounded-xl p-2 sm:p-3 flex flex-col justify-center">
                       <div className="h-1.5 sm:h-2 bg-gray-500 rounded w-1/2 mb-1 sm:mb-2"></div>
                       <div className="h-3 sm:h-4 bg-white rounded w-3/4"></div>
                     </div>
                     <div className="bg-white/5 border border-white/10 h-14 sm:h-16 rounded-lg sm:rounded-xl p-2 sm:p-3 flex flex-col justify-center">
                       <div className="h-1.5 sm:h-2 bg-gray-500 rounded w-1/2 mb-1 sm:mb-2"></div>
                       <div className="h-3 sm:h-4 bg-green-400 rounded w-5/6"></div>
                     </div>
                     <div className="bg-white/5 border border-white/10 h-14 sm:h-16 rounded-lg sm:rounded-xl p-2 sm:p-3 flex flex-col justify-center hidden sm:flex">
                       <div className="h-1.5 sm:h-2 bg-gray-500 rounded w-1/2 mb-1 sm:mb-2"></div>
                       <div className="h-3 sm:h-4 bg-red-400 rounded w-2/3"></div>
                     </div>
                     <div className="bg-white/5 border border-white/10 h-14 sm:h-16 rounded-lg sm:rounded-xl p-2 sm:p-3 flex flex-col justify-center hidden lg:flex">
                       <div className="h-1.5 sm:h-2 bg-gray-500 rounded w-1/2 mb-1 sm:mb-2"></div>
                       <div className="h-3 sm:h-4 bg-white rounded w-full"></div>
                     </div>
                   </div>
                   
                   {/* Fake Bottom Area */}
                   <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 overflow-hidden">
                     {/* Fake Score */}
                     <div className="col-span-1 border border-white/10 bg-white/5 rounded-lg sm:rounded-xl flex items-center justify-center p-2 sm:p-4">
                       <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-[3px] sm:border-4 border-white/10 border-t-blue-500 border-r-blue-500 relative flex items-center justify-center">
                         <span className="text-sm sm:text-xl font-bold text-white">92</span>
                       </div>
                     </div>
                     
                     {/* Fake List */}
                     <div className="col-span-1 sm:col-span-2 border border-white/10 bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-3 flex flex-col">
                       <div className="h-3 sm:h-4 bg-white/20 w-1/3 sm:w-1/4 rounded mb-1 sm:mb-2"></div>
                       <div className="h-6 sm:h-8 bg-black/40 border border-white/5 rounded-md sm:rounded-lg flex items-center px-2 sm:px-3 justify-between">
                         <div className="flex gap-2 items-center">
                           <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-400/20"></div>
                           <div className="w-12 sm:w-16 h-1.5 sm:h-2 bg-white/20 rounded"></div>
                         </div>
                         <div className="w-8 sm:w-12 h-1.5 sm:h-2 bg-white/40 rounded"></div>
                       </div>
                       <div className="h-6 sm:h-8 bg-black/40 border border-white/5 rounded-md sm:rounded-lg flex items-center px-2 sm:px-3 justify-between">
                         <div className="flex gap-2 items-center">
                           <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-400/20"></div>
                           <div className="w-10 sm:w-12 h-1.5 sm:h-2 bg-white/20 rounded"></div>
                         </div>
                         <div className="w-10 sm:w-16 h-1.5 sm:h-2 bg-green-400/40 rounded"></div>
                       </div>
                       <div className="h-6 sm:h-8 bg-black/40 border border-white/5 rounded-md sm:rounded-lg flex items-center px-2 sm:px-3 justify-between hidden sm:flex">
                         <div className="flex gap-2 items-center">
                           <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-red-400/20"></div>
                           <div className="w-14 sm:w-20 h-1.5 sm:h-2 bg-white/20 rounded"></div>
                         </div>
                         <div className="w-6 sm:w-10 h-1.5 sm:h-2 bg-white/40 rounded"></div>
                       </div>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
