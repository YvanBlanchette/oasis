<script setup>
//*-------------------- Imports ---------------------*//
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth';

 //*-------------------- Stores ---------------------*//
const authStore = useAuthStore()

onMounted(() => {
  authStore.setData();
})
</script>

<template>
  <RouterView />
</template>