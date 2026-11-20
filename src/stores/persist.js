// Cek localStorage dulu; jika kosong ambil dari seed JSON lalu simpan.
export function load(key, seed) {
  const raw = localStorage.getItem(key)
  if (raw) { try { return JSON.parse(raw) } catch { /* rusak -> pakai seed */ } }
  localStorage.setItem(key, JSON.stringify(seed))
  return structuredClone(seed)
}
export const save = (key, val) => localStorage.setItem(key, JSON.stringify(val))
