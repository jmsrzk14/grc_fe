"use client";

import { 
  LogOut, 
  Settings, 
  User,
  ShieldCheck,
  ChevronDown
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 flex items-center gap-3 px-2 rounded-full hover:bg-slate-100 group">
            <Avatar className="h-8 w-8 bg-blue-600 border border-blue-400 shadow">
              <AvatarImage src="/avatars/01.png" alt="@administrator" />
              <AvatarFallback className="bg-blue-600 text-white font-black text-xs">GRC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-xs text-left group-hover:text-slate-800 transition-colors duration-200">
               <p className="font-bold leading-none mb-0.5 text-slate-700">Admin</p>
               <p className="text-[10px] text-slate-400 font-mono">ADMINISTRATOR</p>
            </div>
            <ChevronDown size={12} className="text-slate-400 group-hover:text-slate-700" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white border-slate-200 text-slate-700 shadow-lg" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-bold leading-none text-slate-800">Admin</p>
              <p className="text-xs leading-none text-slate-400">
                admin@dkn.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-100" />
          <DropdownMenuGroup>
            <DropdownMenuItem className="focus:bg-slate-50 focus:text-slate-800 cursor-pointer group">
              <User className="mr-2 h-4 w-4 text-slate-400 group-hover:text-blue-500" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-slate-50 focus:text-slate-800 cursor-pointer group">
              <ShieldCheck className="mr-2 h-4 w-4 text-slate-400 group-hover:text-blue-500" />
              <span>Roles &amp; Permissions</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-slate-50 focus:text-slate-800 cursor-pointer group">
              <Settings className="mr-2 h-4 w-4 text-slate-400 group-hover:text-amber-500" />
              <span>System Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-slate-100" />
          <DropdownMenuItem className="focus:bg-rose-50 focus:text-rose-500 text-rose-500 cursor-pointer font-bold">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
