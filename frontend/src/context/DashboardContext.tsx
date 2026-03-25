"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DashboardContextType {
  transactions: any[];
  setTransactions: (txs: any[]) => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  healthScore: number;
  setHealthScore: (val: number) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [healthScore, setHealthScore] = useState(0);

  return (
    <DashboardContext.Provider value={{ 
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
