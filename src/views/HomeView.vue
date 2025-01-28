<script setup>
//*-------------------- Imports --------------------*//
// Components imports
import Map from '@/components/homepage/Map.vue';
import Hero from '@/components/homepage/Hero.vue'
import Welcome from '@/components/homepage/Welcome.vue'
import Activities from '@/components/homepage/Activities.vue'

// Layout imports
import AuthenticatedLayout from '@/layouts/authenticatedLayout.vue';
</script>

<template>
  <AuthenticatedLayout>
    <main class="w-full h-full overflow-hidden">
      <Hero />
      <Welcome />
      <Activities />
      <Map />
    </main>
  </AuthenticatedLayout>
</template>
