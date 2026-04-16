"use client";

import {
  LayoutDashboard,
  ShieldCheck,
  ShieldAlert,
  Activity,
  FileText,
  BarChart3,
  RefreshCw,
  Bell,
  Globe,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

/* ───────────── menu definition ───────────── */
const coreModules = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Globe, label: "Governance", href: "/governance" },
  { icon: ShieldAlert, label: "Risk Management", href: "/risk" },
  { icon: ShieldCheck, label: "Compliance", href: "/compliance" },
];

const activityModules = [
  { icon: FileText, label: "Policy Tracking", href: "/policies", badge: 0 },
  { icon: BarChart3, label: "Audit Trail", href: "/audit", badge: 0 },
];

/* ───────────── sub-components ───────────── */
function NavItem({
  icon: Icon,
  label,
  href,
  badge = 0,
  isCollapsed,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
  isCollapsed: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={label}
        className={`
          relative h-10 rounded-none transition-all duration-150 group
          ${isCollapsed ? "justify-center px-0" : "px-4"}
          ${
            isActive
              ? "bg-[#1a3a5c] text-white border-l-[3px] border-blue-400"
              : "text-slate-400 hover:bg-[#112236] hover:text-white border-l-[3px] border-transparent"
          }
        `}
      >
        <Link
          href={href}
          className={`flex items-center w-full ${isCollapsed ? "justify-center" : "gap-3"}`}
        >
          <Icon
            className={`h-[18px] w-[18px] shrink-0 ${isActive ? "text-blue-400" : "text-slate-400 group-hover:text-slate-200"}`}
          />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-xs font-semibold tracking-tight">{label}</span>
              {badge > 0 && (
                <span className="ml-auto flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white leading-none">
                  {badge}
                </span>
              )}
            </>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function SectionLabel({ children, isCollapsed }: { children: React.ReactNode; isCollapsed: boolean }) {
  if (isCollapsed) return null;
  return (
    <SidebarGroupLabel className="px-4 pt-4 pb-1 text-[10px] font-bold tracking-[0.18em] text-slate-500 uppercase">
      {children}
    </SidebarGroupLabel>
  );
}

/* ───────────── main sidebar ───────────── */
export default function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0 flex flex-col"
      style={{ background: "#0a1929" }}
    >
      {/* ── Logo / Brand ── */}
      <SidebarHeader
        className="h-16 flex items-center shrink-0 border-b"
        style={{ background: "#0a1929", borderColor: "#122740" }}
      >
        <div className={`flex items-center gap-2 mt-2 ${isCollapsed ? "justify-center w-full" : "px-4"}`}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
            <img src="dots.png" alt="" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col animate-in fade-in duration-200">
              <span className="text-[13px] font-extrabold tracking-tight text-white leading-none">
                GRC Dots
              </span>
              <span className="text-[9px] font-semibold text-blue-400 uppercase tracking-widest mt-0.5">
                Governance Risk Compliance
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* ── Navigation ── */}
      <SidebarContent className="flex-1 overflow-y-auto mt-4" style={{ background: "#0a1929" }}>
        {/* COLLECTION */}
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {coreModules.map((item) => (
                <NavItem key={item.href} {...item} isCollapsed={isCollapsed} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* ACTIVITY */}
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {activityModules.map((item) => (
                <NavItem key={item.href} {...item} isCollapsed={isCollapsed} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
