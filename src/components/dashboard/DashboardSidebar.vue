<script setup>
//*-------------------- Imports --------------------*//
import { computed, ref } from 'vue';


//*-------------------- Variables --------------------*//
const sidebarOpen = ref(true);
const isStaff = JSON.parse(localStorage.getItem('isStaff'));
const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
const links = [

  {
    icon: 'fa-calendar-days',
    name: 'Reservations',
    href: '/dashboard/reservations',
  },
  {
    icon: 'fa-sailboat',
    name: 'Activités',
    href: '/dashboard/activities',
  },
  {
    icon: 'fa-people-roof',
    name: 'Clients',
    href: '/dashboard/customers',
  }
];
</script>

<template>
  <aside
    class="relative w-16 h-screen bg-secondary-dark shadow-xl transition-all duration-500 flex flex-col justify-between py-6 border-r-2 border-[#400034]"
    :class="sidebarOpen && 'w-full md:w-1/2 lg:w-1/4 xl:w-1/5'">
    <div>

      <RouterLink to="/">
        <img v-if="sidebarOpen" src="/images/oasis_logo.png" alt="Oasis logo" class="h-[70px] mx-auto object-contain">
        <img v-else src="/images/oasis_icon.png" alt="Oasis logo" class="size-12 mx-auto object-contain">
      </RouterLink>

      <nav class=" w-full text-neutral-100 text-lg uppercase flex flex-col justify-between items-start gap-10 font-medium px-4 mt-12" :class="!sidebarOpen && 'mt-[110px]'" >
        
        <RouterLink v-tooltip.right="!sidebarOpen && link.name" v-for="link in links" :key="link.name" :to="link.href"
          class="hover:text-primary transition-all duration-200 flex items-center justify-center gap-4"
          active-class="text-primary">
          <i class="fa-solid text-2xl" :class="link.icon"></i>
          <p v-if="sidebarOpen" class="text-sm font-bold">{{ link.name }}</p>
        </RouterLink>

        <RouterLink v-if="isAdmin" v-tooltip.right="!sidebarOpen && 'Employés'" :to="{ name: 'employes' }"
          class="hover:text-primary transition-all duration-200 flex items-center justify-center gap-4"
          active-class="text-primary">
          <i class="fa-solid fa-id-card text-2xl"></i>

          <p v-if="sidebarOpen" class="text-sm font-bold">Employés</p>
        </RouterLink>
      </nav>
    </div>



    <!-- Open/Close button -->
    <div v-tooltip.right="sidebarOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
      class="absolute border-l-2 border-[#400034] bottom-0 -right-8 w-8 h-16 hover:text-primary bg-gradient-to-br from-[#57555B] to-[#400034] shadow-lg rounded-r-xl flex items-center justify-center transition-all duration-200">
      <button @click="sidebarOpen = !sidebarOpen" class="user-select-none">
        <i class="fa-solid fa-angles-right text-xl transition-all duration-500"
          :class="sidebarOpen && 'rotate-[540deg]'"></i>
      </button>
    </div>

    <!-- Bottom Decoration -->
    <div class="absolute bottom-0 left-0 right-0">
      <img v-if="sidebarOpen" src="@/assets/images/deco.svg" alt="Décoration au bas du menu">
      <img v-else src="@/assets/images/deco--small.svg" alt="Décoration au bas du menu" class="">
    </div>
  </aside>


</template>
