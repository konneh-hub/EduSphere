"use client";

import React, { useState } from "react";
import { Library, Plus, BookOpen, Clock, CheckCircle2, RotateCcw, Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { DataTable, Column } from "@/components/ui/DataTable";

interface BorrowingRecord {
  [key: string]: unknown;
  id: string;
  bookTitle: string;
  isbn: string;
  borrower: string;
  borrowerType: "STUDENT" | "TEACHER";
  borrowDate: string;
  dueDate: string;
  status: "BORROWED" | "OVERDUE" | "RETURNED";
}

const mockBorrowings: BorrowingRecord[] = [
  {
    id: "b-1",
    bookTitle: "Pure Mathematics for Advanced Level (Backhouse)",
    isbn: "978-0582038172",
    borrower: "Patricia Namara (Senior 4 Blue)",
    borrowerType: "STUDENT",
    borrowDate: "Oct 02, 2026",
    dueDate: "Oct 16, 2026",
    status: "BORROWED",
  },
  {
    id: "b-2",
    bookTitle: "A Concise History of Modern Africa",
    isbn: "978-1405189743",
    borrower: "Mr. Arthur Byamukama",
    borrowerType: "TEACHER",
    borrowDate: "Sep 20, 2026",
    dueDate: "Oct 04, 2026",
    status: "OVERDUE",
  },
  {
    id: "b-3",
    bookTitle: "Principles of Physics (Halliday & Resnick)",
    isbn: "978-1118230749",
    borrower: "Joan Kabasomi (Senior 5 Science)",
    borrowerType: "STUDENT",
    borrowDate: "Oct 05, 2026",
    dueDate: "Oct 19, 2026",
    status: "BORROWED",
  },
  {
    id: "b-4",
    bookTitle: "Things Fall Apart (Chinua Achebe)",
    isbn: "978-0385474542",
    borrower: "Samuel Mukasa (Senior 2 Green)",
    borrowerType: "STUDENT",
    borrowDate: "Sep 25, 2026",
    dueDate: "Oct 09, 2026",
    status: "RETURNED",
  },
];

export default function LibraryPage() {
  const [borrowings, setBorrowings] = useState<BorrowingRecord[]>(mockBorrowings);

  function processReturn(id: string) {
    setBorrowings(
      borrowings.map((b) => (b.id === id ? { ...b, status: "RETURNED" } : b))
    );
  }

  const columns: Column<BorrowingRecord>[] = [
    {
      key: "bookTitle",
      header: "Book & ISBN",
      render: (item) => (
        <div>
          <p className="font-bold text-slate-900">{item.bookTitle}</p>
          <p className="font-mono text-[11px] text-slate-500">ISBN: {item.isbn}</p>
        </div>
      ),
    },
    {
      key: "borrower",
      header: "Borrower",
      render: (item) => (
        <div>
          <p className="font-medium text-slate-900">{item.borrower}</p>
          <Badge variant={item.borrowerType === "TEACHER" ? "primary" : "secondary"}>
            {item.borrowerType}
          </Badge>
        </div>
      ),
    },
    {
      key: "borrowDate",
      header: "Borrowed Date",
      className: "text-slate-600 text-xs",
    },
    {
      key: "dueDate",
      header: "Due Date",
      className: "text-slate-600 text-xs",
    },
    {
      key: "status",
      header: "Status",
      render: (item) => {
        if (item.status === "RETURNED") return <Badge variant="success">Returned</Badge>;
        if (item.status === "OVERDUE") return <Badge variant="danger">Overdue</Badge>;
        return <Badge variant="warning">On Loan</Badge>;
      },
    },
    {
      key: "actions",
      header: "Action",
      className: "text-right",
      render: (item) => (
        <div className="flex items-center justify-end">
          {item.status !== "RETURNED" ? (
            <button
              onClick={() => processReturn(item.id)}
              className="flex items-center gap-1 rounded-md border border-[var(--border)] bg-white px-2.5 py-1 text-xs font-semibold text-[#123B6D] hover:bg-slate-50"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Process Return</span>
            </button>
          ) : (
            <span className="text-xs text-slate-400 font-medium">Completed</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Library Catalog & Circulation
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Manage institutional book inventory, active student/staff borrowings, and returns.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-[#123B6D] px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0E2F57]">
          <Plus className="h-4 w-4" />
          <span>Add New Book</span>
        </button>
      </div>

      {/* Library Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Catalog"
          value="3,420"
          icon={<BookOpen className="h-5 w-5" />}
          iconBgColor="bg-[#EEF2FF]"
          iconColor="text-[#123B6D]"
        />
        <StatCard
          title="Issued Copies"
          value="412"
          delta={{ value: "12% of stock", isPositive: true }}
          icon={<Library className="h-5 w-5" />}
          iconBgColor="bg-[#FEF3C7]"
          iconColor="text-[#D97706]"
        />
        <StatCard
          title="Available Copies"
          value="3,008"
          icon={<CheckCircle2 className="h-5 w-5" />}
          iconBgColor="bg-[#DCFCE7]"
          iconColor="text-[#16A34A]"
        />
        <StatCard
          title="Overdue Returns"
          value="18"
          delta={{ value: "Follow-up due", isPositive: false }}
          icon={<Clock className="h-5 w-5" />}
          iconBgColor="bg-[#FEE2E2]"
          iconColor="text-[#B91C1C]"
        />
      </div>

      {/* Borrowings Table */}
      <DataTable
        columns={columns}
        data={borrowings}
        title="Circulation & Borrowings"
        subtitle="Active book loans and status"
        searchPlaceholder="Search title, ISBN, or borrower..."
      />
    </div>
  );
}

