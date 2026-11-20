<script setup>
defineProps({ columns: { type: Array, required: true }, rows: { type: Array, required: true } })
</script>
<template>
  <div class="tbl-wrap">
    <table class="tbl">
      <thead><tr><th v-for="c in columns" :key="c.key">{{ c.label }}</th></tr></thead>
      <tbody>
        <tr v-for="r in rows" :key="r.id">
          <td v-for="c in columns" :key="c.key"><slot :name="c.key" :row="r">{{ r[c.key] }}</slot></td>
        </tr>
        <tr v-if="!rows.length"><td :colspan="columns.length" class="kosong">Belum ada data</td></tr>
      </tbody>
    </table>
  </div>
</template>
