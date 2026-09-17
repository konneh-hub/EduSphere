import { NextResponse } from "next/server";
import { getCurrentUser, hasPermission } from "@/lib/auth/current-user";

const errorResponse = (code: string, message: string, status: number) =>
  NextResponse.json({ success: false, error: { code, message } }, { status });

export async function requireApiUser() {
  const user = await getCurrentUser();
  if (!user) return { user: null, response: errorResponse("UNAUTHENTICATED", "Authentication required.", 401) } as const;
  return { user, response: null } as const;
}

export async function requireApiPermission(resource: string, action: string) {
  const user = await getCurrentUser();
  if (!user) return { user: null, response: errorResponse("UNAUTHENTICATED", "Authentication required.", 401) } as const;
  if (!(await hasPermission(resource, action))) {
    return { user: null, response: errorResponse("FORBIDDEN", "You do not have permission to perform this action.", 403) } as const;
  }
  return { user, response: null } as const;
}
