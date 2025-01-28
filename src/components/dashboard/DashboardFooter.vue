<script setup>
import { RouterLink } from 'vue-router';
import UserButton from '../shared/UserButton.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
 <footer class="w-full h-[30px] bg-secondary-dark text-white shadow-xl">
  <p class="text-center text-sm flex items-center justify-center h-full font-medium">
    &copy; Copyright {{ new Date().getFullYear() }} Oasis Beach Club | Tous droits reservés.
  </p>
 </footer>
</template>
