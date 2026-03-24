import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              MoneyMitra AI
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</Link>
            <div className="flex items-center space-x-4 ml-6 border-l border-white/10 pl-6">
              <Link href="/login" className="text-gray-300 hover:text-white transition-colors font-medium">Log in</Link>
              <Link href="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-5 py-2 rounded-full font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
