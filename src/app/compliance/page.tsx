"use client";

import React, { useState } from "react";
import Link from "next/link";
import { COMPLIANCE_DATA, TRANSACTION_ALERTS, CUSTOMER_DATA } from "@/lib/data";
import { 
  ShieldCheck, 
  ChevronDown, 
  Search, 
  Filter, 
  Calendar,
  MoreVertical,
  CheckCircle2,
  Clock,
  User,
  Bell,
  UserX,
  AlertTriangle
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

type Tab = "checklist" | "transaction" | "customer";

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState<Tab>("checklist");

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">GRC DOTS</p>
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-[32px] font-bold text-slate-900 tracking-tight">Compliance Center</h2>
          <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
            {([
              { key: "checklist",   label: "POJK Checklist", icon: ShieldCheck },
              { key: "transaction", label: "Monitoring",      icon: Bell },
              { key: "customer",    label: "Nasabah",         icon: UserX },
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
            placeholder="Search compliance..."
            className="w-64 h-10 pl-9 border-slate-200 rounded-lg shadow-sm text-sm"
          />
        </div>

        <Select defaultValue="all">
          <SelectTrigger className="h-10 w-[180px] bg-white border-slate-200 text-slate-700 font-semibold rounded-lg ml-2 hover:bg-slate-50">
            <SelectValue placeholder="Semua Regulasi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Regulasi</SelectItem>
            <SelectItem value="pojk">POJK</SelectItem>
            <SelectItem value="ojk">OJK</SelectItem>
            <SelectItem value="bi">BI</SelectItem>
            <SelectItem value="internal">Internal</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="h-10 w-[140px] bg-white border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50">
            <SelectValue placeholder="Prioritas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
          </SelectContent>
        </Select>

        <Link href="/compliance/create">
          <Button variant="secondary" className="h-10 px-6 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors ml-auto">
            Add Obligation
          </Button>
        </Link>
      </div>

      {/* ── Compliance Table ── */}
      <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-xl overflow-hidden">
        <CardContent className="p-0">
          {activeTab === "checklist" && (
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">REF ID</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">KEWAJIBAN</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">DEADLINE</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-center">PILAR</TableHead>
                  <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-right">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {COMPLIANCE_DATA.slice(0, 10).map((item, i) => (
                  <TableRow key={item.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="py-4 px-6 text-[13px] text-slate-500 font-mono font-bold">
                      {item.id}
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors cursor-pointer leading-tight">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">{item.regulation}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                      <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[13px]">
                        <Clock size={14} className="text-slate-300" />
                        {item.deadline}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-4 text-center">
                      <div className="inline-flex items-center justify-center p-1.5 bg-blue-50 text-blue-700 rounded-md font-bold text-[11px] min-w-[70px] border border-blue-100 uppercase tracking-widest">
                        {item.category}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                         <span className={`text-[12px] font-bold uppercase ${
                           item.status === 'Compliant' ? 'text-emerald-600' : 
                           item.status === 'Non-Compliant' ? 'text-rose-600' : 'text-amber-600'
                         }`}>
                           ● {item.status}
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

          {activeTab === "transaction" && (
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">REF & DATE</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">NASABAH / TRX</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-right">AMOUNT</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-center">RISK LEVEL</TableHead>
                  <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-right">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TRANSACTION_ALERTS.map((alert) => (
                  <TableRow key={alert.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="py-4 px-6">
                       <div className="flex flex-col">
                         <span className="text-[11px] font-bold text-blue-500 uppercase">{alert.id}</span>
                         <span className="text-[13px] text-slate-500 font-medium">{alert.date} {alert.time}</span>
                       </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                       <div className="flex flex-col">
                         <span className="text-[14px] font-bold text-slate-800">{alert.nasabahName}</span>
                         <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{alert.type} @ {alert.branch}</span>
                       </div>
                    </TableCell>
                    <TableCell className="py-4 px-4 text-right">
                       <span className="text-[15px] font-black text-slate-900">Rp {alert.amount.toLocaleString()}</span>
                    </TableCell>
                    <TableCell className="py-4 px-4 text-center">
                       <div className={`inline-flex px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                         alert.riskLevel === 'Critical' ? 'bg-rose-600 text-white' :
                         alert.riskLevel === 'High' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                         'bg-amber-50 text-amber-600 border border-amber-100'
                       }`}>
                         {alert.riskLevel}
                       </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right">
                       <span className="text-[12px] font-bold text-slate-400 uppercase">{alert.status}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {activeTab === "customer" && (
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-slate-100 hover:bg-transparent">
                  <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">CUSTOMER NAME</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">SEGMENT</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">COMPLETENESS</TableHead>
                  <TableHead className="py-4 px-4 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14">MISSING DATA</TableHead>
                  <TableHead className="py-4 px-6 text-[12px] font-bold uppercase tracking-wider text-slate-400 h-14 text-right">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CUSTOMER_DATA.map((customer) => (
                  <TableRow key={customer.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="py-4 px-6">
                       <div className="flex flex-col">
                         <span className="text-[14px] font-bold text-slate-800">{customer.name}</span>
                         <span className="text-[10px] text-slate-400 font-bold uppercase">{customer.id}</span>
                       </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                       <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase text-slate-500 w-fit">
                         {customer.segment}
                       </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                       <div className="w-24 space-y-1">
                          <div className="flex justify-between text-[10px] font-black text-slate-400">
                             <span>{customer.completeness}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                             <div 
                               className={`h-full transition-all duration-500 ${
                                 customer.completeness === 100 ? 'bg-emerald-500' : 
                                 customer.completeness > 70 ? 'bg-blue-500' : 'bg-amber-500'
                               }`} 
                               style={{ width: `${customer.completeness}%` }}
                             />
                          </div>
                       </div>
                    </TableCell>
                    <TableCell className="py-4 px-4">
                       <span className="text-[12px] text-slate-400 font-medium">
                         {customer.missingFields.length > 0 ? `${customer.missingFields.length} Fields Missing` : "None"}
                       </span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right">
                       <div className={`inline-flex px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                         customer.status === 'Complete' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                         customer.status === 'Incomplete' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                         'bg-amber-50 text-amber-600 border-amber-100'
                       }`}>
                         {customer.status}
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
