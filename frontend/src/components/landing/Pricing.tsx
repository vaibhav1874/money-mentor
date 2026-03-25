"use client";

import { Check, Zap, Star, Shield, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const PLANS = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for students and beginners starting their financial journey.",
    features: [
      "Basic Expense Tracking",
      "Connect 1 Bank Account",
      "Weekly AI Summary",
      "Goal Setting (up to 2)",
      "Community Support"
    ],
    buttonText: "Get Started",
    icon: <Zap className="w-5 h-5 text-blue-400" />,
    popular: false,
    gradient: "from-blue-500/10 to-transparent"
  },
  {
    name: "Pro",
    price: "499",
    description: "Advanced tools for those serious about mastering their money.",
    features: [
      "Unlimited Bank Connections",
      "Real-time AI Chat Insights",
      "Tax Optimization Reports",
      "Unlimited Goals & SIP Advice",
      "Early Access to Features",
      "Priority Email Support"
    ],
    buttonText: "Upgrade to Pro",
    icon: <Star className="w-5 h-5 text-purple-400" />,
    popular: true,
    gradient: "from-purple-500/20 to-blue-500/10"
  },
  {
    name: "Elite",
    price: "999",
    description: "White-glove service with personal AI advisors and family wealth tools.",
    features: [
      "Personal AI Financial Advisor",
      "Family Sharing (Up to 4)",
      "Estate Planning Tools",
      "Custom Investment API",
      "24/7 Concierge Support",
      "Exclusive Elite Workshops"
    ],
    buttonText: "Go Elite",
    icon: <Shield className="w-5 h-5 text-yellow-400" />,
    popular: false,
    gradient: "from-yellow-500/10 to-orange-500/10"
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      {/* Background Orbs for atmosphere */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[130px] -z-10"></div>
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Decorative Dots overlay for the section */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-white"
          >
            Flexible <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Membership Plans</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Choose the plan that fits your financial goals. Unlock the full power of AI-driven wealth management.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl border ${plan.popular ? 'border-purple-500/40' : 'border-white/10'} bg-white/5 backdrop-blur-xl p-8 flex flex-col h-full group hover:bg-white/[0.07] transition-all`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-purple-500/20">
                  Most Popular
                </div>
              )}

              <div className={`absolute inset-0 bg-gradient-to-b ${plan.gradient} opacity-20 pointer-events-none rounded-3xl`}></div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                  {plan.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              </div>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-black text-white">₹{plan.price}</span>
                <span className="text-gray-500 font-medium">/mo</span>
              </div>

              <p className="text-gray-400 text-sm mb-8 leading-relaxed italic">
                {plan.description}
              </p>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/20">
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all overflow-hidden relative group/btn ${
                plan.popular 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]' 
                  : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
              }`}>
                <span className="relative z-10">{plan.buttonText}</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
