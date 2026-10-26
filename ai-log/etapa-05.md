# Jurnal utilizare AI - Etapa 5 (State local și evenimente)

## Instrumente folosite
**Gemini**

## Conversații
https://share.gemini.google/n9azYUgqCghx

## Modul de utilizare

Am apelat la Gemini pentru a implementa cerințele din ghidul Etapei 5 (State local și evenimente) pe aplicația mea, MultiStock. AI-ul m-a ghidat în mutarea datelor în state, refactorizarea funcțiilor de ștergere și bifare, și implementarea comutatorului pentru tema luminoasă/întunecată.

### Interacțiuni și Prompt-uri principale:

1. **Mutarea datelor în state și actualizări imutabile**
   * **Prompt:** *"deci ce trebuie sa modific prima oara"* / *"asta e app.jsx , modifica l"*
   * **Rezultat:** Gemini m-a ajutat să înlocuiesc array-ul fix cu `useState(DATE_INITIALE)` și să implementez logica de ștergere/bifare direct în `App.jsx`, folosind forma cu funcție `(prev) => ...` pentru a asigura actualizările imutabile.

2. **Implementarea temei luminoase/întunecate (Light/Dark Mode)**
   * **Prompt:** *"deci in fisierul css adaug pur si simplu doua puncte noi? sau unul il modific si altul il adaug"* / *"a aparut butonul pe site dar nu functioneaza..."*
   * **Rezultat:** Am clarificat cum funcționează atributul `data-theme` pe elementul `<html>`. AI-ul mi-a explicat cum să suprascriu tema sistemului folosind selectorul `:root:not([data-theme="light"])` și să setez corect noile variabile CSS.

3. **Ajustări vizuale și tranziții CSS**
   * **Prompt:** *"vreau sa se faca o animatie la schimbarea culorilor..."* / *"pe modul luminos si albastrul asta as vrea sa l fac mai luminos"*
   * **Rezultat:** Am adăugat proprietatea `transition` pentru treceri fluide între teme și am creat variabile dedicate (ex. `--header-bg`) pentru a controla independent culorile din antet în ambele moduri.

4. **Validarea accesibilității și a checkbox-ului controlat**
   * **Prompt:** *"ce am facut si ce mai am de facut?"* (trimițând `ProdusCard.jsx`)
   * **Rezultat:** AI-ul a observat că foloseam un `<button>` în loc de `<input type="checkbox">` pentru bifare. Mi-a refactorizat structura folosind un checkbox controlat (cu `checked` și `onChange`) învelit în `<label>`, și a adăugat `aria-label` pe butonul de ștergere pentru accesibilitate.

### Contribuția AI
M-a ajutat să aplic corect conceptele de "state" și "valoare derivată", m-a ghidat în rezolvarea problemelor de specificitate din CSS pentru teme și s-a asigurat că respect absolut toate criteriile de calitate (accesibilitate, inputs controlate, imutabilitate) din lista de verificare S5-R1 - S5-R8 a etapei.