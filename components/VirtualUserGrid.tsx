"use client";

import React, { useRef, useState, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { User } from "@/lib/types/user";
import UserCard from "./UserCard";
import { Users as UsersIcon } from "lucide-react";

interface VirtualUserGridProps {
  users: User[];
  viewMode: "grid" | "list";
  onSelectUser: (user: User) => void;
}

export default function VirtualUserGrid({
  users,
  viewMode,
  onSelectUser,
}: VirtualUserGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(3);

  // Dynamically calculate column count (1 on mobile, 2 on tablet, 3 on desktop)
  useEffect(() => {
    const updateColumns = () => {
      if (!parentRef.current) return;
      const width = parentRef.current.offsetWidth;
      if (viewMode === "list") {
        setColumns(1);
      } else {
        if (width < 640) setColumns(1); // Mobile: single card stack
        else if (width < 1024) setColumns(2); // Tablet: 2 columns
        else setColumns(3); // Desktop: 3 columns (MacBook Air 1 in Figma)
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [viewMode]);

  // Group users into rows according to column count
  const rows = React.useMemo(() => {
    const result: User[][] = [];
    for (let i = 0; i < users.length; i += columns) {
      result.push(users.slice(i, i + columns));
    }
    return result;
  }, [users, columns]);

  // Virtualizer for smooth 60fps scrolling
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (viewMode === "grid" ? (columns === 1 ? 215 : 235) : 80),
    overscan: 3,
  });

  if (users.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center p-6 rounded-3xl bg-[#18181c]/50 border border-white/5">
        <div className="h-12 w-12 rounded-2xl bg-[#22222a] flex items-center justify-center text-neutral-400 mb-3">
          <UsersIcon className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-semibold text-white">No Users Found</h3>
        <p className="mt-1 text-xs text-neutral-400 max-w-xs">
          No directory entries match your current search criteria.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-210px)] sm:h-[calc(100vh-270px)] min-h-[460px] overflow-y-auto overflow-x-hidden w-full"
      style={{
        contain: "strict",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const rowUsers = rows[virtualRow.index];
          if (!rowUsers) return null;

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className="pb-3.5 sm:pb-5"
            >
              {viewMode === "list" ? (
                <div className="w-full">
                  <UserCard
                    user={rowUsers[0]}
                    viewMode="list"
                    onClick={() => onSelectUser(rowUsers[0])}
                  />
                </div>
              ) : (
                <div
                  className="grid gap-3.5 sm:gap-6 w-full"
                  style={{
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                  }}
                >
                  {rowUsers.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      viewMode="grid"
                      onClick={() => onSelectUser(user)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
