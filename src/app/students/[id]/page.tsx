"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Download,
  CreditCard,
  Edit,
  FileText,
  User,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabItem } from "@/components/ui/Tabs";

export default function StudentDossierPage() {
  const params = useParams();
  const studentId = params?.id as string;
  const [activeTab, setActiveTab] = useState("personal");

  const tabs: TabItem[] = [
    { id: "personal", label: "Personal Details" },
    { id: "academic", label: "Academic Records", count: 8 },
    { id: "attendance", label: "Attendance Log", count: 96 },
    { id: "fees", label: "Fees & Billing" },
    { id: "documents", label: "Official Documents", count: 3 },
  ];

  return (
    <div className="space-y-6">
      {/* Back Navigation Bar */}
      <div className="flex items-center gap-2">
        <Link
          href="/students"
          className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Students List</span>
        </Link>
      </div>

      {/* Dossier Header Card (Figma Screen 5 Header) */}
      <div className="rounded-xl border border-[var(--border)] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#123B6D] text-xl font-bold text-white shadow-md">
              PN
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-extrabold text-[var(--foreground)]">Patricia Namara</h1>
                <Badge variant="success">Active Student</Badge>
                <Badge variant="secondary">Senior 4 Blue</Badge>
              </div>
              <p className="mt-1 font-mono text-xs text-[var(--muted)]">
                Student ID: <span className="font-semibold text-slate-800">ADM-2026-001</span> • Admitted: Jan 15, 2023
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[var(--muted)]">
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  +256 701 234 567 (Moses Namara - Father)
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  Kampala, Uganda
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
              <Download className="h-3.5 w-3.5 text-slate-500" />
              <span>Result Slip</span>
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-[#123B6D] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#0E2F57]">
              <CreditCard className="h-3.5 w-3.5" />
              <span>Record Payment</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 border-t border-[var(--border)] pt-2">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
      </div>

      {/* Tab Content Views */}
      {activeTab === "personal" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Bio Info */}
          <div className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-3">
              Biological & Enrollment Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-[var(--muted)]">Date of Birth</p>
                <p className="font-semibold text-slate-800 mt-0.5">March 14, 2010 (16 years)</p>
              </div>
              <div>
                <p className="text-[var(--muted)]">Gender</p>
                <p className="font-semibold text-slate-800 mt-0.5">Female</p>
              </div>
              <div>
                <p className="text-[var(--muted)]">Nationality</p>
                <p className="font-semibold text-slate-800 mt-0.5">Ugandan</p>
              </div>
              <div>
                <p className="text-[var(--muted)]">Blood Group</p>
                <p className="font-semibold text-slate-800 mt-0.5">O Positive (O+)</p>
              </div>
              <div>
                <p className="text-[var(--muted)]">Class & Stream</p>
                <p className="font-semibold text-slate-800 mt-0.5">Senior 4 — Stream Blue</p>
              </div>
              <div>
                <p className="text-[var(--muted)]">Class Teacher</p>
                <p className="font-semibold text-slate-800 mt-0.5">Mr. Robert Kyomukama</p>
              </div>
            </div>
          </div>

          {/* Guardian Info */}
          <div className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-3">
              Parent & Guardian Contact
            </h3>
            <div className="space-y-3 text-xs">
              <div className="rounded-lg border border-[var(--border)] p-3 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Moses Namara</span>
                  <Badge variant="primary">Primary Guardian (Father)</Badge>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-slate-600">
                  <p>Occupation: Civil Engineer</p>
                  <p>Phone: +256 701 234 567</p>
                  <p>Email: moses.n@example.com</p>
                  <p>Emergency Contact: Yes</p>
                </div>
              </div>

              <div className="rounded-lg border border-[var(--border)] p-3 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Grace Namara</span>
                  <Badge variant="neutral">Mother</Badge>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-slate-600">
                  <p>Occupation: Pharmacist</p>
                  <p>Phone: +256 772 987 654</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "academic" && (
        <div className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Term 3 Subject Performance</h3>
              <p className="text-xs text-[var(--muted)]">Overall Average: 84.5% • Class Rank: #3 of 45</p>
            </div>
            <Badge variant="success">Pass Grade 1 (Distinction)</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">Teacher</th>
                  <th className="py-2.5 px-3 text-center">CA (/30)</th>
                  <th className="py-2.5 px-3 text-center">Exam (/70)</th>
                  <th className="py-2.5 px-3 text-center">Total (/100)</th>
                  <th className="py-2.5 px-3 text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Mathematics</td>
                  <td className="py-2.5 px-3 text-slate-600">Mr. R. Kyomukama</td>
                  <td className="py-2.5 px-3 text-center">27</td>
                  <td className="py-2.5 px-3 text-center">61</td>
                  <td className="py-2.5 px-3 text-center font-bold text-[#123B6D]">88%</td>
                  <td className="py-2.5 px-3 text-center">
                    <Badge variant="success">D1</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">English Language</td>
                  <td className="py-2.5 px-3 text-slate-600">Mrs. H. Babirye</td>
                  <td className="py-2.5 px-3 text-center">25</td>
                  <td className="py-2.5 px-3 text-center">57</td>
                  <td className="py-2.5 px-3 text-center font-bold text-[#123B6D]">82%</td>
                  <td className="py-2.5 px-3 text-center">
                    <Badge variant="success">D1</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Physics</td>
                  <td className="py-2.5 px-3 text-slate-600">Dr. P. Mugisha</td>
                  <td className="py-2.5 px-3 text-center">26</td>
                  <td className="py-2.5 px-3 text-center">59</td>
                  <td className="py-2.5 px-3 text-center font-bold text-[#123B6D]">85%</td>
                  <td className="py-2.5 px-3 text-center">
                    <Badge variant="success">D1</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Chemistry</td>
                  <td className="py-2.5 px-3 text-slate-600">Ms. S. Namubiru</td>
                  <td className="py-2.5 px-3 text-center">24</td>
                  <td className="py-2.5 px-3 text-center">55</td>
                  <td className="py-2.5 px-3 text-center font-bold text-[#123B6D]">79%</td>
                  <td className="py-2.5 px-3 text-center">
                    <Badge variant="success">D2</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "attendance" && (
        <div className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Attendance Log (Term 3)</h3>
              <p className="text-xs text-[var(--muted)]">Overall Attendance Rate: 96.4%</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="font-semibold text-[#15803D]">Present: 54 days</span>
              <span className="font-semibold text-[#B91C1C]">Absent: 2 days</span>
              <span className="font-semibold text-[#B45309]">Late: 1 day</span>
            </div>
          </div>
          <p className="text-xs text-[var(--muted)]">
            Attendance is logged daily during Morning Homeroom and Afternoon Registration.
          </p>
        </div>
      )}

      {activeTab === "fees" && (
        <div className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">Billing & Invoices</h3>
              <p className="text-xs text-[var(--muted)]">Term 3 Balance: UGX 0 (Fully Cleared)</p>
            </div>
            <Badge variant="success">Clearance Issued</Badge>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between rounded-lg border border-[var(--border)] p-3">
              <div>
                <p className="font-bold text-slate-900">Tuition & Boarding — Term 3, 2026</p>
                <p className="text-[11px] text-slate-500 font-mono">Invoice #INV-2026-881 • Issued Sep 01, 2026</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">UGX 1,850,000</p>
                <Badge variant="success">Paid in Full</Badge>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "documents" && (
        <div className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-3">
            Stored Dossier Documents
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
            <div className="flex items-center justify-between rounded-lg border border-[var(--border)] p-3">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-[#123B6D]" />
                <div>
                  <p className="font-semibold text-slate-900">National Birth Certificate</p>
                  <p className="text-[11px] text-slate-500">PDF • 1.2 MB</p>
                </div>
              </div>
              <button className="text-xs font-semibold text-[#123B6D] hover:underline">Download</button>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-[var(--border)] p-3">
              <div className="flex items-center gap-2.5">
                <FileText className="h-5 w-5 text-[#123B6D]" />
                <div>
                  <p className="font-semibold text-slate-900">PLE Official Results Slip</p>
                  <p className="text-[11px] text-slate-500">PDF • 840 KB</p>
                </div>
              </div>
              <button className="text-xs font-semibold text-[#123B6D] hover:underline">Download</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

