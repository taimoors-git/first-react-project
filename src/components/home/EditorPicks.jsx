import ProductCard from "../product/ProductCard.jsx";
import SectionHeader from "../common/SectionHeader.jsx";
import { formatPrice } from "../../data/catalog.js";

export default function EditorPicks({ products, onAddToCart }) {
  return (
    <section className="section catalog">
      <SectionHeader
        className="catalog__header"
        titleClassName="catalog__title"
        ledeClassName="catalog__lede"
        title="Editor's picks"
        lede="Rotating highlights from this week."
      />
      <div className="catalog__grid">
        {products.map((p, idx) => (
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
            onAddToCart={() => onAddToCart(p)}
          />
        ))}
      </div>
    </section>
  );
}
