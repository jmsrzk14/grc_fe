"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  Trash2,
  Server,
  ShieldAlert
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HeaderTitle from "@/components/layout/HeaderTitle";

export default function CreateApplicationPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full px-2 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="h-9 w-9 rounded-md border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm">
            <Link href="/applications">
              <ArrowLeft className="h-4 w-4 text-slate-500" />
            </Link>
          </Button>
          <HeaderTitle title="Registrasi Aplikasi" />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-9 px-4 bg-white border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 transition-all shadow-sm">
              <Trash2 className="h-4 w-4 mr-1.5" /> Batal
           </Button>
           <Button onClick={() => toast({ title: "Berhasil Disimpan", description: "Catatan baru telah valid terekam ke database internal GRC." })} className="h-9 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm">
              <Save className="h-4 w-4 mr-1.5" /> Simpan Aplikasi
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── Utama: Formulir ── */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Informasi Dasar Sistem</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="id" className="text-xs font-bold text-slate-500 uppercase tracking-wide">ID Sistem (Auto)</Label>
                    <Input id="id" defaultValue="APP-2026-042" className="h-10 border-slate-200 bg-slate-100 font-mono text-xs rounded-md text-slate-500" readOnly />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nama Aplikasi</Label>
                    <Input id="name" placeholder="Masukan nama sistem / platform..." className="h-10 border-slate-200 rounded-md bg-slate-50/30 focus:bg-white focus:ring-1 focus:ring-primary/20 transition-all" />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="type" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tipe Lingkungan</Label>
                    <Select>
                      <SelectTrigger className="h-10 border-slate-200 rounded-md bg-slate-50/30">
                        <SelectValue placeholder="Pilih Tipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Internal">Internal (Karyawan)</SelectItem>
                        <SelectItem value="External">External (Customer/Vendor)</SelectItem>
                        <SelectItem value="Core">Core System</SelectItem>
                        <SelectItem value="Infrastructure">Infrastruktur IT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="risk" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tingkat Risiko Bawaan</Label>
                    <Select>
                      <SelectTrigger className="h-10 border-slate-200 rounded-md bg-slate-50/30">
                        <SelectValue placeholder="Tentukan Level Risiko" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High"><span className="text-rose-600 font-bold">High Risk</span></SelectItem>
                        <SelectItem value="Medium"><span className="text-amber-600 font-bold">Medium Risk</span></SelectItem>
                        <SelectItem value="Low"><span className="text-emerald-600 font-bold">Low Risk</span></SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Kepemilikan Jaringan</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
               <div className="grid gap-2">
                 <Label htmlFor="owner" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Pemilik Sistem (Dept / Unit)</Label>
                 <Input id="owner" placeholder="Misal: Divisi SDM, Dept IT Security..." className="h-10 border-slate-200 rounded-md bg-slate-50/30 focus:bg-white transition-all text-sm" />
               </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Samping: Info ── */}
        <div className="lg:col-span-4">
           <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden sticky top-24">
             <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
                <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Verifikasi Integrasi</CardTitle>
             </CardHeader>
             <CardContent className="p-6 space-y-6">
                <div className="p-4 bg-muted/30 rounded-lg border border-border flex items-start gap-3">
                   <Server className="mt-0.5 text-blue-500 shrink-0" size={16} />
                   <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      Pendaftaran aplikasi baru akan diselaraskan dengan modul <span className="font-bold">Risk Management</span> jika level risiko diatur sebagai "High".
                   </p>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
