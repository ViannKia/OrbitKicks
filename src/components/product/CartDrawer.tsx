"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } =
    useCartStore();

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  const totalPrice = getTotalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-[100] bg-black/50"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-[101] w-full sm:w-[420px] flex flex-col border-l-4 border-black"
            style={{ backgroundColor: "#fef6e4" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5 border-b-4 border-black"
              style={{ backgroundColor: "#fff200" }}
            >
              <div>
                <h2 className="font-display text-2xl uppercase">Your Cart</h2>
                <p className="text-xs uppercase tracking-widest font-bold opacity-60 mt-1">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </p>
              </div>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeCart}
                className="brutal-border-4 w-10 h-10 flex items-center justify-center font-display text-xl"
                style={{
                  backgroundColor: "#0a0a0a",
                  color: "#fff200",
                  boxShadow: "3px 3px 0 0 #0a0a0a",
                }}
                aria-label="Close cart"
              >
                ✕
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center gap-4"
                >
                  <div className="text-6xl">🛒</div>
                  <h3 className="font-display text-xl uppercase">
                    Cart is empty
                  </h3>
                  <p className="text-sm font-medium opacity-60">
                    Add some kicks to get started.
                  </p>
                  <Link href="/shop" onClick={closeCart}>
                    <motion.div
                      whileHover={{ x: -3, y: -3, boxShadow: "8px 8px 0 0 #0a0a0a" }}
                      whileTap={{ x: 3, y: 3, boxShadow: "0px 0px 0 0 #0a0a0a" }}
                      className="brutal-border-4 font-display text-sm uppercase px-6 py-3 mt-2"
                      style={{
                        backgroundColor: "#a3ff00",
                        boxShadow: "5px 5px 0 0 #0a0a0a",
                      }}
                    >
                      Shop Now →
                    </motion.div>
                  </Link>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-3">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="brutal-border-4 p-3 flex gap-3"
                        style={{
                          backgroundColor: "#fff",
                          boxShadow: "4px 4px 0 0 #0a0a0a",
                        }}
                      >
                        {/* Image */}
                        <div
                          className="relative w-20 h-20 brutal-border flex-shrink-0"
                          style={{ backgroundColor: "#fef6e4" }}
                        >
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-contain p-1"
                            sizes="80px"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h3 className="font-display text-sm uppercase leading-tight line-clamp-2">
                              {item.name}
                            </h3>
                            <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mt-1">
                              Size: US {item.size}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity controls */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="brutal-border w-6 h-6 flex items-center justify-center font-display text-sm hover:bg-black hover:text-[#fff200] transition-colors"
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="font-display text-sm w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="brutal-border w-6 h-6 flex items-center justify-center font-display text-sm hover:bg-black hover:text-[#fff200] transition-colors"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            <span className="font-display text-sm">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs font-bold opacity-40 hover:opacity-100 transition-opacity self-start"
                          aria-label="Remove item"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer with total + checkout */}
            {items.length > 0 && (
              <div
                className="px-6 py-5 border-t-4 border-black"
                style={{ backgroundColor: "#fef6e4" }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display text-sm uppercase tracking-widest">
                    Total
                  </span>
                  <span className="font-display text-2xl">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <motion.button
                  whileHover={{ x: -4, y: -4, boxShadow: "10px 10px 0 0 #0a0a0a" }}
                  whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0 0 #0a0a0a" }}
                  onClick={() => alert("Checkout coming soon!")}
                  className="w-full brutal-border-4 font-display text-base uppercase py-3 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#0a0a0a",
                    color: "#fff200",
                    boxShadow: "6px 6px 0 0 #0a0a0a",
                  }}
                >
                  Checkout →
                </motion.button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
