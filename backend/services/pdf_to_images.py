import pymupdf
import os

def pdf_to_images(pdf_path):
    doc = pymupdf.open(pdf_path)

    output_dir = "uploads/pages"
    os.makedirs(output_dir, exist_ok=True)

    image_paths = []

    for page_num in range(len(doc)):
        page = doc[page_num]

        pix = page.get_pixmap(matrix=pymupdf.Matrix(2, 2))

        image_path = f"{output_dir}/page_{page_num + 1}.png"

        pix.save(image_path)

        image_paths.append(image_path)

    return image_paths