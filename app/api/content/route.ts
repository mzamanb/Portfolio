import { NextResponse } from "next/server";
import { getContent, updateContent } from "@/lib/content";

export async function GET() {
  const content = getContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    updateContent(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
