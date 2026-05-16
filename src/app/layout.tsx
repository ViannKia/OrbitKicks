import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import CartDrawer from "@/components/product/CartDrawer";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ORBIT KICKS — Sneakers That Hit Different",
  description:
    "Premium sneakers with ridiculous energy. Step into the future, brutally.",
  icons: {
    icon: "/orbit.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
