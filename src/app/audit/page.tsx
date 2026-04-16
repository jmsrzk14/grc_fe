"use client";

import { AUDIT_TRAIL } from "@/lib/data";
import { Search, History, Filter, MoreVertical, Eye, FileText, CheckCircle2, AlertCircle, Clock, User, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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

export default function AuditPage() {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center bg-white p-4 border border-slate-200 rounded-xl shadow-sm">
        <header>
          <h2 className="text-2xl font-black tracking-tight text-slate-800 uppercase letter-tighter">Activity Immutable Ledger</h2>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1 leading-none italic">
             Detailed audit trail & cryptographic proof of integrity
          </p>
        </header>
        <div className="flex gap-2">
          <Button variant="outline" className="text-[10px] h-8 border-slate-200 text-slate-500 font-bold hover:bg-slate-50">
             <Filter size={14} className="mr-2" />
             EXPORT JRNL
          </Button>
          <Button variant="default" className="text-[10px] h-8 bg-blue-600 hover:bg-blue-700 font-bold text-white shadow-lg shadow-blue-500/20">
             <ShieldCheck size={14} className="mr-2" />
             VERIFY CHAIN
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Total Logs", value: "24,812", sub: "Since inception", color: "blue" },
          { label: "Security Events", value: "142", sub: "Last 30 days", color: "amber" },
          { label: "User Mutations", value: "1,204", sub: "Current month", color: "emerald" },
          { label: "Integrity", value: "Valid", sub: "SHA-256 Hash", color: "blue" },
        ].map((stat, i) => (
          <Card key={i} className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
              <h3 className={`text-xl font-black ${stat.label === 'Integrity' ? 'text-blue-500' : 'text-slate-800'} leading-none`}>{stat.value}</h3>
              <p className="text-[9px] font-bold text-slate-500 mt-1">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-slate-200 flex flex-row items-center justify-between bg-slate-50/50">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/10 rounded-lg">
                 <History size={18} className="text-blue-500" />
              </div>
              <CardTitle className="text-lg text-slate-800">System Audit Journal</CardTitle>
           </div>
           <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input className="h-9 w-[300px] pl-9 bg-white border-slate-200 text-xs text-slate-800 placeholder:text-slate-400" placeholder="Search by user or action..." />
           </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow className="border-slate-200">
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Waktu Aktivitas</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Input Oleh</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Edit Oleh</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Action</TableHead>
                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-slate-400">System Module</TableHead>
                <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-slate-400">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {AUDIT_TRAIL.map((log) => (
                <TableRow key={log.id} className="border-slate-100 hover:bg-slate-50 transition-colors group">
                  <TableCell className="font-mono text-[9px] text-slate-400 py-3 uppercase font-bold">{log.timestamp}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <div className="h-6 w-6 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 shadow-inner">
                          <User size={10} className="text-slate-400" />
                       </div>
                       <span className="text-xs font-bold text-slate-800 uppercase tracking-tight">{log.inputBy}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <span className={`text-xs font-bold ${log.editBy === '-' ? 'text-slate-300 italic' : 'text-slate-600'} uppercase tracking-tight`}>{log.editBy}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[8px] font-black uppercase tracking-widest border-none h-4 px-2 ${
                      log.action === 'CREATE' ? 'bg-emerald-500/10 text-emerald-500' :
                      log.action === 'DELETE' ? 'bg-rose-500/10 text-rose-500' :
                      'bg-blue-500/10 text-blue-500'
                    }`}>
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[9px] font-mono border-slate-200 text-slate-400 bg-slate-50">
                       {log.module}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-800 hover:bg-slate-100">
                       <Eye size={14} />
                    </Button>
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
