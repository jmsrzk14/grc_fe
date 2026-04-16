"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GOVERNANCE_REPORTS, RACI_MATRIX, MEETING_MINUTES, KPI_DATA } from "@/lib/data";
import { 
  Building, 
  ChevronDown, 
  Search, 
  Filter, 
  Calendar,
  MoreVertical,
  CheckCircle2,
  Clock,
  User,
  Users,
  Network,
  BarChart3,
  ClipboardList,
  Info
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

type Tab = "schedule" | "raci" | "meeting" | "kpi";

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState<Tab>("schedule");

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">GRC DOTS</p>
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-[32px] font-bold text-slate-900 tracking-tight">Corporate Governance</h2>
          <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
            {([
              { key: "schedule", label: "Schedule", icon: Calendar },
              { key: "raci",     label: "RACI",     icon: Network },
              { key: "meeting",  label: "Minutes",  icon: ClipboardList },
              { key: "kpi",      label: "KPIs",     icon: BarChart3 },
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
            placeholder="Search governance..."
            className="w-64 h-10 pl-9 border-slate-200 rounded-lg shadow-sm text-sm"
          />
        </div>

        <Select defaultValue="all">
          <SelectTrigger className="h-10 w-[160px] bg-white border-slate-200 text-slate-700 font-semibold rounded-lg ml-2 hover:bg-slate-50">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="board">Board</SelectItem>
            <SelectItem value="shareholders">Shareholders</SelectItem>
            <SelectItem value="regulatory">Regulatory</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="h-10 w-[140px] bg-white border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>

        <Link href="/governance/create">
          <Button variant="secondary" className="h-10 px-6 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors ml-auto">
            Add New Entry
          </Button>
        </Link>
      </div>

      {/* ── Governance Table ── */}
      <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-xl overflow-hidden">
        <CardContent className="p-0">
          {activeTab === "schedule" && (
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">DATE & TIME</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">TYPE</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">SUBJECT / TITLE</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-center">ATTENDEES</TableHead>
                  <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-right">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {GOVERNANCE_REPORTS.map((report, i) => (
                  <TableRow key={report.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="py-4 px-6 text-[13px] text-slate-500 font-mono font-bold">
                      {report.date}
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div className="flex justify-center w-[110px] py-1 border border-slate-200 rounded-md text-[11px] font-bold text-slate-500 bg-slate-50 uppercase tracking-widest">
                        {report.type}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <span className="text-[14px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors cursor-pointer">
                        {report.title}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-4 text-center">
                      <div className="inline-flex items-center justify-center p-1.5 bg-slate-100 rounded-md font-bold text-[12px] text-slate-800 min-w-[50px] border border-slate-200/50">
                        {i + 5} Users
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                         <span className={`text-[12px] font-bold uppercase ${
                           report.status === 'Completed' ? 'text-emerald-600' : 
                           report.status === 'Scheduled' ? 'text-blue-600' : 'text-amber-600'
                         }`}>
                           {report.status}
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

          {activeTab === "raci" && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-slate-100 hover:bg-transparent">
                    <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 sticky left-0 bg-slate-50">PROCESS / AKTIVITAS</TableHead>
                    <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-center">DIRUT</TableHead>
                    <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-center">DKOM</TableHead>
                    <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-center">RISK</TableHead>
                    <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-center">COMP</TableHead>
                    <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-center">AUDIT</TableHead>
                    <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-center">IT</TableHead>
                    <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-center">FIN</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {RACI_MATRIX.map((row) => (
                    <TableRow key={row.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                      <TableCell className="py-4 px-6 text-[14px] font-bold text-slate-800 sticky left-0 bg-white group-hover:bg-slate-50/50">
                        {row.process}
                      </TableCell>
                      {[row.dirut, row.dkom, row.riskOfficer, row.compliance, row.internalAudit, row.it, row.finance].map((val, idx) => (
                        <TableCell key={idx} className="py-4 px-4 text-center">
                          <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md font-black text-xs border ${
                            val === 'R' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                            val === 'A' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            val === 'C' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                            val === 'I' ? 'bg-slate-100 text-slate-400 border-slate-200' : 'text-slate-200 border-transparent'
                          }`}>
                            {val}
                          </span>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {activeTab === "meeting" && (
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">DATE</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">MEETING MINUTES TITLE</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">CHAIRPERSON</TableHead>
                  <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-right">DECISIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MEETING_MINUTES.map((mtg) => (
                  <TableRow key={mtg.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="py-4 px-6 text-[13px] text-slate-500 font-bold">
                      {mtg.date}
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors cursor-pointer">{mtg.title}</span>
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-0.5">{mtg.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 border">
                          {mtg.chairperson.charAt(0)}
                        </div>
                        <span className="text-[13px] font-medium text-slate-600">{mtg.chairperson}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right">
                       <span className="text-[12px] font-bold text-slate-400 uppercase tracking-tight">
                         {mtg.decisions.length} DECISIONS
                       </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {activeTab === "kpi" && (
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">KPI GOVERNANCE</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">TARGET</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">ACTUAL</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">UNIT</TableHead>
                  <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-right">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {KPI_DATA.filter(kpi => kpi.category === "Governance" || kpi.category === "Risk").map((kpi) => (
                  <TableRow key={kpi.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-slate-800">{kpi.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-0.5">{kpi.owner}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4 text-[14px] font-bold text-slate-400 italic">
                      {kpi.target}
                    </TableCell>
                    <TableCell className="py-4 px-4 text-[16px] font-black text-slate-900">
                      {kpi.actual}
                    </TableCell>
                    <TableCell className="py-4 px-4 text-[12px] font-bold text-slate-400 uppercase">
                      {kpi.unit}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right">
                       <div className={`inline-flex px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                         kpi.status === 'Achieved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                         kpi.status === 'On Track' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                         'bg-amber-50 text-amber-600 border border-amber-100'
                       }`}>
                         {kpi.status}
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
