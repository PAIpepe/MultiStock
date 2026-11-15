## Jurnal AI - Etapa 7: Persistența Datelor, Refactorizare Arhitecturală și UX Modernizat

## Conversații
https://share.gemini.google/EcRImCi7wAIp

**Obiectivele etapei:** 
Trecerea de la un state pur local la un sistem client-server folosind `json-server` pentru persistența datelor (CRUD API) și modernizarea completă a interfeței utilizator (UI/UX), incluzând un sistem de navigație Single Page Application (SPA).

**Prompt-uri și Soluții principale explorate cu asistentul AI:**

1. **Implementarea navigației fără react-router:**
   - *Prompt:* "Dacă vreau să adaug un nav care rămâne permanent pe ecran în care să am 'Acasă' și 'Inventar'... ce trebuie să modific în `App.jsx`?"
   - *Soluție:* Am folosit o stare locală `const [pagina, setPagina] = useState("acasa")` și randare condiționată `{pagina === "acasa" && (...)}` pentru a crea o experiență de tip SPA fluidă, extrăgând butoanele în componenta dedicată `ProdusNav.jsx`.

2. **Refactorizarea arhitecturii codului (Separation of Concerns):**
   - *Prompt:* "Partea asta de const (DEPOZITE, CATEGORII) n-aș putea să o pun într-un alt fișier?"
   - *Soluție:* Am creat fișierul `depozite.js` pentru a stoca variabilele statice de configurare a interfeței, curățând `App.jsx` și importând datele doar în componentele care au nevoie de ele (`ProdusForm.jsx`, `ProdusCard.jsx`).

3. **Optimizări avansate de CSS (Animarea header-ului la scroll):**
   - *Prompt:* "Fă-mi ca partea din prima poză, adică headerul, să aibă o animație prin care se micșorează și mai scrie doar MultiStock mic pe o bară..."
   - *Soluție:* Am adăugat un `useEffect` cu un event listener pe `window.scrollY`. La depășirea a 50px, clasa `.scrolled` se activează pe `<header>`, ascunzând statisticile (`max-height: 0`, `opacity: 0`) și rearanjând flexbox-ul din coloană într-un rând compact (header fix/sticky).

4. **Debugging CSS și Layout Thrashing:**
   - *Prompt:* "Dacă sunt în topul paginii și încerc să dau scroll se buguiește și nu mă lasă să dau scroll... și există un spațiu între chestiile alea 2."
   - *Soluție:* Am rezolvat problema de "layout thrashing" (unde browserul anula scroll-ul din cauza reducerii bruște a înălțimii paginii) mutând `<ProdusNav/>` în interiorul header-ului și adăugând un spațiu invizibil de siguranță jos. Am centrat titlurile absolut folosind `position: absolute; left: 50%; transform: translateX(-50%)`.

5. **Poziționarea inteligentă a meniurilor contextuale pe hartă (Smart UI):**
   - *Prompt:* "Fă cumva să nu se ducă sub lightboxul ăla de la depozit, redimensionează-l."
   - *Soluție:* Am adăugat o clasă dinamică `${dep.coords.top < 50 ? "popover-down" : "popover-up"}`. Dacă punctul hărții este în nord (ex: Iași, Cluj), popover-ul se deschide automat în jos, prevenind tăierea conținutului de către marginile ferestrei.

6. **Tranziții de pagină și stilizare butoane:**
   - Am implementat un efect subtil de `fadeInSlide` la comutarea paginilor (folosind atributul `key` în React pentru a forța re-animarea DOM-ului) și am modernizat butonul de temă ("Glassmorphism").