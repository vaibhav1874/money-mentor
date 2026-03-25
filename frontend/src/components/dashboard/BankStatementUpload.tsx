"use client";

import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "Income" | "Expense";
  category: string;
}

interface BankStatementUploadProps {
  onDataImported: (transactions: Transaction[]) => void;
}

export default function BankStatementUpload({ onDataImported }: BankStatementUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categorizeTransaction = (description: string): string => {
    const desc = description.toLowerCase();
    if (desc.includes("swiggy") || desc.includes("zomato") || desc.includes("restaurant") || desc.includes("food")) return "Food 🍔";
    if (desc.includes("uber") || desc.includes("ola") || desc.includes("petrol") || desc.includes("fuel") || desc.includes("metro")) return "Travel 🚗";
    if (desc.includes("amazon") || desc.includes("flipkart") || desc.includes("myntra") || desc.includes("shopping")) return "Shopping 🛒";
    if (desc.includes("electri") || desc.includes("recharge") || desc.includes("jio") || desc.includes("airtel") || desc.includes("bill")) return "Bills 💡";
    if (desc.includes("salary") || desc.includes("hike") || desc.includes("bonus")) return "Salary 💰";
    return "Others 📦";
  };

  const processFile = async (file: File) => {
    setIsUploading(true);
    setUploadStatus("idle");
    setFileName(file.name);

    // Simulate AI parsing delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    try {
      let mockTransactions: Transaction[] = [];

      if (file.name.endsWith(".csv") || file.name.endsWith(".pdf")) {
        // Mock data extraction logic
        mockTransactions = [
          {
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString().split('T')[0],
            description: "Swiggy Order #4521",
            amount: 450,
            type: "Expense",
            category: "Food 🍔"
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString().split('T')[0],
            description: "Uber Trip to Office",
            amount: 220,
            type: "Expense",
            category: "Travel 🚗"
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString().split('T')[0],
            description: "Salary Credit - Mar 2026",
            amount: 85000,
            type: "Income",
            category: "Salary 💰"
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString().split('T')[0],
            description: "Amazon.in Purchase",
            amount: 1200,
            type: "Expense",
            category: "Shopping 🛒"
          },
          {
            id: Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString().split('T')[0],
            description: "Electricity Bill Payment",
            amount: 3400,
            type: "Expense",
            category: "Bills 💡"
          }
        ];

        onDataImported(mockTransactions);
        setUploadStatus("success");
      } else {
        throw new Error("Unsupported file format");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-400" />
          Import Bank Statement
        </h3>
        {uploadStatus === "success" && (
          <span className="flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Data Imported Successfully
          </span>
        )}
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          isDragging 
            ? "border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]" 
            : "border-white/10 hover:border-white/20 hover:bg-white/5"
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".csv,.pdf"
          className="hidden"
        />

        {isUploading ? (
          <div className="space-y-4 py-4">
            <div className="relative w-16 h-16 mx-auto">
              <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full blur-md"></div>
              </div>
            </div>
            <div>
              <p className="text-white font-bold animate-pulse">Analyzing your statement...</p>
              <p className="text-gray-400 text-xs mt-1">AI core is extracting transaction patterns</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transition-transform duration-300 ${isDragging ? 'scale-110 bg-blue-500/20' : 'bg-white/5 group-hover:scale-110 group-hover:bg-white/10'}`}>
              <Upload className={`w-8 h-8 ${isDragging ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'}`} />
            </div>
            <div>
              <p className="text-white font-medium">
                {fileName ? <span className="text-blue-400">{fileName}</span> : "Drop your statement here or click to browse"}
              </p>
              <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-bold">Supports .CSV, .PDF</p>
            </div>
          </div>
        )}

        {/* Decorative corner accents */}
        <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-transparent group-hover:border-blue-500/50 transition-colors"></div>
        <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-transparent group-hover:border-blue-500/50 transition-colors"></div>
      </div>

      {uploadStatus === "error" && (
        <div className="mt-4 flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-xl border border-red-400/20">
          <AlertCircle className="w-4 h-4" />
          Failed to parse file. Please ensure it's a valid bank statement.
        </div>
      )}
    </div>
  );
}
