import { DEPOZITE } from "../depozite.js";

export default function ProdusCard({ produs, onToggle, onDelete }) {
  const depozitItem = DEPOZITE.find((d) => d.id === produs.locatia);

  return (
    <li 
      className={`item-card ${!produs.in_stoc ? "done" : ""}`}
      data-testid="item"
      data-id={produs.id}
    >
      <label className="item-card-main" style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", width: "100%" }}>
        <input
          type="checkbox"
          checked={produs.in_stoc}
          onChange={() => onToggle(produs.id)}
          style={{ width: "18px", height: "18px", cursor: "pointer" }}
          data-testid="item-toggle"
        />
        <div className="item-card-content">
          <h3 data-testid="item-title">{produs.titlu}</h3>
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
          data-testid="item-delete"
        >
          ✕
        </button>
      </div>
    </li>
  );
}