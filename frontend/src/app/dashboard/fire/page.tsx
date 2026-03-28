"use client";

import FIREPlanner from "@/components/features/FIREPlanner";
import { motion } from "framer-motion";

export default function FIREPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 md:p-12 min-h-screen bg-black"
    >
      <FIREPlanner />
    </motion.div>
  );
}
