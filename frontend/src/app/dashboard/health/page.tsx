"use client";

import MoneyHealthOnboarding from "@/components/features/MoneyHealthOnboarding";
import { motion } from "framer-motion";

export default function HealthPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 md:p-12 min-h-screen bg-black"
    >
      <MoneyHealthOnboarding />
    </motion.div>
  );
}
