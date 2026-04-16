"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ArrowLeft, 
  Save, 
  Trash2, 
  Clock, 
  User, 
  Info,
  FileBadge,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

export default function CreateCompliancePage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">GRC DOTS</p>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
             <Link href="/compliance">
               <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-900 border border-slate-100 bg-white">
                 <ArrowLeft size={18} />
               </Button>
             </Link>
             <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Add Requirement</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Form Section ── */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
               <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">Regulatory Commitment</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
               <div className="grid gap-3">
                 <Label htmlFor="title" className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Kewajiban / Judul Regulasi</Label>
                 <Input id="title" placeholder="Nama kewajiban kepatuhan..." className="h-11 border-slate-200" />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="id" className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Referensi Regulasi</Label>
                    <Input id="id" placeholder="Contoh: POJK No. X 2026" className="h-11 border-slate-200" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="category" className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Kategori Kepatuhan</Label>
                    <Select>
                      <SelectTrigger className="h-11 border-slate-200">
                        <SelectValue placeholder="Pilih Pilar GRC" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ojk">Pilar OJK</SelectItem>
                        <SelectItem value="bi">Pilar BI</SelectItem>
                        <SelectItem value="internal">Audit Internal</SelectItem>
                        <SelectItem value="it">IT Governance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="grid gap-3">
                    <Label htmlFor="pic" className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Petugas (PIC)</Label>
                    <Input id="pic" placeholder="Nama PIC Penanggung Jawab" className="h-11 border-slate-200" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="deadline" className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Tenggat Waktu</Label>
                    <Input id="deadline" type="date" className="h-11 border-slate-200" />
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
               <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">Compliance Logic</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
               <div className="grid gap-3">
                 <Label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Skala Prioritas</Label>
                 <div className="flex gap-2">
                   {['Minor', 'Medium', 'High', 'Critical'].map((lv) => (
                     <button key={lv} className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg border transition-all ${
                       lv === 'High' ? "bg-rose-50 text-rose-600 border-rose-200 ring-2 ring-rose-100" : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                     }`}>
                       {lv}
                     </button>
                   ))}
                 </div>
               </div>
               <div className="grid gap-3 pt-2">
                 <Label htmlFor="remarks" className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Catatan Tambahan</Label>
                 <Textarea id="remarks" placeholder="Tambahkan instruksi pengerjaan compliance ini..." className="min-h-[100px] border-slate-200" />
               </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Actions Sidebar ── */}
        <div className="space-y-4">
           <Card className="border-none shadow-sm bg-blue-600 text-white rounded-xl">
             <CardContent className="p-6 space-y-4 text-center">
               <div className="p-3 bg-white/10 rounded-2xl w-fit mx-auto text-white mb-2">
                  <ShieldCheck size={32} />
               </div>
               <div>
                  <h3 className="text-lg font-bold">Add Commitment</h3>
                  <p className="text-[11px] text-blue-100 mt-1 opacity-80 leading-relaxed">Menambahkan kewajiban compliance ini akan memicu alarm notifikasi ke PIC terkait.</p>
               </div>
               
               <div className="pt-4 space-y-2">
                 <Button className="w-full h-11 bg-white text-blue-600 hover:bg-blue-50 font-black shadow-lg shadow-blue-800/20">
                   <Save size={18} className="mr-2" /> REGISTER COMMIT
                 </Button>
               </div>
             </CardContent>
           </Card>

           <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
              <div className="flex items-center gap-3">
                <FileBadge size={18} className="text-blue-500" />
                <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">SLA Compliance</h4>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">Data yang disimpan tidak dapat dirubah setelah melewati 24 jam kecuali dengan persetujuan Admin GRC.</p>
           </div>

           <Button variant="ghost" className="w-full text-slate-400 hover:text-rose-500 font-bold gap-2">
             <Trash2 size={16} /> Discard Item
           </Button>
        </div>
      </div>
    </div>
  );
}
