"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  ShieldCheck,
  FileBadge,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function CreateCompliancePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    regulation_type: "POJK",
    category: "Internal",
    issued_date: new Date().toISOString().split('T')[0],
    status: "Active"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/v1/regulations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: "Regulasi baru telah berhasil didaftarkan.",
          variant: "success",
        });
        router.push("/compliance");
      } else {
        const errorData = await response.json();
        toast({
          title: "Gagal!",
          description: errorData.message || "Terjadi kesalahan saat menyimpan data.",
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
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
             <Link href="/compliance">
               <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-900 border border-slate-100 bg-white">
                 <ArrowLeft size={18} />
               </Button>
             </Link>
             <h2 className="text-3xl font-black text-slate-900 tracking-tight">Tambah Regulasi</h2>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Form Section ── */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-xl overflow-hidden">
            <CardContent className="p-8 space-y-6">
               <div className="grid gap-3">
                 <Label htmlFor="title" className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Judul Regulasi</Label>
                 <Input 
                   id="title" 
                   required
                   value={formData.title}
                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                   placeholder="Nama kewajiban kepatuhan..." 
                   className="h-12 border-slate-200 bg-slate-50/30 focus:bg-white transition-all rounded-xl shadow-sm" 
                 />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Tipe Regulasi</Label>
                    <Select 
                      value={formData.regulation_type}
                      onValueChange={(v) => setFormData({ ...formData, regulation_type: v })}
                    >
                      <SelectTrigger className="h-12 border-slate-200 bg-slate-50/30 rounded-xl">
                        <SelectValue placeholder="Pilih Tipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="POJK">POJK</SelectItem>
                        <SelectItem value="OJK">OJK</SelectItem>
                        <SelectItem value="BI">BI</SelectItem>
                        <SelectItem value="Internal">Internal Document</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Kategori</Label>
                    <Select 
                      value={formData.category}
                      onValueChange={(v) => setFormData({ ...formData, category: v })}
                    >
                      <SelectTrigger className="h-12 border-slate-200 bg-slate-50/30 rounded-xl">
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Internal">Internal</SelectItem>
                        <SelectItem value="External">External</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="grid gap-3">
                    <Label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Status</Label>
                    <Select 
                      value={formData.status}
                      onValueChange={(v) => setFormData({ ...formData, status: v })}
                    >
                      <SelectTrigger className="h-12 border-slate-200 bg-slate-50/30 rounded-xl">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="issued_date" className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Tanggal Dikeluarkan</Label>
                    <Input 
                      id="issued_date" 
                      type="date" 
                      required
                      value={formData.issued_date}
                      onChange={(e) => setFormData({ ...formData, issued_date: e.target.value })}
                      className="h-12 border-slate-200 bg-slate-50/30 rounded-xl" 
                    />
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Actions Sidebar ── */}
        <div className="space-y-4">
           <Card className="border-none shadow-sm text-white rounded-2xl overflow-hidden">
             <CardContent className="p-6 space-y-6">
               <div className="space-y-3">
                 <Button 
                   type="submit"
                   disabled={loading}
                   className="w-full h-14 bg-blue-600 text-white hover:bg-blue-700 font-black shadow-xl shadow-blue-500/20 rounded-xl transition-all active:scale-95"
                 >
                   {loading ? "MENYIMPAN..." : <><Save size={18} className="mr-2" /> Tambah Regulasi</>}
                 </Button>

                 <Link href="/compliance" className="block">
                   <Button variant="outline" type="button" className="w-full h-12 border-slate-900 bg-transparent text-slate-900 hover:bg-slate-800 hover:text-white font-bold rounded-xl">
                     BATAL
                   </Button>
                 </Link>
               </div>
             </CardContent>
           </Card>
        </div>
      </form>
    </div>
  );
}
