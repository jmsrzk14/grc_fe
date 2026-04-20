"use client";

import React from "react";

import {
  LayoutDashboard,
  Activity,
  User,
  Building,
  CreditCard,
  Settings,
  Upload,
  ChevronDown,
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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* ───────────── menu definition ───────────── */
const menus = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Activity, label: "Audit Trail", href: "/audit" },
  { icon: Building, label: "Governance", href: "/governance" },
  { icon: CreditCard, label: "Risk Management", href: "/risk" },
  { icon: User, label: "Compliance", href: "/compliance" },
  { icon: Settings, label: "Policy Tracking", href: "/policies" },
  { icon: Upload, label: "Upload Snapshot", href: "/upload" },
];

/* ───────────── sub-components ───────────── */
function NavItem({
  icon: Icon,
  label,
  href,
  isCollapsed,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
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
          h-12 rounded-lg transition-all duration-200 group relative
          ${isCollapsed ? "justify-center px-0 ml-0 mr-0" : "px-4 mx-2 w-[calc(100%-16px)]"}
          ${
            isActive
              ? "bg-[#28324a] text-white font-bold shadow-sm"
              : "text-slate-300 hover:bg-[#28324a]/40 hover:text-white"
          }
        `}
      >
        <Link
          href={href}
          className={`flex items-center w-full ${isCollapsed ? "justify-center" : "gap-4"}`}
        >
          <Icon
            className={`h-5 w-5 shrink-0 ${isActive ? "text-blue-500" : "text-slate-400 group-hover:text-slate-200"}`}
          />
          {!isCollapsed && (
            <span className="flex-1 text-[15px] font-medium tracking-tight whitespace-nowrap">{label}</span>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

/* ───────────── main sidebar ───────────── */
export default function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0 bg-[#1c2437] text-white overflow-x-hidden"
    >
      <SidebarHeader className="h-16 flex items-center shrink-0 px-6 mt-1 overflow-x-hidden">
        <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-600 font-extrabold text-[12px]">
            GRC
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-[14px] font-bold tracking-tight text-white leading-tight">
                DOTS
              </span>
              <span className="text-[9px] font-medium text-slate-500 leading-tight truncate">
                Governance, Risk, and Compliance
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 mt-4 overflow-x-hidden">
        {!isCollapsed && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="mx-4 mb-6 p-3 rounded-lg bg-[#28324a]/40 border border-[#28324a] group cursor-pointer hover:bg-[#28324a]/60 transition-colors">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">KANTOR PUSAT</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Semua cabang</span>
                  <ChevronDown className="h-3 w-3 text-slate-500" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#28324a] border-[#38425a] text-slate-200">
              <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">Pilih Cabang</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#38425a]" />
              <DropdownMenuItem className="focus:bg-[#1c2437] focus:text-white cursor-pointer">Semua cabang</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-[#1c2437] focus:text-white cursor-pointer">KC Jakarta Pusat</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-[#1c2437] focus:text-white cursor-pointer">KC Bandung</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-[#1c2437] focus:text-white cursor-pointer">KC Surabaya</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-[#1c2437] focus:text-white cursor-pointer">KC Medan</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map((item) => (
                <NavItem key={item.href} {...item} isCollapsed={isCollapsed} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!isCollapsed && (
        <div className="p-4 mt-auto border-t border-[#28324a] overflow-hidden">
           <DropdownMenu>
             <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-[#28324a]/40 transition-all text-left overflow-hidden">
                   <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center font-black text-xs">JD</div>
                   <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">John Doe</p>
                      <p className="text-[10px] text-slate-500 truncate font-semibold uppercase tracking-wider">Super Admin</p>
                   </div>
                   <ChevronDown className="h-4 w-4 text-slate-600" />
                </button>
             </DropdownMenuTrigger>
             <DropdownMenuContent className="w-56 mb-2 bg-[#1c2437] border-[#38425a] text-slate-200">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#38425a]" />
                <DropdownMenuItem className="focus:bg-[#28324a] focus:text-white cursor-pointer">Profile Settings</DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-[#28324a] focus:text-white cursor-pointer text-rose-400">Logout</DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
        </div>
      )}
    </Sidebar>
  );
}
