import { Link, Navigate } from "react-router-dom";
import { CATEGORIES, getSegment } from "../data/catalog.js";

export default function SegmentHub({ segment: segmentId }) {
  const seg = getSegment(segmentId);

  if (!seg) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="hub-hero">
        <h1 className="hub-hero__title">{seg.label}</h1>
        <p className="hub-hero__lede">
          Browse shirts, t-shirts, polos, formal shirts, bottoms, jeans, trousers,
          shorts, footwear, and essentials—curated for this segment.
        </p>
      </div>
      <section className="section">
        <div className="category-grid">
          {CATEGORIES.map((c) => (
            <article key={c.slug} className="category-card">
              <Link
                className="category-card__media"
                to={`/shop/${segmentId}/${c.slug}`}
              >
                <img src={c.cover} alt="" />
              </Link>
              <div className="category-card__body">
                <h2 className="category-card__title">{c.label}</h2>
                <p className="category-card__blurb">{c.blurb}</p>
                <div className="category-card__links">
                  <Link to={`/shop/${segmentId}/${c.slug}`}>Shop now</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
