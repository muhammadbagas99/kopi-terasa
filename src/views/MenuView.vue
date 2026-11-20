<script setup>
import { ref } from 'vue'
import { useMenuStore } from '../stores/menu'
import { rp } from '../utils/format'
import BaseTable from '../components/common/BaseTable.vue'
import BaseButton from '../components/common/BaseButton.vue'
import BaseModal from '../components/common/BaseModal.vue'
const menu = useMenuStore()
const cols = [{ key: 'nama', label: 'Nama' }, { key: 'hargaIced', label: 'Iced' }, { key: 'hargaHot', label: 'Hot' }, { key: 'aksi', label: 'Aksi' }]
const show = ref(false); const editId = ref(null); const err = ref('')
const form = ref({ nama: '', hargaIced: null, hargaHot: null })
function buka(m) {
  editId.value = m?.id ?? null; err.value = ''
  form.value = m ? { nama: m.nama, hargaIced: m.hargaIced, hargaHot: m.hargaHot } : { nama: '', hargaIced: null, hargaHot: null }
  show.value = true
}
const angka = v => (v === null || v === '' ? null : Number(v))
function simpan() {
  const d = { nama: form.value.nama.trim(), hargaIced: angka(form.value.hargaIced), hargaHot: angka(form.value.hargaHot) }
  if (!d.nama) return (err.value = 'Nama menu wajib diisi')
  if (d.hargaIced === null && d.hargaHot === null) return (err.value = 'Isi minimal satu harga (Iced/Hot)')
  for (const h of [d.hargaIced, d.hargaHot]) if (h !== null && (!(h >= 0) || h > 1000000)) return (err.value = 'Harga harus 0 - 1.000.000')
  editId.value ? menu.update(editId.value, d) : menu.add(d)
  show.value = false
}
function hapus(m) { if (confirm(`Hapus ${m.nama}?`)) menu.remove(m.id) }
</script>
<template>
  <div class="row between"><h2>Kelola Menu</h2><BaseButton @click="buka()">+ Tambah Menu</BaseButton></div>
  <BaseTable :columns="cols" :rows="menu.items">
    <template #hargaIced="{ row }">{{ row.hargaIced != null ? rp(row.hargaIced) : '-' }}</template>
    <template #hargaHot="{ row }">{{ row.hargaHot != null ? rp(row.hargaHot) : '-' }}</template>
    <template #aksi="{ row }">
      <BaseButton variant="secondary" @click="buka(row)">Ubah</BaseButton>
      <BaseButton variant="danger" @click="hapus(row)">Hapus</BaseButton>
    </template>
  </BaseTable>
  <BaseModal :show="show" :title="editId ? 'Ubah Menu' : 'Tambah Menu'" @close="show = false">
    <label>Nama<input v-model="form.nama" /></label>
    <label>Harga Iced<input v-model="form.hargaIced" type="number" /></label>
    <label>Harga Hot<input v-model="form.hargaHot" type="number" /></label>
    <p v-if="err" class="err">{{ err }}</p>
    <div class="row"><BaseButton @click="simpan">Simpan</BaseButton><BaseButton variant="ghost" @click="show = false">Batal</BaseButton></div>
  </BaseModal>
</template>
