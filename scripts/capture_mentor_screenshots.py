from playwright.sync_api import sync_playwright
import time

URL = "https://mentor-ide.vercel.app/"
VIEWPORT = {"width": 1440, "height": 900}

HERO_PATH    = "C:/Projects/Portfolio/public/images/mentor-hero.png"
FEATURES_PATH = "C:/Projects/Portfolio/public/images/mentor-features.png"
DETAIL_PATH  = "C:/Projects/Portfolio/public/images/mentor-detail.png"

def capture_screenshots():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport=VIEWPORT)

        print(f"Navigating to {URL} ...")
        page.goto(URL, wait_until="networkidle", timeout=60000)

        # Extra pause to let lazy-loaded content and animations settle
        page.wait_for_timeout(3000)

        # --- 1. Above-the-fold hero screenshot ---
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(800)
        page.screenshot(path=HERO_PATH, full_page=False)
        print(f"Saved hero screenshot: {HERO_PATH}")

        # Get full page height so we can decide scroll stops
        full_height = page.evaluate("document.body.scrollHeight")
        print(f"Full page height: {full_height}px")

        # --- 2. Features / mid-page screenshot ---
        # Scroll to roughly 900px down (just past the fold)
        page.evaluate("window.scrollTo(0, 900)")
        page.wait_for_timeout(1000)
        page.screenshot(path=FEATURES_PATH, full_page=False)
        print(f"Saved features screenshot: {FEATURES_PATH}")

        # --- 3. Additional detail section ---
        # Scroll to ~60% of page to capture deeper content
        scroll_target = int(full_height * 0.55)
        page.evaluate(f"window.scrollTo(0, {scroll_target})")
        page.wait_for_timeout(1000)
        page.screenshot(path=DETAIL_PATH, full_page=False)
        print(f"Saved detail screenshot: {DETAIL_PATH}")

        # Print page title for verification
        title = page.title()
        print(f"Page title: {title}")

        browser.close()
        print("Done.")

if __name__ == "__main__":
    capture_screenshots()
