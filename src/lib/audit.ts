import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/current-user";

type AuditInput = {
  action: string;
  module?: string;
  entity?: string;
  entityId?: string;
  oldValue?: unknown;
  newValue?: unknown;
  ipAddress?: string;
  userAgent?: string;
};

function toJsonValue(value: unknown) {
  if (value === undefined) return undefined;
  return JSON.parse(JSON.stringify(value));
}

export async function writeAuditLog(input: AuditInput) {
  const user = await getCurrentUser();

  return prisma.auditLog.create({
    data: {
      schoolId: user?.schoolId,
      userId: user?.id,
      action: input.action,
      module: input.module,
      entity: input.entity,
      entityId: input.entityId,
      oldValue: toJsonValue(input.oldValue),
      newValue: toJsonValue(input.newValue),
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
    },
  });
}
