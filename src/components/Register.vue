<script setup>
import { reactive, ref } from 'vue';

//* Components imports
import Input from './form/Input.vue';
import Checkbox from './form/Checkbox.vue';
import PasswordInput from './form/PasswordInput.vue';

//* Stores imports
import { useMainStore } from '@/stores/main';
import { useAuthStore } from '@/stores/auth';


const authStore = useAuthStore();
const mainStore = useMainStore();



const toggleHasAccount = () => {
  mainStore.toggleHasAccount()
}

const formData = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const register = () => {
  authStore.authenticate('register', formData);
}
</script>

<template>
  <div class="mt-4">
    <h1 class="text-2xl mb-1">Créez votre compte maintenant</h1>

    <form @submit.prevent="register" method="post" class="mb-3">

      <Input label="Nom" type="text" id="name" v-model="formData.name" placeholder="Inscrire votre nom complet" class="mt-2" autocomplete="name" :className="authStore.errors.name && 'border-red-500'" />
      <p class="error-message">{{ authStore.errors.name && authStore.errors.name[0] }}</p>

      <Input label="Adresse courriel" type="email" id="email" v-model="formData.email" placeholder="Inscrire votre adresse courriel" class="mt-1" autocomplete="email" :className="authStore.errors.email && 'border-red-500'" />
      <p class="error-message">{{ authStore.errors.email && authStore.errors.email[0] }}</p>

      <PasswordInput label="Mot de passe" id="password" v-model="formData.password" placeholder="Inscrire votre nouveau mot de passe" class="mt-1" autocomplete="new-password" :className="authStore.errors.password && 'border-red-500'" />
      <p class="error-message">{{ authStore.errors.password && authStore.errors.password[0] }}</p>

      <PasswordInput label="Confirmation mot de passe" id="password_confirmation" v-model="formData.password_confirmation" placeholder="Confirmer votre mot de passe" class="mt-1" :className="authStore.errors.password && 'border-red-500'" autocomplete="new-password" />

      <div class="flex justify-end gap-4 w-[90%] mx-auto">
        <RouterLink :to="{name: 'home'}" class="text-neutral-100 font-semibold px-3 py-2 hover:bg-neutral-100/30 rounded-md mt-4 cursor-pointer transition-all duration-200">
          Annuler
        </RouterLink>

        <input type="submit" class="bg-neutral-100 hover:bg-[#F4C887] text-neutral-900 font-semibold px-3 py-2 rounded-md mt-4 cursor-pointer transition-all duration-200" value="Créer mon compte">
      </div>
      
    </form>
    <p>Vous avez déjà un compte? <a class="text-[#F4C887] cursor-pointer" @click="toggleHasAccount">Connectez-vous ici</a></p>
  </div>
</template>