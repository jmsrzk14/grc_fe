"use client";

import React from "react";
import { Plus, Search, Filter, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HeaderTitle from "@/components/layout/HeaderTitle";
import { POLICIES } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function PoliciesPage() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const pageSize = 10;

  const filteredData = POLICIES.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.id.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedData = filteredData.slice(0, pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full px-2 pb-10">
      <HeaderTitle title="Policy Management" />

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-2 items-center">
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari ID, Judul Kebijakan, atau Approver..."
              className="h-9 w-64 pl-9 text-sm bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all placeholder:text-slate-400"
            />
          </form>
          {filteredData.length > 0 && (
            <span className="text-xs text-slate-400 px-1 font-medium">
              {filteredData.length} item terdaftar
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className="h-9 px-3 bg-white border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 transition-all flex items-center gap-1.5 flex-none">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <Button size="sm" asChild className="h-9 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-sm flex-none">
            <Link href="/policies/create">
              <Plus className="w-4 h-4" /> Kebijakan
            </Link>
          </Button>
        </div>
      </div>

      {/* ── Table Container ── */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">ID Kebijakan</TableHead>
              <TableHead className="py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Nama Kebijakan</TableHead>
              <TableHead className="py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Versi | Approver</TableHead>
              <TableHead className="text-center py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Last Update</TableHead>
              <TableHead className="text-center pr-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <TableRow 
                  key={item.id} 
                  onClick={() => router.push(`/policies/${item.id}`)}
                  className="hover:bg-muted/30 transition-colors group cursor-pointer"
                >
                  <TableCell className="pl-6 py-4">
                    <span className="text-xs text-muted-foreground font-mono font-bold tracking-tight">
                      {item.id}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors tracking-tight">
                      {item.title}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-sm font-medium text-muted-foreground tracking-tight">
                    <span className="px-2 py-0.5 bg-muted rounded text-xs font-bold border border-border mr-2 italic">{item.version}</span>
                    <span className="text-xs">{item.approver}</span>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <span className="text-xs font-bold text-foreground bg-muted px-2 py-1 rounded border border-border">
                      {item.lastUpdate}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 text-center pr-6">
                    <div className="inline-flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.isApproved ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-amber-400'}`} />
                      <span className={`text-xs font-black tracking-widest ${item.isApproved ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {item.isApproved ? 'Approved' : 'Drafting'}
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
