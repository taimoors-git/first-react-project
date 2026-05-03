import { Link, NavLink } from "react-router-dom";
import { CATEGORIES, SEGMENTS } from "../../data/catalog.js";
import { useCart } from "../../context/CartContext.jsx";

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="nav-shell">
      <nav className="bar" aria-label="Primary">
        <Link to="/" className="logo">
          Loom <span className="logo__amp">&amp;</span> Thread
        </Link>

        <div className="bar__center">
          {SEGMENTS.map((seg) => (
            <div key={seg.id} className="nav-dropdown">
              <NavLink
                to={`/${seg.id}`}
                className={({ isActive }) =>
                  `nav-dropdown__trigger${isActive ? " is-active" : ""}`
                }
              >
                {seg.short}
              </NavLink>
              <div className="nav-dropdown__panel" role="menu">
                <div className="nav-dropdown__grid">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      role="menuitem"
                      className="nav-dropdown__link"
                      to={`/shop/${seg.id}/${cat.slug}`}
                    >
                      <span className="nav-dropdown__link-title">{cat.label}</span>
                      <span className="nav-dropdown__link-blurb">{cat.blurb}</span>
                    </Link>
                  ))}
                </div>
                <Link className="nav-dropdown__all" to={`/${seg.id}`}>
                  View all {seg.label.toLowerCase()}
                </Link>
              </div>
            </div>
          ))}
          <NavLink
            to="/shop/men/essentials"
            className={({ isActive }) => `bar__plain${isActive ? " is-active" : ""}`}
          >
            Essentials
          </NavLink>
        </div>

        <div className="bar__actions">
          <label className="search">
            <span className="visually-hidden">Search</span>
            <input type="search" placeholder="Search styles…" autoComplete="off" />
          </label>
          <Link to="/cart" className="cart-link" aria-label={`Cart, ${itemCount} items`}>
            <span className="cart-link__icon" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6h15l-1.5 9h-12L6 6zm0 0L5 3H2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="20" r="1" fill="currentColor" />
                <circle cx="18" cy="20" r="1" fill="currentColor" />
              </svg>
            </span>
            {itemCount > 0 ? (
              <span className="cart-link__badge">{itemCount > 99 ? "99+" : itemCount}</span>
            ) : null}
          </Link>
        </div>
      </nav>
    </header>
  );
}
