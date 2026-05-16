"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { useCartStore } from "@/store/cartStore";
import { useCheckoutStore } from "@/store/checkoutStore";
import { formatPrice } from "@/lib/utils";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentForm from "@/components/checkout/PaymentForm";
import OrderReview from "@/components/checkout/OrderReview";

type Step = "shipping" | "payment" | "review";

const STEPS: { id: Step; label: string; emoji: string }[] = [
  { id: "shipping", label: "Shipping", emoji: "📦" },
  { id: "payment", label: "Payment", emoji: "💳" },
  { id: "review", label: "Review", emoji: "✓" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const [currentStep, setCurrentStep] = useState<Step>("shipping");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if cart is empty (after mount to avoid hydration issues)
  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push("/shop");
    }
  }, [mounted, items.length, router]);

  if (!mounted || items.length === 0) {
    return null;
  }

  const subtotal = getTotalPrice();
  const shippingCost = subtotal >= 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  const goToNext = () => {
    if (currentStep === "shipping") setCurrentStep("payment");
    else if (currentStep === "payment") setCurrentStep("review");
  };

  const goToPrev = () => {
    if (currentStep === "review") setCurrentStep("payment");
    else if (currentStep === "payment") setCurrentStep("shipping");
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b-4 border-black"
        style={{ backgroundColor: "#a3ff00" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <h1 className="font-display text-3xl sm:text-4xl uppercase">
            Checkout
          </h1>
          <Link
            href="/shop"
            className="text-xs uppercase tracking-widest font-bold hover:underline"
          >
            ← Continue shopping
          </Link>
        </div>
      </motion.div>

      {/* Step indicator */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          {STEPS.map((step, i) => {
            const isActive = step.id === currentStep;
            const isCompleted = i < currentStepIndex;
            return (
              <div key={step.id} className="flex items-center gap-2 sm:gap-4">
                <motion.div
                  animate={{
                    scale: isActive ? 1.05 : 1,
                  }}
                  className="brutal-border-4 px-3 sm:px-5 py-2 flex items-center gap-2"
                  style={{
                    backgroundColor: isActive
                      ? "#0a0a0a"
                      : isCompleted
                      ? "#a3ff00"
                      : "#fef6e4",
                    color: isActive ? "#fff200" : "#0a0a0a",
                    boxShadow: isActive ? "5px 5px 0 0 #0a0a0a" : "3px 3px 0 0 #0a0a0a",
                  }}
                >
                  <span className="text-base sm:text-lg">{step.emoji}</span>
                  <span className="font-display text-xs sm:text-sm uppercase hidden sm:inline">
                    {step.label}
                  </span>
                </motion.div>
                {i < STEPS.length - 1 && (
                  <div className="w-6 sm:w-12 h-1 bg-black" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {currentStep === "shipping" && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <ShippingForm onNext={goToNext} />
              </motion.div>
            )}
            {currentStep === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <PaymentForm onNext={goToNext} onBack={goToPrev} />
              </motion.div>
            )}
            {currentStep === "review" && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <OrderReview onBack={goToPrev} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order summary sticky sidebar */}
        <aside className="lg:col-span-1">
          <div
            className="brutal-border-4 p-5 lg:sticky lg:top-24"
            style={{
              backgroundColor: "#fff200",
              boxShadow: "8px 8px 0 0 #0a0a0a",
            }}
          >
            <h2 className="font-display text-xl uppercase mb-4">
              Order Summary
            </h2>

            {/* Items */}
            <div className="flex flex-col gap-3 mb-4 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-start">
                  <div
                    className="relative w-14 h-14 brutal-border flex-shrink-0"
                    style={{ backgroundColor: "#fef6e4" }}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                      sizes="56px"
                    />
                    <span
                      className="absolute -top-2 -right-2 brutal-border bg-black text-[#fff200] text-[10px] font-display rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xs uppercase leading-tight line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mt-0.5">
                      Size: US {item.size}
                    </p>
                    <p className="font-display text-sm mt-1">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t-4 border-black">
              <div className="flex justify-between text-sm font-medium">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? "FREE ⚡" : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span>Tax (8%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between font-display text-xl pt-2 border-t-2 border-black">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
