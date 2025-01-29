<script setup>
//*-------------------- Imports --------------------*//
import { ref} from 'vue';

// Components imports
import Login from '@/components/auth/Login.vue';
import Toast from '@/components/shared/Toast.vue';
import Register from '@/components/auth/Register.vue';

//*-------------------- Variables --------------------*//
defineEmits(['toggleAccount']);
const hasAccount = ref(true);

//*-------------------- Functions --------------------*//
const toggleHasAccount = () => {
  hasAccount.value = !hasAccount.value;
}
</script>
 
<template>
  <main class="relative bg-[url(/images/auth.jpg)] bg-cover bg-center w-full h-screen">
  <!-- Background overlay -->
  <div class="absolute inset-0 bg-black opacity-20" />

  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[90%] max-w-3xl min-h-[500px] text-black text-center bg-white/80 backdrop-blur p-8 rounded-xl">
    <!-- Logo -->
    <div>
      <img src="/images/oasis_logo.png" alt="logo de l'auberge" class="h-32 mx-auto">
    </div>
    <div class="w-full h-full">
      <!-- Login form -->
      <Login v-if="hasAccount" @toggle-account="toggleHasAccount" />

      <!-- Register form -->
      <Register v-else @toggle-account="toggleHasAccount" />
    </div>
  </div>
 </main>
 <Toast ref="toast" />
 <DevelopmentMode />
</template>
