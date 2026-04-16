"use client";

import React from "react";
import Link from "next/link";
import { 
  Building, 
  ArrowLeft, 
  Calendar,
  Save,
  Trash2,
  Users,
  Info
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

export default function CreateGovernancePage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">GRC DOTS</p>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
             <Link href="/governance">
               <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-900 border border-slate-100 bg-white">
                 <ArrowLeft size={18} />
               </Button>
             </Link>
             <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create Governance Item</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ── Form Section ── */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
               <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">Subject Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
               <div className="grid gap-2">
                 <Label htmlFor="title" className="text-xs font-bold text-slate-600 uppercase">Subject / Meeting Title</Label>
                 <Input id="title" placeholder="e.g. Annual General Meeting Q4 2026" className="h-11 border-slate-200" />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type" className="text-xs font-bold text-slate-600 uppercase">Governance Type</Label>
                    <Select>
                      <SelectTrigger className="h-11 border-slate-200">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shareholders">Shareholders</SelectItem>
                        <SelectItem value="board">Board Meeting</SelectItem>
                        <SelectItem value="regulatory">Regulatory</SelectItem>
                        <SelectItem value="audit">Audit Committee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date" className="text-xs font-bold text-slate-600 uppercase">Scheduled Date</Label>
                    <div className="relative">
                       <Input id="date" type="date" className="h-11 border-slate-200 pl-4" />
                    </div>
                  </div>
               </div>

               <div className="grid gap-2 pt-2">
                 <Label htmlFor="desc" className="text-xs font-bold text-slate-600 uppercase">Objective / Description</Label>
                 <Textarea id="desc" placeholder="Describe the purpose of this governance activity..." className="min-h-[120px] border-slate-200" />
               </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
               <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500">Attendees & Chairperson</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
               <div className="grid gap-2">
                 <Label htmlFor="chair" className="text-xs font-bold text-slate-600 uppercase">Chairperson</Label>
                 <Input id="chair" placeholder="Full name of chairperson" className="h-11 border-slate-200" />
               </div>
               <div className="grid gap-2">
                 <Label htmlFor="attendees" className="text-xs font-bold text-slate-600 uppercase">Invite Attendees (comma separated)</Label>
                 <Input id="attendees" placeholder="email1@example.com, email2@example.com" className="h-11 border-slate-200" />
               </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Actions Sidebar ── */}
        <div className="space-y-4">
           <Card className="border-none shadow-sm bg-slate-900 text-white rounded-xl">
             <CardContent className="p-6 space-y-4">
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500 rounded-lg text-white">
                    <Building size={20} />
                  </div>
                  <h3 className="font-bold">Publish Item</h3>
               </div>
               <p className="text-xs text-slate-400 leading-relaxed">Publishing this governance item will notify all invited attendees and update the GRC schedule.</p>
               
               <div className="pt-4 space-y-2">
                 <Button className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold gap-2">
                   <Save size={18} /> Save & Publish
                 </Button>
                 <Button variant="ghost" className="w-full h-11 text-slate-400 hover:text-white hover:bg-white/10 font-bold">
                   Save Draft
                 </Button>
               </div>
             </CardContent>
           </Card>

           <Card className="border-none shadow-sm bg-white border-slate-200 rounded-xl">
             <CardContent className="p-5">
               <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-400 shrink-0">
                    <Info size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Requirement</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1">Sesuai POJK No. 4/2026, rapat direksi wajib didokumentasikan minimal 2 hari kerja setelah pelaksanaan.</p>
                  </div>
               </div>
             </CardContent>
           </Card>

           <Button variant="ghost" className="w-full text-rose-500 hover:text-rose-600 hover:bg-rose-50 font-bold gap-2">
             <Trash2 size={16} /> Discard Item
           </Button>
        </div>
      </div>
    </div>
  );
}
