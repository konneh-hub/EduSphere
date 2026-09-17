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
      oldValue: input.oldValue === undefined ? undefined : JSON.parse(JSON.stringify(input.oldValue)),
      newValue: input.newValue === undefined ? undefined : JSON.parse(JSON.stringify(input.newValue)),
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
    },
  });
}
