import { getCurrentUser } from "@/lib/auth/current-user";

export async function requireSchoolScope() {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHENTICATED");
  return { userId: user.id, schoolId: user.schoolId, roleId: user.roleId };
}

/**
 * Returns the authenticated tenant boundary for models with a direct schoolId.
 * Always merge this value into server-side Prisma filters; never accept a
 * client-provided schoolId as the tenant boundary.
 */
export async function schoolScopeFilter() {
  const { schoolId } = await requireSchoolScope();
  return { schoolId } as const;
}

export async function assertSameSchool(entitySchoolId: string) {
  const scope = await requireSchoolScope();
  if (entitySchoolId !== scope.schoolId) throw new Error("FORBIDDEN");
  return scope;
}
