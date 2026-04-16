"use client";

import React from "react";
import Link from "next/link";
import { 
  ShieldAlert, 
  ArrowLeft, 
  Save, 
  Trash2, 
  AlertTriangle,
  Info,
  ChevronRight,
  UserCircle
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
import { Textarea } from "@/components/ui/textarea";

export default function CreateRiskPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">GRC DOTS</p>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
             <Link href="/risk">
               <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-900 border border-slate-100 bg-white">
                 <ArrowLeft size={18} />
               </Button>
             </Link>
             <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Identify New Risk</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ── Left Column: Form Section ── */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
               <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">Risk Identification</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
               <div className="grid gap-3">
                 <Label htmlFor="title" className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Risk Title / Definition</Label>
                 <Input id="title" placeholder="Describe the risk event clearly..." className="h-12 border-slate-200 text-base font-medium" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="id" className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Risk ID</Label>
                    <Input id="id" defaultValue="RISK-2026-001" className="h-11 border-slate-200 bg-slate-50 font-mono font-bold" readOnly />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="category" className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Risk Category</Label>
                    <Select>
                      <SelectTrigger className="h-11 border-slate-200">
                        <SelectValue placeholder="Select functional category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operational">Operational</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                        <SelectItem value="strategic">Strategic</SelectItem>
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="it">IT & Cybersecurity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="grid gap-3">
                    <Label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Inherent Impact</Label>
                    <div className="grid grid-cols-5 gap-1">
                      {[1, 2, 3, 4, 5].map((lv) => (
                        <button key={lv} className={`h-8 rounded-md border flex items-center justify-center text-xs font-bold transition-all ${
                          lv === 4 ? "bg-rose-500 text-white border-rose-600" : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                        }`}>
                          {lv}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Likelihood Probability</Label>
                    <div className="grid grid-cols-5 gap-1">
                      {[1, 2, 3, 4, 5].map((lv) => (
                        <button key={lv} className={`h-8 rounded-md border flex items-center justify-center text-xs font-bold transition-all ${
                          lv === 3 ? "bg-amber-500 text-white border-amber-600" : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                        }`}>
                          {lv}
                        </button>
                      ))}
                    </div>
                  </div>
               </div>

               <div className="grid gap-3 pt-2">
                 <Label htmlFor="desc" className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Risk Analysis / Details</Label>
                 <Textarea id="desc" placeholder="Provide more context on root causes and potential consequences..." className="min-h-[140px] border-slate-200 leading-relaxed" />
               </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
               <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">Ownership \u0026 Treatment</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
               <div className="grid gap-3">
                 <Label htmlFor="owner" className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Risk Owner</Label>
                 <Select>
                    <SelectTrigger className="h-11 border-slate-200">
                      <div className="flex items-center gap-2">
                        <UserCircle size={16} className="text-slate-400" />
                        <SelectValue placeholder="Select department / unit head" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="it-head">Kepala Divisi TI</SelectItem>
                      <SelectItem value="ops-head">Kepala Divisi Operasional</SelectItem>
                      <SelectItem value="risk-head">Kepala Divisi Risk</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
               <div className="grid gap-3">
                 <Label htmlFor="mitigation" className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Proposed Mitigation Strategy</Label>
                 <Textarea id="mitigation" placeholder="How will we control this risk?" className="min-h-[100px] border-slate-200" />
               </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Right Column: Control Sidebar ── */}
        <div className="space-y-4">
           <Card className="border-none shadow-sm bg-slate-900 text-white rounded-xl overflow-hidden">
             <div className="p-6 bg-rose-600 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <AlertTriangle size={20} />
                   <h3 className="font-bold">Summary Risk</h3>
                </div>
                <span className="text-xs font-mono font-bold bg-white/20 px-2 py-1 rounded">SCORE 12</span>
             </div>
             <CardContent className="p-6 space-y-4">
               <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                     <span className="text-xs text-slate-400 uppercase tracking-widest">Impact</span>
                     <span className="text-sm font-bold text-rose-400">4 / High</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                     <span className="text-xs text-slate-400 uppercase tracking-widest">Likelihood</span>
                     <span className="text-sm font-bold text-amber-400">3 / Medium</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-xs text-slate-400 uppercase tracking-widest">Final Status</span>
                     <span className="text-sm font-bold text-rose-500 uppercase animate-pulse">Critical</span>
                  </div>
               </div>
               
               <div className="pt-6 space-y-3">
                 <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2">
                   <Save size={18} /> Regist Risk
                 </Button>
                 <Button variant="ghost" className="w-full h-12 text-slate-400 hover:text-white hover:bg-white/10 font-bold">
                   Save for Review
                 </Button>
               </div>
             </CardContent>
           </Card>

           <Card className="border-none shadow-sm bg-white border-slate-200 rounded-xl">
             <CardContent className="p-5">
               <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                    <Info size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Requirement</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1">Identifikasi risiko harus dilengkapi dengan bukti pendukung jika nilai skor di atas 10.</p>
                  </div>
               </div>
             </CardContent>
           </Card>

           <Button variant="ghost" className="w-full text-rose-500 hover:text-rose-600 hover:bg-rose-50 font-bold gap-2 group transition-colors">
             <Trash2 size={16} className="group-hover:animate-bounce" /> Discard Draft
           </Button>
        </div>
      </div>
    </div>
  );
}
