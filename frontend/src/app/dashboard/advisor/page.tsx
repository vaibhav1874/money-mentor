"use client";

import LifeEventAdvisor from "@/components/features/LifeEventAdvisor";
import { motion } from "framer-motion";

export default function AdvisorPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 md:p-12 min-h-screen bg-black"
    >
      <LifeEventAdvisor />
    </motion.div>
  );
}
