<script setup>
//*-------------------- Imports --------------------*//
import { ref, onMounted, reactive } from "vue";
import { formatCurrency } from "@/lib/helpers";
import { RouterLink, useRoute } from "vue-router";

// Component imports
import Toast from "@/components/shared/Toast.vue";

// Layout imports
import AuthenticatedLayout from "@/layouts/authenticatedLayout.vue";

// Store imports
import { useActivityStore } from "@/stores/activity";
import { useAuthStore } from "@/stores/auth";
import { useReservationStore } from "@/stores/reservation";
import { useToasterStore } from "@/stores/toaster";

//*-------------------- Stores --------------------*//
const authStore = useAuthStore();
const toaster = useToasterStore();
const activityStore = useActivityStore();
const reservationStore = useReservationStore();

//*-------------------- Variables --------------------*//
const isLoading = ref(true);
const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
const route = useRoute();
const activityId = ref(route.params.id);
const activity = ref(null);
const today = new Date();
const user = JSON.parse(localStorage.getItem("user"));

// Form data
  const formData = reactive({
    activity_id: activityId.value,
    user_email: user?.email,
    reservation_date: null,
    reservation_time: null,
    nb_adults: 0,
    nb_children: 0,
    total_price: 0,
  });


//*-------------------- Functions --------------------*//
onMounted(async () => {
  try {
    isLoading.value = true;
    await activityStore.getActivity(activityId.value);
    activity.value = activityStore.activity;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération de l'activité :",
      error
    );
  } finally {
    isLoading.value = false;
  }
});

const resetFields = () => {
  formData.reservation_date = null;
  formData.reservation_time = null;
  formData.nb_adults = 0;
  formData.nb_children = 0;
  formData.total_price = 0;
  nb_adults.value = 0;
  nb_children.value = 0;
};

const makeReservation = async () => {
  try {
    formData.total_price =
      activity.value.pricePerAdult * formData.nb_adults +
      activity.value.pricePerChildren * formData.nb_children;

    const response = await reservationStore.makeReservation(formData);
    toaster.showToast(
      "success",
      "Réservation",
      "Votre réservation a été ajoutée à votre panier."
    );
    resetFields();
  } catch (error) {
    toaster.showToast(
      "error",
      "Réservation",
      "Une erreur s'est produite lors de la réservation."
    );
    console.error(error);
  }
};
</script>

<template>
  <AuthenticatedLayout>
    <div class="w-full h-full relative">

    <!-- Background image -->
    <img
      :src="activity?.image"
      class="absolute inset-0 w-full h-full object-cover object-center brightness-50 blur-sm -z-10"/>

    <main class="w-[90%] max-w-7xl mx-auto my-12 lg:mt-20 min-h-[calc(100vh-150px)] text-white z-30">
      <!-- Title -->
      <h1 class="text-5xl text-center font-semibold lg:mb-8 text-white">
        {{ activity?.name }}
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 p-4 lg:p-8">
        <!-- Left side -->
        <div>
          <p class="text-xl">{{ activity?.description }}</p>

          <h2
            class="text-2xl tracking-tight lg:tracking-normal lg:text-3xl font-semibold mt-8 underline decoration-1 underline-offset-2 text-primary"
          >
            Informations à propos de l'activité
          </h2>
          <p class="tracking-wide mt-2 text-lg font-medium flex gap-3">
            Disponibilité de l'activité:
            <span class="font-light">{{
              activity?.status === 1 ? "Disponible" : "Indisponible pour le moment"
            }}</span>
          </p>

          <p class="tracking-wide mt-0.5 text-lg font-medium flex gap-3">
            Restriction d'age:
            <span class="font-light">{{ activity?.ageRestriction }}</span>
          </p>

          <p
            v-if="activity?.durationInMinutes > 0"
            class="tracking-wide mt-0.5 text-lg font-medium flex gap-3"
          >
            Durée de l'activité:
            <span class="font-light">{{ activity?.durationInMinutes }} minutes</span>
          </p>

          <p
            v-if="activity?.pricePerAdult > 0"
            class="tracking-wide mt-0.5 text-lg font-medium flex gap-3"
          >
            Prix par
            {{ activity?.pricePerChildren > 0 ? "adulte" : "personne" }}:
            <span class="font-light">{{ formatCurrency(activity?.pricePerAdult) }}$</span>
          </p>

          <p
            v-if="activity?.pricePerChildren > 0"
            class="tracking-wide mt-0.5 text-lg font-medium flex gap-3"
          >
            Prix par enfant:
            <span class="font-light"
              >{{ formatCurrency(activity?.pricePerChildren) }}$</span
            >
          </p>

          <p class="tracking-wide mt-4 italic">{{ activity?.notes }}</p>
        </div>


        <!-- Right side -->
        <div>
          <div
            class="w-[100%] mx-auto bg-white/80 backdrop-blur-md p-8 rounded-lg h-full text-black"
          >
            <h2
              class="text-3xl font-semibold uppercase tracking-wider text-center text-black"
            >
              Réservations
            </h2>

            <!-- Registration form -->
            <div v-if="isAuthenticated && activity?.isIncluded === 0">
              <form novalidate @submit.prevent="makeReservation">
                <div class="flex items-center justify-between gap-4 lg:gap-12 mt-5 lg:px-8 w-full">
                  <!-- Adults input -->
                  <div class="flex flex-col gap-1 w-full">
                    <label for="nb_adults" class="font-bold block mb-2">
                      Nombre d'adultes
                      <span class="text-red-500"> *</span>
                    </label>
                    <div class="flex items-center w-[150px]">
                      <!-- Adults input -->
                      <button
                        type="button"
                        @click="
                        formData.nb_adults > 0 && formData.nb_adults--;
                        "
                        class="px-4 py-1 h-[40px] rounded-l-md text-neutral-300 bg-black/50 hover:text-white text-lg"
                      >
                        <i class="fa-solid fa-chevron-left"></i>
                      </button>
                      <input
                        type="number"
                        id="nb_adults"
                        name="nb_adults"
                        v-model="formData.nb_adults"
                        class="bg-black/30 text-center focus:outline-none focus:ring-0 focus:ring-offset-0 w-full pb-1 px-2 pl-5 pt-1 h-[40px] pointer-events-none text-xl font-medium"
                      />
                      <button
                        type="button"
                        @click="
                        formData.nb_adults++;
                        "
                        class="px-4 py-1 h-[40px] rounded-r-md text-neutral-300 bg-black/50 hover:text-white text-lg"
                      >
                        <i class="fa-solid fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>

                  <div class="flex flex-col gap-1">
                    <label for="nb_children" class="font-bold block mb-2">
                      Nombre d'enfants
                      <span class="text-red-500"> *</span>
                    </label>
                    <div class="flex items-center w-[150px]">
                      <!-- Children input -->
                      <button
                        type="button"
                        @click="
                        formData.nb_children > 0 && formData.nb_children--;
                        "
                        class="px-4 py-1 h-[40px] rounded-l-md text-neutral-300 bg-black/50 hover:text-white text-lg"
                      >
                        <i class="fa-solid fa-chevron-left"></i>
                      </button>
                      <input
                        type="number"
                        id="nb_children"
                        name="nb_children"
                        v-model="formData.nb_children"
                        class="bg-black/30 text-center focus:outline-none focus:ring-0 focus:ring-offset-0 w-full pb-1 px-2 pl-5 pt-1 h-[40px] pointer-events-none text-xl font-medium"
                      />
                      <button
                        type="button"
                        @click="
                        formData.nb_children++;
                        "
                        class="px-4 py-1 h-[40px] rounded-r-md text-neutral-300 bg-black/50 hover:text-white text-lg"
                      >
                        <i class="fa-solid fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-between gap-4 lg:gap-12 mt-5 lg:px-8 w-full">
                  <!-- Date input -->
                  <div>
                    <label for="datePicker" class="font-bold block mb-2"
                      >Date de l'activité<span class="text-red-500"> *</span></label
                    >
                    <input
                      required
                      id="reservation_date"
                      type="date"
                      class="bg-black/30 text-black cursor-pointer px-4 py-1 rounded-md h-[40px] w-[150px] focus:outline-none focus:ring-0 focus:ring-offset-0"
                      v-model="formData.reservation_date"
                      :min="`${today.getFullYear()}-${String(
                        today.getMonth() + 1
                      ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`"
                    />
                  </div>

                  <!-- Time input -->
                  <div>
                    <label for="reservation_time" class="font-bold block mb-2"
                      >Heure de l'activité<span class="text-red-500"> *</span></label
                    >
                    <input
                      required
                      type="time"
                      id="reservation_time"
                      v-model="formData.reservation_time"
                      min="09:00"
                      max="18:00"
                      step="900"
                      class="bg-black/30 text-black cursor-pointer px-4 py-1 rounded-md h-[40px] w-[150px] focus:outline-none focus:ring-0 focus:ring-offset-0"
                    />
                  </div>
                </div>

                <div
                  class="flex items-start justify-center lg:justify-end gap-6 mt-3 px-8 w-full text-sm"
                >
                  <div>
                    <button
                      type="submit"
                      class="text-center text-base tracking-wide uppercase rounded-md shadow active:shadow-inner font-semibold bg-primary text-black py-2 px-4 hover:bg-primary-dark transition-all duration-300 mt-2"
                    >
                      Réserver
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <!-- Reservations not required -->
            <div
              v-else-if="isAuthenticated && activity?.isIncluded === 1"
              class="flex flex-col items-center justify-center h-full w-full lg:-mt-6"
            >
              <h3 class="text-base tracking-tight lg:text-xl text-center mb-2">
                La réservation n'est pas requise pour cette activité.
              </h3>
              <p class="text-sm text-center italic">Voir l'horaire de l'activité dans votre dépliant</p>
            </div>

            <!-- Not authenticated -->
            <div
              v-else
              class="flex flex-col items-center justify-center h-full w-full -mt-4"
            >
              <h3 class="text-xl text-center mb-2">
                Vous devez vous connecter pour faire une réservation.
              </h3>
              <RouterLink
                to="/auth"
                class="text-center mt-4 text-xl font-semibold bg-white text-black py-2 px-4 hover:bg-primary transition-all duration-300"
              >
                Connexion</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
    <Toast ref="toast" />
  </AuthenticatedLayout>
</template>
