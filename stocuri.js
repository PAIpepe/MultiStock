// Datele de test inițiale
const stocuri = [
  { id: 1, titlu: "Laptop Dell XPS 15", in_stoc: true, locatia: "Bucuresti" },
  { id: 2, titlu: "Scaun Ergonomic Birou", in_stoc: false, locatia: "Cluj" },
  { id: 3, titlu: "Cablu HDMI 2m", in_stoc: true, locatia: "Timisoara" }
];

// Valorile fixe permise
const LOCATII = ["Bucuresti", "Cluj", "Timisoara"];

// Funcții de bază (Imutabile)
function listeazaTitluri(lista) {
  return lista.map((p) => p.titlu);
}

function numaraInStoc(lista) {
  return lista.filter((p) => p.in_stoc).length;
}

function cautaDupaTitlu(lista, text) {
  return lista.filter((p) => p.titlu.toLowerCase().includes(text.toLowerCase()));
}

function nextId(lista) {
  return lista.reduce((max, p) => Math.max(max, p.id), 0) + 1;
}

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

function comutaStoc(lista, id) {
  return lista.map((p) => (p.id === id ? { ...p, in_stoc: !p.in_stoc } : p));
}

function stergeProdus(lista, id) {
  return lista.filter((p) => p.id !== id);
}

// --- Teste în consola browserului ---
console.log("--- Citire ---");
console.log("Titluri:", listeazaTitluri(stocuri).join(", "));
console.log("Produse în stoc:", numaraInStoc(stocuri));
console.log("Căutare 'laptop':", listeazaTitluri(cautaDupaTitlu(stocuri, "laptop")).join(", "));

console.log("--- Adăugare ---");
let listaNoua = adaugaProdus(stocuri, "Mouse Wireless", "Bucuresti");
console.log("Lista nouă are:", listaNoua.length, "produse");
console.log("Originalul a rămas cu:", stocuri.length, "produse");

console.log("--- Modificare și ștergere ---");
listaNoua = comutaStoc(listaNoua, 1);
console.log("După epuizarea stocului pt id 1, produse active:", numaraInStoc(listaNoua));
listaNoua = stergeProdus(listaNoua, 3);
console.log("După ștergerea id 3 (Cablu HDMI), titluri:", listeazaTitluri(listaNoua).join(", "));

console.log("--- Validare ---");
adaugaProdus(listaNoua, "   ", "Cluj");
adaugaProdus(listaNoua, "Monitor 4K", "Iasi");