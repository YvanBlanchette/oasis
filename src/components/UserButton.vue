<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';

const { getUser, logout } = useAuthStore();

const user = ref(null);
const isMenuOpen = ref(false);

onMounted(async () => {
  user.value = await getUser();
});
</script>
 
<template>
  <div class="relative">
  <button @click="isMenuOpen = !isMenuOpen" class="bg-neutral-50/10 rounded-full size-[3rem] flex justify-center items-center border-2 overflow-hidden border-neutral-200 hover:border-[#F4C887] group transition-all duration-200">
    <i v-if="!user" class="fa-solid fa-user text-2xl text-neutral-200 group-hover:text-[#F4C887] transition-all duration-200"></i>
    <img v-else :src="user && user.image" class="w-12 h-12 object-cover" alt="Avatar de l'utilisateur">
  </button>

  <!-- User Menu -->
  <div v-if="isMenuOpen" class="absolute top-14 right-0 bg-neutral-800/90 w-60 text-neutral-100 rounded-sm z-50">
    <RouterLink :to="{ name: 'home' }" class="p-2 border-b border-neutral-100 block">
      <p class="text-lg text-center">{{ user && user.name ? user.name : 'Invité' }}</p>
    </RouterLink>

      <!-- Dashboard -->
    <template v-if="user && (user.role === 'admin' || user.role === 'staff')">
      <RouterLink  :to="{ name: 'dashboard' }"  class="p-2 flex justify-center items-center gap-2 hover:text-[#F4C887] transition-all duration-200 cursor-pointer">
        <i class="fa-solid fa-table-list"></i>
        <p>Tableau de bord</p>
      </RouterLink>
    </template>

    <!-- User Profile -->
    <template v-if="user && user.role === 'guest'">
      <RouterLink :to="{ name: 'profile' }" class="p-2 flex justify-center items-center gap-2 hover:text-[#F4C887] transition-all duration-200 cursor-pointer">
        <i class="fa-solid fa-user"></i>
        <p>Mon profil</p>
      </RouterLink>
    </template>
    
    <!-- My Reservations -->
    <template v-if="user && user.role === 'guest'">
      <RouterLink :to="{ name: 'myReservations' }" class="p-2 flex justify-center items-center gap-2 hover:text-[#F4C887] transition-all duration-200 cursor-pointer">
        <i class="fa-solid fa-cart-shopping"></i>
        <p>Mes Réservations</p>
      </RouterLink>
    </template>

    <!-- Login -->
    <template v-if="!user">
      <RouterLink :to="{ name: 'auth' }" class="p-2 flex justify-center items-center gap-2 hover:text-[#F4C887] transition-all duration-200 cursor-pointer">
        <i class="fa-solid fa-right-to-bracket"></i>
        <p>Connexion</p>
      </RouterLink>
    </template>

    <!-- Logout -->
    <div v-show="user" @click="logout" class="p-2 flex justify-center items-center gap-2 hover:text-[#F4C887] transition-all duration-200 cursor-pointer">
      <i class="fa-solid fa-right-from-bracket"></i>
      <p>Déconnexion</p>
    </div>

  </div>
  </div>
</template>
