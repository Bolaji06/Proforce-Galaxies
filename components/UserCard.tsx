"use client";

import React, { useState } from "react";
import { User } from "@/lib/types/user";
import { Phone, MapPin } from "lucide-react";

interface UserCardProps {
  user: User;
  viewMode: "grid" | "list";
  onClick: () => void;
}

export default function UserCard({ user, viewMode, onClick }: UserCardProps) {
  const [imgError, setImgError] = useState(false);

  const hasAvatar = Boolean(user.avatar && !imgError && user.avatar.trim() !== "");

  if (viewMode === "list") {
    return (
      <div
        onClick={onClick}
        className="group flex items-center justify-between p-4 rounded-2xl bg-[#18181c] border border-[#24242c] hover:border-purple-500/40 hover:bg-[#1e1e24] transition-all cursor-pointer shadow-sm"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative h-12 w-12 shrink-0 rounded-full overflow-hidden bg-[#1f1f26] border border-[#2e2e3a] flex items-center justify-center">
            {hasAvatar ? (
              <img
                src={user.avatar}
                alt={user.name || "User Avatar"}
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full rounded-full border border-[#343442] bg-[#1a1a24]" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
              {user.name || "Unnamed User"}
            </h3>
            <p className="text-xs text-[#8e8e93] truncate mt-0.5">
              {user.email || "No email available"}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-xs text-[#8e8e93]">
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

  // Grid View Card (Single card stack on Mobile, 3 columns on Desktop)
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center py-7 px-5 sm:py-8 sm:px-6 rounded-2xl sm:rounded-3xl bg-[#18181c] border border-[#24242c] hover:border-purple-500/40 hover:bg-[#1e1e24] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-xl hover:shadow-purple-950/20 w-full"
    >
      {/* Centered Circular Avatar matching Figma */}
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden bg-[#1f1f26] border border-[#2e2e3a] flex items-center justify-center">
        {hasAvatar ? (
          <img
            src={user.avatar}
            alt={user.name || "User"}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full rounded-full border border-[#343442] bg-[#1a1a24]" />
        )}
      </div>

      {/* User Name */}
      <h3 className="mt-4 text-[15px] sm:text-base font-bold text-white text-center truncate w-full group-hover:text-purple-300 transition-colors">
        {user.name || "Unnamed User"}
      </h3>

      {/* User Email */}
      <p className="mt-1 text-xs text-[#8e8e93] text-center truncate w-full">
        {user.email || "No email available"}
      </p>
    </div>
  );
}
