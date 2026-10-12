# Jurnal utilizare AI - Etapa 3 (Inițializarea proiectului Vite și React)

## Instrumente folosite
**Gemini**


## Conversații
https://share.gemini.google/B7agUoSaVNAf
https://share.gemini.google/wNQJ4SQZ3wJw


## Modul de utilizare

Am apelat la Gemini pentru a mă ghida în procesul de inițializare a noului proiect React folosind Vite, deblocarea execuției scripturilor în terminalul PowerShell și structurarea primei componente JSX pentru afișarea inventarului.

### Interacțiuni și Prompt-uri principale:

**Rezolvarea blocajelor din terminal pentru NPM**

   * **Prompt:** *"npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system."*
   * **Rezultat:** Am primit comanda necesară pentru a permite rularea scripturilor npm în PowerShell, deblocând astfel instalarea și crearea proiectului Vite.

2. **Configurarea framework-ului Vite pentru React**
   * **Prompt:** *"La întrebarea următoare (Select a variant:), alege JavaScript și apasă Enter. javascript simplu fara compiler fara nimic?"*
   * **Rezultat:** Gemini a clarificat diferențele dintre opțiuni și a confirmat selectarea variantei standard de JavaScript și a linterului ESLint pentru noul proiect frontend.

3. **Scrierea și adaptarea componentei App.jsx**
   * **Prompt:** *"const LOCATII = ["bucuresti", "cluj", "timisoara", "pitesti", "iasi"]; ... tot imi da eroare in consola"*
   * **Rezultat:** Am primit codul corectat și am înțeles că array-ul de stocuri trebuie mutat deasupra funcției principale, iar datele au fost integrate corect în JSX.

### Contribuția AI
M-a ajutat să depășesc problemele tehnice de mediu cu Node.js pe Windows, să curăț corect fișierele implicite generate de Vite și să înțeleg sintaxa de bază JSX pentru a afișa și calcula corect numărul de stocuri active din aplicația mea.