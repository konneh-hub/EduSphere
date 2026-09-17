import type { ReactNode } from "react";
import Link from "next/link";

const navigation = [
  { label: "Dashboard", href: "/dashboard" },
];

export function DashboardShell({ children }: { children: ReactNode }) {
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
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center border-b border-[var(--border)] bg-white px-4 sm:px-6">
            <div>
              <p className="text-sm font-semibold">EduSphere</p>
              <p className="text-xs text-[var(--muted)]">Foundation</p>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
