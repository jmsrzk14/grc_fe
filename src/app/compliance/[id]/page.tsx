"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Plus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useHeader } from "@/context/HeaderContext";
import AddItemModal from "@/components/compliance/modals/AddItemModal";
import PieChart from "@/components/compliance/shared/PieChart";


interface Regulation {
  id: string;
  title: string;
  regulation_type: string;
  issued_date: string;
  status: string;
  amount_pass?: number;
  amount_fail?: number;
  amount_na?: number;
}

interface RegulationItem {
  id: string;
  reference_number: string;
  content: string;
  tenant_properti_ids: string[];
}

interface AssessmentResult {
  id: string;
  regulation_item_id: string;
  compliance_status: string;
  remarks: string;
}


export default function RegulationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();
  const { setTitle } = useHeader();

  const [regulation, setRegulation] = useState<Regulation | null>(null);
  const [items, setItems] = useState<RegulationItem[]>([]);
  const [results, setResults] = useState<Record<string, AssessmentResult>>({});
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newItem, setNewItem] = useState({
    reference_number: "",
    content: "",
    tenant_properti_ids: [] as string[]
  });

  const [properties, setProperties] = useState<any[]>([]);
  const [tenantProperties, setTenantProperties] = useState<any[]>([]);
  const [tenantId, setTenantId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const regRes = await fetch(`${apiUrl}/api/v1/regulations/${id}`);
      if (regRes.ok) {
        const regData = await regRes.json();
        setRegulation(regData);
        setTitle(regData.title || "Regulation Detail");
      }

      const itemsRes = await fetch(`${apiUrl}/api/v1/regulations/${id}/items`);
      if (itemsRes.ok) {
        const itemsData = await itemsRes.json();
        setItems(itemsData);
      }

      // Fetch Properties and Tenants
      const tenantsRes = await fetch(`${apiUrl}/api/v1/tenants`);
      if (tenantsRes.ok) {
        const tenants = await tenantsRes.json();
        if (tenants.length > 0) {
          const tId = tenants[0].id;
          setTenantId(tId);
          const [tpRes, pRes, sessionsRes] = await Promise.all([
             fetch(`${apiUrl}/api/v1/tenants/${tId}/properties`),
             fetch(`${apiUrl}/api/v1/properties`),
             fetch(`${apiUrl}/api/v1/assessments/sessions?tenant_id=${tId}`)
          ]);
          if (tpRes.ok) setTenantProperties(await tpRes.json());
          if (pRes.ok) setProperties(await pRes.json());
          
          if (sessionsRes.ok) {
            const sessions = await sessionsRes.json();
            if (sessions.length > 0) {
              // Get results from the most recent session
              const activeSession = sessions[0];
              const resultsRes = await fetch(`${apiUrl}/api/v1/assessments/sessions/${activeSession.id}/results`);
              if (resultsRes.ok) {
                const resultsData = await resultsRes.json();
                const resultsMap: Record<string, AssessmentResult> = {};
                resultsData.forEach((res: any) => { 
                  resultsMap[res.regulation_item_id] = res; 
                });
                setResults(resultsMap);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching regulation details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/v1/regulations/${id}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newItem,
          tenant_properti_ids: newItem.tenant_properti_ids.filter(id => id !== "none")
        }),
      });

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: "Item baru telah ditambahkan.",
          variant: "success",
        });
        setIsModalOpen(false);
        setNewItem({ reference_number: "", content: "", tenant_properti_ids: [] });
        fetchData(); // Refresh list
      } else {
        const errorData = await response.json();
        toast({
          title: "Gagal!",
          description: errorData.message || "Gagal menambahkan Item.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error!",
        description: "Tidak dapat terhubung ke server.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !regulation) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-40 bg-slate-100 rounded-2xl" />
        <div className="space-y-4">
          <div className="h-20 bg-slate-50 rounded-xl" />
          <div className="h-20 bg-slate-50 rounded-xl" />
          <div className="h-20 bg-slate-50 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!regulation) {
    return (
      <div className="p-12 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Regulasi tidak ditemukan</h2>
        <Link href="/compliance">
          <Button variant="outline">Kembali ke Daftar</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      {/* ── Navigasi Atas ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/compliance">
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm transition-all active:scale-95">
              <ArrowLeft size={18} />
            </Button>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-10 px-6 border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95 gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} />
            Tambah Item
          </Button>

          <Link href={`/compliance/${id}/assessment`}>
            <Button className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 gap-2">
              <ShieldCheck size={16} />
              Mulai Penilaian Kepatuhan
            </Button>
          </Link>
        </div>
      </div>

      {/* Modal Tambah Item - dirender sebagai komponen terpisah */}
      <AddItemModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        formData={newItem}
        onFormChange={(data: any) => setNewItem(data)}
        onSubmit={handleCreateItem}
        submitting={submitting}
        tenantProperties={tenantProperties}
        properties={properties}
      />

      <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-2">
          {regulation.title}
        </h2>
        <div className="flex items-center gap-3">

           <span className="text-sm font-bold text-slate-400">
              Jenis Regulasi: {regulation.regulation_type}
           </span>
        </div>
      </div>

      {/* ── Kartu Info Ringkas ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in duration-700 delay-100">       
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 animate-in fade-in zoom-in duration-700 delay-100">       
          <Card className="flex justify-around border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden active:scale-[0.98] transition-transform">
            <CardContent className="p-6 flex items-center gap-16">
              <div className="w-20 h-12 rounded-xl flex items-center justify-center shadow-inner">
                <PieChart 
                  pass={regulation.amount_pass || 0} 
                  fail={regulation.amount_fail || 0} 
                  na={regulation.amount_na || 0} 
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-row gap-5 items-center">
                  <div className="space-y-1 flex flex-col items-center">
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Memenuhi</p>
                      <p className="text-md font-bold text-emerald-400 leading-none">{regulation.amount_pass || 0}</p>
                  </div>
                  <div className="space-y-1 flex flex-col items-center">
                      <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">Tidak</p>
                      <p className="text-md font-bold text-rose-400 leading-none">{regulation.amount_fail || 0}</p>
                  </div>
                  <div className="space-y-1 flex flex-col items-center">
                      <p className="text-[10px] font-bold text-yellow-600 uppercase tracking-widest">N/A</p>
                      <p className="text-md font-bold text-yellow-400 leading-none">{regulation.amount_na || 0}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in duration-700 delay-100">       
          <Card className="border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden active:scale-[0.98] transition-transform">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-inner">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">Total Item</p>
                <p className="text-md font-bold text-slate-900 uppercase tracking-tight">{items.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden active:scale-[0.98] transition-transform">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                regulation.status === 'Active' ? 'bg-emerald-50 text-emerald-600 shadow-inner' : 
                regulation.status === 'Draft' ? 'bg-amber-50 text-amber-600' : 
                regulation.status === 'Retired' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-600'
              }`}>
                {regulation.status === 'Active' ? (
                  <div className="relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <CheckCircle2 size={24} className="relative" />
                  </div>
                ) : (
                  <CheckCircle2 size={24} />
                )}
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">Status Saat Ini</p>
                <p className={`text-md font-bold uppercase tracking-wider ${
                  regulation.status === 'Active' ? 'text-emerald-600' : 
                  regulation.status === 'Draft' ? 'text-amber-600' : 
                  regulation.status === 'Retired' ? 'text-rose-600' : 'text-slate-800'
                }`}>
                  {regulation.status === 'Active' ? 'Aktif' : regulation.status === 'Draft' ? 'Draf' : regulation.status === 'Retired' ? 'Non-Aktif' : regulation.status}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Daftar Item ── */}
      <div className="space-y-4 pt-4 animate-in fade-in duration-1000 delay-300">
        <div className="flex items-center gap-3 px-1">
           <div className="h-6 w-1.5 bg-blue-600 rounded-full" />
           <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Daftar Item</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {items.length > 0 ? (
            items.map((item, index) => (
              <Card key={item.id} className="group border border-slate-100 bg-white rounded-[24px] hover:border-blue-200 hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full">
                <CardContent className="px-6 pt-6 pb-3 flex-1 relative">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex w-full justify-between items-center gap-3">
                      <div className="text-xs font-bold text-slate-500 flex items-center justify-center uppercase tracking-widest">
                        {item.reference_number}
                      </div>
                      <div className="flex items-center justify-between">
                        {results[item.id] ? (
                          <Badge className={`${
                            results[item.id].compliance_status === 'YES' ? 'text-[12px] bg-emerald-50 text-emerald-600' : 
                            results[item.id].compliance_status === 'NO' ? 'text-[12px] bg-rose-50 text-rose-600' : 
                            'text-[12px] bg-yellow-50 text-yellow-600'
                          } border-none font-black`}>
                            {results[item.id].compliance_status === 'YES' ? 'Memenuhi' : 
                            results[item.id].compliance_status === 'NO' ? 'Tidak' : 'N/A'}
                          </Badge>
                        ) : (
                          <Badge className="bg-slate-50 text-slate-400 border-none text-[9px] font-black rounded-lg">
                            Belum Dinilai
                          </Badge>
                        )}
                      </div>
                      {item.tenant_properti_ids && item.tenant_properti_ids.length > 0 && (
                        <div className="flex gap-2 flex-wrap justify-end">
                          {item.tenant_properti_ids.map(tpId => {
                            const tp = tenantProperties.find(t => t.id === tpId);
                            const p = tp ? properties.find(prop => prop.id === tp.property_id) : null;
                            return (
                              <Badge key={tpId} className="bg-blue-50 text-blue-600 border-none text-[9px] font-black rounded-lg">
                                {p ? (p.name || p.Name) : "Properti"}
                              </Badge>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-0">
                    <h3 className="text-sm font-black text-slate-900 leading-[1.3] group-hover:text-blue-600 transition-colors">
                      {item.content}
                    </h3>
                  </div>
                </CardContent>

                {/* Status & Remarks Footer */}
                <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col gap-3">            
                  {results[item.id]?.remarks && (
                    <div className="ml-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Catatan / Temuan</p>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed italic">
                        "{results[item.id].remarks}"
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))
          ) : (
            <div className="p-24 text-center bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-3xl space-y-4 col-span-full">
              <div className="w-20 h-12 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto">
                 <FileText size={32} />
              </div>
              <div>
                <p className="text-slate-500 font-bold">Tidak ada Item dalam regulasi ini.</p>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-black">Klik tombol "Tambah Item" untuk memulai indexing</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
