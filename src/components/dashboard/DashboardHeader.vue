<script setup>
import { RouterLink } from 'vue-router';
import UserButton from '../shared/UserButton.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
 <header class="w-full h-[100px] bg-secondary-darker text-white shadow-xl">
    <div class=" ml-8 mr-[5%] h-full flex justify-between items-center">
      <h1 class="text-3xl font-bold">Tableau de bord</h1>
      <div class="flex items-center gap-2">
        <div class=" leading-none flex flex-col items-end justify-center gap-0"> 
          <p class="text-xl  font-semibold">{{ authStore.user ? authStore.user.displayName : 'Invité' }}</p>
          <p class="text-sm -mt-1 ">{{ authStore.user ? authStore.user.email : '' }}</p>
        </div>
        <UserButton />
      </div>
    </div>
 </header>
</template>
