# MultiStock

MultiStock este o aplicație web concepută pentru gestionarea stocurilor și urmărirea disponibilității produselor în mai multe depozite din țară, direct pe o hartă interactivă.

## Modelul de date

| Câmp | Tip | Note |
| --- | --- | --- |
| titlu | text | obligatoriu, max 100 caractere (ex: Nume produs) |
| in_stoc | boolean | comutat din listă, implicit true |
| locatia | valori fixe | bucuresti, cluj, timisoara, pitesti, iasi |
| categorie | relație | Electronice, Birotică, Echipamente |
| utilizator | relație | proprietarul elementului (din săptămâna 11) |

Date de test utilizate în toate etapele:
1. Laptop Dell XPS 15, activ, București
​2. Scaun Ergonomic Birou, epuizat, Cluj
3. Cablu HDMI 2m, activ, Timișoara

## Utilizarea AI

Instrument | Utilizat pentru
--- | ---
Gemini | Clarificarea temei de proiect, structurarea modelului de date și generarea șablonului HTML/CSS pentru Etapa 1. Implementarea funcțiilor JavaScript imutabile pe date, conectarea formularului DOM, integrarea hărții interactive din folderul de resurse locale și sincronizarea dinamica a stocurilor cu pinii depozitelor pentru Etapa 2.

Detalii pentru fiecare etapă: consultați folderul `ai-log/`.

## Cum se rulează

Deschideți `index.html` într-un browser. Nu necesită etapă de build sau server. Pentru Etapa 2, deschideți aplicația și interacționați cu formularul sau pinii depozitelor de pe hartă, ori apăsați tasta `F12` pentru a deschide consola (Developer Tools -> Console) și a verifica funcțiile pe date.

## Stare proiect

- [x] Etapa 1: mockup static
- [x] Etapa 2: logică pe date în JavaScript și integrare hartă interactivă
- [x] Etapa 3: componente React de bază
- [x] Etapa 4: componente construite din date
- [x] Etapa 5: state local și evenimente
- [x] Etapa 6: date de la un API de test
- [x] Etapa 7: formular, validare și operații CRUD pe API
- [x] Etapa 8: navigare cu React Router, pagină de detaliu și CSS Modules
- [x] Etapa 9: backend propriu cu Node.js și Express

## Tabel de verificare

### Etapa 1
| ID | Cerință | Unde (permalink) | Cum se verifică |
| --- | --- | --- | --- |
| S1-R1 | README: descriere, câmpuri, date de test, modul de rulare | [README.md](https://github.com/PAIpepe/MultiStock/blob/358bad4bf956691e046ba9c2c849111016258e09/README.md?plain=1#L1-L18) | citește |
| S1-R2 | Secțiunea AI usage | [README.md](https://github.com/PAIpepe/MultiStock/blob/358bad4bf956691e046ba9c2c849111016258e09/README.md?plain=1#L20-L26) | citește |
| S1-R3 | Jurnalul AI pentru etapa 1 | [ai-log/etapa-01.md](https://github.com/PAIpepe/MultiStock/blob/main/ai-log/etapa-01.md) | citește |
| S1-R4 | antet, formular (text + select), 3 carduri cu date proprii | [index.html#L10-L60](https://github.com/PAIpepe/MultiStock/blob/259a51d96560d726450dc323ae76b1fdeadbff5a/index.html#L10-L60) | deschide pagina |
| S1-R5 | cardul finalizat arată diferit | [style.css#L142-L149](https://github.com/PAIpepe/MultiStock/blob/259a51d96560d726450dc323ae76b1fdeadbff5a/style.css#L142-L149) | verifică cardul |
| S1-R6 | 2 coloane pe desktop, 1 sub 700px | [style.css#L157-L162](https://github.com/PAIpepe/MultiStock/blob/259a51d96560d726450dc323ae76b1fdeadbff5a/style.css#L157-L162) | redimensionare < 700px |
| S1-R7 | focus vizibil, temă întunecată lizibilă | [style.css#L165-L180](https://github.com/PAIpepe/MultiStock/blob/259a51d96560d726450dc323ae76b1fdeadbff5a/style.css#L165-L180) | Tab; dark mode |
| S1-R8 | commit "Stage 1" trimis pe GitHub | [Vezi commit](https://github.com/PAIpepe/MultiStock/commit/259a51d96560d726450dc323ae76b1fdeadbff5a) | istoric commituri |

### Etapa 2
| ID | Cerință | Unde (permalink) | Cum se verifică |
| --- | --- | --- | --- |
| S2-R1 | Fișiere JS legate, hărți/stocuri încărcate la start | [index.html#L65-L68](https://github.com/PAIpepe/MultiStock/blob/main/index.html#L65-L68) | deschide pagina |
| S2-R2 | Tablou de stocuri cu id, titlu, in_stoc, locatia | [stocuri.js#L37-L41](https://github.com/PAIpepe/MultiStock/blob/main/stocuri.js#L37-L41) | citește codul |
| S2-R3 | Integrare hartă, adăugare imutabilă și filtru pe depozite | [stocuri.js#L13-L30](https://github.com/PAIpepe/MultiStock/blob/main/stocuri.js#L13-L30) | folosește pinii și formularul |
| S2-R4 | Validare la adăugare (respinge nume gol și locație invalidă) | [stocuri.js#L17-L24](https://github.com/PAIpepe/MultiStock/blob/main/stocuri.js#L17-L24) | trimite formular gol/incorect |
| S2-R5 | Păstrarea imutabilității (spread operator `...`) | [stocuri.js#L33](https://github.com/PAIpepe/MultiStock/blob/main/stocuri.js#L33) | citește funcția `adaugaProdus` |
| S2-R6 | Secțiunea Etapa 2 în README + jurnal AI actualizat | [ai-log/etapa-02.md](https://github.com/PAIpepe/MultiStock/blob/main/ai-log/etapa-02.md) | citește |
| S2-R7 | Commit-uri de etapă trimise pe GitHub | [Vezi commit-uri](https://github.com/PAIpepe/MultiStock/commits/main) | istoric commituri |

### Etapa 3: Proiect Vite și React
Aplicația se află acum în folderul frontend/, fiind construită cu Vite. Datele din etapa 2 au fost mutate în componenta principală; lista este afișată împreună cu harta interactivă și formularul de inventar.
### Cum se rulează
cd frontend
npm install
npm run dev
Apoi deschide adresa afișată în terminal (http://localhost:5173).
| ID | Cerință | Unde (permalink) | Cum se verifică |
|---|---|---|---|
| S3-R1 | npm run dev pornește fără erori | [frontend/package.json](https://github.com/PAIpepe/MultiStock/blob/main/frontend/package.json) | npm install, npm run dev |
| S3-R2 | numele aplicației și contorul calculate din date | [frontend/src/App.jsx](https://github.com/PAIpepe/MultiStock/blob/b3a3c45125bf47925451ea31d8d025dd4718a9ce/frontend/src/App.jsx) | editează datele, salvează |
| S3-R3 | datele din README, nu din exemplu | [frontend/src/App.jsx](https://github.com/PAIpepe/MultiStock/blob/b3a3c45125bf47925451ea31d8d025dd4718a9ce/frontend/src/App.jsx) | compară cu README |
| S3-R4 | stilurile din etapa 1 reutilizate | [frontend/src/App.css](https://github.com/PAIpepe/MultiStock/blob/main/frontend/src/App.css) | verifică vizual pagina |
| S3-R5 | node_modules ignorat, build-ul rulează cu succes | [frontend/.gitignore](https://github.com/PAIpepe/MultiStock/blob/main/frontend/.gitignore) | npm run build |
| S3-R6 | secțiunea Etapa 3 din README + jurnalul AI | [ai-log/etapa-03.md](https://github.com/PAIpepe/MultiStock/blob/main/ai-log/etapa-03.md) | citește |
| S3-R7 | commit-ul "Stage 3" publicat | [Vezi commit](https://github.com/PAIpepe/MultiStock/commit/b3a3c45125bf47925451ea31d8d025dd4718a9ce) | istoricul commit-urilor |

## Etapa 4: Componente construite din date
Lista este randată din date, prin intermediul a două componente:
- `ProdusList` primește întregul array și randează câte un card pentru fiecare element.
- `ProdusCard` primește un single element prin props și îl afișează.

### Etapa 4: Tabel de verificare

| ID | Cerință | Unde (permalink) | Cum se verifică |
|---|---|---|---|
| S4-R1 | Există cel puțin 2 componente în src/components/ | [frontend/src/components/](https://github.com/PAIpepe/MultiStock/tree/main/frontend/src/components) | deschide folderul |
| S4-R2 | cardul primește datele prin props | [frontend/src/components/ProdusCard.jsx](https://github.com/PAIpepe/MultiStock/blob/main/frontend/src/components/ProdusCard.jsx) | citește codul |
| S4-R3 | listă randată cu map + key={id}, fără avertismente | [frontend/src/components/ProdusList.jsx](https://github.com/PAIpepe/MultiStock/blob/main/frontend/src/components/ProdusList.jsx) | F12, Console |
| S4-R4 | mesaj afișat pentru lista goală | [frontend/src/components/ProdusList.jsx](https://github.com/PAIpepe/MultiStock/blob/main/frontend/src/components/ProdusList.jsx) | golește lista / filtrează gol |
| S4-R5 | starea elementului modifică aspectul cardului | [frontend/src/components/ProdusCard.jsx](https://github.com/PAIpepe/MultiStock/blob/main/frontend/src/components/ProdusCard.jsx) | comută stocul unui produs |
| S4-R6 | secțiunea Etapa 4 din README + jurnalul AI | [ai-log/etapa-04.md](https://github.com/PAIpepe/MultiStock/blob/main/ai-log/etapa-04.md) | citește |
| S4-R7 | commit-ul "Stage 4" publicat pe GitHub | [Vezi commit](https://github.com/PAIpepe/MultiStock/commit/a1f9a56c12a5cb3299211a64d5f347ae179b3c23) | istoricul commit-urilor |

## Etapa 5: State local și evenimente
Lista este păstrată în state-ul React. Bifarea și ștergerea funcționează direct din pagină, iar contoarele din antet se actualizează automat, fiind calculate derivat. Un buton dedicat din antet permite comutarea manuală între tema luminoasă și cea întunecată.

### Etapa 5: Tabel de verificare

| ID | Cerință | Unde (permalink) | Cum se verifică |
|---|---|---|---|
| S5-R1 | Lista păstrată în useState, în App | [frontend/src/App.jsx#L65](https://github.com/PAIpepe/MultiStock/blob/main/frontend/src/App.jsx#L65) | citește |
| S5-R2 | Bifarea schimbă state-ul și aspectul cardului | [frontend/src/App.jsx#L95-L101](https://github.com/PAIpepe/MultiStock/blob/main/frontend/src/App.jsx#L95-L101)<br>[frontend/src/components/ProdusCard.jsx#L10-L15](https://github.com/PAIpepe/MultiStock/blob/main/frontend/src/components/ProdusCard.jsx#L10-L15) | click pe checkbox |
| S5-R3 | Ștergerea elimină elementul din listă | [frontend/src/App.jsx#L103-L105](https://github.com/PAIpepe/MultiStock/blob/main/frontend/src/App.jsx#L103-L105)<br>[frontend/src/components/ProdusCard.jsx#L31-L38](https://github.com/PAIpepe/MultiStock/blob/main/frontend/src/components/ProdusCard.jsx#L31-L38) | click pe butonul Șterge |
| S5-R4 | Contorul din antet e derivat, nu în state | [frontend/src/App.jsx#L79-L81](https://github.com/PAIpepe/MultiStock/blob/main/frontend/src/App.jsx#L79-L81) | bifează checkbox, urmărește antetul |
| S5-R5 | Actualizări imutabile (fără push, splice, atribuiri) | [frontend/src/App.jsx#L95-L105](https://github.com/PAIpepe/MultiStock/blob/main/frontend/src/App.jsx#L95-L105) | citește codul |
| S5-R6 | Comutare temă: state + data-theme pe html | [frontend/src/App.jsx#L108-L112](https://github.com/PAIpepe/MultiStock/blob/main/frontend/src/App.jsx#L108-L112)<br>[frontend/src/App.css#L1-L20](https://github.com/PAIpepe/MultiStock/blob/main/frontend/src/App.css#L1-L20) | click pe buton, testează ambele teme OS |
| S5-R7 | Fără avertismente în consolă; README + jurnal AI | [README.md](https://github.com/PAIpepe/MultiStock/blob/main/README.md)<br>[ai-log/etapa-05.md](https://github.com/PAIpepe/MultiStock/blob/main/ai-log/etapa-05.md) | F12, tab-ul Console |
| S5-R8 | Commit-ul "Stage 5" publicat | [Vezi commit](https://github.com/PAIpepe/MultiStock/commit/93bac473a1d4dac05923ac85a32eb1fc03fa44b2) | istoricul commit-urilor GitHub |

## Etapa 6: date de la un API de test (mock)
Lista este servită de `json-server` din fișierul `db.json`. Aplicația o preia la încărcare și afișează o stare de așteptare (loading) și o stare de eroare.

`npm run api` # terminalul 1, http://localhost:3001
`npm run dev` # terminalul 2, http://localhost:5173

### Etapa 6: Tabel de verificare
| ID | Cerință | Unde (permalink) | Cum se verifică |
|---|---|---|---|
| S6-R1 | npm run api pornește, ruta afișează JSON | [package.json#L11](https://github.com/PAIpepe/MultiStock/blob/a5a44abdfd70ebd1ec91502647bf80a34a4ce2e1/frontend/package.json#L11), [db.json](https://github.com/PAIpepe/MultiStock/blob/main/frontend/db.json) | deschide localhost:3001/stocuri |
| S6-R2 | datele nu mai sunt scrise direct în React | | [citește codul](https://github.com/PAIpepe/MultiStock/blob/main/frontend/src/App.jsx) |
| S6-R3 | mesaj de încărcare în timpul așteptării | [App.jsx#L474](https://github.com/PAIpepe/MultiStock/blob/9ffe4e922dd23c79100964f909cffa353a2d8049/frontend/src/App.jsx#L474) | adaugă --delay 4000 la pornirea API-ului |
| S6-R4 | mesaj de eroare când API-ul este picat | | oprește npm run api, reîncarcă pagina |
| S6-R5 | fetch folosit doar în api.js, URL din env | [api.js#L3-L7](https://github.com/PAIpepe/MultiStock/blob/a5a44abdfd70ebd1ec91502647bf80a34a4ce2e1/frontend/src/api.js#L3-L7), [.env.example](https://github.com/PAIpepe/MultiStock/blob/main/frontend/env.example) | caută fetch în proiect |
| S6-R6 | secțiunea Etapa 6 în README + jurnal AI | [README.md](https://github.com/PAIpepe/MultiStock/blob/main/README.md), [ai-log/etapa-06.md](https://github.com/PAIpepe/MultiStock/blob/main/ai-log/etapa-06.md) | citește |
| S6-R7 | commit-ul "Etapa 6" a fost publicat | [Vezi commit](https://github.com/PAIpepe/MultiStock/commit/a5a44abdfd70ebd1ec91502647bf80a34a4ce2e1) | istoricul de commit-uri |

## Etapa 7: Integrare API (Mock Server) și UX/UI Modern

În această etapă, aplicația *MultiStock* a evoluat de la prototip frontend la o aplicație dinamică ce comunică cu un server de backend (mock), oferind persistență datelor și o experiență de utilizare premium.

#### Noutăți aduse:
*   **Persistența Datelor (REST API):**
    *   Trecerea la operațiuni asincrone (Fetch API) cu metodele `GET`, `POST`, `PATCH`, `DELETE`.
    *   Bază de date locală simulată prin pachetul `json-server` (`db.json`).
*   **Arhitectură Single Page Application (SPA):**
    *   Implementarea unui sistem de navigație (Acasă/Hartă vs. Inventar/Formular) fără reîncărcarea paginii.
    *   Extragerea constantelor (depozite, categorii) în `depozite.js` și crearea componentei `ProdusNav.jsx` pentru un cod mai modular.
*   **Modernizări majore de interfață (UI/UX):**
    *   **Header Animat:** Antetul devine compact ("sticky") la derularea paginii, rearanjând elementele orizontal pentru a maximiza spațiul vizual de lucru.
    *   **Tranziții fluide:** Efecte de _fade in_ și _slide_ la schimbarea secțiunilor aplicației, declanșate de chei React (`key`).
    *   **Smart Popovers:** Meniurile depozitelor de pe hartă își calculează dinamic poziția (deschidere în sus sau în jos) pe baza coordonatelor SVG, prevenind ieșirea din ecran.
    *   **Formulare și Validări:** Renunțarea la alertele native blocante (`alert()`) în favoarea unor mesaje de eroare inline, afișate direct în formular, cu borduri roșii pentru câmpurile invalide (`aria-invalid`).
    *   **Design Glassmorphism:** Stilizare modernă pentru butonul de comutare a temei Luminos/Întunecat.

#### 🛠️ Cum se rulează aplicația în Etapa 7:
Pentru ca aplicația să funcționeze, trebuie să rulezi **două terminale** simultan:

1. **Terminalul 1 (Serverul de Backend):**
   ```bash
   cd frontend
   npm run api

2. **Terminalul 2 (Serverul de Frontend):**
   ```bash
   cd frontend
   npm run dev

### Etapa 7: Tabel de verificare
| ID | Cerință | Unde (permalink) | Cum se verifică |
|---|---|---|---|
| S7-R1 | Câmpurile obligatorii nu trimit fetch; focus blocat | [ProdusForm.jsx#L28-L38](https://github.com/PAIpepe/MultiStock/blob/9fda3f3332bfad2810381e7c9da2ba901fc2fa9f/frontend/src/components/ProdusForm.jsx#L28-L38) | Testează un formular gol / incomplet; nu se reîncarcă pagina. |
| S7-R2 | Formularul se golește doar după răspunsul 20x al API-ului | [ProdusForm.jsx#L38-L47](https://github.com/PAIpepe/MultiStock/blob/9fda3f3332bfad2810381e7c9da2ba901fc2fa9f/frontend/src/components/ProdusForm.jsx#L38-L47) | Apasă "Adaugă" cu date corecte și oprește serverul mock; textul trebuie să rămână completat. |
| S7-R3 | Butonul de adăugare este dezactivat în timpul trimiterii | [ProdusForm.jsx#L104-L106](https://github.com/PAIpepe/MultiStock/blob/9fda3f3332bfad2810381e7c9da2ba901fc2fa9f/frontend/src/components/ProdusForm.jsx#L104-L106) | Adaugă un delay pe rețea și verifică disable-ul vizual. |
| S7-R4 | Câmpurile cu validare eșuată au atributul `aria-invalid` setat corespunzător | [ProdusForm.jsx#L66](https://github.com/PAIpepe/MultiStock/blob/9fda3f3332bfad2810381e7c9da2ba901fc2fa9f/frontend/src/components/ProdusForm.jsx#L66) | Inspectează câmpul în DOM după o eroare. |
| S7-R5 | Mesajele de eroare sunt afișate direct în UI (nu prin `alert()`) | [ProdusForm.jsx#L103](https://github.com/PAIpepe/MultiStock/blob/9fda3f3332bfad2810381e7c9da2ba901fc2fa9f/frontend/src/components/ProdusForm.jsx#L103) | Verifică un formular greșit. |
| S7-R6 | Ștergerea are un efect instant și face fetch DELETE către API | [App.jsx#L94-L102](https://github.com/PAIpepe/MultiStock/blob/9fda3f3332bfad2810381e7c9da2ba901fc2fa9f/frontend/src/App.jsx#L94-L102) | Șterge un produs și fă refresh la pagină. Modificarea persistă. |
| S7-R7 | Comutarea stării apelează API-ul cu PATCH și se păstrează la reîncărcare | [App.jsx#L84-L93](https://github.com/PAIpepe/MultiStock/blob/9fda3f3332bfad2810381e7c9da2ba901fc2fa9f/frontend/src/App.jsx#L84-L93) | Bifează un checkbox și fă refresh. |
| S7-R8 | Atribute `data-testid` adăugate pe elementele cheie (form, list, item, toggle, delete etc.) | [ProdusCard.jsx#L9-L37](https://github.com/PAIpepe/MultiStock/blob/9fda3f3332bfad2810381e7c9da2ba901fc2fa9f/frontend/src/components/ProdusCard.jsx#L9-L37) | Inspectează elementele în DOM. |
| S7-R9 | README.md și jurnalul AI sunt actualizate pentru Etapa 7 | [README.md](https://github.com/PAIpepe/MultiStock/blob/9fda3f3332bfad2810381e7c9da2ba901fc2fa9f/README.md) | Citește. |
| S7-R10| Commit-ul etapei 7 este prezent în istoricul GitHub | [Vezi commit](https://github.com/PAIpepe/MultiStock/commit/9fda3f3332bfad2810381e7c9da2ba901fc2fa9f) | Vizitează repository-ul. |

## Etapa 8: Navigare cu React Router și stilizare pe componente (CSS Modules)

Aplicația a fost împărțită în mai multe pagini folosind **React Router** (`react-router-dom`), cu un `Layout` comun (`<NavLink>` + `<Outlet />`) și navigare fără reîncărcarea paginii:
- `/` (`StocuriPage`) — formularul de adăugare, statisticile și inventarul complet (cu suport pentru filtrare prin `?depozit=...`);
- `/harta` (`HartaPage`) — harta interactivă a României cu cele 5 depozite județene și popover-uri pentru gestionarea rapidă a stocurilor;
- `/stocuri/:id` (`ProdusDetaliuPage`) — pagina de detaliu care citește `id`-ul cu `useParams()`, încarcă produsul prin `fetchStoc(id)`, afișează informațiile extinse ale depozitului (județ, adresă) și tratează eroarea `404` pentru ID-uri inexistente;
- `/despre` (`DesprePage`) — prezentarea aplicației și a stack-ului tehnic;
- `*` (`NotFoundPage`) — pagina `404` pentru adrese inexistente (`data-testid="not-found"`).

Stilurile au fost migrate din fișierul global `App.css` în **`index.css`** (doar variabile de temă Light/Dark persistate în `localStorage` și clase comune) și fișiere **`.module.css`** dedicate fiecărei componente și pagini. Au fost păstrate toate atributele `data-testid` din Etapa 7 și adăugate cele noi pentru Etapa 8 (`nav`, `item-link`, `detail`, `detail-title`, `not-found`).

### Etapa 8: Tabel de verificare
| ID | Cerință | Unde (permalink) | Cum se verifică |
|---|---|---|---|
| S8-R1 | Navigarea din antet schimbă pagina fără reîncărcare | [App.jsx](https://github.com/PAIpepe/MultiStock/blob/e8bceb73bb0e835470f25fcee0f1fe4c8ff80f9a/frontend/src/App.jsx), [Layout.jsx#L44-L54](https://github.com/PAIpepe/MultiStock/blob/e8bceb73bb0e835470f25fcee0f1fe4c8ff80f9a/frontend/src/components/Layout.jsx#L44-L54) | Click pe linkurile din antet și verifică fila Network (fără cerere HTML). |
| S8-R2 | Un click pe un element deschide pagina lui de detaliu | [ProdusCard.jsx#L23-L29](https://github.com/PAIpepe/MultiStock/blob/e8bceb73bb0e835470f25fcee0f1fe4c8ff80f9a/frontend/src/components/ProdusCard.jsx#L23-L29), [ProdusDetaliuPage.jsx](https://github.com/PAIpepe/MultiStock/blob/e8bceb73bb0e835470f25fcee0f1fe4c8ff80f9a/frontend/src/pages/ProdusDetaliuPage.jsx) | Click pe titlul unui produs din listă. |
| S8-R3 | Reîncărcarea pe adresa de detaliu funcționează; un id inexistent afișează eroare | [ProdusDetaliuPage.jsx#L13-L54](https://github.com/PAIpepe/MultiStock/blob/e8bceb73bb0e835470f25fcee0f1fe4c8ff80f9a/frontend/src/pages/ProdusDetaliuPage.jsx#L13-L54) | Fă refresh pe `/stocuri/1` și deschide `/stocuri/999`. |
| S8-R4 | O adresă inexistentă duce la pagina 404 a aplicației | [App.jsx#L17](https://github.com/PAIpepe/MultiStock/blob/e8bceb73bb0e835470f25fcee0f1fe4c8ff80f9a/frontend/src/App.jsx#L17), [NotFoundPage.jsx](https://github.com/PAIpepe/MultiStock/blob/e8bceb73bb0e835470f25fcee0f1fe4c8ff80f9a/frontend/src/pages/NotFoundPage.jsx) | Deschide `/ceva`. |
| S8-R5 | Fiecare componentă are propriul `.module.css`; `index.css` conține doar stiluri comune | [src/components](https://github.com/PAIpepe/MultiStock/tree/e8bceb73bb0e835470f25fcee0f1fe4c8ff80f9a/frontend/src/components), [src/pages](https://github.com/PAIpepe/MultiStock/tree/e8bceb73bb0e835470f25fcee0f1fe4c8ff80f9a/frontend/src/pages), [index.css](https://github.com/PAIpepe/MultiStock/blob/e8bceb73bb0e835470f25fcee0f1fe4c8ff80f9a/frontend/src/index.css) | Citește fișierele și verifică clasele generate în DevTools → Elements. |
| S8-R6 | Atributele `data-testid` (tabelele 7.3 și 8.2) sunt prezente; ruta de detaliu `/stocuri/:id` | [Layout.jsx](https://github.com/PAIpepe/MultiStock/blob/e8bceb73bb0e835470f25fcee0f1fe4c8ff80f9a/frontend/src/components/Layout.jsx), [ProdusCard.jsx](https://github.com/PAIpepe/MultiStock/blob/e8bceb73bb0e835470f25fcee0f1fe4c8ff80f9a/frontend/src/components/ProdusCard.jsx), [ProdusDetaliuPage.jsx](https://github.com/PAIpepe/MultiStock/blob/e8bceb73bb0e835470f25fcee0f1fe4c8ff80f9a/frontend/src/pages/ProdusDetaliuPage.jsx), [NotFoundPage.jsx](https://github.com/PAIpepe/MultiStock/blob/e8bceb73bb0e835470f25fcee0f1fe4c8ff80f9a/frontend/src/pages/NotFoundPage.jsx) | `querySelector` în consolă (`[data-testid=nav] a`, `[data-testid=detail-title]`). |
| S8-R7 | Secțiunea Etapa 8 în README și jurnalul AI completat | [README.md](https://github.com/PAIpepe/MultiStock/blob/e8bceb73bb0e835470f25fcee0f1fe4c8ff80f9a/README.md), [ai-log/etapa-08.md](https://github.com/PAIpepe/MultiStock/blob/e8bceb73bb0e835470f25fcee0f1fe4c8ff80f9a/ai-log/etapa-08.md) | Citește fișierele. |
| S8-R8 | Commit-ul Etapei 8 este publicat pe GitHub | [Vezi commit](https://github.com/PAIpepe/MultiStock/commit/e8bceb73bb0e835470f25fcee0f1fe4c8ff80f9a) | Verifică istoricul de commit-uri. |

## Etapa 9: Backend propriu (Node.js și Express)

`json-server` și `frontend/db.json` au fost eliminate complet din proiect. API-ul este acum un server propriu **Node.js + Express 5** aflat în `backend/`, cu:
- rute REST complete pe `/stocuri` (`GET`, `GET /:id`, `POST`, `PATCH /:id`, `DELETE /:id`) și ruta de verificare `/health`;
- validare pe server (`backend/src/validation.js`) cu listă albă de câmpuri, validare parțială pentru `PATCH`, verificare `id` și răspunsuri de eroare unitare `{ "error": "..." }`;
- middleware-uri `cors()` (pentru originea frontendului), `express.json()`, handler pentru rute inexistente (`404`) și tratare centralizată a erorilor;
- citirea mesajelor `body.error` direct în `frontend/src/api.js`.

Datele sunt păstrate momentan în memorie și se resetează la repornirea serverului.

### Cum se rulează aplicația
```bash
# Terminal 1 — Backend (port 3001)
cd backend && npm install && npm run dev

# Terminal 2 — Frontend (port 5173)
cd frontend && npm install && npm run dev
```

### Etapa 9: Tabel de verificare
| ID | Cerință | Unde (permalink) | Cum se verifică |
|---|---|---|---|
| S9-R1 | `npm run dev` din `backend/` pornește serverul pe portul 3001 | [backend/package.json](https://github.com/PAIpepe/MultiStock/blob/68663c8e5ad241799159b76f303252d822dbef7f/backend/package.json), [server.js](https://github.com/PAIpepe/MultiStock/blob/68663c8e5ad241799159b76f303252d822dbef7f/backend/src/server.js) | Pornește serverul și deschide `/health`. |
| S9-R2 | Toate cele cinci rute răspund cu codurile HTTP corecte | [routes/stocuri.js](https://github.com/PAIpepe/MultiStock/blob/68663c8e5ad241799159b76f303252d822dbef7f/backend/src/routes/stocuri.js) | Rulează comenzile `curl` din README. |
| S9-R3 | Datele invalide întorc 400 cu un mesaj clar | [validation.js](https://github.com/PAIpepe/MultiStock/blob/68663c8e5ad241799159b76f303252d822dbef7f/backend/src/validation.js) | Trimite `POST` cu `titlu` gol (`{"titlu":""}`). |
| S9-R4 | Aplicația React funcționează cu `json-server` eliminat | [frontend/package.json](https://github.com/PAIpepe/MultiStock/blob/68663c8e5ad241799159b76f303252d822dbef7f/frontend/package.json), [api.js](https://github.com/PAIpepe/MultiStock/blob/68663c8e5ad241799159b76f303252d822dbef7f/frontend/src/api.js) | Oprește tot în afară de backend și testează CRUD în browser. |
| S9-R5 | Fără erori CORS în consola browserului | [app.js](https://github.com/PAIpepe/MultiStock/blob/68663c8e5ad241799159b76f303252d822dbef7f/backend/src/app.js) | Deschide DevTools → Console pe `http://localhost:5173`. |
| S9-R6 | Secțiunea Etapa 9 în README și jurnalul AI completat | [README.md](https://github.com/PAIpepe/MultiStock/blob/68663c8e5ad241799159b76f303252d822dbef7f/README.md), [ai-log/etapa-09.md](https://github.com/PAIpepe/MultiStock/blob/68663c8e5ad241799159b76f303252d822dbef7f/ai-log/etapa-09.md) | Citește fișierele. |
| S9-R7 | Commit-ul Etapei 9 este publicat pe GitHub | [Vezi commit](https://github.com/PAIpepe/MultiStock/commit/68663c8e5ad241799159b76f303252d822dbef7f) | Verifică istoricul de commit-uri. |