"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Printer,
  BarChart3,
  CalendarCheck,
  CreditCard,
  UserCheck,
  CheckCircle2,
  FileSpreadsheet,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ReportTemplate {
  id: string;
  title: string;
  category: "ACADEMIC" | "ATTENDANCE" | "FINANCE" | "STAFF";
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  formats: string[];
}

const reportTemplates: ReportTemplate[] = [
  {
    id: "rep-1",
    title: "Term 3 Examination Summary & Grade Distribution",
    category: "ACADEMIC",
    description: "Full breakdown of student performance across subjects, class rankings, and distinction rates.",
    icon: BarChart3,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#123B6D]",
    formats: ["PDF", "CSV"],
  },
  {
    id: "rep-2",
    title: "Cumulative Student Attendance Audit",
    category: "ATTENDANCE",
    description: "Daily roll metrics, chronic absenteeism alerts, and class attendance percentages for Term 3.",
    icon: CalendarCheck,
    iconBg: "bg-[#CCFBF1]",
    iconColor: "text-[#0F766E]",
    formats: ["PDF", "CSV"],
  },
  {
    id: "rep-3",
    title: "Fee Revenue & Outstanding Debtors Ledger",
    category: "FINANCE",
    description: "Itemized statement of tuition collections, outstanding family balances, and payment receipts.",
    icon: CreditCard,
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
    formats: ["PDF", "CSV"],
  },
  {
    id: "rep-4",
    title: "Teacher Workload & Teaching Period Roster",
    category: "STAFF",
    description: "Department-level teaching hours, assigned class streams, and timetable distributions.",
    icon: UserCheck,
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#D97706]",
    formats: ["PDF"],
  },
];

export default function ReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [exportNotice, setExportNotice] = useState<string>("");

  const filteredReports = reportTemplates.filter(
    (r) => selectedCategory === "ALL" || r.category === selectedCategory
  );

  function handleExport(title: string, format: string) {
    setExportNotice(`Exporting "${title}" as ${format}...`);
    setTimeout(() => setExportNotice(""), 3500);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Reports & Analytics Hub
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Generate and export institutional academic, attendance, and financial statements.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#0F766E] bg-teal-50 border border-teal-200 px-3.5 py-2 rounded-lg">
          <span>Reporting Period: Academic Year 2026 — Term 3</span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {["ALL", "ACADEMIC", "ATTENDANCE", "FINANCE", "STAFF"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              selectedCategory === cat
                ? "bg-[#123B6D] text-white shadow-xs"
                : "border border-[var(--border)] bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {cat === "ALL" ? "All Report Categories" : cat.charAt(0) + cat.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Export Notification */}
      {exportNotice && (
        <div className="flex items-center gap-2 rounded-lg bg-teal-50 border border-teal-200 p-3 text-xs font-semibold text-teal-800">
          <CheckCircle2 className="h-4 w-4 text-teal-600" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Reports Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {filteredReports.map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.id}
              className="flex flex-col justify-between rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${report.iconBg} ${report.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="neutral">{report.category}</Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{report.title}</h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">{report.description}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
                <span className="text-[11px] font-semibold text-slate-400">Available: PDF & Excel</span>
                <div className="flex items-center gap-2">
                  {report.formats.map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => handleExport(report.title, fmt)}
                      className="flex items-center gap-1 rounded-md border border-[var(--border)] bg-white px-2.5 py-1 text-xs font-semibold text-[#123B6D] hover:bg-slate-50"
                    >
                      <Download className="h-3 w-3" />
                      <span>{fmt}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

