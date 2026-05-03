import { CATEGORIES, SEGMENTS, filterProducts } from "../data/catalog.js";
import { useCart } from "../context/CartContext.jsx";
import { useCatalog } from "../context/CatalogContext.jsx";
import Hero from "../components/home/Hero.jsx";
import SegmentTiles from "../components/home/SegmentTiles.jsx";
import CategoryShowcase from "../components/home/CategoryShowcase.jsx";
import EditorPicks from "../components/home/EditorPicks.jsx";

export default function Home() {
  const { products } = useCatalog();
  const { addToCart } = useCart();
  const featured = filterProducts(products, {})
    .filter((p) => p.badge)
    .slice(0, 4);
  const fallbackFeatured = filterProducts(products, {}).slice(0, 4);
  const picks = featured.length ? featured : fallbackFeatured;

  return (
    <>
      <Hero />
      <SegmentTiles segments={SEGMENTS} />
      <CategoryShowcase categories={CATEGORIES} />
      <EditorPicks products={picks} onAddToCart={addToCart} />
    </>
  );
}
