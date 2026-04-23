"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Warehouse,
  ArrowLeftRight,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useSettings } from "@/context/SettingsContext";

const menuItems = [
  {
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard, permission: "dashboard.view" },
      { name: "Tata Kelola", href: "/governance", icon: Warehouse, permission: "governance.view" },
      { name: "Manajemen Risiko", href: "/risk", icon: BarChart3, permission: "risk.view" },
      { name: "Kepatuhan", href: "/compliance", icon: ShieldCheck, permission: "compliance.view" },
      { name: "Manajemen Kebijakan", href: "/policies", icon: History, permission: "policy.view" },
      { name: "Jejak Audit", href: "/audit", icon: History, permission: "audit.view" },
      { name: "Pengaturan Sistem", href: "/settings", icon: Settings, permission: "settings.view" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { settings } = useSettings();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const userRole = (session?.user as any)?.role || "";
  const userRoleName = (session?.user as any)?.roleName || "";
  const isSuperadmin = userRole === "superadmin";

  // Hardcode true for development based on previous requests
  const hasPermission = (permission?: string) => true;

  const filteredMenuItems = menuItems.map(group => ({
    ...group,
    items: group.items.filter(item => hasPermission(item.permission))
  })).filter(group => group.items.length > 0);

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) =>
      prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]
    );
  };

  return (
    <aside className="w-60 flex flex-col shrink-0 h-screen sticky top-0 bg-sidebar border-r border-sidebar-border overflow-hidden">
      {/* Brand Header */}
      <div className="h-14 flex items-center gap-3 px-5 border-b border-sidebar-border shrink-0">
        <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0 overflow-hidden">
          {settings?.webLogo ? (
            <img src={settings.webLogo} alt={settings.webNama} className="w-full h-full object-cover" />
          ) : (
            <span className="text-white text-[10px] font-bold tracking-tight">
              {settings?.webNama?.substring(0, 3).toUpperCase() || "GRC"}
            </span>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-white text-base font-bold leading-none truncate tracking-tight uppercase">
            {settings?.webNama || "GRC SYSTEM"}
          </p>
          <p className="text-white/40 text-[10px] leading-tight mt-1 truncate uppercase tracking-widest font-medium">
            Risk & Compliance
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 custom-scrollbar">
        {filteredMenuItems.map((group) => (
          <div className="mb-6">
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const hasSubItems = !!(item as any).subItems;
                const isOpen = openMenus.includes(item.name);
                const isActive =
                  pathname === item.href ||
                  (hasSubItems && (item as any).subItems?.some((s: any) => pathname.startsWith(s.href))) ||
                  (!hasSubItems && item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <li key={item.name} className="space-y-0.5">
                    {hasSubItems ? (
                      <button
                        onClick={() => toggleMenu(item.name)}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] transition-colors w-full",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "w-4 h-4 shrink-0",
                            isActive ? "text-primary" : "text-sidebar-foreground/40"
                          )}
                        />
                        <span className="flex-1 text-left">{item.name}</span>
                        <ChevronDown
                          className={cn(
                            "w-3 h-3 text-sidebar-foreground/20 transition-transform",
                            isOpen && "rotate-180"
                          )}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] transition-colors",
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "w-4 h-4 shrink-0",
                            isActive ? "text-primary" : "text-sidebar-foreground/40"
                          )}
                        />
                        <span className="flex-1">{item.name}</span>
                        {isActive && <ChevronRight className="w-3 h-3 text-sidebar-foreground/20" />}
                      </Link>
                    )}

                    {/* Sub Items (Logika Tetap Ada jika nanti dibutuhkan) */}
                    {hasSubItems && isOpen && (
                      <ul className="mt-1 ml-5 pl-3 border-l border-sidebar-border space-y-0.5">
                        {(item as any).subItems?.map((sub: any) => {
                          const subActive = pathname === sub.href;
                          return (
                             <li key={sub.name}>
                              <Link
                                href={sub.href}
                                className={cn(
                                   "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors",
                                   subActive
                                     ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                                     : "text-sidebar-foreground/60 hover:text-white hover:bg-sidebar-accent/50"
                                )}
                              >
                                {sub.icon && <sub.icon className="w-4 h-4" />}
                                {sub.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-sidebar-border p-3 space-y-1 shrink-0 bg-black/10">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-md">
          <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-bold text-white">
              {session?.user?.name?.charAt(0)?.toUpperCase() ?? "A"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-white truncate leading-none">
              {session?.user?.name ?? "Super Admin"}
            </p>
            <p className="text-[10px] text-white/30 truncate mt-1 uppercase tracking-widest leading-none font-medium">
              {userRoleName || userRole || "Administrator"}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 w-full px-2 py-1.5 border-t border-white/5 mt-1 rounded-md text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-rose-400 hover:bg-white/5 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          Keluar Sistem
        </button>
      </div>
    </aside>
  );
}
