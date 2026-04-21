"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  Trash2,
  Users,
  CheckCircle,
  FileText
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
import { Textarea } from "@/components/ui/textarea";
import HeaderTitle from "@/components/layout/HeaderTitle";

export default function CreateGovernancePage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full px-2 pb-10">
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="h-9 w-9 rounded-md border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm">
            <Link href="/governance">
              <ArrowLeft className="h-4 w-4 text-slate-500" />
            </Link>
          </Button>
          <HeaderTitle title="Registrasi Governance" />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-9 px-4 bg-white border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 transition-all shadow-sm">
              <Trash2 className="h-4 w-4 mr-1.5" /> Batal
           </Button>
           <Button onClick={() => toast({ title: "Berhasil Disimpan", description: "Catatan baru telah valid terekam ke database internal GRC." })} className="h-9 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm">
              <Save className="h-4 w-4 mr-1.5" /> Simpan Item
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── Utama: Formulir ── */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Detail Subjek & Agenda</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
               <div className="grid gap-2">
                 <Label htmlFor="title" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Laporan / Agenda</Label>
                 <Input id="title" placeholder="Contoh: Rapat Umum Pemegang Saham Q4 2026..." className="h-10 border-slate-200 rounded-md bg-slate-50/30 focus:bg-white focus:ring-1 focus:ring-primary/20 transition-all" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="type" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tipe Tata Kelola</Label>
                    <Select>
                      <SelectTrigger className="h-10 border-slate-200 rounded-md bg-slate-50/30">
                        <SelectValue placeholder="Pilih Tipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shareholders">Pemegang Saham</SelectItem>
                        <SelectItem value="board">Rapat Direksi</SelectItem>
                        <SelectItem value="regulatory">Regulasi</SelectItem>
                        <SelectItem value="audit">Komite Audit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tanggal Terjadwal</Label>
                    <Input id="date" type="date" className="h-10 border-slate-200 bg-slate-50/30 rounded-md" />
                  </div>
               </div>

               <div className="grid gap-2">
                 <Label htmlFor="desc" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tujuan & Deskripsi</Label>
                 <Textarea id="desc" placeholder="Jelaskan tujuan dari aktivitas tata kelola ini..." className="min-h-[140px] border-slate-200 rounded-md bg-slate-50/30 focus:bg-white transition-all text-sm" />
               </div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Peserta & Manajemen</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
               <div className="grid gap-2">
                 <Label htmlFor="chair" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Ketua Sidang / Chairperson</Label>
                 <Input id="chair" placeholder="Nama lengkap ketua sidang..." className="h-10 border-slate-200 rounded-md bg-slate-50/30" />
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="attendees" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Daftar Peserta (pisahkan dengan koma)</Label>
                 <Input id="attendees" placeholder="email1@perusahaan.com, email2@perusahaan.com..." className="h-10 border-slate-200 rounded-md bg-slate-50/30" />
               </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Samping: Ringkasan ── */}
        <div className="lg:col-span-4">
           <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden sticky top-24">
             <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
                <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Informasi Tambahan</CardTitle>
             </CardHeader>
             <CardContent className="p-6 space-y-6">
                <div className="p-4 bg-muted/30 rounded-lg border border-border">
                   <p className="text-[11px] text-slate-500 leading-relaxed italic font-medium">
                      Publishing item ini akan menyinkronkan agenda ke seluruh departemen terkait dan mengirimkan undangan otomatis.
                   </p>
                </div>

                <div className="flex flex-col gap-3">
                   <div className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-100">
                         <CheckCircle size={12} />
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium">Dokumentasi wajib minimum 2 hari kerja sblm rapat.</p>
                   </div>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
