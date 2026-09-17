import { NextResponse } from "next/server";
import { clearSession, getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getSession();

  if (session) {
    await prisma.auditLog.create({
      data: {
        schoolId: session.schoolId,
        userId: session.userId,
        action: "LOGOUT",
        module: "AUTH",
        entity: "User",
        entityId: session.userId,
      },
    });
  }

  await clearSession();
  return NextResponse.json({ ok: true });
}
