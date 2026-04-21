"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface WebSettings {
  webNama: string;
  webLogo: string | null;
  webDeskripsi: string | null;
}

interface SettingsContextType {
  settings: WebSettings | null;
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<WebSettings | null>({
    webNama: "GRC DOTS",
    webLogo: null,
    webDeskripsi: "Governance, Risk, and Compliance Management System"
  });
  const [loading, setLoading] = useState(false);

  const fetchSettings = async () => {
    // Placeholder for real API
    setLoading(false);
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
