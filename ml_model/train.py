from ultralytics import YOLO

model = YOLO("runs/segment/train/weights/last.pt")
model.train(data="fruit-and-vegetable-7/data.yaml", epochs=10, imgsz=640, batch=4)
