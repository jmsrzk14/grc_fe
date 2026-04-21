import React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Providers } from "@/components/Providers";
import DashboardWrapper from "@/components/layout/DashboardWrapper";

export const metadata: Metadata = {
  title: {
    template: "GRC Dots | %s",
    default: "GRC Dots",
  },
  description: "Integrated Governance, Risk and Compliance Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen antialiased bg-[#f8fafc] font-sans">
        <Providers>
          <DashboardWrapper>
            {children}
          </DashboardWrapper>
        </Providers>
      </body>
    </html>
  );
}
