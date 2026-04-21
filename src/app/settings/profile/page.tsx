"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  Trash2,
  Building2,
  Image as ImageIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import HeaderTitle from "@/components/layout/HeaderTitle";

export default function ProfileSettingsPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full px-2 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="h-9 w-9 rounded-md border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm">
            <Link href="/settings">
              <ArrowLeft className="h-4 w-4 text-slate-500" />
            </Link>
          </Button>
          <HeaderTitle title="Profil Aplikasi" />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-9 px-4 bg-white border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 transition-all shadow-sm">
              <Trash2 className="h-4 w-4 mr-1.5" /> Reset
           </Button>
           <Button onClick={() => toast({ title: "Berhasil Disimpan", description: "Catatan baru telah valid terekam ke database internal GRC." })} className="h-9 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm">
              <Save className="h-4 w-4 mr-1.5" /> Simpan Profil
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Informasi Organisasi</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="systemName" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nama Sistem</Label>
                    <Input id="systemName" defaultValue="GRC SYSTEM" className="h-10 border-slate-200 rounded-md bg-slate-50/30 focus:bg-white focus:ring-1 focus:ring-primary/20 transition-all" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="company" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nama Organisasi</Label>
                    <Input id="company" defaultValue="PT. DOTS Teknologi" className="h-10 border-slate-200 rounded-md bg-slate-50/30 focus:bg-white focus:ring-1 focus:ring-primary/20 transition-all" />
                  </div>
               </div>

               <div className="grid gap-2">
                  <Label htmlFor="desc" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Deskripsi Sistem Terpadu</Label>
                  <Textarea id="desc" defaultValue="Platform Enterprise GRC Management." className="min-h-[100px] border-slate-200 rounded-md bg-slate-50/30 focus:bg-white transition-all text-sm" />
               </div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Branding Logo</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex gap-6 items-center">
               <div className="w-24 h-24 rounded-2xl bg-muted border-2 border-dashed border-border flex items-center justify-center shrink-0">
                  <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
               </div>
               <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Unggah Logo Panel</Label>
                  <p className="text-xs text-muted-foreground">Format yang didukung: PNG, JPG (Rasio 1:1, Maks 2MB).<br/>Logo ini akan digunakan pada area Sidebar Navigasi.</p>
                  <Button variant="outline" className="mt-2 h-9 px-4 bg-white border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 transition-all shadow-sm">
                     Pilih File Logo
                  </Button>
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
           <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden sticky top-24">
             <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
                <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Status Penerapan</CardTitle>
             </CardHeader>
             <CardContent className="p-6 space-y-6">
                <div className="p-4 bg-muted/30 rounded-lg border border-border flex items-start gap-3">
                   <Building2 className="mt-0.5 text-blue-500 shrink-0" size={16} />
                   <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                      Mengubah profil aplikasi akan memaksa semua sesi navigasi (*Navbar & Sidebar*) untuk memuat ulang merek yang baru tanpa harus login ulang.
                   </p>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
