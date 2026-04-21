"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Activity, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import HeaderTitle from "@/components/layout/HeaderTitle";

export default function RoleDetailPage() {
  const { toast } = useToast();
  const params = useParams();
  const id = params?.id || "Unknown ID";

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full px-2 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="h-9 w-9 rounded-md border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm">
            <Link href="/roles">
              <ArrowLeft className="h-4 w-4 text-slate-500" />
            </Link>
          </Button>
          <HeaderTitle title={`Hak Akses: ${id}`} />
        </div>
        <div className="flex items-center gap-2">
           <Button onClick={() => toast({ title: "Konfirmasi Hapus", description: "Permintaan penghapusan data telah dikirim dan diproses eksekusinya.", variant: "destructive" })} variant="outline" className="h-9 px-4 bg-white border border-rose-200 text-rose-600 rounded-md text-sm font-medium hover:bg-rose-50 transition-all shadow-sm">
              <Trash2 className="h-4 w-4 mr-1.5" /> Bekukan
           </Button>
           <Button onClick={() => toast({ title: "Sesi Modifikasi Aktif", description: "Anda sedang memasuki mode edit data secara real-time." })} className="h-9 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm">
              <Edit className="h-4 w-4 mr-1.5" /> Modifikasi Hak Akses
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6 w-full">
          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Spesifikasi Role</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
               <div className="grid grid-cols-2 gap-6">
                 <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                   <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Role Identifier</p>
                   <p className="text-sm font-mono font-bold text-slate-700">{id}</p>
                 </div>
                 <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                   <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Status Aktivasi</p>
                   <p className="text-sm font-bold text-emerald-600">Terbuka / Aktif</p>
                 </div>
                 <div className="col-span-2 bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                   <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">Penjelasan & Izin Navigasi</p>
                   <p className="text-sm text-slate-600 leading-relaxed font-medium">Halaman informasi {id}. Entitas role ini mengatur apa saja yang dapat diakses, dinavigasi, dan dimodifikasi oleh User. Setelah tabel otoritas penuh dilampirkan, User akan terasosiasi dengan *permissions* ini secara real-time.</p>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
        
        </div>
       </div>
  );
}
