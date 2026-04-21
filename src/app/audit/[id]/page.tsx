"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Trash2, ShieldCheck, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import HeaderTitle from "@/components/layout/HeaderTitle";

export default function AuditDetailPage() {
  const { toast } = useToast();
  const params = useParams();
  const id = params?.id || "Unknown ID";

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full px-2 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="h-9 w-9 rounded-md border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm">
            <Link href="/audit">
              <ArrowLeft className="h-4 w-4 text-slate-500" />
            </Link>
          </Button>
          <HeaderTitle title={`Inspeksi Trail: ${id}`} />
        </div>
        <div className="flex items-center gap-2">
           <Button onClick={() => toast({ title: "Konfirmasi Hapus", description: "Permintaan penghapusan data telah dikirim dan diproses eksekusinya.", variant: "destructive" })} variant="outline" className="h-9 px-4 bg-white border border-rose-200 text-rose-600 rounded-md text-sm font-medium hover:bg-rose-50 transition-all shadow-sm">
              <Trash2 className="h-4 w-4 mr-1.5" /> Ajukan Anomali
           </Button>
           <Button onClick={() => toast({ title: "Sesi Modifikasi Aktif", description: "Anda sedang memasuki mode edit data secara real-time." })} className="h-9 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm">
              <ShieldCheck className="h-4 w-4 mr-1.5" /> Validasi Eksekusi
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6 w-full">
          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Snapshot Reaksi Sistem</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
               <div className="grid grid-cols-2 gap-6">
                 <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                   <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">ID Kredensial Log</p>
                   <p className="text-sm font-mono font-bold text-slate-700">{id}</p>
                 </div>
                 <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                   <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Status Eksekusi</p>
                   <p className="text-sm font-bold text-emerald-600">Berhasil (200 OK)</p>
                 </div>
                 <div className="col-span-2 bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                   <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5">JSON Payload Raw</p>
                   <div className="text-[11px] font-mono text-slate-600 leading-relaxed bg-white border border-slate-200 rounded p-4 h-32 overflow-y-auto">
                     {`{
  "trace_id": "`}{id}{`",
  "method": "UPDATE",
  "resource": "Policy Table",
  "actor": "Super Admin",
  "old_value": "draft",
  "new_value": "published",
  "timestamp": "2026-04-20T10:45:01Z"
}`}
                   </div>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
        
        </div>
       </div>
  );
}
