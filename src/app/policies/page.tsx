"use client";

import React, { useState } from "react";
import Link from "next/link";
import { POLICIES } from "@/lib/data";
import { 
  FileText, 
  ChevronDown, 
  Search, 
  Filter, 
  Calendar,
  MoreVertical,
  CheckCircle2,
  Clock,
  Download,
  ShieldCheck,
  History,
  Plus
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export default function PoliciesPage() {
  const [search, setSearch] = useState("");

  const filteredPolicies = POLICIES.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">GRC DOTS</p>
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-[32px] font-bold text-slate-900 tracking-tight">Policy Tracking</h2>
          <p className="text-sm font-medium text-slate-400">{POLICIES.length} documents total</p>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="flex flex-wrap items-center gap-2 p-1 rounded-xl">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search policy doc..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 h-10 pl-9 border-slate-200 rounded-lg shadow-sm text-sm"
          />
        </div>

        <Select defaultValue="all">
          <SelectTrigger className="h-10 w-[140px] bg-white border-slate-200 text-slate-700 font-semibold rounded-lg ml-2 hover:bg-slate-50">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="revised">Revised</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="h-10 w-[140px] bg-white border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50">
            <SelectValue placeholder="Approver" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Approvers</SelectItem>
            <SelectItem value="cso">CSO</SelectItem>
            <SelectItem value="board">Board</SelectItem>
            <SelectItem value="legal">Legal</SelectItem>
          </SelectContent>
        </Select>

        <Link href="/policies/create">
          <Button variant="secondary" className="h-10 px-6 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors ml-auto">
            Create New Policy
          </Button>
        </Link>
      </div>

      {/* ── Policies Table ── */}
      <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-xl overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">POLICY ID</TableHead>
                <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">DOCUMENT TITLE</TableHead>
                <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">STATUS PROSES</TableHead>
                <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-center">VERSION</TableHead>
                <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-right">LAST UPDATE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPolicies.map((policy, i) => (
                <TableRow key={policy.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="py-4 px-6 text-[13px] text-slate-500 font-mono font-bold">
                    {policy.id}
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors cursor-pointer leading-tight uppercase font-inter">
                        {policy.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">Approver: {policy.approver}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <div className="flex flex-col gap-1.5 ">
                       <div className="flex items-center gap-2">
                         <div className={`h-1.5 w-1.5 rounded-full ${policy.isCreated ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                         <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Created</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <div className={`h-1.5 w-1.5 rounded-full ${policy.isApproved ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                         <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Approved</span>
                       </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-4 text-center">
                    <div className="inline-flex items-center justify-center p-1.5 bg-slate-100 rounded-md font-bold text-[10px] min-w-[50px] border border-slate-200/50 text-slate-600 uppercase">
                      {policy.version}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-4">
                       <div className="flex flex-col items-end">
                         <span className="text-[12px] font-bold text-slate-800 uppercase">{policy.lastUpdate}</span>
                         <span className="text-[9px] text-slate-400 font-bold">BY SYSTEM</span>
                       </div>
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-slate-600">
                         <MoreVertical size={16} />
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
