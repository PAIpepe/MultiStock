export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) {
    throw new Error(`Eroare server: ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

export function fetchStocuri() {
  return request("/stocuri");
}

export function createStoc(stoc) {
  return request("/stocuri", { method: "POST", body: JSON.stringify(stoc) });
}

export function updateStoc(id, changes) {
  return request(`/stocuri/${id}`, { method: "PATCH", body: JSON.stringify(changes) });
}

export function deleteStoc(id) {
  return request(`/stocuri/${id}`, { method: "DELETE" });
}