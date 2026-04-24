"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, Settings, User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useHeader } from "@/context/HeaderContext";
import { useSettings } from "@/context/SettingsContext";

export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { data: session } = useSession();
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const { title } = useHeader();
  const { settings } = useSettings();

  const fetchUnread = async () => {
    // Mock notifications for now
    setNotifications([]);
  };

  const markAsRead = async (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    fetchUnread();
  }, []);

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
      {/* Left */}
      {/* <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-accent rounded-md transition-colors"
        >
          <Menu className="w-4 h-4 text-muted-foreground" />
        </button>
        <h1 className="text-sm font-bold text-foreground tracking-tight ">
          {title === "Dashboard" ? (settings?.webNama || "Dashboard") : title}
        </h1>
      </div> */}

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* User */}
        {/* <div className="relative">
           <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-accent transition-colors cursor-pointer border border-transparent hover:border-border"
          >
            <span className="text-sm font-medium text-muted-foreground">
              {session?.user?.name ?? "—"}
            </span>
            <div className="h-7 w-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="text-[11px] font-bold text-primary">
                {session?.user?.name?.charAt(0)?.toUpperCase() ?? "?"}
              </span>
            </div>
          </button>

          {showProfile && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-card rounded-xl shadow-lg border border-border overflow-hidden z-50 animate-in fade-in duration-150">
                 <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm text-muted-foreground font-medium">User Aktif</p>
                  <p className="text-base font-bold text-foreground truncate mt-0.5">{session?.user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{session?.user?.email}</p>
                </div>
                <div className="p-1.5">
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors text-left">
                    <User className="w-3.5 h-3.5 text-muted-foreground" /> Profil
                  </button>
                  <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-accent rounded-md transition-colors text-left">
                    <Settings className="w-3.5 h-3.5 text-muted-foreground" /> Pengaturan
                  </button>
                </div>
                <div className="p-1.5 border-t border-border">
                  <button
                    onClick={() => signOut({ callbackUrl: "/auth/login" })}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Log Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div> */}
      </div>
    </header>
  );
}
