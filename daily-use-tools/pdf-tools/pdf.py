from flask import Flask, request, send_file, jsonify
from PyPDF2 import PdfReader, PdfWriter
from pdf2image import convert_from_path
import os
import io
from docx import Document
from PIL import Image
import tempfile
import zipfile

app = Flask(__name__)

# Helper to save uploaded file temporarily
def save_temp_file(file):
    temp_dir = tempfile.mkdtemp()
    file_path = os.path.join(temp_dir, file.filename)
    file.save(file_path)
    return file_path, temp_dir

# 1. Merge PDFs
@app.route('/merge', methods=['POST'])
def merge_pdfs():
    files = request.files.getlist('pdfs')
    pdf_writer = PdfWriter()

    for file in files:
        file_path, temp_dir = save_temp_file(file)
        pdf_reader = PdfReader(file_path)
        for page in pdf_reader.pages:
            pdf_writer.add_page(page)
        # Clean up
        try:
            os.remove(file_path)
            os.rmdir(temp_dir)
        except:
            pass

    output_stream = io.BytesIO()
    pdf_writer.write(output_stream)
    output_stream.seek(0)

    return send_file(output_stream, download_name='merged.pdf', as_attachment=True)

# 2. Split PDF (split into individual pages as separate PDFs zipped)
@app.route('/split', methods=['POST'])
def split_pdf():
    file = request.files['pdf']
    file_path, temp_dir = save_temp_file(file)

    pdf_reader = PdfReader(file_path)
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, 'w') as zip_file:
        for i, page in enumerate(pdf_reader.pages):
            pdf_writer = PdfWriter()
            pdf_writer.add_page(page)
            page_stream = io.BytesIO()
            pdf_writer.write(page_stream)
            page_stream.seek(0)
            zip_file.writestr(f'page_{i+1}.pdf', page_stream.read())

    # Clean up
    try:
        os.remove(file_path)
        os.rmdir(temp_dir)
    except:
        pass

    zip_buffer.seek(0)
    return send_file(zip_buffer, download_name='split_pages.zip', as_attachment=True)

# 3. PDF to Word (extract text and put in a Word doc)
@app.route('/pdf-to-word', methods=['POST'])
def pdf_to_word():
    file = request.files['pdf']
    file_path, temp_dir = save_temp_file(file)

    pdf_reader = PdfReader(file_path)
    doc = Document()
    for page in pdf_reader.pages:
        text = page.extract_text()
        if text:
            doc.add_paragraph(text)

    output_stream = io.BytesIO()
    doc.save(output_stream)
    output_stream.seek(0)

    # Clean up
    try:
        os.remove(file_path)
        os.rmdir(temp_dir)
    except:
        pass

    return send_file(output_stream, download_name='converted.docx', as_attachment=True)

# 3b. PDF to Images (convert pages to PNG images zipped)
@app.route('/pdf-to-images', methods=['POST'])
def pdf_to_images():
    file = request.files['pdf']
    file_path, temp_dir = save_temp_file(file)

    images = convert_from_path(file_path)
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, 'w') as zip_file:
        for i, img in enumerate(images):
            img_byte_arr = io.BytesIO()
            img.save(img_byte_arr, format='PNG')
            img_byte_arr.seek(0)
            zip_file.writestr(f'page_{i+1}.png', img_byte_arr.read())

    # Clean up
    try:
        os.remove(file_path)
        os.rmdir(temp_dir)
    except:
        pass

    zip_buffer.seek(0)
    return send_file(zip_buffer, download_name='pages_images.zip', as_attachment=True)

# 4. Compress PDF (very basic by rewriting PDF)
@app.route('/compress', methods=['POST'])
def compress_pdf():
    file = request.files['pdf']
    file_path, temp_dir = save_temp_file(file)

    pdf_reader = PdfReader(file_path)
    pdf_writer = PdfWriter()

    for page in pdf_reader.pages:
        pdf_writer.add_page(page)

    output_stream = io.BytesIO()
    pdf_writer.write(output_stream)
    output_stream.seek(0)

    # Clean up
    try:
        os.remove(file_path)
        os.rmdir(temp_dir)
    except:
        pass

    return send_file(output_stream, download_name='compressed.pdf', as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
