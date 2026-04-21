"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar />
      </div>

      {/* Sidebar - Mobile Overlay */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden animate-in slide-in-from-left duration-300">
            <Sidebar />
          </div>
        </>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-5 lg:p-3 bg-muted/20">
          <div className="w-full animate-slide-up">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="px-8 py-3 bg-card border-t border-border flex justify-between items-center shrink-0">
          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} - Dimensi Kreasi Nusantara
          </p>
          <span className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-[0.2em]">Premium Enterprise Edition</span>
        </footer>
      </div>
      <Toaster />
    </div>
  );
}
