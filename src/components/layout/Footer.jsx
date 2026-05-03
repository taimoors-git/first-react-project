import { Link } from "react-router-dom";
import { CATEGORIES, SEGMENTS } from "../../data/catalog.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Loom &amp; Thread</span>
          <p className="footer__tagline">
            Modern wardrobe staples with honest materials and careful fits.
          </p>
        </div>
        <div className="footer__cols">
          <div>
            <h3 className="footer__heading">Shop</h3>
            <ul className="footer__list">
              {SEGMENTS.map((s) => (
                <li key={s.id}>
                  <Link to={`/${s.id}`}>{s.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="footer__heading">Categories</h3>
            <ul className="footer__list">
              {CATEGORIES.flatMap((c) => [
                <li key={`${c.slug}-m`}>
                  <Link to={`/shop/men/${c.slug}`}>Men · {c.label}</Link>
                </li>,
                <li key={`${c.slug}-w`}>
                  <Link to={`/shop/women/${c.slug}`}>Women · {c.label}</Link>
                </li>,
              ])}
            </ul>
          </div>
          <div>
            <h3 className="footer__heading">Help</h3>
            <ul className="footer__list">
              <li>
                <a href="#shipping">Shipping</a>
              </li>
              <li>
                <a href="#returns">Returns</a>
              </li>
              <li>
                <a href="#size">Size guide</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bar">
        <span>© {new Date().getFullYear()} Loom &amp; Thread. Demo storefront.</span>
      </div>
    </footer>
  );
}
