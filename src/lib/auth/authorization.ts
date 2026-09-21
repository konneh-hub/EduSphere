import { redirect } from "next/navigation";
import { getCurrentUser, requirePermissionOrThrow } from "@/lib/auth/current-user";

export async function requireSession() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return user;
}

export async function requirePermission(resource: string, action: string) {
  return requirePermissionOrThrow(resource, action);
}
