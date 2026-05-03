import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  formatPrice,
  getCategory,
  getProductById,
  getSegment,
} from "../data/catalog.js";
import { useCart } from "../context/CartContext.jsx";
import { useCatalog } from "../context/CatalogContext.jsx";

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useCatalog();
  const product = getProductById(products, id);
  const { addToCart } = useCart();
  const [size, setSize] = useState("M");

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const seg = getSegment(product.segment);
  const cat = getCategory(product.category);
  const stars =
    "★".repeat(Math.round(product.rating)) +
    "☆".repeat(5 - Math.round(product.rating));
  const outOfStock = product.stock <= 0;
  const detailCopy =
    product.description?.trim() ||
    "Designed for daily wear with a clean silhouette and dependable fabric hand-feel. Pair with pieces from the same segment for a full look.";

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={`/${product.segment}`}>{seg.label}</Link>
        <span>/</span>
        <Link to={`/shop/${product.segment}/${product.category}`}>
          {cat.label}
        </Link>
        <span>/</span>
        <span aria-current="page">{product.title}</span>
      </nav>
      <div className="pdp">
        <div className="pdp__gallery">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="pdp__panel">
          {product.badge && !outOfStock ? (
            <p className="hero__eyebrow" style={{ marginBottom: "0.5rem" }}>
              {product.badge}
            </p>
          ) : null}
          {outOfStock ? (
            <p className="pdp__stock pdp__stock--out">Out of stock</p>
          ) : (
            <p className="pdp__stock">{product.stock} in stock</p>
          )}
          <h1>{product.title}</h1>
          <p className="pdp__rating" aria-label={`${product.rating} out of 5`}>
            {stars}
          </p>
          <div className="pdp__price-row">
            <span className="pdp__price">{formatPrice(product.priceValue)}</span>
            {product.compareAtValue ? (
              <span className="pdp__compare">
                {formatPrice(product.compareAtValue)}
              </span>
            ) : null}
          </div>
          <p className="pdp__copy">{product.subtitle}</p>
          <p className="pdp__copy">{detailCopy}</p>
          <div className="pdp__field">
            <span className="pdp__label">Size</span>
            <div className="size-row">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`size-chip${size === s ? " is-selected" : ""}`}
                  onClick={() => setSize(s)}
                  disabled={outOfStock}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="pdp__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => addToCart(product, { size })}
              disabled={outOfStock}
            >
              {outOfStock ? "Out of stock" : "Add to bag"}
            </button>
            <Link className="btn btn--ghost" to={`/shop/${product.segment}/${product.category}`}>
              Back to {cat.label}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
