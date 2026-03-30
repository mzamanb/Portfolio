import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TOKEN_NAME = "admin_session";

async function makeToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(password + password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const token = request.cookies.get(TOKEN_NAME)?.value;
  if (!token) return false;
  const expected = await makeToken(password);
  return token === expected;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/api/auth") {
    return NextResponse.next();
  }

  const isWriteApi =
    (pathname.startsWith("/api/content") && request.method === "PUT") ||
    pathname.startsWith("/api/upload") ||
    pathname.startsWith("/api/seed");

  if (isWriteApi && !(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/content/:path*", "/api/upload", "/api/auth", "/api/seed"],
};
