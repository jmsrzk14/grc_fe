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
  ChevronRight,
  Search,
  AppWindow,
  Shield,
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

const menus = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Activity, label: "Audit Trails", href: "/audit" },
  { icon: Building, label: "Governance", href: "/governance" },
  { icon: CreditCard, label: "Risk Management", href: "/risk" },
  { icon: User, label: "Compliance", href: "/compliance" },
  { icon: Settings, label: "Policy Tracking", href: "/policies" },
  { icon: Upload, label: "Upload Snapshot", href: "/upload" },
  { icon: AppWindow, label: "Aplikasi", href: "/applications" },
  { icon: Shield, label: "Hak Akses Role", href: "/roles" },
];

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
          h-10 rounded-lg transition-all duration-200 mb-1
          ${isCollapsed ? "justify-center px-0 mx-0" : "px-3 mx-2"}
          ${
            isActive
              ? "bg-white/10 text-white font-semibold ring-1 ring-white/20"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
          }
        `}
      >
        <Link
          href={href}
          className={`flex items-center w-full ${isCollapsed ? "justify-center" : "gap-3"}`}
        >
          <Icon
            className={`h-[18px] w-[18px] shrink-0 ${isActive ? "text-blue-400" : "text-slate-500"}`}
          />
          {!isCollapsed && (
            <span className="text-[13.5px] tracking-tight">{label}</span>
          )}
          {isActive && !isCollapsed && (
             <div className="ml-auto w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="border-none bg-[#0a0c10] text-slate-300"
    >
      <SidebarHeader className="h-20 flex items-center shrink-0 px-6 overflow-hidden">
        <div className={`flex items-center gap-3 w-full ${isCollapsed ? "justify-center" : ""}`}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-900/20 text-white font-black text-[12px]">
            GRC
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
               <div className="flex items-center gap-2">
                  <span className="text-[15.5px] font-bold tracking-tight text-white leading-none">
                    DOTS
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-black bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20 uppercase tracking-widest">PRO</span>
               </div>
               <span className="text-[10px] font-medium text-slate-500 leading-tight truncate mt-0.5 uppercase tracking-wide">
                 GRC Management System
               </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 mt-4 px-1">
        {!isCollapsed && (
          <div className="px-4 mb-8">
             <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Quick search..." 
                  className="w-full h-9 bg-white/5 border border-white/5 rounded-lg pl-9 pr-4 text-[12px] text-slate-300 focus:outline-none focus:ring-1 focus:ring-white/10 placeholder:text-slate-600 transition-all"
                />
             </div>
          </div>
        )}

        <SidebarGroup className="p-0">
          {!isCollapsed && (
            <p className="px-5 mb-2 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Menu Utama</p>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map((item) => (
                <NavItem key={item.href} {...item} isCollapsed={isCollapsed} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && (
          <div className="mt-10 px-4">
             <div className="p-4 rounded-xl bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-600/10 relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 h-20 w-20 bg-blue-600/5 rounded-full blur-2xl group-hover:bg-blue-600/10 transition-colors" />
                <h4 className="text-[13px] font-bold text-white mb-1">Upgrade Snapshot</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">Dapatkan data analitik yang lebih akurat dan mendalam.</p>
                <button className="mt-4 w-full h-8 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                  Learn More <ChevronRight size={12} />
                </button>
             </div>
          </div>
        )}
      </SidebarContent>

      <div className={`p-4 mt-auto border-t border-white/5 ${isCollapsed ? "flex justify-center" : ""}`}>
         <DropdownMenu>
           <DropdownMenuTrigger asChild>
              <button className={`flex items-center gap-3 w-full p-2 rounded-xl hover:bg-white/5 transition-all text-left overflow-hidden ${isCollapsed ? "justify-center" : ""}`}>
                 <div className="h-9 w-9 shrink-0 rounded-lg bg-slate-800 flex items-center justify-center font-black text-[11px] text-blue-400 border border-white/5 shadow-inner">
                   JD
                 </div>
                 {!isCollapsed && (
                    <>
                      <div className="flex-1 min-w-0">
                         <p className="text-[13px] font-bold text-white truncate">John Doe</p>
                         <p className="text-[10px] text-slate-500 truncate font-semibold uppercase tracking-wider">Super Admin</p>
                      </div>
                      <ChevronDown className="h-4 w-4 text-slate-600 shrink-0" />
                    </>
                 )}
              </button>
           </DropdownMenuTrigger>
           <DropdownMenuContent className="w-56 mb-2 bg-[#0a0c10] border-white/10 text-slate-300 shadow-2xl">
              <DropdownMenuLabel className="text-xs font-bold text-slate-500 uppercase tracking-widest px-4 py-2">Akun Saya</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/5" />
              <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer px-4 py-2 text-[13px]">Pengaturan Profil</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-rose-500/10 focus:text-rose-400 text-rose-500 cursor-pointer px-4 py-2 text-[13px] font-bold">Keluar</DropdownMenuItem>
           </DropdownMenuContent>
         </DropdownMenu>
      </div>
    </Sidebar>
  );
}

