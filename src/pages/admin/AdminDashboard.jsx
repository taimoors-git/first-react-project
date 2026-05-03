import { useMemo, useState } from "react";
import {
  CATEGORIES,
  SEGMENTS,
  formatPrice,
  normalizeProductInput,
} from "../../data/catalog.js";
import { useCatalog } from "../../context/CatalogContext.jsx";

function emptyForm() {
  return {
    id: "",
    title: "",
    subtitle: "",
    description: "",
    image: "",
    priceValue: "49",
    compareAtValue: "",
    stock: "10",
    rating: "4",
    badge: "",
    segment: "men",
    category: "shirts",
  };
}

function productToForm(p) {
  return {
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    description: p.description ?? "",
    image: p.image,
    priceValue: String(p.priceValue),
    compareAtValue:
      p.compareAtValue != null && p.compareAtValue !== ""
        ? String(p.compareAtValue)
        : "",
    stock: String(p.stock ?? 0),
    rating: String(p.rating),
    badge: p.badge ?? "",
    segment: p.segment,
    category: p.category,
  };
}

export default function AdminDashboard() {
  const { products, updateProduct, addProduct, deleteProduct, resetToSeed } =
    useCatalog();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q)
    );
  }, [products, search]);

  const sortedList = useMemo(
    () => [...filtered].sort((a, b) => a.title.localeCompare(b.title)),
    [filtered]
  );

  function showMessage(text) {
    setMessage(text);
    setTimeout(() => setMessage(null), 3200);
  }

  function handleNew() {
    setEditingId(null);
    setForm(emptyForm());
  }

  function handleEdit(p) {
    setEditingId(p.id);
    setForm(productToForm(p));
  }

  function handleDelete(id) {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    if (
      !window.confirm(
        `Remove “${p.title}” from the catalog? This cannot be undone.`
      )
    ) {
      return;
    }
    deleteProduct(id);
    if (editingId === id) handleNew();
    showMessage("Product removed.");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editingId) {
      const patch = normalizeProductInput({
        ...form,
        id: editingId,
      });
      updateProduct(editingId, patch);
      showMessage("Product updated.");
    } else {
      addProduct({
        ...form,
        id: form.id.trim() || undefined,
      });
      showMessage("Product added.");
      handleNew();
    }
  }

  function handleResetCatalog() {
    if (
      !window.confirm(
        "Reset all products to the built-in demo data? Your edits in this browser will be cleared."
      )
    ) {
      return;
    }
    resetToSeed();
    handleNew();
    showMessage("Catalog reset to defaults.");
  }

  return (
    <div className="admin-dashboard">
      {message ? (
        <div className="admin-toast" role="status">
          {message}
        </div>
      ) : null}
      <div className="admin-dashboard__grid">
        <section className="admin-panel admin-panel--list">
          <div className="admin-panel__head">
            <h1 className="admin-panel__title">Products</h1>
            <p className="admin-panel__lede">
              {products.length} SKUs · stored in this browser (localStorage).
            </p>
            <div className="admin-toolbar">
              <input
                type="search"
                className="admin-search"
                placeholder="Search title or ID…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Filter products"
              />
              <button type="button" className="btn btn--primary admin-btn" onClick={handleNew}>
                New product
              </button>
              <button
                type="button"
                className="btn btn--ghost admin-btn"
                onClick={handleResetCatalog}
              >
                Reset demo data
              </button>
            </div>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Product</th>
                  <th scope="col">Segment</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="admin-table__empty">
                      No products match this filter.
                    </td>
                  </tr>
                ) : null}
                {sortedList.map((p) => (
                  <tr key={p.id} className={editingId === p.id ? "is-selected" : ""}>
                    <td>
                      <img
                        className="admin-table__thumb"
                        src={p.image}
                        alt=""
                      />
                    </td>
                    <td>
                      <div className="admin-table__title">{p.title}</div>
                      <div className="admin-table__meta">{p.id}</div>
                    </td>
                    <td>
                      {p.segment} · {p.category}
                    </td>
                    <td>{formatPrice(p.priceValue)}</td>
                    <td>
                      <span
                        className={
                          p.stock <= 0
                            ? "admin-stock admin-stock--out"
                            : "admin-stock"
                        }
                      >
                        {p.stock}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table__actions">
                        <button
                          type="button"
                          className="admin-link-btn"
                          onClick={() => handleEdit(p)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="admin-link-btn admin-link-btn--danger"
                          onClick={() => handleDelete(p.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="admin-panel admin-panel--form">
          <h2 className="admin-form__title">
            {editingId ? "Edit product" : "Add product"}
          </h2>
          <form className="admin-form" onSubmit={handleSubmit}>
            <label className="admin-field">
              <span className="admin-field__label">Product ID / SKU</span>
              <input
                className="admin-input"
                value={form.id}
                onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
                disabled={Boolean(editingId)}
                placeholder="e.g. m-tee-01 (auto if empty)"
                required={false}
              />
              {editingId ? (
                <span className="admin-field__hint">ID cannot be changed after creation.</span>
              ) : null}
            </label>

            <label className="admin-field">
              <span className="admin-field__label">Title</span>
              <input
                className="admin-input"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
              />
            </label>

            <label className="admin-field">
              <span className="admin-field__label">Subtitle</span>
              <input
                className="admin-input"
                value={form.subtitle}
                onChange={(e) =>
                  setForm((f) => ({ ...f, subtitle: e.target.value }))
                }
              />
            </label>

            <label className="admin-field">
              <span className="admin-field__label">Details (long description)</span>
              <textarea
                className="admin-textarea"
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
              />
            </label>

            <label className="admin-field">
              <span className="admin-field__label">Image URL</span>
              <input
                className="admin-input"
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                required
              />
            </label>

            <div className="admin-field-row">
              <label className="admin-field">
                <span className="admin-field__label">Price ($)</span>
                <input
                  className="admin-input"
                  type="number"
                  min="0"
                  step="1"
                  value={form.priceValue}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, priceValue: e.target.value }))
                  }
                  required
                />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">Compare-at ($)</span>
                <input
                  className="admin-input"
                  type="number"
                  min="0"
                  step="1"
                  value={form.compareAtValue}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, compareAtValue: e.target.value }))
                  }
                  placeholder="Optional"
                />
              </label>
            </div>

            <div className="admin-field-row">
              <label className="admin-field">
                <span className="admin-field__label">Stock</span>
                <input
                  className="admin-input"
                  type="number"
                  min="0"
                  step="1"
                  value={form.stock}
                  onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                  required
                />
              </label>
              <label className="admin-field">
                <span className="admin-field__label">Rating (0–5)</span>
                <input
                  className="admin-input"
                  type="number"
                  min="0"
                  max="5"
                  step="1"
                  value={form.rating}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, rating: e.target.value }))
                  }
                />
              </label>
            </div>

            <label className="admin-field">
              <span className="admin-field__label">Badge (optional)</span>
              <input
                className="admin-input"
                value={form.badge}
                onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
                placeholder="Sale, New, Limited…"
              />
            </label>

            <div className="admin-field-row">
              <label className="admin-field">
                <span className="admin-field__label">Segment</span>
                <select
                  className="admin-input"
                  value={form.segment}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, segment: e.target.value }))
                  }
                >
                  {SEGMENTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="admin-field">
                <span className="admin-field__label">Category</span>
                <select
                  className="admin-input"
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="admin-form__actions">
              <button type="submit" className="btn btn--primary">
                {editingId ? "Save changes" : "Add to catalog"}
              </button>
              {editingId ? (
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={handleNew}
                >
                  Cancel edit
                </button>
              ) : null}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
