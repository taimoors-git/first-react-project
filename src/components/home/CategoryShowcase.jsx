import { Link } from "react-router-dom";
import SectionHeader from "../common/SectionHeader.jsx";

export default function CategoryShowcase({ categories }) {
  return (
    <section className="section">
      <SectionHeader
        title="Categories"
        lede="Shirts, tees, polos, formal shirts, bottoms, jeans, trousers, shorts, footwear, and essentials."
      />
      <div className="category-grid">
        {categories.map((c) => (
          <article key={c.slug} className="category-card">
            <Link className="category-card__media" to={`/shop/men/${c.slug}`}>
              <img src={c.cover} alt="" />
              <span className="category-card__badge">Men</span>
            </Link>
            <div className="category-card__body">
              <h3 className="category-card__title">{c.label}</h3>
              <p className="category-card__blurb">{c.blurb}</p>
              <div className="category-card__links">
                <Link to={`/shop/men/${c.slug}`}>Men</Link>
                <span className="category-card__dot"> &middot; </span>
                <Link to={`/shop/women/${c.slug}`}>Women</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
