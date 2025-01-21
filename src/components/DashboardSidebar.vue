<script setup>
import { useAuthStore } from '@/stores/auth';
import { computed, ref } from 'vue';

const sidebarOpen = ref(true);

const authStore = useAuthStore();
  
const links = [

  {
    icon: 'fa-calendar-days',
    name: 'Reservations',
    href: '/dashboard/reservations',
  },
  {
    icon: 'fa-people-roof',
    name: 'Clientèle',
    href: '/dashboard/customers',
  }
];

const adminLinks = [
  {
    icon: 'fa-bed',
    name: 'Chambres',
    href: '/dashboard/rooms',
  },
  {
    icon:  'fa-person-skiing-nordic',
    name: 'Activités',
    href: '/dashboard/activities',
  },
  {
    icon:  'fa-user-group',
    name: 'Employés',
    href: '/dashboard/employes',
  }
];

</script>
 
<template>
 <aside class="relative w-16 h-screen bg-neutral-700 shadow-xl transition-all duration-500 flex flex-col justify-between py-6" :class="sidebarOpen && 'w-full md:w-1/2 lg:w-1/4 xl:w-1/5'">
<div>

  <RouterLink to="/">
    <img v-if="sidebarOpen" src="@/assets/images/auberge_logo.png" alt="Auberge logo" class="h-28 mx-auto" >
    <img v-else src="@/assets/images/auberge_logo--small.png" alt="Auberge logo" class="size-12 mx-auto">
  </RouterLink>

    <nav class=" w-full text-neutral-100 text-lg uppercase flex flex-col justify-between items-start gap-6 font-medium px-4 mt-12" :class="!sidebarOpen && 'mt-[110px]'">
  <RouterLink v-for="link in links" :key="link.name" :to="link.href" class="hover:text-[#F4C887] transition-all duration-200 flex items-center gap-2" active-class="text-[#F4C887]">
    <i class="fa-solid" :class="link.icon"></i>
    <p v-if="sidebarOpen" class="text-base" >{{ link.name }}</p>
  </RouterLink>

  <!-- Admin links -->
  <template v-if="authStore.user && authStore.user.role === 'admin'">
  <RouterLink v-for="link in adminLinks" :key="link.name" :to="link.href" class="hover:text-[#F4C887] transition-all duration-200 flex items-center gap-2" active-class="text-[#F4C887]">
    <i class="fa-solid" :class="link.icon"></i>
    <p v-if="sidebarOpen" class="text-base" >{{ link.name }}</p>
  </RouterLink>
  </template>
  </nav>
</div>

<div>
  <p class="text-xs text-neutral-100 text-center">© {{ new Date().getFullYear() }} <span v-if="sidebarOpen">Auberge Lac de la montagne</span></p>
  <p class="text-xs text-neutral-100 text-center">Tous droits r&eacute;serv&eacute;s</p>
</div>

  <!-- Open/Close button -->
  <div class="absolute bottom-0 -right-8 w-8 h-16 bg-neutral-700/80 hover:bg-neutral-700/70 shadow-lg rounded-r-xl flex items-center justify-center transition-all duration-200">
    <button @click="sidebarOpen = !sidebarOpen" class="user-select-none">
      <i class="fa-solid fa-angles-right text-xl transition-all duration-500" :class="sidebarOpen && 'rotate-[540deg]'"></i>
    </button>
  </div>
 </aside>
 

</template>
