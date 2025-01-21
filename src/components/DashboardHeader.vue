<script setup>
import { RouterLink } from 'vue-router';
import UserButton from './UserButton.vue';
import { useAuthStore } from '@/stores/auth';

const { user } = useAuthStore();
</script>

<template>
 <header class="w-full h-16 bg-neutral-800">
    <div class=" ml-8 mr-[5%] h-full flex justify-between items-center">
      <h1 class="text-3xl font-bold text-[#FFF2E1]">Tableau de bord</h1>
      <div class="flex items-center gap-2">
        <div class=" leading-none flex flex-col items-end justify-center gap-0"> 
          <p class="text-xl text-neutral-100 font-semibold">{{ user ? user.name : 'Invité' }}</p>
          <p class="text-sm text-neutral-100">{{ user ? user.email : '' }}</p>
        </div>
        <UserButton />
      </div>
    </div>
 </header>
</template>
