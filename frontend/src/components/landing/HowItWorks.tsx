"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect Accounts",
      description: "Securely link your bank accounts, credit cards, and investment portfolios in one place.",
    },
    {
      number: "02",
      title: "Analyze & Score",
      description: "Our AI assesses your income, expenses, and savings to calculate your Money Health Score.",
    },
    {
      number: "03",
      title: "Get Smart Advice",
      description: "Chat with your AI mentor to plan goals, save on taxes, and grow your wealth effortlessly.",
    }
  ];

  return (
    <div id="how-it-works" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full mix-blend-screen filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-600/10 rounded-full mix-blend-screen filter blur-[80px]"></div>
      
      {/* Decorative Dots */}
      <div className="absolute inset-0 bg-dot-white opacity-40 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">How It <span className="text-purple-400">Works</span></h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto font-medium">Three simple steps to financial freedom.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Connecting line between steps (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-full border-t-2 border-dashed border-white/10"></div>
              )}
              
              <div className="text-center relative z-10 group">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-purple-500/20 mb-8 group-hover:rotate-6 transition-transform">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed font-medium px-4">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

