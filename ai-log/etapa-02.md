# Jurnal utilizare AI - Etapa 2 (Integrare Hartă & Logică JS)

## Instrumente folosite
- **Gemini**

## Conversații
- https://share.gemini.google/ZRAwKMhc7DC5
- https://gemini.google.com/app/7ce1670be815c8a5

## Modul de utilizare

Am apelat la Gemini pentru a clarifica modul de conectare a logicii imutabile JavaScript cu interfața grafică (`index.html`), integrarea vizuală a hărții României și actualizarea dinamică a numărului de produse din fiecare depozit.

### Interacțiuni și Prompt-uri principale:

1. **Separarea fișierelor și structurarea proiectului**
   * **Prompt:** *"pentru logica cu javascript, fa mi un fisier special separat numit logica_harta.js unde se intampla ce trebuie"*
   * **Rezultat:** Am creat un fișier dedicat (`logica_harta.js`) pentru a izola funcționalitățile legate de filtru și hartă, menținând codul organizat și ușor de întreținut.

2. **Integrarea logicii de stocuri cu interfața**
   * **Prompt:** *"unde bag integrarea asta?"*
   * **Rezultat:** Gemini a explicat structura și conectarea fișierelor din proiect (`stocuri.js`, `logica_harta.js`, `index.html` și `style.css`), generând varianta actualizată a fișierului `stocuri.js` pentru a procesa formularul, a adăuga elementele în DOM și a notifica harta pentru actualizarea indicatorilor de stoc.

3. **Includerea hărții locale și adaptarea stilului CSS**
   * **Prompt:** *"E:\Facultate\Anul III\Tehnologii Web Proiect\MultiStock\images am harta proiectului aici, ce trebuie modificat"*
   * **Rezultat:** Am primit modificările exacte pentru căile de imagine din HTML (`src="images/..."`), ajustările CSS pentru responsivitatea imaginii și indicații pentru calibrarea pozițiilor (`top`/`left`) ale pinilor interactivi de pe hartă.

### Contribuția AI
M-a ajutat să separ curat responsabilitățile între logica de date (`stocuri.js`), logica hărții (`logica_harta.js`) și prezentare (`index.html`/`style.css`), asigurând funcționarea hărții din folderul local de resurse și sincronizarea în timp real a produselor cu pinii depozitelor.