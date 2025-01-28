<script setup>
//* Components imports
import Hero from '@/components/homepage/Hero.vue'
import Welcome from '@/components/homepage/Welcome.vue'

import Activities from '@/components/homepage/Activities.vue'

import Map from '@/components/homepage/Map.vue'

//* Layout imports
import AuthenticatedLayout from '@/layouts/authenticatedLayout.vue';
</script>

<template>
  <AuthenticatedLayout>
    <main class="w-full h-full min-h-[calc(100vh-120px)] bg-neutral-50 text-black flex justify-center items-center py-12">
      <div class="bg-white w-[90%] h-full max-w-4xl mx-auto p-8 rounded-md shadow-xl">
        <h1 class="text-5xl text-center font-semibold mb-6">Mes réservations</h1>
        <div class="scrollable border-2 shadow-inner border-neutral-400">
        <table class="relative w-full h-full text-center">
          <thead class="bg-neutral-400 text-sm w-full">
            <tr>
              <th class="p-4">Nom de l'activité</th>
              <th class="p-4">Date</th>
              <th class="p-4">Heure</th>
              <th class="p-4">Durée</th>
              <th class="p-4">Nombre de participants</th>
              <th class="p-4">Coût total</th>
              <th class="p-4"></th>
            </tr>
          </thead>
          <!-- Loader -->
        <tbody v-if="isLoading" class="table-loader">
          <Loader color="text-primary" />
        </tbody>
          <tbody class="shadow-inner">
            <tr>
              <td>Activité 1</td>
              <td>2023-06-01</td>
              <td>10:00</td>
              <td>2h</td>
              <td>4</td>
              <td>50€</td>
              <td>En attente</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </main>
  </AuthenticatedLayout>
</template>
