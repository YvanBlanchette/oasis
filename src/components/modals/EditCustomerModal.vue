<script setup>
import Modal from '@/components/shared/Modal.vue';
import { useUserStore } from '@/stores/user';
import { reactive, toRefs } from 'vue';

const userStore = useUserStore();

const emit = defineEmits(['close-modal', 'refresh-users']);

const props = defineProps({
  userData: Object,
})

const { userData } = toRefs(props);

const formData = reactive({
  displayName: userData.value.displayName,
  email: userData.value.email,
  phone: userData.value.phone,
  address: userData.value.address,
  photoURL: userData.value.photoURL,
  role: userData.value.role,
  status: userData.value.status,
});


// Function to update user
const updateUser = async (user_id) => {
  if (formData) {
    await userStore.updateUser(user_id, { ...formData });

    console.log({ ...formData });

    emit('refresh-users');
    emit('close-modal');
  }
}
</script>


<template>
  <Modal>
    <!-- Close button -->
    <button type="button" @click="$emit('close-modal')"
      class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-200/80 text-black">
      <i class="fa-solid fa-xmark text-xl"></i>
    </button>
    <div class="w-full h-full flex flex-col items-center justify-center text-black">
      <!-- Modal Title -->
      <h1 class="text-5xl text-center font-semibold mb-6">Modifier un employé</h1>
      <!-- Form -->
      <form @submit.prevent="updateUser(userData.id)" class="flex flex-col w-full">
        <div class="flex gap-8 w-full justify-between">
          <div class="flex flex-col gap-2 justify-between w-full h-full">
            <!-- Name Input -->
            <Input type="text" label="Nom" v-model="formData.displayName" className="text-neutral-900 w-full" />

            <!-- Email Input -->
            <Input type="email" label="Adresse courriel" v-model="formData.email" className="text-neutral-900 w-full" />

            <!-- Phone Input -->
            <Input type="tel" label="Téléphone" v-model="formData.phone" className="text-neutral-900 w-full" />
          </div>

          <!-- Image Input -->
          <div>
            <div class="relative border border-primary w-[165px] h-[165px] rounded-md mt-3">
              <label for="photoURL"
                class="flex justify-center items-center w-full h-full  cursor-pointer overflow-hidden shadow-inner">
                <img v-if="userData.photoURL" :src="userData.photoURL" alt="photoURL"
                  class="w-[165px] h-[165px] rounded-md object-cover">
                <i v-else class="fa-solid fa-arrow-up-from-bracket text-6xl text-neutral-300/60"></i>
              </label>
              <input type="file" id="photoURL" class="hidden">
              <button v-if="userData.photoURL" @click="userData.photoURL = ''"
                class="absolute top-2 right-2 w-5 h-5 flex items-center justify-center transition-all duration-200 rounded-md bg-red-500 hover:bg-red-600">
                <i class="fa-solid fa-xmark text-neutral-100"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Address Input -->
        <div class="w-full mt-2">
          <Input type="text" label="Adresse" v-model="formData.address" className="text-neutral-900 w-full" />
        </div>

        <!-- Buttons -->
        <div class="flex justify-end items-center gap-4 mt-6">
          <button type="button" @click="$emit('close-modal')"
            class="hover:bg-neutral-200/80 px-4 py-1 rounded-md hover:shadow font-medium transition-all duration-200">
            Annuler
          </button>
          <input type="submit" value="Mettre à jour"
            class="cursor-pointer bg-primary hover:bg-primary-dark px-4 py-1 rounded-md shadow text-neutral-100 font-medium transition-all duration-200">
        </div>
      </form>
    </div>
  </Modal>
</template>
