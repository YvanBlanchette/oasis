<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

//* Components imports
import UserButton from '@/components/UserButton.vue';

//* Store imports
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const menuOpen = ref(false);

const links = [
  {
    name: 'Accueil',
    path: '/'
  },
  {
    name: 'Activités',
    path: '/#activities'
  },
  {
    name: 'Nous Joindre',
    path: '/#contact'
  },
]

const logout = async () => {
  try {
    await authStore.logout();
    if (!authStore.isAuthenticated) {
      toaster.showToast('success', 'Déconnexion', 'Vous avez été déconnecté avec succès!')
    } else {
      toaster.showToast('error', 'Erreur', 'Une erreur s\'est produite lors de la déconnexion!')
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la déconnexion: ', error);
    // showToast('error', 'Erreur', 'Une erreur s\'est produite lors de la déconnexion.');
  }
}
</script>

<template>
  <header class=" h-24 backdrop-blur-[2px] z-50 bg-white shadow-lg">
    <div class="h-full w-[90%] max-w-7xl mx-auto flex justify-between items-center">
      <!-- Logo -->
      <RouterLink to="/">
        <img src="/images/oasis_logo.png" alt="Logo du beach club Oasis" class="h-20">
      </RouterLink>

      <div class="flex items-center justify-end gap-6">
        <!-- Desktop Navigation -->
        <nav class="hidden text-white  text-lg uppercase lg:flex justify-end items-center gap-6 font-medium">
          <a v-for="link in links" :key="link.name" :href="link.path" class="nav-link">{{ link.name }}</a>
        </nav>

        <!-- Mobile Navigation -->
        <nav class="lg:hidden block">
          <button @click="menuOpen = !menuOpen"
            class="text-4xl text-black hover:text-primary  transition-all duration-200" active-class="text-primary">
            <i class="fa-solid fa-bars"></i>
          </button>
        </nav>

        <!-- User Button -->
        <div class="hidden lg:block">
          <UserButton @logout="logout" />
        </div>
      </div>
    </div>
  </header>


  <!-- Mobile Menu -->
  <div :class="menuOpen && 'w-full md:w-1/2 lg:w-1/4 opacity-100'"
    class="opacity-0 fixed top-0 bottom-0 right-0 h-screen w-0 z-50 bg-secondary-light transition-all duration-500">
    <!-- Logo -->
    <RouterLink to="/">
      <img src="/images/oasis_logo.png" alt="Logo de l'Oasis" class="h-28 mx-auto mt-12 mb-4">
    </RouterLink>

    <nav class="text-neutral-100  text-lg uppercase flex flex-col justify-center items-center gap-4 font-medium">
      <!-- Activities -->
      <a href="/#activities"
        class="p-2 flex justify-center items-center gap-2 hover:text-primary transition-all duration-200 cursor-pointer">
        <i class="fa-solid fa-sailboat"></i>
        <p>Activités</p>
      </a>
      <!-- Contact -->
      <a href="/#contact"
        class="p-2 flex justify-center items-center gap-2 hover:text-primary transition-all duration-200 cursor-pointer">
        <i class="fa-solid fa-phone"></i>
        <p>Nous Joindre</p>
      </a>
      <!-- User Profile -->
      <RouterLink v-if="authStore.user" :to="{ name: 'profile' }"
        class="p-2 flex justify-center items-center gap-2 hover:text-primary transition-all duration-200 cursor-pointer">
        <i class="fa-solid fa-user"></i>
        <p>Mon profil</p>
      </RouterLink>

      <!-- My Reservations -->
      <template v-if="authStore.user">
        <RouterLink :to="{ name: 'myReservations' }"
          class="p-2 flex justify-center items-center gap-2 hover:text-primary transition-all duration-200 cursor-pointer">
          <i class="fa-solid fa-cart-shopping"></i>
          <p>Mes Réservations</p>
        </RouterLink>
      </template>

      <!-- Login -->
      <template v-if="!authStore.user">
        <RouterLink :to="{ name: 'auth' }"
          class="p-2 flex justify-center items-center gap-2 hover:text-primary transition-all duration-200 cursor-pointer">
          <i class="fa-solid fa-right-to-bracket"></i>
          <p>Connexion</p>
        </RouterLink>
      </template>

      <!-- Logout -->
      <div v-show="authStore.user" @click="logout()"
        class="p-2 flex justify-center items-center gap-2 hover:text-primary transition-all duration-200 cursor-pointer">
        <i class="fa-solid fa-right-from-bracket"></i>
        <p>Déconnexion</p>
      </div>

    </nav>

    <button @click="menuOpen = !menuOpen">
      <i
        class="fa-solid fa-xmark text-3xl text-neutral-100 hover:text-primary transition-all duration-200 absolute top-4 left-4"></i>
    </button>

    <!-- Bottom Decoration -->
    <div class="absolute bottom-0 left-0 right-0 -z-10">
      <img src="@/assets/images/deco.svg" alt="Décoration au bas du menu">
    </div>
  </div>
</template>
