<script setup>
//* Components imports
import Hero from '@/components/Hero.vue'
import Welcome from '@/components/Welcome.vue'
import Activities from '@/components/Activities.vue'
import Map from '@/components/Map.vue';

//* Layout imports
import AuthenticatedLayout from '@/layouts/authenticatedLayout.vue';
</script>

<template>
  <AuthenticatedLayout>
    <main class="w-full h-full">
      <Hero />
      <Welcome />
      <Activities />
      <Map />
    </main>
  </AuthenticatedLayout>
</template>
