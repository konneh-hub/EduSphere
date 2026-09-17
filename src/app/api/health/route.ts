import { NextResponse } from "next/server";
import { apiSuccess } from "@/lib/api/response";

export function GET() {
  return NextResponse.json(
    apiSuccess({
      service: "EduSphere",
      status: "ok",
      version: "1.0.0-foundation",
      timestamp: new Date().toISOString(),
    }),
  );
}
