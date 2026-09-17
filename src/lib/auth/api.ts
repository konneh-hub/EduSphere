import { NextResponse } from "next/server";
import { getCurrentUser, hasPermission } from "@/lib/auth/current-user";

export async function requireApiUser() {
  const user = await getCurrentUser();

  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { success: false, error: { code: "UNAUTHENTICATED", message: "Authentication required." } },
        { status: 401 },
      ),
    } as const;
  }

  return { user, response: null } as const;
}

export async function requireApiPermission(resource: string, action: string) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { success: false, error: { code: "UNAUTHENTICATED", message: "Authentication required." } },
        { status: 401 },
      ),
    } as const;
  }

  if (!(await hasPermission(resource, action))) {
    return {
      user: null,
      response: NextResponse.json(
        { success: false, error: { code: "FORBIDDEN", message: "You do not have permission to perform this action." } },
        { status: 403 },
      ),
    } as const;
  }

  return { user, response: null } as const;
}
