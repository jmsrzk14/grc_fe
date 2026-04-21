"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  CloudUpload,
  Info
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

export default function CreatePolicyPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full px-2 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="h-9 w-9 rounded-md border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm">
            <Link href="/policies">
              <ArrowLeft className="h-4 w-4 text-slate-500" />
            </Link>
          </Button>
          <HeaderTitle title="Registrasi Kebijakan" />
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-9 px-4 bg-white border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 transition-all shadow-sm">
              <Trash2 className="h-4 w-4 mr-1.5" /> Batal
           </Button>
           <Button onClick={() => toast({ title: "Berhasil Disimpan", description: "Catatan baru telah valid terekam ke database internal GRC." })} className="h-9 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm">
              <Save className="h-4 w-4 mr-1.5" /> Simpan Kebijakan
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── Utama: Formulir ── */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Detail Dokumen & Registrasi</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
               <div className="grid gap-2">
                 <Label htmlFor="title" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Kebijakan</Label>
                 <Input id="title" placeholder="Masukan judul dokumen atau kebijakan..." className="h-10 border-slate-200 rounded-md bg-slate-50/30 focus:bg-white focus:ring-1 focus:ring-primary/20 transition-all" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="id" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Policy ID</Label>
                    <Input id="id" defaultValue="POL-2026-001" className="h-10 border-slate-200 bg-slate-100 font-mono text-xs rounded-md" readOnly />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="version" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Versi Awal</Label>
                    <Input id="version" defaultValue="v1.0.0" className="h-10 border-slate-200 rounded-md bg-slate-50/30 focus:bg-white transition-all text-sm" />
                  </div>
               </div>

               <div className="grid gap-2">
                 <Label htmlFor="approver" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Final Approver</Label>
                 <Select>
                    <SelectTrigger className="h-10 border-slate-200 rounded-md bg-slate-50/30">
                       <SelectValue placeholder="Pilih Otoritas Penyetuju" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ceo">Direktur Utama</SelectItem>
                      <SelectItem value="board">Dewan Komisaris</SelectItem>
                      <SelectItem value="ops-dir">Direktur Operasional</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden border-dashed">
            <CardContent className="p-12 flex flex-col items-center justify-center text-center gap-4">
               <div className="p-4 bg-muted/50 rounded-2xl text-slate-400">
                  <CloudUpload size={32} />
               </div>
               <div>
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Unggah Draf Kebijakan</h3>
                  <p className="text-xs text-slate-400 mt-1 font-medium italic">Format yang didukung: .pdf, .docx (Maks. 10MB)</p>
               </div>
               <Button variant="outline" className="mt-2 h-9 px-4 bg-white border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 transition-all shadow-sm">Pilih Berkas</Button>
            </CardContent>
          </Card>
        </div>

        {/* ── Samping: Status & Info ── */}
        <div className="lg:col-span-4 space-y-6">
           <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden sticky top-24">
             <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
                <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Informasi Tambahan</CardTitle>
             </CardHeader>
             <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                   <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                        <Info size={16} />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">Catatan Alur Kerja</h4>
                        <p className="text-xs text-slate-500 leading-relaxed mt-1 font-medium italic">
                          Sistem akan menyimpan dokumen ini sebagai rancangan (*draft*) sebelum diteruskan untuk peninjauan otoritas terkait.
                        </p>
                      </div>
                   </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full h-9 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm">
                    Simpan sebagai Draf
                  </Button>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
