"use client";

import {
  LogOut,
  Settings,
  User,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserNav() {
  return (
    <div className="flex items-center gap-4">
      {/* Search Bar - Premium Style */}
      <div className="hidden md:flex items-center h-9 w-64 bg-slate-100 rounded-lg px-3 border border-transparent focus-within:border-slate-200 focus-within:bg-white transition-all group">
        <Search size={14} className="text-slate-400 group-focus-within:text-blue-500" />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent border-none focus:ring-0 text-[12px] w-full ml-2 placeholder:text-slate-400 text-slate-700"
        />
        <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-slate-400 opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      <div className="h-6 w-[1px] bg-slate-100 mx-2 hidden md:block" />

      {/* Notifications */}
      <button className="relative h-9 w-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600">
        <Bell size={18} />
        <span className="absolute top-2 right-2 h-2 w-2 bg-blue-500 rounded-full border-2 border-white" />
      </button>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 p-1 pl-1 pr-2 rounded-full hover:bg-slate-100 transition-all border border-transparent hover:border-slate-100">
            <Avatar className="h-8 w-8 border border-white shadow-sm ring-1 ring-slate-100">
              <AvatarImage src="/avatars/01.png" alt="@administrator" />
              <AvatarFallback className="bg-slate-900 text-white font-bold text-[10px]">
                AD
              </AvatarFallback>
            </Avatar>
            <ChevronDown size={14} className="text-slate-400" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64 bg-white border-slate-100 text-slate-600 shadow-2xl rounded-2xl mt-2 p-2"
          align="end"
        >
          <DropdownMenuLabel className="font-normal p-4 pb-3">
            <div className="flex flex-col space-y-1">
              <p className="text-[13px] font-bold leading-none text-slate-900 uppercase tracking-tight">
                Administrator
              </p>
              <p className="text-[11px] leading-none text-slate-400 mt-1">
                admin@cms-dots.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-50 mx-2" />
          <DropdownMenuGroup className="p-1">
            <DropdownMenuItem className="rounded-xl focus:bg-slate-50 focus:text-slate-900 cursor-pointer py-2 px-3">
              <User className="mr-3 h-4 w-4 text-slate-400" />
              <span className="text-[12px] font-medium">My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl focus:bg-slate-50 focus:text-slate-900 cursor-pointer py-2 px-3">
              <Settings className="mr-3 h-4 w-4 text-slate-400" />
              <span className="text-[12px] font-medium">Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-slate-50 mx-2" />
          <div className="p-1">
            <DropdownMenuItem className="rounded-xl focus:bg-rose-50 focus:text-rose-600 text-rose-500 cursor-pointer font-bold py-2 px-3">
              <LogOut className="mr-3 h-4 w-4" />
              <span className="text-[12px]">Sign out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
