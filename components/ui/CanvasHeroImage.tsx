"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CanvasHeroImageProps {
  className?: string;
}

export function CanvasHeroImage({ className }: CanvasHeroImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = "/hero.jpeg";
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size matching the image dimensions
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // Draw the image
      ctx.drawImage(img, 0, 0);

      // Get pixel data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Make black pixels transparent.
      // Since it is a JPEG, pure black is RGB(0,0,0) but we allow a threshold for compression artifacts.
      const threshold = 30;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // If the pixel is very dark (close to black)
        if (r < threshold && g < threshold && b < threshold) {
          data[i + 3] = 0; // Set Alpha to 0 (transparent)
        }
      }

      // Put the modified pixel data back
      ctx.putImageData(imageData, 0, 0);
      setLoading(false);
    };
  }, []);

  return (
    <div className={cn("relative w-full h-full flex items-center justify-center", className)}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={cn(
          "w-full h-auto max-w-full transition-opacity duration-500",
          loading ? "opacity-0" : "opacity-100"
        )}
        style={{ display: "block" }}
      />
    </div>
  );
}
