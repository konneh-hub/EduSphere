import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findFirst({
    where: {
      id: session.userId,
      schoolId: session.schoolId,
      status: "ACTIVE",
    },
    select: {
      id: true,
      schoolId: true,
      roleId: true,
      name: true,
      email: true,
      status: true,
      role: {
        select: { id: true, name: true },
      },
      school: {
        select: { id: true, name: true, code: true },
      },
    },
  });

  return user;
}

export async function hasPermission(resource: string, action: string) {
  const user = await getCurrentUser();
  if (!user) return false;

  const permission = await prisma.rolePermission.findFirst({
    where: {
      roleId: user.roleId,
      permission: { resource, action },
    },
    select: { permissionId: true },
  });

  return Boolean(permission);
}

export async function requirePermissionOrThrow(resource: string, action: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHENTICATED");

  const allowed = await prisma.rolePermission.findFirst({
    where: {
      roleId: user.roleId,
      permission: { resource, action },
    },
    select: { permissionId: true },
  });

  if (!allowed) throw new Error("FORBIDDEN");
  return user;
}
