"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { useCheckoutStore } from "@/store/checkoutStore";
import { formatPrice } from "@/lib/utils";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const lastOrder = useCheckoutStore((s) => s.lastOrder);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect home if no order
  useEffect(() => {
    if (mounted && !lastOrder) {
      router.push("/");
    }
  }, [mounted, lastOrder, router]);

  if (!mounted || !lastOrder) return null;

  const orderDate = new Date(lastOrder.date);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero confirmation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="border-b-4 border-black py-12"
        style={{ backgroundColor: "#a3ff00" }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 12,
              delay: 0.2,
            }}
            className="inline-block brutal-border-4 w-20 h-20 mb-6 flex items-center justify-center font-display text-5xl"
            style={{
              backgroundColor: "#fff200",
              boxShadow: "6px 6px 0 0 #0a0a0a",
            }}
          >
            ✓
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl sm:text-5xl uppercase leading-[0.9] mb-4"
          >
            Order Confirmed!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base font-medium"
          >
            Thanks for choosing Orbit Kicks. Your kicks are being prepped 🔥
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        {/* Order info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="brutal-border-4 p-6"
          style={{
            backgroundColor: "#fef6e4",
            boxShadow: "8px 8px 0 0 #0a0a0a",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold opacity-60 mb-1">
                Order ID
              </p>
              <p className="font-display text-lg">{lastOrder.id}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold opacity-60 mb-1">
                Date
              </p>
              <p className="font-display text-lg">
                {orderDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold opacity-60 mb-1">
                Shipping To
              </p>
              <p className="font-medium text-sm">
                {lastOrder.shipping.fullName}
                <br />
                {lastOrder.shipping.address}, {lastOrder.shipping.city}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold opacity-60 mb-1">
                Estimated Delivery
              </p>
              <p className="font-display text-lg">3-5 days</p>
            </div>
          </div>
        </motion.div>

        {/* Items */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="brutal-border-4 p-6"
          style={{
            backgroundColor: "#fff200",
            boxShadow: "8px 8px 0 0 #0a0a0a",
          }}
        >
          <h2 className="font-display text-xl uppercase mb-4">Items</h2>
          <div className="space-y-3">
            {lastOrder.items.map((item, i) => (
              <div key={i} className="flex gap-3 items-center">
                <div
                  className="relative w-16 h-16 brutal-border flex-shrink-0"
                  style={{ backgroundColor: "#fef6e4" }}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-contain p-1"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-sm uppercase leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs uppercase tracking-widest font-bold opacity-60 mt-1">
                    Size US {item.size} · Qty {item.quantity}
                  </p>
                </div>
                <span className="font-display">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t-4 border-black space-y-1.5">
            <div className="flex justify-between text-sm font-medium">
              <span>Subtotal</span>
              <span>{formatPrice(lastOrder.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span>Shipping</span>
              <span>
                {lastOrder.shippingCost === 0
                  ? "FREE ⚡"
                  : formatPrice(lastOrder.shippingCost)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span>Tax</span>
              <span>{formatPrice(lastOrder.tax)}</span>
            </div>
            <div className="flex justify-between font-display text-xl pt-2 border-t-2 border-black">
              <span>Total Paid</span>
              <span>{formatPrice(lastOrder.total)}</span>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link href="/shop" className="flex-1">
            <motion.div
              whileHover={{ x: -4, y: -4, boxShadow: "12px 12px 0 0 #0a0a0a" }}
              whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0 0 #0a0a0a" }}
              className="brutal-border-4 font-display text-base uppercase py-4 text-center"
              style={{
                backgroundColor: "#0a0a0a",
                color: "#fff200",
                boxShadow: "8px 8px 0 0 #0a0a0a",
              }}
            >
              Keep Shopping →
            </motion.div>
          </Link>
          <Link href="/" className="flex-1">
            <motion.div
              whileHover={{ x: -4, y: -4, boxShadow: "12px 12px 0 0 #0a0a0a" }}
              whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0 0 #0a0a0a" }}
              className="brutal-border-4 font-display text-base uppercase py-4 text-center"
              style={{
                backgroundColor: "#fef6e4",
                boxShadow: "8px 8px 0 0 #0a0a0a",
              }}
            >
              Back Home
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
