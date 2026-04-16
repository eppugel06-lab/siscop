import sys
import urllib.request
from html.parser import HTMLParser

class DocumentTextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_data = []
        self.skip_tag = False

    def handle_starttag(self, tag, attrs):
        if tag in ['script', 'style', 'header', 'nav', 'footer', 'noscript']:
            self.skip_tag = True

    def handle_endtag(self, tag):
        if tag in ['script', 'style', 'header', 'nav', 'footer', 'noscript']:
            self.skip_tag = False

    def handle_data(self, data):
        if not self.skip_tag:
            cleaned = data.strip()
            if cleaned:
                self.text_data.append(cleaned)

def fetch_content(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=15) as response:
            html = response.read().decode('utf-8', errors='ignore')

        parser = DocumentTextExtractor()
        parser.feed(html)
        print("\n".join(parser.text_data))
    except Exception as e:
        print(f"Error fetching URL: {e}", file=sys.stderr)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python fetch_url.py <url>")
        sys.exit(1)
        
    fetch_content(sys.argv[1])
