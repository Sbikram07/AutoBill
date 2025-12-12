from fastapi import FastAPI,UploadFile,File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import os

from services.inference_service import run_inference
from utils.file_utils import save_upload_file

app = FastAPI(title="AutoBill Model Server")

model = YOLO("model/weights/best.pt")

origins = [
    "*",
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET, POST"],
    allow_headers=["*"],
)

# model = YOLO("runs/segment/train/weights/best.pt")

@app.get("/")
async def home():
    return {"message": "model loaded successfully"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_path = save_upload_file(file)

    try:
        # Run model inference
        results = run_inference(model, image_path)

    finally:
        # Always delete file even if inference errors
        if os.path.exists(image_path):
            os.remove(image_path)
            print(f"Deleted temp file: {image_path}")
    return JSONResponse(content=results)
