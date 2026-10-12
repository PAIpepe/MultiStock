const LOCATII = ["bucuresti", "cluj", "timisoara", "pitesti", "iasi"];

// Aici adaugi array-ul tău principal cu date din Etapa 2
const stocuri = [
  { id: 1, nume: "Anvelopă", cantitate: 10, activ: true },
  { id: 2, nume: "Ulei motor", cantitate: 0, activ: false }
  // adaugă restul datelor tale aici...
];

export default function App() {
  const produseActive = stocuri.filter((p) => p.activ).length;
  
  return (
    <>
      <header className="app-header">
        <h1>MultiStock</h1>
        <p>Gestiunea stocurilor și inventarului pe locații.</p>
        <p className="app-count">
          {stocuri.length} produse în total, dintre care {produseActive} active
        </p>
      </header>
      
      <main className="container">
        <section className="panel">
          <h2>Date inventar</h2>
          {/* Temporar: date brute */}
          <pre>{JSON.stringify(stocuri, null, 2)}</pre>
        </section>
      </main>
    </>
  );
}