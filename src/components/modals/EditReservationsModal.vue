<script setup>
//*-------------------- Imports --------------------*//
import { onMounted, reactive, ref } from 'vue';

// Component imports
import Modal from '@/components/shared/Modal.vue';

// Stores imports
import { useToasterStore } from '@/stores/toaster';
import { useActivityStore } from '@/stores/activity';
import { useReservationStore } from '@/stores/reservation';


//*-------------------- Stores --------------------*//
const activityStore = useActivityStore();
const reservationStore = useReservationStore();
const toaster = useToasterStore();


//*-------------------- Variables / States --------------------*//
const emit = defineEmits(['close-modal', 'refreshReservations']);

const props = defineProps({
  reservationData: Object,
});

const user = JSON.parse(localStorage.getItem("user"));
const activity = ref({})

const today = new Date();
const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

// Form data
const formData = reactive({
  activity_id: props.reservationData.activity_id,
  user_email: props.reservationData.user.email,
  reservation_date: props.reservationData.reservation_date,
  reservation_time: props.reservationData.reservation_time,
  nb_adults: props.reservationData.nb_adults,
  nb_children: props.reservationData.nb_children,
  total_price: props.reservationData.total_price,
});


//*-------------------- Functions --------------------*//
onMounted(async () => {
  await activityStore.getActivity(props.reservationData.activity_id);
  activity.value = activityStore.activity;
})

// Function to update a reservation
const editReservation = async () => {
  try {
    formData.total_price = activity.value.pricePerAdult * formData.nb_adults + activity.value.pricePerChildren * formData.nb_children;
    await reservationStore.editReservation(formData, props.reservationData.id);
    toaster.showToast('success', 'Réservation', 'La réservation a été modifiée avec succès.');
  } catch (error) {
    toaster.showToast("error", "Réservation", "Une erreur s'est produite lors de la modification.");
    console.error(error);
  } finally {
    emit('close-modal');
    emit('refreshReservations');
  }
};
</script>

<template>
  <Modal>
    <div class="min-h-[400px] w-full flex flex-col justify-evenly text-black">
      <!-- Close button -->
      <button @click="$emit('close-modal')"
        class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-400/80">
        <i class="fa-solid fa-xmark text-xl text-black"></i>
      </button>
      <!-- Modal Title -->
      <h1 class="text-4xl lg:text-5xl text-center font-semibold">Modifier une réservation</h1>
      <form novalidate @submit.prevent="editReservation">
        <div class="flex items-center justify-between gap-12 px-8 w-full">

          <div class="flex flex-col">
          <label for="datePicker" class="font-bold block mb-2">Nombre d'adultes<span class="text-red-500">
            *</span></label>
          <div class="flex items-center w-[150px]">
            <!-- Adults input -->
            <button type="button" @click="
            formData.nb_adults > 0 && formData.nb_adults--;
            "
              class="px-4 py-1 h-[40px] rounded-l-md text-neutral-300 bg-black/50 hover:text-white text-lg">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <input type="number" id="nb_adults" name="nb_adults" v-model="formData.nb_adults"
              class="bg-black/30 text-center focus:outline-none focus:ring-0 focus:ring-offset-0 w-full pb-1 px-2 pl-5 pt-1 h-[40px] pointer-events-none text-xl font-medium" />
            <button type="button" @click="formData.nb_adults++;
            "
              class="px-4 py-1 h-[40px] rounded-r-md text-neutral-300 bg-black/50 hover:text-white text-lg">
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
          </div>

          <!-- Children input -->
          <div class="flex flex-col">
          <label for="datePicker" class="font-bold block mb-2">Nombre d'enfants<span class="text-red-500">
            *</span></label>
          <div class="flex items-center w-[150px]">
            <button type="button" @click="
            formData.nb_adults > 0 && formData.nb_children--;
            "
              class="px-4 py-1 h-[40px] rounded-l-md text-neutral-300 bg-black/50 hover:text-white text-lg">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <input type="number" id="nb_adults" name="nb_adults" v-model="formData.nb_children"
              class="bg-black/30 text-center focus:outline-none focus:ring-0 focus:ring-offset-0 w-full pb-1 px-2 pl-5 pt-1 h-[40px] pointer-events-none text-xl font-medium" />
            <button type="button" @click="formData.nb_children++;
            "
              class="px-4 py-1 h-[40px] rounded-r-md text-neutral-300 bg-black/50 hover:text-white text-lg">
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
          </div>
        </div>

        <div class="flex items-center justify-between gap-12 mt-5 px-8 w-full">
          <!-- Date input -->
          <div>
            <label for="datePicker" class="font-bold block mb-2">Date de l'activité<span class="text-red-500">
                *</span></label>
            <input required id="reservation_date" type="date"
              class="bg-black/30 text-black cursor-pointer px-4 py-1 rounded-md h-[40px] w-[150px] focus:outline-none focus:ring-0 focus:ring-offset-0"
              v-model="formData.reservation_date" :min="minDate" />
          </div>

          <!-- Time input -->
          <div>
            <label for="reservation_time" class="font-bold block mb-2">Heure de l'activité<span class="text-red-500">
                *</span></label>
            <input required type="time" id="reservation_time" v-model="formData.reservation_time" min="09:00"
              max="18:00" step="900"
              class="bg-black/30 text-black cursor-pointer px-4 py-1 rounded-md h-[40px] w-[150px] focus:outline-none focus:ring-0 focus:ring-offset-0" />
          </div>
        </div>

        <div class="flex items-start justify-between gap-6 mt-5 px-8 w-full text-xs">


          <div class="flex justify-center lg:justify-end items-center w-full gap-4 mt-4">
            <button type="button" @click="$emit('close-modal')"
            class="hover:bg-neutral-200/80 px-4 py-2 text-base rounded-md hover:shadow font-medium transition-all duration-200">
            Annuler
          </button>
            <button type="submit"
              class="text-center text-base uppercase rounded-md shadow active:shadow-inner font-semibold bg-primary tracking-wide text-black py-2 px-4 hover:bg-primary-dark transition-all duration-300">
              Réserver
            </button>
          </div>
        </div>
      </form>
    </div>
  </Modal>
</template>
