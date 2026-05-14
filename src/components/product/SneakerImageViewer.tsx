"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface SneakerImageViewerProps {
  images: string[];
  name: string;
  accentColor?: string;
}

export default function SneakerImageViewer({
  images,
  name,
  accentColor = "#ff5c8d",
}: SneakerImageViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Header strip */}
      <div className="flex items-center justify-between">
        <div
          className="brutal-border-4 brutal-shadow font-display text-xs uppercase px-3 py-1 -rotate-2"
          style={{ backgroundColor: "#fff200" }}
        >
          📷 Product Gallery
        </div>
        <div className="flex gap-2 text-xs font-bold uppercase tracking-widest">
          <span className="opacity-60">Scroll to zoom</span>
          <span>·</span>
          <span className="opacity-60">Double-click to reset</span>
        </div>
      </div>

      {/* Main image viewer with zoom */}
      <div
        className="relative brutal-border-4 brutal-shadow-lg overflow-hidden"
        style={{
          backgroundColor: accentColor,
          height: "380px",
        }}
      >
        {imgError || !activeImage ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <span className="text-8xl">👟</span>
            <p className="font-display uppercase text-sm">Image unavailable</p>
          </div>
        ) : (
          <TransformWrapper
            key={activeIndex}
            initialScale={1.3}
            minScale={1}
            maxScale={4}
            centerOnInit
            doubleClick={{ mode: "reset" }}
            wheel={{ step: 0.1 }}
          >
            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%" }}
              contentStyle={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="relative w-full h-[380px]">
                <Image
                  src={activeImage}
                  alt={`${name} - view ${activeIndex + 1}`}
                  fill
                  className="object-contain p-0"
                  style={{ objectPosition: "center center" }}
                  onError={() => setImgError(true)}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </TransformComponent>
          </TransformWrapper>
        )}

        {/* Image counter badge */}
        <div
          className="absolute bottom-3 left-3 z-20 brutal-border font-display text-xs px-2 py-1"
          style={{ backgroundColor: "#fef6e4" }}
        >
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail gallery */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((img, i) => (
          <motion.button
            key={i}
            onClick={() => {
              setActiveIndex(i);
              setImgError(false);
            }}
            whileHover={{ y: -3, boxShadow: "6px 6px 0 0 #0a0a0a" }}
            whileTap={{ scale: 0.95 }}
            className="relative brutal-border-4 overflow-hidden aspect-square"
            style={{
              backgroundColor: i === activeIndex ? accentColor : "#fef6e4",
              boxShadow:
                i === activeIndex
                  ? "4px 4px 0 0 #0a0a0a"
                  : "3px 3px 0 0 #0a0a0a",
              opacity: i === activeIndex ? 1 : 0.7,
            }}
          >
            <Image
              src={img}
              alt={`${name} - thumbnail ${i + 1}`}
              fill
              className="object-contain p-1"
              sizes="100px"
            />
          </motion.button>
        ))}
      </div>

      {/* Hint */}
      <p className="text-center text-xs uppercase tracking-widest font-bold opacity-60">
        Click thumbnails to switch · Scroll on image to zoom
      </p>
    </div>
  );
}
