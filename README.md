# yafirasyad.github.io

Source of my personal site: **https://yafirasyad.github.io**

Static HTML, CSS and one small JavaScript file. No framework, no build step, no third-party requests.

## Structure

```
docs/                  served by GitHub Pages
├── index.html         home
├── writing/           articles and research
├── projects/          projects
├── videos/            videos and talks
├── awards/            one page per award
├── 404.html
└── assets/            CSS, JS, self-hosted fonts and images
resume/                source of docs/assets/resume.pdf
tools/serve.py         local server that behaves like GitHub Pages
```

## Security

- **Content-Security-Policy** in every page: only same-origin scripts, styles, fonts and images.
  No inline script or style, no forms, and Trusted Types enforced.
- **No third-party resources.** Fonts, images and icons are self-hosted. No analytics, CDNs or embeds.
- **Anti-framing** in `main.js`, because GitHub Pages cannot send `frame-ancestors` or `X-Frame-Options`.
- **The 404 page does not reflect the requested URL.**
- `docs/_headers` holds the full header set for hosts that support it (Cloudflare Pages, Netlify).

Found a security issue? See [`/.well-known/security.txt`](https://yafirasyad.github.io/.well-known/security.txt).

## Run locally

```bash
python tools/serve.py
```

Then open http://127.0.0.1:8000. Like GitHub Pages, it shows no directory listings and serves
`404.html` for missing paths. It also disables caching and only listens on 127.0.0.1.

## Rebuild the résumé

Edit `resume/resume.html`, then print it to PDF with headless Chrome (A4, one page):

```bash
chrome --headless=new --no-pdf-header-footer \
  --print-to-pdf=docs/assets/resume.pdf resume/resume.html
```

Or run `python3 resume/build.py` (needs Playwright).

## Fonts

Instrument Sans (© The Instrument Sans Project Authors) and JetBrains Mono (© JetBrains), SIL Open Font License 1.1.
