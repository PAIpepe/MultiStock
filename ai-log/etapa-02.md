# Jurnal utilizare AI - Etapa 2

## Instrumente folosite
* **Gemini**


## Conversații
https://share.gemini.google/bcQduxCpCdeM

## Modul de utilizare

Am apelat la Gemini pentru a clarifica cerințele tehnice din ghidul etapei și pentru a adapta funcțiile JavaScript imutabile la modelul de date specific proiectului MultiStock.

### Interacțiuni și Prompt-uri principale:

1. **Clarificarea integrării scriptului**
   * **Prompt:** *"cum folosesc etapa asta pe proiectul meu, iti trimit index.html?"* (alături de încărcarea fișierului PDF cu indicațiile etapei).
   * **Rezultat:** Am clarificat faptul că interfața vizuală din Etapa 1 nu trebuie modificată absolut deloc, logica fiind separată strict în fișierul JS și testată exclusiv în consolă.

2. **Generarea logicii imutabile pe date**
   * **Prompt:** *"asta e README ul este o aplicatie de managuire a stockului in mai multe depozite din tara"* (alături de detaliile modelului de date: `titlu`, `in_stoc`, `locatia`).
   * **Rezultat:** Gemini a generat structura completă pentru fișierul `stocuri.js`. Am obținut funcțiile de bază folosind exclusiv metodele de array permise (`map`, `filter`, `reduce`), asigurând calcularea corectă a id-ului nou și respectarea imutabilității (returnarea de array-uri și obiecte noi prin spread operator `...`).

3. **Validarea testelor**
   * **Prompt:** *"e bine?"* (însoțit de o captură de ecran cu rezultatele obținute în consola browserului).
   * **Rezultat:** AI-ul a confirmat că rezultatele demonstrează îndeplinirea tuturor cerințelor (citirea datelor, izolarea modificărilor pe un array nou, funcționarea ștergerii și mesajele de eroare la validarea locațiilor greșite și a titlurilor goale).

### Contribuția AI
M-a ajutat să implementez corect și rapid conceptul de funcții imutabile (esențial pentru trecerea ulterioară la React) și să testez logica independent de DOM.