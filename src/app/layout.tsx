import type { Metadata } from "next";
import "./globals.css";
import AppSidebar from "@/components/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/UserNav";

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
      <body className="flex min-h-screen text-slate-700 antialiased font-sans overflow-hidden" style={{ background: "#ffffff" }}>
        <SidebarProvider>
          <AppSidebar />
          
          <div className="flex flex-col flex-1 h-screen overflow-hidden">
            <header
              className="h-16 flex items-center justify-between px-6 shrink-0 z-10 sticky top-0 border-b"
              style={{ background: "#ffffff", borderColor: "#e5e9f0" }}
            >
              <div className="flex items-center gap-4">
                 <SidebarTrigger className="h-9 w-9 text-slate-400 hover:text-slate-700 transition-colors" />
              </div>
              
              <div className="flex items-center gap-4">
                 <UserNav />
              </div>
            </header>
            
            <main
              className="flex-1 overflow-y-auto p-4 md:p-8"
              style={{ background: "#ffffff" }}
            >
              <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
                {children}
              </div>

              <footer className="mt-20 pb-8 pt-8 text-center opacity-40 hover:opacity-100 transition-opacity border-t" style={{ borderColor: "#e5e9f0" }}>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  &copy; 2026 - Dimensi Kreasi Nusantara. All rights reserved.
                </p>
              </footer>
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
