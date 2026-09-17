import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireSession } from "@/lib/auth/authorization";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  await requireSession();

  return <DashboardShell>{children}</DashboardShell>;
}
