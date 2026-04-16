"use client";

import React, { useState, useRef } from "react";
import {
  COMPLIANCE_DATA, TRANSACTION_ALERTS, CUSTOMER_DATA,
  type ComplianceItem, type TransactionAlert, type CustomerRecord,
} from "@/lib/data";
import {
  ShieldCheck, Search, Plus, Filter, FileText, Upload, CheckCircle2,
  XCircle, Clock, AlertTriangle, AlertCircle, Eye, MoreVertical,
  TrendingUp, Zap, UserX, ChevronDown, Bell, Building, User,
  BadgeAlert, Wifi, FileWarning, X,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

/* ─────────────────────────── HELPERS ─────────────────────────── */

type Tab = "checklist" | "transaction" | "customer";

const STATUS_CFG: Record<ComplianceItem["status"], { label: string; icon: React.ElementType; badge: string }> = {
  "Compliant":     { label: "✅ Compliant",    icon: CheckCircle2,  badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  "Non-Compliant": { label: "❌ Non-Compliant", icon: XCircle,       badge: "bg-rose-50 text-rose-700 border-rose-200" },
  "In Progress":   { label: "🔄 In Progress",   icon: Clock,         badge: "bg-blue-50 text-blue-700 border-blue-200" },
  "Overdue":       { label: "⚠️ Overdue",       icon: AlertTriangle, badge: "bg-amber-50 text-amber-800 border-amber-300" },
};

const CATEGORY_BADGE: Record<string, string> = {
  POJK:     "bg-amber-100 text-amber-800",
  Regulasi: "bg-rose-100 text-rose-700",
  Internal: "bg-blue-100 text-blue-700",
  OJK:      "bg-purple-100 text-purple-700",
  BI:       "bg-cyan-100 text-cyan-700",
};

const PRIORITY_COLOR: Record<string, string> = {
  Critical: "bg-rose-600 text-white",
  High:     "bg-rose-100 text-rose-700",
  Medium:   "bg-amber-100 text-amber-700",
  Low:      "bg-slate-100 text-slate-600",
};

const TRX_FLAG_CFG: Record<TransactionAlert["flagReason"], { label: string; color: string; icon: React.ElementType }> = {
  "Large Transaction":  { label: "Transaksi Besar",   color: "bg-rose-100 text-rose-700 border-rose-200",   icon: TrendingUp },
  "Suspicious Pattern": { label: "Pola Mencurigakan", color: "bg-purple-100 text-purple-700 border-purple-200", icon: Zap },
  "Blacklist Match":    { label: "Match Blacklist",    color: "bg-rose-600 text-white border-rose-700",       icon: BadgeAlert },
  "Rapid Succession":   { label: "Transaksi Cepat",   color: "bg-amber-100 text-amber-800 border-amber-300", icon: Wifi },
};

const TRX_STATUS_CFG: Record<TransactionAlert["status"], { label: string; color: string }> = {
  "Unreviewed":       { label: "Belum Direview",    color: "bg-rose-50 text-rose-700 border-rose-200" },
  "Under Review":     { label: "Sedang Direview",   color: "bg-amber-50 text-amber-800 border-amber-300" },
  "Reported to PPATK":{ label: "Dilaporkan PPATK",  color: "bg-blue-50 text-blue-700 border-blue-200" },
  "Cleared":          { label: "Bersih / Cleared",  color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

const CUST_STATUS_CFG: Record<CustomerRecord["status"], { icon: React.ElementType; badge: string }> = {
  "Complete":          { icon: CheckCircle2,  badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  "Incomplete":        { icon: XCircle,       badge: "bg-rose-50 text-rose-700 border-rose-200" },
  "Needs Verification":{ icon: AlertCircle,   badge: "bg-amber-50 text-amber-800 border-amber-300" },
};

const SEGMENT_COLOR: Record<string, string> = {
  Retail:   "bg-blue-100 text-blue-700",
  Korporat: "bg-purple-100 text-purple-700",
  UMKM:     "bg-amber-100 text-amber-700",
  Premium:  "bg-emerald-100 text-emerald-700",
};

function formatRupiah(v: number) {
  if (v >= 1_000_000_000) return `Rp ${(v / 1_000_000_000).toFixed(1)} M`;
  if (v >= 1_000_000)     return `Rp ${(v / 1_000_000).toFixed(0)} Jt`;
  return `Rp ${v.toLocaleString("id-ID")}`;
}

/* ─────────────────────────── UPLOAD MODAL ─────────────────────────── */
function UploadModal({ item, onClose }: { item: ComplianceItem; onClose: () => void }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">{item.id}</p>
            <h3 className="text-sm font-black text-slate-800 leading-tight mt-0.5">{item.name}</h3>
          </div>
          <button onClick={onClose} className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Existing evidence */}
        {item.evidence && (
          <div className="mx-5 mt-4 flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
            <FileText size={16} className="text-emerald-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Bukti Saat Ini</p>
              <p className="text-xs font-mono text-emerald-600 truncate">{item.evidence}</p>
            </div>
            <Button size="sm" variant="outline" className="h-7 text-[9px] font-black border-emerald-300 text-emerald-700 hover:bg-emerald-100 shrink-0">
              <Eye size={11} className="mr-1" /> LIHAT
            </Button>
          </div>
        )}

        {/* Drop zone */}
        <div className="p-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">
            {item.evidence ? "Ganti" : "Upload"} Dokumen Bukti
          </p>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-all duration-200 ${
              dragging ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.xlsx,.jpg,.png"
              onChange={(e) => { if (e.target.files?.[0]) setFile(e.target.files[0]); }}
            />
            {file ? (
              <>
                <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <FileText size={22} className="text-blue-500" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-black text-slate-800">{file.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </>
            ) : (
              <>
                <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Upload size={22} className="text-slate-400" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-600">Drag & drop atau klik untuk pilih file</p>
                  <p className="text-[10px] text-slate-400 mt-1">PDF, DOC, XLSX, JPG, PNG (maks. 10 MB)</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2 px-5 pb-5">
          <Button variant="outline" onClick={onClose} className="flex-1 text-[10px] h-9 font-black border-slate-200 text-slate-500">
            BATAL
          </Button>
          <Button
            disabled={!file}
            className="flex-1 text-[10px] h-9 font-black bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40"
            onClick={() => { alert(`File "${file?.name}" berhasil diunggah!`); onClose(); }}
          >
            <Upload size={13} className="mr-1.5" /> SIMPAN BUKTI
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── MAIN PAGE ─────────────────────────── */
export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState<Tab>("checklist");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [uploadItem, setUploadItem] = useState<ComplianceItem | null>(null);
  const [trxFilter, setTrxFilter] = useState("Semua");
  const [custFilter, setCustFilter] = useState("Semua");

  /* ── Checklist filters ── */
  const categories = ["Semua", ...Array.from(new Set(COMPLIANCE_DATA.map(c => c.category)))];
  const statuses   = ["Semua", "Compliant", "Non-Compliant", "In Progress", "Overdue"];

  const filteredCompliance = COMPLIANCE_DATA.filter(c =>
    (catFilter === "Semua" || c.category === catFilter) &&
    (statusFilter === "Semua" || c.status === statusFilter) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.id.includes(search) || c.regulation.toLowerCase().includes(search.toLowerCase()))
  );

  const complianceSummary = {
    total:         COMPLIANCE_DATA.length,
    compliant:     COMPLIANCE_DATA.filter(c => c.status === "Compliant").length,
    nonCompliant:  COMPLIANCE_DATA.filter(c => c.status === "Non-Compliant").length,
    inProgress:    COMPLIANCE_DATA.filter(c => c.status === "In Progress").length,
    overdue:       COMPLIANCE_DATA.filter(c => c.status === "Overdue").length,
  };
  const complianceRate = Math.round((complianceSummary.compliant / complianceSummary.total) * 100);

  /* ── Transaction filters ── */
  const trxStatuses = ["Semua", "Unreviewed", "Under Review", "Reported to PPATK", "Cleared"];
  const filteredTrx = TRANSACTION_ALERTS.filter(t =>
    trxFilter === "Semua" || t.status === trxFilter
  );

  const trxSummary = {
    unreviewed:  TRANSACTION_ALERTS.filter(t => t.status === "Unreviewed").length,
    underReview: TRANSACTION_ALERTS.filter(t => t.status === "Under Review").length,
    reported:    TRANSACTION_ALERTS.filter(t => t.status === "Reported to PPATK").length,
    cleared:     TRANSACTION_ALERTS.filter(t => t.status === "Cleared").length,
  };

  /* ── Customer filters ── */
  const custStatuses = ["Semua", "Complete", "Incomplete", "Needs Verification"];
  const filteredCust = CUSTOMER_DATA.filter(c =>
    custFilter === "Semua" || c.status === custFilter
  );

  const custSummary = {
    complete:    CUSTOMER_DATA.filter(c => c.status === "Complete").length,
    incomplete:  CUSTOMER_DATA.filter(c => c.status === "Incomplete").length,
    needsVerif:  CUSTOMER_DATA.filter(c => c.status === "Needs Verification").length,
    highRisk:    CUSTOMER_DATA.filter(c => c.riskFlag).length,
  };

  return (
    <>
      {uploadItem && <UploadModal item={uploadItem} onClose={() => setUploadItem(null)} />}

      <div className="space-y-6 animate-in fade-in duration-500">
        {/* ── Header ── */}
        <div className="flex justify-between items-center bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
          <header>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-200">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-800 uppercase leading-none">Compliance Center</h2>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1.5 leading-none italic">
                  POJK Checklist · Transaction Monitoring · Data Nasabah
                </p>
              </div>
            </div>
          </header>
          <div className="flex gap-2">
            <Button variant="outline" className="text-[10px] h-9 border-slate-200 text-slate-500 font-bold hover:bg-slate-50">
              <Filter size={13} className="mr-2" /> FILTER
            </Button>
            <Button className="text-[10px] h-9 bg-blue-600 hover:bg-blue-700 font-bold text-white shadow-lg shadow-blue-500/20">
              <Plus size={13} className="mr-2" /> TAMBAH KEWAJIBAN
            </Button>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
          {([
            { key: "checklist",   label: "POJK Checklist",          icon: ShieldCheck },
            { key: "transaction", label: "Monitoring Transaksi",     icon: Bell },
            { key: "customer",    label: "Kelengkapan Data Nasabah", icon: UserX },
          ] as { key: Tab; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all duration-200 ${
                activeTab === key ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <Icon size={13} />
              {label}
              {key === "transaction" && trxSummary.unreviewed > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center">
                  {trxSummary.unreviewed}
                </span>
              )}
              {key === "customer" && custSummary.highRisk > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center justify-center">
                  {custSummary.highRisk}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ══════════════════════════ POJK CHECKLIST TAB ══════════════════════════ */}
        {activeTab === "checklist" && (
          <div className="space-y-5">
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-5">
              <Card className="md:col-span-1 bg-white border-slate-200 shadow-sm overflow-hidden">
                <div className="h-1 w-full bg-blue-600" />
                <CardContent className="p-4 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Compliance Rate</p>
                  <h3 className="text-3xl font-black text-blue-600 leading-none mt-1">{complianceRate}%</h3>
                </CardContent>
              </Card>
              {[
                { label: "Compliant",     value: complianceSummary.compliant,    border: "#10b981" },
                { label: "Non-Compliant", value: complianceSummary.nonCompliant, border: "#e11d48" },
                { label: "In Progress",   value: complianceSummary.inProgress,   border: "#3b82f6" },
                { label: "Overdue",       value: complianceSummary.overdue,      border: "#f59e0b" },
              ].map(({ label, value, border }) => (
                <Card key={label} className="bg-white border-slate-200 shadow-sm overflow-hidden">
                  <div className="h-1 w-full" style={{ backgroundColor: border }} />
                  <CardContent className="p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
                    <h3 className="text-2xl font-black text-slate-800 leading-none mt-1">{value}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap items-center">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  className="h-9 pl-10 bg-white border-slate-200 text-xs placeholder:text-slate-400"
                  placeholder="Cari nama kewajiban, ID, atau nomor regulasi..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setCatFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                      catFilter === cat ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                    }`}>{cat}</button>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap">
                {statuses.map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                      statusFilter === s ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                    }`}>{s}</button>
                ))}
              </div>
            </div>

            {/* Table */}
            <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/80">
                    <TableRow className="border-slate-100">
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 pl-6 w-8">#</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Nama Kewajiban</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Kategori</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Prioritas</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Status</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">PIC</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Deadline</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-right pr-6">Bukti Dokumen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompliance.map((item, idx) => {
                      const sCfg = STATUS_CFG[item.status];
                      const isOverdue = item.status === "Overdue";
                      return (
                        <TableRow key={item.id} className={`border-slate-50 transition-colors group ${isOverdue ? "bg-amber-50/40" : "hover:bg-slate-50/50"}`}>
                          <TableCell className="pl-6 text-[10px] font-bold text-slate-300">{idx + 1}</TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">{item.id}</span>
                                {isOverdue && <AlertTriangle size={11} className="text-amber-500" />}
                              </div>
                              <span className="text-xs font-black text-slate-800 group-hover:text-blue-600 transition-colors">{item.name}</span>
                              <span className="text-[9px] font-mono text-slate-400">{item.regulation}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${CATEGORY_BADGE[item.category] ?? "bg-slate-100 text-slate-600"}`}>
                              {item.category}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${PRIORITY_COLOR[item.priority]}`}>
                              {item.priority}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black uppercase border ${sCfg.badge}`}>
                              {sCfg.label}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                <User size={11} className="text-slate-400" />
                              </div>
                              <span className="text-[10px] font-bold text-slate-600">{item.pic}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`text-[10px] font-mono font-bold ${isOverdue ? "text-amber-700" : "text-slate-500"}`}>
                              {item.deadline}
                            </span>
                          </TableCell>
                          <TableCell className="text-right pr-6">
                            <button
                              onClick={() => setUploadItem(item)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase border transition-all duration-150 ${
                                item.evidence
                                  ? "border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                                  : "border-blue-200 text-blue-700 bg-blue-50 hover:bg-blue-100"
                              }`}
                            >
                              {item.evidence ? (
                                <><FileText size={11} /> LIHAT / GANTI</>
                              ) : (
                                <><Upload size={11} /> UPLOAD</>
                              )}
                            </button>
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

        {/* ══════════════════════════ TRANSACTION MONITORING TAB ══════════════════════════ */}
        {activeTab === "transaction" && (
          <div className="space-y-5">
            {/* Alert banner */}
            {trxSummary.unreviewed > 0 && (
              <div className="flex items-center gap-4 p-4 bg-rose-50 border border-rose-200 rounded-xl">
                <div className="h-10 w-10 rounded-xl bg-rose-600 flex items-center justify-center shrink-0 animate-pulse">
                  <Bell size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-black text-rose-800 uppercase tracking-tight">
                    🔴 {trxSummary.unreviewed} Transaksi Besar Mendadak Belum Direview
                  </p>
                  <p className="text-[10px] text-rose-600 font-medium mt-0.5">
                    Sistem mendeteksi transaksi melebihi ambang batas Rp500 juta yang memerlukan tindakan segera.
                  </p>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              {[
                { label: "Belum Direview",  value: trxSummary.unreviewed,  icon: AlertCircle, colorBg: "bg-rose-50",    colorTxt: "text-rose-600" },
                { label: "Sedang Direview", value: trxSummary.underReview, icon: Eye,         colorBg: "bg-amber-50",   colorTxt: "text-amber-600" },
                { label: "Dilaporkan PPATK",value: trxSummary.reported,    icon: FileWarning, colorBg: "bg-blue-50",    colorTxt: "text-blue-600" },
                { label: "Cleared",         value: trxSummary.cleared,     icon: CheckCircle2,colorBg: "bg-emerald-50", colorTxt: "text-emerald-600" },
              ].map(s => (
                <Card key={s.label} className="bg-white border-slate-200 shadow-sm">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${s.colorBg} ${s.colorTxt}`}><s.icon size={18} /></div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
                      <h3 className="text-2xl font-black text-slate-800 leading-none">{s.value}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Filter */}
            <div className="flex gap-2 flex-wrap">
              {trxStatuses.map(s => (
                <button key={s} onClick={() => setTrxFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                    trxFilter === s ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                  }`}>{s}</button>
              ))}
            </div>

            {/* Transaction table */}
            <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-700">Monitoring Transaksi Besar & Mencurigakan</CardTitle>
                <CardDescription className="text-[10px] font-bold text-slate-400">Sistem otomatis menandai transaksi yang melebihi threshold atau terdeteksi pola mencurigakan</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/80">
                    <TableRow className="border-slate-100">
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 pl-6">ID & Nasabah</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Jenis & Channel</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Jumlah</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Flag Alasan</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Waktu & Cabang</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Catatan</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Status</TableHead>
                      <TableHead className="pr-6 text-right" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrx.map(trx => {
                      const flagCfg = TRX_FLAG_CFG[trx.flagReason];
                      const stsCfg = TRX_STATUS_CFG[trx.status];
                      const FlagIcon = flagCfg.icon;
                      const isCritical = trx.riskLevel === "Critical";
                      return (
                        <TableRow key={trx.id} className={`border-slate-50 transition-colors ${isCritical && trx.status === "Unreviewed" ? "bg-rose-50/30" : "hover:bg-slate-50/50"}`}>
                          <TableCell className="pl-6">
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest">{trx.id}</span>
                                {isCritical && <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />}
                              </div>
                              <span className="text-xs font-black text-slate-800">{trx.nasabahName}</span>
                              <span className="text-[9px] font-mono text-slate-400">{trx.nasabahId}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[10px] font-black text-slate-700 uppercase">{trx.type}</span>
                              <span className="text-[9px] text-slate-400 font-bold">{trx.channel}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-sm font-black text-slate-900">{formatRupiah(trx.amount)}</span>
                              <span className="text-[9px] text-slate-400 font-bold">Threshold: {formatRupiah(trx.threshold)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black uppercase border ${flagCfg.color}`}>
                              <FlagIcon size={10} />
                              {flagCfg.label}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[10px] font-mono font-bold text-slate-700">{trx.date} {trx.time}</span>
                              <span className="text-[9px] text-slate-400 font-bold">{trx.branch}</span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[200px]">
                            <p className="text-[10px] text-slate-500 font-medium leading-snug">{trx.notes}</p>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex px-2 py-1 rounded-lg text-[9px] font-black uppercase border ${stsCfg.color}`}>
                              {stsCfg.label}
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

        {/* ══════════════════════════ CUSTOMER DATA TAB ══════════════════════════ */}
        {activeTab === "customer" && (
          <div className="space-y-5">
            {/* Alert banner */}
            {custSummary.highRisk > 0 && (
              <div className="flex items-center gap-4 p-4 bg-amber-50 border border-amber-300 rounded-xl">
                <div className="h-10 w-10 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                  <FileWarning size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-black text-amber-900 uppercase tracking-tight">
                    ⚠️ {custSummary.highRisk} Nasabah Memiliki Data Tidak Lengkap Berisiko Tinggi
                  </p>
                  <p className="text-[10px] text-amber-700 font-medium mt-0.5">
                    Sistem otomatis menandai nasabah dengan data kritis yang belum dilengkapi. Segera lakukan pemutakhiran data.
                  </p>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              {[
                { label: "Data Lengkap",         value: custSummary.complete,   icon: CheckCircle2, colorBg: "bg-emerald-50", colorTxt: "text-emerald-600" },
                { label: "Data Tidak Lengkap",   value: custSummary.incomplete, icon: XCircle,      colorBg: "bg-rose-50",    colorTxt: "text-rose-600" },
                { label: "Perlu Verifikasi",      value: custSummary.needsVerif, icon: AlertCircle,  colorBg: "bg-amber-50",   colorTxt: "text-amber-600" },
                { label: "Flag Risiko Tinggi",   value: custSummary.highRisk,   icon: BadgeAlert,   colorBg: "bg-rose-100",   colorTxt: "text-rose-700" },
              ].map(s => (
                <Card key={s.label} className="bg-white border-slate-200 shadow-sm">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${s.colorBg} ${s.colorTxt}`}><s.icon size={18} /></div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
                      <h3 className="text-2xl font-black text-slate-800 leading-none">{s.value}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Filter */}
            <div className="flex gap-2 flex-wrap">
              {custStatuses.map(s => (
                <button key={s} onClick={() => setCustFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                    custFilter === s ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                  }`}>{s}</button>
              ))}
            </div>

            {/* Customer table */}
            <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100 py-4">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-700">Kelengkapan Data Nasabah</CardTitle>
                <CardDescription className="text-[10px] font-bold text-slate-400">Sistem otomatis menandai data nasabah yang tidak lengkap atau memerlukan pemutakhiran</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/80">
                    <TableRow className="border-slate-100">
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 pl-6">ID & Nama Nasabah</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Segmen</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Kelengkapan Data</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Field Belum Lengkap</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Update Terakhir</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cabang</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Status</TableHead>
                      <TableHead className="pr-6 text-right" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCust.map(cust => {
                      const stsCfg = CUST_STATUS_CFG[cust.status];
                      const StatusIcon = stsCfg.icon;
                      const isHighRisk = cust.riskFlag;
                      return (
                        <TableRow key={cust.id} className={`border-slate-50 transition-colors ${isHighRisk ? "bg-rose-50/20" : "hover:bg-slate-50/50"}`}>
                          <TableCell className="pl-6">
                            <div className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{cust.id}</span>
                                {isHighRisk && (
                                  <span className="inline-flex items-center gap-1 text-[8px] font-black text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded-full">
                                    <BadgeAlert size={8} /> HIGH RISK
                                  </span>
                                )}
                              </div>
                              <span className="text-xs font-black text-slate-800">{cust.name}</span>
                              <span className="text-[9px] text-slate-400 font-bold">{cust.accountType}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${SEGMENT_COLOR[cust.segment]}`}>
                              {cust.segment}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1 w-28">
                              <div className="flex justify-between">
                                <span className="text-[10px] font-black text-slate-700">{cust.completeness}%</span>
                              </div>
                              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    cust.completeness === 100 ? "bg-emerald-500" :
                                    cust.completeness >= 80   ? "bg-blue-500" :
                                    cust.completeness >= 50   ? "bg-amber-400" : "bg-rose-500"
                                  }`}
                                  style={{ width: `${cust.completeness}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[220px]">
                            {cust.missingFields.length === 0 ? (
                              <span className="text-[10px] text-emerald-600 font-black">✅ Lengkap</span>
                            ) : (
                              <div className="flex flex-wrap gap-1">
                                {cust.missingFields.map(f => (
                                  <span key={f} className="inline-flex items-center gap-1 text-[8px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded-full">
                                    <X size={7} /> {f}
                                  </span>
                                ))}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="text-[10px] font-mono text-slate-500 font-bold">{cust.lastUpdated}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <Building size={11} className="text-slate-400" />
                              <span className="text-[10px] font-bold text-slate-600">{cust.branch}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-black uppercase border ${stsCfg.badge}`}>
                              <StatusIcon size={10} />
                              {cust.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right pr-6">
                            <Button variant="outline" size="sm" className="h-7 text-[9px] font-black border-blue-200 text-blue-600 hover:bg-blue-50">
                              UPDATE
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
    </>
  );
}
