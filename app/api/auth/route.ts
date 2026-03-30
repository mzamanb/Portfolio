import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const TOKEN_NAME = "admin_session";
const TOKEN_MAX_AGE = 60 * 60 * 24; // 24 hours

function makeToken(password: string): string {
  return crypto
    .createHash("sha256")
    .update(password + (process.env.ADMIN_PASSWORD ?? ""))
    .digest("hex");
}

export async function POST(request: Request) {
  const { password } = await request.json();
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD not configured" },
      { status: 500 }
    );
  }

  if (password !== expected) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  }

  const token = makeToken(expected);
  const jar = await cookies();
  jar.set(TOKEN_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: TOKEN_MAX_AGE,
    path: "/",
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return NextResponse.json({ authenticated: false });
  }

  const jar = await cookies();
  const token = jar.get(TOKEN_NAME)?.value;
  const valid = token === makeToken(expected);

  return NextResponse.json({ authenticated: valid });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(TOKEN_NAME);
  return NextResponse.json({ success: true });
}
