"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Variants } from "framer-motion";

import ProductCard from "@/components/product/ProductCard";
import type { SneakerType } from "@/types";

interface ProductGridProps {
  products: SneakerType[];
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.85, rotate: -3 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: i % 2 === 0 ? -1 : 1,
    transition: {
      type: "spring",
      stiffness: 130,
      damping: 16,
      delay: i * 0.15,
    },
  }),
};

const headerVariants: Variants = {
  hidden: { opacity: 0, x: -60, rotate: -2 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
};

const badgeVariants: Variants = {
  hidden: { scale: 0, rotate: -45 },
  visible: {
    scale: 1,
    rotate: -2,
    transition: { type: "spring", stiffness: 300, damping: 12, delay: 0.2 },
  },
};

export default function ProductGrid({ products }: ProductGridProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 border-y-4 border-black overflow-hidden"
      style={{ backgroundColor: "#fef6e4" }}
    >
      {/* Background decorative elements */}
      <motion.div
        animate={isInView ? { rotate: 360 } : {}}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full border-4 border-dashed border-black/10 pointer-events-none"
      />
      <motion.div
        animate={isInView ? { rotate: -360 } : {}}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full border-4 border-dashed border-black/10 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10"
        >
          <div>
            <motion.div variants={badgeVariants}>
              <div
                className="inline-block brutal-border-4 brutal-shadow font-display text-xs uppercase px-3 py-1 mb-5"
                style={{ backgroundColor: "#a3ff00" }}
              >
                🔥 Featured
              </div>
            </motion.div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase leading-[0.9]">
              Heat
              <br />
              <motion.span
                initial={{ x: -30, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
                className="inline-block px-4 -rotate-1"
                style={{ backgroundColor: "#0a0a0a", color: "#fff200" }}
              >
                Drops
              </motion.span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, type: "spring", stiffness: 120, damping: 16 }}
            className="text-base sm:text-lg max-w-md font-medium"
          >
            Curated kicks that hit harder than your morning espresso. Limited
            quantities. Big energy.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-8">
          {products.slice(0, 3).map((product, i) => (
            <motion.div
              key={product.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <ProductCard product={product} index={i} />
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, type: "spring", stiffness: 120, damping: 16 }}
          className="text-center mt-14"
        >
          <motion.a
            href="/shop"
            whileHover={{ x: -4, y: -4, boxShadow: "12px 12px 0 0 #0a0a0a" }}
            whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0 0 #0a0a0a" }}
            className="inline-block brutal-border-4 font-display text-base uppercase px-10 py-4"
            style={{ backgroundColor: "#00d9ff", boxShadow: "8px 8px 0 0 #0a0a0a" }}
          >
            View All Kicks →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
