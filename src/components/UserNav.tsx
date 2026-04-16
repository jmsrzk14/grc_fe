"use client";

import { 
  LogOut, 
  Settings, 
  User,
  Bell,
  Search
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
    <div className="flex items-center gap-6">    
      {/* Search Icon */}
      <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-slate-600 rounded-full">
        <Search size={20} />
      </Button>

      {/* Notification Bell */}
      <div className="relative cursor-pointer group">
        <div className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
          <Bell size={20} className="text-slate-400 group-hover:text-slate-600" />
        </div>
        <div className="absolute top-2 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-white shadow-sm" />
      </div>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 p-0 rounded-full hover:bg-slate-100 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
              <AvatarImage src="/avatars/01.png" alt="@administrator" />
              <AvatarFallback className="bg-blue-600 text-white font-bold text-xs uppercase">AD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white border-slate-100 text-slate-700 shadow-xl rounded-xl mt-2" align="end">
          <DropdownMenuLabel className="font-normal p-4">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-bold leading-none text-slate-900">Administrator</p>
              <p className="text-[11px] leading-none text-slate-400 mt-1">
                admin@cms-dots.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-50" />
          <DropdownMenuGroup className="p-2">
            <DropdownMenuItem className="rounded-lg focus:bg-slate-50 focus:text-slate-900 cursor-pointer py-2">
              <User className="mr-3 h-4 w-4 text-slate-400" />
              <span className="text-[13px] font-medium">My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg focus:bg-slate-50 focus:text-slate-900 cursor-pointer py-2">
              <Settings className="mr-3 h-4 w-4 text-slate-400" />
              <span className="text-[13px] font-medium">Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-slate-50" />
          <div className="p-2">
            <DropdownMenuItem className="rounded-lg focus:bg-rose-50 focus:text-rose-600 text-rose-500 cursor-pointer font-bold py-2">
              <LogOut className="mr-3 h-4 w-4" />
              <span className="text-[13px]">Log out</span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
