import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CatalogProvider } from "./context/CatalogContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Home from "./pages/Home.jsx";
import SegmentHub from "./pages/SegmentHub.jsx";
import ShopCategory from "./pages/ShopCategory.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./App.css";

export default function App() {
  return (
    <CatalogProvider>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
            </Route>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/men" element={<SegmentHub segment="men" />} />
              <Route path="/women" element={<SegmentHub segment="women" />} />
              <Route path="/shop/:segment/:category" element={<ShopCategory />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </CatalogProvider>
  );
}
