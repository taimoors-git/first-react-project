import { Link } from "react-router-dom";

export default function ProductCard({
  productId,
  image,
  title,
  subtitle,
  price,
  compareAtPrice,
  rating,
  badge,
  stock = 999,
  index = 0,
  onAddToCart,
  layout = "grid",
}) {
  const outOfStock = stock <= 0;
  const stars =
    "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));

  const main = (
    <>
      <div className="product-card__media">
        {outOfStock ? (
          <span className="product-card__badge product-card__badge--muted">Out of stock</span>
        ) : badge ? (
          <span className="product-card__badge">{badge}</span>
        ) : null}
        <div className="product-card__shine" aria-hidden />
        <img src={image} alt="" />
      </div>
      <div className="product-card__main-text">
        <p className="product-card__rating" aria-label={`${rating} out of 5 stars`}>
          {stars}
        </p>
        <h2 className="product-card__title">{title}</h2>
        <p className="product-card__subtitle">{subtitle}</p>
      </div>
    </>
  );

  const cardClass =
    layout === "list" ? "product-card product-card--list" : "product-card";

  return (
    <article className={cardClass} style={{ "--stagger": `${index * 0.07}s` }}>
      {productId ? (
        <Link to={`/product/${productId}`} className="product-card__tap">
          {main}
        </Link>
      ) : (
        <div className="product-card__tap product-card__tap--static">{main}</div>
      )}
      <div className="product-card__footer">
        <div className="product-card__prices">
          <span className="product-card__price">{price}</span>
          {compareAtPrice ? (
            <span className="product-card__compare">{compareAtPrice}</span>
          ) : null}
        </div>
        <button
          type="button"
          className="product-card__cta"
          onClick={onAddToCart}
          disabled={outOfStock}
        >
          {outOfStock ? "Unavailable" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
