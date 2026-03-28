"use client";

import CouplePlanner from "@/components/features/CouplePlanner";
import { motion } from "framer-motion";

export default function CouplePage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 md:p-12 min-h-screen bg-black"
    >
      <CouplePlanner />
    </motion.div>
  );
}
