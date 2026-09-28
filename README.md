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
Gemini | Clarificarea temei de proiect, structurarea modelului de date si generarea sablonului HTML/CSS pentru Etapa 1.

Detalii pentru fiecare etapa: consultati folderul `ai-log/`.

## Cum se ruleaza

Deschideti `index.html` intr-un browser. Nu necesita etapa de build sau server.

## Stare proiect

- [x] Etapa 1: mockup static
- [ ] Etapa 2: logica pe date în JavaScript

## Tabel de verificare

| ID | Cerință | Unde (permalink) | Cum se verifică |
| --- | --- | --- | --- |
| S1-R1 | README: descriere, campuri, date de test, modul de rulare | [README.md](https://github.com/PAIpepe/MultiStock/blob/358bad4bf956691e046ba9c2c849111016258e09/README.md?plain=1#L1-L18)
| S1-R2 | Secțiunea AI usage | [README.md](https://github.com/PAIpepe/MultiStock/blob/358bad4bf956691e046ba9c2c849111016258e09/README.md?plain=1#L20-L26)
| S1-R3 | Jurnalul AI pentru etapa 1 | [ai-log/etapa-01.md](https://github.com/PAIpepe/MultiStock/blob/main/ai-log/etapa-01.md)
| S1-R4 | antet, formular (text + select), 3 carduri cu date proprii | [https://github.com/PAIpepe/MultiStock/blob/259a51d96560d726450dc323ae76b1fdeadbff5a/index.html#L10-L60] | deschide pagina |
| S1-R5 | cardul finalizat arată diferit | [https://github.com/PAIpepe/MultiStock/blob/259a51d96560d726450dc323ae76b1fdeadbff5a/style.css#L142-L149] | verifică cardul |
| S1-R6 | 2 coloane pe desktop, 1 sub 700px | [https://github.com/PAIpepe/MultiStock/blob/259a51d96560d726450dc323ae76b1fdeadbff5a/style.css#L157-L162] | redimensionare < 700px |
| S1-R7 | focus vizibil, temă întunecată lizibilă | [https://github.com/PAIpepe/MultiStock/blob/259a51d96560d726450dc323ae76b1fdeadbff5a/style.css#L165-L180] | Tab; dark mode |
| S1-R8 | commit "Stage 1" trimis pe GitHub | [Vezi commit](https://github.com/PAIpepe/MultiStock/commit/259a51d96560d726450dc323ae76b1fdeadbff5a)
