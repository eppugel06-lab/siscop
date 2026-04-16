import sys
import json
from PIL import Image

def analyze(image_path):
    print("Warning: Static analysis only. For full OCR, link an AI model.", file=sys.stderr)
    try:
        img = Image.open(image_path)
        meta = {
            "format": img.format,
            "size": img.size,
            "mode": img.mode
        }
        print(json.dumps(meta, indent=2))
        # Future: Insert Tesseract OCR logic or AI Vision API call here.
    except Exception as e:
        print(f"Error analyzing image: {e}", file=sys.stderr)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python analyze_image.py <image_path>")
        sys.exit(1)
        
    analyze(sys.argv[1])
