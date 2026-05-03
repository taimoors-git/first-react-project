import { SHOP_SORT_OPTIONS } from "../../utils/sortProducts.js";

export default function ShopToolbar({
  sortBy,
  onSortChange,
  viewMode,
  onViewChange,
  resultCount,
}) {
  return (
    <div className="shop-toolbar">
      <p className="shop-toolbar__count" aria-live="polite">
        <strong>{resultCount}</strong> {resultCount === 1 ? "item" : "items"}
      </p>
      <div className="shop-toolbar__controls">
        <label className="shop-toolbar__sort">
          <span className="shop-toolbar__sort-label">Sort by</span>
          <select
            className="shop-toolbar__select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {SHOP_SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <div className="view-toggle" role="group" aria-label="View layout">
          <button
            type="button"
            className={`view-toggle__btn${viewMode === "grid" ? " is-active" : ""}`}
            onClick={() => onViewChange("grid")}
            aria-pressed={viewMode === "grid"}
            title="Grid view"
          >
            <span className="visually-hidden">Grid view</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <button
            type="button"
            className={`view-toggle__btn${viewMode === "list" ? " is-active" : ""}`}
            onClick={() => onViewChange("list")}
            aria-pressed={viewMode === "list"}
            title="List view"
          >
            <span className="visually-hidden">List view</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 6h16M4 12h16M4 18h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
