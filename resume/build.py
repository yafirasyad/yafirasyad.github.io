"""Build docs/assets/resume.pdf from resume/resume.html.

Usage (from the repo root):
    pip install playwright && python -m playwright install chromium   # once
    python3 resume/build.py

No Python? Open resume/resume.html in Chrome, Print, "Save as PDF", A4,
and save it as docs/assets/resume.pdf.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parent.parent
src = root / "resume" / "resume.html"
out = root / "docs" / "assets" / "resume.pdf"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(src.as_uri())
    page.wait_for_load_state("networkidle")
    page.pdf(path=str(out), format="A4", prefer_css_page_size=True, print_background=True)
    browser.close()

print(f"wrote {out}")
