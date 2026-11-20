<script setup>
import { ref, computed } from 'vue'
import { useMenuStore } from '../stores/menu'
import { useTransaksiStore } from '../stores/transaksi'
import { useAuthStore } from '../stores/auth'
import { rp } from '../utils/format'
import BaseButton from '../components/common/BaseButton.vue'
const menu = useMenuStore(); const trx = useTransaksiStore(); const auth = useAuthStore()
const cart = ref([]); const bayar = ref(null); const err = ref(''); const ok = ref('')
const total = computed(() => cart.value.reduce((s, c) => s + c.subtotal, 0))
const hitung = c => { c.subtotal = (c.harga + (c.shot ? menu.config.hargaShot : 0)) * c.qty }
function tambah(m, varian) {
  const harga = varian === 'Iced' ? m.hargaIced : m.hargaHot
  const ada = cart.value.find(c => c.menuId === m.id && c.varian === varian && !c.shot)
  if (ada) { ada.qty = Math.min(99, ada.qty + 1); hitung(ada) }
  else cart.value.push({ menuId: m.id, nama: m.nama, varian, harga, qty: 1, shot: false, subtotal: harga })
  ok.value = ''
}
function setQty(c, v) { c.qty = Math.min(99, Math.max(1, parseInt(v) || 1)); hitung(c) } // batas 1-99
const hapus = i => cart.value.splice(i, 1)
function bayarSekarang() {
  const b = Number(bayar.value)
  const kembali = b - total.value
  err.value = trx.checkout(cart.value, auth.user.nama, b) || ''
  if (!err.value) { ok.value = `Transaksi berhasil. Kembalian ${rp(kembali)}`; cart.value = []; bayar.value = null }
}
</script>
<template>
  <div class="grid2">
    <section>
      <h2>Menu Kopi</h2>
      <div class="cards">
        <article v-for="m in menu.items" :key="m.id" class="card">
          <h4>{{ m.nama }}</h4>
          <div class="row">
            <BaseButton v-if="m.hargaIced != null" @click="tambah(m, 'Iced')">Iced {{ rp(m.hargaIced) }}</BaseButton>
            <BaseButton v-if="m.hargaHot != null" variant="secondary" @click="tambah(m, 'Hot')">Hot {{ rp(m.hargaHot) }}</BaseButton>
          </div>
        </article>
      </div>
    </section>
    <aside class="panel">
      <h2>Pesanan</h2>
      <p v-if="!cart.length" class="kosong">Belum ada pesanan</p>
      <div v-for="(c, i) in cart" :key="i" class="item">
        <div><b>{{ c.nama }}</b> ({{ c.varian }})<br>
          <label class="small"><input type="checkbox" v-model="c.shot" @change="hitung(c)" /> + shot {{ rp(menu.config.hargaShot) }}</label></div>
        <input class="qty" type="number" min="1" max="99" :value="c.qty" @change="setQty(c, $event.target.value)" />
        <span>{{ rp(c.subtotal) }}</span>
        <BaseButton variant="danger" @click="hapus(i)">x</BaseButton>
      </div>
      <h3>Total: {{ rp(total) }}</h3>
      <input v-model="bayar" type="number" min="0" placeholder="Uang bayar" />
      <p v-if="err" class="err">{{ err }}</p><p v-if="ok" class="ok">{{ ok }}</p>
      <BaseButton @click="bayarSekarang">Bayar</BaseButton>
    </aside>
  </div>
</template>
