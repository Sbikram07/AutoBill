import shutil
import uuid
import os

UPLOAD_DIR = "uploads/"

os.makedirs(UPLOAD_DIR, exist_ok=True)


def save_upload_file(upload_file):
    ext = upload_file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)

    return file_path
