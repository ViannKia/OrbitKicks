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
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 16,
      delay: i * 0.1,
    },
  }),
};

export default function ShopPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="border-b-4 border-black"
        style={{ backgroundColor: "#fff200" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="font-display text-5xl sm:text-6xl uppercase">
            All Kicks
          </h1>
          <p className="text-base font-medium mt-2">
            Every pair we carry. No filler, just heat.
          </p>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-6 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
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
      </div>
    </div>
  );
}
