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
2. Scaun Ergonomic Birou, epuizat, Cluj
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

## Etapa 3: Proiect Vite și React
Aplicația se află acum în folderul frontend/, fiind construită cu Vite.[cite: 10] Datele din etapa 2 au fost mutate în componenta principală; lista este afișată împreună cu harta interactivă și formularul de inventar.

## Cum se rulează
cd frontend
npm install
npm run dev
Apoi deschide adresa afișată în terminal (http://localhost:5173).[cite: 10]

### Etapa 3: Tabel de verificare

| ID | Cerință | Unde (permalink) | Cum se verifică |
|---|---|---|---|
| S3-R1 | npm run dev pornește fără erori | [frontend/package.json](https://github.com/PAIpepe/MultiStock/blob/main/frontend/package.json) | npm install, npm run dev |[cite: 10]
| S3-R2 | numele aplicației și contorul calculate din date | [frontend/src/App.jsx#L152-L220](https://github.com/PAIpepe/MultiStock/blob/b3a3c45125bf47925451ea31d8d025dd4718a9ce/frontend/src/App.jsx#L152-L220) | editează datele, salvează |[cite: 10, 11]
| S3-R3 | datele din README, nu din exemplu | [frontend/src/App.jsx#L60-L137](https://github.com/PAIpepe/MultiStock/blob/b3a3c45125bf47925451ea31d8d025dd4718a9ce/frontend/src/App.jsx#L60-L137) | compară cu README |[cite: 10, 11]
| S3-R4 | stilurile din etapa 1 reutilizate | [frontend/src/App.css](https://github.com/PAIpepe/MultiStock/blob/main/frontend/src/App.css) | verifică vizual pagina |[cite: 10, 11]
| S3-R5 | node_modules ignorat, build-ul rulează cu succes | [frontend/.gitignore](https://github.com/PAIpepe/MultiStock/blob/main/frontend/.gitignore) | npm run build |[cite: 10, 11]
| S3-R6 | secțiunea Etapa 3 din README + jurnalul AI | README.md, [ai-log/etapa-03.md](https://github.com/PAIpepe/MultiStock/blob/main/ai-log/etapa-03.md) | citește |[cite: 10, 11]
| S3-R7 | commit-ul "Stage 3" publicat | [https://github.com/PAIpepe/MultiStock/commit/b3a3c45125bf47925451ea31d8d025dd4718a9ce] | istoricul commit-urilor |[cite: 10, 11]
