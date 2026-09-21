import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type OnboardingPayload = {
  schoolName?: unknown;
  schoolCode?: unknown;
  schoolEmail?: unknown;
  schoolPhone?: unknown;
  adminName?: unknown;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function createSchoolCode(name: string) {
  const code = name
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 24);

  return code || "SCHOOL";
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Authentication required." } },
      { status: 401 },
    );
  }

  try {
    const profile = await currentUser();
    const primaryEmail = profile?.emailAddresses.find(
      (email) => email.id === profile.primaryEmailAddressId && email.verification?.status === "verified",
    )?.emailAddress;
    const body = (await request.json()) as OnboardingPayload;
    const schoolName = text(body.schoolName);
    const requestedCode = text(body.schoolCode).toUpperCase();
    const schoolEmail = text(body.schoolEmail).toLowerCase();
    const schoolPhone = text(body.schoolPhone);
    const adminName = text(body.adminName) || profile?.fullName || "School Administrator";

    if (!primaryEmail || !schoolName || !schoolEmail || !adminName) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "Complete all required onboarding fields." } },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { clerkUserId: userId }, select: { schoolId: true } });
    if (existingUser) {
      return NextResponse.json({ success: true, data: { schoolId: existingUser.schoolId } });
    }

    const schoolCode = requestedCode || createSchoolCode(schoolName);
    const duplicateSchool = await prisma.school.findFirst({
      where: { OR: [{ code: schoolCode }, { email: schoolEmail }] },
      select: { id: true },
    });
    if (duplicateSchool) {
      return NextResponse.json(
        { success: false, error: { code: "SCHOOL_EXISTS", message: "A school with that code or email already exists." } },
        { status: 409 },
      );
    }

    const result = await prisma.$transaction(async (transaction) => {
      const role = await transaction.role.upsert({
        where: { name: "School Administrator" },
        update: {},
        create: { name: "School Administrator", description: "Manages one school tenant and its users." },
      });
      const school = await transaction.school.create({
        data: { name: schoolName, code: schoolCode, email: schoolEmail, phone: schoolPhone || null },
      });
      const user = await transaction.user.create({
        data: {
          clerkUserId: userId,
          schoolId: school.id,
          roleId: role.id,
          name: adminName,
          email: primaryEmail.toLowerCase(),
          emailVerifiedAt: new Date(),
          lastLoginAt: new Date(),
        },
      });
      await transaction.auditLog.create({
        data: {
          schoolId: school.id,
          userId: user.id,
          action: "SCHOOL_ONBOARDING_COMPLETED",
          module: "AUTH",
          entity: "School",
          entityId: school.id,
        },
      });
      return school;
    });

    return NextResponse.json({ success: true, data: { schoolId: result.id } }, { status: 201 });
  } catch (error) {
    console.error("School onboarding failed", error);
    return NextResponse.json(
      { success: false, error: { code: "ONBOARDING_ERROR", message: "Unable to complete school onboarding." } },
      { status: 500 },
    );
  }
}