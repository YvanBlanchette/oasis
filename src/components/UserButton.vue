<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';


const authStore = useAuthStore();
const user = authStore.user;

const isMenuOpen = ref(false);
import { useToasterStore } from '@/stores/toaster'

const toaster = useToasterStore()

defineEmits(['logout']);

</script>
<template>
  <div class="relative">
  <button @click="isMenuOpen = !isMenuOpen" class="bg-neutral-50/10 rounded-full size-[3rem] flex justify-center items-center border-2 overflow-hidden border-neutral-200 hover:border-primary transition-all duration-200 text-neutral-200 hover:text-primary" :class="isMenuOpen && 'border-primary text-primary'">
    <i v-if="!user || user.photoURL === null" class="fa-solid fa-user text-2xl"></i>
    <img v-else :src="user.photoURL" class="w-12 h-12 object-cover" alt="Avatar de l'utilisateur">
  </button>

  <!-- User Menu -->
  <div v-if="isMenuOpen" class="absolute top-[72px] right-0 bg-white/95 w-60 text-black rounded-b-sm z-50">
    <RouterLink :to="{ name: 'home' }" class="p-2 border-b border-neutral-500 block">
      <p class="text-lg text-center">{{ user && user.displayName ? user.displayName : 'Bonjour !' }}</p>
    </RouterLink>

    <!-- User Profile -->
      <RouterLink v-if="user" :to="{ name: 'profile' }" class="p-2 flex justify-center items-center gap-2 hover:text-primary transition-all duration-200 cursor-pointer">
        <i class="fa-solid fa-user"></i>
        <p>Mon profil</p>
      </RouterLink>
    
    <!-- My Reservations -->
    <template v-if="user">
      <RouterLink :to="{ name: 'myReservations' }" class="p-2 flex justify-center items-center gap-2 hover:text-primary transition-all duration-200 cursor-pointer">
        <i class="fa-solid fa-cart-shopping"></i>
        <p>Mes Réservations</p>
      </RouterLink>
    </template>

    <!-- Login -->
    <template v-if="!user">
      <RouterLink :to="{ name: 'auth' }" class="p-2 flex justify-center items-center gap-2 hover:text-primary transition-all duration-200 cursor-pointer">
        <i class="fa-solid fa-right-to-bracket"></i>
        <p>Connexion</p>
      </RouterLink>
    </template>

    <!-- Logout -->
    <div v-show="user" @click="$emit('logout')" class="p-2 flex justify-center items-center gap-2 hover:text-primary transition-all duration-200 cursor-pointer">
      <i class="fa-solid fa-right-from-bracket"></i>
      <p>Déconnexion</p>
    </div>

  </div>
  </div>
</template>
