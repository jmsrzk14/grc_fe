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
  Save,
  Loader2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Regulation {
  id: string;
  title: string;
  regulation_type: string;
  issued_date: string;
  status: string;
}

interface RegulationItem {
  id: string;
  reference_number: string;
  content: string;
}

export default function RegulationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();

  const [regulation, setRegulation] = useState<Regulation | null>(null);
  const [items, setItems] = useState<RegulationItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newItem, setNewItem] = useState({
    reference_number: "",
    content: ""
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const regRes = await fetch(`${apiUrl}/api/v1/regulations/${id}`);
      if (regRes.ok) {
        const regData = await regRes.json();
        setRegulation(regData);
      }

      const itemsRes = await fetch(`${apiUrl}/api/v1/regulations/${id}/items`);
      if (itemsRes.ok) {
        const itemsData = await itemsRes.json();
        setItems(itemsData);
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
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: "Item baru telah ditambahkan.",
          variant: "success",
        });
        setIsModalOpen(false);
        setNewItem({ reference_number: "", content: "" });
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
    <div className="space-y-6 pb-12">
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
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-10 px-6 border-slate-200 text-slate-700 font-black text-xs uppercase tracking-widest rounded-xl transition-all active:scale-95 gap-2">
                <Plus size={16} />
                Tambah Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[24px] p-0 overflow-hidden bg-white">
               <div className="p-8">
                 <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                       <FileText size={24} />
                    </div>
                    <div>
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                          Tambah Item Baru
                        </DialogTitle>
                        <p className="text-sm font-medium text-slate-400 mt-1">Masukkan detail kewajiban regulasi untuk indeksasi.</p>
                      </DialogHeader>
                    </div>
                 </div>

                 <form onSubmit={handleCreateItem} className="mt-8">
                   <div className="space-y-6">
                     <div className="grid gap-2">
                        <Label htmlFor="ref" className="text-[11px] font-black text-slate-500 uppercase tracking-widest pl-1">Nomor Referensi</Label>
                        <Input 
                          id="ref" 
                          required
                          placeholder="Misal: Pasal 1 Ayat 1" 
                          value={newItem.reference_number}
                          onChange={(e) => setNewItem({...newItem, reference_number: e.target.value})}
                          className="h-12 border-slate-100 bg-slate-50/50 rounded-xl focus:border-blue-200 focus:bg-white transition-all shadow-sm text-sm font-bold"
                        />
                     </div>
                     <div className="grid gap-2">
                        <Label htmlFor="content" className="text-[11px] font-black text-slate-500 uppercase tracking-widest pl-1">Isi Item</Label>
                        <Textarea 
                          id="content" 
                          required
                          placeholder="Tempel teks regulasi di sini..." 
                          value={newItem.content}
                          onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                          className="min-h-[140px] border-slate-100 bg-slate-50/50 rounded-xl focus:border-blue-200 focus:bg-white transition-all shadow-sm text-sm font-medium leading-relaxed resize-none"
                        />
                     </div>
                   </div>
                   
                   <div className="flex justify-end gap-3 mt-10">
                     <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => setIsModalOpen(false)}
                      className="h-12 px-6 font-black text-[11px] text-slate-400 uppercase tracking-widest hover:bg-slate-50 rounded-xl"
                     >
                       Batal
                     </Button>
                     <Button 
                      type="submit" 
                      disabled={submitting}
                      className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-black text-[11px] uppercase tracking-widest px-10 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                     >
                       {submitting ? <Loader2 className="animate-spin h-4 w-4" /> : "Konfirmasi Simpan"}
                     </Button>
                   </div>
                 </form>
               </div>
            </DialogContent>
          </Dialog>

          <Link href={`/compliance/${id}/assessment`}>
            <Button className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 gap-2">
              <ShieldCheck size={16} />
              Mulai Penilaian Kepatuhan
            </Button>
          </Link>
        </div>
      </div>

      <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
        <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-2">
          {regulation.title}
        </h2>
        <div className="flex items-center gap-3">
           <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">
              ID: {id.split('-')[0]}
           </span>
           <span className="text-xs font-bold text-slate-400">
              Tipe: {regulation.regulation_type}
           </span>
        </div>
      </div>

      {/* ── Kartu Info Ringkas ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in duration-700 delay-100">       
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
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Status Saat Ini</p>
              <p className={`text-md font-black uppercase tracking-wider ${
                regulation.status === 'Active' ? 'text-emerald-600' : 
                regulation.status === 'Draft' ? 'text-amber-600' : 
                regulation.status === 'Retired' ? 'text-rose-600' : 'text-slate-800'
              }`}>
                {regulation.status === 'Active' ? 'Aktif' : regulation.status === 'Draft' ? 'Draf' : regulation.status === 'Retired' ? 'Non-Aktif' : regulation.status}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl overflow-hidden active:scale-[0.98] transition-transform">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-inner">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Total Item</p>
              <p className="text-md font-black text-slate-900 uppercase tracking-tight">{items.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Daftar Item ── */}
      <div className="space-y-4 pt-4 animate-in fade-in duration-1000 delay-300">
        <div className="flex items-center gap-3 px-1">
           <div className="h-6 w-1.5 bg-blue-600 rounded-full" />
           <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Direktori Item</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {items.length > 0 ? (
            items.map((item, index) => (
              <Card key={item.id} className="group border border-slate-100 bg-white rounded-[24px] hover:border-blue-200 hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full">
                <CardContent className="p-6 flex-1 relative">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-xs font-bold text-slate-500 flex items-center justify-center uppercase tracking-widest">
                      {item.reference_number}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-black text-slate-900 leading-[1.3] group-hover:text-blue-600 transition-colors">
                      {item.content}
                    </h3>
                  </div>
                </CardContent>
                <div className="p-5 bg-slate-50/50 border-t border-slate-100 mt-auto">
                   <div className="flex items-center gap-2">
                     <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center shadow-sm">
                       <ShieldCheck size={12} className="text-blue-500" />
                     </div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Target: <span className="text-slate-600">{regulation.regulation_type}</span></p>
                   </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="p-24 text-center bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-3xl space-y-4 col-span-full">
              <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto">
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
