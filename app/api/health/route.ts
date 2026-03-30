import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabase = getSupabase();

  let dbOk = false;
  let storageOk = false;

  if (supabase) {
    const { error: dbErr } = await supabase
      .from("site_content")
      .select("id")
      .limit(1);
    dbOk = !dbErr;

    const { error: storageErr } = await supabase.storage.listBuckets();
    storageOk = !storageErr;
  }

  return NextResponse.json({
    supabaseConfigured: !!supabase,
    envVars: { hasUrl, hasKey },
    database: dbOk,
    storage: storageOk,
  });
}
