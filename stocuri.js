// Definire locații valide (ambele depozite noi incluse)
const LOCATII = ["bucuresti", "cluj", "timisoara", "pitesti", "iasi"];

// Calculează următorul ID
function nextId(lista) {
  if (lista.length === 0) return 1;
  const ids = lista.map((p) => p.id);
  return Math.max(...ids) + 1;
}

// Funcția ta pură de adăugare și validare
function adaugaProdus(lista, titlu, locatia) {
  const titluCurat = titlu.trim();

  // Validare
  if (titluCurat === "") {
    console.log("Eroare validare: Titlul nu poate fi gol.");
    return lista;
  }
  if (!LOCATII.includes(locatia)) {
    console.log(`Eroare validare: Locația invalidă - ${locatia}`);
    return lista;
  }

  // Creare obiect nou și returnare array nou
  const produsNou = {
    id: nextId(lista),
    titlu: titluCurat,
    in_stoc: true, // implicit true conform modelului de date
    locatia: locatia
  };
  return [...lista, produsNou];
}

// Interacțiunea cu interfața (DOM)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addForm");
  const itemList = document.getElementById("itemList");
  const inputTitlu = document.getElementById("inputTitlu");
  const selectEticheta = document.getElementById("selectEticheta");

  // Tabloul inițial de stocuri (corespunzător celor 3 elemente din HTML)
  let stocuriExistente = [
    { id: 1, titlu: "Laptop Dell XPS 15", in_stoc: true, locatia: "bucuresti" },
    { id: 2, titlu: "Scaun Ergonomic Birou", in_stoc: false, locatia: "cluj" },
    { id: 3, titlu: "Cablu HDMI 2m", in_stoc: true, locatia: "timisoara" }
  ];

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const titlu = inputTitlu.value;
      const locatia = selectEticheta.value;
      const locatiaText = selectEticheta.options[selectEticheta.selectedIndex].text;

      // 1. Apelăm funcția ta
      const listaNoua = adaugaProdus(stocuriExistente, titlu, locatia);

      // Dacă produsul a trecut de validare și s-a adăugat
      if (listaNoua.length > stocuriExistente.length) {
        stocuriExistente = listaNoua;

        // 2. Creăm elementul vizual în HTML
        const li = document.createElement("li");
        li.className = "item-card";
        li.dataset.depozit = locatia;
        li.innerHTML = `
          <div>
            <h3>${titlu.trim()}</h3>
            <span class="badge badge-${locatia}">${locatiaText}</span>
          </div>
          <span class="status">În stoc</span>
        `;

        itemList.appendChild(li);
        inputTitlu.value = "";

        // 3. Notificăm fișierul logica_harta.js să actualizeze numerele de pe pini
        if (typeof window.updateMapCounters === "function") {
          window.updateMapCounters();
        }
      }
    });
  }
});