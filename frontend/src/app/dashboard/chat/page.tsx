"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  RotateCcw, 
  MoreVertical,
  Paperclip,
  Zap,
  ArrowRight
} from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm MoneyMitra, your premium AI financial advisor. How can I assist you with your wealth strategy today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const newMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setLoading(true);
    
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage.text })
      });
      
      const data = await res.json();
      
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: data.text || "I'm processing a vast amount of financial data. Could you rephrase your query?",
          time: data.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: "I'm having trouble connecting to the neural core. Please verify the backend server is operational on port 8000.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-5xl mx-auto glass-card rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-white/5">
      {/* Premium Chat Header */}
      <div className="h-20 border-b border-white/5 bg-white/[0.02] backdrop-blur-2xl px-8 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group hover:scale-110 transition-transform cursor-pointer">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-white font-black text-lg tracking-tight">MoneyMitra AI</h2>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-primary-500/10 text-primary-400 px-2 py-0.5 rounded-full border border-primary-500/20">PRO</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] text-gray-500 font-bold uppercase tracking-widest opacity-60">Global Intelligence Engine</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all border border-transparent hover:border-white/10 active:scale-95">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all border border-transparent hover:border-white/10 active:scale-95">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide bg-gradient-to-b from-transparent to-white/[0.01] relative"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-4 max-w-[85%] sm:max-w-[75%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center border border-white/5 shadow-lg ${
                  msg.sender === 'ai' 
                    ? "bg-white/5 text-primary-500" 
                    : "bg-primary-500 text-white"
                }`}>
                  {msg.sender === 'ai' ? <Zap className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className={`px-6 py-4 rounded-3xl text-[15px] leading-relaxed shadow-2xl border ${
                    msg.sender === 'user' 
                      ? 'premium-gradient-primary text-white border-white/10 rounded-tr-none' 
                      : 'bg-white/[0.03] text-gray-200 border-white/[0.05] rounded-tl-none backdrop-blur-md'
                  }`}>
                    {msg.text}
                  </div>
                  <span className={`text-[10px] font-bold text-gray-600 uppercase tracking-widest px-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-primary-500 shadow-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="px-6 py-4 bg-white/[0.03] border border-white/[0.05] rounded-3xl rounded-tl-none flex items-center gap-2 shadow-xl backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Futuristic Input Area */}
      <div className="p-8 bg-white/[0.02] border-t border-white/5 shrink-0 z-20">
        <form 
          className="relative group/input flex items-center gap-4"
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        >
          <button type="button" className="p-4 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-2xl transition-all border border-white/5 hover:border-white/10 active:scale-95 shadow-lg shrink-0">
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query MoneyMitra's intelligence core..."
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 pr-16 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 transition-all focus:ring-4 focus:ring-primary-500/5 group-hover/input:border-white/20 shadow-inner"
              disabled={loading}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || loading}
              className={`absolute right-3 top-3 bottom-3 w-12 rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-lg ${
                input.trim() && !loading
                  ? 'premium-gradient-primary text-white shadow-purple-500/20' 
                  : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
        
        <div className="mt-5 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 group cursor-pointer">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">Neural Engine 1.5</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
            <Zap className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">Real-time Market Audit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
