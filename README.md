# MultiStock

MultiStock este o aplicatie web conceputa pentru gestionarea stocurilor si urmarirea disponibilitatii produselor in mai multe depozite.

## Modelul de date

| Camp | Tip | Note |
| --- | --- | --- |
| titlu | text | obligatoriu, max 100 caractere (ex: Nume produs) |
| in_stoc | boolean | comutat din lista, implicit true |
| locatia | valori fixe | Bucuresti, Cluj, Timisoara |
| categorie | relatie | Electronice, Birotica, Echipamente |
| utilizator | relatie | proprietarul elementului (din saptamana 11) |

Date de test utilizate în toate etapele:
1. Laptop Dell XPS 15, activ, Bucuresti
2. Scaun Ergonomic Birou, gata (epuizat), Cluj
3. Cablu HDMI 2m, activ, Timisoara

## Utilizarea AI

Instrument | Utilizat pentru
--- | ---
Gemini | Clarificarea temei de proiect, structurarea modelului de date si generarea sablonului HTML/CSS pentru Etapa 1. Implementarea logicii imutabile pe date și structurarea testelor în consolă pentru Etapa 2.

Detalii pentru fiecare etapa: consultati folderul `ai-log/`.

## Cum se ruleaza

Deschideti `index.html` intr-un browser. Nu necesita etapa de build sau server. Pentru Etapa 2, apasati tasta `F12` pentru a deschide consola (Developer Tools -> Console) si a vizualiza logica pe date in rulare.

## Stare proiect

- [x] Etapa 1: mockup static
- [x] Etapa 2: logica pe date în JavaScript

## Tabel de verificare

### Etapa 1
| ID | Cerință | Unde (permalink) | Cum se verifică |
| --- | --- | --- | --- |
| S1-R1 | README: descriere, campuri, date de test, modul de rulare | [README.md](https://github.com/PAIpepe/MultiStock/blob/358bad4bf956691e046ba9c2c849111016258e09/README.md?plain=1#L1-L18) | citește |
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
| S2-R1 | Fișier JS legat, afișează în consolă la încărcare | [index.html](https://github.com/PAIpepe/MultiStock/blob/ffbf76d6a54dc5c088b4475057d17158622744d0/index.html#L66) | deschide pagina, F12 |
| S2-R2 | Minim 3 elemente cu id, titlu, in_stoc, locatia | [stocuri.js#L2-L6](https://github.com/PAIpepe/MultiStock/blob/main/stocuri.js#L2-L6) | citește codul |
| S2-R3 | listare, numărare, căutare, adăugare, comutare, ștergere | [stocuri.js#L12-L56](https://github.com/PAIpepe/MultiStock/blob/main/stocuri.js#L12-L56) | output consolă |
| S2-R4 | adăugarea respinge nume gol și locație invalidă | [stocuri.js#L77-L78](https://github.com/PAIpepe/MultiStock/blob/main/stocuri.js#L77-L78) | ultimele 2 linii consolă |
| S2-R5 | array-ul original neschimbat după adăugare | [stocuri.js#L68](https://github.com/PAIpepe/MultiStock/blob/main/stocuri.js#L68) | linie consolă |
| S2-R6 | secțiunea Etapa 2 în README + jurnal AI | [ai-log/etapa-02.md](https://github.com/PAIpepe/MultiStock/blob/main/ai-log/etapa-02.md) | citește |
| S2-R7 | commit "Stage 2" trimis pe GitHub | [Vezi commit-uri](https://github.com/PAIpepe/MultiStock/commits/main) | istoric commituri |