import React from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  LayoutGrid,
  Wallet,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  Clock,
  MapPin,
  ChevronRight,
  FileSpreadsheet,
  Plus,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { Badge } from "@/components/ui/Badge";

export default function DashboardPage() {
  return (
    <section className="mx-auto max-w-5xl">
      <div className="rounded-xl border border-[var(--border)] bg-white p-6 sm:p-8">
        <p className="text-sm font-semibold text-[var(--secondary)]">Phase 1 · Foundation</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[var(--primary)] sm:text-3xl">
          EduSphere foundation is ready
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
          This dashboard route is intentionally structural. Business modules, real data, authentication,
          authorization, and tenant operations will be implemented in their dependent phases.
        </p>
    <div className="space-y-6">
      {/* 1. Welcome Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Welcome back, John
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Here is what is happening across your institution today.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-lg border border-teal-200/80 bg-teal-50/80 px-3.5 py-2 text-xs font-semibold text-[#0F766E]">
          <Calendar className="h-4 w-4" />
          <span>Academic Year 2026 — Term 3</span>
        </div>
      </div>
    </section>

      {/* 2. KPI Metrics Grid (4 columns) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value="1,248"
          delta={{ value: "+12%", isPositive: true, period: "vs last term" }}
          icon={<Users className="h-5 w-5" />}
          iconBgColor="bg-[#CCFBF1]"
          iconColor="text-[#0F766E]"
        />
        <StatCard
          title="Total Teachers"
          value="86"
          delta={{ value: "+3%", isPositive: true, period: "vs last term" }}
          icon={<GraduationCap className="h-5 w-5" />}
          iconBgColor="bg-[#E0F2FE]"
          iconColor="text-[#0284C7]"
        />
        <StatCard
          title="Active Classes"
          value="32"
          delta={{ value: "8 Streams", isPositive: true }}
          icon={<LayoutGrid className="h-5 w-5" />}
          iconBgColor="bg-[#FEF3C7]"
          iconColor="text-[#D97706]"
        />
        <StatCard
          title="Fee Collection"
          value="UGX 45.2M"
          delta={{ value: "+8%", isPositive: true, period: "vs target" }}
          icon={<Wallet className="h-5 w-5" />}
          iconBgColor="bg-[#DCFCE7]"
          iconColor="text-[#16A34A]"
        />
      </div>

      {/* 3. Charts & Analytics Row (2/3 + 1/3 split) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left (2 cols): Academic Performance Bar Chart */}
        <div className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--border)] pb-4">
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)]">Academic Performance</h2>
              <p className="text-xs text-[var(--muted)]">Average Term Assessment Scores by Core Subject</p>
            </div>
            <span className="self-start rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-semibold text-[#123B6D]">
              Term 3 Benchmarks
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="mt-6">
            <div className="space-y-4">
              {/* Math */}
              <div>
                <div className="mb-1.5 flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">Mathematics</span>
                  <span className="text-[#123B6D] font-bold">82%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#123B6D] transition-all duration-500"
                    style={{ width: "82%" }}
                  />
                </div>
              </div>

              {/* English */}
              <div>
                <div className="mb-1.5 flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">English Language</span>
                  <span className="text-[#0F766E] font-bold">78%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#0F766E] transition-all duration-500"
                    style={{ width: "78%" }}
                  />
                </div>
              </div>

              {/* Integrated Science */}
              <div>
                <div className="mb-1.5 flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">Integrated Science & Physics</span>
                  <span className="text-[#F59E0B] font-bold">85%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#F59E0B] transition-all duration-500"
                    style={{ width: "85%" }}
                  />
                </div>
              </div>

              {/* Social Studies */}
              <div>
                <div className="mb-1.5 flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">Social Studies & History</span>
                  <span className="text-slate-600 font-bold">71%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-600 transition-all duration-500"
                    style={{ width: "71%" }}
                  />
                </div>
              </div>
            </div>

            {/* Chart Legend */}
            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[var(--border)] pt-4 text-xs text-[var(--muted)]">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#123B6D]" />
                <span>Mathematics</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0F766E]" />
                <span>English</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                <span>Science</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                <span>Social Studies</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right (1 col): Attendance Donut Overview */}
        <div className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm flex flex-col justify-between">
          <div className="border-b border-[var(--border)] pb-4">
            <h2 className="text-base font-bold text-[var(--foreground)]">Attendance Overview</h2>
            <p className="text-xs text-[var(--muted)]">Today’s Student Attendance</p>
          </div>

          {/* Donut Visual Display */}
          <div className="my-6 flex flex-col items-center justify-center">
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-8 border-teal-500/20 bg-white">
              {/* Inner Donut Ring */}
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-teal-50/50 shadow-inner">
                <span className="text-2xl font-extrabold text-[#0F766E]">85%</span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Present
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs text-[var(--muted)]">30 of 32 Classes Recorded</p>
          </div>

          {/* Donut Breakdown Stats */}
          <div className="space-y-2 border-t border-[var(--border)] pt-4 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0F766E]" />
                <span className="font-medium text-slate-700">Present</span>
              </div>
              <span className="font-bold text-[#0F766E]">1,061 (85%)</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                <span className="font-medium text-slate-700">Absent</span>
              </div>
              <span className="font-bold text-[#B91C1C]">125 (10%)</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
                <span className="font-medium text-slate-700">Late</span>
              </div>
              <span className="font-bold text-[#B45309]">62 (5%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Recent Admissions & Upcoming Events */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left (2 cols): Recent Admissions */}
        <div className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)]">Recent Admissions</h2>
              <p className="text-xs text-[var(--muted)]">Latest student enrollments this term</p>
            </div>
            <Link
              href="/students"
              className="flex items-center gap-1 text-xs font-semibold text-[#123B6D] hover:underline"
            >
              <span>View All</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs text-[var(--text)]">
              <thead className="bg-[#F8FAFC] text-slate-500 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Student</th>
                  <th className="py-2.5 px-3">Class & Stream</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-100 text-[#0F766E] text-[11px] font-bold">
                      PN
                    </div>
                    <span>Patricia Namara</span>
                  </td>
                  <td className="py-3 px-3">Senior 4 Blue</td>
                  <td className="py-3 px-3 text-slate-500">Oct 12, 2026</td>
                  <td className="py-3 px-3">
                    <Badge variant="success">Active</Badge>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-[#B45309] text-[11px] font-bold">
                      DO
                    </div>
                    <span>Derrick Okello</span>
                  </td>
                  <td className="py-3 px-3">Senior 1 Gold</td>
                  <td className="py-3 px-3 text-slate-500">Oct 10, 2026</td>
                  <td className="py-3 px-3">
                    <Badge variant="warning">Pending</Badge>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[#123B6D] text-[11px] font-bold">
                      JK
                    </div>
                    <span>Joan Kabasomi</span>
                  </td>
                  <td className="py-3 px-3">Senior 5 Science</td>
                  <td className="py-3 px-3 text-slate-500">Oct 09, 2026</td>
                  <td className="py-3 px-3">
                    <Badge variant="success">Active</Badge>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-purple-700 text-[11px] font-bold">
                      SM
                    </div>
                    <span>Samuel Mukasa</span>
                  </td>
                  <td className="py-3 px-3">Senior 2 Green</td>
                  <td className="py-3 px-3 text-slate-500">Oct 08, 2026</td>
                  <td className="py-3 px-3">
                    <Badge variant="success">Active</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right (1 col): Upcoming Events */}
        <div className="rounded-xl border border-[var(--border)] bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div>
                <h2 className="text-base font-bold text-[var(--foreground)]">Upcoming Events</h2>
                <p className="text-xs text-[var(--muted)]">School calendar schedule</p>
              </div>
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700 border border-amber-200">
                3 Events
              </span>
            </div>

            <div className="mt-4 space-y-3.5">
              {/* Event 1 */}
              <div className="flex items-start gap-3 rounded-lg border border-[var(--border)] p-3 hover:bg-slate-50/80 transition-colors">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-[#FEF3C7] text-[#B45309]">
                  <span className="text-sm font-extrabold leading-none">18</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider">OCT</span>
                </div>
                <div className="min-w-0 flex-1 text-xs">
                  <p className="font-bold text-slate-900 truncate">PTA General Meeting</p>
                  <p className="mt-0.5 flex items-center gap-1 text-slate-500">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span>10:00 AM • Main Assembly Hall</span>
                  </p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="flex items-start gap-3 rounded-lg border border-[var(--border)] p-3 hover:bg-slate-50/80 transition-colors">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-[#E0F2FE] text-[#0284C7]">
                  <span className="text-sm font-extrabold leading-none">24</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider">OCT</span>
                </div>
                <div className="min-w-0 flex-1 text-xs">
                  <p className="font-bold text-slate-900 truncate">Mid-Term Examinations</p>
                  <p className="mt-0.5 flex items-center gap-1 text-slate-500">
                    <FileSpreadsheet className="h-3 w-3 text-slate-400" />
                    <span>Starts 8:30 AM • All Streams</span>
                  </p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="flex items-start gap-3 rounded-lg border border-[var(--border)] p-3 hover:bg-slate-50/80 transition-colors">
                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-[#DCFCE7] text-[#15803D]">
                  <span className="text-sm font-extrabold leading-none">02</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider">NOV</span>
                </div>
                <div className="min-w-0 flex-1 text-xs">
                  <p className="font-bold text-slate-900 truncate">Annual Inter-House Sports</p>
                  <p className="mt-0.5 flex items-center gap-1 text-slate-500">
                    <MapPin className="h-3 w-3 text-slate-400" />
                    <span>All Day Event • Sports Complex</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/academics"
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[var(--border)] py-2 text-xs font-semibold text-[var(--foreground)] hover:bg-slate-50"
          >
            <span>View Full Calendar</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
