"use client";

import { POLICIES } from "@/lib/data";
import { FileText, Plus, Search, CheckCircle2, AlertCircle, Clock, ShieldCheck, History, Download, XCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export default function PoliciesPage() {
  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
      <div className="flex justify-between items-center bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
        <header>
          <h2 className="text-2xl font-black tracking-tight text-slate-800 uppercase letter-tighter">Policy Tracking</h2>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1 leading-none italic">
             Governance document management & version control
          </p>
        </header>
        <div className="flex gap-2">
          <Button variant="outline" className="text-[10px] h-8 border-slate-200 text-slate-500 font-bold hover:bg-slate-50">
             <History size={14} className="mr-2" />
             ARCHIVE
          </Button>
          <Button variant="default" className="text-[10px] h-8 bg-blue-600 hover:bg-blue-700 font-bold text-white shadow-lg shadow-blue-500/20">
             <Plus size={14} className="mr-2" />
             NEW POLICY
          </Button>
        </div>
      </div>

      <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-slate-200 flex flex-row items-center justify-between bg-slate-50/50">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/10 rounded-lg">
                 <FileText size={18} className="text-blue-500" />
              </div>
              <CardTitle className="text-lg text-slate-800">Document Registry</CardTitle>
           </div>
           <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input className="h-9 w-[300px] pl-9 bg-white border-slate-200 text-xs text-slate-800 placeholder:text-slate-400" placeholder="Search by title or ID..." />
           </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow className="border-slate-200 hover:bg-transparent">
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Policy ID</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Document Title</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Dibuat</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Disetujui</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Versi</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Update Terakhir</TableHead>
                <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {POLICIES.map((policy) => (
                <TableRow key={policy.id} className="border-slate-100 hover:bg-slate-50 transition-colors">
                  <TableCell className="font-mono text-[10px] text-slate-400 py-4 uppercase font-bold">{policy.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-tight">{policy.title}</span>
                      <span className="text-[9px] font-bold text-slate-500">Approver: {policy.approver}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {policy.isCreated ? (
                      <div className="flex items-center text-emerald-600 font-bold text-[10px] gap-1">
                        <CheckCircle2 size={12} /> YA
                      </div>
                    ) : (
                      <div className="flex items-center text-rose-500 font-bold text-[10px] gap-1">
                        <XCircle size={12} /> BELUM
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {policy.isApproved ? (
                      <div className="flex items-center text-emerald-600 font-bold text-[10px] gap-1">
                        <CheckCircle2 size={12} /> YA
                      </div>
                    ) : (
                      <div className="flex items-center text-amber-500 font-bold text-[10px] gap-1">
                        <Clock size={12} /> PROSES
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-[10px] font-mono text-slate-500 font-bold">
                    <Badge variant="outline" className={`text-[8px] font-bold ${policy.version.includes('Terbaru') ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-400'}`}>
                      {policy.version}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-bold uppercase">
                       <Clock size={12} className="text-slate-400" />
                       {policy.lastUpdate}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-800">
                         <Download size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-blue-500">
                         <ShieldCheck size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

