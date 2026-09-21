"use client";

import React from "react";
import Link from "next/link";
import { FileSpreadsheet, Plus, Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function ExaminationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Examinations & Timetables
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Schedule institution examinations, examination timetables, and venue allocations.
          </p>
        </div>

        <Link
          href="/results"
          className="flex items-center gap-1.5 rounded-lg bg-[#123B6D] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0E2F57]"
        >
          <span>Go to Results Entry</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Mid-Term Examination (Term 3)</h3>
            <Badge variant="warning">Scheduled</Badge>
          </div>
          <p className="text-xs text-slate-500">Starts Oct 24, 2026 • Closes Nov 02, 2026</p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span>32 Papers</span>
            <span>All Streams</span>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900">End of Year National Mock</h3>
            <Badge variant="neutral">Draft</Badge>
          </div>
          <p className="text-xs text-slate-500">Starts Nov 15, 2026 • Senior 4 & Senior 6 Candidates</p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span>18 Papers</span>
            <span>Candidate Classes</span>
          </div>
        </div>
      </div>
    </div>
  );
}

