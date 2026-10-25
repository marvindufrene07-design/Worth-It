"""Run this file in PyCharm, then open http://127.0.0.1:8000."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()


if __name__ == '__main__':
    root = Path(__file__).resolve().parent / 'static'
    server = ThreadingHTTPServer(('127.0.0.1', 8000), partial(Handler, directory=str(root)))
    print('Worth It? is ready at http://127.0.0.1:8000 (Ctrl+C to stop)')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
