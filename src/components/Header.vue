<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

//* Components imports
import UserButton from '@/components/UserButton.vue';


const menuOpen = ref(false);

 const links = [
   {
      name: 'Accueil',
      path: '/'
   },
   {
      name: 'Hébergements',
      path: '/#lodgings'
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
</script>
 
<template>
  <header class="absolute top-8 left-0 right-0 h-24 backdrop-blur-[2px] z-50">
    <div class="h-full w-[90%] max-w-7xl mx-auto flex justify-between items-center">
      <!-- Logo -->
      <RouterLink to="/">
        <img src="@/assets/images/auberge_logo.png" alt="Logo de l'auberge" class="h-28">
      </RouterLink>

      <div class="flex items-center justify-end gap-6">
        <!-- Desktop Navigation -->
        <nav class="hidden text-white  text-lg uppercase lg:flex justify-end items-center gap-6 font-medium">
          <a v-for="link in links" :key="link.name" :href="link.path" class="hover:text-[#F4C887] transition-all duration-200 text-shadow-sm">{{ link.name }}</a>
        </nav>
        
        <!-- Mobile Navigation -->
        <nav class="lg:hidden block">
          <button @click="menuOpen = !menuOpen" class="text-white text-4xl">
            <i class="fa-solid fa-bars"></i>
          </button>
        </nav>

        <!-- User Button -->
        <UserButton />
      </div>
    </div>
  </header>

  <div :class="menuOpen && 'w-full md:w-1/2 lg:w-1/4 opacity-100'" class="opacity-0 fixed top-0 bottom-0 right-0 h-screen w-0 z-50 bg-neutral-900 transition-all duration-500 border-l-2 border-[#F4C887]">
    <!-- Logo -->
    <RouterLink to="/">
      <img src="@/assets/images/auberge_logo.png" alt="Logo de l'auberge" class="h-28 mx-auto my-12">
    </RouterLink>

    <nav class="text-neutral-100  text-lg uppercase flex flex-col justify-end items-center gap-6 font-medium">
        <RouterLink v-for="link in links" :key="link.name" :to="link.path" class="hover:text-[#F4C887] transition-all duration-200">{{ link.name }}</RouterLink>
    </nav>

    <button @click="menuOpen = !menuOpen">
      <i class="fa-solid fa-xmark text-xl text-neutral-100 hover:text-[#F4C887] transition-all duration-200 absolute top-4 left-4"></i>
    </button>

    <!-- Bottom Decoration -->
    <div class="absolute bottom-2 left-4 right-4 opacity-70">
      <img src="@/assets/images/deco.svg" alt="Décoration au bas du menu">
    </div>
  </div>
</template>
