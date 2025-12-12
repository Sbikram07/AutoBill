import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useBill } from "@/context/billContext";

const Display = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const fileInputRef = useRef();

  const {
    detectBasket,
    finished,
    setFinished,
    downloadTriggered,
    setDownloadTriggered,
  } = useBill();
  const captureDisabled = finished && !downloadTriggered;
  const uploadDisabled = finished && !downloadTriggered;

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (error) {
      console.error("Camera start error:", error);
      alert("Unable to access camera. Check permissions.");
    }
  };

  useEffect(() => {
    startCamera();
  }, []);

  //  Capture frame → convert to image → send to detect-basket
  const captureFrame = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], "capture.png", { type: "image/png" });
      await detectBasket(file);
    });
  };

  //  Send image to backend detect-basket

  //  Handle file upload
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await detectBasket(file);
  };

  return (
    <div className="w-full h-130 rounded-xl border border-white/20 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 shadow-xl overflow-hidden ">
      {/* LIVE CAMERA PREVIEW */}
      <video
        ref={videoRef}
        className="w-full h-[86%] object-cover"
        playsInline
        muted
      />

      {/* Hidden Canvas For Capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Buttons Area */}
      <div className="w-full flex justify-between items-center px-5 py-4 bg-slate-900/70 backdrop-blur-sm border-t border-white/10">
        {/* LEFT BUTTONS */}
        <div className="flex gap-3">
          {/* CAPTURE BUTTON */}
          <Button
            disabled={captureDisabled}
            onClick={captureFrame}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
          >
            Capture
          </Button>

          {/* UPLOAD FILE INPUT */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* UPLOAD BUTTON */}
          <Button
            disabled={uploadDisabled}
            onClick={() => fileInputRef.current?.click()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
          >
            <img
              src="/upload-solid-full.svg"
              alt="upload"
              className="w-5 h-5"
            />
          </Button>
        </div>

        {/* RIGHT BUTTON */}
        <Button
          onClick={() => {
            setFinished(true);
            setDownloadTriggered(false);
          }}
          className="bg-orange-600 hover:bg-orange-700 text-white shadow-md"
        >
          Finish
        </Button>
      </div>
    </div>
  );
};

export default Display;
