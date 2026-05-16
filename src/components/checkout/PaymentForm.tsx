"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useCheckoutStore } from "@/store/checkoutStore";
import type { PaymentMethod } from "@/store/checkoutStore";

interface PaymentFormProps {
  onNext: () => void;
  onBack: () => void;
}

interface PaymentErrors {
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvc?: string;
  ewalletProvider?: string;
  bankProvider?: string;
}

const PAYMENT_METHODS: {
  id: PaymentMethod;
  label: string;
  emoji: string;
  bg: string;
  description: string;
}[] = [
  {
    id: "card",
    label: "Credit / Debit Card",
    emoji: "💳",
    bg: "#00d9ff",
    description: "Visa, Mastercard, AMEX",
  },
  {
    id: "ewallet",
    label: "E-Wallet",
    emoji: "📱",
    bg: "#a3ff00",
    description: "GoPay, OVO, DANA, ShopeePay",
  },
  {
    id: "bank",
    label: "Bank Transfer",
    emoji: "🏦",
    bg: "#ff5c8d",
    description: "BCA, BNI, Mandiri, BRI",
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    emoji: "💵",
    bg: "#ff7a00",
    description: "Pay when it arrives",
  },
];

const EWALLET_PROVIDERS = ["GoPay", "OVO", "DANA", "ShopeePay"];
const BANK_PROVIDERS = ["BCA", "BNI", "Mandiri", "BRI", "CIMB"];

// Format card number with spaces (e.g., 1234 5678 9012 3456)
const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
};

// Format expiry (MM/YY)
const formatExpiry = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
};

export default function PaymentForm({ onNext, onBack }: PaymentFormProps) {
  const payment = useCheckoutStore((s) => s.payment);
  const setPayment = useCheckoutStore((s) => s.setPayment);
  const [errors, setErrors] = useState<PaymentErrors>({});

  const validate = (): boolean => {
    const newErrors: PaymentErrors = {};
    if (payment.method === "card") {
      const cardDigits = (payment.cardNumber ?? "").replace(/\s/g, "");
      if (cardDigits.length < 13) newErrors.cardNumber = "Invalid card number";
      if (!payment.cardName?.trim()) newErrors.cardName = "Required";
      if (!payment.cardExpiry || !/^\d{2}\/\d{2}$/.test(payment.cardExpiry))
        newErrors.cardExpiry = "MM/YY";
      if (!payment.cardCvc || payment.cardCvc.length < 3)
        newErrors.cardCvc = "3-4 digits";
    } else if (payment.method === "ewallet") {
      if (!payment.ewalletProvider) newErrors.ewalletProvider = "Pick one";
    } else if (payment.method === "bank") {
      if (!payment.bankProvider) newErrors.bankProvider = "Pick one";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  const inputClass = (hasError?: boolean) =>
    `w-full brutal-border-4 px-4 py-3 font-medium text-sm focus:outline-none transition-all ${
      hasError ? "border-[#ff5c8d]" : ""
    }`;

  const inputStyle = {
    backgroundColor: "#fef6e4",
    boxShadow: "4px 4px 0 0 #0a0a0a",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div
        className="brutal-border-4 p-6"
        style={{
          backgroundColor: "#fef6e4",
          boxShadow: "8px 8px 0 0 #0a0a0a",
        }}
      >
        <h2 className="font-display text-2xl uppercase mb-1">Payment</h2>
        <p className="text-sm font-medium opacity-60 mb-6">
          Pick your payment method.
        </p>

        {/* Payment method picker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {PAYMENT_METHODS.map((method) => {
            const isActive = payment.method === method.id;
            return (
              <motion.button
                key={method.id}
                type="button"
                onClick={() => setPayment({ method: method.id })}
                whileHover={{ y: -2 }}
                whileTap={{ y: 1 }}
                className="brutal-border-4 p-4 text-left flex items-center gap-3 transition-all"
                style={{
                  backgroundColor: isActive ? method.bg : "#fef6e4",
                  boxShadow: isActive ? "6px 6px 0 0 #0a0a0a" : "3px 3px 0 0 #0a0a0a",
                  transform: isActive ? "translate(-2px, -2px)" : undefined,
                }}
              >
                <span className="text-2xl">{method.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xs uppercase leading-tight">
                    {method.label}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-60 mt-0.5 truncate">
                    {method.description}
                  </p>
                </div>
                {isActive && (
                  <motion.span
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="font-display text-lg"
                  >
                    ✓
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Method-specific form */}
        <AnimatePresence mode="wait">
          {payment.method === "card" && (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={payment.cardNumber ?? ""}
                  onChange={(e) =>
                    setPayment({ cardNumber: formatCardNumber(e.target.value) })
                  }
                  placeholder="1234 5678 9012 3456"
                  inputMode="numeric"
                  className={inputClass(!!errors.cardNumber)}
                  style={inputStyle}
                />
                {errors.cardNumber && (
                  <p className="text-xs font-bold text-[#ff5c8d] mt-1">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-bold mb-2">
                  Name on Card
                </label>
                <input
                  type="text"
                  value={payment.cardName ?? ""}
                  onChange={(e) => setPayment({ cardName: e.target.value })}
                  placeholder="JOHN DOE"
                  className={inputClass(!!errors.cardName)}
                  style={inputStyle}
                />
                {errors.cardName && (
                  <p className="text-xs font-bold text-[#ff5c8d] mt-1">
                    {errors.cardName}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold mb-2">
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    value={payment.cardExpiry ?? ""}
                    onChange={(e) =>
                      setPayment({ cardExpiry: formatExpiry(e.target.value) })
                    }
                    placeholder="12/28"
                    inputMode="numeric"
                    className={inputClass(!!errors.cardExpiry)}
                    style={inputStyle}
                  />
                  {errors.cardExpiry && (
                    <p className="text-xs font-bold text-[#ff5c8d] mt-1">
                      {errors.cardExpiry}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    value={payment.cardCvc ?? ""}
                    onChange={(e) =>
                      setPayment({
                        cardCvc: e.target.value.replace(/\D/g, "").slice(0, 4),
                      })
                    }
                    placeholder="123"
                    inputMode="numeric"
                    className={inputClass(!!errors.cardCvc)}
                    style={inputStyle}
                  />
                  {errors.cardCvc && (
                    <p className="text-xs font-bold text-[#ff5c8d] mt-1">
                      {errors.cardCvc}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {payment.method === "ewallet" && (
            <motion.div
              key="ewallet"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <label className="block text-xs uppercase tracking-widest font-bold mb-2">
                Choose your e-wallet
              </label>
              <div className="grid grid-cols-2 gap-3">
                {EWALLET_PROVIDERS.map((provider) => {
                  const isActive = payment.ewalletProvider === provider;
                  return (
                    <button
                      key={provider}
                      type="button"
                      onClick={() => setPayment({ ewalletProvider: provider })}
                      className="brutal-border-4 py-3 font-display text-sm uppercase transition-all"
                      style={{
                        backgroundColor: isActive ? "#a3ff00" : "#fef6e4",
                        boxShadow: isActive
                          ? "5px 5px 0 0 #0a0a0a"
                          : "3px 3px 0 0 #0a0a0a",
                      }}
                    >
                      {provider}
                    </button>
                  );
                })}
              </div>
              {errors.ewalletProvider && (
                <p className="text-xs font-bold text-[#ff5c8d] mt-2">
                  {errors.ewalletProvider}
                </p>
              )}
            </motion.div>
          )}

          {payment.method === "bank" && (
            <motion.div
              key="bank"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <label className="block text-xs uppercase tracking-widest font-bold mb-2">
                Choose your bank
              </label>
              <div className="grid grid-cols-3 gap-3">
                {BANK_PROVIDERS.map((bank) => {
                  const isActive = payment.bankProvider === bank;
                  return (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setPayment({ bankProvider: bank })}
                      className="brutal-border-4 py-3 font-display text-sm uppercase transition-all"
                      style={{
                        backgroundColor: isActive ? "#ff5c8d" : "#fef6e4",
                        boxShadow: isActive
                          ? "5px 5px 0 0 #0a0a0a"
                          : "3px 3px 0 0 #0a0a0a",
                      }}
                    >
                      {bank}
                    </button>
                  );
                })}
              </div>
              {errors.bankProvider && (
                <p className="text-xs font-bold text-[#ff5c8d] mt-2">
                  {errors.bankProvider}
                </p>
              )}
            </motion.div>
          )}

          {payment.method === "cod" && (
            <motion.div
              key="cod"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="brutal-border-4 p-4"
              style={{ backgroundColor: "#fff200" }}
            >
              <p className="text-sm font-medium">
                💵 Pay in cash when your kicks are delivered. Make sure
                someone&apos;s home to receive the package.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <motion.button
          type="button"
          onClick={onBack}
          whileHover={{ x: -4, y: -4, boxShadow: "10px 10px 0 0 #0a0a0a" }}
          whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0 0 #0a0a0a" }}
          className="brutal-border-4 font-display text-sm uppercase px-6 py-4 sm:flex-shrink-0"
          style={{
            backgroundColor: "#fef6e4",
            boxShadow: "6px 6px 0 0 #0a0a0a",
          }}
        >
          ← Back
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ x: -4, y: -4, boxShadow: "12px 12px 0 0 #0a0a0a" }}
          whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0 0 #0a0a0a" }}
          className="flex-1 brutal-border-4 font-display text-base uppercase py-4"
          style={{
            backgroundColor: "#0a0a0a",
            color: "#fff200",
            boxShadow: "8px 8px 0 0 #0a0a0a",
          }}
        >
          Review Order →
        </motion.button>
      </div>
    </form>
  );
}
