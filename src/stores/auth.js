import { defineStore } from 'pinia'
import { ref } from 'vue'
import seed from '../seed/users.json'
import { load, save } from './persist'

export const useAuthStore = defineStore('auth', () => {
  const users = ref(load('cs_users', seed))
  const user = ref(JSON.parse(localStorage.getItem('cs_session') || 'null'))
  function login(username, password) {
    if (!username || !password) return 'Username dan password wajib diisi'
    const f = users.value.find(u => u.username === username && u.password === password)
    if (!f) return 'Username atau password salah'
    user.value = { id: f.id, nama: f.nama, role: f.role }
    save('cs_session', user.value)
    return null
  }
  function logout() { user.value = null; localStorage.removeItem('cs_session') }
  return { users, user, login, logout }
})
