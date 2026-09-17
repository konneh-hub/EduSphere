import { NextResponse } from "next/server";
import { apiError, apiSuccess } from "@/lib/api/response";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const checkedAt = new Date().toISOString();

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      apiError("DATABASE_NOT_CONFIGURED", "DATABASE_URL is not configured"),
      { status: 503 },
    );
  }

  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      apiSuccess({
        service: "EduSphere",
        status: "ok",
        database: "ok",
        version: "0.2.0-database-foundation",
        checkedAt,
      }),
    );
  } catch {
    return NextResponse.json(
      apiError("DATABASE_UNAVAILABLE", "Database health check failed"),
      { status: 503 },
    );
  }
}
