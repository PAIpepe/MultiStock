import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section
      className="panel"
      data-testid="not-found"
      style={{ maxWidth: "560px", margin: "0 auto" }}
    >
      <h2>404 — Pagina nu există</h2>
      <p className="info">Adresa cerută nu duce nicăieri.</p>
      <Link to="/">← Înapoi la inventar</Link>
    </section>
  );
}