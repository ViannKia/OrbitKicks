"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import SneakerImageViewer from "@/components/product/SneakerImageViewer";
import SizeSelector from "@/components/product/SizeSelector";
import CartButton from "@/components/product/CartButton";
import type { SneakerType } from "@/types";

interface ProductDetailClientProps {
  product: SneakerType;
  formattedPrice: string;
}

const viewerVariants: Variants = {
  hidden: { opacity: 0, x: -80, rotate: -4, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 16,
      delay: 0.1,
    },
  },
};

const sidebarContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const sidebarItemVariants: Variants = {
  hidden: { opacity: 0, x: 50, rotate: 2 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 16,
    },
  },
};

const breadcrumbVariants: Variants = {
  hidden: { opacity: 0, y: -30, scaleX: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scaleX: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 80, rotate: 1, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 16, delay: 0.6 },
  },
};

const ACCENT_BY_INDEX = ["#ff5c8d", "#00d9ff", "#a3ff00", "#ff7a00", "#fff200"];

export default function ProductDetailClient({
  product,
  formattedPrice,
}: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "shipping">("description");

  const accentIndex =
    product.slug.split("").reduce((sum, c) => sum + c.charCodeAt(0), 0) %
    ACCENT_BY_INDEX.length;
  const accent = ACCENT_BY_INDEX[accentIndex];

  return (
    <div className="min-h-screen pb-20">
      {/* Breadcrumb strip */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={breadcrumbVariants}
        className="border-b-4 border-black"
        style={{ backgroundColor: "#fff200" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
          <Link href="/" className="hover:underline underline-offset-4">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:underline underline-offset-4">
            Shop
          </Link>
          <span>/</span>
          <span className="opacity-60 truncate">{product.name}</span>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 lg:items-start">
          {/* Image viewer — dramatic entrance from left */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={viewerVariants}
            className="lg:col-span-7"
          >
            <SneakerImageViewer
              images={product.images}
              name={product.name}
              accentColor={accent}
            />
          </motion.div>

          {/* Sidebar — staggered items from right, same height as viewer */}
          <motion.aside
            initial="hidden"
            animate="visible"
            variants={sidebarContainerVariants}
            className="lg:col-span-5 flex flex-col gap-4 lg:self-stretch"
          >
            <div className="flex flex-col gap-4">
            {/* Tag */}
            <motion.div variants={sidebarItemVariants}>
              <motion.div
                whileHover={{ rotate: 0, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
                className="inline-block brutal-border-4 brutal-shadow font-display text-xs uppercase px-3 py-1 -rotate-2"
                style={{ backgroundColor: "#a3ff00" }}
              >
                🔥 Limited Edition
              </motion.div>
            </motion.div>

            {/* Product name with reveal */}
            <motion.h1
              variants={sidebarItemVariants}
              className="font-display text-3xl sm:text-4xl uppercase leading-[0.9]"
            >
              {product.name}
            </motion.h1>

            {/* Price card */}
            <motion.div
              variants={sidebarItemVariants}
              whileHover={{ x: -4, y: -4, boxShadow: "12px 12px 0 0 #fff200" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="brutal-border-4 p-4 flex items-center justify-between"
              style={{
                backgroundColor: "#0a0a0a",
                color: "#fff200",
                boxShadow: "8px 8px 0 0 #fff200",
              }}
            >
              <div>
                <div className="text-xs uppercase tracking-widest opacity-60 font-bold">
                  Price
                </div>
                <div className="font-display text-3xl">{formattedPrice}</div>
              </div>
              <motion.div
                animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }}
                className="brutal-border font-display text-xs uppercase px-2 py-1 rotate-3"
                style={{ backgroundColor: "#ff5c8d", color: "#0a0a0a" }}
              >
                Hot 🔥
              </motion.div>
            </motion.div>

            {/* Size selector */}
            <motion.div variants={sidebarItemVariants}>
              <SizeSelector
                sizes={product.sizes}
                selected={selectedSize}
                onSelect={setSelectedSize}
              />
            </motion.div>

            {/* Cart button */}
            <motion.div variants={sidebarItemVariants}>
              <CartButton
                productName={product.name}
                disabled={selectedSize === null}
              />
              {selectedSize === null && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-xs uppercase tracking-widest text-center mt-3 font-bold opacity-60"
                >
                  ☝ Pick a size first
                </motion.p>
              )}
            </motion.div>

            {/* Quick stats grid */}
            <motion.div
              variants={sidebarItemVariants}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { label: "Free Ship", value: "$50+", bg: "#00d9ff" },
                { label: "Returns", value: "30 Days", bg: "#ff5c8d" },
                { label: "Authentic", value: "100%", bg: "#a3ff00" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -4, rotate: -2, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="brutal-border-4 p-3 text-center"
                  style={{ backgroundColor: stat.bg, boxShadow: "4px 4px 0 0 #0a0a0a" }}
                >
                  <div className="font-display text-base">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            </div>
          </motion.aside>
        </div>

        {/* Description tabs */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={descriptionVariants}
          className="brutal-border-4 overflow-hidden"
          style={{ backgroundColor: "#fef6e4", boxShadow: "10px 10px 0 0 #0a0a0a" }}
        >
          {/* Tab buttons */}
          <div className="flex border-b-4 border-black">
            {(["description", "details", "shipping"] as const).map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 font-display text-sm sm:text-base uppercase py-4 border-r-4 border-black last:border-r-0 transition-colors duration-150"
                style={{
                  backgroundColor: activeTab === tab ? "#0a0a0a" : "transparent",
                  color: activeTab === tab ? "#fff200" : "#0a0a0a",
                }}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="p-6 sm:p-10"
          >
            {activeTab === "description" && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-display text-2xl uppercase">
                  About This Pair
                </h3>
                <p className="text-base leading-relaxed font-medium">
                  {product.description}
                </p>
                <p className="text-base leading-relaxed font-medium opacity-80">
                  Built for the streets, designed for the spotlight. Every pair
                  ships in original packaging with authentication card.
                </p>
              </div>
            )}
            {activeTab === "details" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
                {[
                  { label: "Style", value: "Lifestyle" },
                  { label: "Upper", value: "Premium Leather" },
                  { label: "Sole", value: "Rubber + Foam" },
                  { label: "Origin", value: "Made in Vietnam" },
                  { label: "Weight", value: "12.4 oz" },
                  { label: "SKU", value: product.id.padStart(6, "0") },
                ].map((spec) => (
                  <motion.div
                    key={spec.label}
                    whileHover={{ x: -2, y: -2, boxShadow: "6px 6px 0 0 #0a0a0a" }}
                    className="brutal-border-4 p-3 flex justify-between items-center"
                    style={{ backgroundColor: "#fff200", boxShadow: "4px 4px 0 0 #0a0a0a" }}
                  >
                    <span className="text-xs uppercase tracking-widest font-bold">
                      {spec.label}
                    </span>
                    <span className="font-display text-sm">{spec.value}</span>
                  </motion.div>
                ))}
              </div>
            )}
            {activeTab === "shipping" && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-display text-2xl uppercase">
                  Shipping & Returns
                </h3>
                <ul className="space-y-3 text-base font-medium">
                  <li className="flex items-start gap-3">
                    <span className="font-display text-xl">⚡</span>
                    <span>Free standard shipping on orders over $50.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-display text-xl">📦</span>
                    <span>Express delivery available at checkout.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-display text-xl">↩</span>
                    <span>
                      30-day free returns. No questions asked, just send em back.
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
