"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Building2,
  Loader2,
  Settings2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import HeaderTitle from "@/components/layout/HeaderTitle";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Property {
  id: string;
  name: string;
  description: string;
}

export default function PropertyManagementPage() {
  const { toast } = useToast();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/v1/properties`);
      if (res.ok) {
        const data = await res.json();
        setProperties(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast({ title: "Error", description: "Gagal memuat data property.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleOpenModal = (property?: Property) => {
    if (property) {
      setEditingProperty(property);
      setFormData({ name: property.name, description: property.description });
    } else {
      setEditingProperty(null);
      setFormData({ name: "", description: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const method = editingProperty ? "PUT" : "POST";
    const url = editingProperty 
      ? `${apiUrl}/api/v1/properties/${editingProperty.id}` 
      : `${apiUrl}/api/v1/properties`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast({
          title: "Berhasil!",
          description: editingProperty ? "Property berhasil diperbarui." : "Property baru berhasil ditambahkan.",
          variant: "success",
        });
        setIsModalOpen(false);
        fetchProperties();
      } else {
        const error = await res.json();
        toast({
          title: "Gagal!",
          description: error.message || "Gagal menyimpan property.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({ title: "Error!", description: "Tidak dapat terhubung ke server.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus property ini?")) return;

    try {
      const res = await fetch(`${apiUrl}/api/v1/properties/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast({ title: "Dihapus", description: "Property berhasil dihapus.", variant: "success" });
        fetchProperties();
      } else {
        toast({ title: "Gagal", description: "Gagal menghapus property.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Tidak dapat terhubung ke server.", variant: "destructive" });
    }
  };

  const filteredProperties = properties.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full px-2 pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="h-9 w-9 rounded-md border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm">
            <Link href="/settings">
              <ArrowLeft className="h-4 w-4 text-slate-500" />
            </Link>
          </Button>
          <HeaderTitle title="Manajemen Property" />
        </div>
        <Button onClick={() => handleOpenModal()} className="h-9 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all shadow-sm gap-2">
          <Plus className="h-4 w-4" /> Tambah Property
        </Button>
      </div>

      <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
        <CardHeader className="bg-muted/20 border-b border-border px-6 py-4 flex flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-3">
             <Settings2 className="w-4 h-4 text-muted-foreground/50" />
             <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Daftar Objek/Property</CardTitle>
           </div>
           <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
              <Input 
                placeholder="Cari property..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-9 text-xs border-slate-200 bg-white/50 focus:bg-white"
              />
           </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-muted/10">
                  <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Nama Property</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Deskripsi</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center">
                       <Loader2 className="h-6 w-6 animate-spin text-primary mx-auto" />
                       <p className="text-xs text-muted-foreground mt-2 font-medium">Memuat data...</p>
                    </td>
                  </tr>
                ) : filteredProperties.length > 0 ? (
                  filteredProperties.map((p) => (
                    <tr key={p.id} className="border-b border-border hover:bg-muted/10 transition-colors group">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                               <Building2 size={16} />
                            </div>
                            <span className="text-sm font-bold text-slate-700">{p.name}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-md truncate">
                            {p.description || "-"}
                         </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                               <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md hover:bg-muted">
                                  <MoreVertical size={16} className="text-muted-foreground" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-xl border-border bg-white p-1">
                               <DropdownMenuItem onClick={() => handleOpenModal(p)} className="text-xs font-bold gap-2 cursor-pointer focus:bg-muted p-2 rounded-lg">
                                  <Edit2 size={14} className="text-blue-500" /> Edit Property
                               </DropdownMenuItem>
                               <DropdownMenuItem onClick={() => handleDelete(p.id)} className="text-xs font-bold gap-2 cursor-pointer text-rose-500 focus:text-rose-500 focus:bg-rose-50 p-2 rounded-lg">
                                  <Trash2 size={14} /> Hapus Data
                               </DropdownMenuItem>
                            </DropdownMenuContent>
                         </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center">
                       <p className="text-xs text-muted-foreground font-medium">Tidak ada property ditemukan.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[24px] p-0 overflow-hidden bg-white">
           <div className="p-8">
             <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                   <Building2 size={24} />
                </div>
                <div>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-900 tracking-tight leading-none">
                      {editingProperty ? "Edit Property" : "Tambah Property"}
                    </DialogTitle>
                    <p className="text-sm font-medium text-slate-400 mt-1">Masukkan informasi detail untuk objek/property baru.</p>
                  </DialogHeader>
                </div>
             </div>

             <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Nama Property</Label>
                  <Input 
                    id="name" 
                    required
                    placeholder="Misal: Teknologi Informasi" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="h-12 border-slate-100 bg-slate-50/50 rounded-xl focus:border-blue-200 focus:bg-white transition-all shadow-sm text-sm font-bold"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Deskripsi</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Jelaskan ruang lingkup property ini..." 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="min-h-[120px] border-slate-100 bg-slate-50/50 rounded-xl focus:border-blue-200 focus:bg-white transition-all shadow-sm text-sm font-medium leading-relaxed resize-none"
                  />
                </div>
                
                <div className="flex justify-end gap-3 mt-10">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setIsModalOpen(false)}
                    className="h-12 px-6 font-bold text-[11px] text-slate-400 uppercase tracking-widest hover:bg-slate-50 rounded-xl"
                  >
                    Batal
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={submitting}
                    className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] uppercase tracking-widest px-10 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                  >
                    {submitting ? <Loader2 className="animate-spin h-4 w-4" /> : editingProperty ? "Perbarui" : "Simpan Property"}
                  </Button>
                </div>
             </form>
           </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
