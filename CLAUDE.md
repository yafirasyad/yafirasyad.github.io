# Personal site: rules for Claude

Static multi-page personal site for Yafi Rasyad. Plain HTML, CSS and one small JS file.
No framework, no build step, no package.json. Only `docs/` is published
(Cloudflare Pages as primary, GitHub Pages as mirror). See README.md for deploy steps.

## Hard rules (security)

- **No inline JavaScript or CSS.** No `<script>` without `src`, no `<style>` blocks, no `style="..."`,
  no `onclick=` or other `on*=` attributes. The Content-Security-Policy blocks them and the page breaks silently.
  Put styles in `docs/assets/style.css` and behaviour in `docs/assets/main.js`.
- **No third-party resources.** No CDNs, Google Fonts, analytics, embeds or `<iframe>`, and no images
  hot-linked from other domains. Self-host everything under `docs/assets/`.
  If something external is truly needed, it must be added to the CSP in BOTH `docs/_headers` and the
  `<meta http-equiv="Content-Security-Policy">` tag in every HTML file, for that directive only. Ask first.
- **Never read the URL into the page** (`location`, query string, hash) and write it into the DOM.
  `404.html` must keep not echoing the requested path.
- Keep `404.html` on absolute paths (`/assets/...`). All other pages use relative paths.
- Do not commit secrets, `.env` files, client data, or images with EXIF metadata.

## Structure and conventions

- Header, footer and `<head>` are repeated in every HTML file. When changing the menu, social links,
  favicon or CSP, change ALL of: `docs/index.html`, `docs/writing/index.html`,
  `docs/writing/post-template/index.html`, `docs/projects/index.html`, `docs/videos/index.html`,
  `docs/404.html`, and every `docs/writing/<slug>/index.html`.
- Colours and fonts come only from the CSS tokens at the top of `style.css`. Keep light and dark themes working.
- New writeup: copy `docs/writing/post-template/` to `docs/writing/<slug>/`, remove its `noindex` meta,
  add an entry to `docs/writing/index.html`, and add a `<url>` to `docs/sitemap.xml`.
- Inside `<pre><code>`, escape `<` `>` `&`.
- Text in `[square brackets]` is a placeholder the owner still has to fill. Do not invent facts or numbers
  to replace it; ask.

## Tone of the copy

- English, first person, short sentences. Facts and numbers, no self-praise adjectives
  ("expert", "passionate", "highly skilled").
- Say each thing once on the page. Keep the homepage short.
- Tech content is labelled `tech`; the personal channel The Yapeng is `non-tech` and stays out of the
  main menu and the Videos section.

## Before finishing a change

1. Open `docs/` with `python3 -m http.server 8000` and check the page at desktop and ~375px width, light and dark.
2. Check the browser console has no CSP errors.
3. Check every new link and `#anchor` points somewhere that exists.

## Résumé

- Source: `resume/resume.html` (not published). Output: `docs/assets/resume.pdf`, rebuilt with
  `python3 resume/build.py` or Chrome "Save as PDF" (A4).
- Keep it one page, single column, real text (ATS-readable). No phone number or home address.
- Keep titles, dates and bullets consistent with the Work section of `docs/index.html` and with LinkedIn.
