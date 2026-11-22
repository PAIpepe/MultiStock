import { Link } from "react-router-dom";
import { DEPOZITE } from "../depozite.js";
import styles from "./ProdusCard.module.css";

export default function ProdusCard({ produs, onToggle, onDelete }) {
  const depozitItem = DEPOZITE.find((d) => d.id === produs.locatia);

  return (
    <li
      className={`${styles.card} ${!produs.in_stoc ? styles.done : ""}`}
      data-testid="item"
      data-id={produs.id}
    >
      <div className={styles.main}>
        <input
          type="checkbox"
          checked={produs.in_stoc}
          onChange={() => onToggle(produs.id)}
          aria-label={`Marchează ${produs.titlu}`}
          data-testid="item-toggle"
        />
        <div className={styles.content}>
          <Link
            to={`/stocuri/${produs.id}`}
            className={styles.title}
            data-testid="item-link"
          >
            {produs.titlu}
          </Link>
          <div className={styles.tags}>
            <span className={`badge ${depozitItem?.badgeClass || ""}`}>
              📍 {depozitItem?.oras || produs.locatia}
            </span>
            <span className="badge badge-category">{produs.categorie}</span>
            <span className="badge-qty">{produs.cantitate} buc.</span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.btnDelete}
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