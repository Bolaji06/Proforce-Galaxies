"use client";

import React, { useState, useEffect } from "react";
import { useCreateUserMutation } from "@/lib/store/api/userApi";
import { X, Loader2, CheckCircle2 } from "lucide-react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddUserModal({ isOpen, onClose }: AddUserModalProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [dob, setDob] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [createUser, { isLoading }] = useCreateUserMutation();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("");
      setLocation("");
      setDob("");
      setErrorMessage(null);
      setSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please enter a user name.");
      return;
    }
    if (!location.trim()) {
      setErrorMessage("Please enter a location.");
      return;
    }
    if (!dob.trim()) {
      setErrorMessage("Please enter date of birth.");
      return;
    }

    try {
      // Generate email and avatar if not provided by user
      const slug = name.toLowerCase().replace(/[^a-z0-9]/g, ".");
      const email = `${slug}@example.com`;
      const avatar = `https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/${Math.floor(
        Math.random() * 90 + 10
      )}.jpg`;

      await createUser({
        name: name.trim(),
        location: location.trim(),
        dob: dob.trim(),
        email,
        avatar,
      }).unwrap();

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 900);
    } catch (err: unknown) {
      setErrorMessage(
        "Failed to save user. Please check your network and try again."
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm sm:max-w-md rounded-3xl bg-[#16161a] border border-[#26262e] p-6 sm:p-8 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <h2 className="text-sm font-medium text-neutral-300">
            Enter User Details
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {success ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="h-12 w-12 text-emerald-400 animate-bounce mb-3" />
            <h3 className="text-base font-semibold text-white">User Created!</h3>
            <p className="text-xs text-neutral-400 mt-1">
              {name} has been added to the directory.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300">
                {errorMessage}
              </div>
            )}

            {/* Name Field */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="James Wilson"
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-xl bg-[#202026] border border-[#2e2e38] text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              />
            </div>

            {/* Location Field */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Boston, USA"
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-xl bg-[#202026] border border-[#2e2e38] text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              />
            </div>

            {/* Date of Birth Field */}
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-2">
                Date of Birth
              </label>
              <input
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="09/04/1993"
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-xl bg-[#202026] border border-[#2e2e38] text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
              />
            </div>

            {/* Save Button (as styled in Figma) */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
