from playwright.sync_api import sync_playwright
import time

URL = "https://td-moro.framer.website/"

def capture():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080})

        print(f"Navigating to {URL} ...")
        page.goto(URL, wait_until="networkidle", timeout=60000)
        time.sleep(3)

        total_height = page.evaluate("document.body.scrollHeight")
        print(f"Total page height: {total_height}px")

        # Capture strips at 20%, 35%, 55%, 70%, 85% to find projects/work and footer
        scroll_positions = {
            "td-moro-scroll-20pct.png": 0.20,
            "td-moro-scroll-35pct.png": 0.35,
            "td-moro-scroll-55pct.png": 0.55,
            "td-moro-scroll-70pct.png": 0.70,
            "td-moro-scroll-85pct.png": 0.85,
        }

        for filename, pct in scroll_positions.items():
            pos = int(total_height * pct)
            page.evaluate(f"window.scrollTo(0, {pos})")
            time.sleep(1.5)
            out = f"C:/Projects/Portfolio/docs/{filename}"
            page.screenshot(path=out, full_page=False)
            print(f"  {pct*100:.0f}% ({pos}px) -> {filename}")

        browser.close()
        print("Done.")

if __name__ == "__main__":
    capture()
