<script setup>
import Modal from '@/components/shared/Modal.vue';
import { useStaffStore } from '@/stores/staff';
import { useToasterStore } from '@/stores/toaster';
import Toast from '@/components/shared/Toast.vue';
  
  const emit = defineEmits(['close-modal', 'refresh-users'])

  defineProps({
  userData: Object,
  });

</script>
 
<template>
   <Modal>
    <button @click="$emit('close-modal')"
      class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-200/80">
      <i class="fa-solid fa-xmark text-xl black"></i>
    </button>

    <div class="text-black w-full">
      <h1 class="text-4xl lg:text-5xl text-center font-semibold mb-3">Photo de profil</h1>
      <p class="text-xl font-medium mb-4 text-center">Veuillez inscrire l'URL de votre photo de profil</p>
      <Input label="URL de la photo" type="text" id="photoURL" placeholder="Inscrire l'URL de la photo" v-model="userData.photoURL" className="w-full mb-4" />
      <div class="flex justify-end items-center gap-4">
        <button @click="$emit('close-modal')"
          class="bg-primary hover:bg-primary-dark px-4 py-1 rounded-md shadow text-white font-medium transition-all duration-200">
          Confirmer
        </button>
      </div>
    </div>
  </Modal>
  <Toast ref="toast" />
</template>
