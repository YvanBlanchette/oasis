<style scoped>
input {
  @apply bg-neutral-200 px-2 py-0.5 shadow-inner border rounded-md focus:outline-none focus:ring-0 -ml-2 text-xl tracking-wide;
}
</style>


<script setup>
//* Layout imports
import PhotoUrlModal from '@/components/modals/PhotoUrlModal.vue';
import { auth } from '@/firebase';
import { updateProfile } from 'firebase/auth';
import AuthenticatedLayout from '@/layouts/authenticatedLayout.vue';
import { reactive, ref } from 'vue';

const user = JSON.parse(localStorage.getItem('user'));

const isModalOpen = ref(false);
const isEditMode = ref(false);

const formData = reactive({
  displayName: user.displayName,
  email: user.email,
  photoURL: user.photoURL
})

const updateUserProfile = async () => {
  const user = auth.currentUser;
  if (!user) {
    console.error('No user found');
    return;
  }

  try {
    const result = await updateProfile(user, {
      displayName: formData.displayName,
      email: formData.email,
      photoURL: formData.photoURL,
    });
    localStorage.setItem('user', JSON.stringify(user));
    isEditMode.value = false;
    window.location.reload();
  } catch (error) {
    console.log('Une erreur est survenue: ', error);
  }
}
</script>

<template>
  <AuthenticatedLayout>
    <main
      class="relative bg-[url('/images/beach.jpg')] bg-cover bg-no-repeat bg-center w-full h-full min-h-[calc(100vh-120px)] bg-neutral-50 text-black flex justify-center items-center">

      <!-- bg-overlay -->
      <div class="absolute inset-0 bg-black opacity-20 z-0" />

      <div class="bg-white/95 w-[90%] h-full max-w-2xl mx-auto rounded-md shadow-xl z-10 p-12">

        <h1 class="text-4xl text-center">Mon Profil</h1>
        <form @submit.prevent="updateUserProfile">
          <div class="w-full h-full flex flex-col lg:flex-row justify-center mt-6 gap-x-16 gap-y-8">

            <!-- Profile Picture -->
            <div class="flex flex-col justify-center items-center">
              <div v-if="!isEditMode"
                class="flex justify-center items-center w-[200px] h-[200px] overflow-hidden shadow-inner border rounded-md">
                <img v-if="user.photoURL" :src="user.photoURL" alt="user profile picture"
                  class="w-[200px] h-[200px] rounded-md object-cover border">
                <i v-else class="fa-solid fa-user text-7xl text-neutral-300/60"></i>
              </div>
              <button v-else @click="isModalOpen = true" type="button" v-tooltip="'Photo de profil'" for="photoURL"
                class="flex justify-center items-center w-[200px] h-[200px] cursor-pointer overflow-hidden shadow-inner border rounded-md group ">
                <img v-if="formData.photoURL" :src="formData.photoURL" alt="user profile picture"
                  class="w-[200px] h-[200px] rounded-md object-cover border">
                <i v-else
                  class="fa-solid fa-arrow-up-from-bracket text-6xl text-neutral-300/60 group-hover:text-primary transition-all duration-200"></i>
              </button>
            </div>

            <div class="flex flex-col gap-6 w-[350px]">
              <!-- Name Input -->
              <div class="flex flex-col w-full h-[40px]">
                <label for="displayName" class="text-primary/70 text-sm tracking-wide text-center lg:text-start">Nom d'utilisateur</label>
                <input v-if="isEditMode" type="text" id="displayName" v-model="formData.displayName"
                  placeholder="Inscrire votre nom" class=" text-center lg:text-start" />
                <p v-else class="tracking-wide text-xl  mt-0.5  text-center lg:text-start">{{ user.displayName || 'Utilisateur' }}</p>
              </div>

              <!-- Email Input -->
              <div class="flex flex-col w-full h-[40px]">
                <label for="email" class="text-primary/70 text-sm tracking-wide text-center lg:text-start">Adresse courriel</label>
                <input v-if="isEditMode" type="email" id="email" v-model="formData.email"
                  placeholder="Inscrire votre nom" class=" text-center lg:text-start" />
                <p v-else class="tracking-wide text-xl mt-0.5  text-center lg:text-start">{{ user.email || 'Non défini' }}</p>
              </div>
            </div>
          </div>

          <div class="flex justify-center lg:justify-end items-center mt-4">
            <button v-if="!isEditMode" @click="isEditMode = true" type="button"
              class="flex items-center gap-2 mt-4 px-4 py-2 bg-primary rounded-md hover:bg-primary-dark transition-all duration-200 font-medium text-white">
              <i class="fa-solid fa-pen-to-square hover:text-primary transition-all duration-200 shadow"></i>
              Modifier mon profil
            </button>

            <div v-if="isEditMode" class="flex justify-center lg:justify-end items-center gap-4">
              <button @click="isEditMode = false" type="button"
                class="flex items-center gap-2 mt-4 px-4 py-2 rounded-md hover:bg-neutral-200/80 transition-all duration-200 font-medium text-black">
                Annuler
              </button>
              <button type="submit"
                class="flex items-center gap-2 mt-4 px-4 py-2 bg-primary rounded-md hover:bg-primary-dark transition-all duration-200 font-medium text-white shadow">
                Sauvegarder
              </button>
            </div>
          </div>
        </form>

      </div>
    </main>
  </AuthenticatedLayout>
  <PhotoUrlModal v-if="isModalOpen" @close-modal="isModalOpen = false" :userData="formData" />
</template>
