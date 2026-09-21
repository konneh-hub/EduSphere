"use client";

import React, { useState } from "react";
import { UserCheck, Plus, Mail, Phone, BookOpen, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { DataTable, Column } from "@/components/ui/DataTable";

interface TeacherRecord {
  [key: string]: unknown;
  id: string;
  employeeNo: string;
  name: string;
  department: string;
  subjects: string;
  classes: string;
  email: string;
  phone: string;
  status: "ACTIVE" | "ON_LEAVE";
}

const mockTeachers: TeacherRecord[] = [
  {
    id: "tch-001",
    employeeNo: "EMP-041",
    name: "Mr. Robert Kyomukama",
    department: "Mathematics",
    subjects: "Mathematics, Further Maths",
    classes: "Senior 4 Blue, Senior 3 Red",
    email: "r.kyomukama@edusphere.edu",
    phone: "+256 701 112 233",
    status: "ACTIVE",
  },
  {
    id: "tch-002",
    employeeNo: "EMP-042",
    name: "Mrs. Harriet Babirye",
    department: "Languages",
    subjects: "English Language, Literature",
    classes: "Senior 4 Blue, Senior 2 Green",
    email: "h.babirye@edusphere.edu",
    phone: "+256 772 223 344",
    status: "ACTIVE",
  },
  {
    id: "tch-003",
    employeeNo: "EMP-043",
    name: "Dr. Patrick Mugisha",
    department: "Sciences",
    subjects: "Physics",
    classes: "Senior 5 Science, Senior 6 Science",
    email: "p.mugisha@edusphere.edu",
    phone: "+256 782 334 455",
    status: "ACTIVE",
  },
  {
    id: "tch-004",
    employeeNo: "EMP-044",
    name: "Ms. Stella Namubiru",
    department: "Sciences",
    subjects: "Chemistry, Biology",
    classes: "Senior 4 Blue, Senior 3 Red",
    email: "s.namubiru@edusphere.edu",
    phone: "+256 752 445 566",
    status: "ACTIVE",
  },
  {
    id: "tch-005",
    employeeNo: "EMP-045",
    name: "Mr. Arthur Byamukama",
    department: "Humanities",
    subjects: "History, Geography",
    classes: "Senior 1 Gold, Senior 2 Green",
    email: "a.byamukama@edusphere.edu",
    phone: "+256 704 556 677",
    status: "ON_LEAVE",
  },
];

export default function TeachersPage() {
  const [selectedDept, setSelectedDept] = useState("ALL");

  const filteredTeachers = mockTeachers.filter((t) => {
    return selectedDept === "ALL" || t.department === selectedDept;
  });

  const columns: Column<TeacherRecord>[] = [
    {
      key: "employeeNo",
      header: "Employee ID",
      className: "font-mono font-semibold text-slate-900 text-xs",
    },
    {
      key: "name",
      header: "Teacher",
      render: (item) => (
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F766E]/10 font-bold text-[#0F766E] text-xs">
            {item.name
              .replace("Mr. ", "")
              .replace("Mrs. ", "")
              .replace("Dr. ", "")
              .replace("Ms. ", "")
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">{item.name}</p>
            <p className="text-[11px] text-slate-500">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "department",
      header: "Department",
      render: (item) => <Badge variant="secondary">{item.department}</Badge>,
    },
    {
      key: "subjects",
      header: "Assigned Subjects",
      className: "text-slate-800 font-medium",
    },
    {
      key: "classes",
      header: "Class Allocation",
      className: "text-slate-600 text-xs",
    },
    {
      key: "phone",
      header: "Contact",
      className: "font-mono text-slate-600 text-xs",
    },
    {
      key: "status",
      header: "Status",
      render: (item) =>
        item.status === "ACTIVE" ? (
          <Badge variant="success">Active</Badge>
        ) : (
          <Badge variant="warning">On Leave</Badge>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
              Faculty & Teachers
            </h1>
            <Badge variant="primary" size="md">
              {mockTeachers.length} Staff
            </Badge>
          </div>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Manage academic staff records, department assignments, and class allocations.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-[#123B6D] px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0E2F57]">
          <Plus className="h-4 w-4" />
          <span>Add New Teacher</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredTeachers}
        title="Teaching Faculty Directory"
        subtitle="Department allocations and active contact roster"
        searchPlaceholder="Search teacher name, ID, or subject..."
        filterComponent={
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-[#123B6D]"
          >
            <option value="ALL">All Departments</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Sciences">Sciences</option>
            <option value="Languages">Languages</option>
            <option value="Humanities">Humanities</option>
          </select>
        }
      />
    </div>
  );
}

