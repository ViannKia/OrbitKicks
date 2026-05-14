import { notFound } from "next/navigation";

import ProductDetailClient from "@/components/product/ProductDetailClient";
import { getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailClient
      product={product}
      formattedPrice={formatPrice(product.price)}
    />
  );
}
