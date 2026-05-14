import type { SneakerType } from "@/types";

export const products: SneakerType[] = [
  {
    id: "1",
    name: "Air Jordan 1 Retro High OG Pro Green",
    slug: "air-jordan-1-retro-high-og-pro-green",
    price: 180,
    imageUrl: "/images/air-jordan-1-retro-high-og-pro-green/AJ1RetroOG-ProGreen (1).png",
    images: [
      "/images/air-jordan-1-retro-high-og-pro-green/AJ1RetroOG-ProGreen (1).png",
      "/images/air-jordan-1-retro-high-og-pro-green/AJ1RetroOG-ProGreen (2).png",
      "/images/air-jordan-1-retro-high-og-pro-green/AJ1RetroOG-ProGreen (3).png",
      "/images/air-jordan-1-retro-high-og-pro-green/AJ1RetroOG-ProGreen (4).png",
      "/images/air-jordan-1-retro-high-og-pro-green/AJ1RetroOG-ProGreen (5).png",
    ],
    description:
      "The Air Jordan 1 Retro High OG Pro Green brings back the iconic silhouette with a fresh pine green colorway. Premium leather upper with classic colorblocking delivers timeless style.",
    sizes: [7, 8, 9, 10, 11, 12],
  },
  {
    id: "2",
    name: "Nike Air Force 1 Low Proto",
    slug: "air-force-1-proto",
    price: 150,
    imageUrl: "/images/air-force-1-proto/AF1Low-Proto (1).png",
    images: [
      "/images/air-force-1-proto/AF1Low-Proto (1).png",
      "/images/air-force-1-proto/AF1Low-Proto (2).png",
      "/images/air-force-1-proto/AF1Low-Proto (3).png",
      "/images/air-force-1-proto/AF1Low-Proto (4).png",
      "/images/air-force-1-proto/AF1Low-Proto (5).png",
    ],
    description:
      "The Air Force 1 Low Proto reimagines the classic with deconstructed details and experimental materials. A modern take on the timeless silhouette.",
    sizes: [7, 8, 9, 10, 11, 12],
  },
  {
    id: "3",
    name: "Air Jordan 1 Low",
    slug: "air-jordan-1-low",
    price: 120,
    imageUrl: "/images/air-jordan-1-low/AJ1-LOW (1).png",
    images: [
      "/images/air-jordan-1-low/AJ1-LOW (1).png",
      "/images/air-jordan-1-low/AJ1-LOW (2).png",
      "/images/air-jordan-1-low/AJ1-LOW (3).png",
      "/images/air-jordan-1-low/AJ1-LOW (4).png",
      "/images/air-jordan-1-low/AJ1-LOW (5).png",
    ],
    description:
      "The Air Jordan 1 Low brings the iconic AJ1 silhouette closer to the ground. Clean colorways, premium leather, and the classic Wings logo make this a wardrobe essential.",
    sizes: [7, 8, 9, 10, 11, 12],
  },
];

export function getProductBySlug(slug: string): SneakerType | undefined {
  return products.find((p) => p.slug === slug);
}
