import ProdusCard from "./ProdusCard.jsx";

export default function ProdusList({ produse, onToggle, onDelete }) {
  // 1. Randare condiționată dacă lista este goală
  if (produse.length === 0) {
    return (
      <p className="empty-msg">
        Nu există produse înregistrate pentru filtrul selectat.
      </p>
    );
  }
  return (
    <ul className="item-list">
      {produse.map((item) => (
        <ProdusCard
          key={item.id}
          produs={item}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}