"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

import { useCartStore } from "@/store/cartStore";

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.3 + i * 0.08,
    },
  }),
};

const logoVariants: Variants = {
  hidden: { opacity: 0, x: -40, rotate: -10 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.1,
    },
  },
};

const cartVariants: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.5 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 18,
      delay: 0.5,
    },
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const toggleCart = useCartStore((state) => state.toggleCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "SHOP", href: "/shop" },
    { label: "DROPS", href: "/drops" },
    { label: "ABOUT", href: "/about" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{
          backgroundColor: scrolled ? "#fef6e4" : "#fef6e4",
          borderBottom: scrolled ? "4px solid #0a0a0a" : "4px solid transparent",
          boxShadow: scrolled ? "0 4px 0 0 #0a0a0a" : "none",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: -8, scale: 1.1 }}
                whileTap={{ rotate: 8, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                className="brutal-border-4 px-4 py-2 relative"
                style={{
                  backgroundColor: "#fff200",
                  boxShadow: "4px 4px 0 0 #0a0a0a",
                }}
              >
                <span className="font-display text-xl uppercase tracking-tight text-black">
                  ORBIT
                </span>
                {/* Decorative dot */}
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" as const }}
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#ff5c8d] border-2 border-black"
                />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                className="font-display text-2xl uppercase text-black hidden sm:inline"
              >
                KICKS
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item, i) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <motion.div
                  key={item.label}
                  custom={i}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link href={item.href}>
                    <motion.span
                      whileHover={{
                        backgroundColor: "#0a0a0a",
                        color: "#fff200",
                        scale: 1.05,
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="font-display text-sm uppercase tracking-wide px-5 py-2.5 inline-block border-2"
                      style={{
                        backgroundColor: isActive ? "#0a0a0a" : "transparent",
                        color: isActive ? "#fff200" : "#0a0a0a",
                        borderColor: isActive ? "#0a0a0a" : "transparent",
                      }}
                    >
                      {item.label}
                    </motion.span>
                  </Link>
              </motion.div>
              );
            })}
          </div>

          {/* Right side: Cart + Mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Cart button */}
            <motion.div
              variants={cartVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                whileHover={{
                  scale: 1.08,
                  rotate: 3,
                  boxShadow: "8px 8px 0 0 #0a0a0a",
                }}
                whileTap={{
                  scale: 0.92,
                  rotate: -3,
                  boxShadow: "0px 0px 0 0 #0a0a0a",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                onClick={toggleCart}
                className="brutal-border-4 font-display text-sm uppercase tracking-wide px-5 py-3 flex items-center gap-2 relative"
                style={{
                  backgroundColor: "#ff5c8d",
                  color: "#0a0a0a",
                  boxShadow: "4px 4px 0 0 #0a0a0a",
                }}
                aria-label="Open cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272"
                  />
                </svg>
                <span className="hidden sm:inline">CART ({mounted ? totalItems : 0})</span>
                {mounted && totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={totalItems}
                    className="sm:hidden absolute -top-2 -right-2 brutal-border bg-black text-[#fff200] text-xs font-display rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>
            </motion.div>

            {/* Mobile hamburger */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden brutal-border-4 w-12 h-12 flex flex-col items-center justify-center gap-1.5"
              style={{
                backgroundColor: "#0a0a0a",
                boxShadow: "3px 3px 0 0 #ff5c8d",
              }}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-[#fff200] block"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="w-5 h-0.5 bg-[#fff200] block"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-[#fff200] block"
              />
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed top-20 left-0 right-0 z-40 md:hidden border-b-4 border-black"
            style={{ backgroundColor: "#fff200" }}
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-2">
              {navLinks.map((item, i) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 200, damping: 18 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-display text-2xl uppercase py-3 border-b-2 border-black/20 hover:pl-4 transition-all duration-150"
                    style={{
                      paddingLeft: isActive ? "1rem" : undefined,
                      backgroundColor: isActive ? "#0a0a0a" : "transparent",
                      color: isActive ? "#fff200" : "#0a0a0a",
                      paddingTop: "0.75rem",
                      paddingBottom: "0.75rem",
                    }}
                  >
                    {isActive && "→ "}{item.label}
                  </Link>
                </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
