import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchStoc } from "../api.js";
import { DEPOZITE } from "../depozite.js";
import styles from "./ProdusDetaliuPage.module.css";

export default function ProdusDetaliuPage() {
  const { id } = useParams();
  const [produs, setProdus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetchStoc(id)
      .then((data) => {
        if (!ignore) {
          setProdus(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <p className="info" data-testid="loading">
        Se încarcă detaliile produsului...
      </p>
    );
  }

  if (error || !produs) {
    return (
      <section className={`panel ${styles.detail}`}>
        <p className="error" data-testid="error">
          Produsul nu a putut fi încărcat: {error}
        </p>
        <Link to="/" className={styles.back}>
          ← Înapoi la inventar
        </Link>
      </section>
    );
  }

  const depozit = DEPOZITE.find((d) => d.id === produs.locatia);

  return (
    <section className={`panel ${styles.detail}`} data-testid="detail">
      <Link to="/" className={styles.back}>
        ← Înapoi la inventar
      </Link>

      <h2 className={!produs.in_stoc ? styles.done : undefined} data-testid="detail-title">
        {produs.titlu}
      </h2>

      <dl className={styles.fields}>
        <dt>Status</dt>
        <dd>{produs.in_stoc ? "✓ În stoc" : "✗ Epuizat"}</dd>

        <dt>Categorie</dt>
        <dd>
          <span className="badge badge-category">{produs.categorie}</span>
        </dd>

        <dt>Cantitate</dt>
        <dd>{produs.cantitate} buc.</dd>

        <dt>Depozit</dt>
        <dd>
          <span className={`badge ${depozit?.badgeClass || ""}`}>
            📍 {depozit?.nume || produs.locatia}
          </span>
        </dd>

        {depozit && (
          <>
            <dt>Județ</dt>
            <dd>{depozit.judet}</dd>

            <dt>Adresă depozit</dt>
            <dd>{depozit.adresa}</dd>
          </>
        )}

        <dt>ID produs</dt>
        <dd>{produs.id}</dd>
      </dl>
    </section>
  );
}