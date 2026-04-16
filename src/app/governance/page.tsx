"use client";

import { useState } from "react";
import { GOVERNANCE_REPORTS, AUDIT_TRAIL, RACI_MATRIX, MEETING_MINUTES, KPI_DATA } from "@/lib/data";
import type { MeetingMinute, KpiItem } from "@/lib/data";
import { 
  Building,
  Calendar,
  FileText,
  Users,
  CheckCircle2,
  Clock,
  Activity,
  ArrowRight,
  MoreVertical,
  ExternalLink,
  ShieldCheck,
  Network,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronRight,
  Target,
  AlertCircle,
  User,
  ClipboardList,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

/* ── Types ── */
type Tab = "schedule" | "raci" | "meeting" | "kpi";

/* ── RACI color helper ── */
const RACI_STYLE: Record<string, { bg: string; text: string; title: string }> = {
  R: { bg: "bg-blue-600",    text: "text-white",        title: "Responsible — Pelaksana" },
  A: { bg: "bg-rose-600",    text: "text-white",        title: "Accountable — Penanggung Jawab" },
  C: { bg: "bg-amber-400",   text: "text-amber-900",    title: "Consulted — Dikonsultasi" },
  I: { bg: "bg-emerald-100", text: "text-emerald-800",  title: "Informed — Diinformasikan" },
  "-": { bg: "bg-slate-100", text: "text-slate-400",    title: "Tidak Terlibat" },
};

const CATEGORY_COLOR: Record<string, string> = {
  Risk:       "bg-rose-50 text-rose-700 border-rose-200",
  Governance: "bg-blue-50 text-blue-700 border-blue-200",
  Compliance: "bg-amber-50 text-amber-700 border-amber-200",
  Audit:      "bg-purple-50 text-purple-700 border-purple-200",
  IT:         "bg-cyan-50 text-cyan-700 border-cyan-200",
  Finance:    "bg-emerald-50 text-emerald-700 border-emerald-200",
  HR:         "bg-orange-50 text-orange-700 border-orange-200",
};

/* ── Meeting status ── */
const MTG_STATUS: Record<string, { color: string; label: string }> = {
  "Final":            { color: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Final" },
  "Pending Approval": { color: "bg-amber-50 text-amber-700 border-amber-200",       label: "Pending Approval" },
  "Draft":            { color: "bg-slate-50 text-slate-500 border-slate-200",       label: "Draft" },
};

const MTG_TYPE: Record<string, { color: string }> = {
  Direksi:   { color: "bg-blue-600" },
  Komisaris: { color: "bg-rose-600" },
  Board:     { color: "bg-purple-600" },
  Komite:    { color: "bg-amber-500" },
};

/* ── KPI helpers ── */
const KPI_STATUS_STYLE: Record<string, string> = {
  "Achieved":  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "On Track":  "bg-blue-50 text-blue-700 border-blue-200",
  "At Risk":   "bg-amber-50 text-amber-700 border-amber-200",
  "Off Track": "bg-rose-50 text-rose-700 border-rose-200",
};

const KPI_CATEGORY_STYLE: Record<string, string> = {
  Financial:   "bg-blue-100 text-blue-700",
  Operasional: "bg-cyan-100 text-cyan-700",
  Risk:        "bg-rose-100 text-rose-700",
  Governance:  "bg-purple-100 text-purple-700",
  Customer:    "bg-amber-100 text-amber-700",
};

function KpiProgress({ item }: { item: KpiItem }) {
  const pct = Math.min(100, Math.round((item.actual / item.target) * 100));
  const isOver = item.actual > item.target;
  // For NPL & BOPO: lower is better
  const lowerIsBetter = ["KPI-003", "KPI-011", "KPI-012"].includes(item.id);
  const achieved = lowerIsBetter ? item.actual <= item.target : item.actual >= item.target;

  return (
    <div className="space-y-1 w-32">
      <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase">
        <span>Aktual</span>
        <span>{item.actual}{item.unit}</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${achieved ? "bg-emerald-500" : pct >= 85 ? "bg-amber-400" : "bg-rose-500"}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
      <div className="text-[9px] text-slate-400 font-bold">
        Target: {item.target}{item.unit}
      </div>
    </div>
  );
}

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState<Tab>("schedule");
  const [expandedMtg, setExpandedMtg] = useState<string | null>(null);
  const [kpiFilter, setKpiFilter] = useState<string>("All");

  const kpiCategories = ["All", "Financial", "Operasional", "Risk", "Governance", "Customer"];
  const filteredKpi = kpiFilter === "All" ? KPI_DATA : KPI_DATA.filter(k => k.category === kpiFilter);

  const kpiSummary = {
    achieved: KPI_DATA.filter(k => k.status === "Achieved").length,
    onTrack:  KPI_DATA.filter(k => k.status === "On Track").length,
    atRisk:   KPI_DATA.filter(k => k.status === "At Risk").length,
    offTrack: KPI_DATA.filter(k => k.status === "Off Track").length,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* ── Header ── */}
      <div className="flex justify-between items-center bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
        <header>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-200">
              <Building size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-800 uppercase leading-none">Corporate Governance</h2>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1.5 leading-none italic">
                Structure, Accountability, Meetings & Performance Tracking
              </p>
            </div>
          </div>
        </header>
        <div className="flex gap-2">
          <Button variant="outline" className="text-[10px] h-9 border-slate-200 text-slate-500 font-bold hover:bg-slate-50">
            <FileText size={14} className="mr-2" />
            CHARTER
          </Button>
          <Button variant="default" className="text-[10px] h-9 bg-blue-600 hover:bg-blue-700 font-bold text-white shadow-lg shadow-blue-500/20">
            <Calendar size={14} className="mr-2" />
            JADWAL RAPAT
          </Button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {([
          { key: "schedule", label: "Governance Schedule", icon: Calendar },
          { key: "raci",     label: "RACI Matrix",         icon: Network },
          { key: "meeting",  label: "Notulensi Rapat",     icon: ClipboardList },
          { key: "kpi",      label: "Performance KPI",     icon: BarChart3 },
        ] as { key: Tab; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all duration-200 ${
              activeTab === key
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════ SCHEDULE TAB ══════════════════════════════ */}
      {activeTab === "schedule" && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Board Meetings */}
          <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-700">Governance Schedule</CardTitle>
                <CardDescription className="text-[10px] font-bold text-slate-400">Jadwal rapat direksi, komisaris & pemegang saham</CardDescription>
              </div>
              <Users size={16} className="text-blue-500" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {GOVERNANCE_REPORTS.map((report) => (
                  <div key={report.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${
                        report.status === "Completed" ? "bg-emerald-50 text-emerald-600" :
                        report.status === "Scheduled" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                      }`}>
                        {report.status === "Completed" ? <CheckCircle2 size={18} /> :
                         report.status === "Scheduled" ? <Calendar size={18} /> : <Clock size={18} />}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{report.type}</p>
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">{report.title}</h4>
                        <p className="text-[10px] font-mono text-slate-500 mt-0.5">{report.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={`text-[8px] font-black border-none px-2 h-5 rounded-md ${
                        report.status === "Completed" ? "bg-emerald-50 text-emerald-600" :
                        report.status === "Scheduled" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                      }`}>
                        {report.status.toUpperCase()}
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-300">
                        <MoreVertical size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-center">
                <Button variant="link" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800">
                  LIHAT KALENDER GOVERNANCE <ArrowRight size={14} className="ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Accountability Log */}
          <Card className="bg-white border-slate-200 shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-700">Accountability Log</CardTitle>
                <CardDescription className="text-[10px] font-bold text-slate-400">Aksi governance terbaru</CardDescription>
              </div>
              <Activity size={16} className="text-slate-400" />
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-6">
                {AUDIT_TRAIL.map((log) => (
                  <div key={log.id} className="relative pl-6 border-l-2 border-slate-100 pb-1">
                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-white border-2 border-blue-500 shadow-sm" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{log.timestamp}</span>
                      <p className="text-xs font-black text-slate-800 uppercase tracking-tighter">{log.action} BY {log.editBy}</p>
                      <p className="text-[10px] text-slate-500 font-medium italic">Module: {log.module}</p>
                      <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">
                        <span>VERIFY HASH ORIGIN</span>
                        <ExternalLink size={10} />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <Button variant="outline" className="w-full text-[10px] h-9 font-black border-slate-200 text-slate-500 hover:bg-slate-50">
                    ACCESS SECURE AUDIT VAULT
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Stats */}
          <div className="lg:col-span-3 grid gap-4 md:grid-cols-3">
            {[
              { label: "Board Members",     value: "8",    icon: Users,       color: "blue" },
              { label: "Policies Approved", value: "100%", icon: ShieldCheck, color: "emerald" },
              { label: "Pending Sign-offs", value: "2",    icon: Clock,       color: "amber" },
            ].map((stat, i) => (
              <Card key={i} className="bg-white border-slate-200 shadow-sm">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600`}>
                    <stat.icon size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                    <h3 className="text-2xl font-black text-slate-800 leading-none">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════ RACI MATRIX TAB ══════════════════════════════ */}
      {activeTab === "raci" && (
        <div className="space-y-4">
          {/* Legend */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-4 flex flex-wrap gap-4 items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Legend:</span>
              {Object.entries(RACI_STYLE).filter(([k]) => k !== "-").map(([key, cfg]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className={`h-6 w-6 rounded flex items-center justify-center text-[11px] font-black ${cfg.bg} ${cfg.text}`}>{key}</span>
                  <span className="text-[10px] font-semibold text-slate-500">{cfg.title}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-700">RACI Matrix — Peran & Tanggung Jawab</CardTitle>
              <CardDescription className="text-[10px] font-bold text-slate-400">Pemetaan peran setiap fungsi organisasi terhadap proses GRC</CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/80">
                  <TableRow className="border-slate-100">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 pl-6 min-w-[220px]">Proses / Aktivitas</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Kategori</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center min-w-[80px]">Dirut</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center min-w-[80px]">D. Kom</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center min-w-[80px]">Risk Officer</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center min-w-[80px]">Compliance</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center min-w-[80px]">Int. Audit</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center min-w-[80px]">IT</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center min-w-[80px]">Finance</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center min-w-[80px]">HR</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {RACI_MATRIX.map((row) => (
                    <TableRow key={row.id} className="border-slate-50 hover:bg-slate-50/40 transition-colors">
                      <TableCell className="pl-6">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-slate-400 uppercase">{row.id}</span>
                          <span className="text-xs font-bold text-slate-800">{row.process}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded-md text-[8px] font-black uppercase border ${CATEGORY_COLOR[row.category] ?? "bg-slate-50 text-slate-500"}`}>
                          {row.category}
                        </span>
                      </TableCell>
                      {(["dirut", "dkom", "riskOfficer", "compliance", "internalAudit", "it", "finance", "hr"] as const).map((role) => {
                        const val = row[role];
                        const cfg = RACI_STYLE[val];
                        return (
                          <TableCell key={role} className="text-center">
                            <span
                              title={cfg.title}
                              className={`inline-flex h-7 w-7 mx-auto items-center justify-center rounded-lg text-[11px] font-black ${cfg.bg} ${cfg.text} cursor-default`}
                            >
                              {val}
                            </span>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ══════════════════════════════ MEETING MINUTES TAB ══════════════════════════════ */}
      {activeTab === "meeting" && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: "Total Rapat", value: MEETING_MINUTES.length,                                           color: "blue",    icon: Calendar },
              { label: "Final",       value: MEETING_MINUTES.filter(m => m.status === "Final").length,         color: "emerald", icon: CheckCircle2 },
              { label: "Pending",     value: MEETING_MINUTES.filter(m => m.status === "Pending Approval").length, color: "amber", icon: Clock },
              { label: "Draft",       value: MEETING_MINUTES.filter(m => m.status === "Draft").length,         color: "slate",   icon: FileText },
            ].map((stat) => (
              <Card key={stat.label} className="bg-white border-slate-200 shadow-sm">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                    <stat.icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                    <h3 className="text-2xl font-black text-slate-800 leading-none">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Meeting Cards */}
          <div className="space-y-3">
            {MEETING_MINUTES.map((mtg: MeetingMinute) => {
              const isExpanded = expandedMtg === mtg.id;
              const statusCfg = MTG_STATUS[mtg.status];
              const typeCfg = MTG_TYPE[mtg.type] ?? { color: "bg-slate-500" };
              return (
                <Card key={mtg.id} className="bg-white border-slate-200 shadow-sm overflow-hidden">
                  <div
                    className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50/50 transition-colors"
                    onClick={() => setExpandedMtg(isExpanded ? null : mtg.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-xl ${typeCfg.color} flex items-center justify-center text-white shrink-0`}>
                        <Users size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase">{mtg.id}</span>
                          <span className="text-[9px] font-bold text-slate-300">•</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase">{mtg.type}</span>
                        </div>
                        <h4 className="text-sm font-black text-slate-800">{mtg.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-mono text-slate-500">{mtg.date}</span>
                          <span className="text-[10px] text-slate-400">Pimpinan: {mtg.chairperson}</span>
                          <span className="text-[10px] text-slate-400">{mtg.attendees.length} peserta</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-lg text-[9px] font-black uppercase border ${statusCfg.color}`}>
                        {statusCfg.label}
                      </span>
                      {isExpanded ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-slate-100">
                      <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                        {/* Agenda */}
                        <div className="p-5">
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Agenda Rapat</h5>
                          <ol className="space-y-2">
                            {mtg.agenda.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-[9px] font-black text-blue-500 mt-0.5 shrink-0">{i + 1}.</span>
                                <span className="text-xs text-slate-600 font-medium">{item}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Decisions */}
                        <div className="p-5">
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Keputusan Rapat</h5>
                          <ul className="space-y-2">
                            {mtg.decisions.map((dec, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                                <span className="text-xs text-slate-600 font-medium">{dec}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 pt-3 border-t border-slate-100">
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Peserta</h5>
                            <div className="flex flex-wrap gap-1">
                              {mtg.attendees.map((a, i) => (
                                <span key={i} className="inline-flex items-center gap-1 text-[9px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                                  <User size={8} /> {a}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Action Items */}
                        <div className="p-5">
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Action Items</h5>
                          <div className="space-y-3">
                            {mtg.actionItems.map((ai, i) => (
                              <div key={i} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                                <p className="text-xs font-semibold text-slate-700 mb-2">{ai.item}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-bold text-blue-600 flex items-center gap-1">
                                    <User size={9} /> {ai.pic}
                                  </span>
                                  <span className="text-[9px] font-mono text-slate-400">{ai.deadline}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════ KPI TAB ══════════════════════════════ */}
      {activeTab === "kpi" && (
        <div className="space-y-6">
          {/* KPI Summary */}
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: "Tercapai",    value: kpiSummary.achieved, color: "emerald", icon: CheckCircle2 },
              { label: "On Track",   value: kpiSummary.onTrack,  color: "blue",    icon: Activity },
              { label: "Berisiko",   value: kpiSummary.atRisk,   color: "amber",   icon: AlertCircle },
              { label: "Off Track",  value: kpiSummary.offTrack, color: "rose",    icon: Target },
            ].map((stat) => (
              <Card key={stat.label} className="bg-white border-slate-200 shadow-sm">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                    <stat.icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                    <h3 className="text-2xl font-black text-slate-800 leading-none">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filter */}
          <div className="flex gap-2 flex-wrap">
            {kpiCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setKpiFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-150 border ${
                  kpiFilter === cat
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* KPI Table */}
          <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-700">Performance Tracking — KPI Strategis</CardTitle>
              <CardDescription className="text-[10px] font-bold text-slate-400">Monitoring KPI yang selaras dengan tujuan strategis perusahaan</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/80">
                  <TableRow className="border-slate-100">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 pl-6">Indikator KPI</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Kategori</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Progress</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tren</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Owner</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Periode</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredKpi.map((kpi) => (
                    <TableRow key={kpi.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="pl-6">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-slate-400 uppercase">{kpi.id}</span>
                          <span className="text-xs font-black text-slate-800">{kpi.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex px-2 py-0.5 rounded-md text-[8px] font-black uppercase ${KPI_CATEGORY_STYLE[kpi.category]}`}>
                          {kpi.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <KpiProgress item={kpi} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {kpi.trend === "up"     ? <TrendingUp size={14} className="text-emerald-500" /> :
                           kpi.trend === "down"   ? <TrendingDown size={14} className="text-rose-500" /> :
                                                    <Minus size={14} className="text-slate-400" />}
                          <span className={`text-[9px] font-black uppercase ${
                            kpi.trend === "up" ? "text-emerald-600" : kpi.trend === "down" ? "text-rose-600" : "text-slate-400"
                          }`}>{kpi.trend}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center">
                            <User size={10} className="text-slate-400" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-600">{kpi.owner}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-[10px] font-mono text-slate-500 font-bold">{kpi.period}</span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex px-2 py-1 rounded-lg text-[9px] font-black uppercase border ${KPI_STATUS_STYLE[kpi.status]}`}>
                          {kpi.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
