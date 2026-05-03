import { Link } from "react-router-dom";
import SectionHeader from "../common/SectionHeader.jsx";

export default function SegmentTiles({ segments }) {
  return (
    <section className="section">
      <SectionHeader
        title="Shop by segment"
        lede="Choose a department to browse every category."
      />
      <div className="segment-grid">
        {segments.map((s) => (
          <Link key={s.id} className="segment-tile" to={`/${s.id}`}>
            <div className="segment-tile__bg" />
            <span className="segment-tile__label">{s.label}</span>
            <span className="segment-tile__hint">Explore categories</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
