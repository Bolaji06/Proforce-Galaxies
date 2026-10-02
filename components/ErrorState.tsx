"use client";

import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export default function ErrorState({
  message = "Failed to load users from the directory. Please check your connection and try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 rounded-3xl bg-[#18181c] border border-red-500/20 text-center max-w-lg mx-auto">
      <div className="h-14 w-14 rounded-2xl bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 shadow-lg shadow-red-950/30">
        <AlertCircle className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-bold text-white">Data Fetch Error</h3>
      <p className="mt-2 text-xs sm:text-sm text-neutral-400 max-w-sm">
        {message}
      </p>
      <button
        onClick={onRetry}
        className="mt-6 flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all active:scale-95 cursor-pointer shadow-lg"
      >
        <RotateCcw className="h-4 w-4" />
        <span>Retry API Call</span>
      </button>
    </div>
  );
}
