import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const linkedUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      id: true,
      schoolId: true,
      roleId: true,
      name: true,
      email: true,
      status: true,
      role: { select: { id: true, name: true } },
      school: { select: { id: true, name: true, code: true } },
    },
  });

  if (linkedUser?.status === "ACTIVE") return linkedUser;

  const clerkProfile = await currentUser();
  const primaryEmail = clerkProfile?.emailAddresses.find(
    (email) => email.id === clerkProfile.primaryEmailAddressId && email.verification?.status === "verified",
  )?.emailAddress;

  if (!primaryEmail) return null;

  const matchingUsers = await prisma.user.findMany({
    where: { email: primaryEmail.toLowerCase(), status: "ACTIVE", clerkUserId: null },
    select: { id: true },
  });

  if (matchingUsers.length !== 1) return null;

  return prisma.user.update({
    where: { id: matchingUsers[0].id },
    data: { clerkUserId: userId, emailVerifiedAt: new Date(), lastLoginAt: new Date() },
    select: {
      id: true,
      schoolId: true,
      roleId: true,
      name: true,
      email: true,
      status: true,
      role: { select: { id: true, name: true } },
      school: { select: { id: true, name: true, code: true } },
    },
  });
}

export async function hasPermission(resource: string, action: string) {
  const user = await getCurrentUser();
  if (!user) return false;

  const permission = await prisma.rolePermission.findFirst({
    where: { roleId: user.roleId, permission: { resource, action } },
    select: { permissionId: true },
  });

  return Boolean(permission);
}

export async function requirePermissionOrThrow(resource: string, action: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHENTICATED");

  const allowed = await prisma.rolePermission.findFirst({
    where: { roleId: user.roleId, permission: { resource, action } },
    select: { permissionId: true },
  });

  if (!allowed) throw new Error("FORBIDDEN");
  return user;
}

export async function requireRole(...roleNames: string[]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHENTICATED");
  if (!roleNames.includes(user.role.name)) throw new Error("FORBIDDEN");
  return user;
}
