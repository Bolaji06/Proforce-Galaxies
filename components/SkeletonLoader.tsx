"use client";

import React from "react";

interface SkeletonLoaderProps {
  viewMode: "grid" | "list";
  count?: number;
}

export default function SkeletonLoader({
  viewMode,
  count = 9,
}: SkeletonLoaderProps) {
  const items = Array.from({ length: count });

  if (viewMode === "list") {
    return (
      <div className="space-y-3">
        {items.map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-2xl bg-[#18181c] border border-[#26262e] animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[#262630]" />
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-[#262630]" />
                <div className="h-3 w-48 rounded bg-[#202028]" />
              </div>
            </div>
            <div className="hidden sm:flex gap-6">
              <div className="h-3 w-24 rounded bg-[#202028]" />
              <div className="h-3 w-20 rounded bg-[#202028]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {items.map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center p-8 rounded-2xl bg-[#18181c] border border-[#26262e] animate-pulse"
        >
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[#262630] mb-4" />
          <div className="h-4 w-32 rounded bg-[#262630] mb-2" />
          <div className="h-3 w-44 rounded bg-[#202028]" />
        </div>
      ))}
    </div>
  );
}
