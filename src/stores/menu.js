import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import seed from '../seed/menu.json'
import cfg from '../seed/pengaturan.json'
import { load, save } from './persist'

export const useMenuStore = defineStore('menu', () => {
  const items = ref(load('cs_menu', seed))
  const config = ref(load('cs_config', cfg))
  watch(items, v => save('cs_menu', v), { deep: true })
  const add = d => { items.value.push({ ...d, id: Date.now() }) }
  const update = (id, d) => {
    const i = items.value.findIndex(x => x.id === id)
    if (i > -1) items.value[i] = { ...items.value[i], ...d }
  }
  const remove = id => { items.value = items.value.filter(x => x.id !== id) }
  return { items, config, add, update, remove }
})
