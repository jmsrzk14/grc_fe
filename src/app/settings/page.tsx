"use client";

import React from "react";
import Link from "next/link";
import HeaderTitle from "@/components/layout/HeaderTitle";
import { Settings, Shield, User, Bell, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full px-2 pb-10">
      <HeaderTitle title="Sistem Settings" />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/settings/profile" className="block focus:outline-none">
          <Card className="h-full border border-border shadow-sm bg-card rounded-xl overflow-hidden hover:border-primary/20 hover:shadow-md transition-all cursor-pointer group">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4 flex flex-row items-center justify-between">
               <div className="flex items-center gap-3">
                 <Settings className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                 <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Profil Aplikasi</CardTitle>
               </div>
               <ChevronRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-primary transition-colors" />
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-xs text-muted-foreground font-medium italic leading-relaxed">Pengaturan nama organisasi, logo perusahaan, dan deskripsi sistem GRC terpadu.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/roles" className="block focus:outline-none">
          <Card className="h-full border border-border shadow-sm bg-card rounded-xl overflow-hidden hover:border-primary/20 hover:shadow-md transition-all cursor-pointer group">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4 flex flex-row items-center justify-between">
               <div className="flex items-center gap-3">
                 <Shield className="w-4 h-4 text-muted-foreground/50 group-hover:text-emerald-500 transition-colors" />
                 <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Hak Akses & Role</CardTitle>
               </div>
               <ChevronRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-emerald-500 transition-colors" />
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-xs text-muted-foreground font-medium italic leading-relaxed">Kelola otorisasi pengguna, pemetaan RACI, dan kebijakan keamanan akses data.</p>
            </CardContent>
          </Card>
        </Link>

        <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden hover:border-primary/20 transition-all cursor-pointer group">
          <CardHeader className="bg-muted/20 border-b border-border px-6 py-4 flex flex-row items-center justify-between">
             <div className="flex items-center gap-3">
               <Bell className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
               <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Notifikasi Sistem</CardTitle>
             </div>
             <ChevronRight className="w-4 h-4 text-muted-foreground/20" />
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-xs text-muted-foreground font-medium italic leading-relaxed">Atur kanal pengingat (alert) untuk SLA perbaikan risiko dan deadline audit.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
