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