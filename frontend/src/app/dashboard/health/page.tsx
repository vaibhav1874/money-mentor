"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const MoneyHealthOnboarding = dynamic(() => import("@/components/features/MoneyHealthOnboarding"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      <p className="text-purple-400 font-medium animate-pulse text-sm uppercase tracking-widest">Loading Money Health...</p>
    </div>
  )
});

export default function HealthPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 md:p-12 min-h-screen bg-black">
      <MoneyHealthOnboarding />
    </motion.div>
  );
}
