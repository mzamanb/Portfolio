const fs = require("fs");
const https = require("https");

const BASE = "https://ebook-walnut-50035687.figma.site";

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(
      url,
      { headers: { "User-Agent": "Mozilla/5.0" } },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => resolve(d));
      }
    ).on("error", reject);
  });
}

function extractAssets(html) {
  const re = /\/_assets\/v11\/[a-f0-9]+\.(png|jpg|jpeg|webp|gif)/gi;
  const s = new Set();
  let m;
  while ((m = re.exec(html))) s.add(m[0]);
  return [...s];
}

function extractHrefs(html) {
  const re = /href="(\/[^"]+)"/g;
  const s = new Set();
  let m;
  while ((m = re.exec(html))) {
    if (!m[1].startsWith("/_")) s.add(m[1]);
  }
  return [...s];
}

async function main() {
  const indexHtml = await fetch(BASE + "/");
  fs.writeFileSync("figma_page.html", indexHtml);

  const allAssets = new Map(); // path -> Set of pages
  const add = (path, page) => {
    if (!allAssets.has(path)) allAssets.set(path, new Set());
    allAssets.get(path).add(page);
  };

  for (const a of extractAssets(indexHtml)) add(a, "/");

  const hrefs = extractHrefs(indexHtml);
  console.log("Internal hrefs:", hrefs.slice(0, 30), "... total", hrefs.length);

  for (const h of hrefs) {
    if (h === "/" || h.includes("#")) continue;
    try {
      const html = await fetch(BASE + h);
      for (const a of extractAssets(html)) add(a, h);
    } catch (e) {
      console.error("fetch fail", h, e.message);
    }
  }

  console.log("\nAll unique assets:", allAssets.size);
  for (const [path, pages] of [...allAssets.entries()].sort()) {
    console.log(path, "from", [...pages].join(", "));
  }
}

main().catch(console.error);
