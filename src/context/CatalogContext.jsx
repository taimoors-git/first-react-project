import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { INITIAL_PRODUCTS, normalizeProductInput } from "../data/catalog.js";

const STORAGE_KEY = "loom-thread-catalog-v1";

const CatalogContext = createContext(null);

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.map((row) => normalizeProductInput({ ...row, id: row.id }));
  } catch {
    return null;
  }
}

export function CatalogProvider({ children }) {
  const [products, setProducts] = useState(() => {
    const stored = loadFromStorage();
    if (stored && stored.length) return stored;
    return INITIAL_PRODUCTS.map((p) => normalizeProductInput(p));
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      /* ignore quota */
    }
  }, [products]);

  const updateProduct = useCallback((id, patch) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? normalizeProductInput({ ...p, ...patch, id: p.id }) : p
      )
    );
  }, []);

  const addProduct = useCallback((raw) => {
    setProducts((prev) => {
      let row = normalizeProductInput({
        ...raw,
        id: raw.id || `new-${Date.now()}`,
      });
      while (prev.some((p) => p.id === row.id)) {
        row = { ...row, id: `new-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
      }
      return [...prev, row];
    });
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const resetToSeed = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProducts(INITIAL_PRODUCTS.map((p) => normalizeProductInput(p)));
  }, []);

  const value = useMemo(
    () => ({
      products,
      updateProduct,
      addProduct,
      deleteProduct,
      resetToSeed,
    }),
    [products, updateProduct, addProduct, deleteProduct, resetToSeed]
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- paired with CatalogProvider
export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}
