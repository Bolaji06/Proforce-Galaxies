"use client";

import React, { useState } from "react";
import { User } from "@/lib/types/user";
import { User as UserIcon, Mail, Phone, MapPin } from "lucide-react";

interface UserCardProps {
  user: User;
  viewMode: "grid" | "list";
  onClick: () => void;
}

export default function UserCard({ user, viewMode, onClick }: UserCardProps) {
  const [imgError, setImgError] = useState(false);

  // Derive initials for avatar fallback
  const initials = user.name
    ? user.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("")
    : "U";

  if (viewMode === "list") {
    return (
      <div
        onClick={onClick}
        className="group flex items-center justify-between p-4 rounded-2xl bg-[#18181c] border border-[#26262e] hover:border-purple-500/40 hover:bg-[#1e1e24] transition-all cursor-pointer shadow-sm hover:shadow-purple-950/20"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden bg-[#26262e] ring-2 ring-white/10 group-hover:ring-purple-500/30 transition-all flex items-center justify-center">
            {user.avatar && !imgError ? (
              <img
                src={user.avatar}
                alt={user.name || "User Avatar"}
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <span className="text-xs font-bold text-neutral-300">
                {initials}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
              {user.name || "Unnamed User"}
            </h3>
            <p className="text-xs text-neutral-400 truncate mt-0.5">
              {user.email || "No email available"}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-xs text-neutral-400">
          {user.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-neutral-500" />
              <span className="truncate max-w-[140px]">{user.location}</span>
            </div>
          )}
          {user.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-neutral-500" />
              <span className="truncate max-w-[130px]">{user.phone}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Grid View Card
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#18181c] border border-[#26262e] hover:border-purple-500/40 hover:bg-[#1e1e24] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-purple-950/20"
    >
      {/* Centered Circular Avatar */}
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden bg-[#24242c] ring-2 ring-white/10 group-hover:ring-purple-500/40 transition-all duration-300 flex items-center justify-center shadow-inner">
        {user.avatar && !imgError ? (
          <img
            src={user.avatar}
            alt={user.name || "User"}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#262630] to-[#1c1c24] text-neutral-300 font-bold text-lg sm:text-xl">
            {initials}
          </div>
        )}
      </div>

      {/* User Name */}
      <h3 className="mt-4 text-sm sm:text-base font-semibold text-white text-center truncate w-full group-hover:text-purple-300 transition-colors">
        {user.name || "Unnamed User"}
      </h3>

      {/* User Email */}
      <p className="mt-1 text-xs text-neutral-400 text-center truncate w-full">
        {user.email || "No email available"}
      </p>
    </div>
  );
}
