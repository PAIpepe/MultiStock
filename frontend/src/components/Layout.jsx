import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";

function temaInitiala() {
  const salvata = localStorage.getItem("tema");
  if (salvata === "dark" || salvata === "light") {
    return salvata;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function navClass({ isActive }) {
  return isActive ? `${styles.link} ${styles.active}` : styles.link;
}

export default function Layout() {
  const [tema, setTema] = useState(temaInitiala);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const esteHarta = location.pathname === "/harta";

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    localStorage.setItem("tema", tema);
  }, [tema]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleTema() {
    setTema((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <div className={styles.root}>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <span className={styles.logo}>📦 MultiStock</span>

          <nav className={styles.nav} data-testid="nav">
            <NavLink to="/" end className={navClass}>
              📋 Inventar
            </NavLink>
            <NavLink to="/harta" className={navClass}>
              🗺️ Hartă
            </NavLink>
            <NavLink to="/despre" className={navClass}>
              ℹ️ Despre
            </NavLink>
          </nav>

          <button
            type="button"
            className={styles.themeToggle}
            onClick={handleTema}
            aria-pressed={tema === "dark"}
          >
            {tema === "dark" ? "☀️ Luminos" : "🌙 Întunecat"}
          </button>
        </div>
      </header>

      <main className={`${styles.main} ${esteHarta ? styles.mainFull : ""}`}>
        <div key={location.pathname} className={styles.pageTransition}>
          <Outlet />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>MultiStock — Proiect Tehnologii Web &bull; Gestionare Stocuri pe Harta României</p>
      </footer>
    </div>
  );
}