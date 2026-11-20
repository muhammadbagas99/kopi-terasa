<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import BaseButton from '../common/BaseButton.vue'
const auth = useAuthStore(); const router = useRouter()
const links = computed(() => router.getRoutes().filter(r => r.meta.label && r.meta.roles.includes(auth.user.role)))
function keluar() { auth.logout(); router.push('/login') }
</script>
<template>
  <header class="nav">
    <div class="brand">terasA <small>Coffee &amp; Tea</small></div>
    <nav><RouterLink v-for="l in links" :key="l.path" :to="l.path">{{ l.meta.label }}</RouterLink></nav>
    <div class="user">{{ auth.user.nama }} ({{ auth.user.role }})
      <BaseButton variant="ghost" @click="keluar">Keluar</BaseButton></div>
  </header>
  <main class="page"><slot /></main>
</template>
