"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  angle: number;
  distance: number;
}

interface CartButtonProps {
  productName: string;
  disabled?: boolean;
}

const PARTICLE_EMOJIS = ["⚡", "★", "💥", "🔥", "✦", "♦"];

export default function CartButton({ productName, disabled }: CartButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [added, setAdded] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Spawn 10 particles in a burst pattern
    const newParticles: Particle[] = Array.from({ length: 10 }, (_, i) => {
      const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.3;
      const distance = 60 + Math.random() * 60;
      return {
        id: Date.now() + i,
        x: centerX,
        y: centerY,
        emoji:
          PARTICLE_EMOJIS[Math.floor(Math.random() * PARTICLE_EMOJIS.length)],
        angle,
        distance,
      };
    });

    setParticles((prev) => [...prev, ...newParticles]);
    setAdded(true);

    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id))
      );
    }, 900);

    setTimeout(() => setAdded(false), 1800);

    console.log(`Added "${productName}" to cart`);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleClick}
        disabled={disabled}
        whileHover={
          disabled
            ? {}
            : { x: -4, y: -4, boxShadow: "14px 14px 0 0 #0a0a0a" }
        }
        whileTap={
          disabled ? {} : { x: 6, y: 6, boxShadow: "0px 0px 0 0 #0a0a0a" }
        }
        animate={
          added
            ? {
                backgroundColor: "#a3ff00",
                transition: { duration: 0.2 },
              }
            : {}
        }
        className="w-full brutal-border-4 brutal-shadow-lg font-display text-lg uppercase py-5 px-8 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        style={{
          backgroundColor: added ? "#a3ff00" : "#fff200",
          color: "#0a0a0a",
        }}
      >
        {added ? (
          <>
            <motion.span
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="text-2xl"
            >
              ✓
            </motion.span>
            Added!
          </>
        ) : (
          <>
            Add to Cart
            <span className="text-xl">→</span>
          </>
        )}
      </motion.button>

      {/* Particle burst */}
      <AnimatePresence>
        {particles.map((p) => {
          const dx = Math.cos(p.angle) * p.distance;
          const dy = Math.sin(p.angle) * p.distance;
          return (
            <motion.span
              key={p.id}
              className="fixed text-2xl pointer-events-none z-[100]"
              style={{ left: p.x, top: p.y }}
              initial={{ opacity: 1, scale: 0, x: 0, y: 0, rotate: 0 }}
              animate={{
                opacity: 0,
                scale: 1.4,
                x: dx,
                y: dy - 30,
                rotate: 360,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {p.emoji}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
