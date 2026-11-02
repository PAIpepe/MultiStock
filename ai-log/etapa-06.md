# Jurnal AI - Etapa 6


## Conversații
https://share.gemini.google/JBYcXkOqJtgb


## Modul de utilizare

Am apelat la Gemini pentru a implementa cerințele din ghidul Etapei 6 (Date de la un API - useEffect) pe aplicația mea, MultiStock. AI-ul m-a ghidat în configurarea serverului mock cu json-server, mutarea datelor în fișierul db.json, crearea logicii de cereri HTTP cu fetch în api.js și gestionarea stărilor de așteptare (loading) și eroare la montarea componentei.


### Interacțiuni și Prompt-uri principale:

**Răspunsul AI și pașii urmați:**
AI-ul a extras cerințele din ghid și mi-a structurat implementarea pe pași clari:
1. **Configurarea serverului mock:** Am instalat `json-server@0.17.4` și am adăugat scriptul `"api": "json-server --watch db.json --port 3001"` în secțiunea `"scripts"` din `package.json`[cite: 2].
2. **Crearea datelor:** Am construit fișierul `db.json` cu lista de stocuri, distribuind produsele pe cele 5 depozite (București, Cluj, Timișoara, Pitești, Iași) cu atributele corecte (`titlu`, `locatia`, `cantitate`, `in_stoc`)[cite: 2].
3. **Comunicarea HTTP:** Am creat `src/api.js` pentru funcția de `fetch` izolată, protejată prin verificarea `res.ok`, și am setat adresa API-ului prin variabila de mediu din `.env.example`[cite: 3, 4].
4. **Integrarea în React (useEffect):** În `App.jsx`, am eliminat datele hardcodate, înlocuindu-le cu trei stări noi (`stocuri`, `loading`, `error`). Am implementat `useEffect` pentru a cere datele la montarea componentei, folosind un bloc `try/catch/finally` și variabila de curățare `ignore`[cite: 4, 9].
5. **Actualizarea interfeței:** Am adaptat afișarea listei de produse adăugând randare condiționată pentru starea de așteptare și pentru afișarea mesajului de eroare[cite: 5].

**Probleme întâmpinate și rezolvate cu AI:**
* **Eroare la pornirea serverului:** Am primit `Missing script: "api"` pentru că pusesem comanda greșit în `package.json` (în afara blocului de scripturi). AI-ul m-a ghidat să o mut în interiorul blocului `"scripts"`.
* **Produsele nu apăreau pe hartă:** Inițial aveam chei greșite în `db.json` (`produs`, `depozit`), ceea ce făcea ca produsele să nu se mapeze corect pe județe. AI-ul mi-a regenerat JSON-ul folosind proprietățile exacte pe care le aștepta componenta mea (`titlu`, `locatia`).
