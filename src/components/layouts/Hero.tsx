"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Variants } from "framer-motion";

// Character-by-character reveal for the headline
const charVariants: Variants = {
  hidden: { y: 100, opacity: 0, rotateX: -90 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 12,
      delay: 0.3 + i * 0.03,
    },
  }),
};

const stickerVariants: Variants = {
  hidden: { scale: 0, rotate: -180, opacity: 0 },
  visible: (delay: number) => ({
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 12,
      delay,
    },
  }),
};

const slideUpVariants: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 16,
      delay,
    },
  }),
};

function AnimatedText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i}
          variants={charVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-5rem)] max-h-screen grid-pattern overflow-hidden flex flex-col justify-start pt-0"
    >
      {/* Animated background shapes with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {/* Big circle */}
        <motion.div
          custom={0.8}
          variants={stickerVariants}
          initial="hidden"
          animate="visible"
          className="absolute top-[10%] right-[5%] sm:right-[10%] w-32 h-32 sm:w-48 sm:h-48 rounded-full brutal-border-4"
          style={{ backgroundColor: "#00d9ff", boxShadow: "8px 8px 0 0 #0a0a0a" }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full flex items-center justify-center font-display text-4xl sm:text-6xl"
          >
            ★
          </motion.div>
        </motion.div>

        {/* Zigzag shape */}
        <motion.div
          custom={1.0}
          variants={stickerVariants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-[15%] left-[-2%] sm:left-[2%] brutal-border-4 brutal-shadow px-4 py-2 -rotate-12"
          style={{ backgroundColor: "#a3ff00" }}
        >
          <span className="font-display text-sm sm:text-base uppercase">NEW DROP ⚡</span>
        </motion.div>

        {/* Small diamond */}
        <motion.div
          custom={1.2}
          variants={stickerVariants}
          initial="hidden"
          animate="visible"
          className="absolute top-[40%] left-[2%] sm:left-[5%] w-12 h-12 sm:w-16 sm:h-16 brutal-border-4 rotate-45 animate-float"
          style={{ backgroundColor: "#ff7a00", boxShadow: "4px 4px 0 0 #0a0a0a" }}
        />

        {/* Arrow shape */}
        <motion.div
          custom={1.4}
          variants={stickerVariants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-[30%] right-[3%] sm:right-[8%] brutal-border-4 brutal-shadow px-3 py-2 rotate-6"
          style={{ backgroundColor: "#ff5c8d" }}
        >
          <span className="font-display text-2xl sm:text-3xl">→</span>
        </motion.div>

        {/* Floating dots */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay: i * 0.3,
            }}
            className="absolute w-4 h-4 rounded-full bg-black"
            style={{
              top: `${20 + i * 15}%`,
              right: `${15 + i * 12}%`,
              opacity: 0.15,
            }}
          />
        ))}
      </motion.div>

      {/* Main content with parallax */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-2 sm:py-4 grid lg:grid-cols-12 gap-6 items-center"
      >
        {/* Left column: text */}
        <div className="lg:col-span-7">
          {/* Tag line */}
          <motion.div
            custom={0.2}
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="inline-block brutal-border-4 brutal-shadow px-4 py-2 mb-8 -rotate-2"
              style={{ backgroundColor: "#ff5c8d" }}
            >
              <span className="font-display text-sm uppercase tracking-widest">
                ⚡ Sneakers That Hit Different
              </span>
            </motion.div>
          </motion.div>

          {/* Massive headline with character animation */}
          <div className="font-display uppercase leading-[0.85] mb-6">
            <div className="overflow-hidden">
              <AnimatedText
                text="STEP"
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-black block"
              />
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.6 }}
              >
                <span
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl block"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "3px #0a0a0a",
                  }}
                >
                  INTO THE
                </span>
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ x: 100, opacity: 0, rotate: 3 }}
                animate={{ x: 0, opacity: 1, rotate: -1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.8 }}
              >
                <span
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block px-4"
                  style={{ backgroundColor: "#fff200" }}
                >
                  FUTURE.
                </span>
              </motion.div>
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            custom={1.0}
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg text-black/70 max-w-xl font-medium leading-relaxed mb-6"
          >
            Tilt. Zoom. Rotate. Experience every stitch, lace, and sole like
            you&apos;re holding it in your hands.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={1.2}
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 mb-8"
          >
            <Link href="/shop">
              <motion.div
                whileHover={{
                  x: -6,
                  y: -6,
                  boxShadow: "14px 14px 0 0 #0a0a0a",
                  rotate: -1,
                }}
                whileTap={{
                  x: 6,
                  y: 6,
                  boxShadow: "0px 0px 0 0 #0a0a0a",
                  rotate: 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="brutal-border-4 font-display text-base sm:text-lg uppercase px-8 py-4 inline-flex items-center gap-3"
                style={{
                  backgroundColor: "#0a0a0a",
                  color: "#fff200",
                  boxShadow: "8px 8px 0 0 #0a0a0a",
                }}
              >
                Shop Now
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" as const }}
                  className="text-xl"
                >
                  →
                </motion.span>
              </motion.div>
            </Link>
            <Link href="/drops">
              <motion.div
                whileHover={{
                  x: -6,
                  y: -6,
                  boxShadow: "14px 14px 0 0 #0a0a0a",
                  rotate: 1,
                }}
                whileTap={{
                  x: 6,
                  y: 6,
                  boxShadow: "0px 0px 0 0 #0a0a0a",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="brutal-border-4 font-display text-base sm:text-lg uppercase px-8 py-4 inline-flex items-center gap-2"
                style={{
                  backgroundColor: "#fef6e4",
                  color: "#0a0a0a",
                  boxShadow: "8px 8px 0 0 #0a0a0a",
                }}
              >
                Latest Drops 🔥
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats row with count-up feel */}
          <motion.div
            custom={1.4}
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-6"
          >
            {[
              { value: "500+", label: "Sneakers", bg: "#00d9ff" },
              { value: "50K", label: "Happy Feet", bg: "#a3ff00" },
              { value: "24/7", label: "Drops", bg: "#ff5c8d" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4, rotate: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="brutal-border-4 px-4 py-3"
                style={{ backgroundColor: stat.bg, boxShadow: "4px 4px 0 0 #0a0a0a" }}
              >
                <div className="font-display text-2xl sm:text-3xl">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-widest font-bold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right column: featured visual block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: 12 }}
          animate={{ opacity: 1, scale: 1, rotate: 3 }}
          transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.6 }}
          className="lg:col-span-5 relative hidden lg:block"
        >
          <motion.div
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="brutal-border-4 p-2 aspect-[4/5]"
            style={{ backgroundColor: "#ff5c8d", boxShadow: "12px 12px 0 0 #0a0a0a" }}
          >
            <div
              className="w-full h-full brutal-border-4 grid-pattern flex items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: "#fef6e4" }}
            >
              {/* Big sneaker emoji with bounce */}
              <motion.div
                animate={{
                  y: [0, -25, 0],
                  rotate: [-8, 8, -8],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                }}
                className="text-[140px] sm:text-[160px]"
              >
                👟
              </motion.div>

              {/* Corner stickers */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
                className="absolute top-4 left-4 brutal-border font-display text-xs uppercase px-2 py-1"
                style={{ backgroundColor: "#fff200" }}
              >
                FRESH
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
                className="absolute bottom-4 right-4 brutal-border font-display text-sm uppercase px-3 py-1"
                style={{ backgroundColor: "#00d9ff" }}
              >
                $180
              </motion.div>
              <motion.div
                animate={{ rotate: [0, -3, 3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const, delay: 1 }}
                className="absolute top-4 right-4 brutal-border rounded-full w-14 h-14 flex items-center justify-center font-display text-xl"
                style={{ backgroundColor: "#a3ff00" }}
              >
                ★
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Marquee strip at bottom */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 100, damping: 20 }}
        className="absolute bottom-0 left-0 right-0 border-y-4 border-black overflow-hidden py-3"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-8 pr-8">
              {[
                "FREE SHIPPING",
                "★",
                "NEW DROPS WEEKLY",
                "★",
                "AUTHENTIC GUARANTEED",
                "★",
                "30-DAY RETURNS",
                "★",
                "ORBIT KICKS",
                "★",
              ].map((text, i) => (
                <span
                  key={`${idx}-${i}`}
                  className="font-display text-lg uppercase"
                  style={{ color: text === "★" ? "#fff200" : "#fef6e4" }}
                >
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
