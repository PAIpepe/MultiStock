## Jurnal AI - Etapa 9: Backend propriu (Node.js și Express)

## Conversații
https://share.gemini.google/AhscEe5tWUkg

**Obiectivele etapei:**
Înlocuirea completă a serverului de test `json-server` cu un API REST propriu scris în Node.js + Express 5 în folderul `backend/`, implementarea celor 5 operații CRUD pe ruta `/stocuri`, validarea datelor pe server (listă albă de câmpuri), configurarea CORS și actualizarea frontendului pentru a afișa mesajele de eroare trimise de server.

**Prompt-uri și Soluții principale explorate cu asistentul AI:**

1. **Adaptarea backendului Express la tema MultiStock:**
   - *Prompt:* "Cum adaptez etapa asta pentru proiectul meu?"
   - *Soluție:* Am inițializat proiectul `backend/` cu `"type": "module"`, `express` (v5) și `cors`, organizat în:
     - `src/server.js` (pornirea pe portul `3001`) separat de `src/app.js` (middleware-uri `cors()`, `express.json()`, ruta `/health`, montarea `/stocuri`, handler 404 și middleware centralizat de erori);
     - `src/validation.js` (`valideazaStoc` cu suport `partial: true` pentru `PATCH`, listă albă pentru `titlu`, `locatia`, `categorie`, `cantitate`, `in_stoc` și funcția `parseId`);
     - `src/routes/stocuri.js` (rutele `GET /stocuri`, `GET /stocuri/:id`, `POST /stocuri`, `PATCH /stocuri/:id`, `DELETE /stocuri/:id` cu date în memorie și codurile HTTP `200`, `201`, `204`, `400`, `404`).

2. **Eliminarea `json-server` și sincronizarea `package-lock.json`:**
   - *Prompt:* "Să se actualizeze cum? Sau de ce?"
   - *Soluție:* Am șters `frontend/db.json`, scriptul `"api"` și dependența `"json-server"` din `frontend/package.json`, apoi am rulat `npm install` în `frontend/` (eliminând 127 de pachete) pentru a menține `package-lock.json` sincronizat pentru rulările cu `npm ci`. Am actualizat `frontend/src/api.js` pentru a citi câmpul `body.error` din răspunsurile de eroare ale serverului.

3. **Depanare port ocupat și structură de foldere în `backend/`:**
   - *Problemă 1:* La accesarea `http://localhost:3001/health`, browserul afișa `{}` (răspunsul 404 al vechiului `json-server` rămas pornit pe portul 3001). După oprirea acestuia, cererile au ajuns la serverul Express.
   - *Problemă 2:* La `npm run dev` în `backend/`, a apărut eroarea `ERR_MODULE_NOT_FOUND` pentru `src/routes/stocuri.js`, deoarece folderul `routes/` fusese creat direct în `backend/` în loc de `backend/src/`. După mutarea în `backend/src/routes/`, serverul a pornit corect și `/health` a răspuns cu `{"status":"ok"}`.

4. **Testarea API-ului independent de interfață:**
   - *Prompt:* "Îl fac în terminal sau în consolă pe Visual?"
   - *Soluție:* Am folosit terminalul **Git Bash** integrat în VS Code (pentru a evita diferențele de interpretare a ghilimelelor și alias-ului `curl` din PowerShell) pentru a verifica rutele și codurile HTTP (`200`, `201`, `400`, `404`, `204`), precum și absența erorilor CORS în browser.