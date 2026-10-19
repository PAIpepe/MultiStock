import { DEPOZITE } from "../App.jsx";

export default function ProdusCard({ produs, onToggle, onDelete }) {
  // Găsim detaliile depozitului pentru a afișa orașul și culoarea etichetei
  const depozitItem = DEPOZITE.find((d) => d.id === produs.locatia);

  return (
    <li className={`item-card ${!produs.in_stoc ? "done" : ""}`}>
      <div className="item-card-content">
        <h3>{produs.titlu}</h3>
        <div className="item-tags">
          <span className={`badge ${depozitItem?.badgeClass || ""}`}>
            📍 {depozitItem?.oras || produs.locatia}
          </span>
          <span className="badge badge-category">
            {produs.categorie}
          </span>
          <span className="badge-qty">{produs.cantitate} buc.</span>
        </div>
      </div>

      <div className="item-card-actions">
        <button
          type="button"
          className={`status-btn ${produs.in_stoc ? "status-ok" : "status-out"}`}
          onClick={() => onToggle(produs.id)}
          title="Comută stocul (În stoc / Epuizat)"
        >
          {produs.in_stoc ? "În stoc" : "Epuizat"}
        </button>
        <button
          type="button"
          className="btn-delete"
          onClick={() => onDelete(produs.id)}
          title="Șterge produs"
          aria-label="Șterge"
        >
          ✕
        </button>
      </div>
    </li>
  );
}