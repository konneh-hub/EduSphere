import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const schoolCode = typeof body.schoolCode === "string" ? body.schoolCode.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!schoolCode || !email || !password) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "School code, email, and password are required." } },
        { status: 400 },
      );
    }

    const user = await prisma.user.findFirst({
      where: { email, school: { code: schoolCode } },
      select: { id: true, schoolId: true, roleId: true, name: true, status: true, passwordHash: true },
    });

    if (!user || !user.passwordHash || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json(
        { success: false, error: { code: "INVALID_CREDENTIALS", message: "Invalid sign-in credentials." } },
        { status: 401 },
      );
    }

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        { success: false, error: { code: "ACCOUNT_INACTIVE", message: "This account is not active." } },
        { status: 403 },
      );
    }

    await prisma.$transaction([
      prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } }),
      prisma.auditLog.create({
        data: {
          schoolId: user.schoolId,
          userId: user.id,
          action: "LOGIN",
          module: "AUTH",
          entity: "User",
          entityId: user.id,
        },
      }),
    ]);

    await createSession({ userId: user.id, schoolId: user.schoolId, roleId: user.roleId });

    return NextResponse.json({ success: true, data: { user: { id: user.id, name: user.name } } });
  } catch (error) {
    console.error("Login failed", error);
    return NextResponse.json(
      { success: false, error: { code: "AUTH_ERROR", message: "Unable to sign in." } },
      { status: 500 },
    );
  }
}
