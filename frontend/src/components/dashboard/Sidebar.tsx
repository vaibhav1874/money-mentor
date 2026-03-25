"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: "Smart Chat",
      href: "/dashboard/chat",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      )
    },
    {
      name: "Goal Planner",
      href: "/dashboard/goals",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      name: "Insights",
      href: "/dashboard/insights",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-black border-r border-white/10 h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
        <Link href="/dashboard" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          MoneyMitra AI
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.1)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className={`${isActive ? "text-blue-400" : "text-gray-500"}`}>
                  {item.icon}
                </div>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 pt-6 border-t border-white/10 px-2">
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-2xl p-5 border border-white/10 relative overflow-hidden group/premium">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover/premium:scale-110 transition-transform duration-700"></div>
            <h4 className="text-white font-bold mb-1 relative z-10 text-sm">Premium Plan</h4>
            <p className="text-[10px] text-blue-300 mb-4 relative z-10 font-medium">Get access to Advanced AI Tax Planning</p>
            <Link 
              href="/#pricing" 
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-white text-[11px] font-black shadow-lg shadow-blue-600/20 relative z-10 flex items-center justify-center transition-all active:scale-95 uppercase tracking-widest"
            >
              Upgrade Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
