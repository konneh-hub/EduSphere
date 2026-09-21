"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  Plus,
  Filter,
  Download,
  Eye,
  FileText,
  CreditCard,
  UserCheck,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";

interface StudentRecord {
  [key: string]: unknown;
  id: string;
  studentNumber: string;
  name: string;
  gender: "MALE" | "FEMALE";
  classStream: string;
  parentName: string;
  parentPhone: string;
  feeStatus: "PAID" | "PARTIAL" | "UNPAID";
  status: "ACTIVE" | "PENDING" | "TRANSFERRED";
}

const mockStudents: StudentRecord[] = [
  {
    id: "std-001",
    studentNumber: "ADM-2026-001",
    name: "Patricia Namara",
    gender: "FEMALE",
    classStream: "Senior 4 Blue",
    parentName: "Moses Namara",
    parentPhone: "+256 701 234 567",
    feeStatus: "PAID",
    status: "ACTIVE",
  },
  {
    id: "std-002",
    studentNumber: "ADM-2026-002",
    name: "Derrick Okello",
    gender: "MALE",
    classStream: "Senior 1 Gold",
    parentName: "Grace Okello",
    parentPhone: "+256 772 345 678",
    feeStatus: "PARTIAL",
    status: "PENDING",
  },
  {
    id: "std-003",
    studentNumber: "ADM-2026-003",
    name: "Joan Kabasomi",
    gender: "FEMALE",
    classStream: "Senior 5 Science",
    parentName: "Patrick Kabasomi",
    parentPhone: "+256 782 456 789",
    feeStatus: "PAID",
    status: "ACTIVE",
  },
  {
    id: "std-004",
    studentNumber: "ADM-2026-004",
    name: "Samuel Mukasa",
    gender: "MALE",
    classStream: "Senior 2 Green",
    parentName: "Agnes Mukasa",
    parentPhone: "+256 752 567 890",
    feeStatus: "PAID",
    status: "ACTIVE",
  },
  {
    id: "std-005",
    studentNumber: "ADM-2026-005",
    name: "Brenda Atuhaire",
    gender: "FEMALE",
    classStream: "Senior 3 Red",
    parentName: "David Atuhaire",
    parentPhone: "+256 704 678 901",
    feeStatus: "UNPAID",
    status: "ACTIVE",
  },
  {
    id: "std-006",
    studentNumber: "ADM-2026-006",
    name: "Brian Katende",
    gender: "MALE",
    classStream: "Senior 6 Arts",
    parentName: "Sarah Katende",
    parentPhone: "+256 776 789 012",
    feeStatus: "PAID",
    status: "ACTIVE",
  },
  {
    id: "std-007",
    studentNumber: "ADM-2026-007",
    name: "Esther Nakato",
    gender: "FEMALE",
    classStream: "Senior 4 Blue",
    parentName: "John Nakato",
    parentPhone: "+256 788 890 123",
    feeStatus: "PARTIAL",
    status: "ACTIVE",
  },
  {
    id: "std-008",
    studentNumber: "ADM-2026-008",
    name: "Timothy Omondi",
    gender: "MALE",
    classStream: "Senior 1 Gold",
    parentName: "Hellen Omondi",
    parentPhone: "+256 750 901 234",
    feeStatus: "UNPAID",
    status: "TRANSFERRED",
  },
];

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentRecord[]>(mockStudents);
  const [selectedClass, setSelectedClass] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [admitModalOpen, setAdmitModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    gender: "FEMALE" as "MALE" | "FEMALE",
    classStream: "Senior 1 Gold",
    parentName: "",
    parentPhone: "",
  });

  const filteredStudents = students.filter((s) => {
    const classMatch = selectedClass === "ALL" || s.classStream.includes(selectedClass);
    const statusMatch = selectedStatus === "ALL" || s.status === selectedStatus;
    return classMatch && statusMatch;
  });

  function handleAdmitSubmit(e: React.FormEvent) {
    e.preventDefault();
    const created: StudentRecord = {
      id: `std-${Date.now()}`,
      studentNumber: `ADM-2026-${String(students.length + 1).padStart(3, "0")}`,
      name: `${newStudent.firstName} ${newStudent.lastName}`,
      gender: newStudent.gender,
      classStream: newStudent.classStream,
      parentName: newStudent.parentName,
      parentPhone: newStudent.parentPhone,
      feeStatus: "UNPAID",
      status: "ACTIVE",
    };
    setStudents([created, ...students]);
    setAdmitModalOpen(false);
    setNewStudent({
      firstName: "",
      lastName: "",
      gender: "FEMALE",
      classStream: "Senior 1 Gold",
      parentName: "",
      parentPhone: "",
    });
  }

  const columns: Column<StudentRecord>[] = [
    {
      key: "studentNumber",
      header: "Adm No.",
      className: "font-mono font-semibold text-slate-900 text-xs",
    },
    {
      key: "name",
      header: "Student",
      render: (item) => (
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#123B6D]/10 font-bold text-[#123B6D] text-xs">
            {item.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">{item.name}</p>
            <p className="text-[11px] text-slate-400 capitalize">{item.gender.toLowerCase()}</p>
          </div>
        </div>
      ),
    },
    {
      key: "classStream",
      header: "Class & Stream",
      className: "font-medium text-slate-800",
    },
    {
      key: "parentName",
      header: "Parent / Guardian",
      render: (item) => (
        <div>
          <p className="font-medium text-slate-900">{item.parentName}</p>
          <p className="text-[11px] text-slate-500 font-mono">{item.parentPhone}</p>
        </div>
      ),
    },
    {
      key: "feeStatus",
      header: "Fee Status",
      render: (item) => {
        if (item.feeStatus === "PAID") return <Badge variant="success">Paid</Badge>;
        if (item.feeStatus === "PARTIAL") return <Badge variant="warning">Partial</Badge>;
        return <Badge variant="danger">Unpaid</Badge>;
      },
    },
    {
      key: "status",
      header: "Enrollment",
      render: (item) => {
        if (item.status === "ACTIVE") return <Badge variant="success">Active</Badge>;
        if (item.status === "PENDING") return <Badge variant="warning">Pending</Badge>;
        return <Badge variant="neutral">Transferred</Badge>;
      },
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/students/${item.id}`}
            className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-white px-2.5 py-1 text-xs font-semibold text-[#123B6D] hover:bg-slate-50"
          >
            <Eye className="h-3 w-3" />
            <span>Dossier</span>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
              Students Directory
            </h1>
            <Badge variant="primary" size="md">
              {students.length} Enrolled
            </Badge>
          </div>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Manage student registrations, academic statuses, and student records.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setAdmitModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-[#123B6D] px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0E2F57]"
          >
            <Plus className="h-4 w-4" />
            <span>Admit New Student</span>
          </button>
        </div>
      </div>

      {/* Main Student Data Table */}
      <DataTable
        columns={columns}
        data={filteredStudents}
        title="Student Rosters"
        subtitle="Live registry across all streams and forms"
        searchPlaceholder="Search by name, admission no, or guardian..."
        pageSize={10}
        filterComponent={
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-[#123B6D]"
            >
              <option value="ALL">All Classes</option>
              <option value="Senior 1">Senior 1</option>
              <option value="Senior 2">Senior 2</option>
              <option value="Senior 3">Senior 3</option>
              <option value="Senior 4">Senior 4</option>
              <option value="Senior 5">Senior 5</option>
              <option value="Senior 6">Senior 6</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-[#123B6D]"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="PENDING">Pending</option>
              <option value="TRANSFERRED">Transferred</option>
            </select>
          </div>
        }
      />

      {/* Admit New Student Modal */}
      <Modal
        isOpen={admitModalOpen}
        onClose={() => setAdmitModalOpen(false)}
        title="Admit New Student"
        description="Register a new student application into the institution roster."
        maxWidth="lg"
      >
        <form onSubmit={handleAdmitSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
              <input
                required
                type="text"
                value={newStudent.firstName}
                onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                placeholder="e.g. Samuel"
                className="w-full rounded-lg border border-[var(--border)] py-2 px-3 text-xs outline-none focus:border-[#123B6D]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
              <input
                required
                type="text"
                value={newStudent.lastName}
                onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
                placeholder="e.g. Mukasa"
                className="w-full rounded-lg border border-[var(--border)] py-2 px-3 text-xs outline-none focus:border-[#123B6D]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
              <select
                value={newStudent.gender}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, gender: e.target.value as "MALE" | "FEMALE" })
                }
                className="w-full rounded-lg border border-[var(--border)] py-2 px-3 text-xs outline-none focus:border-[#123B6D]"
              >
                <option value="FEMALE">Female</option>
                <option value="MALE">Male</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Class & Stream</label>
              <select
                value={newStudent.classStream}
                onChange={(e) => setNewStudent({ ...newStudent, classStream: e.target.value })}
                className="w-full rounded-lg border border-[var(--border)] py-2 px-3 text-xs outline-none focus:border-[#123B6D]"
              >
                <option value="Senior 1 Gold">Senior 1 Gold</option>
                <option value="Senior 2 Green">Senior 2 Green</option>
                <option value="Senior 3 Red">Senior 3 Red</option>
                <option value="Senior 4 Blue">Senior 4 Blue</option>
                <option value="Senior 5 Science">Senior 5 Science</option>
                <option value="Senior 6 Arts">Senior 6 Arts</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Parent / Guardian Name
              </label>
              <input
                required
                type="text"
                value={newStudent.parentName}
                onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                placeholder="e.g. Agnes Mukasa"
                className="w-full rounded-lg border border-[var(--border)] py-2 px-3 text-xs outline-none focus:border-[#123B6D]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Guardian Phone</label>
              <input
                required
                type="tel"
                value={newStudent.parentPhone}
                onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                placeholder="+256 700 000 000"
                className="w-full rounded-lg border border-[var(--border)] py-2 px-3 text-xs outline-none focus:border-[#123B6D]"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-[var(--border)] pt-4">
            <button
              type="button"
              onClick={() => setAdmitModalOpen(false)}
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-[#123B6D] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0E2F57]"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Complete Admission</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

