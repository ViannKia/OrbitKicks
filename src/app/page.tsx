import Hero from "@/components/layouts/Hero";
import WhySection from "@/components/layouts/WhySection";
import ProductGrid from "@/components/product/ProductGrid";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid products={products} />
      <WhySection />
    </>
  );
}
