"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hi there! 👋 I'm your MoneyMitra. How can I help you with your finances today?",
      time: "10:00 AM"
    },
    {
      id: 2,
      sender: "user",
      text: "How much did I spend on dining this month?",
      time: "10:05 AM"
    },
    {
      id: 3,
      sender: "ai",
      text: "You've spent ₹14,500 on dining out so far this month. This is 45% higher than your usual monthly average. Would you like me to set a dining budget alert for you?",
      time: "10:05 AM"
    },
    {
      id: 4,
      sender: "user",
      text: "Yes, please set an alert for ₹10,000 next month.",
      time: "10:08 AM"
    },
    {
      id: 5,
      sender: "ai",
      text: "Done! ✅ I've set a dining budget limit of ₹10,000 for next month. I'll notify you when you reach 80% of this limit.",
      time: "10:09 AM"
    }
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "ai",
          text: "I'm analyzing your request. Since I'm currently running in demo mode, I can't process real-time data right now. Try checking the insights tab for more features!",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
      {/* Chat Header */}
      <div className="h-16 border-b border-white/10 bg-black/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-0.5">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">Money Mentor AI</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-xs text-gray-400">Online</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-black relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/10 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}>
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex-shrink-0 mr-3 mt-1 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            )}
            
            <div className={`max-w-[80%] sm:max-w-[70%] ${
              msg.sender === 'user' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl rounded-tr-sm' 
                : 'bg-white/10 text-gray-100 rounded-2xl rounded-tl-sm border border-white/5 backdrop-blur-md'
            } px-5 py-3 shadow-lg`}>
              <p className="text-[15px] leading-relaxed">{msg.text}</p>
              <div className={`text-[10px] mt-2 text-right ${msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black border-t border-white/10 shrink-0 z-10 relative">
        <form 
          className="flex items-end gap-2"
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        >
          <button type="button" className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors flex-shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          
          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your finances..."
              className="w-full bg-transparent px-4 py-4 text-white placeholder-gray-500 focus:outline-none"
            />
            <button type="button" className="pr-4 text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
          </div>
          
          <button 
            type="submit" 
            disabled={!input.trim()}
            className={`p-4 rounded-full flex-shrink-0 transition-all ${
              input.trim() 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/30' 
                : 'bg-white/5 text-gray-500 cursor-not-allowed'
            }`}
          >
            <svg className="w-6 h-6 transform rotate-90 ml-1 pb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
