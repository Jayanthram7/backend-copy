import sys
import json
import pdfplumber
import pytesseract
from PIL import Image
from io import BytesIO

def extract_text(file_bytes):
    try:
        # Try PDF first
        with pdfplumber.open(BytesIO(file_bytes)) as pdf:
            return "\n".join([page.extract_text() for page in pdf.pages])
    except Exception as pdf_error:
        try:
            # Try image processing
            image = Image.open(BytesIO(file_bytes))
            return pytesseract.image_to_string(image)
        except Exception as img_error:
            raise ValueError(f"Unsupported file format: {str(pdf_error)} | {str(img_error)}")

def parse_data(text):
    # Implement your parsing logic here
    return {
        "companyName": "Sample Corp",
        "buyerName": "John Doe",
        "totalAmount": "1000.00"
    }

if __name__ == "__main__":
    try:
        file_bytes = sys.stdin.buffer.read()
        text = extract_text(file_bytes)
        data = parse_data(text)
        print(json.dumps(data))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)