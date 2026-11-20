<script setup>
defineProps({ show: Boolean, title: String })
defineEmits(['close'])
</script>
<template>
  <div v-if="show" class="overlay" @click.self="$emit('close')">
    <div class="modal"><h3>{{ title }}</h3><slot /></div>
  </div>
</template>
