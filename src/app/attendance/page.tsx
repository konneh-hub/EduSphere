"use client";

import React, { useState } from "react";
import {
  CalendarCheck,
  CheckCircle,
  XCircle,
  Clock,
  HelpCircle,
  Save,
  RotateCcw,
  CheckCheck,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";

interface StudentAttendance {
  id: string;
  studentNumber: string;
  name: string;
  gender: string;
  status: AttendanceStatus;
  remarks: string;
}

const initialStudents: StudentAttendance[] = [
  { id: "1", studentNumber: "ADM-2026-001", name: "Patricia Namara", gender: "F", status: "PRESENT", remarks: "" },
  { id: "2", studentNumber: "ADM-2026-002", name: "Derrick Okello", gender: "M", status: "LATE", remarks: "Arrived 8:40 AM" },
  { id: "3", studentNumber: "ADM-2026-003", name: "Joan Kabasomi", gender: "F", status: "PRESENT", remarks: "" },
  { id: "4", studentNumber: "ADM-2026-004", name: "Samuel Mukasa", gender: "M", status: "PRESENT", remarks: "" },
  { id: "5", studentNumber: "ADM-2026-005", name: "Brenda Atuhaire", gender: "F", status: "ABSENT", remarks: "Sick leave reported" },
  { id: "6", studentNumber: "ADM-2026-006", name: "Brian Katende", gender: "M", status: "PRESENT", remarks: "" },
  { id: "7", studentNumber: "ADM-2026-007", name: "Esther Nakato", gender: "F", status: "PRESENT", remarks: "" },
  { id: "8", studentNumber: "ADM-2026-008", name: "Timothy Omondi", gender: "M", status: "EXCUSED", remarks: "Sports competition" },
];

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState("Senior 4 Blue");
  const [selectedDate, setSelectedDate] = useState("2026-10-12");
  const [selectedSession, setSelectedSession] = useState("Morning");
  const [roster, setRoster] = useState<StudentAttendance[]>(initialStudents);
  const [savedNotice, setSavedNotice] = useState(false);

  const presentCount = roster.filter((s) => s.status === "PRESENT").length;
  const absentCount = roster.filter((s) => s.status === "ABSENT").length;
  const lateCount = roster.filter((s) => s.status === "LATE").length;
  const excusedCount = roster.filter((s) => s.status === "EXCUSED").length;

  function setStudentStatus(id: string, status: AttendanceStatus) {
    setRoster(roster.map((s) => (s.id === id ? { ...s, status } : s)));
  }

  function markAllPresent() {
    setRoster(roster.map((s) => ({ ...s, status: "PRESENT" })));
  }

  function resetAll() {
    setRoster(roster.map((s) => ({ ...s, status: "PRESENT" })));
  }

  function handleSave() {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Attendance Register
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Daily roll-call management and session attendance tracking.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={markAllPresent}
            className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <CheckCheck className="h-3.5 w-3.5 text-teal-600" />
            <span>Mark All Present</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 rounded-lg bg-[#0F766E] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#0D655E]"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Attendance</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Class, Date, Session Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Class & Stream
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
              <option value="Senior 5 Science">Senior 5 Science</option>
              <option value="Senior 6 Arts">Senior 6 Arts</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Roll Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-lg border border-[var(--border)] bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#123B6D]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Session
            </label>
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value)}
              className="rounded-lg border border-[var(--border)] bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#123B6D]"
            >
              <option value="Morning">Morning Registration</option>
              <option value="Afternoon">Afternoon Period</option>
            </select>
          </div>
        </div>

        {/* Real-Time Live Counter Bar */}
        <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-1.5 text-xs font-semibold">
          <span className="rounded-md bg-white px-2.5 py-1 text-slate-800 shadow-2xs">
            Total: {roster.length}
          </span>
          <span className="rounded-md bg-[#DCFCE7] px-2.5 py-1 text-[#15803D]">
            Present: {presentCount}
          </span>
          <span className="rounded-md bg-[#FEE2E2] px-2.5 py-1 text-[#B91C1C]">
            Absent: {absentCount}
          </span>
          <span className="rounded-md bg-[#FEF3C7] px-2.5 py-1 text-[#B45309]">
            Late: {lateCount}
          </span>
          <span className="rounded-md bg-[#E0F2FE] px-2.5 py-1 text-[#0284C7]">
            Excused: {excusedCount}
          </span>
        </div>
      </div>

      {/* Save Success Alert */}
      {savedNotice && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-800">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span>Attendance records for {selectedClass} successfully saved to the database.</span>
        </div>
      )}

      {/* Interactive Roster Table */}
      <div className="rounded-xl border border-[var(--border)] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[var(--border)] text-slate-600 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Adm No.</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Gender</th>
                <th className="py-3 px-4 text-center">Status Action</th>
                <th className="py-3 px-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {roster.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                    {student.studentNumber}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">{student.name}</td>
                  <td className="py-3 px-4 text-slate-500">{student.gender}</td>
                  <td className="py-3 px-4">
                    {/* 4 Status Toggle Buttons */}
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setStudentStatus(student.id, "PRESENT")}
                        className={`rounded-md px-2.5 py-1 text-[11px] font-bold transition-all ${
                          student.status === "PRESENT"
                            ? "bg-[#15803D] text-white shadow-xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        Present
                      </button>

                      <button
                        type="button"
                        onClick={() => setStudentStatus(student.id, "ABSENT")}
                        className={`rounded-md px-2.5 py-1 text-[11px] font-bold transition-all ${
                          student.status === "ABSENT"
                            ? "bg-[#B91C1C] text-white shadow-xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        Absent
                      </button>

                      <button
                        type="button"
                        onClick={() => setStudentStatus(student.id, "LATE")}
                        className={`rounded-md px-2.5 py-1 text-[11px] font-bold transition-all ${
                          student.status === "LATE"
                            ? "bg-[#B45309] text-white shadow-xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        Late
                      </button>

                      <button
                        type="button"
                        onClick={() => setStudentStatus(student.id, "EXCUSED")}
                        className={`rounded-md px-2.5 py-1 text-[11px] font-bold transition-all ${
                          student.status === "EXCUSED"
                            ? "bg-[#0284C7] text-white shadow-xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        Excused
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      placeholder="Optional notes..."
                      value={student.remarks}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRoster(
                          roster.map((s) => (s.id === student.id ? { ...s, remarks: val } : s))
                        );
                      }}
                      className="w-full rounded border border-[var(--border)] bg-transparent px-2 py-1 text-xs text-slate-700 outline-none focus:border-[#123B6D] focus:bg-white"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

