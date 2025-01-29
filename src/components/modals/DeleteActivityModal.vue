<script setup>
//*-------------------- Imports --------------------*//
// Components imports
import Modal from '@/components/shared/Modal.vue';
import Toast from '@/components/shared/Toast.vue';

// Store imports
import { useToasterStore } from '@/stores/toaster';
import { useActivityStore } from '@/stores/activity';


//*-------------------- Stores --------------------*//
const activityStore = useActivityStore();
const toaster = useToasterStore();


//*-------------------- Variables / States --------------------*//
const emit = defineEmits(['close-modal', 'refreshActivities'])

const props = defineProps({
  activityData: Object,
});


//*-------------------- Functions --------------------*//
// Function to delete a activities
const deleteActivity = async (activity_id) => {
  try {
    await activityStore.deleteActivity(activity_id);
    emit('refreshActivities');
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
    <!-- Close Button -->
    <button @click="$emit('close-modal')"
      class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-200/80">
      <i class="fa-solid fa-xmark text-xl black"></i>
    </button>

    <div class="text-black">
      <!-- Title -->
      <h1 class="text-4xl lg:text-5xl text-center font-semibold mb-6">Supprimer une activité</h1>
      <!-- Description -->
      <p class="text-lg lg:text-xl font-medium">Êtes-vous certain de vouloir supprimer cette activité? </p>
      <p class="text-base mb-6 italic text-center">Attention, vous ne pourrez plus revenir en arri&egrave;re.</p>

      <!-- Buttons -->
      <div class="flex justify-center lg:justify-end items-center gap-4">
        <!-- Cancel button -->
        <button @click="$emit('close-modal')"
          class="hover:bg-neutral-200/80 px-4 py-1 rounded-md hover:shadow font-medium transition-all duration-200">
          Annuler
        </button>

        <!-- Delete button -->
        <button @click="deleteActivity(activityData.id)"
          class="bg-red-500 hover:bg-red-700 px-4 py-1 rounded-md shadow text-white font-medium transition-all duration-200">
          Supprimer
        </button>
      </div>
    </div>
  </Modal>
  <Toast ref="toast" class="z-50" />
</template>
