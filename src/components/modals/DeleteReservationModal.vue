<script setup>
  import Modal from '@/components/shared/Modal.vue';

  defineEmits: ['close-modal']

  defineProps({
  selectedItem: Object,
  deleteReservation: Function
});
</script>
 
<template>
   <Modal>
    <button @click="$emit('close-modal')"
      class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-400/80">
      <i class="fa-solid fa-xmark text-xl text-neutral-100"></i>
    </button>

    <div class="text-neutral-100">
      <h1 class="text-5xl text-center font-semibold mb-6 text-neutral-100">Supprimer une réservation</h1>
      <p class="text-xl font-medium">Êtes-vous certain de vouloir supprimer cette réservation? </p>
      <p class="text-base mb-6">Une fois supprim&eacute;, vous ne pourrez plus revenir en arri&egrave;re.</p>
      <div class="flex justify-end items-center gap-4">
        <button @click="$emit('close-modal')"
          class="hover:bg-neutral-400/80 px-4 py-1 rounded-md hover:shadow font-medium transition-all duration-200">
          Annuler
        </button>
        <button @click="deleteReservation(selectedItem.id)"
          class="bg-red-500 hover:bg-red-700 px-4 py-1 rounded-md shadow text-neutral-100 font-medium transition-all duration-200">
          Confirmer
        </button>
      </div>
    </div>
  </Modal>
</template>
