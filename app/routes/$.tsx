import { href, Link, useNavigate } from "react-router";

export default function Route404() {
  const navigate = useNavigate();
  const to = href("/");
  return (
    <div>
      <div>
        <h1>404</h1>
        <h2>Error</h2>

        <div>
          <button type="button" onClick={() => navigate(-1)}>
            Go Back
          </button>
          <Link to={to}>Ir para home</Link>
        </div>
      </div>
    </div>
  );
}
