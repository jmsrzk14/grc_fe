"use client";

import React from "react";
import { STATS } from "@/lib/data";
import { 
  Plus
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import HeaderTitle from "@/components/layout/HeaderTitle";

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full px-2">
      <HeaderTitle title="Dashboard Overview" />

      {/* ── Toolbar ── */}
      <div className="flex items-center justify-end gap-3 mb-6">
        <Button variant="outline" className="h-9 px-3 bg-white border border-slate-200 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-sm">
          Filter Data
        </Button>
        <Button className="h-9 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-sm">
          <Plus className="w-4 h-4" /> Generate Report
        </Button>
      </div>

      {/* ── Only Stat Cards ── */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Card
            key={i}
            className="border border-border shadow-sm bg-card rounded-xl overflow-hidden hover:border-primary/20 hover:shadow-md transition-all duration-300"
          >
            <CardContent className="p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                {stat.label}
              </p>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</div>
                <div className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                }`}>
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
