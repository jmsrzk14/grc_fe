import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppSidebar from "@/components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/UserNav";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
      template: "GRC Dots | %s",
      default: "GRC Dots",
    },
    icons: {
      icon: "/favicon.ico",
    },
    keywords: ["GRC", "Governance", "Risk", "Compliance", "Governance Risk Compliance", "dots", "Dimensi Kreasi Nusantara"],
  description: "Integrated Governance, Risk and Compliance Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${inter.className} flex min-h-screen text-slate-800 antialiased overflow-hidden bg-background`}>
        <SidebarProvider>
          <AppSidebar />
          
          <div className="flex flex-col flex-1 h-screen overflow-hidden">
            <header
              className="h-16 flex items-center justify-between px-6 shrink-0 z-10 sticky top-0 border-b bg-card"
            >
              <div className="flex items-center gap-4">
                 <SidebarTrigger className="h-9 w-9 text-slate-400 hover:text-slate-600 transition-colors" />
                 <h1 className="text-sm font-bold text-slate-800 tracking-tight">GRC DOTS</h1>
              </div>
              
              <div className="flex items-center gap-4">
                 <UserNav />
              </div>
            </header>
            
            <main
              className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8"
            >
              <div className="mx-auto space-y-8 animate-in fade-in duration-700">
                {children}
              </div>

              <footer className="mt-28 pb-8 pt-8 text-center border-t">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  &copy; 2026 - Dimensi Kreasi Nusantara. All rights reserved.
                </p>
              </footer>
            </main>
          </div>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
