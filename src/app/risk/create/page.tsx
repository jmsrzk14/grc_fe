"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  Trash2
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

export default function CreateRiskPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full px-2 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="h-9 w-9 rounded-md border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm">
            <Link href="/risk">
              <ArrowLeft className="h-4 w-4 text-slate-500" />
            </Link>
          </Button>
          <HeaderTitle title="Registrasi Risiko" />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-9 px-4 bg-white border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 transition-all shadow-sm">
              <Trash2 className="h-4 w-4 mr-1.5" /> Batal
           </Button>
           <Button onClick={() => toast({ title: "Berhasil Disimpan", description: "Catatan baru telah valid terekam ke database internal GRC." })} className="h-9 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm">
              <Save className="h-4 w-4 mr-1.5" /> Simpan Risiko
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── Utama: Formulir ── */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Definisi & Klasifikasi</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
               <div className="grid gap-2">
                 <Label htmlFor="title" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Risiko</Label>
                 <Input id="title" placeholder="Masukan judul kejadian risiko..." className="h-10 border-slate-200 rounded-md bg-slate-50/30 focus:bg-white focus:ring-1 focus:ring-primary/20 transition-all" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="id" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Risk ID</Label>
                    <Input id="id" defaultValue="RSK-2024-009" className="h-10 border-slate-200 bg-slate-100 font-mono text-xs rounded-md" readOnly />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Kategori</Label>
                    <Select>
                      <SelectTrigger className="h-10 border-slate-200 rounded-md bg-slate-50/30">
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pasar">Pasar</SelectItem>
                        <SelectItem value="operasional">Operasional</SelectItem>
                        <SelectItem value="kepatuhan">Kepatuhan</SelectItem>
                        <SelectItem value="kredit">Kredit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
               </div>

               <div className="grid gap-2">
                 <Label htmlFor="desc" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Analisis (Penyebab & Dampak)</Label>
                 <Textarea id="desc" placeholder="Jelaskan akar penyebab dan potensi konsekuensi..." className="min-h-[120px] border-slate-200 rounded-md bg-slate-50/30 focus:bg-white transition-all text-sm" />
               </div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Kepemilikan</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
               <div className="grid gap-2">
                 <Label htmlFor="owner" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Risk Owner</Label>
                 <Select>
                    <SelectTrigger className="h-10 border-slate-200 rounded-md bg-slate-50/30">
                       <SelectValue placeholder="Pilih Penanggung Jawab" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it">Divisi Teknologi Informasi</SelectItem>
                      <SelectItem value="ops">Divisi Operasional</SelectItem>
                      <SelectItem value="compliance">Divisi Compliance</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Samping: Score ── */}
        <div className="lg:col-span-4">
           <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden sticky top-24">
             <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
                <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Ringkasan Skor</CardTitle>
             </CardHeader>
             <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-500 uppercase tracking-wide">Impact Score</span>
                      <span className="font-bold text-foreground">4 / 5</span>
                   </div>
                   <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-500 uppercase tracking-wide">Likelihood</span>
                      <span className="font-bold text-foreground">3 / 5</span>
                   </div>
                   <div className="flex justify-between items-center pt-4 border-t border-border text-sm">
                      <span className="font-bold text-slate-700">Total Inherit</span>
                      <span className="font-black text-rose-600">12.00</span>
                   </div>
                </div>

                <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
                   <p className="text-[11px] text-slate-500 leading-relaxed italic font-medium">
                      Risiko tingkat <span className="text-rose-600 font-bold underline">Critical</span> wajib memerlukan lampiran bukti mitigasi sebelum registrasi disetujui.
                   </p>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
