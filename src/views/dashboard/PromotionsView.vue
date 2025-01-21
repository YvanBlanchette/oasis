<script setup>
//* Components imports
import Hero from '@/components/Hero.vue'
import Welcome from '@/components/Welcome.vue'
import Lodgings from '@/components/Lodgings.vue'
import Activities from '@/components/Activities.vue'
import Contact from '@/components/Contact.vue'
import Map from '@/components/Map.vue'

//* Layout imports
import DashboardLayout from '@/layouts/DashboardLayout.vue';
</script>

<template>
    <main class="w-full h-[calc(100vh-64px)] bg-neutral-100 p-6">
      <h1 class="text-6xl text-center font-semibold mt-12">Forfaits et Promotions</h1>
      <div class="w-full h-full flex flex-col items-center justify-center -mt-16 animate-pulse">
        <h2 class="text-4xl text-center font-medium">Page en cours de construction</h2>
        <p class="text-2xl text-center font-medium mb-6 mt-2">S'il vous pla&icirc;t, revenez plus tard.</p>
        <i class="fa-solid fa-warning text-8xl text-yellow-400"></i>
      </div>

    </main>
</template>
