#!/usr/bin/env python3
import http.server
import socketserver
import os
import mimetypes
from urllib.parse import urlparse

PORT = int(os.environ.get('PORT', 8300))
DIRECTORY = "dist"

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Remove leading slash and decode
        if path.startswith('/'):
            path = path[1:]
        
        # If path is empty, serve index.html
        if not path:
            path = 'index.html'
        
        # Full file path
        full_path = os.path.join(DIRECTORY, path)
        
        # Check if file exists
        if os.path.isfile(full_path):
            # Serve the file
            self.path = '/' + path
            return super().do_GET()
        else:
            # For SPA routing, serve index.html for non-existent files
            # unless it's an API call or asset
            if not (path.startswith('api/') or 
                   path.startswith('assets/') or 
                   '.' in os.path.basename(path)):
                self.path = '/index.html'
                return super().do_GET()
            else:
                # File not found
                self.send_error(404)

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("0.0.0.0", PORT), SPAHandler) as httpd:
        print(f"SPA Server running at http://0.0.0.0:{PORT}")
        print("Serving React SPA with client-side routing support")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

