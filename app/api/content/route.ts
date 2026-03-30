import { NextResponse } from "next/server";
import { getContent, updateContent } from "@/lib/content";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await updateContent(body);
    return NextResponse.json({ success: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid data";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
