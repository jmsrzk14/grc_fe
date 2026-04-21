"use client";

import React from "react";
import { Plus, Search, Filter, AppWindow, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HeaderTitle from "@/components/layout/HeaderTitle";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const APPS_DATA = [
  { id: "APP-001", name: "HRIS System", owner: "HR Department", type: "Internal", status: "Active", riskLevel: "Medium" },
  { id: "APP-002", name: "Core Banking", owner: "IT & Ops", type: "Core", status: "Active", riskLevel: "High" },
  { id: "APP-003", name: "Vendor Portal", owner: "Procurement", type: "External", status: "Maintenance", riskLevel: "Low" },
  { id: "APP-004", name: "Data Warehouse", owner: "Data Integration", type: "Infrastructure", status: "Active", riskLevel: "High" },
];

export default function ApplicationsPage() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const pageSize = 10;

  const filteredData = APPS_DATA.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.id.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(0, pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full px-2 pb-10">
      <HeaderTitle title="Aplikasi" />

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2 items-center">
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari ID atau Nama Aplikasi..."
              className="h-9 w-64 pl-9 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400"
            />
          </form>
          {filteredData.length > 0 && (
            <span className="text-xs text-slate-400 px-1 font-medium">
              {filteredData.length} aplikasi terdaftar
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className="h-9 px-3 bg-white border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 transition-all flex items-center gap-1.5 flex-none">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <Button size="sm" asChild className="h-9 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-sm flex-none">
            <Link href="/applications/create">
              <Plus className="w-4 h-4" /> Tambah Aplikasi
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">ID Aplikasi</TableHead>
              <TableHead className="py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Nama Sistem</TableHead>
              <TableHead className="py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Pemilik | Tipe</TableHead>
              <TableHead className="text-center py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Risk Level</TableHead>
              <TableHead className="text-center pr-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRow 
                  key={item.id} 
                  onClick={() => router.push(`/applications/${item.id}`)}
                  className="hover:bg-muted/30 transition-colors group cursor-pointer"
                >
                  <TableCell className="pl-6 py-4">
                    <span className="text-xs text-muted-foreground font-mono font-bold tracking-tight">
                      {item.id}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors tracking-tight">
                      {item.name}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-sm font-medium text-muted-foreground tracking-tight">
                    <span className="px-2 py-0.5 bg-muted rounded text-xs font-bold border border-border mr-2">{item.type}</span>
                    <span className="text-xs">{item.owner}</span>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <span className={`text-xs font-bold px-2 py-1 rounded border ${
                      item.riskLevel === 'High' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                      item.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-emerald-50 text-emerald-600 border-emerald-100'
                    }`}>
                      {item.riskLevel}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-center pr-6">
                    <div className="inline-flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-amber-400'}`} />
                      <span className={`text-xs font-black tracking-widest ${item.status === 'Active' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {item.status}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center bg-muted/5">
                  <div className="flex flex-col items-center gap-3 text-muted-foreground/40">
                    <AlertCircle size={32} strokeWidth={1} />
                    <p className="text-xs font-medium uppercase tracking-widest">Data tidak ditemukan</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-4">
          <p className="text-xs text-muted-foreground">
            Menampilkan <span className="font-semibold">1</span> sampai <span className="font-semibold">{Math.min(pageSize, filteredData.length)}</span> dari <span className="font-semibold">{filteredData.length}</span> data
          </p>
          <div className="flex gap-2">
            <button disabled className="p-2 rounded-md border border-border bg-card transition-colors hover:bg-muted pointer-events-none opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`w-9 h-9 flex items-center justify-center rounded-md text-xs font-bold transition-all ${
                    p === 1 ? "bg-primary text-primary-foreground shadow-sm" : "bg-card border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button className="p-2 rounded-md border border-border bg-card transition-colors hover:bg-muted">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
