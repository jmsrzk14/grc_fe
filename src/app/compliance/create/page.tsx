"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
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
    <div className="max-w-4xl mx-auto space-y-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => router.back()}
            className="rounded-xl h-10 w-10 border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm transition-all active:scale-95"
          >
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
              Daftarkan Regulasi Baru
            </h1>
            <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">
              Pusat Kepatuhan & Tata Kelola
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden bg-white">
              <CardHeader className="bg-slate-900 px-8 py-6">
                <CardTitle className="text-white text-lg font-black flex items-center gap-3">
                  <FileBadge className="text-blue-400" />
                  Informasi Utama
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="title" className="text-[11px] font-black text-slate-500 uppercase tracking-widest pl-1">
                    Judul Regulasi
                  </Label>
                  <Input 
                    id="title"
                    required
                    placeholder="Masukkan nama lengkap regulasi..."
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="h-14 border-slate-100 bg-slate-50/50 rounded-2xl focus:bg-white focus:border-blue-200 transition-all text-sm font-bold shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="grid gap-3">
                    <Label htmlFor="type" className="text-[11px] font-black text-slate-500 uppercase tracking-widest pl-1">
                      Tipe Regulasi
                    </Label>
                    <Select 
                      value={formData.regulation_type} 
                      onValueChange={(val) => setFormData({...formData, regulation_type: val})}
                    >
                      <SelectTrigger className="h-14 border-slate-100 bg-slate-50/50 rounded-2xl focus:bg-white focus:border-blue-200 transition-all font-bold">
                        <SelectValue placeholder="Pilih Tipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="POJK">POJK (Otoritas Jasa Keuangan)</SelectItem>
                        <SelectItem value="OJK">OJK (Surat Edaran)</SelectItem>
                        <SelectItem value="BI">BI (Bank Indonesia)</SelectItem>
                        <SelectItem value="UU">UU (Undang-Undang)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="date" className="text-[11px] font-black text-slate-500 uppercase tracking-widest pl-1">
                      Tanggal Penetapan
                    </Label>
                    <Input 
                      id="date"
                      type="date"
                      required
                      value={formData.issued_date}
                      onChange={(e) => setFormData({...formData, issued_date: e.target.value})}
                      className="h-14 border-slate-100 bg-slate-50/50 rounded-2xl focus:bg-white focus:border-blue-200 transition-all font-bold"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden bg-white">
              <CardHeader className="bg-slate-50 px-8 py-5 border-b border-slate-100">
                <CardTitle className="text-slate-900 text-xs font-black uppercase tracking-widest">
                  Pengaturan
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid gap-4">
                  <Label className="text-[11px] font-black text-slate-500 uppercase tracking-widest pl-1">
                    Kategori
                  </Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(val) => setFormData({...formData, category: val})}
                  >
                    <SelectTrigger className="h-12 border-slate-100 bg-slate-50 rounded-xl font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Internal">Internal</SelectItem>
                      <SelectItem value="External">Eksternal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4">
                  <Label className="text-[11px] font-black text-slate-500 uppercase tracking-widest pl-1">
                    Status Awal
                  </Label>
                  <div className="flex gap-2">
                    <Button 
                      type="button"
                      variant={formData.status === "Active" ? "default" : "outline"}
                      onClick={() => setFormData({...formData, status: "Active"})}
                      className={`flex-1 rounded-xl h-12 font-bold ${formData.status === "Active" ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                    >
                      Aktif
                    </Button>
                    <Button 
                      type="button"
                      variant={formData.status === "Draft" ? "default" : "outline"}
                      onClick={() => setFormData({...formData, status: "Draft"})}
                      className="flex-1 rounded-xl h-12 font-bold"
                    >
                      Draf
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black text-md uppercase tracking-widest rounded-3xl shadow-xl shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <Save size={22} />
              {loading ? "Menyimpan..." : "Simpan Regulasi"}
            </Button>
            
            <div className="p-6 bg-blue-50 text-blue-700 rounded-3xl border border-blue-100/50 flex items-start gap-4">
               <ShieldCheck className="mt-1 flex-shrink-0" size={20} />
               <p className="text-xs font-bold leading-relaxed">
                 Data yang Anda simpan akan masuk ke dalam database kepatuhan dan siap untuk dilakukan penilaian kepatuhan segera.
               </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
