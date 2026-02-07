import { NextRequest } from "next/server";
export function isAuthValid(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  const token = authHeader.substring(7);
  const validToken = process.env.API_SECRET_KEY;
  if (!validToken) {
    console.error("API_SECRET_KEY is not set");
    return false;
  }
  return token === validToken;
}
