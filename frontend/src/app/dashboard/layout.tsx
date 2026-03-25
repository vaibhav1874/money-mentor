"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Topnav from "@/components/dashboard/Topnav";
import { DashboardProvider } from "@/context/DashboardContext";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="flex h-screen overflow-hidden bg-[#020202] text-white selection:bg-primary-500/30">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Futuristic Background Blobs */}
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none animate-pulse-slow active"></div>
          
          <Topnav />
          <main className="flex-1 overflow-y-auto z-10 px-4 py-8 sm:px-8 sm:py-10 max-w-7xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}
