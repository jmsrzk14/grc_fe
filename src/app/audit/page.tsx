"use client";

import { AUDIT_TRAIL } from "@/lib/data";
import { ChevronDown, Calendar, Search, Filter, Info, ShieldCheck, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AuditPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">GRC DOTS</p>
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-[32px] font-bold text-slate-900 tracking-tight">Audit Trail</h2>
          <p className="text-sm font-medium text-slate-400">6191 total</p>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="flex flex-wrap items-center gap-2 p-1 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-500">Dari</span>
          <Input 
            type="date" 
            defaultValue="2026-04-14" 
            className="w-40 h-10 border-slate-200 rounded-lg shadow-sm font-bold text-slate-700"
          />
        </div>
        <div className="flex items-center gap-2 ml-2">
          <span className="text-sm font-medium text-slate-500">Sampai</span>
          <Input 
            type="date" 
            defaultValue="2026-04-14" 
            className="w-40 h-10 border-slate-200 rounded-lg shadow-sm font-bold text-slate-700"
          />
        </div>

        <Select defaultValue="all">
          <SelectTrigger className="h-10 w-[140px] bg-white border-slate-200 text-slate-700 font-semibold rounded-lg ml-2 hover:bg-slate-50">
            <SelectValue placeholder="Jenis Log" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Jenis</SelectItem>
            <SelectItem value="update">Update</SelectItem>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="h-10 w-[160px] bg-white border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50">
            <SelectValue placeholder="Cabang" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Cabang</SelectItem>
            <SelectItem value="jakarta">KC Jakarta</SelectItem>
            <SelectItem value="bandung">KC Bandung</SelectItem>
            <SelectItem value="surabaya">KC Surabaya</SelectItem>
            <SelectItem value="medan">KC Medan</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="secondary" className="h-10 px-6 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors ml-auto">
          Hari Ini
        </Button>
      </div>

      {/* ── Activities Table ── */}
      <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">TIMESTAMP</TableHead>
                <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">ACTION</TableHead>
                <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">MODULE</TableHead>
                <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">TARGET</TableHead>
                <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-right">PETUGAS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {AUDIT_TRAIL.map((log) => (
                <TableRow key={log.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="py-4 px-6 text-[13px] text-slate-500 font-mono font-bold">
                    {log.timestamp}
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <div className={`flex justify-center w-[100px] py-1 border rounded-md text-[11px] font-black uppercase tracking-widest ${
                      log.action === 'UPDATE' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      log.action === 'CREATE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {log.action}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <span className="text-[13px] font-bold text-slate-800">
                      {log.module}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <span className="text-[13px] text-slate-600 font-medium">
                      {log.target}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-[13px] font-bold text-slate-800">{log.editBy}</span>
                      <span className="text-[10px] text-slate-400 font-medium italic">via {log.inputBy}</span>
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
