import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black pt-24 pb-12 overflow-hidden">
      {/* Footer Glossy Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none -z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 mb-6 inline-block tracking-tighter">
              MoneyMitra AI
            </Link>
            <p className="text-zinc-200 text-lg max-w-sm mt-4 leading-relaxed font-medium">
              Your intelligent companion for smarter financial decisions, automated tracking, and personalized wealth management.
            </p>
            <div className="flex items-center gap-5 mt-10">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer hover:-translate-y-1 shadow-lg shadow-black/50">
                <span className="text-white text-xl font-bold">𝕏</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer hover:-translate-y-1 shadow-lg shadow-black/50">
                <span className="text-white text-xl font-bold">in</span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer hover:-translate-y-1 shadow-lg shadow-black/50">
                <span className="text-white text-xl font-bold">ig</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-zinc-200 hover:text-white transition-colors font-semibold text-lg">Features</Link></li>
              <li><Link href="#how-it-works" className="text-zinc-200 hover:text-white transition-colors font-semibold text-lg">How it works</Link></li>
              <li><Link href="#pricing" className="text-zinc-200 hover:text-white transition-colors font-semibold text-lg">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-zinc-200 hover:text-white transition-colors font-semibold text-lg">Privacy Policy</Link></li>
              <li><Link href="#" className="text-zinc-200 hover:text-white transition-colors font-semibold text-lg">Terms of Service</Link></li>
              <li><Link href="#" className="text-zinc-200 hover:text-white transition-colors font-semibold text-lg">Data Security</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 text-center text-zinc-300 text-sm font-semibold tracking-wide uppercase opacity-70">
          <p>&copy; {new Date().getFullYear()} MoneyMitra AI. Built for the future of finance. Not actual financial advice.</p>
        </div>
      </div>
    </footer>
  );
}
