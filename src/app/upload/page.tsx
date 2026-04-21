"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  History,
  CloudUpload,
  Database,
  FileText,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import HeaderTitle from "@/components/layout/HeaderTitle";

export default function UploadSnapshotPage() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setUploading(false);
        setCompleted(true);
      }
    }, 100);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full px-2 pb-10">
      <div className="flex items-center justify-between">
        <HeaderTitle title="Upload Snapshot" />
        <Button variant="outline" className="h-9 px-3 bg-white border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-sm">
          <History size={14} className="text-muted-foreground" /> Riwayat Snapshot
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── Main Upload Section ── */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Sinkronisasi Data Lingkungan</CardTitle>
            </CardHeader>
            <CardContent className="p-12">
              {!completed ? (
                <div className="flex flex-col items-center text-center space-y-8">
                  <div className="h-16 w-16 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-slate-400">
                    <CloudUpload size={28} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground uppercase tracking-tight">Pilih Berkas Snapshot</h3>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed font-medium italic">
                      Gunakan format <span className="font-bold">.xlsx</span> atau <span className="font-bold">.json</span> yang sesuai dengan skema otorisasi GRC.
                    </p>
                  </div>

                  {uploading ? (
                    <div className="w-full max-w-xs space-y-3">
                      <Progress value={progress} className="h-1 bg-muted" />
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <span>Memproses...</span>
                        <span>{progress}%</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Button variant="outline" className="h-9 px-6 text-xs font-bold uppercase tracking-widest border-slate-200 rounded-md hover:bg-slate-50">
                        Berkas
                      </Button>
                      <Button onClick={handleUpload} className="h-9 px-6 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all">
                        Mulai Sinkron
                      </Button>
                    </div>
                  )}

                  <div className="flex items-center gap-8 pt-6 border-t border-border w-full justify-center">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      <FileText size={12} /> XLSX Template
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      <Database size={12} /> JSON Schema
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center space-y-6 py-6 animate-in zoom-in-95 duration-300">
                  <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-foreground uppercase tracking-tight">Sinkronisasi Berhasil</h3>
                    <p className="text-xs text-muted-foreground font-medium italic">Data snapshot telah diintegrasikan ke dalam lingkungan audit.</p>
                  </div>
                  <Button onClick={() => setCompleted(false)} variant="link" className="text-primary font-bold text-xs uppercase tracking-widest">
                    Unggah Baru
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Instructions Sidebar ── */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border border-border shadow-sm bg-card rounded-xl overflow-hidden">
            <CardHeader className="bg-muted/20 border-b border-border px-6 py-4">
              <CardTitle className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Instruksi Alur</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              {[
                { title: "Siapkan File", desc: "Pastikan menggunakan template resmi GRC." },
                { title: "Validasi Skema", desc: "Sistem akan memeriksa integrasi field Mandatory." },
                { title: "Proses Sinkron", desc: "Jangan menutup tab selama proses berlangsung." },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 group">
                  <span className="text-[10px] font-black text-muted-foreground/30 group-hover:text-primary transition-colors">0{i + 1}</span>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-foreground uppercase tracking-tight leading-none">{step.title}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-medium italic">{step.desc}</p>
                  </div>
                </div>
              ))}

              <div className="pt-6 border-t border-border">
                <button className="w-full flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-all text-left">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Download</p>
                    <p className="text-xs font-bold text-foreground">Excel Standard Template</p>
                  </div>
                  <ChevronRight className="text-muted-foreground/40" size={16} />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
