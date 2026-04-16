"use client";

import { STATS, MONITORING_ALERTS } from "@/lib/data";
import { 
  ShieldCheck, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity,
  Bell,
  Clock,
  ShieldAlert,
  FileWarning
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tighter text-slate-800 uppercase letter-tighter">Dashboard</h1>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Card
            key={i}
            className="group hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
            style={{ background: "#ffffff", borderColor: "#e5e9f0" }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color === 'rose' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'} group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
                <stat.icon size={16} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-black ${stat.color === 'rose' ? 'text-rose-600' : 'text-slate-800'}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Detail Cards ── */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Risk Distribution */}
        <Card
          className="lg:col-span-4 shadow-sm overflow-hidden"
          style={{ background: "#ffffff", borderColor: "#e5e9f0" }}
        >
          <CardHeader className="border-b" style={{ borderColor: "#e5e9f0", background: "#f8fafc" }}>
            <div className="flex items-center justify-between">
               <div>
                  <CardTitle className="text-lg font-black text-slate-800 uppercase tracking-tight">Risk Distribution</CardTitle>
                  <CardDescription className="text-xs font-medium text-slate-400">Inventory of risks across severity levels</CardDescription>
               </div>
               <ShieldAlert size={20} className="text-rose-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {[
              { label: "Critical Risks", value: 15, color: "bg-rose-600" },
              { label: "High Priority", value: 35, color: "bg-rose-400" },
              { label: "Moderate Risks", value: 40, color: "bg-amber-500" },
              { label: "Managed Risks", value: 10, color: "bg-emerald-500" },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-600 uppercase tracking-wide">{item.label}</span>
                  <span className="font-black text-slate-800">{item.value}%</span>
                </div>
                <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: "#eef2f7" }}>
                   <div
                    className={`h-full ${item.color} transition-all duration-1000`}
                    style={{ width: `${item.value}%` }}
                   />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Governance & Alerts */}
        <Card
          className="lg:col-span-3 shadow-sm"
          style={{ background: "#ffffff", borderColor: "#e5e9f0" }}
        >
          <CardHeader className="border-b" style={{ borderColor: "#e5e9f0", background: "#f8fafc" }}>
            <div className="flex items-center justify-between">
               <div>
                  <CardTitle className="text-lg font-black text-slate-800 uppercase tracking-tight">System Notifications</CardTitle>
                  <CardDescription className="text-xs font-medium text-slate-400">Action items for Governance & Risk</CardDescription>
               </div>
               <Bell size={20} className="text-amber-500 animate-pulse" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {MONITORING_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  className="flex gap-4 items-start p-3 rounded-xl transition-colors cursor-pointer group hover:bg-slate-50 border border-transparent hover:border-slate-100"
                >
                  <div className={`mt-1 p-1.5 rounded-lg shrink-0 ${
                    alert.type === 'Risk' ? 'bg-rose-100 text-rose-600' :
                    alert.type === 'Deadline' ? 'bg-amber-100 text-amber-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {alert.type === 'Risk' && <ShieldAlert size={14} />}
                    {alert.type === 'Deadline' && <Clock size={14} />}
                    {alert.type === 'Policy' && <FileWarning size={14} />}
                    {alert.type === 'Governance' && <ShieldCheck size={14} />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-xs font-black text-slate-700 uppercase tracking-tight leading-none">{alert.title}</p>
                    <p className="text-[10px] text-slate-400 font-medium leading-tight">{alert.detail}</p>
                    <div className="flex items-center gap-2">
                       <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{alert.time}</span>
                    </div>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
