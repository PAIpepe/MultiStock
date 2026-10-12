import { useState, useId } from "react";
import hartaSvg from "./assets/harta.svg";

// Definiția depozitelor cu coordonate pe SVG-ul României și informații despre județe
export const DEPOZITE = [
  {
    id: "bucuresti",
    nume: "Depozit București",
    oras: "București",
    judet: "București / Ilfov",
    adresa: "Șos. de Centură nr. 42, Sector 4",
    coords: { top: 75.3, left: 61.6 },
    culoare: "#0d9488",
    badgeClass: "badge-bucuresti",
  },
  {
    id: "cluj",
    nume: "Depozit Cluj",
    oras: "Cluj-Napoca",
    judet: "Cluj",
    adresa: "B-dul Muncii nr. 18, Tetarom I",
    coords: { top: 33.5, left: 36.8 },
    culoare: "#d97706",
    badgeClass: "badge-cluj",
  },
  {
    id: "timisoara",
    nume: "Depozit Timișoara",
    oras: "Timișoara",
    judet: "Timiș",
    adresa: "Calea Șagului km 7, Parc Industrial",
    coords: { top: 54.5, left: 14.0 },
    culoare: "#8b5cf6",
    badgeClass: "badge-timisoara",
  },
  {
    id: "pitesti",
    nume: "Depozit Pitești",
    oras: "Pitești",
    judet: "Argeș",
    adresa: "DN65B, Comuna Bradu, Argeș",
    coords: { top: 67.2, left: 48.5 },
    culoare: "#ec4899",
    badgeClass: "badge-pitesti",
  },
  {
    id: "iasi",
    nume: "Depozit Iași",
    oras: "Iași",
    judet: "Iași",
    adresa: "Calea Chișinăului nr. 132",
    coords: { top: 26.2, left: 73.8 },
    culoare: "#6366f1",
    badgeClass: "badge-iasi",
  },
];

export const CATEGORII = ["Electronice", "Birotică", "Echipamente"];

// Date inițiale conforme cu modelul de date din README.md
const DATE_INITIALE = [
  {
    id: 1,
    titlu: "Laptop Dell XPS 15",
    locatia: "bucuresti",
    categorie: "Electronice",
    cantitate: 14,
    in_stoc: true,
  },
  {
    id: 2,
    titlu: "Monitor Dell UltraSharp 27\"",
    locatia: "bucuresti",
    categorie: "Electronice",
    cantitate: 8,
    in_stoc: true,
  },
  {
    id: 3,
    titlu: "Scaun Ergonomic Birou",
    locatia: "cluj",
    categorie: "Birotică",
    cantitate: 0,
    in_stoc: false,
  },
  {
    id: 4,
    titlu: "Birou Reglabil Electric",
    locatia: "cluj",
    categorie: "Birotică",
    cantitate: 5,
    in_stoc: true,
  },
  {
    id: 5,
    titlu: "Cablu HDMI 2m UltraHD",
    locatia: "timisoara",
    categorie: "Electronice",
    cantitate: 45,
    in_stoc: true,
  },
  {
    id: 6,
    titlu: "Set Șurubelnițe Profesionale",
    locatia: "timisoara",
    categorie: "Echipamente",
    cantitate: 12,
    in_stoc: true,
  },
  {
    id: 7,
    titlu: "Imprimantă Multifuncțională Laser",
    locatia: "pitesti",
    categorie: "Birotică",
    cantitate: 3,
    in_stoc: true,
  },
  {
    id: 8,
    titlu: "Anvelope Iarnă Michelin 205/55 R16",
    locatia: "pitesti",
    categorie: "Echipamente",
    cantitate: 0,
    in_stoc: false,
  },
  {
    id: 9,
    titlu: "Tastatură Mecanică Wireless",
    locatia: "iasi",
    categorie: "Electronice",
    cantitate: 19,
    in_stoc: true,
  },
  {
    id: 10,
    titlu: "Router Wi-Fi 6 Mesh Gigabit",
    locatia: "iasi",
    categorie: "Electronice",
    cantitate: 7,
    in_stoc: true,
  },
];

export default function App() {
  const [stocuri, setStocuri] = useState(DATE_INITIALE);
  // Depozitul deschis curent în meniul pop-up
  const [depozitMeniu, setDepozitMeniu] = useState(null);
  // Filtru activ pe lista completă (poate fi id-ul unui depozit sau null pentru toate)
  const [filtruLocatie, setFiltruLocatie] = useState(null);

  // Câmpuri formular adăugare produs nou
  const [nouTitlu, setNouTitlu] = useState("");
  const [nouLocatie, setNouLocatie] = useState("bucuresti");
  const [nouCategorie, setNouCategorie] = useState("Electronice");
  const [nouCantitate, setNouCantitate] = useState("1");
  const [mesajSucces, setMesajSucces] = useState("");

  const inputTitluId = useId();
  const selectEtichetaId = useId();
  const selectCategorieId = useId();
  const inputCantitateId = useId();

  // Statistici globale
  const totalProduse = stocuri.length;
  const inStocProduse = stocuri.filter((p) => p.in_stoc).length;
  const epuizateProduse = totalProduse - inStocProduse;

  // Calcul stocuri pe depozit
  const getStatisticiDepozit = (depId) => {
    const items = stocuri.filter((p) => p.locatia === depId);
    const disponibile = items.filter((p) => p.in_stoc).length;
    return {
      total: items.length,
      inStoc: disponibile,
      epuizate: items.length - disponibile,
      items,
    };
  };

  // Comută disponibilitatea produsului (În stoc / Epuizat)
  const handleToggleStoc = (id) => {
    setStocuri((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, in_stoc: !item.in_stoc } : item
      )
    );
  };

  // Ștergere produs
  const handleStergeProdus = (id) => {
    setStocuri((prev) => prev.filter((item) => item.id !== id));
  };

  // Adăugare produs nou conform modelului de date imutabil
  const handleAdaugaProdus = (e) => {
    e.preventDefault();
    const titluCurat = nouTitlu.trim();
    if (!titluCurat) return;

    const urmatorulId =
      stocuri.length > 0 ? Math.max(...stocuri.map((p) => p.id)) + 1 : 1;
    const cantitateNumar = Math.max(1, parseInt(nouCantitate, 10) || 1);

    const produsNou = {
      id: urmatorulId,
      titlu: titluCurat,
      locatia: nouLocatie,
      categorie: nouCategorie,
      cantitate: cantitateNumar,
      in_stoc: true,
    };

    setStocuri((prev) => [...prev, produsNou]);
    setNouTitlu("");
    setNouCantitate("1");
    setMesajSucces(`Produsul "${titluCurat}" a fost adăugat cu succes!`);
    setTimeout(() => setMesajSucces(""), 3500);
  };

  // Depozitul selectat pentru meniu
  const depozitActiv = DEPOZITE.find((d) => d.id === depozitMeniu);
  const infoDepozitActiv = depozitActiv
    ? getStatisticiDepozit(depozitActiv.id)
    : null;

  // Filtrare produse afișate în secțiunea inferioară
  const produseFiltrate = filtruLocatie
    ? stocuri.filter((p) => p.locatia === filtruLocatie)
    : stocuri;

  return (
    <div className="app-root">
      {/* ANTET */}
      <header className="app-header">
        <div className="header-badge">📦 Sistem Centralizat de Distribuție</div>
        <h1>MultiStock</h1>
        <p>Gestiunea stocurilor și inventarului pe depozite din România.</p>
        <div className="app-stats-bar">
          <div className="stat-pill">
            <span className="stat-label">Total produse</span>
            <span className="stat-value">{totalProduse}</span>
          </div>
          <div className="stat-pill stat-success">
            <span className="stat-label">În stoc</span>
            <span className="stat-value">{inStocProduse}</span>
          </div>
          <div className="stat-pill stat-warning">
            <span className="stat-label">Epuizate</span>
            <span className="stat-value">{epuizateProduse}</span>
          </div>
          <div className="stat-pill">
            <span className="stat-label">Depozite active</span>
            <span className="stat-value">{DEPOZITE.length} județe</span>
          </div>
        </div>
      </header>

      {/* SECȚIUNE HARTA PE TOATĂ LĂȚIMEA PAGINII */}
      <section className="full-width-map-section">
        <div className="map-toolbar">
          <div className="map-toolbar-inner">
            <div className="map-title-group">
              <h2>🗺️ Harta Depozitelor din România</h2>
              <p className="map-subtitle">
                Apasă pe un punct/depozit de pe hartă pentru a deschide meniul cu itemele stocate în acel județ.
              </p>
            </div>
            {filtruLocatie && (
              <button
                type="button"
                className="btn-reset"
                onClick={() => setFiltruLocatie(null)}
              >
                ✕ Resetează filtrul ({DEPOZITE.find((d) => d.id === filtruLocatie)?.oras})
              </button>
            )}
          </div>
        </div>

        <div className="map-wrapper map-full-width" id="romaniaMapContainer">
          {/* SVG-ul României */}
          <img
            src={hartaSvg}
            alt="Harta României cu județe și depozite"
            className="romania-svg"
          />

          {/* Fiecare pin cu meniul lui propriu, ancorat exact la coordonatele pinului */}
          {DEPOZITE.map((dep) => {
            const stats = getStatisticiDepozit(dep.id);
            const esteDeschis = depozitMeniu === dep.id;
            const esteFiltrat = filtruLocatie === dep.id;
            const infoPin = getStatisticiDepozit(dep.id);

            return (
              <div
                key={dep.id}
                className="pin-anchor"
                style={{
                  top: `${dep.coords.top}%`,
                  left: `${dep.coords.left}%`,
                }}
              >
                {/* Meniul glisant - apare deasupra pinului */}
                {esteDeschis && (
                  <div
                    className="warehouse-menu-popover pin-anchored-popover"
                    id="warehouseDetailsMenu"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="menuDepozitTitle"
                  >
                    <div className="menu-header">
                      <div className="menu-header-info">
                        <span className="menu-tag" style={{ background: dep.culoare }}>
                          Județul {dep.judet}
                        </span>
                        <h3 id="menuDepozitTitle">{dep.nume}</h3>
                        <p className="menu-address">📍 {dep.adresa}</p>
                      </div>
                      <button
                        type="button"
                        className="menu-close-btn"
                        onClick={(e) => { e.stopPropagation(); setDepozitMeniu(null); }}
                        title="Închide meniul depozitului"
                        aria-label="Închide"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="menu-metrics">
                      <div className="metric-box">
                        <span className="metric-number">{infoPin.total}</span>
                        <span className="metric-name">Articole totale</span>
                      </div>
                      <div className="metric-box metric-box-green">
                        <span className="metric-number">{infoPin.inStoc}</span>
                        <span className="metric-name">În stoc</span>
                      </div>
                      <div className="metric-box metric-box-red">
                        <span className="metric-number">{infoPin.epuizate}</span>
                        <span className="metric-name">Epuizate</span>
                      </div>
                    </div>

                    <div className="menu-items-section">
                      <div className="menu-items-header">
                        <h4>Inventar depozit ({infoPin.total} iteme)</h4>
                        <span className="hint-text">Click pe status pentru a comuta</span>
                      </div>
                      {infoPin.items.length === 0 ? (
                        <div className="menu-empty">
                          <p>Nu există niciun produs înregistrat în acest depozit.</p>
                          <span className="empty-subtext">Adaugă unul din formularul de mai jos.</span>
                        </div>
                      ) : (
                        <ul className="menu-items-list">
                          {infoPin.items.map((item) => (
                            <li key={item.id} className={`menu-item-row ${!item.in_stoc ? "item-epuizat" : ""}`}>
                              <div className="item-row-left">
                                <span className="item-row-title">{item.titlu}</span>
                                <div className="item-row-meta">
                                  <span className="meta-category">{item.categorie}</span>
                                  <span className="meta-qty">{item.cantitate} buc.</span>
                                </div>
                              </div>
                              <div className="item-row-right">
                                <button
                                  type="button"
                                  className={`status-toggle-btn ${item.in_stoc ? "btn-in-stoc" : "btn-epuizat"}`}
                                  onClick={(e) => { e.stopPropagation(); handleToggleStoc(item.id); }}
                                  title="Schimbă disponibilitatea"
                                >
                                  {item.in_stoc ? "✓ În stoc" : "✗ Epuizat"}
                                </button>
                                <button
                                  type="button"
                                  className="item-delete-btn"
                                  onClick={(e) => { e.stopPropagation(); handleStergeProdus(item.id); }}
                                  title="Șterge produs"
                                  aria-label="Șterge"
                                >
                                  🗑️
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="menu-footer">
                      <button
                        type="button"
                        className="menu-filter-btn"
                        onClick={(e) => { e.stopPropagation(); setFiltruLocatie(dep.id); setDepozitMeniu(null); }}
                      >
                        🔍 Filtrează inventarul după acest depozit
                      </button>
                      <button
                        type="button"
                        className="menu-close-action"
                        onClick={(e) => { e.stopPropagation(); setDepozitMeniu(null); }}
                      >
                        Închide
                      </button>
                    </div>
                  </div>
                )}

                {/* Butonul-pin */}
                <button
                  type="button"
                  className={`warehouse-pin ${esteDeschis ? "open" : ""} ${esteFiltrat ? "active" : ""}`}
                  onClick={() => setDepozitMeniu(esteDeschis ? null : dep.id)}
                  title={`Apasă pentru iteme: ${dep.nume} (${dep.judet})`}
                  aria-expanded={esteDeschis}
                >
                  <span className="pin-pulse-ring" />
                  <span className="pin-dot" />
                  <span className="pin-icon">🏭</span>
                  <span className="pin-title">{dep.oras}</span>
                  <span className="pin-count" title={`${stats.inStoc} în stoc`}>
                    ({stats.total})
                  </span>
                </button>
              </div>
            );
          })}

          
          </div>
        </section>

        {/* CONTAINER PENTRU RESTUL CONȚINUTULUI */}
        <main className="container">
          {/* SECȚIUNE CU 2 COLOANE: FORMULAR ADAUGARE + LISTĂ PRODUSE */}
          <div className="content-grid">
          {/* FORMULAR DE ADAUGARE */}
          <section className="panel">
            <h2>➕ Adaugă produs nou</h2>
            <p className="panel-desc">
              Completează detaliile pentru a distribui un produs într-unul din depozitele județene.
            </p>

            {mesajSucces && <div className="alert alert-success">{mesajSucces}</div>}

            <form className="item-form" onSubmit={handleAdaugaProdus}>
              <label htmlFor={inputTitluId}>
                Nume produs
                <input
                  type="text"
                  id={inputTitluId}
                  value={nouTitlu}
                  onChange={(e) => setNouTitlu(e.target.value)}
                  placeholder="Ex: Monitor LG 27 inch 4K"
                  required
                />
              </label>

              <div className="form-row">
                <label htmlFor={selectEtichetaId}>
                  Depozit destinație
                  <select
                    id={selectEtichetaId}
                    value={nouLocatie}
                    onChange={(e) => setNouLocatie(e.target.value)}
                  >
                    {DEPOZITE.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.nume} ({d.judet})
                      </option>
                    ))}
                  </select>
                </label>

                <label htmlFor={selectCategorieId}>
                  Categorie
                  <select
                    id={selectCategorieId}
                    value={nouCategorie}
                    onChange={(e) => setNouCategorie(e.target.value)}
                  >
                    {CATEGORII.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label htmlFor={inputCantitateId}>
                Cantitate inițială (bucăți)
                <input
                  type="number"
                  id={inputCantitateId}
                  min="1"
                  max="10000"
                  value={nouCantitate}
                  onChange={(e) => setNouCantitate(e.target.value)}
                  required
                />
              </label>

              <button type="submit" className="btn-primary">
                Adaugă în stocul depozitului
              </button>
            </form>
          </section>

          {/* LISTA DE PRODUSE ÎNREGISTRATE */}
          <section className="panel">
            <div className="panel-header">
              <div>
                <h2>📋 Inventar complet</h2>
                <p className="panel-desc">
                  {filtruLocatie
                    ? `Filtrat după ${DEPOZITE.find((d) => d.id === filtruLocatie)?.nume}`
                    : "Toate produsele din cele 5 depozite"}
                </p>
              </div>
              {filtruLocatie && (
                <button
                  type="button"
                  className="btn-reset"
                  onClick={() => setFiltruLocatie(null)}
                >
                  Arată toate
                </button>
              )}
            </div>

            {produseFiltrate.length === 0 ? (
              <p className="empty-msg">
                Nu există produse înregistrate pentru filtrul selectat.
              </p>
            ) : (
              <ul className="item-list">
                {produseFiltrate.map((item) => {
                  const depozitItem = DEPOZITE.find((d) => d.id === item.locatia);
                  return (
                    <li
                      key={item.id}
                      className={`item-card ${!item.in_stoc ? "done" : ""}`}
                    >
                      <div className="item-card-content">
                        <h3>{item.titlu}</h3>
                        <div className="item-tags">
                          <span className={`badge ${depozitItem?.badgeClass || ""}`}>
                            📍 {depozitItem?.oras || item.locatia}
                          </span>
                          <span className="badge badge-category">
                            {item.categorie}
                          </span>
                          <span className="badge-qty">{item.cantitate} buc.</span>
                        </div>
                      </div>

                      <div className="item-card-actions">
                        <button
                          type="button"
                          className={`status-btn ${
                            item.in_stoc ? "status-ok" : "status-out"
                          }`}
                          onClick={() => handleToggleStoc(item.id)}
                          title="Comută stocul (În stoc / Epuizat)"
                        >
                          {item.in_stoc ? "În stoc" : "Epuizat"}
                        </button>
                        <button
                          type="button"
                          className="btn-delete"
                          onClick={() => handleStergeProdus(item.id)}
                          title="Șterge produs"
                          aria-label="Șterge"
                        >
                          ✕
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>MultiStock — Proiect Tehnologii Web &bull; Gestionare Stocuri pe Harta României</p>
      </footer>
    </div>
  );
}