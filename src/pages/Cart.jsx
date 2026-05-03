import { Link } from "react-router-dom";
import { formatPrice } from "../data/catalog.js";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { lines, updateQty, removeLine, subtotal, clearCart } = useCart();

  if (lines.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your bag</h1>
        <div className="cart-empty">
          <p>Your bag is empty—browse segments to add pieces.</p>
          <Link className="btn btn--primary" to="/men">
            Shop men&apos;s
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your bag</h1>
      {lines.map((line) => (
        <div key={line.lineId} className="cart-line">
          <img src={line.image} alt="" />
          <div>
            <Link className="cart-line__title" to={`/product/${line.productId}`}>
              {line.title}
            </Link>
            <p className="cart-line__meta">Size {line.size}</p>
            <div className="qty">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => updateQty(line.lineId, line.qty - 1)}
              >
                −
              </button>
              <span>{line.qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => updateQty(line.lineId, line.qty + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="cart-line__right">
            <div className="cart-line__price">
              {formatPrice(line.priceValue * line.qty)}
            </div>
            <button
              type="button"
              className="remove"
              onClick={() => removeLine(line.lineId)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="cart-summary">
        <div className="cart-summary__row">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="cart-summary__row">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="cart-summary__total">
          <span>Total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <button type="button" className="btn btn--primary" style={{ width: "100%" }}>
          Checkout (demo)
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          style={{ width: "100%", marginTop: "0.5rem" }}
          onClick={clearCart}
        >
          Clear bag
        </button>
      </div>
    </div>
  );
}
