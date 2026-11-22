import { useState, useId } from "react";
import { DEPOZITE, CATEGORII } from "../depozite.js";
import styles from "./ProdusForm.module.css";

const TITLU_MAX = 100;

export default function ProdusForm({ onAdd }) {
  const [titlu, setTitlu] = useState("");
  const [locatia, setLocatia] = useState("bucuresti");
  const [categorie, setCategorie] = useState("Electronice");
  const [cantitate, setCantitate] = useState("1");
  const [eroare, setEroare] = useState("");
  const [trimite, setTrimite] = useState(false);

  const inputTitluId = useId();
  const selectLocatieId = useId();
  const selectCategorieId = useId();
  const inputCantitateId = useId();

  function valideaza() {
    const t = titlu.trim();
    if (t === "") return "Numele produsului este obligatoriu.";
    if (t.length > TITLU_MAX) return `Numele are maximum ${TITLU_MAX} de caractere.`;
    const cant = parseInt(cantitate, 10);
    if (isNaN(cant) || cant < 1) return "Cantitatea trebuie să fie minim 1.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const mesaj = valideaza();
    if (mesaj) {
      setEroare(mesaj);
      return;
    }
    setEroare("");
    setTrimite(true);

    try {
      await onAdd({
        titlu: titlu.trim(),
        locatia,
        categorie,
        cantitate: parseInt(cantitate, 10),
        in_stoc: true,
      });
      setTitlu("");
      setCantitate("1");
    } catch (err) {
      setEroare(err.message);
    } finally {
      setTrimite(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate data-testid="form">
      <label htmlFor={inputTitluId}>
        Nume produs
        <input
          type="text"
          id={inputTitluId}
          value={titlu}
          onChange={(e) => setTitlu(e.target.value)}
          placeholder="Ex: Monitor LG 27 inch 4K"
          maxLength={TITLU_MAX}
          aria-invalid={Boolean(eroare)}
          data-testid="form-title"
        />
      </label>

      <div className={styles.row}>
        <label htmlFor={selectLocatieId}>
          Depozit destinație
          <select
            id={selectLocatieId}
            value={locatia}
            onChange={(e) => setLocatia(e.target.value)}
            data-testid="form-locatia"
          >
            {DEPOZITE.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nume}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor={selectCategorieId}>
          Categorie
          <select
            id={selectCategorieId}
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            data-testid="form-categorie"
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
          value={cantitate}
          onChange={(e) => setCantitate(e.target.value)}
          data-testid="form-cantitate"
        />
      </label>

      {eroare && (
        <p className="error" role="alert" data-testid="form-error">
          {eroare}
        </p>
      )}

      <button type="submit" className="btn" disabled={trimite} data-testid="form-submit">
        {trimite ? "Se salvează..." : "Adaugă în stoc"}
      </button>
    </form>
  );
}