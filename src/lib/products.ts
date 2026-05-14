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
  {
    id: "4",
    name: "Air Jordan 3 Retro White and Orange Peel",
    slug: "air-jordan-3-retro-white-and-orange-peel",
    price: 200,
    imageUrl: "/images/air-jordan-3-retro-white-and-orange-peel/AJ3-Retro-White and Orange Peel (1).png",
    images: [
      "/images/air-jordan-3-retro-white-and-orange-peel/AJ3-Retro-White and Orange Peel (1).png",
      "/images/air-jordan-3-retro-white-and-orange-peel/AJ3-Retro-White and Orange Peel (2).png",
      "/images/air-jordan-3-retro-white-and-orange-peel/AJ3-Retro-White and Orange Peel (3).png",
      "/images/air-jordan-3-retro-white-and-orange-peel/AJ3-Retro-White and Orange Peel (4).png",
      "/images/air-jordan-3-retro-white-and-orange-peel/AJ3-Retro-White and Orange Peel (5).png",
    ],
    description:
      "The Air Jordan 3 Retro returns with a striking white and orange peel colorway. This classic silhouette features the iconic elephant print and Jumpman logo.",
    sizes: [7, 8, 9, 10, 11, 12],
  },
  {
    id: "5",
    name: "Nike Air Max Laser90",
    slug: "air-max-laser90",
    price: 160,
    imageUrl: "/images/air-max-laser90/AM-Laser90 (1).png",
    images: [
      "/images/air-max-laser90/AM-Laser90 (1).png",
      "/images/air-max-laser90/AM-Laser90 (2).png",
      "/images/air-max-laser90/AM-Laser90 (3).png",
      "/images/air-max-laser90/AM-Laser90 (4).png",
      "/images/air-max-laser90/AM-Laser90 (5).png",
    ],
    description:
      "The Nike Air Max Laser90 combines retro Air Max DNA with modern laser-cut details. Lightweight cushioning and bold colorways make this a standout choice.",
    sizes: [7, 8, 9, 10, 11, 12],
  },
  {
    id: "6",
    name: "Nike Alphafly 3",
    slug: "alphafly-3",
    price: 250,
    imageUrl: "/images/alphafly-3/A3 (1).png",
    images: [
      "/images/alphafly-3/A3 (1).png",
      "/images/alphafly-3/A3 (2).png",
      "/images/alphafly-3/A3 (3).png",
      "/images/alphafly-3/A3 (4).png",
      "/images/alphafly-3/A3 (5).png",
    ],
    description:
      "The Nike Alphafly 3 is engineered for speed with advanced cushioning technology. Built for runners who demand peak performance and cutting-edge design.",
    sizes: [7, 8, 9, 10, 11, 12],
  },
  {
    id: "7",
    name: "Nike P6000",
    slug: "p6000",
    price: 140,
    imageUrl: "/images/p6000/P6000 (1).png",
    images: [
      "/images/p6000/P6000 (1).png",
      "/images/p6000/P6000 (2).png",
      "/images/p6000/P6000 (3).png",
      "/images/p6000/P6000 (4).png",
      "/images/p6000/P6000 (5).png",
    ],
    description:
      "The Nike P6000 brings retro running aesthetics with modern comfort. Premium materials and classic Nike styling make this a timeless choice.",
    sizes: [7, 8, 9, 10, 11, 12],
  },
];

export function getProductBySlug(slug: string): SneakerType | undefined {
  return products.find((p) => p.slug === slug);
}
