import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound">
      <h1>Page not found</h1>
      <p>This URL doesn&apos;t match a segment or product in the demo store.</p>
      <Link className="btn btn--primary" to="/">
        Back to home
      </Link>
    </div>
  );
}
