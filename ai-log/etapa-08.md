## Jurnal AI - Etapa 8: Navigare cu React Router și Stilizare pe Componente (CSS Modules)

## Conversații
https://share.gemini.google/twdCdWozOhKT

**Obiectivele etapei:**
Transformarea aplicației *MultiStock* într-un SPA complet folosind `react-router-dom` (rute separate pentru inventar, hartă, detaliu produs, despre și 404), migrarea stilurilor din fișierul global `App.css` în `index.css` + fișiere `.module.css` dedicate fiecărei componente/pagini și păstrarea tuturor atributelor `data-testid` pentru verificarea automată.

**Prompt-uri și Soluții principale explorate cu asistentul AI:**

1. **Adaptarea cerințelor Etapei 8 la arhitectura MultiStock:**
   - *Prompt:* "Cum adaptez această etapă la proiectul meu? Vreau să fie curat, rută separată pentru hartă și rută separată pentru formular și listă."
   - *Soluție:* Am configurat `<BrowserRouter>` în `main.jsx` și harta rutelor în `App.jsx` cu un `<Layout />` comun (`<Outlet />`):
     - `/` → `StocuriPage` (formular + listă + filtrare prin `?depozit=...`, astfel încât testele automate pentru Etapa 7 să ruleze direct pe ruta principală);
     - `/harta` → `HartaPage` (harta interactivă a României cu pinii depozitelor și popover-uri smart);
     - `/stocuri/:id` → `ProdusDetaliuPage` (corelat cu `"resource": "stocuri"` din `tw.json`, folosind `useParams()` și `fetchStoc(id)` în `api.js`, afișând inclusiv județul și adresa depozitului și tratând eroarea 404 pentru ID-uri inexistente);
     - `/despre` → `DesprePage` și `*` → `NotFoundPage` (`data-testid="not-found"`).
   - Am actualizat `ProdusCard.jsx` astfel încât titlul să fie `<Link to={`/stocuri/${produs.id}`} data-testid="item-link">`, înlocuind `<label>` cu `<div>` și adăugând `aria-label` pe checkbox.

2. **Migrarea de la `App.css` global la `index.css` și CSS Modules:**
   - *Soluție:* Am păstrat în `index.css` doar variabilele de temă (Light/Dark), resetările de bază și clasele comune (`.panel`, `.btn`, `.btn-reset`, `.badge*`, `.error`, `.info`, `.empty`). Stilurile specifice au fost mutate lângă fiecare componentă și pagină (`Layout.module.css`, `ProdusCard.module.css`, `ProdusList.module.css`, `ProdusForm.module.css`, `StocuriPage.module.css`, `HartaPage.module.css`, `ProdusDetaliuPage.module.css`).

3. **Repararea animației de tranziție între pagini cu CSS Modules:**
   - *Prompt:* "Unde mi-a dispărut animația de schimbare între pagini?"
   - *Soluție:* Vite redenumește automat `@keyframes` în fișierele `.module.css`, motiv pentru care animația definită global în `index.css` nu mai era găsită. Am centralizat animația `fadeInSlide` în `Layout.module.css` și am folosit `useLocation()` cu `key={location.pathname}` pe containerul din jurul lui `<Outlet />` în `Layout.jsx`.

4. **Restaurarea persistenței temei Light/Dark la refresh:**
   - *Prompt:* "Înainte îmi ținea minte dacă rămânea pe mod luminos după refresh, acum nu mai ține minte."
   - *Soluție:* Am adăugat citirea din `localStorage.getItem("tema")` în funcția `temaInitiala()` și salvarea cu `localStorage.setItem("tema", tema)` în `useEffect`-ul din `Layout.jsx`.

5. **Afișarea hărții pe 100% din lățimea ecranului în interiorul `Layout`:**
   - *Prompt:* "De ce harta în continuare nu e lată cât tot ecranul?"
   - *Soluție:* Containerul `<main>` din `Layout.module.css` limita toate paginile la `max-width: 1400px`. Am adăugat o verificare `location.pathname === "/harta"` în `Layout.jsx` pentru a aplica condiționat clasa `.mainFull` (`max-width: 100%; padding: 0;`), lăsând restul paginilor centrate.

6. **Audit și curățare structură de fișiere:**
   - *Prompt:* "Arată ok structura proiectului? Am dubluri sau locații dubioase la fișiere?"
   - *Soluție:* Am identificat și mutat `tw.json` din `images/` înapoi în rădăcina repository-ului și am eliminat fișierul nefolosit `ProdusNav.jsx` (înlocuit de `<NavLink>` în `Layout.jsx`).