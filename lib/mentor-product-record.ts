import fs from "fs/promises";
import path from "path";

/** Full `<div id="app">…</div>` block from `content/mentor-product-record.html` (no `<script>`). */
export async function getMentorProductRecordAppHtml(): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "content",
    "mentor-product-record.html",
  );
  const html = await fs.readFile(filePath, "utf-8");
  const start = html.indexOf('<div id="app">');
  const scriptStart = html.indexOf("\n\n<script>");
  if (start === -1 || scriptStart === -1) {
    throw new Error(
      "mentor-product-record.html: expected <div id=\"app\"> and trailing script block",
    );
  }
  return html.slice(start, scriptStart);
}
