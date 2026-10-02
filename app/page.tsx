"use client";

import React, { useState, useMemo } from "react";
import StoreProvider from "@/components/StoreProvider";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import VirtualUserGrid from "@/components/VirtualUserGrid";
import SkeletonLoader from "@/components/SkeletonLoader";
import ErrorState from "@/components/ErrorState";
import UserDetailsModal from "@/components/UserDetailsModal";
import AddUserModal from "@/components/AddUserModal";
import { useGetUsersQuery } from "@/lib/store/api/userApi";
import { User } from "@/lib/types/user";
import { Search, Plus, LayoutGrid, List } from "lucide-react";

function UserDirectoryContent() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [headerSearchQuery, setHeaderSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // Redux Toolkit Query hook
  const { data: users = [], isLoading, isError, error, refetch } = useGetUsersQuery();

  // Combine directory search & header search
  const effectiveSearch = (searchQuery || headerSearchQuery).trim().toLowerCase();

  // Filter users client-side by name
  const filteredUsers = useMemo(() => {
    if (!effectiveSearch) return users;
    return users.filter((u) =>
      (u.name || "").toLowerCase().includes(effectiveSearch)
    );
  }, [users, effectiveSearch]);

  return (
    <div className="flex h-screen w-full bg-[#111114] text-neutral-100 font-sans overflow-hidden">
      {/* Left Navigation Sidebar */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <Header
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          headerSearchQuery={headerSearchQuery}
          setHeaderSearchQuery={(q) => {
            setHeaderSearchQuery(q);
            setSearchQuery(q);
          }}
        />

        {/* Directory Content Container */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 pt-2 sm:pt-6 pb-6 max-w-7xl w-full mx-auto">
          {/* Top Row: Title + Add New Button */}
          <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                User directory
              </h1>
              <p className="text-xs sm:text-sm text-[#8e8e93] mt-1">
                Find a list of users below
              </p>
            </div>

            {/* + Add new Button */}
            <button
              onClick={() => setIsAddUserOpen(true)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#1e1e24] hover:bg-[#282830] border border-[#2a2a34] text-xs font-semibold text-white transition-all active:scale-95 shadow-sm hover:border-purple-500/30 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5 text-neutral-300" />
              <span>Add new</span>
            </button>
          </div>

          {/* Search Bar & View Mode Toggle Controls */}
          <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
            {/* Search Input (Full width on Mobile matching Figma) */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#18181c] border border-[#26262e] text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Switcher: visible on tablet/desktop, hidden on mobile */}
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-[#18181c] border border-[#26262e] shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-[#282832] text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
                aria-label="Grid view"
                title="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-[#282832] text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
                aria-label="List view"
                title="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* User Results Counter */}
          {!isLoading && !isError && searchQuery && (
            <div className="mb-3 text-[11px] font-medium text-neutral-500">
              Found {filteredUsers.length} {filteredUsers.length === 1 ? "user" : "users"} matching &ldquo;{searchQuery}&rdquo;
            </div>
          )}

          {/* Content States: Loading, Error, or Virtualized Results */}
          {isLoading ? (
            <SkeletonLoader viewMode={viewMode} count={6} />
          ) : isError ? (
            <ErrorState
              message={
                error && "status" in error
                  ? `Failed to load users (Status: ${error.status}).`
                  : "An unexpected error occurred while fetching users."
              }
              onRetry={refetch}
            />
          ) : (
            <VirtualUserGrid
              users={filteredUsers}
              viewMode={viewMode}
              onSelectUser={(u) => setSelectedUser(u)}
            />
          )}
        </main>
      </div>

      {/* Pop up view: User Details Modal */}
      <UserDetailsModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />

      {/* Add details: Create User Modal */}
      <AddUserModal
        isOpen={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
      />
    </div>
  );
}

export default function Page() {
  return (
    <StoreProvider>
      <UserDirectoryContent />
    </StoreProvider>
  );
}