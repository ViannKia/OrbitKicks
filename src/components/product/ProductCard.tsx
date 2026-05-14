"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { formatPrice } from "@/lib/utils";
import type { SneakerType } from "@/types";

interface ProductCardProps {
  product: SneakerType;
  /** index used to pick a rotating accent color */
  index?: number;
}

const ACCENTS = ["#ff5c8d", "#fff200", "#00d9ff", "#a3ff00", "#ff7a00"];

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const accent = ACCENTS[index % ACCENTS.length];
  const tilt = index % 2 === 0 ? -1.5 : 1.5;

  return (
    <motion.div
      initial={{ rotate: tilt }}
      whileHover={{
        rotate: 0,
        x: -4,
        y: -4,
        boxShadow: "14px 14px 0 0 #0a0a0a",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="brutal-border-4 brutal-shadow-lg overflow-hidden"
      style={{ backgroundColor: "#fef6e4" }}
    >
      {/* Product image area */}
      <div
        className="relative w-full overflow-hidden border-b-4 border-black flex items-center justify-center"
        style={{ aspectRatio: "1/1", backgroundColor: accent }}
      >
        {/* Sticker/badge */}
        <div
          className="absolute top-3 left-3 z-10 brutal-border font-display text-xs uppercase px-2 py-1"
          style={{ backgroundColor: "#0a0a0a", color: "#fff200" }}
        >
          #{String(index + 1).padStart(2, "0")}
        </div>
        <div
          className="absolute top-3 right-3 z-10 brutal-border rounded-full w-10 h-10 flex items-center justify-center font-display"
          style={{ backgroundColor: "#fef6e4" }}
        >
          ★
        </div>

        {imgError || !product.imageUrl ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-6xl">👟</span>
          </div>
        ) : (
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.08, rotate: -2 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain p-4"
              style={{ objectPosition: "center center" }}
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5 space-y-3">
        <h3 className="font-display text-lg uppercase leading-tight line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-2xl">{formatPrice(product.price)}</p>
          <span className="text-xs uppercase tracking-widest text-black/60 font-bold">
            In stock
          </span>
        </div>

        <Link href={`/product/${product.slug}`} className="block">
          <motion.div
            whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0 0 #0a0a0a" }}
            whileTap={{ x: 3, y: 3, boxShadow: "0px 0px 0 0 #0a0a0a" }}
            className="brutal-border-4 brutal-shadow font-display text-sm uppercase text-center py-3"
            style={{ backgroundColor: "#0a0a0a", color: "#fef6e4" }}
          >
            Quick View →
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}
