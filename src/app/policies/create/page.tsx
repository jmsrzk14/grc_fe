"use client";

import React from "react";
import Link from "next/link";
import { 
  FileText, 
  ArrowLeft, 
  Save, 
  Trash2, 
  CheckCircle2, 
  MoreVertical, 
  CloudUpload,
  Info,
  ShieldCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function CreatePolicyPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">GRC DOTS</p>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
             <Link href="/policies">
               <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-900 border border-slate-100 bg-white">
                 <ArrowLeft size={18} />
               </Button>
             </Link>
             <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Register New Policy</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Main Section ── */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
               <CardTitle className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Document Registry</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
               <div className="grid gap-3">
                 <Label htmlFor="title" className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Policy / Document Title</Label>
                 <Input id="title" placeholder="e.g. Kebijakan Anti-Fraud 2026" className="h-12 border-slate-200" />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="id" className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Policy ID</Label>
                    <Input id="id" defaultValue="POL-2026-XX" className="h-11 border-slate-200 bg-slate-50/50" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="ver" className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Initial Version</Label>
                    <Input id="ver" defaultValue="v1.0.0" className="h-11 border-slate-200" />
                  </div>
               </div>

               <div className="grid gap-3 pt-2">
                 <Label htmlFor="approver" className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Final Approver</Label>
                 <Select>
                    <SelectTrigger className="h-11 border-slate-200">
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

          <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-slate-50/50 rounded-xl overflow-hidden border-2 border-dashed border-slate-200">
            <CardContent className="p-12 flex flex-col items-center justify-center text-center gap-4">
               <div className="p-4 bg-white rounded-2xl shadow-sm text-slate-400">
                  <CloudUpload size={40} />
               </div>
               <div>
                  <h3 className="text-lg font-bold text-slate-800">Upload Policy Draft</h3>
                  <p className="text-sm text-slate-400 mt-1">Upload dokumen .pdf atau .docx untuk proses review.</p>
               </div>
               <Button variant="outline" className="mt-4 px-8 h-10 border-slate-200 font-bold text-slate-600 bg-white">Pilih File</Button>
            </CardContent>
          </Card>
        </div>

        {/* ── Sidebar Section ── */}
        <div className="space-y-4">
           <Card className="border-none shadow-sm bg-slate-900 text-white rounded-xl overflow-hidden">
             <div className="h-1 bg-emerald-500 w-full" />
             <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                   <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 border border-white/10">
                      <ShieldCheck size={20} />
                   </div>
                   <h3 className="font-bold">Privacy Check</h3>
                </div>
                
                <div className="space-y-4 mb-8">
                   <p className="text-xs text-slate-400 leading-relaxed italic">
                      "Pastikan dokumen kebijakan tidak mengandung data rahasia nasabah kecuali diperlukan."
                   </p>
                </div>

                <div className="space-y-2">
                   <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2">
                     <Save size={18} /> Register Policy
                   </Button>
                   <Button variant="ghost" className="w-full h-11 text-slate-500 hover:text-white font-bold">
                     Preview Mode
                   </Button>
                </div>
             </CardContent>
           </Card>

           <div className="p-6 bg-blue-50/50 border border-blue-100/50 rounded-xl flex gap-3">
              <Info size={18} className="text-blue-500 shrink-0" />
              <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
                 Sistem akan menyimpan dokumen ini sebagai rancangan (draft) sebelum disetujui oleh approver.
              </p>
           </div>
           
           <Button variant="ghost" className="w-full text-rose-500 font-bold uppercase tracking-widest text-[10px] gap-2">
              <Trash2 size={14} /> Discard Policy
           </Button>
        </div>
      </div>
    </div>
  );
}
