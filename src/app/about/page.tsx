"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: i % 2 === 0 ? -1 : 1,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 14,
      delay: 0.3 + i * 0.1,
    },
  }),
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 18 }}
        className="border-b-4 border-black"
        style={{ backgroundColor: "#00d9ff" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="font-display text-5xl sm:text-6xl uppercase">
            About Us
          </h1>
          <p className="text-base font-medium mt-2">
            The story behind the kicks.
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-16">
        {/* Mission */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="max-w-3xl"
        >
          <motion.div
            whileHover={{ rotate: 0, scale: 1.05 }}
            className="inline-block brutal-border-4 brutal-shadow font-display text-xs uppercase px-3 py-1 mb-6 -rotate-2"
            style={{ backgroundColor: "#a3ff00" }}
          >
            ✦ Our Mission
          </motion.div>
          <h2 className="font-display text-3xl sm:text-4xl uppercase leading-tight mb-6">
            We believe sneakers are more than shoes.
            <br />
            <span
              className="inline-block px-3 mt-2 -rotate-1"
              style={{ backgroundColor: "#fff200" }}
            >
              They&apos;re energy.
            </span>
          </h2>
          <p className="text-lg font-medium leading-relaxed">
            Orbit Kicks was born from a simple idea: sneaker shopping should feel
            as exciting as unboxing your grails. We combine cutting-edge
            interactive experiences with a curated selection of the most coveted
            kicks on the planet.
          </p>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "500+", label: "Sneakers", bg: "#ff5c8d" },
              { value: "50K+", label: "Happy Customers", bg: "#fff200" },
              { value: "100%", label: "Authentic", bg: "#00d9ff" },
              { value: "2024", label: "Founded", bg: "#a3ff00" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={statVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -6, rotate: 0, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="brutal-border-4 p-5 text-center"
                style={{ backgroundColor: stat.bg, boxShadow: "6px 6px 0 0 #0a0a0a" }}
              >
                <div className="font-display text-3xl sm:text-4xl">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest font-bold mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="max-w-3xl"
        >
          <h2 className="font-display text-3xl uppercase mb-8">
            What We Stand For
          </h2>
          <div className="space-y-4">
            {[
              {
                icon: "⚡",
                title: "Speed",
                desc: "New drops every Friday. Be the first to cop.",
              },
              {
                icon: "🔒",
                title: "Authenticity",
                desc: "Every pair is verified. No fakes, ever.",
              },
              {
                icon: "🌍",
                title: "Community",
                desc: "50K+ sneakerheads and counting.",
              },
              {
                icon: "♻️",
                title: "Sustainability",
                desc: "Eco-friendly packaging. Carbon-neutral shipping.",
              },
            ].map((value) => (
              <motion.div
                key={value.title}
                whileHover={{ x: -4, boxShadow: "10px 10px 0 0 #0a0a0a" }}
                className="brutal-border-4 brutal-shadow p-5 flex items-start gap-4"
                style={{ backgroundColor: "#fef6e4" }}
              >
                <span className="text-3xl">{value.icon}</span>
                <div>
                  <h3 className="font-display text-lg uppercase">
                    {value.title}
                  </h3>
                  <p className="text-sm font-medium opacity-80">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
