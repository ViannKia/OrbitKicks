"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 w-full md:w-auto"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="brutal-border-4 px-4 py-3 font-medium flex-1 md:w-72 focus:outline-none focus:ring-0"
        style={{ backgroundColor: "#fef6e4", color: "#0a0a0a" }}
      />
      <motion.button
        type="submit"
        whileHover={{ x: -2, y: -2, boxShadow: "8px 8px 0 0 #0a0a0a" }}
        whileTap={{ x: 3, y: 3, boxShadow: "0px 0px 0 0 #0a0a0a" }}
        className="brutal-border-4 brutal-shadow font-display text-sm uppercase px-6 py-3 whitespace-nowrap"
        style={{
          backgroundColor: submitted ? "#a3ff00" : "#ff5c8d",
          color: "#0a0a0a",
        }}
      >
        {submitted ? "✓ Subbed!" : "Subscribe"}
      </motion.button>
    </form>
  );
}
