<script setup>
//*-------------------- Imports --------------------*//
// Component imports
import Modal from "@/components/shared/Modal.vue";
import Toast from "@/components/shared/Toast.vue";

// Stores imports
import { useToasterStore } from "@/stores/toaster";
import { useReservationStore } from "@/stores/reservation";


//*-------------------- Variables / States --------------------*//
const emit = defineEmits(["close-modal", "refreshReservations"]);

const props = defineProps({
  reservationData: Object,
});

//*-------------------- Stores --------------------*//
const reservationStore = useReservationStore();
const toaster = useToasterStore();


//*-------------------- Functions --------------------*//
// Function to delete a reservation
const deleteReservation = async (reservation_id) => {
  try {
    await reservationStore.deleteReservation(reservation_id);
    toaster.showToast("success", "Supression de réservation", "La suppression de la réservation a été effectuée avec succès");
  } catch (error) {
    console.log(error);
    toaster.showToast("error", "Supression de réservation", "Une erreur est survenue lors de la suppression de la réservation");
  } finally {
    emit("close-modal");
    emit("refreshReservations");
  }
};
</script>

<template>
  <Modal>
    <!-- Close Button -->
    <button
      @click="$emit('close-modal')"
      class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-400/80"
    >
      <i class="fa-solid fa-xmark text-xl text-black"></i>
    </button>

    <div class="text-black">
      <!-- Title -->
      <h1 class="text-4xl lg:text-5xl text-center font-semibold mb-6">Supprimer une réservation</h1>

      <!-- Description -->
      <p class="text-lg lg:text-xl font-medium tracking-tight lg:tracking-wide text-center lg:text-start">
        Êtes-vous certain de vouloir supprimer la réservation?
      </p>
      <p class="text-sm lg:text-base italic text-center lg:text-start mb-6">
        Une fois supprim&eacute;, vous ne pourrez plus revenir en arri&egrave;re.
      </p>

      <!-- Buttons -->
      <div class="flex justify-center lg:justify-end items-center gap-4">
        <!-- Cancel button -->
        <button
          @click="$emit('close-modal')"
          class="hover:bg-neutral-400/80 px-4 py-1 rounded-md hover:shadow font-medium transition-all duration-200"
        >
          Annuler
        </button>

        <!-- Confirm button -->
        <button
          @click="deleteReservation(props.reservationData.id)"
          class="bg-red-500 hover:bg-red-700 px-4 py-1 rounded-md shadow text-white font-medium transition-all duration-200"
        >
          Confirmer
        </button>
      </div>
    </div>
  </Modal>
  <Toast ref="toast" class="z-50"/>
</template>
