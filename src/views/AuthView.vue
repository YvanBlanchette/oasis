<script setup>
import { computed} from 'vue';

//* Components imports
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';

//* Stores imports
import { useMainStore } from '@/stores/main';


const mainStore = useMainStore();
const hasAccount = computed(() => mainStore.hasAccount);


</script>
 
<template>
  <main class="relative bg-[url(/images/galleria01.jpg)] bg-cover bg-center w-full h-screen">
  <!-- Background overlay -->
  <div class="absolute inset-0 bg-neutral-900 opacity-30" />

  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-8  w-[90%] max-w-3xl min-h-[500px] text-neutral-100 text-center bg-neutral-900/50 backdrop-blur-sm p-8 rounded-xl">
    <div>
      <img src="@/assets/images/auberge_logo.png" alt="logo de l'auberge" class="h-32 mx-auto">
    </div>
    <div class="w-full h-full">
      <Login v-if="hasAccount" />
      <Register v-else />
    </div>
  </div>
 </main>
</template>
