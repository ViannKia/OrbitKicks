"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";

const features = [
  {
    icon: "⚡",
    title: "Instant Drops",
    description: "Be the first to cop. New heat every Friday.",
    bg: "#ff5c8d",
    rotate: -2,
  },
  {
    icon: "🔒",
    title: "100% Authentic",
    description: "Every pair authenticated. Counterfeits have no place here.",
    bg: "#fff200",
    rotate: 1,
  },
  {
    icon: "🚀",
    title: "Free Shipping",
    description: "On orders $50+. Get your kicks fast.",
    bg: "#00d9ff",
    rotate: -1,
  },
  {
    icon: "↩",
    title: "Easy Returns",
    description: "30 days. No drama. Send em back if it's not vibing.",
    bg: "#a3ff00",
    rotate: 2,
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.8, rotate: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: features[i]?.rotate ?? 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 14,
      delay: i * 0.12,
    },
  }),
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
};

export default function WhySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-20 border-b-4 border-black overflow-hidden"
      style={{ backgroundColor: "#0a0a0a", color: "#fef6e4" }}
    >
      {/* Decorative rotating ring */}
      <motion.div
        animate={isInView ? { rotate: 360 } : {}}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-2 border-dashed border-white/5 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Title */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={isInView ? { scale: 1, rotate: -2 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
            className="inline-block brutal-border-4 font-display text-xs uppercase px-3 py-1 mb-6"
            style={{
              backgroundColor: "#fff200",
              color: "#0a0a0a",
              boxShadow: "6px 6px 0 0 #fef6e4",
            }}
          >
            ✦ Why Orbit
          </motion.div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.9]">
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
              className="block"
            >
              We Don&apos;t Sell Sneakers.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 15 }}
              className="block"
            >
              <span style={{ color: "#fff200" }}>We Sell </span>
              <motion.span
                initial={{ rotate: 5, scale: 0.9 }}
                animate={isInView ? { rotate: -1, scale: 1 } : {}}
                transition={{ delay: 0.6, type: "spring", stiffness: 150, damping: 12 }}
                className="inline-block px-4"
                style={{ backgroundColor: "#ff5c8d", color: "#0a0a0a" }}
              >
                Energy.
              </motion.span>
            </motion.span>
          </h2>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div
                whileHover={{
                  y: -10,
                  rotate: 0,
                  scale: 1.05,
                  boxShadow: "12px 12px 0 0 #fef6e4",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="brutal-border-4 p-6 text-black h-full"
                style={{
                  backgroundColor: feature.bg,
                  boxShadow: "8px 8px 0 0 #fef6e4",
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                    delay: i * 0.5,
                  }}
                  className="text-5xl mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="font-display text-xl uppercase mb-2 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
