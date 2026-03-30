import { NextResponse } from "next/server";
import { getContent, updateContent } from "@/lib/content";
import type { SiteContent } from "@/lib/content";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;
  const content = await getContent();
  const key = section as keyof SiteContent;

  if (!(key in content)) {
    return NextResponse.json({ error: "Section not found" }, { status: 404 });
  }

  return NextResponse.json(content[key]);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  const { section } = await params;
  try {
    const body = await request.json();
    const content = await getContent();
    const key = section as keyof SiteContent;

    if (!(key in content)) {
      return NextResponse.json(
        { error: "Section not found" },
        { status: 404 }
      );
    }

    (content as Record<string, unknown>)[key] = body;
    await updateContent(content);
    return NextResponse.json({ success: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid data";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
