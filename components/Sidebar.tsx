"use client";

import React from "react";
import {
  LayoutGrid,
  Users,
  Ticket,
  BarChart2,
  Sparkles,
  X,
} from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const navItems = [
    { name: "Dashboard", icon: LayoutGrid, active: false },
    { name: "Users", icon: Users, active: true },
    { name: "Vouchers", icon: Ticket, active: false },
    { name: "Analytics", icon: BarChart2, active: false },
    { name: "Spotlight", icon: Sparkles, active: false },
  ];

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
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#141417] border-r border-[#222228] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Logo (useID) */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold tracking-tight text-white">use</span>
            <span className="text-xl font-black tracking-tight text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded-lg border border-purple-500/20">
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

        {/* Navigation List */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (item.name !== "Users") {
                    // Stay on users for demo
                  }
                  onCloseMobile();
                }}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  item.active
                    ? "bg-[#222229] text-white shadow-sm ring-1 ring-white/10"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    item.active ? "text-purple-400" : "text-neutral-400"
                  }`}
                />
                <span>{item.name}</span>
                {item.active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-400 shadow-sm shadow-purple-400" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Bottom subtle profile/status */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/2 border border-white/5">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xs ring-1 ring-white/20">
              PG
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">Proforce Admin</p>
              <p className="text-[10px] text-neutral-400 truncate">admin@proforce.io</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
