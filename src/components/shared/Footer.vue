<script setup>
import { RouterLink } from 'vue-router';
</script>
 
<template>
 <footer class="w-full bg-secondary-light text-black h-full min-h-[300px] pt-16">
  <div class=" my-12 flex flex-col items-center">
    <RouterLink to="/">
      <img src="/images/oasis_logo.png" alt="Logo de l'auberge" class="h-24 mx-auto">
    </RouterLink>

    <div class="flex justify-center items-center gap-6 my-4">
      <a href="www.facebook.com" target="_blank">
        <i class="fa-brands fa-facebook text-2xl hover:text-primary transition-all duration-200"></i>
      </a>
      <a href="www.instagram.com" target="_blank">
        <i class="fa-brands fa-instagram text-2xl hover:text-primary transition-all duration-200"></i>
      </a>
      <a href="www.twitter.com" target="_blank">
        <i class="fa-brands fa-twitter text-2xl hover:text-primary transition-all duration-200"></i>
      </a>
      <a href="www.whatsapp.com" target="_blank">
        <i class="fa-brands fa-whatsapp text-2xl hover:text-primary transition-all duration-200"></i>
      </a>
      <a href="www.youtube.com" target="_blank">
        <i class="fa-brands fa-youtube text-2xl hover:text-primary transition-all duration-200"></i>
      </a>
    </div>
    <p class="text-center text-sm">
      &copy; Copyright {{ new Date().getFullYear() }} Oasis Beach Club | Tous droits reservés.
    </p>
    <p class="hidden lg:block text-center text-primary-darker text-sm mt-2">
      Une création de Yvan jr Blanchette
    </p>
    <p class="hidden lg:block text-center text-primary-darker text-xs">
      Dans le cadre du cours d'intégration d'interface utilisateur de l'AEC en développement web du Cégep de Trois-Rivières.
    </p>
  </div>
 </footer>
</template>
