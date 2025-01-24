<script setup>
//* Components imports
import Hero from '@/components/Hero.vue'
import Welcome from '@/components/Welcome.vue'

import Activities from '@/components/Activities.vue'

import Map from '@/components/Map.vue'

//* Layout imports
import AuthenticatedLayout from '@/layouts/authenticatedLayout.vue';
</script>

<template>
  <AuthenticatedLayout>
    <main class="w-full h-full">
      <h1>Dashboard</h1>
    </main>
  </AuthenticatedLayout>
</template>
