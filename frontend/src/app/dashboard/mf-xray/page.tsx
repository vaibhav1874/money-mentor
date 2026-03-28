"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Recharts uses browser-only APIs — must be loaded client-side only
const MFXRay = dynamic(() => import("@/components/features/MFXRay"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      <p className="text-cyan-400 font-medium animate-pulse text-sm uppercase tracking-widest">Loading Portfolio Scanner...</p>
    </div>
  )
});

export default function MFXRayPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 md:p-12 min-h-screen bg-black"
    >
      <MFXRay />
    </motion.div>
  );
}
