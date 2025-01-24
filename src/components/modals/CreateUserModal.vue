<script setup>
import { reactive } from 'vue';
import Modal from '@/components/Modal.vue';
import { useUserStore } from '@/stores/user';
import PasswordInput from '../form/PasswordInput.vue';

const { emit } = defineEmits(['close-modal'])

defineProps({
  refreshUsers: Function
});


const userStore = useUserStore();

// Form Data
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  image: '',
  role: 'guest',
  password: '',
  password_confirmation: ''
});


// Function to refresh users
const refreshUsers = async () => {
  await userStore.getUsers();
  guests.value = userStore.guests;
}

/// Variable to stock selected image
let selectedImage = null;

// Function to add image
const addImageUrl = (event) => {
  selectedImage = event.target.files[0];
  const imageUrl = URL.createObjectURL(event.target.files[0]);
  formData.image = imageUrl;
}

// Function to create user
const createUser = async () => {
  const formDataWithImage = new FormData();
  formDataWithImage.append('name', formData.name);
  formDataWithImage.append('email', formData.email);
  formDataWithImage.append('phone', formData.phone);
  formDataWithImage.append('address', formData.address);
  formDataWithImage.append('image', selectedImage);
  formDataWithImage.append('role', formData.role);
  formDataWithImage.append('password', formData.password);
  formDataWithImage.append('password_confirmation', formData.password_confirmation);

  await userStore.createUser(formDataWithImage);
  console.log(formDataWithImage);
  refreshUsers();
  showCreateModal.value = false;
}
</script>

<template>
  <Modal>
    <!-- Close button -->
    <button @click="$emit('close-modal')"
      class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-400/80">
      <i class="fa-solid fa-xmark text-xl text-neutral-100"></i>
    </button>
    <div class="w-full h-full flex flex-col items-center justify-center">

      <!-- Modal Title -->
      <h1 class="text-5xl text-neutral-100 text-center font-semibold mb-6">Enregistrement d'un client</h1>

      <!-- Form -->
      <form @submit.prevent="createUser" class="flex flex-col">

        <div class="flex gap-8 w-full justify-center">

          <div>
            <!-- Name Input -->
            <Input type="text" label="Nom" v-model="formData.name" className="text-neutral-900 w-full" placeholder="Inscrire le nom" />

            <!-- Email Input -->
            <Input type="email" label="Courriel" v-model="formData.email" className="text-neutral-900 w-[350px]" placeholder="Inscrire le courriel" />

            <!-- Phone Input -->
            <Input type="tel" label="Téléphone" v-model="formData.phone" className="text-neutral-900 w-[350px]" placeholder="Inscrire le numéro de téléphone" />

            <!-- Address Input -->
            <Input type="text" label="Adresse" v-model="formData.address" className="text-neutral-900 w-[350px]" placeholder="Inscrire l'adresse" />
          </div>

          <div class="relative border border-primary w-[225px] h-[225px] rounded-md mt-3">
            <img v-if="formData.image" :src="formData.image" alt="Image Utilisateur">
            <label for="image" v-else class="text-neutral-300/60 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
              <i  class="fa-solid fa-arrow-up-from-bracket text-7xl text-neutral-300/60"></i>
              <input type="file" name="image" accept="image/*" @change="addImageUrl" id="image" class="hidden">
            </label>
          </div>

        </div>
          <div class="mt-4">
            <!-- Password Input -->
            <PasswordInput label="Mot de passe" v-model="formData.password" className="text-neutral-900 w-[100%]" placeholder="Inscrire le mot de passe" />
            
            <!-- Password Confirmation Input -->
            <PasswordInput label="Confirmer mot de passe" v-model="formData.password" className="text-neutral-900 w-[100%]" placeholder="Confirmer le mot de passe" />
          </div>

           <!-- Buttons -->
        <div class="flex justify-end items-center gap-4 mt-6 text-neutral-100">
          <button @click="$emit('close-modal')"
            class="hover:bg-neutral-500/80 px-4 py-1 rounded-md hover:shadow font-medium transition-all duration-200">
            Annuler
          </button>
          <input type="submit" value="Créer le compte"
            class="bg-neutral-100 hover:bg-primary px-4 py-1 rounded-md shadow text-neutral-900 cursor-pointer font-medium transition-all duration-200">
        </div>
      </form>
    </div>
  </Modal>
</template>
