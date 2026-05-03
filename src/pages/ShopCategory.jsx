import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ProductCard from "../components/product/ProductCard.jsx";
import ShopToolbar from "../components/shop/ShopToolbar.jsx";
import {
  filterProducts,
  formatPrice,
  getCategory,
  getSegment,
  isValidShopPath,
} from "../data/catalog.js";
import { useCart } from "../context/CartContext.jsx";
import { useCatalog } from "../context/CatalogContext.jsx";
import { sortProducts } from "../utils/sortProducts.js";

export default function ShopCategory() {
  const { segment, category: categorySlug } = useParams();
  const { products } = useCatalog();
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");

  const items = useMemo(() => {
    if (!isValidShopPath(segment, categorySlug)) return [];
    return filterProducts(products, { segment, category: categorySlug });
  }, [products, segment, categorySlug]);

  const sortedItems = useMemo(() => sortProducts(items, sortBy), [items, sortBy]);

  if (!isValidShopPath(segment, categorySlug)) {
    return <Navigate to="/" replace />;
  }

  const seg = getSegment(segment);
  const cat = getCategory(categorySlug);

  const gridClass =
    viewMode === "list" ? "catalog__grid catalog__grid--list" : "catalog__grid";

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={`/${segment}`}>{seg.label}</Link>
        <span>/</span>
        <span aria-current="page">{cat.label}</span>
      </nav>
      <header className="shop-head">
        <h1>
          {cat.label} · {seg.short}
        </h1>
        <p>
          {items.length} {items.length === 1 ? "style" : "styles"} · {cat.blurb}
        </p>
      </header>
      <ShopToolbar
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewChange={setViewMode}
        resultCount={sortedItems.length}
      />
      <section className="catalog">
        <div className={gridClass}>
          {sortedItems.map((p, idx) => (
            <ProductCard
              key={p.id}
              productId={p.id}
              image={p.image}
              title={p.title}
              subtitle={p.subtitle}
              price={formatPrice(p.priceValue)}
              compareAtPrice={
                p.compareAtValue ? formatPrice(p.compareAtValue) : undefined
              }
              rating={p.rating}
              badge={p.badge}
              stock={p.stock}
              index={idx}
              layout={viewMode}
              onAddToCart={() => addToCart(p)}
            />
          ))}
        </div>
      </section>
    </>
  );
}
