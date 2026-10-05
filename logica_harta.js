document.addEventListener("DOMContentLoaded", () => {
  const itemList = document.getElementById("itemList");
  const appCount = document.getElementById("appCount");
  const emptyMessage = document.getElementById("emptyMessage");
  const resetFilterBtn = document.getElementById("resetFilterBtn");
  const pins = document.querySelectorAll(".warehouse-pin");

  let currentFilter = null; // Stochează depozitul selectat curent

  // Funcție globală/exportată pentru a actualiza numărătoarea când se adaugă/șterge un produs
  window.updateMapCounters = function () {
    const items = itemList.querySelectorAll(".item-card");
    let total = items.length;
    let inStock = 0;

    // Obiect pentru stocul valabil pe fiecare depozit
    const countsPerWarehouse = {
      bucuresti: 0,
      cluj: 0,
      timisoara: 0,
      pitesti: 0,
      iasi: 0
    };

    items.forEach((item) => {
      const dep = item.dataset.depozit;
      const isAvailable = !item.classList.contains("done");

      if (isAvailable) {
        inStock++;
        if (countsPerWarehouse[dep] !== undefined) {
          countsPerWarehouse[dep]++;
        }
      }
    });

    // Actualizare număr total din header
    if (appCount) {
      appCount.textContent = `${total} produse, dintre care ${inStock} în stoc`;
    }

    // Actualizare număr din fiecare pin de pe hartă
    pins.forEach((pin) => {
      const dep = pin.dataset.depozit;
      const countSpan = pin.querySelector(".pin-count");
      if (countSpan && countsPerWarehouse[dep] !== undefined) {
        countSpan.textContent = `(${countsPerWarehouse[dep]})`;
      }
    });

    checkEmptyState();
  };

  // Filtrează produsele afișate în listă după depozit
  function filterByDepot(depotName) {
    currentFilter = depotName;
    const items = itemList.querySelectorAll(".item-card");

    // Stare vizuală pini
    pins.forEach((p) => {
      if (p.dataset.depozit === depotName) {
        p.classList.add("active");
      } else {
        p.classList.remove("active");
      }
    });

    // Afișează/ascunde butonul de resetare filtru
    if (resetFilterBtn) {
      if (depotName) {
        resetFilterBtn.style.display = "inline-block";
      } else {
        resetFilterBtn.style.display = "none";
      }
    }

    // Filtrează cardurile din listă
    items.forEach((item) => {
      if (!depotName || item.dataset.depozit === depotName) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });

    checkEmptyState();
  }

  // Verifică dacă lista vizibilă e goală
  function checkEmptyState() {
    if (!emptyMessage) return;
    
    const visibleItems = Array.from(itemList.querySelectorAll(".item-card")).filter(
      (el) => el.style.display !== "none"
    );

    if (visibleItems.length === 0) {
      emptyMessage.style.display = "block";
    } else {
      emptyMessage.style.display = "none";
    }
  }

  // Eveniment Click pe fiecare pin de pe hartă
  pins.forEach((pin) => {
    pin.addEventListener("click", () => {
      const dep = pin.dataset.depozit;
      // Toggle: dacă e deja selectat, resetează la "toate"
      if (currentFilter === dep) {
        filterByDepot(null);
      } else {
        filterByDepot(dep);
      }
    });
  });

  // Buton de resetare filtru
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener("click", () => filterByDepot(null));
  }

  // Inițializare numere la încărcare
  window.updateMapCounters();
});