"use client";

import { motion } from "framer-motion";

interface SizeSelectorProps {
  sizes: number[];
  selected: number | null;
  onSelect: (size: number) => void;
}

export default function SizeSelector({
  sizes,
  selected,
  onSelect,
}: SizeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="font-display text-sm uppercase tracking-widest">
          Pick Your Size
        </p>
        <button className="text-xs uppercase font-bold underline underline-offset-4 decoration-2" style={{ textDecorationColor: "#ff5c8d" }}>
          Size Guide
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {sizes.map((size) => {
          const isSelected = selected === size;
          return (
            <motion.button
              key={size}
              onClick={() => onSelect(size)}
              whileHover={{
                x: -2,
                y: -2,
                boxShadow: "6px 6px 0 0 #0a0a0a",
              }}
              whileTap={{ x: 3, y: 3, boxShadow: "0px 0px 0 0 #0a0a0a" }}
              className="brutal-border-4 brutal-shadow font-display text-base py-3"
              style={{
                backgroundColor: isSelected ? "#0a0a0a" : "#fef6e4",
                color: isSelected ? "#fff200" : "#0a0a0a",
              }}
              aria-pressed={isSelected}
              aria-label={`Size US ${size}`}
            >
              US {size}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
