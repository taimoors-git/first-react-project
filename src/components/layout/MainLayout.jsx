import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import SaleBanner from "./SaleBanner.jsx";

export default function MainLayout() {
  return (
    <div className="site">
      <SaleBanner />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
