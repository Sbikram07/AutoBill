from ultralytics import YOLO
import numpy as np


def run_inference(model, image_path):
    results = model(image_path, conf=0.5,iou=0.25)
    res = results[0]

    detections = []

    has_masks = hasattr(res, "masks") and res.masks is not None

    for i, box in enumerate(res.boxes):
        cls_id = int(box.cls[0])
        conf = float(box.conf[0])
        xmin, ymin, xmax, ymax = box.xyxy[0].tolist()

        detection = {
            "class_id": cls_id,
            "class_name": res.names[cls_id],
            "confidence": conf,
            "bbox": [xmin, ymin, xmax, ymax],
        }

        # -------------------------
        # SEGMENTATION MASK OUTPUT
        # -------------------------
        if has_masks:
            # mask polygon points
            polygons = res.masks.xy[i].tolist()

            detection["segmentation"] = {"polygons": polygons}  # list of x,y points

        detections.append(detection)

    # Count objects by class
    class_counts = {}
    for d in detections:
        cname = d["class_name"]
        class_counts[cname] = class_counts.get(cname, 0) + 1

    return {
        # "items": detections,
        "counts": class_counts,
        "total_objects": len(detections),
        "segmentation_enabled": has_masks,
    }
