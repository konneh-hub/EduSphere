import { getCurrentUser } from "@/lib/auth/current-user";

export async function requireSchoolScope() {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHENTICATED");
  return { userId: user.id, schoolId: user.schoolId, roleId: user.roleId };
}

/**
 * Returns the authenticated tenant boundary for models with a direct schoolId.
 * Server code must merge this filter into Prisma queries instead of trusting
 * a schoolId supplied by a client.
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
