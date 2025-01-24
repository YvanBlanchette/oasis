<script setup>
import { reactive, ref } from 'vue';

//* Components imports
import Input from './form/Input.vue';
import PasswordInput from './form/PasswordInput.vue';

//* Stores imports
import { useAuthStore } from '@/stores/auth';
import { useToasterStore } from '@/stores/toaster'

// Store instances
const authStore = useAuthStore();
const toaster = useToasterStore()

// Form credentials
const credentials = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

// Error messages
const ERROR_MESSAGES = {
  NAME_REQUIRED: 'Le nom est obligatoire!',
  NAME_MIN_LENGTH: 'Le nom doit contenir au moins 3 caractères!',
  EMAIL_REQUIRED: 'L\'adresse courriel est obligatoire!',
  EMAIL_INVALID: 'L\'adresse courriel est invalide!',
  PASSWORD_REQUIRED: 'Le mot de passe est obligatoire!',
  PASSWORDS_DO_NOT_MATCH: 'Les mots de passe doivent être identiques!',
};

// Function to validate the name field
const validateName = (name) => {
  if (!name) {
    toaster.showToast('error', 'Erreur', ERROR_MESSAGES.NAME_REQUIRED);
    return false;
  }
  if (name.length < 3) {
    toaster.showToast('error', 'Erreur', ERROR_MESSAGES.NAME_MIN_LENGTH);
    return false;
  }
  return true;
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
const validatePasswords = (password, passwordConfirmation) => {
  if (!password) {
    toaster.showToast('error', 'Erreur', ERROR_MESSAGES.PASSWORD_REQUIRED);
    return false;
  }
  if (password !== passwordConfirmation) {
    toaster.showToast('error', 'Erreur', ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH);
    return false;
  }
  return true;
};

// Function to register a new user
const register = async () => {
  if (!validateName(credentials.name)) return;
  if (!validateEmail(credentials.email)) return;
  if (!validatePasswords(credentials.password, credentials.password_confirmation)) return;

  await authStore.registerEmailPassword(credentials);
  if (authStore.isAuthenticated) {
    toaster.showToast('success', 'Compte créé', 'Votre compte a été créé avec succès!');
  } else {
    toaster.showToast('error', 'Erreur', 'Une erreur s\'est produite lors de la création!');
  }
};
</script>

<template>
  <div class="mt-4">
    <h1 class="text-2xl mb-1">Créez votre compte maintenant</h1>

    <form novalidate @submit.prevent="register(credentials)" method="post" class="mb-3">

      <Input label="Nom" type="text" id="name" v-model="credentials.name" placeholder="Inscrire votre nom complet" class="mt-2" autocomplete="name" :className="authStore.errors.name && 'border-red-500'" />
      <p class="error-message">{{ authStore.errors.name && authStore.errors.name[0] }}</p>

      <Input label="Adresse courriel" type="email" id="email" v-model="credentials.email" placeholder="Inscrire votre adresse courriel" class="mt-1" autocomplete="email" :className="authStore.errors.email && 'border-red-500'" />
      <p class="error-message">{{ authStore.errors.email && authStore.errors.email[0] }}</p>

      <PasswordInput label="Mot de passe" id="password" v-model="credentials.password" placeholder="Inscrire votre nouveau mot de passe" class="mt-1" autocomplete="new-password" :className="authStore.errors.password && 'border-red-500'" />
      <p class="error-message">{{ authStore.errors.password && authStore.errors.password[0] }}</p>

      <PasswordInput label="Confirmation mot de passe" id="password_confirmation" v-model="credentials.password_confirmation" placeholder="Confirmer votre mot de passe" class="mt-1" :className="authStore.errors.password && 'border-red-500'" autocomplete="new-password" />

      <div class="flex justify-end items-center gap-4 w-[90%] mx-auto mt-4">
        <RouterLink :to="{name: 'home'}" class="text-black font-medium tracking-wider uppercase text-sm hover:text-primary rounded-md cursor-pointer transition-all duration-200">
          Annuler
        </RouterLink>

        <PrimaryButton type="submit" variant="secondary" size="md">
          Créer le compte
        </PrimaryButton>
      </div>
      
    </form>
    <p>Vous avez déjà un compte? <a class="text-primary cursor-pointer" @click="$emit('toggle-account')">Connectez-vous ici</a></p>
  </div>
</template>