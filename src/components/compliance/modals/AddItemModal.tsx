"use client";

import React from "react";
import { FileText, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddItemFormData {
  reference_number: string;
  content: string;
  tenant_properti_id: string;
}

interface TenantProperty {
  id: string;
  property_id: string;
}

interface Property {
  id: string;
  Name: string;
}

interface AddItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: AddItemFormData;
  onFormChange: (data: AddItemFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
  tenantProperties: TenantProperty[];
  properties: Property[];
}

export default function AddItemModal({
  open,
  onOpenChange,
  formData,
  onFormChange,
  onSubmit,
  submitting,
  tenantProperties,
  properties,
}: AddItemModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[24px] p-0 overflow-hidden bg-white">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <FileText size={24} />
            </div>
            <div>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-slate-900 tracking-tight leading-none">
                  Tambah Item Baru
                </DialogTitle>
                <p className="text-sm font-medium text-slate-400 mt-1">
                  Masukkan detail kewajiban regulasi untuk indeksasi.
                </p>
              </DialogHeader>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-8">
            <div className="space-y-6">
              {/* Reference Number */}
              <div className="grid gap-2">
                <Label
                  htmlFor="add-item-ref"
                  className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1"
                >
                  Nomor Referensi
                </Label>
                <Input
                  id="add-item-ref"
                  required
                  placeholder="Misal: Pasal 1 Ayat 1"
                  value={formData.reference_number}
                  onChange={(e) =>
                    onFormChange({
                      ...formData,
                      reference_number: e.target.value,
                    })
                  }
                  className="h-12 border-slate-100 bg-slate-50/50 rounded-xl focus:border-blue-200 focus:bg-white transition-all shadow-sm text-sm font-bold"
                />
              </div>

              {/* Content */}
              <div className="grid gap-2">
                <Label
                  htmlFor="add-item-content"
                  className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1"
                >
                  Isi Item
                </Label>
                <Textarea
                  id="add-item-content"
                  required
                  placeholder="Tempel teks regulasi di sini..."
                  value={formData.content}
                  onChange={(e) =>
                    onFormChange({ ...formData, content: e.target.value })
                  }
                  className="min-h-[140px] border-slate-100 bg-slate-50/50 rounded-xl focus:border-blue-200 focus:bg-white transition-all shadow-sm text-sm font-medium leading-relaxed resize-none"
                />
              </div>

              {/* Tenant Property */}
              <div className="grid gap-2">
                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">
                  Target Properti (Opsional)
                </Label>
                <Select
                  value={formData.tenant_properti_id}
                  onValueChange={(val) =>
                    onFormChange({ ...formData, tenant_properti_id: val })
                  }
                >
                  <SelectTrigger className="h-12 border-slate-100 bg-slate-50/50 rounded-xl focus:ring-blue-200 transition-all font-bold text-sm">
                    <SelectValue placeholder="Pilih Properti" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 shadow-xl font-bold">
                    <SelectItem value="none">Tanpa Properti</SelectItem>
                    {tenantProperties.map((tp) => {
                      const p = properties.find(
                        (prop) => prop.id === tp.property_id
                      );
                      return (
                        <SelectItem key={tp.id} value={tp.id}>
                          {p ? p.Name : `Property ${tp.id.substring(0, 5)}`}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3 mt-10">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="h-12 px-6 font-bold text-[11px] text-slate-400 uppercase tracking-widest hover:bg-slate-50 rounded-xl"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] uppercase tracking-widest px-10 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
              >
                {submitting ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  "Konfirmasi Simpan"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
