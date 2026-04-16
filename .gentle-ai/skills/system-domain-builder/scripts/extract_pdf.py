import sys
import PyPDF2

def extract_pdf_content(file_path):
    try:
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            extracted_text = []
            for page_num in range(len(reader.pages)):
                page = reader.pages[page_num]
                extracted_text.append(page.extract_text())
                
            full_text = "\n".join(extracted_text)
            print(full_text)
    except Exception as e:
        print(f"Error processing PDF: {e}", file=sys.stderr)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_pdf.py <file_path>")
        sys.exit(1)
        
    extract_pdf_content(sys.argv[1])
