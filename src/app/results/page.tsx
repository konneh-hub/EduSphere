"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Award,
  CheckCircle,
  Save,
  Send,
  Download,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

interface StudentMark {
  id: string;
  studentNumber: string;
  name: string;
  caScore: number;
  examScore: number;
  remarks: string;
}

const initialMarks: StudentMark[] = [
  { id: "1", studentNumber: "ADM-2026-001", name: "Patricia Namara", caScore: 27, examScore: 61, remarks: "Excellent grasp of concepts" },
  { id: "2", studentNumber: "ADM-2026-002", name: "Derrick Okello", caScore: 20, examScore: 48, remarks: "Steady improvement" },
  { id: "3", studentNumber: "ADM-2026-003", name: "Joan Kabasomi", caScore: 26, examScore: 59, remarks: "Outstanding work" },
  { id: "4", studentNumber: "ADM-2026-004", name: "Samuel Mukasa", caScore: 24, examScore: 52, remarks: "Good participation" },
  { id: "5", studentNumber: "ADM-2026-005", name: "Brenda Atuhaire", caScore: 18, examScore: 40, remarks: "Needs practice in algebra" },
  { id: "6", studentNumber: "ADM-2026-006", name: "Brian Katende", caScore: 28, examScore: 64, remarks: "Top subject score" },
  { id: "7", studentNumber: "ADM-2026-007", name: "Esther Nakato", caScore: 22, examScore: 50, remarks: "Consistent effort" },
];

function calculateGrade(total: number) {
  if (total >= 80) return { grade: "D1", point: 1, variant: "success" as const };
  if (total >= 75) return { grade: "D2", point: 2, variant: "success" as const };
  if (total >= 65) return { grade: "C3", point: 3, variant: "secondary" as const };
  if (total >= 60) return { grade: "C4", point: 4, variant: "secondary" as const };
  if (total >= 50) return { grade: "P7", point: 7, variant: "warning" as const };
  return { grade: "F9", point: 9, variant: "danger" as const };
}

export default function ResultsPage() {
  const [selectedExam, setSelectedExam] = useState("Mid-Term Examination");
  const [selectedClass, setSelectedClass] = useState("Senior 4 Blue");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [marks, setMarks] = useState<StudentMark[]>(initialMarks);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [savedAlert, setSavedAlert] = useState(false);

  const totals = marks.map((m) => m.caScore + m.examScore);
  const avgScore = totals.length > 0 ? (totals.reduce((a, b) => a + b, 0) / totals.length).toFixed(1) : "0";
  const highestScore = Math.max(...totals, 0);
  const lowestScore = Math.min(...totals, 0);

  function updateScore(id: string, field: "caScore" | "examScore", value: number) {
    const clamped = Math.max(0, Math.min(field === "caScore" ? 30 : 70, value || 0));
    setMarks(marks.map((m) => (m.id === id ? { ...m, [field]: clamped } : m)));
  }

  function handleSaveDraft() {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  }

  function handlePublish() {
    setIsPublished(true);
    setPublishModalOpen(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
              Examinations & Results Entry
            </h1>
            {isPublished ? (
              <Badge variant="success">Published</Badge>
            ) : (
              <Badge variant="warning">Draft Mode</Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Record continuous assessment scores, calculate final grades, and publish report cards.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Draft</span>
          </button>
          <button
            onClick={() => setPublishModalOpen(true)}
            disabled={isPublished}
            className="flex items-center gap-1.5 rounded-lg bg-[#123B6D] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#0E2F57] disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{isPublished ? "Results Published" : "Publish Results"}</span>
          </button>
        </div>
      </div>

      {/* Filter Selector Bar */}
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[var(--border)] bg-white p-4 shadow-sm">
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Exam Name
          </label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="rounded-lg border border-[var(--border)] bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#123B6D]"
          >
            <option value="Mid-Term Examination">Mid-Term Examination (Term 3)</option>
            <option value="End of Term Examination">End of Term Examination</option>
            <option value="Mock Examination">National Mock Examination</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Class
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="rounded-lg border border-[var(--border)] bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#123B6D]"
          >
            <option value="Senior 4 Blue">Senior 4 Blue</option>
            <option value="Senior 1 Gold">Senior 1 Gold</option>
            <option value="Senior 2 Green">Senior 2 Green</option>
            <option value="Senior 3 Red">Senior 3 Red</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Subject
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="rounded-lg border border-[var(--border)] bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#123B6D]"
          >
            <option value="Mathematics">Mathematics</option>
            <option value="English Language">English Language</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
          </select>
        </div>
      </div>

      {/* Summary KPI Highlights */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[var(--border)] bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-[var(--muted)]">Class Subject Average</p>
          <p className="mt-1 text-2xl font-bold text-[#123B6D]">{avgScore}%</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-[var(--muted)]">Highest Mark</p>
          <p className="mt-1 text-2xl font-bold text-[#15803D]">{highestScore}%</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-[var(--muted)]">Lowest Mark</p>
          <p className="mt-1 text-2xl font-bold text-slate-700">{lowestScore}%</p>
        </div>
      </div>

      {/* Save Draft Alert */}
      {savedAlert && (
        <div className="flex items-center gap-2 rounded-lg bg-teal-50 border border-teal-200 p-3 text-xs font-semibold text-teal-800">
          <CheckCircle className="h-4 w-4 text-teal-600" />
          <span>Draft marks successfully saved for {selectedClass} • {selectedSubject}.</span>
        </div>
      )}

      {/* Marks Table */}
      <div className="rounded-xl border border-[var(--border)] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[var(--border)] text-slate-600 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Adm No.</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4 text-center w-28">CA (/30)</th>
                <th className="py-3 px-4 text-center w-28">Exam (/70)</th>
                <th className="py-3 px-4 text-center w-28">Total (/100)</th>
                <th className="py-3 px-4 text-center w-24">Grade</th>
                <th className="py-3 px-4">Teacher Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {marks.map((student) => {
                const total = student.caScore + student.examScore;
                const { grade, variant } = calculateGrade(total);

                return (
                  <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                      {student.studentNumber}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">{student.name}</td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max="30"
                        disabled={isPublished}
                        value={student.caScore}
                        onChange={(e) => updateScore(student.id, "caScore", parseInt(e.target.value) || 0)}
                        className="w-16 rounded border border-[var(--border)] text-center py-1 font-semibold text-slate-800 outline-none focus:border-[#123B6D]"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="number"
                        min="0"
                        max="70"
                        disabled={isPublished}
                        value={student.examScore}
                        onChange={(e) => updateScore(student.id, "examScore", parseInt(e.target.value) || 0)}
                        className="w-16 rounded border border-[var(--border)] text-center py-1 font-semibold text-slate-800 outline-none focus:border-[#123B6D]"
                      />
                    </td>
                    <td className="py-3 px-4 text-center font-extrabold text-sm text-[#123B6D]">
                      {total}%
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={variant}>{grade}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        disabled={isPublished}
                        value={student.remarks}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMarks(marks.map((m) => (m.id === student.id ? { ...m, remarks: val } : m)));
                        }}
                        className="w-full rounded border border-[var(--border)] px-2 py-1 text-slate-700 outline-none focus:border-[#123B6D]"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Publish Confirmation Modal */}
      <Modal
        isOpen={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        title="Publish Examination Results?"
        description="Publishing results makes them visible to students and parents on their portals and locks grade entry."
      >
        <div className="space-y-4">
          <div className="rounded-lg bg-amber-50 p-3.5 border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Once published, scores can only be amended by an authorized Administrator with audit logging.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border)]">
            <button
              onClick={() => setPublishModalOpen(false)}
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              className="rounded-lg bg-[#123B6D] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0E2F57]"
            >
              Confirm & Publish
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

