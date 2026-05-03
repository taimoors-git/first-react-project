export function sortProducts(products, sortKey) {
  const list = [...products];
  switch (sortKey) {
    case "price-asc":
      return list.sort((a, b) => a.priceValue - b.priceValue);
    case "price-desc":
      return list.sort((a, b) => b.priceValue - a.priceValue);
    case "name-asc":
      return list.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
    case "name-desc":
      return list.sort((a, b) => b.title.localeCompare(a.title, undefined, { sensitivity: "base" }));
    case "rating-desc":
      return list.sort((a, b) => b.rating - a.rating);
    case "featured":
    default:
      return list;
  }
}

export const SHOP_SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Name: A–Z" },
  { value: "name-desc", label: "Name: Z–A" },
  { value: "rating-desc", label: "Rating: high to low" },
];
