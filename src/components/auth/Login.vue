<script setup>
import { reactive } from 'vue';

//* Components imports
import PrimaryButton from '@/components/shared/PrimaryButton.vue';
import Input from '@/components/form/Input.vue';
import PasswordInput from '@/components/form/PasswordInput.vue';

//* Stores imports
import { useAuthStore } from '@/stores/auth';
import { useToasterStore } from '@/stores/toaster'


// Store instances
const authStore = useAuthStore();
const toaster = useToasterStore()


// Form credentials
const credentials = reactive({
  email: '',
  password: '',
});


// Error messages
const ERROR_MESSAGES = {
  EMAIL_REQUIRED: 'L\'adresse courriel est obligatoire!',
  EMAIL_INVALID: 'L\'adresse courriel est invalide!',
  PASSWORD_REQUIRED: 'Le mot de passe est obligatoire!',
};


// Function to validate the email field
const validateEmail = (email) => {
  if (!email) {
    toaster.showToast('error', 'Erreur', ERROR_MESSAGES.EMAIL_REQUIRED);
    return false;
  }
  if (!email.includes('@')) {
    toaster.showToast('error', 'Erreur', ERROR_MESSAGES.EMAIL_INVALID);
    return false;
  }
  return true;
};


// Function to validate the password fields
const validatePasswords = (password) => {
  if (!password) {
    toaster.showToast('error', 'Erreur', ERROR_MESSAGES.PASSWORD_REQUIRED);
    return false;
  }
  return true;
};


// Function to login the user
const login = async () => {
  if (!validateEmail(credentials.email)) return;
  if (!validatePasswords(credentials.password, credentials.password_confirmation)) return;

  await authStore.loginRouter(credentials);
  if (authStore.isAuthenticated) {
    toaster.showToast('success', 'Connexion', 'Vous avez été connecté avec succès!')
  } else {
    toaster.showToast('error', 'Erreur', 'Une erreur s\'est produite lors de la connexion!')
  }
}
</script>

<template>
  <div class="mt-4 flex flex-col justify-between h-full">
    <!-- Title -->
    <h1 class="text-2xl mb-1">Connectez-vous à votre compte</h1>

    <!-- Login form -->
    <form novalidate @submit.prevent="login(credentials)" method="post" class="mb-3">
      <Input autocomplete="email" label="Adresse courriel" type="email" id="email" name="email"
        v-model="credentials.email" placeholder="Inscrire votre adresse courriel" />
      <p class="error-message">{{ authStore.errors && authStore.errors[0] }}</p>

      <PasswordInput label="Mot de passe" id="password" v-model="credentials.password"
        placeholder="Inscrire votre mot de passe" class="mt-1" autocomplete="current-password" />

      <div class="flex justify-center lg:justify-end items-center gap-4 w-[90%] mx-auto mt-4">
        <RouterLink :to="{ name: 'home' }"
          class="text-black font-medium tracking-wider text-sm uppercase hover:text-primary rounded-md cursor-pointer transition-all duration-200">
          Annuler
        </RouterLink>

        <PrimaryButton type="submit" variant="secondary" size="md">
          Se connecter
        </PrimaryButton>
      </div>
    </form>

    <!-- No account ? -->
    <p>Vous n'avez pas encore de compte? <a
        class="text-primary hover:text-primary/70 transition-all duration-200 cursor-pointer"
        @click="$emit('toggle-account')">Inscrivez-vous ici</a></p>
  </div>
</template>