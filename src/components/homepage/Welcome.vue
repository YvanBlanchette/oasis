<script setup>
import PrimaryButton from '../shared/PrimaryButton.vue';

const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
</script>

<template>
  <section class="bg-secondary-lighter text-black w-full h-full min-h-[400px]">
    <div class="w-[90%] max-w-7xl mx-auto h-full py-16 text-center">

      <h1 class="text-2xl lg:text-4xl uppercase text-center font-bold lg:tracking-wide">Bienvenue au beach club l'Oasis</h1>
      <h2 class="text-base lg:text-xl uppercase text-center lg:tracking-wide pt-6 pb-6 lg:pb-8">Le service d'animation, d'activités et de
        location d'équipement le plus chaud de la plage Bavaro à Punta Cana</h2>
      <p class="text-sm lg:text-lg text-center pb-6">Notre beach club déssert plusieurs hôtels de la région et offre une gamme
        d'activités et de services pour rendre votre séjour tout à fait inoubliable. Que vous ayez envi de vous détendre
        sur la plage, de pratiquer des sports nautiques ou participer à des animations en famille, nous avons tout ce
        qu'il faut pour vous faire passer un moment exceptionnel.</p>

      <a href="/#activities" v-if="isAuthenticated" class="text-black px-4 py-3 shadow font-medium tracking-wider uppercase text-sm bg-white hover:bg-primary cursor-pointer transition-all duration-200">
        Réservez vos activités dès maintenant
      </a>

      <RouterLink :to="{ name: 'auth' }" v-else
        class="text-black px-4 py-3 shadow font-medium tracking-wider uppercase text-sm bg-white hover:bg-primary cursor-pointer transition-all duration-200">
        Connectez-vous pour réserver une activité
      </RouterLink>
    </div>

  </section>
</template>
