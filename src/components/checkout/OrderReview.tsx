"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { useCartStore } from "@/store/cartStore";
import { useCheckoutStore } from "@/store/checkoutStore";
import { formatPrice } from "@/lib/utils";

interface OrderReviewProps {
  onBack: () => void;
}

const PAYMENT_LABELS: Record<string, string> = {
  card: "Credit / Debit Card",
  ewallet: "E-Wallet",
  bank: "Bank Transfer",
  cod: "Cash on Delivery",
};

export default function OrderReview({ onBack }: OrderReviewProps) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const clearCart = useCartStore((s) => s.clearCart);
  const shipping = useCheckoutStore((s) => s.shipping);
  const payment = useCheckoutStore((s) => s.payment);
  const saveOrder = useCheckoutStore((s) => s.saveOrder);
  const resetCheckout = useCheckoutStore((s) => s.resetCheckout);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getTotalPrice();
  const shippingCost = subtotal >= 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2200));

    // Build the order
    const order = {
      id: `OK-${Date.now().toString(36).toUpperCase()}`,
      date: new Date().toISOString(),
      shipping,
      payment,
      subtotal,
      shippingCost,
      tax,
      total,
      items: items.map((item) => ({
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        imageUrl: item.imageUrl,
      })),
    };

    saveOrder(order);
    clearCart();
    resetCheckout();

    router.push("/checkout/success");
  };

  // Mask card number for display (show last 4 digits)
  const maskedCard = payment.cardNumber
    ? `•••• •••• •••• ${payment.cardNumber.replace(/\s/g, "").slice(-4)}`
    : "";

  return (
    <div className="space-y-5">
      {/* Shipping summary */}
      <div
        className="brutal-border-4 p-6"
        style={{
          backgroundColor: "#fef6e4",
          boxShadow: "8px 8px 0 0 #0a0a0a",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl uppercase">Ship To</h2>
          <button
            onClick={onBack}
            className="text-xs uppercase tracking-widest font-bold hover:underline"
          >
            ← Edit
          </button>
        </div>
        <div className="space-y-1 font-medium text-sm">
          <p className="font-display text-base">{shipping.fullName}</p>
          <p className="opacity-70">{shipping.email}</p>
          <p className="opacity-70">{shipping.phone}</p>
          <p className="mt-2">
            {shipping.address}, {shipping.city} {shipping.postalCode}
          </p>
        </div>
      </div>

      {/* Payment summary */}
      <div
        className="brutal-border-4 p-6"
        style={{
          backgroundColor: "#fef6e4",
          boxShadow: "8px 8px 0 0 #0a0a0a",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl uppercase">Payment Method</h2>
          <button
            onClick={onBack}
            className="text-xs uppercase tracking-widest font-bold hover:underline"
          >
            ← Edit
          </button>
        </div>
        <div className="space-y-2 font-medium text-sm">
          <p className="font-display text-base">
            {PAYMENT_LABELS[payment.method]}
          </p>
          {payment.method === "card" && (
            <>
              <p className="opacity-70">{maskedCard}</p>
              <p className="opacity-70">{payment.cardName}</p>
            </>
          )}
          {payment.method === "ewallet" && (
            <p className="opacity-70">{payment.ewalletProvider}</p>
          )}
          {payment.method === "bank" && (
            <p className="opacity-70">{payment.bankProvider}</p>
          )}
          {payment.method === "cod" && (
            <p className="opacity-70">Pay {formatPrice(total)} on delivery</p>
          )}
        </div>
      </div>

      {/* Confirm panel */}
      <div
        className="brutal-border-4 p-6"
        style={{
          backgroundColor: "#fff200",
          boxShadow: "8px 8px 0 0 #0a0a0a",
        }}
      >
        <h2 className="font-display text-xl uppercase mb-2">Final Step ⚡</h2>
        <p className="text-sm font-medium opacity-80 mb-4">
          You&apos;re about to place an order for{" "}
          <span className="font-display">{formatPrice(total)}</span>. By
          confirming, you agree to our terms.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            type="button"
            onClick={onBack}
            disabled={isProcessing}
            whileHover={
              isProcessing
                ? {}
                : { x: -4, y: -4, boxShadow: "10px 10px 0 0 #0a0a0a" }
            }
            whileTap={
              isProcessing ? {} : { x: 4, y: 4, boxShadow: "0px 0px 0 0 #0a0a0a" }
            }
            className="brutal-border-4 font-display text-sm uppercase px-6 py-4 sm:flex-shrink-0 disabled:opacity-50"
            style={{
              backgroundColor: "#fef6e4",
              boxShadow: "6px 6px 0 0 #0a0a0a",
            }}
          >
            ← Back
          </motion.button>
          <motion.button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            whileHover={
              isProcessing
                ? {}
                : { x: -4, y: -4, boxShadow: "12px 12px 0 0 #0a0a0a" }
            }
            whileTap={
              isProcessing ? {} : { x: 4, y: 4, boxShadow: "0px 0px 0 0 #0a0a0a" }
            }
            className="flex-1 brutal-border-4 font-display text-base uppercase py-4 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{
              backgroundColor: "#0a0a0a",
              color: "#fff200",
              boxShadow: "8px 8px 0 0 #0a0a0a",
            }}
          >
            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.span
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="inline-block"
                  >
                    ⚡
                  </motion.span>
                  Processing...
                </motion.span>
              ) : (
                <motion.span
                  key="confirm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Place Order ({formatPrice(total)}) →
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
