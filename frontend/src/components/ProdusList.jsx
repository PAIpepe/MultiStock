import ProdusCard from "./ProdusCard.jsx";
import styles from "./ProdusList.module.css";

export default function ProdusList({ produse, onToggle, onDelete }) {
  if (produse.length === 0) {
    return (
      <p className="empty" data-testid="empty">
        Nu există niciun produs în această listă.
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {produse.map((produs) => (
        <ProdusCard
          key={produs.id}
          produs={produs}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}