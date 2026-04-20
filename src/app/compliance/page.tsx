"use client";

import React, { useState, useEffect } from "react";
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
  AlertTriangle,
  Layers,
  FileText,
  Target,
  BarChart3,
  ArrowRight
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

interface Regulation {
  id: string;
  title: string;
  regulation_type: string;
  issued_date: string;
  status: string;
  category?: string;
}

const CATEGORIES = [
  { id: 'Internal', label: 'Internal' },
  { id: 'External', label: 'External' },
];

const PieChart = ({ pass = 0, fail = 0, na = 0 }: { pass: number, fail: number, na: number }) => {
  const total = pass + fail + na;
  if (total === 0) return (
    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-[8px] text-slate-400 font-bold uppercase">
      No Data
    </div>
  );

  const passPct = (pass / total) * 100;
  const failPct = (fail / total) * 100;

  return (
    <div className="relative w-16 h-16 group/chart">
      <div
        className="w-full h-full rounded-full shadow-inner transition-transform duration-500 group-hover/chart:scale-110"
        style={{
          background: `conic-gradient(
            #2acf33ff 0% ${passPct}%, 
            #cf0000ff ${passPct}% ${passPct + failPct}%, 
            #fffb04ff ${passPct + failPct}% 100%
          )`
        }}
      />
      <div className="absolute inset-1.5 bg-white rounded-full flex items-center justify-center shadow-sm">
        <span className="text-[10px] font-black text-slate-800">{Math.round(passPct)}%</span>
      </div>
    </div>
  );
};

export default function CompliancePage() {
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Internal');

  useEffect(() => {
    const fetchRegulations = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await fetch(`${apiUrl}/api/v1/regulations`);
        if (response.ok) {
          const data = await response.json();
          // Use the real assessment data from backend
          const enrichedData = data.map((reg: any) => ({
            ...reg,
            amount_pass: reg.amount_pass || 0,
            amount_fail: reg.amount_fail || 0,
            amount_na: reg.amount_na || 0,
            category: reg.category || 'Internal'
          }));
          setRegulations(enrichedData);
        }
      } catch (error) {
        console.error("Error fetching regulations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegulations();
  }, []);

  const filteredRegulations = regulations.filter(reg =>
    activeCategory === 'all' || reg.category?.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <div className="space-y-6 pb-12">
      {/* ── Header ── */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between mt-6">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Kepatuhan
            </h2>
            <p className="text-md font-black text-slate-500 tracking-tight leading-tight">
              Compliance Center
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/compliance/create">
              <Button className="h-11 px-6 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                Tambah Regulasi
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Tabs & Filter Bar ── */}
      <div className="space-y-4 pt-4">
        <Tabs defaultValue="Internal" className="w-full" onValueChange={setActiveCategory}>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">

            <div className="flex items-center gap-3">
              <div className="relative w-64 max-md:flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <Input
                  placeholder="Cari regulasi..."
                  className="h-10 pl-9 border-slate-200 bg-white rounded-xl text-xs focus:ring-blue-500 transition-all"
                />
              </div>

              <Select defaultValue="all">
                <SelectTrigger className="h-10 w-[140px] bg-white border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 shadow-sm transition-all">
                  <SelectValue placeholder="Tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="pojk">POJK</SelectItem>
                  <SelectItem value="ojk">OJK</SelectItem>
                  <SelectItem value="bi">BI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <TabsList className="bg-slate-50 p-1 h-12 rounded-2xl border border-slate-100">
              {CATEGORIES.map(cat => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="px-6 h-10 rounded-xl font-bold text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* ── List View ── */}
          <div className="grid grid-cols-1 gap-4 pt-6">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse bg-slate-50 border border-slate-100 h-24 rounded-2xl" />
              ))
            ) : filteredRegulations.length > 0 ? (
              filteredRegulations.map((reg: any) => (
                <Link key={reg.id} href={`/compliance/${reg.id}`}>
                  <Card
                    className="group relative overflow-hidden border border-slate-100 shadow-sm bg-white rounded-2xl hover:shadow-md hover:border-blue-200 transition-all duration-300 cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-row items-center gap-6">
                        {/* Pie Chart Section */}
                        <div className="flex-shrink-0 bg-slate-50 p-2 rounded-xl">
                          <PieChart
                            pass={reg.amount_pass}
                            fail={reg.amount_fail}
                            na={reg.amount_na}
                          />
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border shadow-sm transition-all">
                              {reg.status === 'Active' && (
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                              )}
                              <span className={`text-[10px] font-black uppercase tracking-wider ${reg.status === 'Active' ? 'text-emerald-700' :
                                  reg.status === 'Draft' ? 'text-amber-600' :
                                    reg.status === 'Retired' ? 'text-rose-600' : 'text-slate-600'
                                }`}>
                                {reg.status}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none ml-1">
                              {reg.regulation_type}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                            {reg.title}
                          </h3>
                          <p className="text-xs text-slate-400 font-medium">
                            {new Date(reg.issued_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                        </div>

                        {/* Stats Summary Area */}
                        <div className="flex flex-row gap-6 px-6 border-x border-slate-100 items-center h-12">
                          <div className="text-center">
                            <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">Pass</p>
                            <p className="text-sm font-bold text-emerald-500 leading-tight">{reg.amount_pass}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-[8px] font-black text-rose-400 uppercase tracking-widest">Fail</p>
                            <p className="text-sm font-bold text-rose-600 leading-tight">{reg.amount_fail}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-[8px] font-black text-yellow-400 uppercase tracking-widest">N/A</p>
                            <p className="text-sm font-bold text-yellow-600 leading-tight">{reg.amount_na}</p>
                          </div>
                        </div>

                        {/* Action Icon */}
                        <div className="w-10 h-10 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-45 transition-all duration-300">
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="p-20 text-center bg-slate-50 border-2 border-dashed border-slate-100 rounded-3xl">
                <p className="text-slate-400 font-bold">Tidak ada regulasi dalam kategori ini.</p>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
