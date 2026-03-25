"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="text-gray-400 font-medium animate-pulse">Loading Profile...</div>
      </div>
    );
  }

  const creationDate = user.metadata?.creationTime 
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) 
    : 'Unknown';

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            My Profile
          </h1>
          <p className="text-gray-400 mt-1">Manage your account settings and preferences.</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-sm font-medium text-white shadow-lg shadow-purple-500/20 hover:from-blue-500 hover:to-purple-500 transition-all">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="col-span-1 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="w-32 h-32 rounded-full border-4 border-white/10 bg-gradient-to-tr from-blue-600 to-purple-600 p-1 mb-4 relative z-10">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center overflow-hidden">
               {user.photoURL ? (
                 <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                 <span className="text-4xl text-white">{user.displayName ? user.displayName.charAt(0).toUpperCase() : '👤'}</span>
               )}
            </div>
            <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white border-2 border-black hover:bg-blue-400 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          
          <h2 className="text-xl font-bold text-white mb-1 relative z-10">{user.displayName || "Google User"}</h2>
          <p className="text-gray-400 text-sm mb-6 relative z-10">{user.email}</p>

          <div className="w-full space-y-3 relative z-10">
            <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5">
              <span className="text-sm text-gray-400">Account Tier</span>
              <span className="text-sm font-medium text-purple-400 bg-purple-500/10 px-2 py-1 rounded">Premium</span>
            </div>
            <div className="flex justify-between items-center bg-black/40 p-3 rounded-lg border border-white/5">
              <span className="text-sm text-gray-400">Member Since</span>
              <span className="text-sm font-medium text-white">{creationDate}</span>
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 ml-1">Full Name</label>
                <input type="text" defaultValue={user.displayName || ""} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 ml-1">Email Address</label>
                <input type="email" defaultValue={user.email || ""} disabled className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-gray-500 cursor-not-allowed focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 ml-1">Phone Number</label>
                <input type="tel" placeholder="Add phone number" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 ml-1">Date of Birth</label>
                <input type="date" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4">Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-black/30 rounded-xl border border-white/5">
                <div>
                  <p className="text-white font-medium text-sm">Email Notifications</p>
                  <p className="text-gray-400 text-xs">Receive weekly insights and alerts.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-black/30 rounded-xl border border-white/5">
                <div>
                  <p className="text-white font-medium text-sm">Currency Preference</p>
                  <p className="text-gray-400 text-xs">Choose your default currency.</p>
                </div>
                <select className="bg-black border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option>INR (₹)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
             <button 
               onClick={() => {
                 auth.signOut();
                 router.push("/login");
               }}
               className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors"
             >
               Sign Out Securely
             </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
