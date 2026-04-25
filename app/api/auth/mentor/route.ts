import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE = "mentor_session";
const MAX_AGE = 60 * 60 * 24; // 24h

function makeToken() {
  const p = process.env.MENTOR_PAGE_PASSWORD ?? "";
  return crypto
    .createHash("sha256")
    .update(p + p)
    .digest("hex");
}

export async function POST(request: Request) {
  const { password } = await request.json();
  const expected = process.env.MENTOR_PAGE_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { error: "MENTOR_PAGE_PASSWORD not configured" },
      { status: 500 }
    );
  }

  if (password !== expected) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  }

  const jar = await cookies();
  jar.set(COOKIE, makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
    path: "/",
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  const expected = process.env.MENTOR_PAGE_PASSWORD;
  if (!expected) {
    return NextResponse.json({ protected: false, authenticated: true });
  }

  const jar = await cookies();
  const t = jar.get(COOKIE)?.value;
  return NextResponse.json({
    protected: true,
    authenticated: t === makeToken(),
  });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(COOKIE);
  return NextResponse.json({ success: true });
}
