"use client";

import React, { useEffect, useState } from "react";
import { User } from "@/lib/types/user";
import { useGetUserByIdQuery } from "@/lib/store/api/userApi";
import { X, Phone, MapPin, Calendar, Loader2 } from "lucide-react";

interface UserDetailsModalProps {
  user: User | null;
  onClose: () => void;
}

export default function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
  const [imgError, setImgError] = useState(false);

  // Fetch full user details by ID as specified in requirement 3
  const { data: detailedUser, isLoading } = useGetUserByIdQuery(
    user?.id || "",
    { skip: !user?.id }
  );

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!user) return null;

  const currentUser = detailedUser || user;

  const initials = currentUser.name
    ? currentUser.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("")
    : "U";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm sm:max-w-md rounded-3xl bg-[#16161a] border border-[#26262e] p-6 sm:p-8 shadow-2xl shadow-purple-950/30 transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <h2 className="text-sm font-medium text-neutral-300">User Details</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-6 flex flex-col items-center text-center">
          {/* Large Avatar */}
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden bg-[#24242c] ring-4 ring-purple-600/30 shadow-xl flex items-center justify-center">
            {currentUser.avatar && !imgError ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-neutral-300">
                {initials}
              </span>
            )}
          </div>

          {/* Name in Purple Badge (as shown in Figma) */}
          <div className="mt-4">
            <span className="inline-block px-4 py-1.5 rounded-md bg-[#6d28d9] text-white text-sm font-semibold tracking-wide shadow-md shadow-purple-900/40">
              {currentUser.name || "Unnamed User"}
            </span>
          </div>

          {/* Email */}
          <p className="mt-2 text-xs text-neutral-400">
            {currentUser.email || "No email available"}
          </p>

          {/* Details List */}
          <div className="mt-8 w-full space-y-4 text-left border-t border-white/5 pt-6">
            {/* Phone */}
            <div className="flex items-start gap-3.5">
              <div className="h-8 w-8 rounded-lg bg-purple-600/15 border border-purple-500/20 flex items-center justify-center shrink-0 text-purple-400">
                <Phone className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                  Phone
                </p>
                <p className="text-xs font-semibold text-white mt-0.5 truncate">
                  {currentUser.phone || "Not specified"}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3.5">
              <div className="h-8 w-8 rounded-lg bg-purple-600/15 border border-purple-500/20 flex items-center justify-center shrink-0 text-purple-400">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                  Location
                </p>
                <p className="text-xs font-semibold text-white mt-0.5 truncate">
                  {currentUser.location || "Not specified"}
                </p>
              </div>
            </div>

            {/* DOB */}
            <div className="flex items-start gap-3.5">
              <div className="h-8 w-8 rounded-lg bg-purple-600/15 border border-purple-500/20 flex items-center justify-center shrink-0 text-purple-400">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                  DOB
                </p>
                <p className="text-xs font-semibold text-white mt-0.5 truncate">
                  {currentUser.dob || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="mt-4 flex items-center gap-2 text-[11px] text-purple-400">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Syncing latest user profile...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
