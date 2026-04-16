"use client";

import React, { useState } from "react";
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Search,
  History,
  CloudUpload,
  ArrowRight,
  Database
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function UploadSnapshotPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setUploading(false);
        setCompleted(true);
      }
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">GRC DOTS</p>
        <div className="flex items-center justify-between mt-6">
          <h2 className="text-[32px] font-bold text-slate-900 tracking-tight">Upload Snapshot</h2>
          <Button variant="outline" className="h-10 px-4 font-bold text-slate-600 gap-2 border-slate-200">
            <History size={16} /> History
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Upload Area ── */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-xl overflow-hidden">
            <CardContent className="p-8">
              {!completed ? (
                <div 
                  className={`
                    border-2 border-dashed rounded-2xl p-16 flex flex-col items-center gap-6 transition-all duration-300
                    ${dragActive ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"}
                  `}
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
                >
                  <div className="h-20 w-20 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                    <CloudUpload size={40} />
                  </div>
                  
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-slate-800">Drag & Drop Snapshot Data</h3>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto">
                       Upload data snapshot terbaru dalam format <span className="font-bold text-slate-800">.xlsx</span> atau <span className="font-bold text-slate-800">.json</span> untuk sinkronisasi sistem GRC.
                    </p>
                  </div>

                  {uploading ? (
                    <div className="w-full max-w-sm space-y-4">
                      <Progress value={progress} className="h-2 bg-slate-100" />
                      <p className="text-xs font-bold text-center text-blue-600 animate-pulse uppercase tracking-widest">Processing Data {progress}%...</p>
                    </div>
                  ) : (
                    <div className="flex gap-4 mt-4">
                      <Button variant="outline" className="h-12 px-8 font-bold text-slate-700 bg-white border-slate-200 hover:bg-slate-50">
                        Pilih File
                      </Button>
                      <Button onClick={handleUpload} className="h-12 px-8 font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all">
                        Upload Snapshot
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-6 py-8">
                  <div className="h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-100 scale-110 transition-transform duration-500">
                    <CheckCircle2 size={40} />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-slate-800">Upload Berhasil!</h3>
                    <p className="text-sm text-slate-500 font-medium italic">
                      Snapshot <span className="font-mono text-blue-600 font-bold">2026-04-16_GRC_SNAP.xlsx</span> telah berhasil diproses.
                    </p>
                  </div>
                  <Button onClick={() => setCompleted(false)} variant="link" className="text-blue-500 font-bold uppercase tracking-widest text-[11px]">
                    Upload Snapshot Lainnya
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ── Guidelines ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-none shadow-sm bg-blue-50/50 border-blue-100">
              <CardContent className="p-4 flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0">
                  <Database size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Auto-Refinement</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">Sistem akan otomatis menyesuaikan data Risk, Compliance, dan Governance berdasarkan snapshot terbaru.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-slate-100/50 border-slate-200">
              <CardContent className="p-4 flex gap-3">
                <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center text-white shrink-0">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Peringatan Data</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">Pastikan skema data sesuai dengan template standar GRC DOTS untuk menghindari kegagalan sinkronisasi.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ── Instructions / Sidebar Info ── */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-white overflow-hidden">
             <div className="h-1 bg-blue-600 w-full" />
             <CardContent className="p-6">
               <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6">Informasi Snapshot</h3>
               <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 font-bold text-[12px] border border-slate-100">1</div>
                    <div className="flex-1">
                       <p className="text-[13px] font-bold text-slate-700">Persiapkan Data</p>
                       <p className="text-[11px] text-slate-400 mt-1">Gunakan format Excel (.xlsx) dengan kolom yang sudah ditentukan.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 font-bold text-[12px] border border-slate-100">2</div>
                    <div className="flex-1">
                       <p className="text-[13px] font-bold text-slate-700">Validasi Sistem</p>
                       <p className="text-[11px] text-slate-400 mt-1">Sistem akan memeriksa integritas data sebelum melakukan update database.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 font-bold text-[12px] border border-slate-100">3</div>
                    <div className="flex-1">
                       <p className="text-[13px] font-bold text-slate-700">Update Dashboard</p>
                       <p className="text-[11px] text-slate-400 mt-1">Setelah berhasil, dashboard akan otomatis terupdate dengan data terbaru.</p>
                    </div>
                 </div>
               </div>
               
               <Button variant="link" className="w-full mt-10 text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] gap-2">
                 Download Template <ArrowRight size={14} />
               </Button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
