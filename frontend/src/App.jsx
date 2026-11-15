import { useState, useEffect } from "react";
import hartaSvg from "./assets/harta.svg";
import ProdusList from "./components/ProdusList.jsx";
import ProdusForm from "./components/ProdusForm.jsx";
import ProdusNav from "./components/ProdusNav.jsx";
import { fetchStocuri, createStoc, updateStoc, deleteStoc } from "./api.js";
import { DEPOZITE } from "./depozite.js";

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [stocuri, setStocuri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [depozitMeniu, setDepozitMeniu] = useState(null);
  const [filtruLocatie, setFiltruLocatie] = useState(null);
  const [tema, setTema] = useState(temaInitiala);

  // Stare pentru pagină (Harta vs Inventar)
  const [pagina, setPagina] = useState("acasa");
  
  // Stare pentru animația header-ului la scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // Efect pentru ascultarea scroll-ului
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efect pentru încărcarea datelor la montare
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchStocuri();
        if (!ignore) setStocuri(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, []);

  const totalProduse = stocuri.length;
  const inStocProduse = stocuri.filter((p) => p.in_stoc).length;
  const epuizateProduse = totalProduse - inStocProduse;

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

  async function handleAdd(produs) {
    const creat = await createStoc(produs);
    setStocuri((prev) => [...prev, creat]);
  }

  async function handleToggleStoc(id) {
    const produs = stocuri.find((p) => p.id === id);
    try {
      const actualizat = await updateStoc(id, { in_stoc: !produs.in_stoc });
      setStocuri((prev) => prev.map((p) => (p.id === id ? actualizat : p)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleStergeProdus(id) {
    try {
      await deleteStoc(id);
      setStocuri((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  function handleTema() {
    const noua = tema === "dark" ? "light" : "dark";
    setTema(noua);
    document.documentElement.dataset.theme = noua;
  }

  const produseFiltrate = filtruLocatie
    ? stocuri.filter((p) => p.locatia === filtruLocatie)
    : stocuri;

  return (
    <div className="app-root">
      
      {/* ANTET - dinamic în funcție de scroll */}
      <header className={`app-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-top-row">
          <h1 className="header-title">MultiStock</h1>
          
          <button
            className="theme-toggle modern-btn"
            onClick={handleTema}
            aria-pressed={tema === "dark"}
          >
            {tema === "dark" ? "☀️ Luminos" : "🌙 Întunecat"}
          </button>
        </div>

        <div className="header-collapsible">
          <div className="header-badge">📦 Sistem Centralizat de Distribuție</div>
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
        </div>
      </header>

      {/* PAGINA ACASĂ (HARTA) */}
      {pagina === "acasa" && (
        <div key="page-acasa" className="page-transition-wrapper full-width-map-section">
          <div className="map-toolbar">
            <div className="map-toolbar-inner section-header-row centered-title-row">
              <div className="map-title-group">
                <h2>🗺️ Harta Depozitelor din România</h2>
                <p className="map-subtitle">
                  Apasă pe un punct/depozit de pe hartă pentru a deschide meniul cu itemele stocate în acel județ.
                </p>
              </div>
              <div className="section-actions">
                <ProdusNav pagina={pagina} setPagina={setPagina} />
              </div>
            </div>
            
            {filtruLocatie && (
              <div className="filter-reset-container" style={{ padding: "0 32px 16px 32px" }}>
                <button
                  type="button"
                  className="btn-reset"
                  onClick={() => setFiltruLocatie(null)}
                >
                  ✕ Resetează filtrul ({DEPOZITE.find((d) => d.id === filtruLocatie)?.oras})
                </button>
              </div>
            )}
          </div>

          <div className="map-wrapper map-full-width" id="romaniaMapContainer">
            <img
              src={hartaSvg}
              alt="Harta României cu județe și depozite"
              className="romania-svg"
            />

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
                  {esteDeschis && (
                    <div
                      className={`warehouse-menu-popover pin-anchored-popover ${dep.coords.top < 50 ? "popover-down" : "popover-up"}`}
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
        </div>
      )}

      {/* PAGINA INVENTAR & FORMULAR */}
      {pagina === "inventar" && (
        <div key="page-inventar" className="page-transition-wrapper container">
          
          <div className="inventory-top-bar section-header-row centered-title-row">
            <h2>🛠️ Administrare Stocuri</h2>
            <div className="section-actions">
              <ProdusNav pagina={pagina} setPagina={setPagina} />
            </div>
          </div>

          <div className="content-grid">
            <section className="panel">
              <h2>➕ Adaugă produs nou</h2>
              <p className="panel-desc">
                Completează detaliile pentru a distribui un produs într-unul din depozitele județene.
              </p>
              <ProdusForm onAdd={handleAdd} />
            </section>

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

              {loading && <p className="info" data-testid="loading">Se încarcă lista de produse...</p>}
              
              {error && (
                <p className="error" data-testid="error">
                  Nu am putut încărca datele: {error}. Rulează <code>npm run api</code>?
                </p>
              )}

              {!loading && !error && (
                <ProdusList
                  produse={produseFiltrate}
                  onToggle={handleToggleStoc}
                  onDelete={handleStergeProdus}
                />
              )}
            </section>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="app-footer">
        <p>MultiStock — Proiect Tehnologii Web &bull; Gestionare Stocuri pe Harta României</p>
      </footer>
    </div>
  );
}