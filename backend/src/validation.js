export const LOCATII = ["bucuresti", "cluj", "timisoara", "pitesti", "iasi"];
export const CATEGORII = ["Electronice", "Birotică", "Echipamente"];
const TITLU_MAX = 100;

export function valideazaStoc(body, { partial = false } = {}) {
  const erori = [];
  const date = {};

  if (!partial || body.titlu !== undefined) {
    if (typeof body.titlu !== "string" || body.titlu.trim() === "") {
      erori.push("titlu este obligatoriu");
    } else if (body.titlu.trim().length > TITLU_MAX) {
      erori.push(`titlu are maximum ${TITLU_MAX} de caractere`);
    } else {
      date.titlu = body.titlu.trim();
    }
  }

  if (!partial || body.locatia !== undefined) {
    const loc = body.locatia ?? "bucuresti";
    if (!LOCATII.includes(loc)) {
      erori.push(`locatia trebuie să fie una din: ${LOCATII.join(", ")}`);
    } else {
      date.locatia = loc;
    }
  }

  if (!partial || body.categorie !== undefined) {
    const cat = body.categorie ?? CATEGORII[0];
    if (!CATEGORII.includes(cat)) {
      erori.push(`categorie trebuie să fie una din: ${CATEGORII.join(", ")}`);
    } else {
      date.categorie = cat;
    }
  }

  if (!partial || body.cantitate !== undefined) {
    const cant = body.cantitate === undefined ? 1 : Number(body.cantitate);
    if (!Number.isInteger(cant) || cant < 1) {
      erori.push("cantitate trebuie să fie un număr întreg >= 1");
    } else {
      date.cantitate = cant;
    }
  }

  if (body.in_stoc !== undefined) {
    if (typeof body.in_stoc !== "boolean") {
      erori.push("in_stoc trebuie să fie true sau false");
    } else {
      date.in_stoc = body.in_stoc;
    }
  } else if (!partial) {
    date.in_stoc = true;
  }

  return { erori, date };
}

export function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}