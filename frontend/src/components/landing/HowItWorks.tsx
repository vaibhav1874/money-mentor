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
    <div id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-600/10 rounded-full mix-blend-screen filter blur-[80px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">Three simple steps to financial freedom.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connecting line between steps (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-full border-t-2 border-dashed border-white/20"></div>
              )}
              
              <div className="text-center relative z-10">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-purple-500/30 mb-6">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
