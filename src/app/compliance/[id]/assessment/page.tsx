"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Loader2,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useHeader } from "@/context/HeaderContext";

interface RegulationItem {
  id: string;
  reference_number: string;
  content: string;
}

interface AssessmentResult {
  id?: string;
  regulation_item_id: string;
  compliance_status: string; // "YES", "NO", "N/A"
  remarks: string;
}

interface Session {
  id: string;
  title: string;
  status: string;
}

export default function AssessmentPage() {
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();
  const { setTitle } = useHeader();
  const router = useRouter();

  const [items, setItems] = useState<RegulationItem[]>([]);
  const [results, setResults] = useState<Record<string, AssessmentResult>>({});
  const [localRemarks, setLocalRemarks] = useState<Record<string, string>>({});
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    setTitle("Compliance Assessment");
  }, [setTitle]);

  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        const [itemsRes, tenantsRes] = await Promise.all([
          fetch(`${apiUrl}/api/v1/regulations/${id}/items`),
          fetch(`${apiUrl}/api/v1/tenants`)
        ]);

        if (itemsRes.ok) setItems(await itemsRes.json());
        
        let currentTenantId = "";
        if (tenantsRes.ok) {
          const tenants = await tenantsRes.json();
          if (tenants.length > 0) {
            currentTenantId = tenants[0].id;
            setTenantId(currentTenantId);
          }
        }

        if (currentTenantId) {
          const sessionsRes = await fetch(`${apiUrl}/api/v1/assessments/sessions?tenant_id=${currentTenantId}`);
          if (sessionsRes.ok) {
            const sessions = await sessionsRes.json();
            if (sessions.length > 0) {
              const activeSession = sessions[0];
              setSession(activeSession);
              const resultsRes = await fetch(`${apiUrl}/api/v1/assessments/sessions/${activeSession.id}/results`);
              if (resultsRes.ok) {
                const resultsData = await resultsRes.json();
                const resultsMap: Record<string, AssessmentResult> = {};
                const remarksMap: Record<string, string> = {};
                resultsData.forEach((res: any) => { 
                  resultsMap[res.regulation_item_id] = res; 
                  remarksMap[res.regulation_item_id] = res.remarks || "";
                });
                setResults(resultsMap);
                setLocalRemarks(remarksMap);
              }
            }
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) initData();
  }, [id, apiUrl]);

  const handleStartSession = async () => {
    if (!tenantId) return;
    try {
      const res = await fetch(`${apiUrl}/api/v1/assessments/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenant_id: tenantId,
          title: `Self Assessment - ${new Date().toLocaleDateString('id-ID')}`,
          period_year: new Date().getFullYear()
        })
      });
      if (res.ok) setSession(await res.json());
    } catch (err) { console.error(err); }
  };

  const handleSaveResult = async (itemId: string, status?: string, remarks?: string) => {
    if (!session) return;
    
    const currentResult = results[itemId];
    const finalStatus = status !== undefined ? status : (currentResult?.compliance_status || "N/A");
    const finalRemarks = remarks !== undefined ? remarks : (localRemarks[itemId] || currentResult?.remarks || "");

    // Skip if no changes
    if (results[itemId] && 
        finalStatus === results[itemId].compliance_status && 
        finalRemarks === (results[itemId].remarks || "")) {
      return;
    }

    setSaving(itemId);
    try {
      const res = await fetch(`${apiUrl}/api/v1/assessments/sessions/${session.id}/results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          regulation_item_id: itemId,
          compliance_status: finalStatus,
          evidence_link: "", 
          remarks: finalRemarks        
        })
      });
      if (res.ok) {
        const savedData = await res.json();
        setResults(prev => ({ ...prev, [itemId]: savedData }));
        setLocalRemarks(prev => ({ ...prev, [itemId]: savedData.remarks || "" }));
      }
    } catch (err) { 
      console.error(err); 
      toast({ title: "Gagal menyimpan", variant: "destructive" });
    } finally { 
      setSaving(null); 
    }
  };

  if (loading) {
     return (
       <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-slate-50/50">
         <Loader2 className="animate-spin text-blue-500" size={40} />
         <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Memuat Quesioner...</p>
       </div>
     );
  }

  if (!session) {
    return (
      <div className="w-full max-w-lg mx-auto py-32 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto shadow-sm"><Shield size={40} /></div>
        <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Assessment Session</h2>
            <p className="text-sm text-slate-400 font-medium">Buat sesi penilaian baru untuk mulai mengevaluasi item regulasi ini.</p>
        </div>
        <Button onClick={handleStartSession} className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl gap-3 active:scale-95 transition-all lowercase">Mulai Sesi Baru</Button>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 py-4 space-y-6 animate-in fade-in duration-500">
      {/* ── Header Minimal ── */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <Link href={`/compliance/${id}`}>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg border-slate-200 text-slate-400 hover:text-slate-900 border bg-white shadow-sm transition-all active:scale-95"><ArrowLeft size={16} /></Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none">Self Assessment</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Evaluation Board</p>
          </div>
        </div>
      </div>

      {/* ── List View ── */}
      <div className="flex flex-col gap-6">
        {items.map((item, idx) => {
          const res = results[item.id] || { compliance_status: "N/A", remarks: "" };
          const isSaving = saving === item.id;
          
          return (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
               <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Kolom Kiri: Isi Item */}
                  <div className="p-6 bg-slate-50/50 border-r border-slate-100 flex flex-col gap-4">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Badge variant="outline" className="bg-white text-[10px] font-black border-slate-200 text-slate-500 rounded-md py-0 h-5">
                              {item.reference_number}
                           </Badge>
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ketentuan / Pasal</span>
                        </div>
                     </div>
                     <p className="text-sm font-bold text-slate-700 leading-relaxed">
                        {item.content}
                     </p>
                  </div>

                  {/* Kolom Kanan: Pengisian Assessment */}
                  <div 
                    className="p-6 bg-white space-y-6 relative"
                    onMouseLeave={() => {
                      // Trigger autosave if remarks changed when mouse leaves the area
                      if (localRemarks[item.id] !== (res.remarks || "")) {
                        handleSaveResult(item.id, undefined, localRemarks[item.id]);
                      }
                    }}
                  >
                     {isSaving && (
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                           <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.2em] animate-pulse">Autosaving...</span>
                           <Loader2 size={10} className="animate-spin text-blue-500" />
                        </div>
                     )}

                     <div className="space-y-4">
                        <h4 className="text-sm font-bold text-slate-800">Apakah memenuhi peraturannya atau tidak?</h4>
                        <div className="flex items-center gap-2">
                          {[
                            { val: 'YES', label: 'Memenuhi', color: 'bg-emerald-600', icon: CheckCircle2 },
                            { val: 'NO', label: 'Tidak', color: 'bg-rose-600', icon: XCircle },
                            { val: 'N/A', label: 'N/A', color: 'bg-yellow-400', icon: AlertCircle }
                          ].map(opt => (
                            <button
                              key={opt.val}
                              onClick={() => handleSaveResult(item.id, opt.val)}
                              disabled={isSaving}
                              className={`flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                                res.compliance_status === opt.val 
                                ? `${opt.color} text-white border-transparent shadow-lg shadow-${opt.color.split('-')[1]}-100` 
                                : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-300'
                              }`}
                            >
                               <opt.icon size={12} />
                               {opt.label}
                            </button>
                          ))}
                        </div>
                     </div>

                     <div className="space-y-3">
                        <div className="flex items-center justify-between">
                           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Keterangan / Temuan</h4>
                        </div>
                        <textarea
                          placeholder="Tambahkan catatan atau bukti pendukung di sini..."
                          value={localRemarks[item.id] || ""}
                          onChange={(e) => setLocalRemarks(prev => ({ ...prev, [item.id]: e.target.value }))}
                          onBlur={() => handleSaveResult(item.id, undefined, localRemarks[item.id])}
                          className="w-full min-h-[100px] p-4 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none placeholder:text-slate-300"
                        />
                     </div>
                  </div>
               </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer Info ── */}
      <div className="p-6 text-center bg-slate-100 border border-slate-200 rounded-2xl">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Setiap perubahan akan disimpan secara otomatis ke server GRC Dots.</p>
          <Button variant="link" onClick={() => router.push(`/compliance/${id}`)} className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 h-auto p-0 underline-offset-4 decoration-slate-300">Selesaikan Penilaian</Button>
      </div>
    </div>
  );
}
