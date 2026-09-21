"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Plus,
  DollarSign,
  TrendingUp,
  Receipt,
  Download,
  AlertCircle,
  Clock,
  CheckCircle2,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";

interface InvoiceRecord {
  [key: string]: unknown;
  id: string;
  invoiceNumber: string;
  studentName: string;
  classStream: string;
  category: string;
  amount: number;
  paid: number;
  balance: number;
  dueDate: string;
  status: "PAID" | "PARTIAL" | "UNPAID";
}

const mockInvoices: InvoiceRecord[] = [
  {
    id: "inv-1",
    invoiceNumber: "INV-2026-081",
    studentName: "Patricia Namara",
    classStream: "Senior 4 Blue",
    category: "Tuition & Boarding",
    amount: 1850000,
    paid: 1850000,
    balance: 0,
    dueDate: "Oct 15, 2026",
    status: "PAID",
  },
  {
    id: "inv-2",
    invoiceNumber: "INV-2026-082",
    studentName: "Derrick Okello",
    classStream: "Senior 1 Gold",
    category: "Day Tuition & Uniform",
    amount: 1200000,
    paid: 600000,
    balance: 600000,
    dueDate: "Oct 20, 2026",
    status: "PARTIAL",
  },
  {
    id: "inv-3",
    invoiceNumber: "INV-2026-083",
    studentName: "Joan Kabasomi",
    classStream: "Senior 5 Science",
    category: "Boarding & Lab Fee",
    amount: 2100000,
    paid: 2100000,
    balance: 0,
    dueDate: "Oct 10, 2026",
    status: "PAID",
  },
  {
    id: "inv-4",
    invoiceNumber: "INV-2026-084",
    studentName: "Brenda Atuhaire",
    classStream: "Senior 3 Red",
    category: "Tuition Fee",
    amount: 1400000,
    paid: 0,
    balance: 1400000,
    dueDate: "Oct 05, 2026",
    status: "UNPAID",
  },
  {
    id: "inv-5",
    invoiceNumber: "INV-2026-085",
    studentName: "Samuel Mukasa",
    classStream: "Senior 2 Green",
    category: "Tuition & Meals",
    amount: 1550000,
    paid: 1550000,
    balance: 0,
    dueDate: "Oct 12, 2026",
    status: "PAID",
  },
];

export default function FinancePage() {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(mockInvoices);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(null);
  const [payAmount, setPayAmount] = useState("");
  const [payMethod, setPayMethod] = useState("BANK_TRANSFER");
  const [receiptNotice, setReceiptNotice] = useState("");

  function handleRecordPayment(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedInvoice) return;

    const amountNum = parseFloat(payAmount) || 0;
    const newPaid = selectedInvoice.paid + amountNum;
    const newBalance = Math.max(0, selectedInvoice.amount - newPaid);
    const newStatus: "PAID" | "PARTIAL" | "UNPAID" =
      newBalance === 0 ? "PAID" : newPaid > 0 ? "PARTIAL" : "UNPAID";

    setInvoices(
      invoices.map((inv) =>
        inv.id === selectedInvoice.id
          ? { ...inv, paid: newPaid, balance: newBalance, status: newStatus }
          : inv
      )
    );

    setReceiptNotice(`Payment of UGX ${amountNum.toLocaleString()} recorded for ${selectedInvoice.studentName}`);
    setPaymentModalOpen(false);
    setSelectedInvoice(null);
    setPayAmount("");
    setTimeout(() => setReceiptNotice(""), 4000);
  }

  const columns: Column<InvoiceRecord>[] = [
    {
      key: "invoiceNumber",
      header: "Invoice #",
      className: "font-mono font-semibold text-slate-900 text-xs",
    },
    {
      key: "studentName",
      header: "Student",
      render: (item) => (
        <div>
          <p className="font-bold text-slate-900">{item.studentName}</p>
          <p className="text-[11px] text-slate-500">{item.classStream}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Fee Category",
      className: "text-slate-700 text-xs",
    },
    {
      key: "amount",
      header: "Total (UGX)",
      render: (item) => <span className="font-semibold text-slate-900">{item.amount.toLocaleString()}</span>,
    },
    {
      key: "paid",
      header: "Paid (UGX)",
      render: (item) => <span className="text-[#15803D] font-semibold">{item.paid.toLocaleString()}</span>,
    },
    {
      key: "balance",
      header: "Balance (UGX)",
      render: (item) => (
        <span className={`font-semibold ${item.balance > 0 ? "text-[#B91C1C]" : "text-slate-400"}`}>
          {item.balance.toLocaleString()}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => {
        if (item.status === "PAID") return <Badge variant="success">Paid</Badge>;
        if (item.status === "PARTIAL") return <Badge variant="warning">Partial</Badge>;
        return <Badge variant="danger">Unpaid</Badge>;
      },
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          {item.balance > 0 ? (
            <button
              onClick={() => {
                setSelectedInvoice(item);
                setPayAmount(item.balance.toString());
                setPaymentModalOpen(true);
              }}
              className="rounded-md bg-[#123B6D] px-2.5 py-1 text-xs font-semibold text-white hover:bg-[#0E2F57]"
            >
              Pay
            </button>
          ) : (
            <button
              onClick={() => alert(`Receipt #${item.invoiceNumber}-REC issued.`)}
              className="flex items-center gap-1 rounded-md border border-[var(--border)] px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Receipt className="h-3 w-3" />
              <span>Receipt</span>
            </button>
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
            Finance & Fee Collection
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Tuition billing, student invoices, fee structures, and collection receipts.
          </p>
        </div>

        <button
          onClick={() => alert("Create fee structure workflow.")}
          className="flex items-center gap-2 rounded-lg bg-[#123B6D] px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0E2F57]"
        >
          <Plus className="h-4 w-4" />
          <span>Create Fee Structure</span>
        </button>
      </div>

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Expected"
          value="UGX 52.0M"
          icon={<DollarSign className="h-5 w-5" />}
          iconBgColor="bg-[#EEF2FF]"
          iconColor="text-[#123B6D]"
        />
        <StatCard
          title="Collected Revenue"
          value="UGX 45.2M"
          delta={{ value: "87% collected", isPositive: true }}
          icon={<Wallet className="h-5 w-5" />}
          iconBgColor="bg-[#DCFCE7]"
          iconColor="text-[#16A34A]"
        />
        <StatCard
          title="Outstanding Balance"
          value="UGX 6.8M"
          delta={{ value: "13% remaining", isPositive: false }}
          icon={<AlertCircle className="h-5 w-5" />}
          iconBgColor="bg-[#FEE2E2]"
          iconColor="text-[#B91C1C]"
        />
        <StatCard
          title="Overdue Invoices"
          value="14"
          delta={{ value: "Action required", isPositive: false }}
          icon={<Clock className="h-5 w-5" />}
          iconBgColor="bg-[#FEF3C7]"
          iconColor="text-[#D97706]"
        />
      </div>

      {/* Success Notification */}
      {receiptNotice && (
        <div className="flex items-center gap-2 rounded-lg bg-teal-50 border border-teal-200 p-3 text-xs font-semibold text-teal-800">
          <CheckCircle2 className="h-4 w-4 text-teal-600" />
          <span>{receiptNotice}</span>
        </div>
      )}

      {/* Invoices Table */}
      <DataTable
        columns={columns}
        data={invoices}
        title="Student Invoices & Billing Roster"
        subtitle="Current term billing ledger"
        searchPlaceholder="Search invoice #, student, or class..."
      />

      {/* Record Payment Modal */}
      <Modal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        title="Record Fee Payment"
        description={
          selectedInvoice
            ? `Recording payment for ${selectedInvoice.studentName} (${selectedInvoice.invoiceNumber})`
            : "Record payment"
        }
      >
        <form onSubmit={handleRecordPayment} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Amount to Pay (UGX)</label>
            <input
              type="number"
              required
              min="1000"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] py-2 px-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#123B6D]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Channel</label>
            <select
              value={payMethod}
              onChange={(e) => setPayMethod(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] py-2 px-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#123B6D]"
            >
              <option value="BANK_TRANSFER">Bank Deposit / Transfer</option>
              <option value="MOBILE_MONEY">Mobile Money (MTN / Airtel)</option>
              <option value="CASH">Direct Cash (Bursar Office)</option>
              <option value="CARD">Debit / Credit Card</option>
            </select>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-[var(--border)] pt-4">
            <button
              type="button"
              onClick={() => setPaymentModalOpen(false)}
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-[#123B6D] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0E2F57]"
            >
              <Receipt className="h-3.5 w-3.5" />
              <span>Record & Generate Receipt</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

