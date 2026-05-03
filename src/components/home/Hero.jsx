import { Link } from "react-router-dom";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&auto=format&fit=crop&q=80";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">New season · Built to layer</p>
        <h1 className="hero__title">Clarity in every seam.</h1>
        <p className="hero__lede">
          Shop men&apos;s and women&apos;s clothing—from polos and formal shirts to denim,
          shorts, footwear, and everyday essentials.
        </p>
        <div className="hero__ctas">
          <Link className="btn btn--primary" to="/men">
            Shop men&apos;s
          </Link>
          <Link className="btn btn--ghost" to="/women">
            Shop women&apos;s
          </Link>
        </div>
        <ul className="hero__stats">
          <li>
            <strong>Free</strong> returns 30 days
          </li>
          <li>
            <strong>Carbon-neutral</strong> shipping
          </li>
          <li>
            <strong>4.8</strong> average rating
          </li>
        </ul>
      </div>
      <div className="hero__visual" aria-hidden>
        <div className="hero__orb" />
        <img className="hero__img" src={HERO_IMAGE} alt="" />
      </div>
    </section>
  );
}
