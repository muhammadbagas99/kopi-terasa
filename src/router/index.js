import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/login', component: () => import('../views/LoginView.vue') },
  { path: '/', redirect: '/kasir' },
  { path: '/kasir', component: () => import('../views/KasirView.vue'), meta: { label: 'Kasir', roles: ['admin', 'kasir'] } },
  { path: '/menu', component: () => import('../views/MenuView.vue'), meta: { label: 'Kelola Menu', roles: ['admin'] } },
  { path: '/laporan', component: () => import('../views/LaporanView.vue'), meta: { label: 'Laporan', roles: ['admin'] } },
  { path: '/:pathMatch(.*)*', redirect: '/kasir' }
]
const router = createRouter({ history: createWebHashHistory(), routes })

// Role-based routing: kasir tidak bisa membuka halaman admin
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.path === '/login') return auth.user ? '/kasir' : true
  if (!auth.user) return '/login'
  if (to.meta.roles && !to.meta.roles.includes(auth.user.role)) return '/kasir'
})
export default router
