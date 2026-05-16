"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { useCheckoutStore } from "@/store/checkoutStore";

interface ShippingFormProps {
  onNext: () => void;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export default function ShippingForm({ onNext }: ShippingFormProps) {
  const shipping = useCheckoutStore((s) => s.shipping);
  const setShipping = useCheckoutStore((s) => s.setShipping);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!shipping.fullName.trim()) newErrors.fullName = "Required";
    if (!shipping.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email))
      newErrors.email = "Invalid email";
    if (!shipping.phone.trim()) newErrors.phone = "Required";
    if (!shipping.address.trim()) newErrors.address = "Required";
    if (!shipping.city.trim()) newErrors.city = "Required";
    if (!shipping.postalCode.trim()) newErrors.postalCode = "Required";

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
        <h2 className="font-display text-2xl uppercase mb-1">
          Shipping Info
        </h2>
        <p className="text-sm font-medium opacity-60 mb-6">
          Where should we ship your kicks?
        </p>

        <div className="space-y-4">
          {/* Full name */}
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={shipping.fullName}
              onChange={(e) => setShipping({ fullName: e.target.value })}
              placeholder="John Doe"
              className={inputClass(!!errors.fullName)}
              style={inputStyle}
            />
            {errors.fullName && (
              <p className="text-xs font-bold text-[#ff5c8d] mt-1">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={shipping.email}
                onChange={(e) => setShipping({ email: e.target.value })}
                placeholder="you@example.com"
                className={inputClass(!!errors.email)}
                style={inputStyle}
              />
              {errors.email && (
                <p className="text-xs font-bold text-[#ff5c8d] mt-1">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={shipping.phone}
                onChange={(e) => setShipping({ phone: e.target.value })}
                placeholder="+1 555 123 4567"
                className={inputClass(!!errors.phone)}
                style={inputStyle}
              />
              {errors.phone && (
                <p className="text-xs font-bold text-[#ff5c8d] mt-1">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              value={shipping.address}
              onChange={(e) => setShipping({ address: e.target.value })}
              placeholder="123 Sneaker Street"
              className={inputClass(!!errors.address)}
              style={inputStyle}
            />
            {errors.address && (
              <p className="text-xs font-bold text-[#ff5c8d] mt-1">
                {errors.address}
              </p>
            )}
          </div>

          {/* City + Postal code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-2">
                City
              </label>
              <input
                type="text"
                value={shipping.city}
                onChange={(e) => setShipping({ city: e.target.value })}
                placeholder="New York"
                className={inputClass(!!errors.city)}
                style={inputStyle}
              />
              {errors.city && (
                <p className="text-xs font-bold text-[#ff5c8d] mt-1">
                  {errors.city}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-2">
                Postal Code
              </label>
              <input
                type="text"
                value={shipping.postalCode}
                onChange={(e) => setShipping({ postalCode: e.target.value })}
                placeholder="10001"
                className={inputClass(!!errors.postalCode)}
                style={inputStyle}
              />
              {errors.postalCode && (
                <p className="text-xs font-bold text-[#ff5c8d] mt-1">
                  {errors.postalCode}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Continue button */}
      <motion.button
        type="submit"
        whileHover={{ x: -4, y: -4, boxShadow: "12px 12px 0 0 #0a0a0a" }}
        whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0 0 #0a0a0a" }}
        className="w-full brutal-border-4 font-display text-base uppercase py-4"
        style={{
          backgroundColor: "#0a0a0a",
          color: "#fff200",
          boxShadow: "8px 8px 0 0 #0a0a0a",
        }}
      >
        Continue to Payment →
      </motion.button>
    </form>
  );
}
