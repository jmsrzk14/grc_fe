"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Loader2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
import { useHeader } from "@/context/HeaderContext";

export default function CreateCompliancePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { setTitle } = useHeader();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    regulation_type: "POJK",
    category: "Internal",
    issued_date: new Date().toISOString().split('T')[0],
    status: "Active"
  });

  useEffect(() => {
    setTitle("Daftar Regulasi Baru");
  }, [setTitle]);

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
          description: "Regulasi baru telah didaftarkan.",
          variant: "success",
        });
        router.push("/compliance");
      } else {
        const errorData = await response.json();
        toast({
          title: "Gagal!",
          description: errorData.message || "Terjadi kesalahan.",
          variant: "destructive",
        });
      }
    } catch (error) {
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
    <div className="w-full h-full flex flex-col space-y-6 py-4 animate-in fade-in duration-500">
      {/* ── Header ── */}
      <div className="flex items-center gap-4 px-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => router.back()}
          className="rounded-lg h-9 w-9 text-slate-400 hover:text-slate-900 border border-slate-100 bg-white"
        >
          <ArrowLeft size={16} />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none">
            Tambah Regulasi Baru
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
            Manual Registration
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card className="border border-slate-100 shadow-sm rounded-xl overflow-hidden bg-slate-50/50">
          <CardContent className="p-6 space-y-6">
            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-0.5">
                Judul Regulasi
              </Label>
              <Input 
                id="title"
                required
                placeholder="Masukkan judul regulasi..."
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="h-11 border-slate-200 bg-white rounded-lg focus:ring-1 focus:ring-blue-500 transition-all text-sm font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Type */}
              <div className="md:col-span-1 space-y-1.5">
                <Label htmlFor="type" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-0.5">
                  Tipe
                </Label>
                <Select 
                  value={formData.regulation_type} 
                  onValueChange={(val) => setFormData({...formData, regulation_type: val})}
                >
                  <SelectTrigger className="h-11 border-slate-200 bg-white rounded-lg font-medium text-sm">
                    <SelectValue placeholder="Tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="POJK">POJK</SelectItem>
                    <SelectItem value="OJK">OJK (SE)</SelectItem>
                    <SelectItem value="BI">BI</SelectItem>
                    <SelectItem value="UU">Undang-Undang</SelectItem>
                    <SelectItem value="INTERNAL">Internal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div className="md:col-span-1 space-y-1.5">
                <Label htmlFor="date" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-0.5">
                  Tanggal Terbit
                </Label>
                <Input 
                  id="date"
                  type="date"
                  required
                  value={formData.issued_date}
                  onChange={(e) => setFormData({...formData, issued_date: e.target.value})}
                  className="h-11 border-slate-200 bg-white rounded-lg font-medium text-sm"
                />
              </div>

              {/* Category */}
              <div className="md:col-span-1 space-y-1.5">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-0.5">
                  Kategori
                </Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(val) => setFormData({...formData, category: val})}
                >
                  <SelectTrigger className="h-11 border-slate-200 bg-white rounded-lg font-medium text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Internal">Internal</SelectItem>
                    <SelectItem value="External">Eksternal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="md:col-span-1 space-y-1.5">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-0.5">
                  Status
                </Label>
                <div className="flex p-0.5 bg-slate-200/50 rounded-lg gap-0.5 border border-slate-100 h-11">
                   <button
                     type="button"
                     onClick={() => setFormData({...formData, status: "Active"})}
                     className={`flex-1 rounded-md text-[10px] font-black uppercase transition-all ${
                       formData.status === 'Active' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600 font-bold'
                     }`}
                   >
                     Aktif
                   </button>
                   <button
                     type="button"
                     onClick={() => setFormData({...formData, status: "Draft"})}
                     className={`flex-1 rounded-md text-[10px] font-black uppercase transition-all ${
                       formData.status === 'Draft' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600 font-bold'
                     }`}
                   >
                     Draf
                   </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2 px-2">
          <Button 
            variant="ghost"
            type="button"
            onClick={() => router.back()}
            className="h-10 px-6 font-bold text-slate-400 hover:text-slate-900 text-xs uppercase tracking-widest"
          >
            Batal
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
            className="h-10 px-8 bg-slate-800 hover:bg-slate-900 text-white font-black rounded-lg shadow-sm transition-all active:scale-95 gap-2 text-xs uppercase tracking-[0.15em]"
          >
            {loading ? <Loader2 className="animate-spin h-3.5 w-3.5" /> : <Save size={14} />}
            Simpan Regulasi
          </Button>
        </div>
      </form>
    </div>
  );
}
