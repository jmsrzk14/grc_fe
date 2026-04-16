"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RISK_REGISTER, MITIGATION_PLANS } from "@/lib/data";
import { 
  ShieldAlert, 
  ChevronDown, 
  Search, 
  Filter, 
  Info,
  Calendar,
  MoreVertical,
  AlertTriangle,
  User
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

type Tab = "register" | "mitigation";

export default function RiskPage() {
  const [activeTab, setActiveTab] = useState<Tab>("register");
  const [search, setSearch] = useState("");

  const filteredRisks = RISK_REGISTER.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase()) ||
    r.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">GRC DOTS</p>
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-[32px] font-bold text-slate-900 tracking-tight">Risk Management</h2>
          <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
            {( [
              { key: "register",   label: "Risk Register",   icon: ShieldAlert },
              { key: "mitigation", label: "Mitigation Plans", icon: AlertTriangle },
            ] as const).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all duration-200 ${
                  activeTab === key
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-400 hover:text-slate-700 hover:bg-white/50"
                }`}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="flex flex-wrap items-center gap-2 p-1 rounded-xl">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search risk or mitigation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 h-10 pl-9 border-slate-200 rounded-lg shadow-sm text-sm"
          />
        </div>

        <Select defaultValue="all">
          <SelectTrigger className="h-10 w-[160px] bg-white border-slate-200 text-slate-700 font-semibold rounded-lg ml-2 hover:bg-slate-50">
            <SelectValue placeholder="Semua Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            <SelectItem value="pasar">Pasar</SelectItem>
            <SelectItem value="operasional">Operasional</SelectItem>
            <SelectItem value="kepatuhan">Kepatuhan</SelectItem>
            <SelectItem value="kredit">Kredit</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="h-10 w-[140px] bg-white border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50">
            <SelectValue placeholder="Impact" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Impact</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Link href="/risk/create" className="ml-auto">
          <Button variant="secondary" className="h-10 px-6 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">
            Identify New Risk
          </Button>
        </Link>
      </div>

      {/* ── Content Section ── */}
      <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-xl overflow-hidden">
        <CardContent className="p-0">
          {activeTab === "register" && (
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">ID & RISIKO</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">KATEGORI</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">DAMPAK</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-center">PROBABILITAS</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">OWNER</TableHead>
                  <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRisks.map((risk) => (
                  <TableRow key={risk.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest leading-none mb-1">{risk.id}</span>
                        <span className="text-[14px] font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors cursor-pointer">
                          {risk.title}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div className="flex justify-center w-[110px] py-1 border border-slate-200 rounded-md text-[11px] font-bold text-slate-500 bg-slate-50 uppercase tracking-wider">
                        {risk.category}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div className="flex items-center gap-2">
                         <div className={`h-2 w-2 rounded-full ${
                           risk.impact === 'High' || risk.impact === 'Critical' ? 'bg-rose-500' : 
                           risk.impact === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                         }`} />
                         <span className="text-[13px] font-bold text-slate-700 uppercase tracking-tight">
                           {risk.impact}
                         </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4 text-center">
                      <div className={`inline-flex items-center justify-center p-1.5 rounded-md font-bold text-[11px] min-w-[80px] border uppercase tracking-widest ${
                        risk.likelihood === 'High' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                        risk.likelihood === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                        'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {risk.likelihood}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div className="flex items-center gap-2">
                         <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400 font-bold text-[10px]">
                            {risk.owner.charAt(0)}
                         </div>
                         <span className="text-[13px] font-bold text-slate-800">
                           {risk.owner}
                         </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center justify-between">
                        <span className={`text-[12px] font-bold ${risk.status === "Mitigated" ? "text-emerald-600" : "text-blue-600"}`}>
                          {risk.status === "Mitigated" ? "● MITIGATED" : "○ ACTIVE"}
                        </span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-slate-600">
                          <MoreVertical size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {activeTab === "mitigation" && (
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">ACTION PLAN</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">RISK REFERENCE</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">PIC / DEPT</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">PROGRESS</TableHead>
                  <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-right">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MITIGATION_PLANS.map((plan) => (
                  <TableRow key={plan.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="py-4 px-6 max-w-[300px]">
                      <span className="text-[14px] font-bold text-slate-800 leading-tight">
                        {plan.action}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <span className="text-[12px] font-medium text-slate-500 italic">
                        {plan.riskTitle}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                       <span className="text-[13px] font-bold text-slate-700">{plan.pic}</span>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                       <div className="w-24 space-y-1">
                          <div className="flex justify-between text-[10px] font-black text-slate-400">
                             <span>{plan.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                             <div 
                               className="h-full bg-blue-500 transition-all duration-500" 
                               style={{ width: `${plan.progress}%` }}
                             />
                          </div>
                       </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right">
                       <div className={`inline-flex px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                         plan.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                         plan.status === 'On Track' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                         plan.status === 'Delayed' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                         'bg-slate-100 text-slate-500'
                       }`}>
                         {plan.status}
                       </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
