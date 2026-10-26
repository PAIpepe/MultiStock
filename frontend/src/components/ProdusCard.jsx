import { DEPOZITE } from "../App.jsx";

export default function ProdusCard({ produs, onToggle, onDelete }) {
  // Găsim detaliile depozitului pentru a afișa orașul și culoarea etichetei
  const depozitItem = DEPOZITE.find((d) => d.id === produs.locatia);

  return (
    <li className={`item-card ${!produs.in_stoc ? "done" : ""}`}>
      <label className="item-card-main" style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", width: "100%" }}>
        <input
          type="checkbox"
          checked={produs.in_stoc}
          onChange={() => onToggle(produs.id)}
          style={{ width: "18px", height: "18px", cursor: "pointer" }}
        />
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
      </label>

      <div className="item-card-actions">
        <button
          type="button"
          className="btn-delete"
          onClick={() => onDelete(produs.id)}
          title="Șterge produs"
          aria-label={`Șterge ${produs.titlu}`}
        >
          ✕
        </button>
      </div>
    </li>
  );
}