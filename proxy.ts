import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthValid } from "./lib/auth/middleware";

export function proxy(request: NextRequest) {
  console.log("Checking authentication...");
  if (!isAuthValid(request)) {
    return Response.json(
      { error: "Unauthorized! Please login with your credentials" },
      { status: 401 },
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
