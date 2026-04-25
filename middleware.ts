import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TOKEN_NAME = "admin_session";
const MENTOR_COOKIE = "mentor_session";

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

/** When MENTOR_PAGE_PASSWORD is unset, /mentor is public. */
async function isMentorSessionValid(request: NextRequest): Promise<boolean> {
  const p = process.env.MENTOR_PAGE_PASSWORD;
  if (!p) return true;
  const token = request.cookies.get(MENTOR_COOKIE)?.value;
  if (!token) return false;
  const expected = await makeToken(p);
  return token === expected;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/api/auth" || pathname === "/api/auth/mentor") {
    return NextResponse.next();
  }

  const isMentorPath =
    pathname === "/mentor" || pathname.startsWith("/mentor/");
  if (isMentorPath) {
    if (pathname === "/mentor/login" || pathname === "/mentor/login/") {
      return NextResponse.next();
    }
    if (process.env.MENTOR_PAGE_PASSWORD) {
      if (!(await isMentorSessionValid(request))) {
        const url = new URL("/mentor/login", request.url);
        return NextResponse.redirect(url);
      }
    }
    return NextResponse.next();
  }

  const method = request.method;
  if (method === "OPTIONS") {
    return NextResponse.next();
  }

  const isContentApi =
    pathname === "/api/content" || pathname.startsWith("/api/content/");
  const isUpload = pathname === "/api/upload";
  const isSeed = pathname.startsWith("/api/seed");

  const needsAuth =
    isContentApi || isUpload || isSeed;

  if (needsAuth && !(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/content",
    "/api/content/:path*",
    "/api/upload",
    "/api/auth",
    "/api/auth/mentor",
    "/api/seed",
    "/mentor",
    "/mentor/:path*",
  ],
};
