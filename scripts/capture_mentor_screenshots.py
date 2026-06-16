"""Capture screenshots from the live Mentor site for the portfolio case study.

Targets specific sections (by element id) rather than blind scroll offsets, so
the images stay aligned with the case study captions even if the live site
shifts vertically. Run: python scripts/capture_mentor_screenshots.py
"""

from playwright.sync_api import sync_playwright

URL = "https://mentor-ide.vercel.app/"
VIEWPORT = {"width": 1440, "height": 900}
SCALE = 2  # retina-crisp output

OUT_DIR = "C:/Projects/Portfolio/public/images"

# (output filename, section selector, scroll offset to clear the sticky nav)
TARGETS = [
    ("mentor-hero.png", "#top", 0),
    ("mentor-features.png", "#features", 72),
    ("mentor-detail.png", "#lesson", 72),
]


def capture_screenshots() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(
            viewport=VIEWPORT, device_scale_factor=SCALE
        )

        print(f"Navigating to {URL} ...")
        page.goto(URL, wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(3000)  # let animations and lazy content settle

        for filename, selector, offset in TARGETS:
            path = f"{OUT_DIR}/{filename}"
            top = page.evaluate(
                "(sel) => { const el = document.querySelector(sel);"
                " return el ? el.getBoundingClientRect().top + window.scrollY : 0; }",
                selector,
            )
            page.evaluate(f"window.scrollTo(0, {max(0, top - offset)})")
            page.wait_for_timeout(900)
            page.screenshot(path=path, full_page=False)
            print(f"Saved {filename} from {selector} (scrollY ~{int(top)})")

        browser.close()
        print("Done.")


if __name__ == "__main__":
    capture_screenshots()
