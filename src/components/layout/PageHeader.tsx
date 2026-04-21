"use client";

import React from "react";

interface PageHeaderProps {
  category: string;
  title: string;
}

export default function PageHeader({ category, title }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1.5 mb-8">
      <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
        {category}
      </p>
      <h2 className="text-[32px] font-extrabold text-[#0f172a] tracking-tighter leading-none">
        {title}
      </h2>
    </div>
  );
}
