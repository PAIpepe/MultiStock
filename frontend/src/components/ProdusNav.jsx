export default function ProdusNav({ pagina, setPagina }) {
  return (
    <nav className="main-navbar" style={{ display: "flex", justifyContent: "center", gap: "1rem", padding: "1rem", borderBottom: "1px solid var(--border)" }}>
      <button 
        className={pagina === "acasa" ? "btn-primary" : "btn-reset"} 
        onClick={() => setPagina("acasa")}
      >
        🏠 Acasă (Harta)
      </button>
      <button 
        className={pagina === "inventar" ? "btn-primary" : "btn-reset"} 
        onClick={() => setPagina("inventar")}
      >
        📋 Inventar & Formular
      </button>
    </nav>
  );
}