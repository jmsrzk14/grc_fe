"use client";

import { SessionProvider } from "next-auth/react";
import { SettingsProvider } from "@/context/SettingsContext";
import { HeaderProvider } from "@/context/HeaderContext";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SettingsProvider>
        <HeaderProvider>
          {children}
          <Toaster />
        </HeaderProvider>
      </SettingsProvider>
    </SessionProvider>
  );
}
