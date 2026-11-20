<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import BaseButton from '../components/common/BaseButton.vue'
import foto from '../assets/foto-tampak-luar.jpeg'
const auth = useAuthStore(); const router = useRouter()
const username = ref(''); const password = ref(''); const err = ref('')
function submit() {
  err.value = auth.login(username.value.trim(), password.value) || ''
  if (!err.value) router.push('/kasir')
}
</script>
<template>
  <div class="login">
    <div class="login-img" :style="{ backgroundImage: `url(${foto})` }"></div>
    <form class="login-box" @submit.prevent="submit">
      <h1>terasA</h1><p>Coffee &amp; Tea - Sistem Kasir</p>
      <label>Username<input v-model="username" /></label>
      <label>Password<input v-model="password" type="password" /></label>
      <p v-if="err" class="err">{{ err }}</p>
      <BaseButton type="submit">Masuk</BaseButton>
    </form>
  </div>
</template>
