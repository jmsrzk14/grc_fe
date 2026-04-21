"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  Trash2,
  ShieldAlert,
  Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HeaderTitle from "@/components/layout/HeaderTitle";

export default function CreateRolePage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full px-2 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="h-9 w-9 rounded-md border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm">
            <Link href="/roles">
              <ArrowLeft className="h-4 w-4 text-slate-500" />
            </Link>
          </Button>
          <HeaderTitle title="Definisi Hak Akses" />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-9 px-4 bg-white border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 transition-all shadow-sm">
              <Trash2 className="h-4 w-4 mr-1.5" /> Batal
           </Button>
           <Button onClick={() => toast({ title: "Berhasil Disimpan", description: "Catatan baru telah valid terekam ke database internal GRC." })} className="h-9 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm">
              <Save className="h-4 w-4 mr-1.5" /> Simpan Role
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Detail Entitas Role</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="id" className="text-xs font-bold text-slate-500 uppercase tracking-wide">ID Role</Label>
                    <Input id="id" defaultValue="ROL-005" className="h-10 border-slate-200 bg-slate-100 font-mono text-xs rounded-md text-slate-500" readOnly />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nama Role Akses</Label>
                    <Input id="name" placeholder="Misal: Auditor Lead, Compliance Officer..." className="h-10 border-slate-200 rounded-md bg-slate-50/30 focus:bg-white focus:ring-1 focus:ring-primary/20 transition-all" />
                  </div>
               </div>

               <div className="grid gap-2">
                  <Label htmlFor="scopes" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Cakupan Izin Akses (Scopes)</Label>
                  <Textarea id="scopes" placeholder="Jelaskan atau daftar area modul yang bisa diakses..." className="min-h-[100px] border-slate-200 rounded-md bg-slate-50/30 focus:bg-white transition-all text-sm" />
               </div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Karakteristik Akun</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
               <div className="grid gap-2">
                 <Label htmlFor="status" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Status Ketersediaan</Label>
                 <Select defaultValue="Active">
                    <SelectTrigger className="h-10 border-slate-200 rounded-md bg-slate-50/30">
                       <SelectValue placeholder="Tentukan Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active"><span className="text-emerald-600 font-bold">Aktif & Berlaku</span></SelectItem>
                      <SelectItem value="Disabled"><span className="text-rose-600 font-bold">Dibekukan Sementara</span></SelectItem>
                    </SelectContent>
                 </Select>
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
           <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden sticky top-24">
             <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
                <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Ketentuan Proteksi</CardTitle>
             </CardHeader>
             <CardContent className="p-6 space-y-6">
                <div className="p-4 bg-rose-50 rounded-lg border border-rose-100 flex items-start gap-3">
                   <ShieldAlert className="mt-0.5 text-rose-500 shrink-0" size={16} />
                   <p className="text-[11px] text-rose-700 leading-relaxed font-semibold">
                      Harap berhati-hati saat memberikan izin mencakup <span className="underline">Write/Delete</span> karena akan berlaku silang pada semua modul terdaftar!
                   </p>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
