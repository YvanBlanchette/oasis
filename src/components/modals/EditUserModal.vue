<script setup>
  import Modal from '@/components/shared/Modal.vue';

emits: ['close-modal']

defineProps({
  selectedUser: Object,
  updateUser: Function
});
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
      <h1 class="text-5xl text-neutral-100 text-center font-semibold mb-6">Modifier un client</h1>
      <!-- Form -->
      <form @submit.prevent="updateUser(selectedUser.id)" class="flex flex-col ">
        <div class="flex gap-8 w-full justify-center">
          <div>
            <!-- Name Input -->
            <Input type="text" label="Nom" v-model="selectedUser.name" className="text-neutral-900 w-[350px]" />

            <!-- Email Input -->
            <Input type="email" label="Adresse courriel" v-model="selectedUser.email"
              className="text-neutral-900 w-[350px]" />

            <!-- Phone Input -->
            <Input type="tel" label="Téléphone" v-model="selectedUser.phone" className="text-neutral-900 w-[350px]" />
          </div>

          <div>
            <!-- Image Input -->
            <div class="relative border border-primary w-[165px] h-[165px] rounded-md mt-3">
              <label for="image" class="flex justify-center items-center w-full h-full  cursor-pointer">
                <img v-if="selectedUser.image" :src="selectedUser.image" alt="image"
                  class="w-[165px] h-[165px] rounded-md object-cover">
                <i v-else class="fa-solid fa-arrow-up-from-bracket text-6xl text-neutral-300/60"></i>
              </label>
              <input type="file" id="image" class="hidden">
              <button v-if="selectedUser.image" @click="selectedUser.image = ''"
                class="absolute top-2 right-2 w-5 h-5 flex items-center justify-center transition-all duration-200 rounded-md bg-red-500 hover:bg-red-600">
                <i class="fa-solid fa-xmark text-neutral-100"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- Buttons -->
        <div class="flex justify-end items-center gap-4 mt-6 text-neutral-100">
          <button @click="$emit('close-modal')"
            class="hover:bg-neutral-500/80 px-4 py-1 rounded-md hover:shadow font-medium transition-all duration-200">
            Annuler
          </button>
          <input type="submit" value="Mettre à jour"
            class="bg-red-500 hover:bg-red-700 px-4 py-1 rounded-md shadow text-neutral-100 font-medium transition-all duration-200">
        </div>
      </form>
    </div>
  </Modal>
</template>
