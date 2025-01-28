<script setup>
//*-------------------- Imports --------------------*//
import { ref, onMounted, reactive } from "vue";
import { formatCurrency } from "@/lib/helpers";
import { RouterLink, useRoute } from "vue-router";

// Component imports
import NumberInput from "@/components/form/NumberInput.vue";
import DatePicker from "@/components/form/DatePicker.vue";
import TimePicker from "@/components/form/TimePicker.vue";
import Toast from "@/components/shared/Toast.vue";

// Layout imports
import AuthenticatedLayout from "@/layouts/authenticatedLayout.vue";

// Store imports
import { useActivityStore } from "@/stores/activity";
import { useAuthStore } from "@/stores/auth";
import { useReservationStore } from "@/stores/reservation";
import { useToasterStore } from "@/stores/toaster";
import { auth } from "@/firebase";


//*-------------------- Stores --------------------*//
const authStore = useAuthStore();
const toaster = useToasterStore();
const activityStore = useActivityStore();
const reservationStore = useReservationStore();


//*-------------------- Variables --------------------*//
const isLoading = ref(true);
const route = useRoute();
const activityId = ref(route.params.id);
const activity = ref(null);
const today = new Date();
const terms = ref(false);
const user = JSON.parse(localStorage.getItem("user"));
const nb_adults = ref(0);
const nb_children = ref(0);

// Form data
const formData = reactive({
  activity_id: null,
  user_id: null,
  reservation_date: null,
  reservation_time: null,
  nb_participants: 0,
  total_price: 0,
});


//*-------------------- Functions --------------------*//
onMounted(async () => {
  try {
    isLoading.value = true;
    await activityStore.getActivity(activityId.value);
    activity.value = activityStore.activity?.activity;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération de l'activité :",
      error
    );
  } finally {
    isLoading.value = false;
  }
});


const makeReservation = async () => {
  if (!terms.value) {
    toaster.showToast("error", "Réservation", "Veuillez accepter les termes et conditions.");
    return;
  }
  console.log('formData before submission:', formData);

  try {
    formData.total_price = (Number(activity.value.pricePerAdult) * Number(formData.nb_adults)) + (Number(activity.value.pricePerChildren) * Number(formData.nb_children));
    formData.user_id = user.id;
    formData.activity_id = activity.value.id;
    formData.nb_participants = Number(nb_adults) + Number(nb_children);

    const response = await reservationStore.makeReservation(formData);
    console.log(formData);
    console.log(response);
  } catch (error) {
    toaster.showToast("error", "Réservation", "Une erreur s'est produite lors de la réservation.");
    console.error(error);
  }
}
</script>

<template>
  <AuthenticatedLayout>
    <!-- Background image -->
    <img :src="activity?.image"
      class="absolute top-0 left-0 right-0 w-full object-cover object-center h-[100vh] mt-[100px] brightness-50 blur-sm" />

    <main class="w-[90%] mx-auto h-[calc(100vh-100px)] text-neutral-100 mt-[50px] z-30">
      <!-- Title -->
      <h1 class="text-5xl text-center font-semibold mb-8 text-primary">
        {{ activity?.name }}
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 p-8">
        <!-- Left side -->
        <div>
          <p class="text-xl">{{ activity?.description }}</p>

          <h2 class="text-3xl font-semibold mt-8 underline decoration-1 underline-offset-2 text-primary">
            Informations à propos de l'activité
          </h2>
          <p class="tracking-wide mt-2 text-lg font-medium flex gap-3">
            Disponibilité de l'activité:
            <span class="font-light">{{
              activity?.status === 1
                ? "Disponible"
                : "Indisponible pour le moment"
            }}</span>
          </p>

          <p class="tracking-wide mt-0.5 text-lg font-medium flex gap-3">
            Restriction d'age:
            <span class="font-light">{{ activity?.ageRestriction }}</span>
          </p>

          <p v-if="activity?.durationInMinutes > 0" class="tracking-wide mt-0.5 text-lg font-medium flex gap-3">
            Durée de l'activité:
            <span class="font-light">{{ activity?.durationInMinutes }} minutes</span>
          </p>

          <p v-if="activity?.pricePerAdult > 0" class="tracking-wide mt-0.5 text-lg font-medium flex gap-3">
            Prix par
            {{
              activity?.pricePerChildren > 0 ? "adulte" : "personne"
            }}:
            <span class="font-light">{{ formatCurrency(activity?.pricePerAdult) }}$</span>
          </p>

          <p v-if="activity?.pricePerChildren > 0" class="tracking-wide mt-0.5 text-lg font-medium flex gap-3">
            Prix par enfant:
            <span class="font-light">{{ formatCurrency(activity?.pricePerChildren) }}$</span>
          </p>

          <p class="tracking-wide mt-4 italic">{{ activity?.notes }}</p>
        </div>


        <!-- Right side -->
        <div>
          <div class="w-[90%] mx-auto bg-neutral-100/30 backdrop-blur-md p-8 rounded-lg h-full">
            <h2 class="text-3xl font-semibold uppercase tracking-wider text-center text-primary">
              Réservations
            </h2>

            <!-- Registration form -->
            <div v-if="authStore.isAuthenticated && activity?.isIncluded === 0">
              <form novalidate @submit.prevent="makeReservation">

                <div class="flex items-center justify-between gap-12 mt-5 px-8 w-full">
                  <!-- Adults input -->
                  <div class="flex flex-col gap-1">
                    <label for="horizontal-buttons" class="font-bold block mb-2">
                      Nombre {{
                        activity?.pricePerChildren > 0 ? "d\'adultes" : "de personnes"
                      }}
                      <span class="text-red-500"> *</span>
                    </label>
                    <NumberInput required="true" :inputValue="nb_adults" id="nb_adult" />
                  </div>

                  <!-- Children input -->
                  <div v-if="activity?.pricePerChildren > 0" class="flex flex-col gap-1">
                    <label for="horizontal-buttons" class="font-bold block mb-2">
                      Nombre d'enfants
                      <span class="text-red-500"> *</span>
                    </label>
                    <NumberInput :inputValue="nb_children" id="nb_children" name="nb_children" />
                  </div>
                </div>

                <div class="flex items-center justify-between gap-12 mt-5 px-8 w-full">
                  <!-- Date input -->
                  <div>
                    <label for="datePicker" class="font-bold block mb-2">Date de l'activité<span class="text-red-500"> *</span></label>
                    <DatePicker required="true" id="datePicker" :inputValue="formData.reservation_date" :minDate="today" />
                  </div>

                  <!-- Time input -->
                  <div>
                    <label for="timePicker" class="font-bold block mb-2">Heure de l'activité<span class="text-red-500"> *</span></label>
                    <TimePicker required="true" :inputValue="formData.reservation_time" id="timePicker" />
                  </div>
                </div>

                <div class="flex items-start justify-between gap-6 mt-5 px-8 w-full text-xs">
                  <div class="w-full">
                    <label for="terms" class="flex items-center gap-2">
                      <input v-model="terms" type="checkbox" name="terms" id="terms">
                      J'accepte les termes et conditions
                    </label>
                  </div>

                  <div>
                    <button type="submit"
                      class="text-center uppercase rounded-md shadow active:shadow-inner font-semibold bg-primary tracking-wide text-black py-2 px-4 hover:bg-primary-dark transition-all duration-300">
                      Réserver
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <!-- Reservations not required -->
            <div v-else-if="authStore.isAuthenticated && activity?.isIncluded === 1"
              class="flex flex-col items-center justify-center h-full w-full -mt-6">
              <h3 class="text-xl text-center mb-2">
                La réservation n'est pas requise pour cette activité.
              </h3>
              <p>Voir l'horaire de l'activité dans votre dépliant</p>
            </div>

            <!-- Not authenticated -->
            <div v-else class="flex flex-col items-center justify-center h-full w-full -mt-4">
              <h3 class="text-xl text-center mb-2">
                Vous devez vous connecter pour faire une réservation.
              </h3>
              <RouterLink to="/auth"
                class="text-center mt-4 text-xl font-semibold bg-neutral-100 text-neutral-900 py-2 px-4 hover:bg-primary transition-all duration-300">
                Connexion</RouterLink>
            </div>

          </div>
        </div>
      </div>
    </main>
    <Toast ref="toast" />
  </AuthenticatedLayout>
</template>
