"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface DashboardContextType {
  user: User | null;
  transactions: any[];
  setTransactions: (txs: any[]) => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  healthScore: number;
  setHealthScore: (val: number) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [healthScore, setHealthScore] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <DashboardContext.Provider value={{ 
      user,
      transactions, setTransactions, 
      isDemoMode, setIsDemoMode,
      healthScore, setHealthScore
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
