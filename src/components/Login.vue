<script setup>
import { reactive } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

//* Components imports
import Input from '@/components/form/Input.vue';
import PasswordInput from '@/components/form/PasswordInput.vue';

//* Stores imports
import { useAuthStore } from '@/stores/auth';
import { useMainStore } from '@/stores/main';


const mainStore = useMainStore();
const authStore = useAuthStore();
const router = useRouter();


const toggleHasAccount = () => {
  mainStore.toggleHasAccount()
}

const formData = reactive({
  email: '',
  password: '',
});

const login = () => {
  authStore.authenticate('login', formData);
}
</script>

<template>
  <div class="mt-4 flex flex-col justify-between h-full">

    <h1 class="text-2xl mb-1">Connectez-vous à votre compte</h1>

    <form @submit.prevent="login" method="post" class="mb-3">
      <Input autocomplete="email" label="Adresse courriel" type="email" id="email" name="email" v-model="formData.email" placeholder="Inscrire votre adresse courriel" />
      <p class="error-message">{{ authStore.errors && authStore.errors[0] }}</p>

      <PasswordInput label="Mot de passe" id="password" v-model="formData.password" placeholder="Inscrire votre mot de passe" class="mt-1" autocomplete="current-password" />

      <div class="flex justify-end gap-4 w-[90%] mx-auto">
        <RouterLink :to="{name: 'home'}" class="text-neutral-100 font-semibold px-3 py-2 hover:bg-neutral-100/30 rounded-md mt-4 cursor-pointer transition-all duration-200">
          Annuler
        </RouterLink>

        <input type="submit" class="bg-neutral-100 hover:bg-[#F4C887] text-neutral-900 font-semibold px-3 py-2 rounded-md mt-4 cursor-pointer transition-all duration-200" value="Connexion">
      </div>
      
    </form>
      <p>Vous n'avez pas encore de compte? <a class="text-[#F4C887] cursor-pointer" @click="toggleHasAccount()">Inscrivez-vous ici</a></p>
  </div>
</template>