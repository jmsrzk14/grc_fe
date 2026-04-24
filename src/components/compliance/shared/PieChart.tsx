interface PieChartProps {
  pass?: number;
  fail?: number;
  na?: number;
  size?: "sm" | "md";
}

export default function PieChart({ pass = 0, fail = 0, na = 0, size = "sm" }: PieChartProps) {
  const total = pass + fail + na;
  const scoreBase = pass + fail;

  const sizeClass = size === "md" ? "w-20 h-20" : "w-20 h-20";
  const innerInset = size === "md" ? "inset-2.5" : "inset-3";
  const emptyTextSize = size === "md" ? "text-[10px] p-3" : "text-[8px] p-2";

  if (total === 0) {
    return (
      <div
        className={`${sizeClass} rounded-full bg-slate-100 flex items-center justify-center ${emptyTextSize} text-slate-400 font-bold uppercase text-center`}
      >
        Tidak Ada Data
      </div>
    );
  }

  const passPct = (pass / total) * 100;
  const failPct = (fail / total) * 100;
  const displayPct = scoreBase > 0 ? (pass / scoreBase) * 100 : 0;

  return (
    <div className={`relative ${sizeClass} group/chart`}>
      <div
        className="w-full h-full rounded-full shadow-inner transition-transform duration-500 group-hover/chart:scale-110"
        style={{
          background: `conic-gradient(
            #2acf33ff 0% ${passPct}%, 
            #cf0000ff ${passPct}% ${passPct + failPct}%, 
            #fffb04ff ${passPct + failPct}% 100%
          )`,
        }}
      />
      <div
        className={`absolute ${innerInset} bg-white rounded-full flex items-center justify-center shadow-sm`}
      >
        <span className="text-[12px] font-bold text-slate-800">
          {Math.round(displayPct)}%
        </span>
      </div>
    </div>
  );
}
