from playwright.sync_api import sync_playwright
import time

URL = "https://td-moro.framer.website/"
HERO_OUT = "C:/Projects/Portfolio/docs/td-moro-hero.png"
WORK_OUT = "C:/Projects/Portfolio/docs/td-moro-work.png"
FULL_OUT = "C:/Projects/Portfolio/docs/td-moro-full.png"

def capture():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080})

        print(f"Navigating to {URL} ...")
        page.goto(URL, wait_until="networkidle", timeout=60000)
        time.sleep(3)  # extra settle time for Framer animations

        # --- Above-the-fold / Hero screenshot ---
        page.evaluate("window.scrollTo(0, 0)")
        time.sleep(1)
        page.screenshot(path=HERO_OUT, full_page=False)
        print(f"Saved hero screenshot: {HERO_OUT}")

        # --- Get total page height ---
        total_height = page.evaluate("document.body.scrollHeight")
        viewport_height = 1080
        print(f"Total page height: {total_height}px")

        # --- Scroll to work/projects section (roughly 50-60% down) ---
        scroll_target = int(total_height * 0.45)
        page.evaluate(f"window.scrollTo(0, {scroll_target})")
        time.sleep(1.5)
        page.screenshot(path=WORK_OUT, full_page=False)
        print(f"Saved work screenshot: {WORK_OUT}")

        # --- Full-page screenshot ---
        page.evaluate("window.scrollTo(0, 0)")
        time.sleep(0.5)
        page.screenshot(path=FULL_OUT, full_page=True)
        print(f"Saved full-page screenshot: {FULL_OUT}")

        browser.close()
        print("Done.")

if __name__ == "__main__":
    capture()
