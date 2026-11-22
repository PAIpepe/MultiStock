import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import hartaSvg from "../assets/harta.svg";
import { deleteStoc, fetchStocuri, updateStoc } from "../api.js";
import { DEPOZITE } from "../depozite.js";
import styles from "./HartaPage.module.css";

export default function HartaPage() {
  const [stocuri, setStocuri] = useState([]);
  const [depozitMeniu, setDepozitMeniu] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    fetchStocuri()
      .then((data) => {
        if (!ignore) setStocuri(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      });
    return () => {
      ignore = true;
    };
  }, []);

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

  return (
    <section className={styles.page}>
      <div className={styles.toolbar}>
        <h2>🗺️ Harta Depozitelor din România</h2>
        <p className={styles.subtitle}>
          Apasă pe un depozit de pe hartă pentru a vedea sau actualiza stocurile din acel județ.
        </p>
      </div>

      {error && <p className="error">Eroare la încărcare: {error}</p>}

      <div className={styles.mapWrapper}>
        <img
          src={hartaSvg}
          alt="Harta României cu județe și depozite"
          className={styles.romaniaSvg}
        />

        {DEPOZITE.map((dep) => {
          const stats = getStatisticiDepozit(dep.id);
          const esteDeschis = depozitMeniu === dep.id;

          return (
            <div
              key={dep.id}
              className={styles.pinAnchor}
              style={{ top: `${dep.coords.top}%`, left: `${dep.coords.left}%` }}
            >
              {esteDeschis && (
                <div
                  className={`${styles.popover} ${dep.coords.top < 50 ? styles.popoverDown : styles.popoverUp}`}
                  role="dialog"
                  aria-modal="true"
                >
                  <div className={styles.menuHeader}>
                    <div className={styles.menuHeaderInfo}>
                      <span className={styles.menuTag} style={{ background: dep.culoare }}>
                        Județul {dep.judet}
                      </span>
                      <h3>{dep.nume}</h3>
                      <p className={styles.menuAddress}>📍 {dep.adresa}</p>
                    </div>
                    <button
                      type="button"
                      className={styles.menuCloseBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDepozitMeniu(null);
                      }}
                      aria-label="Închide"
                    >
                      ✕
                    </button>
                  </div>

                  <div className={styles.menuMetrics}>
                    <div className={styles.metricBox}>
                      <span className={styles.metricNumber}>{stats.total}</span>
                      <span className={styles.metricName}>Totale</span>
                    </div>
                    <div className={`${styles.metricBox} ${styles.metricGreen}`}>
                      <span className={styles.metricNumber}>{stats.inStoc}</span>
                      <span className={styles.metricName}>În stoc</span>
                    </div>
                    <div className={`${styles.metricBox} ${styles.metricRed}`}>
                      <span className={styles.metricNumber}>{stats.epuizate}</span>
                      <span className={styles.metricName}>Epuizate</span>
                    </div>
                  </div>

                  <div className={styles.menuItemsSection}>
                    <div className={styles.menuItemsHeader}>
                      <h4>Inventar depozit ({stats.total})</h4>
                      <span className={styles.hintText}>Click pe titlu pt. detalii</span>
                    </div>
                    {stats.items.length === 0 ? (
                      <div className={styles.menuEmpty}>
                        <p>Nu există niciun produs în acest depozit.</p>
                      </div>
                    ) : (
                      <ul className={styles.menuItemsList}>
                        {stats.items.map((item) => (
                          <li
                            key={item.id}
                            className={`${styles.menuItemRow} ${!item.in_stoc ? styles.itemEpuizat : ""}`}
                          >
                            <div className={styles.itemRowLeft}>
                              <Link to={`/stocuri/${item.id}`} className={styles.itemRowTitle}>
                                {item.titlu}
                              </Link>
                              <div className={styles.itemRowMeta}>
                                <span className={styles.metaCategory}>{item.categorie}</span>
                                <span className={styles.metaQty}>{item.cantitate} buc.</span>
                              </div>
                            </div>
                            <div className={styles.itemRowRight}>
                              <button
                                type="button"
                                className={`${styles.statusToggleBtn} ${
                                  item.in_stoc ? styles.btnInStoc : styles.btnEpuizat
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleToggleStoc(item.id);
                                }}
                              >
                                {item.in_stoc ? "✓ În stoc" : "✗ Epuizat"}
                              </button>
                              <button
                                type="button"
                                className={styles.itemDeleteBtn}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStergeProdus(item.id);
                                }}
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

                  <div className={styles.menuFooter}>
                    <button
                      type="button"
                      className={styles.menuFilterBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/?depozit=${dep.id}`);
                      }}
                    >
                      🔍 Vezi în inventar
                    </button>
                    <button
                      type="button"
                      className={styles.menuCloseAction}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDepozitMeniu(null);
                      }}
                    >
                      Închide
                    </button>
                  </div>
                </div>
              )}

              <button
                type="button"
                className={`${styles.warehousePin} ${esteDeschis ? styles.pinOpen : ""}`}
                onClick={() => setDepozitMeniu(esteDeschis ? null : dep.id)}
                aria-expanded={esteDeschis}
              >
                <span className={styles.pinPulseRing} />
                <span className={styles.pinDot} />
                <span>🏭</span>
                <span className={styles.pinTitle}>{dep.oras}</span>
                <span className={styles.pinCount}>({stats.total})</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}