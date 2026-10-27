"""Serve docs/ locally the way GitHub Pages does.

- No directory listings: folders without index.html return 404, like on github.io.
- Missing paths get docs/404.html with status 404.
- Cache-Control: no-store, so the browser always shows the latest files.
- Listens on 127.0.0.1 only, so other devices on the network cannot reach it.

Usage:
    python tools/serve.py          # http://127.0.0.1:8000
    python tools/serve.py 8080     # another port
"""
import http.server
import os
import sys
from functools import partial

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "docs"))
NOT_FOUND_PAGE = os.path.join(ROOT, "404.html")


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def list_directory(self, path):
        self.send_error(404)
        return None

    def send_error(self, code, message=None, explain=None):
        if code != 404:
            return super().send_error(code, message, explain)
        with open(NOT_FOUND_PAGE, "rb") as f:
            body = f.read()
        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    handler = partial(Handler, directory=ROOT)
    with http.server.ThreadingHTTPServer(("127.0.0.1", port), handler) as server:
        print(f"Serving {ROOT} at http://127.0.0.1:{port}  (Ctrl+C to stop)")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
