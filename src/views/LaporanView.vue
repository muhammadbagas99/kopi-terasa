<script setup>
import { useTransaksiStore } from '../stores/transaksi'
import { rp, tgl } from '../utils/format'
import BaseTable from '../components/common/BaseTable.vue'
import BaseButton from '../components/common/BaseButton.vue'
const trx = useTransaksiStore()
const cols = [{ key: 'tanggal', label: 'Waktu' }, { key: 'kasir', label: 'Kasir' }, { key: 'items', label: 'Pesanan' }, { key: 'total', label: 'Total' }, { key: 'aksi', label: 'Aksi' }]
</script>
<template>
  <h2>Laporan Penjualan</h2>
  <div class="cards">
    <div class="card"><small>Total Pendapatan</small><h3>{{ rp(trx.pendapatan) }}</h3></div>
    <div class="card"><small>Jumlah Transaksi</small><h3>{{ trx.list.length }}</h3></div>
  </div>
  <BaseTable :columns="cols" :rows="trx.list">
    <template #tanggal="{ row }">{{ tgl(row.tanggal) }}</template>
    <template #items="{ row }"><div v-for="(i, k) in row.items" :key="k">{{ i.qty }}x {{ i.nama }} ({{ i.varian }}){{ i.shot ? ' +shot' : '' }}</div></template>
    <template #total="{ row }">{{ rp(row.total) }}</template>
    <template #aksi="{ row }"><BaseButton variant="danger" @click="trx.hapus(row.id)">Hapus</BaseButton></template>
  </BaseTable>
</template>
