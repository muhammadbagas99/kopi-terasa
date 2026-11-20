import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import seed from '../seed/transaksi.json'
import { load, save } from './persist'

export const useTransaksiStore = defineStore('transaksi', () => {
  const list = ref(load('cs_trx', seed))
  watch(list, v => save('cs_trx', v), { deep: true })
  const pendapatan = computed(() => list.value.reduce((s, t) => s + t.total, 0))
  // return pesan error (string) atau null jika sukses
  function checkout(cart, kasir, bayar) {
    if (!cart.length) return 'Keranjang masih kosong'
    const total = cart.reduce((s, c) => s + c.subtotal, 0)
    if (!Number.isFinite(bayar) || bayar <= 0) return 'Nominal bayar wajib diisi'
    if (bayar < total) return 'Uang bayar kurang dari total'
    list.value.unshift({
      id: Date.now(), tanggal: new Date().toISOString(), kasir,
      items: cart.map(({ nama, varian, qty, shot, subtotal }) => ({ nama, varian, qty, shot, subtotal })),
      total, bayar, kembali: bayar - total
    })
    return null
  }
  const hapus = id => { list.value = list.value.filter(t => t.id !== id) }
  return { list, pendapatan, checkout, hapus }
})
