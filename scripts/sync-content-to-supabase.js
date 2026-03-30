/**
 * Reads data/content.json and upserts into Supabase site_content.
 * Loads NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from .env.local
 */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

function loadEnvLocal() {
  const p = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(p)) return {};
  const env = {};
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    env[k] = v;
  }
  return env;
}

async function main() {
  const env = loadEnvLocal();
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }

  const contentPath = path.join(__dirname, "..", "data", "content.json");
  const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));

  const supabase = createClient(url, key);
  const { error } = await supabase
    .from("site_content")
    .upsert({ id: "main", data: content }, { onConflict: "id" });

  if (error) {
    console.error("Supabase upsert failed:", error.message);
    process.exit(1);
  }
  console.log("Synced content.json to Supabase (site_content.main).");
}

main();
