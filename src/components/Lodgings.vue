<script setup>
const options = [
  {
    id: 1,
    name: 'Chambres en auberge',
    path: '/lodgings/rooms',
    image: '/images/room.jpg'
  },
  {
    id: 2,
    name: 'Condos spacieux',
    path: '/lodgings/condos',
    image: '/images/condo.jpg' 
  },
  {
    id: 3,
    name: 'Chalets 6 à 26 pers.',
    path: '/lodgings/cabins',
    image: '/images/cabin.jpg' 
  }
 ]
</script>
 
<template>
 <section id="lodgings" class="bg-neutral-100 text-neutral-900 w-full h-full min-h-[300px]">
  <div class="w-[90%] max-w-7xl mx-auto h-full py-12 text-center">
    <h2 class="text-2xl uppercase text-center tracking-wide pb-2">Hébergement</h2>
    <h1 class="text-4xl uppercase text-center font-bold tracking-wide pb-8">Une offre diversifiée pour tous les goûts</h1>
    <p class="text-center text-lg">Profitez d'un hébergement qui vous offre plus de 177 unités allant des chambres en auberge, aux magnifiques condos jusqu’aux luxueux chalets au bord de l’eau. Chaque chambre est meublée avec une touche d’inspiration québécoise.</p>
    <img src="@/assets/images/bar.svg" class="mx-auto my-4 w-52">
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      <RouterLink v-for="option in options" :key="option.name" :to="{ name: 'lodging', params: { id: option.id } }" class="my-8 bg-neutral-900 text-neutral-100 group shadow">
        <div class="overflow-hidden">
          <img :src="option.image" :alt="option.name" class="object-cover group-hover:scale-105 transition-all duration-300">
        </div>
        <p class="py-1 text-center font-medium">{{ option.name }}</p>
      </RouterLink>
    </div>
  </div>
  </section>
</template>
