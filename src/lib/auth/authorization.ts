import { redirect } from "next/navigation";
import { getCurrentUser, requirePermissionOrThrow } from "@/lib/auth/current-user";
import { getSession } from "@/lib/auth/session";

export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return user;
}

export async function requirePermission(resource: string, action: string) {
  return requirePermissionOrThrow(resource, action);
}
