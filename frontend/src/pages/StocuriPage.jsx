import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProdusList from "../components/ProdusList.jsx";
import ProdusForm from "../components/ProdusForm.jsx";
import { createStoc, deleteStoc, fetchStocuri, updateStoc } from "../api.js";
import { DEPOZITE } from "../depozite.js";
import styles from "./StocuriPage.module.css";

export default function StocuriPage() {
  const [stocuri, setStocuri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const filtruLocatie = searchParams.get("depozit");

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

  async function handleAdd(produs) {
    const creat = await createStoc(produs);
    setStocuri((prev) => [...prev, creat]);
  }

  async function handleToggle(id) {
    const produs = stocuri.find((p) => p.id === id);
    try {
      const actualizat = await updateStoc(id, { in_stoc: !produs.in_stoc });
      setStocuri((prev) => prev.map((p) => (p.id === id ? actualizat : p)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteStoc(id);
      setStocuri((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const totalProduse = stocuri.length;
  const inStocProduse = stocuri.filter((p) => p.in_stoc).length;
  const epuizateProduse = totalProduse - inStocProduse;

  const produseFiltrate = filtruLocatie
    ? stocuri.filter((p) => p.locatia === filtruLocatie)
    : stocuri;

  return (
    <div className={styles.page}>
      <div className={styles.statsBar}>
        <div className={styles.statPill}>
          <span className={styles.statLabel}>Total produse</span>
          <span className={styles.statValue}>{totalProduse}</span>
        </div>
        <div className={`${styles.statPill} ${styles.statSuccess}`}>
          <span className={styles.statLabel}>În stoc</span>
          <span className={styles.statValue}>{inStocProduse}</span>
        </div>
        <div className={`${styles.statPill} ${styles.statWarning}`}>
          <span className={styles.statLabel}>Epuizate</span>
          <span className={styles.statValue}>{epuizateProduse}</span>
        </div>
        <div className={styles.statPill}>
          <span className={styles.statLabel}>Depozite active</span>
          <span className={styles.statValue}>{DEPOZITE.length} județe</span>
        </div>
      </div>

      <div className={styles.grid}>
        <section className="panel">
          <h2>➕ Adaugă produs nou</h2>
          <p className="panel-desc">
            Completează detaliile pentru a distribui un produs într-unul din depozitele județene.
          </p>
          <ProdusForm onAdd={handleAdd} />
        </section>

        <section className="panel">
          <div className={styles.panelHeader}>
            <div>
              <h2>📋 Inventar complet</h2>
              <p className="panel-desc">
                {filtruLocatie
                  ? `Filtrat după ${DEPOZITE.find((d) => d.id === filtruLocatie)?.nume || filtruLocatie}`
                  : `${totalProduse} produse în cele ${DEPOZITE.length} depozite (${inStocProduse} în stoc)`}
              </p>
            </div>
            {filtruLocatie && (
              <button
                type="button"
                className="btn-reset"
                onClick={() => setSearchParams({})}
              >
                ✕ Arată toate
              </button>
            )}
          </div>

          {loading && (
            <p className="info" data-testid="loading">
              Se încarcă lista de produse...
            </p>
          )}

          {error && (
            <p className="error" data-testid="error">
              Nu am putut încărca datele: {error}. Rulează <code>npm run api</code>?
            </p>
          )}

          {!loading && !error && (
            <ProdusList
              produse={produseFiltrate}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>
    </div>
  );
}