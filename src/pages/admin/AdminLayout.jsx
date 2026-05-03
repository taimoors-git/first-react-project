import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="admin-app">
      <header className="admin-top">
        <div className="admin-top__inner">
          <Link to="/admin" className="admin-top__brand">
            Loom <span className="admin-top__amp">&amp;</span> Thread · Admin
          </Link>
          <nav className="admin-top__nav">
            <Link to="/">View storefront</Link>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
