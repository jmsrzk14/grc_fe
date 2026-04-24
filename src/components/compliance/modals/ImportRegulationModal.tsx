"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Download,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from "xlsx";

interface ImportRegulationModalProps {
  onSuccess: () => void;
}

export default function ImportRegulationModal({
  onSuccess,
}: ImportRegulationModalProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [tenantProperties, setTenantProperties] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);

  React.useEffect(() => {
    const loadMappingData = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const tenantsRes = await fetch(`${apiUrl}/api/v1/tenants`);
        if (tenantsRes.ok) {
          const tenants = await tenantsRes.json();
          if (tenants.length > 0) {
            const tId = tenants[0].id;
            const [tpRes, pRes] = await Promise.all([
              fetch(`${apiUrl}/api/v1/tenants/${tId}/properties`),
              fetch(`${apiUrl}/api/v1/properties`),
            ]);
            if (tpRes.ok) setTenantProperties(await tpRes.json());
            if (pRes.ok) setProperties(await pRes.json());
          }
        }
      } catch (err) {
        console.error("Failed to load mapping data:", err);
      }
    };
    loadMappingData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) return;
    setLoading(true);
    setProgress("Membaca file...");

    try {
      const formatDate = (val: any) => {
        if (!val) return new Date().toISOString().split("T")[0];
        if (typeof val === "number") {
          const date = new Date((val - 25569) * 86400 * 1000);
          return date.toISOString().split("T")[0];
        }
        const dateStr = String(val).trim();
        const ddmmyyyy = dateStr.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
        if (ddmmyyyy) {
          return `${ddmmyyyy[3]}-${ddmmyyyy[2].padStart(2, "0")}-${ddmmyyyy[1].padStart(2, "0")}`;
        }
        const yyyymmdd = dateStr.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/);
        if (yyyymmdd) {
          return `${yyyymmdd[1]}-${yyyymmdd[2].padStart(2, "0")}-${yyyymmdd[3].padStart(2, "0")}`;
        }
        return new Date().toISOString().split("T")[0];
      };

      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

          if (jsonData.length === 0) {
            toast({
              title: "File Kosong",
              description: "Tidak ada data untuk diimpor.",
              variant: "destructive",
            });
            setLoading(false);
            return;
          }

          const getVal = (row: any, ...keys: string[]) => {
            const rowKeys = Object.keys(row);
            const lowerKeys = keys.map(k => k.toLowerCase());
            const targetKey = rowKeys.find(rk => lowerKeys.includes(rk.trim().toLowerCase()));
            return targetKey ? row[targetKey] : null;
          };

          // Group by Regulation (using Title)
          const regulationsMap = new Map<string, any>();
          jsonData.forEach((row: any) => {
            const title = getVal(row, "Title", "Judul", "title");
            if (!title) return;

            if (!regulationsMap.has(title)) {
              regulationsMap.set(title, {
                title: String(title).trim(),
                regulation_type: String(getVal(row, "Type", "Tipe", "regulation_type") || "POJK"),
                category: String(getVal(row, "Category", "Kategori", "category") || "Internal"),
                issued_date: formatDate(getVal(row, "Date", "Tanggal", "issued_date")),
                status: String(getVal(row, "Status", "status") || "Active"),
                items: [],
              });
            }

            const itemRef = getVal(row, "ItemRef", "Ref", "reference_number");
            const itemContent = getVal(row, "ItemContent", "Content", "content");
            const propNames = getVal(row, "TenantProperty", "Property", "tenant_properti");
            let tenantPropIds: string[] = [];

            if (propNames) {
              const names = String(propNames).split(",").map(s => s.trim());
              names.forEach(name => {
                const prop = properties.find(
                  (p: any) => p && (p.Name || p.name || "").toLowerCase() === name.toLowerCase()
                );
                if (prop) {
                  const mapping = tenantProperties.find(
                    (tp) => tp.property_id === prop.id
                  );
                  if (mapping) tenantPropIds.push(mapping.id);
                }
              });
            }

            if (itemRef && itemContent) {
              regulationsMap.get(title).items.push({
                reference_number: String(itemRef),
                content: String(itemContent),
                tenant_properti_ids: tenantPropIds,
              });
            }
          });

          const regulations = Array.from(regulationsMap.values());
          if (regulations.length === 0) {
            toast({
              title: "Data Tidak Terbaca",
              description: "Pastikan nama kolom (Title, ItemRef, ItemContent) sudah benar.",
              variant: "destructive",
            });
            setLoading(false);
            return;
          }

          setProgress(`Memproses ${regulations.length} regulasi...`);

          const apiUrl =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

          let successCount = 0;
          for (let i = 0; i < regulations.length; i++) {
            const reg = regulations[i];
            setProgress(
              `Mengimpor: ${reg.title} (${i + 1}/${regulations.length})`
            );

            try {
              const regRes = await fetch(`${apiUrl}/api/v1/regulations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  title: reg.title,
                  regulation_type: reg.regulation_type,
                  issued_date: reg.issued_date,
                  status: reg.status,
                  category: reg.category,
                }),
              });

              if (!regRes.ok) {
                console.error(`Failed to import regulation: ${reg.title}`);
                continue;
              }

              const regData = await regRes.json();
              const regId = regData.id;

              if (!regId) {
                console.error(`No ID returned for regulation: ${reg.title}`);
                continue;
              }

              for (const item of reg.items) {
                const itemRes = await fetch(`${apiUrl}/api/v1/regulations/${regId}/items`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(item),
                });
                if (!itemRes.ok) {
                  console.error(`Failed to create item: ${item.reference_number}`);
                }
              }
              successCount++;
            } catch (err) {
              console.error(`Error importing ${reg.title}:`, err);
            }
          }

          if (successCount > 0) {
            toast({
              title: "Berhasil!",
              description: `${successCount} regulasi telah diimpor.`,
              variant: "success",
            });
          } else {
            toast({
              title: "Gagal Impor",
              description: "Tidak ada data yang berhasil masuk. Cek konsol browser untuk detail.",
              variant: "destructive",
            });
          }

          if (successCount > 0) {
            setOpen(false);
            onSuccess();
          }
        } catch (err) {
          console.error(err);
          toast({
            title: "Kesalahan",
            description: "Gagal memproses data file.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
          setProgress("");
          setFile(null);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Gagal membaca file.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    window.open("/templates/Template_Import_Regulasi.xlsx", "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-11 px-6 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm gap-2"
        >
          <Upload size={18} />
          Import CSV/XLSX
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] border-none shadow-2xl rounded-[28px] p-0 overflow-hidden bg-white">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
              <Upload size={24} />
            </div>
            <div className="flex-1">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-bold text-slate-900 tracking-tight">
                    Import Data Regulasi
                  </DialogTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={downloadTemplate}
                    className="h-8 px-3 text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:bg-blue-50 bg-blue-50/50 rounded-lg gap-1.5"
                  >
                    <Download size={12} />
                    Template
                  </Button>
                </div>
              </DialogHeader>
            </div>
          </div>

          <div className="space-y-6">
            {/* File Dropzone */}
            <div
              className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all ${
                file
                  ? "border-blue-200 bg-blue-50/30"
                  : "border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200"
              }`}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".csv,.xlsx,.xls,.xlsm"
                onChange={handleFileChange}
                disabled={loading}
              />
              <label htmlFor="file-upload" className="cursor-pointer group">
                {file ? (
                  <div className="space-y-2">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText size={32} />
                    </div>
                    <p className="text-sm font-bold text-slate-700">
                      {file.name}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      Klik untuk mengganti file
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-white text-slate-400 rounded-full flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                      <Upload size={32} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-600">
                        Pilih file CSV atau Excel
                      </p>
                    </div>
                  </div>
                )}
              </label>
            </div>

            {/* Progress Indicator */}
            {loading && (
              <div className="bg-blue-50/50 p-4 rounded-2xl flex items-center gap-3 animate-pulse">
                <Loader2 size={18} className="text-blue-500 animate-spin" />
                <p className="text-xs font-bold text-blue-700 uppercase tracking-widest">
                  {progress}
                </p>
              </div>
            )}

            {/* Format Guide */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <AlertCircle size={12} />
                Panduan Format
              </h4>
              <ul className="space-y-2">
                <li className="text-[11px] font-medium text-slate-600 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1 flex-shrink-0" />
                  <span>
                    Gunakan kolom <strong>Title</strong> sebagai kunci
                    pengelompokan regulasi.
                  </span>
                </li>
                <li className="text-[11px] font-medium text-slate-600 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1 flex-shrink-0" />
                  <span>
                    Kolom <strong>ItemRef</strong> dan{" "}
                    <strong>ItemContent</strong> wajib diisi untuk tiap baris
                    item.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-10">
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="h-12 px-6 font-bold text-[11px] text-slate-400 uppercase tracking-widest hover:bg-slate-50 rounded-xl"
            >
              Batal
            </Button>
            <Button
              onClick={handleImport}
              disabled={!file || loading}
              className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] uppercase tracking-widest px-10 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 gap-2"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <CheckCircle2 size={16} />
              )}
              Import
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
