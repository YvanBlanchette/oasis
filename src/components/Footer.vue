<script setup>
import { RouterLink } from 'vue-router';

//* Stores imports
import { useMainStore } from '@/stores/main';


const coordinates = useMainStore().coordinates;
 
</script>
 
<template>
 <footer class="w-full bg-neutral-900 text-neutral-100 h-full min-h-[300px]">
  <div class=" my-12">
    <RouterLink to="/">
      <img src="@/assets/images/auberge_logo.png" alt="Logo de l'auberge" class="h-36 mx-auto">
    </RouterLink>

    <div class="my-2">
      <p class="text-center text-sm"><a href="https://maps.app.goo.gl/ab15vzEwabKPp3SBA" target="_blank" class="w-fit hover:text-[#F4C887] transition-all duration-200">{{ coordinates.address.street }}, {{ coordinates.address.city }}, {{ coordinates.address.province }}, {{ coordinates.address.postalCode }}</a></p>
      <p class="text-center text-sm mt-1"><a href="tel:{{ coordinates.phone }}" target="_blank" class="hover:text-[#F4C887] transition-all duration-200">{{ coordinates.phone }}</a> | <a href="mailto:{{ coordinates.email }}" target="_blank" class="hover:text-[#F4C887] transition-all duration-200">{{ coordinates.email }}</a></p>
    </div>

    <div class="flex justify-center items-center gap-6 my-4">
      <a href="www.facebook.com" target="_blank">
        <i class="fa-brands fa-facebook text-2xl hover:text-[#F4C887] transition-all duration-200"></i>
      </a>
      <a href="www.instagram.com" target="_blank">
        <i class="fa-brands fa-instagram text-2xl hover:text-[#F4C887] transition-all duration-200"></i>
      </a>
      <a href="www.twitter.com" target="_blank">
        <i class="fa-brands fa-twitter text-2xl hover:text-[#F4C887] transition-all duration-200"></i>
      </a>
      <a href="www.youtube.com" target="_blank">
        <i class="fa-brands fa-youtube text-2xl hover:text-[#F4C887] transition-all duration-200"></i>
      </a>
    </div>
    <p class="text-center text-sm">
      &copy; Copyright {{ new Date().getFullYear() }} Auberge du Lac de la Montagne | Tous droits reservés.
    </p>
  </div>
 </footer>
</template>
