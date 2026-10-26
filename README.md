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
cd docs
python3 -m http.server 8000
```

## Fonts

Instrument Sans (© The Instrument Sans Project Authors) and JetBrains Mono (© JetBrains), SIL Open Font License 1.1.
