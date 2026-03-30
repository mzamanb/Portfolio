import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getSupabase, CONTENT_TABLE, CONTENT_ROW_ID } from "@/lib/supabase";

export async function POST() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase not configured" },
      { status: 503 }
    );
  }

  try {
    const filePath = path.join(process.cwd(), "data", "content.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    const { error } = await supabase
      .from(CONTENT_TABLE)
      .upsert({ id: CONTENT_ROW_ID, data }, { onConflict: "id" });

    if (error) {
      return NextResponse.json(
        { error: `Seed failed: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Content seeded to Supabase" });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Seed failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
