"use client";

import TaxWizard from "@/components/features/TaxWizard";
import { motion } from "framer-motion";

export default function TaxPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 md:p-12 min-h-screen bg-black"
    >
      <TaxWizard />
    </motion.div>
  );
}
