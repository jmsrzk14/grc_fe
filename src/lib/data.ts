import { 
  ShieldCheck, 
  AlertTriangle, 
  History, 
  Activity,
  type LucideIcon
} from "lucide-react";

export interface Stat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  color: string;
  icon: LucideIcon;
}

export const STATS: Stat[] = [
  { label: "Compliance Rate", value: "92%", change: "+2%", trend: "up", color: "blue", icon: ShieldCheck },
  { label: "Active Risks", value: "12", change: "+1", trend: "up", color: "rose", icon: AlertTriangle },
  { label: "Policies Updated", value: "45", change: "Alert", trend: "down", color: "amber", icon: History },
  { label: "Audit Findings", value: "3", change: "-2", trend: "down", color: "emerald", icon: Activity },
];

/* ── POJK Compliance Checklist (expanded) ── */
export interface ComplianceItem {
  id: string;
  name: string;
  regulation: string;    // e.g. "POJK No. 77/2016"
  category: "POJK" | "Regulasi" | "Internal" | "OJK" | "BI";
  status: "Compliant" | "Non-Compliant" | "In Progress" | "Overdue";
  pic: string;
  deadline: string;
  evidence: string | null;
  description: string;
  priority: "Critical" | "High" | "Medium" | "Low";
}

export const COMPLIANCE_DATA: ComplianceItem[] = [
  {
    id: "COMP-01", name: "Pelaporan Laporan Bulanan (LBU)",
    regulation: "POJK No. 18/POJK.03/2016",
    category: "POJK", status: "Compliant", pic: "Budi Santoso",
    deadline: "2024-04-10", evidence: "LBU_MAR_2024.pdf",
    description: "Laporan bulanan kondisi keuangan wajib disampaikan ke OJK",
    priority: "Critical"
  },
  {
    id: "COMP-02", name: "Screening Nama Nasabah (Sanction List)",
    regulation: "POJK No. 12/POJK.01/2017",
    category: "Regulasi", status: "Non-Compliant", pic: "Budi S.",
    deadline: "2024-03-31", evidence: null,
    description: "Pemeriksaan nama nasabah terhadap daftar sanksi internasional (OFAC, UN)",
    priority: "Critical"
  },
  {
    id: "COMP-03", name: "Verifikasi Identitas Nasabah (E-KYC)",
    regulation: "POJK No. 23/POJK.01/2019",
    category: "Internal", status: "Compliant", pic: "Santi Ayu",
    deadline: "2024-05-15", evidence: "KYC_PROC_V2.pdf",
    description: "Prosedur verifikasi identitas digital nasabah sesuai standar KYC",
    priority: "High"
  },
  {
    id: "COMP-04", name: "Audit Sertifikasi Keamanan IT",
    regulation: "POJK No. 38/POJK.03/2016",
    category: "POJK", status: "Overdue", pic: "IT Dept",
    deadline: "2024-04-01", evidence: null,
    description: "Sertifikasi sistem keamanan informasi wajib dilakukan setiap tahun",
    priority: "Critical"
  },
  {
    id: "COMP-05", name: "Pelaporan Transaksi Keuangan Mencurigakan (LTKM)",
    regulation: "UU No. 8 Tahun 2010",
    category: "OJK", status: "Compliant", pic: "Tim AML",
    deadline: "2024-04-30", evidence: "LTKM_Q1_2024.pdf",
    description: "Pelaporan transaksi keuangan mencurigakan ke PPATK dalam 3 hari kerja",
    priority: "Critical"
  },
  {
    id: "COMP-06", name: "Pelaporan Transaksi Keuangan Tunai (LTKT)",
    regulation: "UU No. 8 Tahun 2010",
    category: "OJK", status: "In Progress", pic: "Tim AML",
    deadline: "2024-04-25", evidence: null,
    description: "Pelaporan transaksi tunai di atas Rp500 juta kepada PPATK",
    priority: "Critical"
  },
  {
    id: "COMP-07", name: "Kecukupan Modal Minimum (CAR)",
    regulation: "POJK No. 11/POJK.03/2016",
    category: "BI", status: "Compliant", pic: "Divisi Keuangan",
    deadline: "2024-06-30", evidence: "CAR_Q1_2024.pdf",
    description: "Rasio kecukupan modal (CAR) wajib dijaga minimal 12% sesuai ketentuan",
    priority: "High"
  },
  {
    id: "COMP-08", name: "Perlindungan Data Nasabah (PDP)",
    regulation: "UU No. 27 Tahun 2022",
    category: "Regulasi", status: "In Progress", pic: "DPO Officer",
    deadline: "2024-07-01", evidence: null,
    description: "Implementasi kebijakan perlindungan data pribadi nasabah sesuai UU PDP",
    priority: "High"
  },
  {
    id: "COMP-09", name: "Rasio Likuiditas (LCR/NSFR)",
    regulation: "POJK No. 42/POJK.03/2015",
    category: "BI", status: "Compliant", pic: "Treasury",
    deadline: "2024-04-15", evidence: "LCR_MAR_2024.pdf",
    description: "Monitoring dan pelaporan rasio likuiditas jangka pendek dan panjang",
    priority: "High"
  },
  {
    id: "COMP-10", name: "Pelaporan Rencana Bisnis Bank (RBB)",
    regulation: "POJK No. 5/POJK.03/2016",
    category: "POJK", status: "Non-Compliant", pic: "Divisi Perencanaan",
    deadline: "2024-03-15", evidence: null,
    description: "Penyampaian rencana bisnis dan realisasi kepada OJK setiap tahun",
    priority: "Medium"
  },
  {
    id: "COMP-11", name: "SOP Anti Pencucian Uang (APU-PPT)",
    regulation: "POJK No. 12/POJK.01/2017",
    category: "Internal", status: "Compliant", pic: "Compliance",
    deadline: "2024-05-01", evidence: "SOP_APU_V3.pdf",
    description: "Implementasi program APU dan PPT mencakup identifikasi, penilaian, dan mitigasi risiko",
    priority: "Critical"
  },
  {
    id: "COMP-12", name: "Pelatihan Wajib Karyawan (APU-PPT)",
    regulation: "POJK No. 12/POJK.01/2017",
    category: "Internal", status: "In Progress", pic: "HR & Compliance",
    deadline: "2024-06-01", evidence: null,
    description: "Pelatihan APU-PPT wajib untuk seluruh karyawan minimal 1 kali per tahun",
    priority: "Medium"
  },
];

export const MONITORING_ALERTS = [
  { id: "ALT-001", type: "Risk", title: "Risk Threshold Exceeded", detail: "Market volatility risk score has passed the 'High' threshold", severity: "High", time: "10m ago" },
  { id: "ALT-002", type: "Policy", title: "Policy Review Due", detail: "SOP Keamanan Data Nasabah requires annual review", severity: "Medium", time: "2h ago" },
  { id: "ALT-003", type: "Deadline", title: "Compliance Deadline", detail: "Pelaporan POJK #55 passing in 2 days", severity: "High", time: "Yesterday" },
  { id: "ALT-004", type: "Governance", title: "Board Approval Missing", detail: "Strategic plan v2 requires final board sign-off", severity: "Medium", time: "5h ago" },
];

/* ── Transaction Monitoring (Large / Suspicious Transactions) ── */
export interface TransactionAlert {
  id: string;
  nasabahId: string;
  nasabahName: string;
  type: "Tunai" | "Transfer" | "Tarik Tunai" | "Setor Tunai";
  amount: number;            // in IDR
  threshold: number;         // in IDR — threshold yang dilampaui
  flagReason: "Large Transaction" | "Suspicious Pattern" | "Blacklist Match" | "Rapid Succession";
  channel: "Teller" | "ATM" | "Mobile Banking" | "Internet Banking" | "RTGS";
  date: string;
  time: string;
  branch: string;
  riskLevel: "Critical" | "High" | "Medium";
  status: "Unreviewed" | "Under Review" | "Reported to PPATK" | "Cleared";
  notes: string;
}

export const TRANSACTION_ALERTS: TransactionAlert[] = [
  {
    id: "TRX-001", nasabahId: "NAS-4521", nasabahName: "PT Maju Sejahtera",
    type: "Setor Tunai", amount: 2_500_000_000, threshold: 500_000_000,
    flagReason: "Large Transaction", channel: "Teller",
    date: "2024-04-15", time: "10:23", branch: "KC Jakarta Pusat",
    riskLevel: "Critical", status: "Unreviewed",
    notes: "Setoran tunai Rp2,5 M tanpa keterangan sumber dana"
  },
  {
    id: "TRX-002", nasabahId: "NAS-7731", nasabahName: "Ahmad Fauzi",
    type: "Transfer", amount: 850_000_000, threshold: 500_000_000,
    flagReason: "Suspicious Pattern", channel: "Internet Banking",
    date: "2024-04-15", time: "02:14", branch: "Digital",
    riskLevel: "Critical", status: "Under Review",
    notes: "Transfer pukul 02.14 dini hari ke 3 rekening berbeda dalam 10 menit"
  },
  {
    id: "TRX-003", nasabahId: "NAS-1190", nasabahName: "CV Berkah Abadi",
    type: "Tarik Tunai", amount: 750_000_000, threshold: 500_000_000,
    flagReason: "Large Transaction", channel: "Teller",
    date: "2024-04-14", time: "15:45", branch: "KC Surabaya",
    riskLevel: "High", status: "Reported to PPATK",
    notes: "Penarikan tunai besar tidak sesuai profil bisnis usaha kecil"
  },
  {
    id: "TRX-004", nasabahId: "NAS-3302", nasabahName: "Budi Hartono",
    type: "Transfer", amount: 620_000_000, threshold: 500_000_000,
    flagReason: "Blacklist Match", channel: "Mobile Banking",
    date: "2024-04-14", time: "11:30", branch: "Digital",
    riskLevel: "Critical", status: "Under Review",
    notes: "Nama penerima cocok dengan daftar sanksi internal"
  },
  {
    id: "TRX-005", nasabahId: "NAS-9017", nasabahName: "Siti Rahayu",
    type: "Setor Tunai", amount: 510_000_000, threshold: 500_000_000,
    flagReason: "Rapid Succession", channel: "Teller",
    date: "2024-04-13", time: "09:55", branch: "KC Bandung",
    riskLevel: "High", status: "Cleared",
    notes: "5 setoran tunai berbeda dalam 2 jam — telah dikonfirmasi sumber dana"
  },
  {
    id: "TRX-006", nasabahId: "NAS-6642", nasabahName: "PT Global Nusantara",
    type: "Transfer", amount: 3_200_000_000, threshold: 500_000_000,
    flagReason: "Large Transaction", channel: "RTGS",
    date: "2024-04-13", time: "14:20", branch: "KP Jakarta",
    riskLevel: "High", status: "Cleared",
    notes: "Transfer RTGS antar bank — dilengkapi dokumen kontrak bisnis"
  },
];

/* ── Customer Data Completeness Monitoring ── */
export interface CustomerRecord {
  id: string;
  name: string;
  segment: "Retail" | "Korporat" | "UMKM" | "Premium";
  accountType: string;
  missingFields: string[];
  completeness: number;       // 0–100 %
  lastUpdated: string;
  branch: string;
  riskFlag: boolean;
  status: "Complete" | "Incomplete" | "Needs Verification";
}

export const CUSTOMER_DATA: CustomerRecord[] = [
  {
    id: "NAS-1010", name: "Dewi Kusuma", segment: "Retail", accountType: "Tabungan",
    missingFields: ["NPWP", "Pekerjaan terkini"],
    completeness: 75, lastUpdated: "2024-01-20", branch: "KC Bekasi", riskFlag: false,
    status: "Incomplete"
  },
  {
    id: "NAS-2234", name: "PT Karya Mandiri", segment: "Korporat", accountType: "Giro",
    missingFields: ["Akta perubahan terbaru", "SIUP", "NPWP perusahaan", "Laporan keuangan 2023"],
    completeness: 45, lastUpdated: "2023-08-15", branch: "KC Jakarta Selatan", riskFlag: true,
    status: "Incomplete"
  },
  {
    id: "NAS-3311", name: "Rudi Setiawan", segment: "UMKM", accountType: "KUR",
    missingFields: ["Surat izin usaha", "Foto usaha terbaru"],
    completeness: 80, lastUpdated: "2024-02-10", branch: "KC Bogor", riskFlag: false,
    status: "Needs Verification"
  },
  {
    id: "NAS-4521", name: "PT Maju Sejahtera", segment: "Korporat", accountType: "Giro",
    missingFields: ["Beneficial Owner declaration", "Sumber dana"],
    completeness: 60, lastUpdated: "2023-12-01", branch: "KC Jakarta Pusat", riskFlag: true,
    status: "Incomplete"
  },
  {
    id: "NAS-5544", name: "Halimah Nasution", segment: "Premium", accountType: "Deposito",
    missingFields: [],
    completeness: 100, lastUpdated: "2024-03-15", branch: "KC Medan", riskFlag: false,
    status: "Complete"
  },
  {
    id: "NAS-6601", name: "Ahmad Fauzi", segment: "Retail", accountType: "Tabungan",
    missingFields: ["Alamat terbaru", "No. HP aktif", "Foto KTP terbaru"],
    completeness: 55, lastUpdated: "2022-06-30", branch: "Digital", riskFlag: true,
    status: "Incomplete"
  },
  {
    id: "NAS-7731", name: "Ahmad Fauzi", segment: "Retail", accountType: "Tabungan",
    missingFields: ["Tanda tangan digital", "Verifikasi biometrik"],
    completeness: 85, lastUpdated: "2024-01-05", branch: "Digital", riskFlag: false,
    status: "Needs Verification"
  },
  {
    id: "NAS-8820", name: "CV Tani Jaya", segment: "UMKM", accountType: "Kredit Modal",
    missingFields: ["Laporan keuangan 2023", "Agunan update", "SKU terbaru", "Foto agunan"],
    completeness: 35, lastUpdated: "2022-11-20", branch: "KC Yogyakarta", riskFlag: true,
    status: "Incomplete"
  },
  {
    id: "NAS-9017", name: "Siti Rahayu", segment: "Retail", accountType: "Tabungan",
    missingFields: ["NPWP"],
    completeness: 90, lastUpdated: "2024-03-28", branch: "KC Bandung", riskFlag: false,
    status: "Needs Verification"
  },
  {
    id: "NAS-9900", name: "Budi Hartono", segment: "Premium", accountType: "Investasi",
    missingFields: [],
    completeness: 100, lastUpdated: "2024-04-01", branch: "KP Jakarta", riskFlag: false,
    status: "Complete"
  },
];

export const RISK_LEVELS = [
  { id: 1, name: "Critical", count: 2, color: "#e11d48" },
  { id: 2, name: "High", count: 4, color: "#fb7185" },
  { id: 3, name: "Medium", count: 5, color: "#fbbf24" },
  { id: 4, name: "Low", count: 1, color: "#34d399" },
];

export const RISK_REGISTER = [
  { id: "RSK-001", title: "Market Volatility", category: "Pasar", impact: "High", likelihood: "Medium", status: "Mitigated", owner: "Treasury", inherentScore: 15, residualScore: 6 },
  { id: "RSK-002", title: "Cyber Security Breach", category: "Operasional", impact: "Critical", likelihood: "Low", status: "Active", owner: "IT Sec", inherentScore: 20, residualScore: 12 },
  { id: "RSK-003", title: "Regulatory Change", category: "Kepatuhan", impact: "Medium", likelihood: "High", status: "Active", owner: "Legal", inherentScore: 12, residualScore: 9 },
  { id: "RSK-004", title: "Third Party Default", category: "Kredit", impact: "High", likelihood: "Low", status: "Mitigated", owner: "Risk Dept", inherentScore: 10, residualScore: 4 },
  { id: "RSK-005", title: "Fraud Internal", category: "Operasional", impact: "Critical", likelihood: "Medium", status: "Active", owner: "Compliance", inherentScore: 18, residualScore: 10 },
  { id: "RSK-006", title: "Volatilitas Nilai Tukar", category: "Pasar", impact: "Medium", likelihood: "High", status: "Active", owner: "Treasury", inherentScore: 9, residualScore: 7 },
];

export const GOVERNANCE_REPORTS = [
  { id: "GOV-01", title: "Annual General Meeting", date: "2024-03-20", status: "Completed", type: "Shareholders" },
  { id: "GOV-02", title: "Quarterly Board Meeting", date: "2024-06-15", status: "Scheduled", type: "Board" },
  { id: "GOV-03", title: "ESG Compliance Report", date: "2024-04-10", status: "Draft", type: "Regulatory" },
];

export const POLICIES = [
  {
    id: "POL-SEC-01",
    title: "SOP Keamanan Data Nasabah",
    version: "v2.1",
    isCreated: true,
    isApproved: true,
    lastUpdate: "2024-01-15",
    approver: "CSO"
  },
  {
    id: "POL-GOV-02",
    title: "Kode Etik Perusahaan",
    version: "v1.4",
    isCreated: true,
    isApproved: true,
    lastUpdate: "2024-02-10",
    approver: "Board"
  },
];

export const AUDIT_TRAIL = [
  {
    id: "LOG-001",
    inputBy: "Admin",
    editBy: "Supervisor Budi",
    action: "UPDATE",
    target: "Policy: POL-SEC-01",
    timestamp: "2024-03-31 10:15:22",
    module: "Policy Tracking"
  },
];

/* ── Mitigation Plans ── */
export interface MitigationPlan {
  id: string;
  riskId: string;
  riskTitle: string;
  action: string;
  pic: string;
  deadline: string;
  status: "On Track" | "Delayed" | "Completed" | "Not Started";
  progress: number;
  priority: "Critical" | "High" | "Medium" | "Low";
}

export const MITIGATION_PLANS: MitigationPlan[] = [
  {
    id: "MIT-001", riskId: "RSK-001", riskTitle: "Market Volatility",
    action: "Implementasi hedging instrument untuk lindung nilai posisi terbuka",
    pic: "Treasury Dept", deadline: "2024-06-30", status: "On Track", progress: 65, priority: "High"
  },
  {
    id: "MIT-002", riskId: "RSK-001", riskTitle: "Market Volatility",
    action: "Review dan perbarui limit posisi pasar setiap kuartal",
    pic: "Risk Dept", deadline: "2024-04-30", status: "Completed", progress: 100, priority: "Medium"
  },
  {
    id: "MIT-003", riskId: "RSK-002", riskTitle: "Cyber Security Breach",
    action: "Penetration testing menyeluruh pada seluruh sistem kritikal",
    pic: "IT Security", deadline: "2024-05-15", status: "On Track", progress: 40, priority: "Critical"
  },
  {
    id: "MIT-004", riskId: "RSK-002", riskTitle: "Cyber Security Breach",
    action: "Pelatihan keamanan siber wajib untuk seluruh karyawan",
    pic: "HR & IT", deadline: "2024-04-15", status: "Delayed", progress: 20, priority: "High"
  },
  {
    id: "MIT-005", riskId: "RSK-003", riskTitle: "Regulatory Change",
    action: "Pembentukan tim monitoring regulasi POJK terbaru",
    pic: "Legal Dept", deadline: "2024-05-01", status: "On Track", progress: 75, priority: "High"
  },
  {
    id: "MIT-006", riskId: "RSK-004", riskTitle: "Third Party Default",
    action: "Perketat proses due diligence dan credit scoring pihak ketiga",
    pic: "Credit Analyst", deadline: "2024-03-31", status: "Completed", progress: 100, priority: "Critical"
  },
  {
    id: "MIT-007", riskId: "RSK-005", riskTitle: "Fraud Internal",
    action: "Implementasi sistem whistle-blower anonim",
    pic: "Compliance", deadline: "2024-07-01", status: "Not Started", progress: 0, priority: "Critical"
  },
  {
    id: "MIT-008", riskId: "RSK-006", riskTitle: "Volatilitas Nilai Tukar",
    action: "Diversifikasi portofolio ke multi-currency untuk mengurangi eksposur",
    pic: "Treasury Dept", deadline: "2024-06-15", status: "On Track", progress: 50, priority: "Medium"
  },
];

/* ── RACI Matrix ── */
export interface RaciRow {
  id: string;
  process: string;
  category: string;
  dirut: "R" | "A" | "C" | "I" | "-";
  dkom: "R" | "A" | "C" | "I" | "-";
  riskOfficer: "R" | "A" | "C" | "I" | "-";
  compliance: "R" | "A" | "C" | "I" | "-";
  internalAudit: "R" | "A" | "C" | "I" | "-";
  it: "R" | "A" | "C" | "I" | "-";
  finance: "R" | "A" | "C" | "I" | "-";
  hr: "R" | "A" | "C" | "I" | "-";
}

export const RACI_MATRIX: RaciRow[] = [
  { id: "RACI-01", process: "Penetapan Strategi Risiko", category: "Risk", dirut: "A", dkom: "C", riskOfficer: "R", compliance: "C", internalAudit: "I", it: "-", finance: "I", hr: "-" },
  { id: "RACI-02", process: "Penilaian & Identifikasi Risiko", category: "Risk", dirut: "I", dkom: "I", riskOfficer: "R", compliance: "C", internalAudit: "C", it: "C", finance: "C", hr: "C" },
  { id: "RACI-03", process: "Persetujuan Kebijakan Perusahaan", category: "Governance", dirut: "A", dkom: "A", riskOfficer: "C", compliance: "R", internalAudit: "I", it: "I", finance: "I", hr: "I" },
  { id: "RACI-04", process: "Pelaporan Kepatuhan Regulasi", category: "Compliance", dirut: "I", dkom: "I", riskOfficer: "C", compliance: "R", internalAudit: "C", it: "I", finance: "C", hr: "-" },
  { id: "RACI-05", process: "Audit Internal & Temuan", category: "Audit", dirut: "A", dkom: "I", riskOfficer: "C", compliance: "C", internalAudit: "R", it: "C", finance: "C", hr: "C" },
  { id: "RACI-06", process: "Pengelolaan Keamanan IT", category: "IT", dirut: "I", dkom: "-", riskOfficer: "C", compliance: "I", internalAudit: "C", it: "R", finance: "-", hr: "-" },
  { id: "RACI-07", process: "Pengelolaan SDM & Etik", category: "HR", dirut: "A", dkom: "I", riskOfficer: "-", compliance: "C", internalAudit: "I", it: "-", finance: "-", hr: "R" },
  { id: "RACI-08", process: "Laporan Keuangan & Anggaran", category: "Finance", dirut: "A", dkom: "A", riskOfficer: "I", compliance: "I", internalAudit: "C", it: "I", finance: "R", hr: "-" },
  { id: "RACI-09", process: "Rencana Pemulihan Bencana (DRP)", category: "IT", dirut: "I", dkom: "-", riskOfficer: "A", compliance: "C", internalAudit: "I", it: "R", finance: "I", hr: "C" },
  { id: "RACI-10", process: "Pengadaan & Kontrak Pihak Ketiga", category: "Finance", dirut: "A", dkom: "I", riskOfficer: "C", compliance: "C", internalAudit: "C", it: "-", finance: "R", hr: "-" },
];

/* ── Meeting Minutes ── */
export interface MeetingMinute {
  id: string;
  title: string;
  date: string;
  type: "Board" | "Komisaris" | "Direksi" | "Komite";
  chairperson: string;
  attendees: string[];
  agenda: string[];
  decisions: string[];
  status: "Draft" | "Final" | "Pending Approval";
  actionItems: { item: string; pic: string; deadline: string }[];
}

export const MEETING_MINUTES: MeetingMinute[] = [
  {
    id: "MTG-001",
    title: "Rapat Direksi Kuartal I 2024",
    date: "2024-03-15",
    type: "Direksi",
    chairperson: "Direktur Utama",
    attendees: ["Direktur Utama", "Direktur Keuangan", "Direktur Operasional", "Risk Officer", "Compliance"],
    agenda: ["Review KPI Q1 2024", "Evaluasi risiko pasar", "Persetujuan anggaran Q2"],
    decisions: [
      "KPI Q1 2024 tercapai 87% dari target yang ditetapkan",
      "Limit risiko pasar diperketat menjadi 15% dari modal",
      "Anggaran Q2 disetujui dengan catatan efisiensi 5%"
    ],
    status: "Final",
    actionItems: [
      { item: "Penyusunan laporan KPI Q2", pic: "CFO", deadline: "2024-06-30" },
      { item: "Update risk appetite statement", pic: "Risk Officer", deadline: "2024-04-15" }
    ]
  },
  {
    id: "MTG-002",
    title: "Rapat Dewan Komisaris — Pengawasan Tahunan",
    date: "2024-03-20",
    type: "Komisaris",
    chairperson: "Komisaris Utama",
    attendees: ["Komisaris Utama", "Komisaris Independen 1", "Komisaris Independen 2", "Komisaris", "Direktur Utama"],
    agenda: ["Laporan tahunan manajemen", "Evaluasi GCG", "Penetapan target 2024"],
    decisions: [
      "Laporan tahunan 2023 diterima dengan catatan peningkatan disclosure",
      "Skor GCG ditargetkan meningkat 10 poin di 2024",
      "Penetapan target pertumbuhan aset 12% di 2024"
    ],
    status: "Final",
    actionItems: [
      { item: "Perbaikan laporan disclosure tahunan", pic: "Compliance", deadline: "2024-04-30" },
      { item: "Implementasi program GCG baru", pic: "Dirut", deadline: "2024-06-01" }
    ]
  },
  {
    id: "MTG-003",
    title: "Rapat Komite Audit — Temuan Internal",
    date: "2024-04-05",
    type: "Komite",
    chairperson: "Komisaris Independen 1",
    attendees: ["Komisaris Independen 1", "Komisaris Independen 2", "Internal Audit", "External Auditor"],
    agenda: ["Review temuan audit internal", "Tindak lanjut rekomendasi", "Rencana audit Q2"],
    decisions: [
      "3 temuan kritis harus ditindaklanjuti dalam 30 hari",
      "Audit IT security dijadwalkan bulan Mei 2024"
    ],
    status: "Pending Approval",
    actionItems: [
      { item: "Tindak lanjut 3 temuan kritis", pic: "Internal Audit", deadline: "2024-05-05" },
      { item: "Jadwal audit IT security", pic: "IT Security", deadline: "2024-05-15" }
    ]
  },
  {
    id: "MTG-004",
    title: "Rapat Direksi — Review Risiko Siber",
    date: "2024-04-10",
    type: "Direksi",
    chairperson: "Direktur Operasional",
    attendees: ["Direktur Operasional", "Direktur Utama", "IT Security", "Risk Officer", "Compliance"],
    agenda: ["Presentasi insiden siber Q1", "Review kebijakan keamanan IT", "Anggaran cybersecurity"],
    decisions: [
      "Kebijakan keamanan IT direvisi dan harus disahkan sebelum 30 April",
      "Anggaran cybersecurity ditingkatkan 20%"
    ],
    status: "Draft",
    actionItems: [
      { item: "Revisi kebijakan keamanan IT", pic: "IT Security", deadline: "2024-04-30" },
      { item: "Pengajuan anggaran cybersecurity ke CFO", pic: "CTO", deadline: "2024-04-20" }
    ]
  },
];

/* ── KPI Data ── */
export interface KpiItem {
  id: string;
  name: string;
  category: "Financial" | "Operasional" | "Risk" | "Governance" | "Customer";
  target: number;
  actual: number;
  unit: string;
  trend: "up" | "down" | "stable";
  status: "On Track" | "At Risk" | "Off Track" | "Achieved";
  owner: string;
  period: string;
}

export const KPI_DATA: KpiItem[] = [
  { id: "KPI-001", name: "Return on Assets (ROA)", category: "Financial", target: 2.5, actual: 2.1, unit: "%", trend: "up", status: "At Risk", owner: "CFO", period: "Q1 2024" },
  { id: "KPI-002", name: "Net Interest Margin (NIM)", category: "Financial", target: 5.0, actual: 5.3, unit: "%", trend: "up", status: "Achieved", owner: "Treasury", period: "Q1 2024" },
  { id: "KPI-003", name: "Non-Performing Loan (NPL)", category: "Financial", target: 3.0, actual: 2.4, unit: "%", trend: "down", status: "Achieved", owner: "Risk Dept", period: "Q1 2024" },
  { id: "KPI-004", name: "Loan to Deposit Ratio (LDR)", category: "Financial", target: 85.0, actual: 88.5, unit: "%", trend: "up", status: "At Risk", owner: "Treasury", period: "Q1 2024" },
  { id: "KPI-005", name: "Tingkat Kepatuhan Regulasi", category: "Governance", target: 100, actual: 92, unit: "%", trend: "up", status: "At Risk", owner: "Compliance", period: "Q1 2024" },
  { id: "KPI-006", name: "Risk Residual Score Avg", category: "Risk", target: 8, actual: 7.5, unit: "pts", trend: "down", status: "On Track", owner: "Risk Officer", period: "Q1 2024" },
  { id: "KPI-007", name: "Audit Finding Resolution Rate", category: "Governance", target: 90, actual: 85, unit: "%", trend: "up", status: "At Risk", owner: "Internal Audit", period: "Q1 2024" },
  { id: "KPI-008", name: "Customer Satisfaction Index", category: "Customer", target: 4.5, actual: 4.3, unit: "/5", trend: "stable", status: "On Track", owner: "Customer Care", period: "Q1 2024" },
  { id: "KPI-009", name: "Rasio Kecukupan Modal (CAR)", category: "Risk", target: 14.0, actual: 16.2, unit: "%", trend: "up", status: "Achieved", owner: "CFO", period: "Q1 2024" },
  { id: "KPI-010", name: "SLA Layanan Operasional", category: "Operasional", target: 99.5, actual: 99.1, unit: "%", trend: "stable", status: "On Track", owner: "COO", period: "Q1 2024" },
  { id: "KPI-011", name: "Waktu Penyelesaian Pengaduan", category: "Customer", target: 3, actual: 4.2, unit: "hari", trend: "down", status: "Off Track", owner: "Customer Care", period: "Q1 2024" },
  { id: "KPI-012", name: "Efisiensi Biaya Operasional (BOPO)", category: "Operasional", target: 80, actual: 82.5, unit: "%", trend: "down", status: "Off Track", owner: "CFO", period: "Q1 2024" },
];
