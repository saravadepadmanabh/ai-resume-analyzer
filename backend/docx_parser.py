from io import BytesIO
from docx import Document


def extract_text_from_docx(file_bytes):

    document = Document(
        BytesIO(file_bytes)
    )

    extracted_text = ""

    for paragraph in document.paragraphs:
        extracted_text += paragraph.text + "\n"

    return extracted_text