import { Router } from "express";
import { parseId, valideazaStoc } from "../validation.js";

const router = Router();

// Etapa 9: datele stau în memorie și se pierd la repornire (Etapa 10 le mută în MariaDB)
let stocuri = [
{
      "id": 1,
      "titlu": "Monitor 27 inch",
      "locatia": "bucuresti",
      "categorie": "Electronice",
      "cantitate": 15,
      "in_stoc": true
    },
    {
      "id": 2,
      "titlu": "Tastatură Mecanică",
      "locatia": "cluj",
      "categorie": "Electronice",
      "cantitate": 0,
      "in_stoc": false
    },
    {
      "id": 3,
      "titlu": "Mouse Wireless",
      "locatia": "timisoara",
      "categorie": "Electronice",
      "cantitate": 42,
      "in_stoc": true
    },
    {
      "id": 4,
      "titlu": "Cablu HDMI 2m",
      "locatia": "pitesti",
      "categorie": "Echipamente",
      "cantitate": 100,
      "in_stoc": true
    },
    {
      "id": 5,
      "titlu": "Căști Bluetooth",
      "locatia": "iasi",
      "categorie": "Electronice",
      "cantitate": 5,
      "in_stoc": true
    },
    {
      "id": 6,
      "titlu": "SSD 1TB",
      "locatia": "bucuresti",
      "categorie": "Echipamente",
      "cantitate": 20,
      "in_stoc": true
    },
    {
      "id": 7,
      "titlu": "Placă de bază",
      "locatia": "cluj",
      "categorie": "Echipamente",
      "cantitate": 10,
      "in_stoc": true
    },
    {
      "id": 8,
      "titlu": "Procesor Intel i7",
      "locatia": "timisoara",
      "categorie": "Echipamente",
      "cantitate": 0,
      "in_stoc": false
    },
    {
      "id": 9,
      "titlu": "Memorie RAM 16GB",
      "locatia": "pitesti",
      "categorie": "Echipamente",
      "cantitate": 30,
      "in_stoc": true
    },
    {
      "id": 10,
      "titlu": "Placă video NVIDIA RTX 3080",
      "locatia": "iasi",
      "categorie": "Echipamente",
      "cantitate": 2,
      "in_stoc": true
    },
    {
      "titlu": "Monitor 21 inch",
      "locatia": "bucuresti",
      "categorie": "Electronice",
      "cantitate": 1,
      "in_stoc": true,
      "id": 11
    },
];
let nextId = 6;

function gasesteIndex(req, res) {
  const id = parseId(req.params.id);
  if (!id) {
    res.status(400).json({ error: "Id invalid" });
    return -1;
  }
  const index = stocuri.findIndex((s) => s.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Produsul nu există" });
  }
  return index;
}

// GET /stocuri
router.get("/", (req, res) => {
  res.json(stocuri);
});

// GET /stocuri/:id
router.get("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  res.json(stocuri[index]);
});

// POST /stocuri
router.post("/", (req, res) => {
  const { erori, date } = valideazaStoc(req.body ?? {});
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }
  const stoc = { id: nextId++, ...date };
  stocuri.push(stoc);
  res.status(201).json(stoc);
});

// PATCH /stocuri/:id
router.patch("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;

  const { erori, date } = valideazaStoc(req.body ?? {}, { partial: true });
  if (erori.length > 0) {
    return res.status(400).json({ error: erori.join("; ") });
  }

  stocuri[index] = { ...stocuri[index], ...date };
  res.json(stocuri[index]);
});

// DELETE /stocuri/:id
router.delete("/:id", (req, res) => {
  const index = gasesteIndex(req, res);
  if (index === -1) return;
  stocuri.splice(index, 1);
  res.status(204).end();
});

export default router;