"use client";

import React from "react";
import { Search, Bell, Menu } from "lucide-react";

interface HeaderProps {
  onOpenMobileSidebar: () => void;
  headerSearchQuery: string;
  setHeaderSearchQuery: (q: string) => void;
}

export default function Header({
  onOpenMobileSidebar,
  headerSearchQuery,
  setHeaderSearchQuery,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#111114]/90 border-b border-[#222228] backdrop-blur-md px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Header Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Header Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 pointer-events-none" />
          <input
            type="text"
            value={headerSearchQuery}
            onChange={(e) => setHeaderSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#1b1b20] border border-[#26262e] text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-purple-500 ring-2 ring-[#111114]" />
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-3 pl-2 border-l border-white/5">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 p-[1.5px] cursor-pointer">
            <div className="h-full w-full rounded-full bg-[#1b1b20] flex items-center justify-center text-xs font-bold text-white overflow-hidden">
              <img
                src="https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/32.jpg"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
