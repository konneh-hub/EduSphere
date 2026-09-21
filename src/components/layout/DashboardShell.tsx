import type { ReactNode } from "react";
"use client";

import React, { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  UserCheck,
  Users,
  BookOpen,
  CalendarCheck,
  FileSpreadsheet,
  BarChart3,
  CreditCard,
  Library,
  Archive,
  FileText,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  LogOut,
  ChevronDown,
  User as UserIcon,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", href: "/dashboard" },
interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigation: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Students", href: "/students", icon: GraduationCap },
  { label: "Teachers", href: "/teachers", icon: UserCheck },
  { label: "Parents", href: "/parents", icon: Users },
  { label: "Academics", href: "/academics", icon: BookOpen },
  { label: "Attendance", href: "/attendance", icon: CalendarCheck },
  { label: "Examinations", href: "/examinations", icon: FileSpreadsheet },
  { label: "Results", href: "/results", icon: BarChart3 },
  { label: "Finance", href: "/finance", icon: CreditCard },
  { label: "Library", href: "/library", icon: Library },
  { label: "Inventory", href: "/inventory", icon: Archive },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function DashboardShell({ children }: { children: ReactNode }) {
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await signOut();
      router.replace("/sign-in");
      router.refresh();
    } catch {
      router.replace("/sign-in");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text)]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-[var(--border)] bg-white lg:block">
          <div className="border-b border-[var(--border)] px-6 py-5">
            <Link href="/dashboard" className="text-xl font-bold text-[var(--primary)]">
              EduSphere
            </Link>
            <p className="mt-1 text-xs text-[var(--muted)]">School Management Platform</p>
          </div>
          <nav className="space-y-1 p-4" aria-label="Dashboard navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--text)] hover:bg-[var(--surface)]"
              >
                {item.label}
              </Link>
            ))}
    <div className="min-h-screen bg-[var(--surface)] text-[var(--foreground)]">
      {/* Desktop Fixed Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#111827] text-white lg:flex">
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-tr from-[#123B6D] to-[#0F766E] p-1 shadow-md">
              <Image
                src="/edusphere.png"
                alt="EduSphere"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white">EduSphere</span>
              <span className="ml-2 rounded-md bg-teal-950 px-1.5 py-0.5 text-[10px] font-bold text-teal-400 border border-teal-800/60">
                SMS ADMIN
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            School Management
          </p>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#1E3A8A] text-white shadow-xs font-semibold"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                      isActive ? "text-teal-300" : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center border-b border-[var(--border)] bg-white px-4 sm:px-6">
            <div>
              <p className="text-sm font-semibold">EduSphere</p>
              <p className="text-xs text-[var(--muted)]">Foundation</p>
        {/* Sidebar Footer Status */}
        <div className="border-t border-slate-800 p-4">
          <div className="rounded-lg bg-slate-900/80 p-3 border border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-200">Active Term</span>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
            <p className="mt-1 text-[11px] text-teal-400 font-medium">Academic Year 2026 — Term 3</p>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-[#111827] text-white transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <Image
              src="/edusphere.png"
              alt="EduSphere Logo"
              width={32}
              height={32}
              className="rounded-lg object-contain"
            />
            <span className="text-lg font-bold text-white">EduSphere</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="h-[calc(100vh-4rem)] overflow-y-auto px-3 py-4">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive ? "bg-[#1E3A8A] text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Layout Area */}
      <div className="flex min-h-screen flex-col lg:pl-64">
        {/* Top Utility Header */}
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-[var(--border)] bg-white px-4 sm:px-6 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Global Search Bar */}
            <div className="relative hidden w-72 sm:block md:w-96">
              <input
                type="text"
                placeholder="Search students, teachers, documents..."
                className="w-full rounded-full border border-[var(--border)] bg-[#F1F5F9] py-1.5 pl-9 pr-4 text-xs sm:text-sm text-[var(--foreground)] outline-none placeholder:text-slate-400 focus:border-[#123B6D] focus:bg-white"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Notifications Bell */}
            <button
              type="button"
              className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                3
              </span>
            </button>

            {/* Divider */}
            <div className="h-6 w-px bg-slate-200" />

            {/* User Profile Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 rounded-full p-1 text-left hover:bg-slate-50 focus:outline-none"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#123B6D] text-xs font-bold text-white shadow-xs">
                  JA
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-[var(--foreground)] leading-none">John A.</p>
                  <p className="text-[10px] text-[var(--muted)] leading-none mt-1">Administrator</p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[var(--border)] bg-white py-1.5 shadow-lg z-50">
                  <div className="border-b border-slate-100 px-4 py-2">
                    <p className="text-xs font-bold text-slate-800">John A.</p>
                    <p className="text-[11px] text-slate-500 truncate">admin@edusphere.edu</p>
                  </div>
                  <Link
                    href="/settings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    <UserIcon className="h-3.5 w-3.5 text-slate-400" />
                    Account Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="flex w-full items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    {loggingOut ? "Signing out..." : "Sign out"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
