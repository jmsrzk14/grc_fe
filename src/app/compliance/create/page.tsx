"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  ShieldCheck,
  Trash2
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
import HeaderTitle from "@/components/layout/HeaderTitle";

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
    <div className="space-y-6 animate-in fade-in duration-500 w-full px-2 pb-10">
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => router.back()}
            className="h-9 w-9 rounded-md border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="h-4 w-4 text-slate-500" />
          </Button>
          <HeaderTitle title="Daftar Regulasi Baru" />
        </div>
        <div className="flex items-center gap-2">
           <Button 
             type="button"
             variant="outline" 
             onClick={() => router.back()}
             className="h-9 px-4 bg-white border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 transition-all shadow-sm"
           >
              <Trash2 className="h-4 w-4 mr-1.5" /> Batal
           </Button>
           <Button 
             onClick={handleSubmit}
             disabled={loading}
             className="h-9 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm"
           >
              <Save className="h-4 w-4 mr-1.5" /> {loading ? "Menyimpan..." : "Simpan Regulasi"}
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── Utama: Formulir ── */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Informasi Utama Regulasi</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
               <div className="grid gap-2">
                 <Label htmlFor="title" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Judul Lengkap Regulasi</Label>
                 <Input 
                   id="title" 
                   value={formData.title}
                   onChange={(e) => setFormData({...formData, title: e.target.value})}
                   placeholder="Masukkan nama resmi regulasi atau undang-undang..." 
                   className="h-10 border-slate-200 rounded-md bg-slate-50/30 focus:bg-white focus:ring-1 focus:ring-primary/20 transition-all font-medium" 
                 />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="type" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tipe Dokumen</Label>
                    <Select 
                      value={formData.regulation_type} 
                      onValueChange={(val) => setFormData({...formData, regulation_type: val})}
                    >
                      <SelectTrigger className="h-10 border-slate-200 rounded-md bg-slate-50/30">
                        <SelectValue placeholder="Pilih Tipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="POJK">POJK (OJK)</SelectItem>
                        <SelectItem value="BI">BI (Bank Indonesia)</SelectItem>
                        <SelectItem value="UU">Undang-Undang</SelectItem>
                        <SelectItem value="PERPRES">Perpres</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tanggal Penetapan</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      value={formData.issued_date}
                      onChange={(e) => setFormData({...formData, issued_date: e.target.value})}
                      className="h-10 border-slate-200 bg-slate-50/30 rounded-md" 
                    />
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Kategorisasi & Lingkup</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
               <div className="grid gap-2">
                 <Label htmlFor="category" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Kategori Kepatuhan</Label>
                 <Select 
                   value={formData.category} 
                   onValueChange={(val) => setFormData({...formData, category: val})}
                 >
                    <SelectTrigger className="h-10 border-slate-200 rounded-md bg-slate-50/30">
                       <SelectValue placeholder="Pilih Cakupan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Internal">Internal Perusahaan</SelectItem>
                      <SelectItem value="External">Eksternal / Industri</SelectItem>
                      <SelectItem value="Subsidiary">Anak Perusahaan</SelectItem>
                    </SelectContent>
                 </Select>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Samping: Status ── */}
        <div className="lg:col-span-4">
           <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden sticky top-24">
             <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
                <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Catatan Sistem</CardTitle>
             </CardHeader>
             <CardContent className="p-6 space-y-6">
                <div className="p-4 bg-muted/30 rounded-lg border border-border flex items-start gap-3">
                   <ShieldCheck className="mt-0.5 text-blue-500 shrink-0" size={16} />
                   <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                      Setiap regulasi yang didaftarkan akan secara otomatis memicu notifikasi kepada unit kerja terkait untuk penilaian kepatuhan.
                   </p>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
