"use client";

import React from "react";
import { X } from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-60 bg-[#131315] border-r border-[#1e1e22] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static shrink-0 select-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Logo: useID */}
        <div className="flex items-center justify-between pt-8 pb-10 px-7">
          <div className="flex items-center">
            <span className="text-[28px] font-black tracking-tight text-[#3b82f6]">
              use
            </span>
            <span className="text-[28px] font-black tracking-tight text-[#a855f7]">
              ID
            </span>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col space-y-0.5">
          {/* Dashboard */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onCloseMobile();
            }}
            className="group relative flex items-center gap-4 px-7 py-3.5 text-[#8e8e93] hover:text-neutral-200 hover:bg-white/[0.02] text-[15px] font-medium transition-colors"
          >
            <svg
              className="h-5 w-5 text-[#8e8e93] group-hover:text-neutral-200 transition-colors shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="7" height="7" x="3" y="3" rx="1.5" />
              <rect width="7" height="7" x="14" y="3" rx="1.5" />
              <rect width="7" height="7" x="14" y="14" rx="1.5" />
              <rect width="7" height="7" x="3" y="14" rx="1.5" />
            </svg>
            <span>Dashboard</span>
          </a>

          {/* Users (Active) */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onCloseMobile();
            }}
            className="relative flex items-center gap-4 px-7 py-3.5 bg-[#1c1c20] text-white text-[15px] font-medium transition-colors"
          >
            {/* Left Blue Accent Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#2563eb]" />

            {/* Target / Radar Reticle Icon matching Figma */}
            <svg
              className="h-5 w-5 text-white shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="6.5" />
              <line x1="12" y1="2" x2="12" y2="4.5" />
              <line x1="12" y1="19.5" x2="12" y2="22" />
              <line x1="2" y1="12" x2="4.5" y2="12" />
              <line x1="19.5" y1="12" x2="22" y2="12" />
            </svg>
            <span>Users</span>
          </a>

          {/* Vouchers */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onCloseMobile();
            }}
            className="group relative flex items-center gap-4 px-7 py-3.5 text-[#8e8e93] hover:text-neutral-200 hover:bg-white/[0.02] text-[15px] font-medium transition-colors"
          >
            <svg
              className="h-5 w-5 text-[#8e8e93] group-hover:text-neutral-200 transition-colors shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
              <circle cx="7.5" cy="7.5" r="1" fill="currentColor" />
            </svg>
            <span>Vouchers</span>
          </a>

          {/* Analytics */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onCloseMobile();
            }}
            className="group relative flex items-center gap-4 px-7 py-3.5 text-[#8e8e93] hover:text-neutral-200 hover:bg-white/[0.02] text-[15px] font-medium transition-colors"
          >
            <svg
              className="h-5 w-5 text-[#8e8e93] group-hover:text-neutral-200 transition-colors shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 20v-5" />
              <path d="M9 20v-9" />
              <path d="M14 20v-13" />
              <path d="M19 20v-7" />
            </svg>
            <span>Analytics</span>
          </a>

          {/* Spotlight */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onCloseMobile();
            }}
            className="group relative flex items-center gap-4 px-7 py-3.5 text-[#8e8e93] hover:text-neutral-200 hover:bg-white/[0.02] text-[15px] font-medium transition-colors"
          >
            <svg
              className="h-5 w-5 text-[#8e8e93] group-hover:text-neutral-200 transition-colors shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
            </svg>
            <span>Spotlight</span>
          </a>
        </nav>
      </aside>
    </>
  );
}
