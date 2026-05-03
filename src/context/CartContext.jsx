import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useCatalog } from "./CatalogContext.jsx";

const CartContext = createContext(null);

function makeLineId(productId, size) {
  return `${productId}::${size}`;
}

export function CartProvider({ children }) {
  const { products } = useCatalog();
  const [lines, setLines] = useState([]);

  const stockFor = useCallback(
    (productId) => products.find((p) => p.id === productId)?.stock ?? 0,
    [products]
  );

  const addToCart = useCallback(
    (product, { size = "M", qty = 1 } = {}) => {
      const maxStock = stockFor(product.id);
      if (maxStock <= 0) return;

      const lineId = makeLineId(product.id, size);
      setLines((prev) => {
        const idx = prev.findIndex((l) => l.lineId === lineId);
        const existingQty = idx >= 0 ? prev[idx].qty : 0;
        const room = Math.max(0, maxStock - existingQty);
        const addQty = Math.min(qty, room);
        if (addQty <= 0) return prev;

        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: existingQty + addQty };
          return next;
        }
        return [
          ...prev,
          {
            lineId,
            productId: product.id,
            title: product.title,
            image: product.image,
            priceValue: product.priceValue,
            size,
            qty: addQty,
          },
        ];
      });
    },
    [stockFor]
  );

  const updateQty = useCallback(
    (lineId, qty) => {
      setLines((prev) => {
        const line = prev.find((l) => l.lineId === lineId);
        if (!line) return prev;
        const maxStock = stockFor(line.productId);
        const clamped = Math.min(Math.max(0, qty), maxStock);
        if (clamped <= 0) return prev.filter((l) => l.lineId !== lineId);
        return prev.map((l) =>
          l.lineId === lineId ? { ...l, qty: clamped } : l
        );
      });
    },
    [stockFor]
  );

  const removeLine = useCallback((lineId) => {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty, 0),
    [lines]
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.priceValue * l.qty, 0),
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      addToCart,
      updateQty,
      removeLine,
      clearCart,
      itemCount,
      subtotal,
    }),
    [lines, addToCart, updateQty, removeLine, clearCart, itemCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/** Hook for cart state; lives alongside provider for a single module boundary. */
// eslint-disable-next-line react-refresh/only-export-components -- useCart is tied to CartProvider
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
