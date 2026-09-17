import type { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth/current-user";

export async function requireSchoolScope() {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHENTICATED");
  return { userId: user.id, schoolId: user.schoolId, roleId: user.roleId };
}

/**
 * Adds the authenticated school's tenant boundary to a Prisma where clause.
 * Use this helper for models that contain a direct schoolId field.
 */
export async function schoolWhere<T extends Prisma.UserWhereInput>(where: T): Promise<T & Prisma.UserWhereInput> {
  const scope = await requireSchoolScope();
  return { ...where, schoolId: scope.schoolId } as T & Prisma.UserWhereInput;
}

export async function assertSameSchool(entitySchoolId: string) {
  const scope = await requireSchoolScope();
  if (entitySchoolId !== scope.schoolId) throw new Error("FORBIDDEN");
  return scope;
}
