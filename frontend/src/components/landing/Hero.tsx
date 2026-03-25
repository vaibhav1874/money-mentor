"use client";
import Link from "next/link";
import dynamic from 'next/dynamic';

const ThreeDScene = dynamic(() => import('./ThreeDScene'), { ssr: false });

export default function Hero() {
  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden">
      {/* Background gradients and 3D Scene */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <ThreeDScene />
        {/* Subtle glow overlays to enhance lighting */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
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
        
        {/* Premium Dashboard Preview */}
        <div className="mt-20 relative max-w-5xl mx-auto px-4">
          <div className="relative rounded-3xl border border-white/20 bg-white/5 backdrop-blur-3xl p-3 sm:p-4 shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Ambient glows behind the mockup */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]"></div>

            <div className="rounded-2xl overflow-hidden bg-[#0a0a0a]/90 aspect-[16/10] sm:aspect-[16/9] w-full relative border border-white/10 flex flex-col shadow-2xl">
              {/* Animated scanning line */}
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent absolute top-0 animate-[scan_4s_ease-in-out_infinite]"></div>
              </div>

              {/* Mockup Header */}
              <div className="h-12 border-b border-white/10 flex items-center px-6 justify-between bg-white/5 backdrop-blur-md relative z-10">
                <div className="flex gap-3 items-center">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-white text-sm font-bold tracking-tight">MoneyMitra <span className="text-blue-400">AI</span></div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="hidden sm:flex gap-2">
                    <div className="w-16 h-2 bg-white/10 rounded-full"></div>
                    <div className="w-10 h-2 bg-white/10 rounded-full"></div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 border border-white/10 rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-white/10"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-1 overflow-hidden relative z-10">
                {/* Mockup Sidebar */}
                <div className="w-48 border-r border-white/10 p-6 space-y-8 hidden md:block bg-gradient-to-b from-white/5 to-transparent">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 group/item cursor-pointer">
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                       <div className="h-2 bg-white/40 rounded w-16 group-hover:w-20 transition-all"></div>
                    </div>
                    <div className="flex items-center gap-2 group/item cursor-pointer">
                       <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                       <div className="h-2 bg-white/10 rounded w-20 group-hover:bg-white/20 transition-all"></div>
                    </div>
                    <div className="flex items-center gap-2 group/item cursor-pointer">
                       <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                       <div className="h-2 bg-white/10 rounded w-14 group-hover:bg-white/20 transition-all"></div>
                    </div>
                  </div>
                  <div className="pt-4 space-y-4">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Analytics</div>
                    <div className="flex items-center gap-2 group/item cursor-pointer">
                       <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40"></div>
                       <div className="h-2 bg-white/10 rounded w-18 group-hover:w-24 transition-all"></div>
                    </div>
                    <div className="flex items-center gap-2 group/item cursor-pointer">
                       <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                       <div className="h-2 bg-white/10 rounded w-12 group-hover:bg-white/20 transition-all"></div>
                    </div>
                  </div>
                </div>
                
                {/* Mockup Content */}
                <div className="flex-1 p-6 space-y-6 flex flex-col overflow-hidden">
                   <div className="flex justify-between items-end">
                     <div>
                       <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Current Balance</div>
                       <div className="text-2xl font-black text-white px-0.5 tracking-tight flex items-center gap-2">
                         ₹12,45,000
                         <span className="text-[10px] bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded-md border border-green-500/20">+4.2%</span>
                       </div>
                     </div>
                     <div className="bg-blue-600/20 border border-blue-500/40 rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg shadow-blue-500/10">
                       <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                       <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Connect Bank</div>
                     </div>
                   </div>
                   
                   {/* Grid Cards */}
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: 'Income', val: '₹1.85L', color: 'blue', icon: '💰' },
                        { label: 'Expenses', val: '₹65.4K', color: 'red', icon: '📉' },
                        { label: 'Savings', val: '₹1.2L', color: 'green', icon: '🏦' },
                        { label: 'Invested', val: '₹8.5L', color: 'purple', icon: '💎' }
                      ].map((c, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/10 hover:border-white/20 transition-all group/card shadow-lg shadow-black/20">
                          <div className="flex justify-between items-start">
                            <span className="text-lg grayscale group-hover/card:grayscale-0 transition-all">{c.icon}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                          </div>
                          <div>
                            <div className="text-[9px] font-black text-zinc-500 uppercase tracking-wider mb-0.5">{c.label}</div>
                            <div className="text-sm font-black text-white">{c.val}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                   
                   <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6 overflow-hidden">
                     {/* Health Score Circle */}
                     <div className="lg:col-span-2 border border-blue-500/20 bg-blue-500/5 rounded-2xl flex flex-col items-center justify-center p-6 relative group">
                        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative w-32 h-32 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364" strokeDashoffset="40" className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                          </svg>
                          <div className="absolute flex flex-col items-center">
                            <span className="text-4xl font-black text-white">92</span>
                            <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase">Excellent</span>
                          </div>
                        </div>
                     </div>
                     
                     {/* Recent Activities */}
                      <div className="lg:col-span-3 border border-white/10 bg-white/5 rounded-2xl p-6 space-y-4">
                         <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Live Insights</div>
                         {[
                           { t: 'High Spend: Dining', v: '-₹2,400', c: 'red' },
                           { t: 'SIP Recommendation', v: 'Update', c: 'blue' },
                           { t: 'Tax Saving Found', v: 'View', c: 'green' }
                         ].map((item, i) => (
                           <div key={i} className="h-12 bg-black/40 border border-white/5 rounded-xl flex items-center px-4 justify-between group hover:border-blue-500/30 transition-all cursor-pointer">
                             <div className="flex gap-3 items-center">
                               <div className={`w-2 h-2 rounded-full ${item.c === 'red' ? 'bg-red-400' : item.c === 'blue' ? 'bg-blue-400' : 'bg-green-400'} shadow-[0_0_10px_rgba(255,255,255,0.1)]`}></div>
                               <div className="text-[11px] font-bold text-gray-300 group-hover:text-white transition-colors">{item.t}</div>
                             </div>
                             <div className={`text-[10px] font-black ${item.c === 'red' ? 'text-red-400 bg-red-400/10 border-red-400/20' : item.c === 'blue' ? 'text-blue-400 bg-blue-400/10 border-blue-400/20' : 'text-green-400 bg-green-400/10 border-green-400/20'} px-2.5 py-1 rounded-lg border`}>{item.v}</div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements around mockup */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-tr from-yellow-500/40 to-orange-500/40 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        </div>

      </div>
    </div>
  );
}
