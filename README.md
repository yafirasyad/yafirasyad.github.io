# Personal site — Yafi Rasyad

Situs statis beberapa halaman. Tanpa framework, tanpa build step, tanpa resource pihak ketiga (font, foto, ikon semua di-host sendiri).

- **Utama:** `https://[yourdomain].com` di **Cloudflare Pages**, dengan security headers penuh.
- **Mirror:** `https://[username].github.io` di **GitHub Pages**, cadangan permanen yang tidak bisa expire.

Keduanya deploy otomatis dari repo yang sama setiap kali kamu `git push`.

```
repo: [username]/[username].github.io
├── README.md                     ← panduan ini (tidak ikut di-publish)
├── CLAUDE.md                     ← aturan situs untuk Claude di VS Code (tidak ikut di-publish)
├── resume/                       ← sumber résumé (tidak ikut di-publish)
│   ├── resume.html               ← edit di sini
│   └── build.py                  ← buat ulang docs/assets/resume.pdf
├── .gitignore
└── docs/                         ← HANYA folder ini yang di-publish
    ├── index.html                ← homepage
    ├── writing/index.html        ← /writing/   semua tulisan, per tahun
    ├── writing/post-template/    ← copy folder ini untuk tiap tulisan baru
    ├── projects/index.html       ← /projects/  semua proyek
    ├── videos/index.html         ← /videos/    semua video & talk
    ├── 404.html                  ← halaman tidak ditemukan
    ├── _headers                  ← security headers (dibaca Cloudflare)
    ├── robots.txt, sitemap.xml   ← untuk mesin pencari
    ├── .well-known/security.txt  ← kontak pelaporan celah keamanan (RFC 9116)
    ├── .nojekyll                 ← supaya GitHub Pages menyajikan file apa adanya
    └── assets/
        ├── style.css, main.js
        ├── fonts/                ← Instrument Sans + JetBrains Mono (SIL OFL)
        ├── thumbs/               ← thumbnail Writing, Projects, Videos
        ├── avatar.jpg            ← foto profil 320×320, tanpa metadata
        ├── og.png                ← gambar preview saat link dibagikan (1200×630)
        ├── favicon.svg, favicon-32.png, apple-touch-icon.png
        └── resume.pdf            ← dibuat dari resume/resume.html
```

---

## A. Checklist sebelum publish

1. **Ganti semua placeholder.** Cari yang tersisa:
   ```bash
   grep -rn "\[yourdomain\]\|\[username\]\|\[tech-channel\]\|\[personal-channel\]" docs
   grep -rn "\[[A-Za-z]" docs --include=*.html
   ```
   Placeholder yang tersisa:
   - `[yourdomain]` → domainmu, misalnya `yafirasyad` (tanpa `.com`)
   - `[username]` → username Medium
   - Link Difapgrad, iLat, Smartstopper di `projects/index.html`
   - `[tech-channel]` → handle YouTube Yafi Rasyad (tanpa `@`)
   - `[personal-channel]` → handle YouTube The Yapeng (tanpa `@`)
2. **Angka dalam `[kurung]` di section Work itu contoh.** Ganti dengan angka asli yang bisa kamu jelaskan di interview, atau hapus klausanya.
3. **Hapus entri "Example:"** (contoh writeup ADCS) atau ganti dengan tulisan asli.
4. **Link `[url]` yang belum ada:** isi atau hapus entrinya. Link kosong di situs yang sudah live terlihat buruk.
5. **Résumé:** `docs/assets/resume.pdf` sudah ada dan ditautkan. Kalau mengubah isinya, edit `resume/resume.html`, lalu buat ulang PDF-nya:
   - **Paling mudah:** buka `resume/resume.html` di Chrome → **Print** → **Save as PDF**, kertas A4 → simpan sebagai `docs/assets/resume.pdf`.
   - **Atau:** `python3 resume/build.py` (sekali saja: `pip install playwright && python -m playwright install chromium`).
   - Tetap satu halaman, tanpa nomor HP atau alamat rumah. Isinya harus sama dengan LinkedIn dan section Work di website.
6. **Gambar baru apa pun**, strip metadata dulu:
   ```bash
   exiftool -all= docs/assets/nama-gambar.jpg
   ```
7. **Cek di laptop:**
   ```bash
   cd docs && python3 -m http.server 8000
   ```
   Buka `http://localhost:8000`, cek juga di lebar HP (DevTools → toggle device toolbar, 375px).

---

## B. Amankan akun (sekali saja, lakukan duluan)

Situs statis hampir tidak punya celah. Yang biasanya dibobol adalah **akun**.

1. **Email utama:** pasang passkey atau security key. Cek email dan nomor pemulihan masih aktif.
2. **GitHub:** Settings → Password and authentication → tambah **passkey**. Simpan recovery codes secara offline.
3. **GitHub successor:** Settings → Account → Successor settings → pilih orang yang kamu percaya.
4. **Cloudflare** (setelah daftar di langkah E): My Profile → Authentication → security key atau authenticator app. **Jangan SMS.**

---

## C. Buat repo dan push

1. Di GitHub, buat repo **public** bernama persis **`[username].github.io`**.
2. Dari folder ini (folder yang berisi README dan `docs/`):
   ```bash
   git init
   git add .
   git status            # cek tidak ada file sensitif
   git commit -m "Initial site"
   git branch -M main
   git remote add origin git@github.com:[username]/[username].github.io.git
   git push -u origin main
   ```

---

## D. GitHub Pages (mirror, gratis, permanen)

1. Repo → **Settings** → bagian *Code and automation* → **Pages**.
2. **Build and deployment → Source:** *Deploy from a branch*.
3. **Branch:** `main`, folder **`/docs`** → **Save**.
4. Tunggu 1–2 menit, lalu buka `https://[username].github.io`.

> **Jangan isi kolom "Custom domain" di sini.** Kalau diisi, `github.io` akan redirect ke `.com`. Kalau suatu hari `.com` expire, mirror ikut mati.

Kalau pilihan `/docs` tidak muncul, pastikan folder `docs/` sudah ter-push ke branch `main`.

---

## E. Beli domain di Cloudflare Registrar

1. Daftar di **dash.cloudflare.com**, lalu langsung amankan akunnya (langkah B.4).
2. Menu **Domain Registration → Register Domains** → cari `[yourdomain].com` → beli.
   - Cloudflare menjual di harga modal, tanpa markup perpanjangan.
   - Pertimbangkan bayar **beberapa tahun sekaligus**.
   - Pastikan **Auto-renew** menyala dan kartu pembayaran berlaku lama.
3. Di halaman domain, cek bahwa ini aktif (biasanya default):
   - **Registrar / transfer lock**
   - **WHOIS privacy** (redaksi data kontak)
4. **DNS → Settings → DNSSEC → Enable.**

---

## F. Cloudflare Pages (utama)

1. Dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
   - Nama menu kadang berubah. Kalau Cloudflare menawarkan *Workers* duluan, cari tab atau tombol **Pages**. Alurnya tetap: hubungkan repo GitHub.
2. Saat GitHub minta izin, pilih **Only select repositories** → `[username].github.io` saja.
3. Build settings:
   - Framework preset: **None**
   - Build command: *(kosongkan)*
   - Build output directory: **`docs`**
4. **Save and Deploy.** Kamu dapat alamat `https://[project].pages.dev`.
5. Project → **Custom domains** → **Set up a custom domain**:
   - tambah `[yourdomain].com`
   - tambah `www.[yourdomain].com`

   Karena domainnya juga di Cloudflare, record DNS dan sertifikat HTTPS dibuat otomatis.
6. **Arahkan `www` ke domain utama:** halaman domain → **Rules** → buat **Redirect Rule** (atau pakai template *Redirect from WWW to root* kalau tersedia):
   - When: Hostname equals `www.[yourdomain].com`
   - Then: Dynamic redirect ke `concat("https://[yourdomain].com", http.request.uri.path)`, status **301**, preserve query string.
7. **SSL/TLS → Edge Certificates:** nyalakan **Always Use HTTPS**.

---

## G. Verifikasi

```bash
curl -sI https://[yourdomain].com | grep -iE 'content-security|strict-transport|x-frame|x-content|referrer|permissions|cross-origin'
curl -s  https://[yourdomain].com/.well-known/security.txt
curl -sI https://[yourdomain].com/halaman-yang-tidak-ada | head -1     # harus 404
```

- **securityheaders.com** → masukkan domainmu. Target **A** atau **A+**.
- Buka situs → DevTools → **Console**: tidak boleh ada error CSP.
- Tempel link situs di chat LinkedIn atau WhatsApp: preview harus menampilkan `og.png`.
- Buka `https://[username].github.io`: mirror harus jalan.

---

## H. Update rutin

```bash
git add docs
git commit -m "Update: [apa yang berubah]"
git push
```

Cloudflare Pages dan GitHub Pages deploy otomatis dalam 1–2 menit.

**Setahun sekali:** perbarui `Expires` di `docs/.well-known/security.txt` (maksimal 1 tahun ke depan), dan `lastmod` di `sitemap.xml`.

**Setelah update besar:** simpan ke **web.archive.org → Save Page Now** untuk `[yourdomain].com` dan `[username].github.io`.

---

## I. Isi konten

### Tulisan baru

1. Copy `docs/writing/post-template/` → `docs/writing/<slug>/` (huruf kecil + tanda hubung, misalnya `adcs-esc8-to-domain-admin`).
2. Isi tulisannya, lalu **hapus** baris `<meta name="robots" content="noindex">` di file baru itu.
3. Tambah entrinya di `docs/writing/index.html`, di homepage kalau termasuk yang terbaik, dan satu `<url>` di `sitemap.xml`.
4. Di dalam `<pre><code>`, tulis `<` `>` `&` sebagai `&lt;` `&gt;` `&amp;`.
5. **Cross-post ke Medium:** Medium → **Import a story** → tempel URL tulisanmu. Medium memasang canonical ke situsmu, jadi Google menganggap situsmu sumber aslinya. Tempel balik URL Medium-nya di baris "Also on Medium ↗". Jangan masukkan ke program member-only (paywall).

Struktur writeup security: Summary → Background → The bug → Root cause → Impact → Fix → Timeline → References.

**Temuan dari engagement klien:** sanitasi total (domain, IP, nama, token, screenshot), dan pastikan diizinkan kontrak/NDA dan kantor. Lab PEN-200/OSCP dan mesin HTB yang masih aktif **tidak boleh** dibahas; mesin HTB yang sudah *retired* boleh.

### Thumbnail

- 1280×720 (16:9), `.jpg` atau `.webp`, di bawah ~150 KB, simpan di `docs/assets/thumbs/`.
- Thumbnail video YouTube-mu sendiri:
  ```bash
  curl -o docs/assets/thumbs/[id].jpg https://i.ytimg.com/vi/[id]/maxresdefault.jpg
  ```
  Kalau hasilnya gambar abu kecil, ganti `maxresdefault` dengan `hqdefault`.
- Gambar dari domain lain **tidak akan tampil** karena CSP. Itu disengaja: tidak ada tracking pihak ketiga.
- Setelah semua diganti, `placeholder.svg` boleh dihapus.

### Menu, footer, dan dua channel YouTube

- Header dan footer ditulis ulang di tiap file HTML (tidak ada build step). Kalau mengubah menu atau link sosial, ubah di **semua** file: `index.html`, `writing/index.html`, `projects/index.html`, `videos/index.html`, `404.html`, dan setiap tulisan.
- Label `tech` (biru) = Yafi Rasyad, `non-tech` (hangat) = The Yapeng. Channel non-tech hanya muncul di dropdown YouTube, section *Off the clock*, dan footer, tidak di section Videos.

### Sertifikasi

Setelah lulus OSCP (atau lainnya), tambahkan barisnya di section Awards dan ganti judulnya jadi "Certifications & awards". Contoh baris ada di komentar HTML section itu.

---

## J. Keamanan yang sudah terpasang

| Lapisan | Di mana | Fungsinya |
|---|---|---|
| Content-Security-Policy (header) | `_headers` | Hanya script, style, font, dan gambar dari situs sendiri yang boleh jalan. Inline script dan embed luar diblokir. |
| CSP (meta tag) | `<head>` tiap halaman | Perlindungan yang sama untuk mirror GitHub Pages, yang tidak membaca `_headers` |
| `frame-ancestors 'none'` + `X-Frame-Options` | `_headers` | Situsmu tidak bisa di-embed di situs lain (anti clickjacking) |
| HSTS | `_headers` | Browser selalu memakai HTTPS |
| `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP, CORP | `_headers` | Pengerasan standar. Kamera, mikrofon, dan lokasi dimatikan |
| `noindex` untuk `*.pages.dev` dan template | `_headers`, `robots.txt` | Google tidak mengindeks duplikat atau template |
| 404 tanpa memantulkan URL | `404.html` | Menghindari XSS lewat URL |
| `security.txt` | `.well-known/` | Peneliti tahu ke mana harus melapor |
| Tanpa resource pihak ketiga | semua | Tidak ada CDN, font, atau tracker luar yang bisa disusupi |

Kalau nanti perlu menambah sesuatu dari domain luar (misalnya embed), tambahkan domainnya ke CSP di `_headers` **dan** di meta tag, hanya untuk directive yang perlu.

**HSTS preload:** jangan daftarkan ke hstspreload.org kecuali yakin domain dan semua subdomainnya akan HTTPS selamanya. Susah dibatalkan.

---

## K. Kalau pindah atau berhenti

- **Pindah hosting:** pasang domain di hosting baru dulu, pindahkan DNS, baru hapus project lama.
- **Berhenti pakai domain:** hapus custom domain di Cloudflare Pages dan record DNS-nya **dulu**, baru biarkan domain expire. Record DNS yang menunjuk ke layanan yang sudah dihapus bisa diklaim orang lain (subdomain takeover).

---

## Lisensi font

Instrument Sans (© The Instrument Sans Project Authors) dan JetBrains Mono (© JetBrains), SIL Open Font License 1.1.
