import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { requireSession } from "@/lib/auth/authorization";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await requireSession();

  return <DashboardShell>{children}</DashboardShell>;
}
