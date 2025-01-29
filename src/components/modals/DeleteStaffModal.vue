<script setup>
//*-------------------- Imports --------------------*//
// Components imports
import Modal from '@/components/shared/Modal.vue';
import Toast from '@/components/shared/Toast.vue';

// Store imports
import { useStaffStore } from '@/stores/staff';
import { useToasterStore } from '@/stores/toaster';


//*-------------------- Stores --------------------*//
const toaster = useToasterStore();
const staffStore = useStaffStore();


//*-------------------- Variables / States --------------------*//
  const emit = defineEmits(['close-modal', 'refresh-users'])

  defineProps({
  userData: Object,
  });


//*-------------------- Functions --------------------*//
// Function to delete a user
const deleteStaff = async (user_id) => {
try {
  await staffStore.deleteStaff(user_id);
  emit('refresh-users');
  emit('close-modal');
  toaster.showToast('success', 'Suppression', 'L\'employé a bien été supprimé!');
} catch (error) {
  console.log(error);
  toaster.showToast('error', 'Erreur', 'Une erreur est survenue lors de la suppression!');
}
}
</script>
 
<template>
   <Modal>
    <!-- Close button -->
    <button @click="$emit('close-modal')"
      class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-200/80">
      <i class="fa-solid fa-xmark text-xl black"></i>
    </button>

    <div class="text-black">
      <!-- Title -->
      <h1 class="text-4xl xl:text-5xl text-center font-semibold mb-6">Supprimer un employé</h1>

      <!-- Description -->
      <p class="text-base lg:text-xl font-medium text-center">Êtes-vous certain de vouloir supprimer ce compte? </p>
      <p class="text-base mb-6 italic text-center">Attention, vous ne pourrez plus revenir en arri&egrave;re.</p>

      <!-- Buttons -->
      <div class="flex justify-center lg:justify-end items-center gap-4">
        <!-- Cancel button -->
        <button @click="$emit('close-modal')"
          class="hover:bg-neutral-200/80 px-4 py-1 rounded-md hover:shadow font-medium transition-all duration-200">
          Annuler
        </button>

        <!-- Delete button -->
        <button @click="deleteStaff(userData.id)"
          class="bg-red-500 hover:bg-red-700 px-4 py-1 rounded-md shadow text-white font-medium transition-all duration-200">
          Supprimer
        </button>
      </div>
    </div>
  </Modal>
  <Toast ref="toast" class="z-50"/>
</template>
