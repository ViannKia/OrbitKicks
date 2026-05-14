"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import ProductCard from "@/components/product/ProductCard";
import { products } from "@/lib/products";

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 18 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.9, rotate: -2 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: i % 2 === 0 ? -1 : 1,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 16,
      delay: i * 0.12,
    },
  }),
};

export default function DropsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="border-b-4 border-black"
        style={{ backgroundColor: "#ff5c8d" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <h1 className="font-display text-5xl sm:text-6xl uppercase">
              Latest Drops
            </h1>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl"
            >
              🔥
            </motion.span>
          </div>
          <p className="text-base font-medium mt-2">
            Fresh releases. Limited quantities. Don&apos;t sleep.
          </p>
        </div>
      </motion.div>

      {/* Drops grid */}
      <div className="max-w-7xl mx-auto px-6 py-6 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-7">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <ProductCard product={product} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Coming soon notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120, damping: 16 }}
          className="mt-16 text-center"
        >
          <div
            className="inline-block brutal-border-4 brutal-shadow-lg px-8 py-6"
            style={{ backgroundColor: "#fff200" }}
          >
            <p className="font-display text-xl uppercase">
              More drops coming Friday ⚡
            </p>
            <p className="text-sm font-medium mt-1 opacity-70">
              Subscribe to get notified first.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
