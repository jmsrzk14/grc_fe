"use client";

import React from "react";
import { STATS, MONITORING_ALERTS, RISK_LEVELS } from "@/lib/data";
import { 
  ArrowUpRight, 
  Activity,
  Bell,
  Clock,
  ShieldAlert,
  FileWarning,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">GRC DOTS</p>
        <h1 className="text-[32px] font-bold text-slate-900 tracking-tight mt-6">Dasbor</h1>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Card
            key={i}
            className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-xl overflow-hidden hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[12px] font-bold uppercase tracking-wider text-slate-400">
                  {stat.label}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.trend === 'up' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                  {(() => {
                    const Icon = stat.icon;
                    return <Icon size={16} />;
                  })()}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="text-[32px] font-bold text-slate-900 leading-none">{stat.value}</div>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.change}
                  <TrendingUp size={12} className={stat.trend === 'up' ? '' : 'rotate-180'} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Detail Cards ── */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Risk Distribution */}
        <Card
          className="lg:col-span-4 border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-xl overflow-hidden"
        >
          <CardHeader className="border-b border-slate-50 pb-4">
            <div className="flex items-center justify-between">
               <div>
                  <CardTitle className="text-lg font-bold text-slate-900">Risk Distribution</CardTitle>
                  <CardDescription className="text-xs font-medium text-slate-400">Total counted: {RISK_LEVELS.reduce((acc, curr) => acc + curr.count, 0)} Risks</CardDescription>
               </div>
               <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                  <Activity size={20} className="text-blue-600" />
               </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {RISK_LEVELS.map((item, i) => {
              const total = RISK_LEVELS.reduce((acc, curr) => acc + curr.count, 0);
              const percentage = Math.round((item.count / total) * 100);
              return (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500 uppercase tracking-wide">{item.name} Priority</span>
                    <span className="font-bold text-slate-900">{item.count} Risks ({percentage}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                     <div
                      className="h-full transition-all duration-1000"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: item.color 
                      }}
                     />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Governance & Alerts */}
        <Card
          className="lg:col-span-3 border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-white rounded-xl overflow-hidden"
        >
          <CardHeader className="border-b border-slate-50 pb-4">
            <div className="flex items-center justify-between">
               <div>
                  <CardTitle className="text-lg font-bold text-slate-900">Notifikasi</CardTitle>
                  <CardDescription className="text-xs font-medium text-slate-400">Pemberitahuan sistem terbaru</CardDescription>
               </div>
               <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                  <Bell size={20} className="text-blue-600" />
               </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-1">
              {MONITORING_ALERTS.map((alert) => (
                <div
                  key={alert.id}
                  className="flex gap-4 items-center p-3 rounded-lg transition-colors cursor-pointer group hover:bg-slate-50"
                >
                  <div className={`p-2 rounded-lg shrink-0 ${
                    alert.severity === 'High' ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {alert.type === 'Risk' && <ShieldAlert size={14} />}
                    {alert.type === 'Deadline' && <Clock size={14} />}
                    {alert.type === 'Policy' && <FileWarning size={14} />}
                    {alert.type === 'Governance' && <AlertCircle size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{alert.title}</p>
                    <p className="text-[11px] text-slate-400 font-medium truncate">{alert.detail}</p>
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
