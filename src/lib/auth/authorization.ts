import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";

export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

export async function requirePermission(resource: string, action: string) {
  const session = await requireSession();

  const permission = await prisma.rolePermission.findFirst({
    where: {
      roleId: session.roleId,
      permission: { resource, action },
    },
    select: { permissionId: true },
  });

  if (!permission) {
    throw new Error("FORBIDDEN");
  }

  return session;
}
