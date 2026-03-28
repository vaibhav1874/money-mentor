"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboard } from "@/context/DashboardContext";
import { 
  LayoutDashboard, 
  MessageSquareText, 
  Target, 
  Zap, 
  User as UserIcon, 
  Sparkles, 
  ArrowUpRight,
  Flame,
  Activity,
  ReceiptText,
  Users2,
  ScanSearch,
  CalendarCheck
} from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useDashboard();

  const userName = user?.displayName || user?.email?.split('@')[0] || "Vaibhav";

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Smart Chat",
      href: "/dashboard/chat",
      icon: MessageSquareText,
    },
    {
      name: "Goal Planner",
      href: "/dashboard/goals",
      icon: Target,
    },
    {
      name: "Insights",
      href: "/dashboard/insights",
      icon: Zap,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: UserIcon,
    }
  ];

  const proItems = [
    {
      name: "FIRE Planner",
      href: "/dashboard/fire",
      icon: Flame,
    },
    {
      name: "Money Health",
      href: "/dashboard/health",
      icon: Activity,
    },
    {
      name: "Tax Wizard",
      href: "/dashboard/tax",
      icon: ReceiptText,
    },
    {
      name: "Couple Planner",
      href: "/dashboard/couple",
      icon: Users2,
    },
    {
      name: "MF X-Ray",
      href: "/dashboard/mf-xray",
      icon: ScanSearch,
    },
    {
      name: "Life Advisor",
      href: "/dashboard/advisor",
      icon: CalendarCheck,
    }
  ];

  return (
    <div className="hidden md:flex flex-col w-72 bg-black border-r border-white/5 h-screen sticky top-0 z-50">
      <div className="h-20 flex items-center px-8 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase italic">
            Money<span className="text-primary-500">Mitra</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-4">
        <div className="mb-8 px-4">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Core</span>
          <nav className="space-y-1.5 mt-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group block"
                >
                  <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? "bg-white/5 text-white" 
                      : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
                  }`}>
                    <div className={`transition-colors duration-300 ${isActive ? "text-primary-500" : "group-hover:text-white"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`font-medium tracking-tight ${isActive ? "text-white" : ""}`}>{item.name}</span>
                    
                    {isActive && (
                      <motion.div 
                        layoutId="activeNav"
                        className="absolute left-[-1rem] w-1 h-6 bg-primary-500 rounded-r-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mb-8 px-4">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Pro Tools</span>
          <nav className="space-y-1.5 mt-4">
            {proItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href);
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group block"
                >
                  <div className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? "bg-white/5 text-white" 
                      : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
                  }`}>
                    <div className={`transition-colors duration-300 ${isActive ? "text-primary-500" : "group-hover:text-white"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`font-medium tracking-tight ${isActive ? "text-white" : ""}`}>{item.name}</span>
                    
                    {isActive && (
                      <motion.div 
                        layoutId="activeNavPro"
                        className="absolute left-[-1rem] w-1 h-6 bg-primary-500 rounded-r-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-8 border-t border-white/5 px-2 mb-8">
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden group/premium">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl group-hover/premium:scale-150 transition-transform duration-700"></div>
            
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10 group-hover/premium:border-primary-500/50 transition-colors">
                <Sparkles className="w-5 h-5 text-primary-500" />
              </div>
              <h4 className="text-white font-bold text-sm mb-1 leading-tight">Pro Intelligence</h4>
              <p className="text-[11px] text-gray-500 mb-5 leading-relaxed">Unlock advanced AI audits & tax optimization agents.</p>
              
              <Link 
                href="/#pricing" 
                className="w-full py-2.5 premium-gradient-primary rounded-xl text-white text-[11px] font-bold shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] uppercase tracking-wider"
              >
                Upgrade Now
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Link 
        href="/dashboard/profile"
        className="p-6 border-t border-white/5 block hover:bg-white/5 transition-colors shrink-0"
      >
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center overflow-hidden">
            <UserIcon className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white leading-none truncate max-w-[120px]">{userName}</span>
            <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-medium">Free Tier</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
