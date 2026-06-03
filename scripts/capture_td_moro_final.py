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

        # Work/case studies section is around 15-20% (3000-4000px on a 19726px page)
        # Capture it cleanly centered
        work_pos = int(total_height * 0.17)
        page.evaluate(f"window.scrollTo(0, {work_pos})")
        time.sleep(1.5)
        out = "C:/Projects/Portfolio/docs/td-moro-work.png"
        page.screenshot(path=out, full_page=False)
        print(f"Saved work section at {work_pos}px -> {out}")

        # Footer: last 5% of page
        footer_pos = int(total_height * 0.96)
        page.evaluate(f"window.scrollTo(0, {footer_pos})")
        time.sleep(1.5)
        out2 = "C:/Projects/Portfolio/docs/td-moro-footer.png"
        page.screenshot(path=out2, full_page=False)
        print(f"Saved footer at {footer_pos}px -> {out2}")

        browser.close()
        print("Done.")

if __name__ == "__main__":
    capture()
