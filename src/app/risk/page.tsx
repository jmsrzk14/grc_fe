"use client";

import { useState } from "react";
import { RISK_REGISTER, RISK_LEVELS, MITIGATION_PLANS } from "@/lib/data";
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  MoreVertical,
  Activity,
  User,
  Target,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  ArrowRight,
  CalendarClock,
  Layers,
} from "lucide-react";
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

/* ── Helpers ── */
const LIKELIHOOD_COLOR: Record<string, string> = {
  Low:    "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  High:   "bg-rose-50 text-rose-700 border-rose-200",
};

const IMPACT_COLOR: Record<string, string> = {
  Low:      "text-emerald-600",
  Medium:   "text-amber-600",
  High:     "text-rose-500",
  Critical: "text-rose-700",
};

const IMPACT_ICON_COLOR: Record<string, string> = {
  Low:      "text-emerald-500",
  Medium:   "text-amber-500",
  High:     "text-rose-400",
  Critical: "text-rose-600",
};

const MITIGATION_STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  "Completed":   { label: "Selesai",       color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  "On Track":    { label: "On Track",      color: "bg-blue-50 text-blue-700 border-blue-200",         icon: Activity },
  "Delayed":     { label: "Terlambat",     color: "bg-rose-50 text-rose-700 border-rose-200",         icon: XCircle },
  "Not Started": { label: "Belum Mulai",   color: "bg-slate-50 text-slate-500 border-slate-200",      icon: Clock },
};

const PRIORITY_COLOR: Record<string, string> = {
  Critical: "bg-rose-600 text-white",
  High:     "bg-rose-100 text-rose-700",
  Medium:   "bg-amber-100 text-amber-700",
  Low:      "bg-emerald-100 text-emerald-700",
};

type Tab = "register" | "assessment" | "mitigation";

/* ── Heat-map cell ── */
const HEATMAP: Record<string, Record<string, { color: string; label: string }>> = {
  Low:    { Low: { color: "bg-emerald-100 border-emerald-200 text-emerald-800", label: "Rendah" }, Medium: { color: "bg-amber-100 border-amber-200 text-amber-800", label: "Rendah-Sedang" }, High: { color: "bg-amber-200 border-amber-300 text-amber-900", label: "Sedang" } },
  Medium: { Low: { color: "bg-amber-100 border-amber-200 text-amber-800", label: "Rendah-Sedang" }, Medium: { color: "bg-amber-200 border-amber-300 text-amber-900", label: "Sedang" }, High: { color: "bg-rose-200 border-rose-300 text-rose-900", label: "Tinggi" } },
  High:   { Low: { color: "bg-amber-200 border-amber-300 text-amber-900", label: "Sedang" }, Medium: { color: "bg-rose-200 border-rose-300 text-rose-900", label: "Tinggi" }, High: { color: "bg-rose-400 border-rose-500 text-white", label: "Kritis" } },
  Critical: { Low: { color: "bg-rose-200 border-rose-300 text-rose-900", label: "Tinggi" }, Medium: { color: "bg-rose-400 border-rose-500 text-white", label: "Kritis" }, High: { color: "bg-rose-600 border-rose-700 text-white", label: "Kritis" } },
};

export default function RiskPage() {
  const [activeTab, setActiveTab] = useState<Tab>("register");
  const [search, setSearch] = useState("");

  const filteredRisks = RISK_REGISTER.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase()) ||
    r.id.toLowerCase().includes(search.toLowerCase())
  );

  const mitigationStats = {
    completed:  MITIGATION_PLANS.filter(m => m.status === "Completed").length,
    onTrack:    MITIGATION_PLANS.filter(m => m.status === "On Track").length,
    delayed:    MITIGATION_PLANS.filter(m => m.status === "Delayed").length,
    notStarted: MITIGATION_PLANS.filter(m => m.status === "Not Started").length,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* ── Header ── */}
      <div className="flex justify-between items-center bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
        <header>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-600 rounded-lg text-white shadow-lg shadow-rose-200">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-800 uppercase letter-tighter leading-none">Risk Management</h2>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1.5 leading-none italic">
                Enterprise Risk Identification, Assessment & Mitigation
              </p>
            </div>
          </div>
        </header>
        <Button variant="default" className="text-[10px] h-9 bg-slate-900 hover:bg-slate-800 font-bold text-white shadow-lg shadow-slate-200">
          <Plus size={14} className="mr-2" />
          IDENTIFY NEW RISK
        </Button>
      </div>

      {/* ── Statistics ── */}
      <div className="grid gap-4 md:grid-cols-4">
        {RISK_LEVELS.map((level) => (
          <Card key={level.id} className="bg-white border-slate-200 shadow-sm overflow-hidden">
            <div className="h-1 w-full" style={{ backgroundColor: level.color }} />
            <CardContent className="p-5 flex flex-col gap-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{level.name} Risks</p>
              <h3 className="text-3xl font-black text-slate-800 leading-none">{level.count}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {([
          { key: "register",   label: "Risk Register",    icon: Layers },
          { key: "assessment", label: "Risk Assessment",  icon: Target },
          { key: "mitigation", label: "Mitigation Plan",  icon: CheckCircle2 },
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

      {/* ══════════════════════════════ RISK REGISTER TAB ══════════════════════════════ */}
      {activeTab === "register" && (
        <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/50 py-4">
            <div>
              <CardTitle className="text-lg text-slate-800 font-black uppercase tracking-tight leading-none">Risk Register</CardTitle>
              <CardDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Inventori risiko operasional, kredit, dan pasar</CardDescription>
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  className="h-9 w-[260px] pl-10 bg-white border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 rounded-lg"
                  placeholder="Cari risiko..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" className="h-9 w-9 p-0 border-slate-200">
                <Filter size={16} className="text-slate-400" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/80">
                <TableRow className="border-slate-100">
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 pl-6">ID & Judul Risiko</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Kategori</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Dampak (Impact)</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Kemungkinan (Likelihood)</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Status</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">PIC / Owner</TableHead>
                  <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Skor (I → R)</TableHead>
                  <TableHead className="text-right pr-6" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRisks.map((risk) => (
                  <TableRow key={risk.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="pl-6">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">{risk.id}</span>
                        <span className="text-xs font-black text-slate-800 uppercase group-hover:text-blue-600 transition-colors">{risk.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[9px] font-bold text-slate-500 border-slate-200 rounded-md">
                        {risk.category.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle size={13} className={IMPACT_ICON_COLOR[risk.impact]} />
                        <span className={`text-[10px] font-black uppercase ${IMPACT_COLOR[risk.impact]}`}>{risk.impact}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black uppercase border ${LIKELIHOOD_COLOR[risk.likelihood]}`}>
                        {risk.likelihood}
                      </span>
                    </TableCell>
                    <TableCell>
                      <p className={`text-[10px] font-bold ${risk.status === "Mitigated" ? "text-emerald-600" : "text-blue-600"}`}>
                        {risk.status === "Mitigated" ? "● MITIGATED" : "○ ACTIVE"}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center">
                          <User size={12} className="text-slate-400" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-600">{risk.owner}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-slate-800">{risk.inherentScore}</span>
                        <ArrowRight size={10} className="text-slate-300" />
                        <span className="text-[10px] font-black text-emerald-600">{risk.residualScore}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-300 hover:text-slate-600">
                        <MoreVertical size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* ══════════════════════════════ RISK ASSESSMENT TAB ══════════════════════════════ */}
      {activeTab === "assessment" && (
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Heat Map */}
          <Card className="lg:col-span-3 bg-white border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-700">Risk Heat Map</CardTitle>
              <CardDescription className="text-[10px] font-bold text-slate-400">Pemetaan dampak vs kemungkinan risiko</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {/* Y-axis label */}
              <div className="flex gap-4 items-end mb-3">
                <div className="w-20 shrink-0" />
                {["Low", "Medium", "High"].map(l => (
                  <div key={l} className="flex-1 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{l}</div>
                ))}
              </div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-20">← Likelihood →</div>
              {["Critical", "High", "Medium", "Low"].map(impact => (
                <div key={impact} className="flex gap-4 mb-3 items-center">
                  <div className="w-20 shrink-0 text-[10px] font-black text-slate-500 uppercase text-right pr-2">{impact}</div>
                  {["Low", "Medium", "High"].map(likelihood => {
                    const cell = HEATMAP[impact]?.[likelihood];
                    const risksInCell = RISK_REGISTER.filter(r => r.impact === impact && r.likelihood === likelihood);
                    return (
                      <div
                        key={likelihood}
                        className={`flex-1 h-16 rounded-lg border-2 flex flex-col items-center justify-center gap-1 transition-all ${cell?.color}`}
                      >
                        <span className="text-[8px] font-black uppercase tracking-wider opacity-70">{cell?.label}</span>
                        {risksInCell.length > 0 && (
                          <div className="flex flex-wrap gap-1 justify-center">
                            {risksInCell.map(r => (
                              <span key={r.id} className="text-[8px] font-bold bg-white/60 backdrop-blur px-1.5 py-0.5 rounded-full">{r.id}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 text-center ml-20">↑ Impact ↑</div>
            </CardContent>
          </Card>

          {/* Risk Details Card */}
          <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm overflow-hidden h-fit">
            <CardHeader className="bg-slate-50 border-b border-slate-100">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-700">Detail Penilaian Risiko</CardTitle>
              <CardDescription className="text-[10px] font-bold text-slate-400">Impact & Likelihood per risiko</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {RISK_REGISTER.map((risk) => (
                  <div key={risk.id} className="p-4 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">{risk.id}</span>
                        <p className="text-xs font-black text-slate-800 uppercase">{risk.title}</p>
                      </div>
                      <Badge variant="outline" className="text-[8px] font-bold text-slate-400 border-slate-200 shrink-0 ml-2">{risk.category}</Badge>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Dampak</span>
                        <span className={`text-[10px] font-black uppercase ${IMPACT_COLOR[risk.impact]}`}>{risk.impact}</span>
                      </div>
                      <div className="w-px bg-slate-100" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Kemungkinan</span>
                        <span className={`text-[10px] font-black uppercase ${LIKELIHOOD_COLOR[risk.likelihood]?.split(" ")[1]}`}>{risk.likelihood}</span>
                      </div>
                      <div className="w-px bg-slate-100" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Skor</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-black text-slate-800">{risk.inherentScore}</span>
                          <ArrowRight size={8} className="text-slate-300" />
                          <span className="text-[10px] font-black text-emerald-600">{risk.residualScore}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ══════════════════════════════ MITIGATION PLAN TAB ══════════════════════════════ */}
      {activeTab === "mitigation" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: "Selesai",      value: mitigationStats.completed,  color: "emerald", icon: CheckCircle2 },
              { label: "On Track",     value: mitigationStats.onTrack,    color: "blue",    icon: Activity },
              { label: "Terlambat",    value: mitigationStats.delayed,    color: "rose",    icon: AlertCircle },
              { label: "Belum Mulai",  value: mitigationStats.notStarted, color: "slate",   icon: Clock },
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

          {/* Mitigation Table */}
          <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 py-4">
              <CardTitle className="text-lg text-slate-800 font-black uppercase tracking-tight leading-none">Rencana Mitigasi</CardTitle>
              <CardDescription className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Tindakan perbaikan untuk setiap risiko yang teridentifikasi</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/80">
                  <TableRow className="border-slate-100">
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 pl-6">ID & Tindakan</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Risiko Terkait</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Prioritas</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">PIC</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tenggat</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Progress</TableHead>
                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Status</TableHead>
                    <TableHead className="text-right pr-6" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MITIGATION_PLANS.map((plan) => {
                    const statusCfg = MITIGATION_STATUS_CONFIG[plan.status];
                    const StatusIcon = statusCfg.icon;
                    return (
                      <TableRow key={plan.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors group">
                        <TableCell className="pl-6 max-w-[280px]">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest">{plan.id}</span>
                            <span className="text-xs font-semibold text-slate-700 leading-tight">{plan.action}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-blue-500">{plan.riskId}</span>
                            <span className="text-[10px] font-bold text-slate-600">{plan.riskTitle}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${PRIORITY_COLOR[plan.priority]}`}>
                            {plan.priority}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                              <User size={11} className="text-slate-400" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-600">{plan.pic}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <CalendarClock size={12} className="text-slate-400" />
                            <span className="text-[10px] font-mono font-bold text-slate-600">{plan.deadline}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 w-24">
                            <div className="flex justify-between">
                              <span className="text-[9px] font-black text-slate-500">{plan.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                  plan.status === "Completed" ? "bg-emerald-500" :
                                  plan.status === "On Track"  ? "bg-blue-500" :
                                  plan.status === "Delayed"   ? "bg-rose-500" : "bg-slate-300"
                                }`}
                                style={{ width: `${plan.progress}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black uppercase border ${statusCfg.color}`}>
                            <StatusIcon size={10} />
                            {statusCfg.label}
                          </span>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-300 hover:text-slate-600">
                            <MoreVertical size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
