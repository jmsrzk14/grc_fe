"use client";

import React from "react";
import { Search, Filter, History, ChevronLeft, ChevronRight, Activity, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import HeaderTitle from "@/components/layout/HeaderTitle";
import { AUDIT_TRAIL } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AuditPage() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const pageSize = 10;

  const filteredData = AUDIT_TRAIL.filter(item =>
    item.target.toLowerCase().includes(search.toLowerCase()) ||
    item.action.toLowerCase().includes(search.toLowerCase()) ||
    item.inputBy.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(0, pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full px-2 pb-10">
      <HeaderTitle title="Audit Trail" />

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2 items-center">
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari modul, target, atau nama petugas..."
              className="h-9 w-64 pl-9 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400"
            />
          </form>
          {filteredData.length > 0 && (
            <span className="text-xs text-slate-400 px-1 font-medium">
              {filteredData.length} log aktivitas
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className="h-9 px-3 bg-white border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 transition-all flex items-center gap-1.5 flex-none">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <Button className="h-9 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-sm flex-none">
            Export Logs
          </Button>
        </div>
      </div>

      {/* ── Table Container ── */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-8 text-xs font-bold uppercase tracking-widest">Aksi & Petugas</TableHead>
              <TableHead className="text-xs font-bold uppercase tracking-widest">Modul | Target</TableHead>
              <TableHead className="text-center pr-8 text-xs font-bold uppercase tracking-widest">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRow 
                  key={item.id} 
                  onClick={() => router.push(`/audit/${item.id}`)}
                  className="hover:bg-muted/30 transition-colors group cursor-pointer"
                >
                  <TableCell className="pl-8">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors tracking-tight">
                        {item.action}
                      </span>
                      <span className="text-xs text-slate-400 font-mono font-medium mt-0.5">
                        {item.id} • {item.inputBy}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-sm font-medium text-muted-foreground tracking-tight">
                    <span className="px-2 py-0.5 bg-muted rounded text-xs font-medium border border-border mr-2 italic">{item.module}</span>
                    {item.target}
                  </TableCell>
                  <TableCell className="text-center pr-8">
                    <div className="inline-flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground/50" />
                      <span className="text-sm font-medium text-muted-foreground">
                        {item.timestamp}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-48 text-center bg-slate-50/50">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <History size={32} strokeWidth={1.5} />
                    <p className="text-[11px] font-medium uppercase tracking-widest">Tidak ada log aktivitas</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-4">
          <p className="text-xs text-muted-foreground">
            Menampilkan <span className="font-semibold">1</span> sampai <span className="font-semibold">{Math.min(pageSize, filteredData.length)}</span> dari <span className="font-semibold">{filteredData.length}</span> data
          </p>
          <div className="flex gap-2">
            <button
              disabled
              className="p-2 rounded-md border border-border bg-card transition-colors hover:bg-muted pointer-events-none opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`w-9 h-9 flex items-center justify-center rounded-md text-xs font-bold transition-all ${
                    p === 1 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "bg-card border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              className="p-2 rounded-md border border-border bg-card transition-colors hover:bg-muted"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
