<script setup>
import AuthenticatedLayout from "@/layouts/authenticatedLayout.vue";
import { ref, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useActivityStore } from "@/stores/activity";
import { formatCurrency } from "@/lib/helpers";
import { useAuthStore } from "@/stores/auth";
import NumberInput from "@/components/form/NumberInput.vue";
import DatePicker from "@/components/form/DatePicker.vue";
import TimePicker from "@/components/form/TimePicker.vue";

// Store
const activityStore = useActivityStore();
const authStore = useAuthStore();

// Loading state
const isLoading = ref(true);

// Get the route object
const route = useRoute();

// Extract the `id` parameter from the URL
const activityId = ref(route.params.id);

// variable to hold the activity data
const activity = ref(null);

// Registration form
const formData = ref({
  nbreAdults: 0,
  nbreChildren: 0,
  date: null,
  time: null
});

const datetime12h = ref();
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

const today = new Date();


const bookActivity = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <AuthenticatedLayout>
    <!-- Background image -->
    <img :src="activity?.image"
      class="absolute top-0 left-0 right-0 w-full object-cover object-center h-[100vh] brightness-50 blur-sm" />

    <main class="w-[90%] mx-auto h-[calc(100vh-165px)] text-neutral-100 mt-[165px] z-30">
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
          <div class="w-[90%] mx-auto bg-neutral-100/10 backdrop-blur-md p-8 rounded-lg h-full">
            <h2 class="text-3xl font-semibold uppercase tracking-wider text-center text-primary">
              Réservations
            </h2>

            <!-- Registration form -->
            <div v-if="authStore.isAuthenticated && activity?.isIncluded === 0">
              <form @submit.prevent="bookActivity">
                <div class="flex items-center justify-between gap-12 mt-5 px-8 w-full">
                  <div class="flex flex-col gap-1">
                    <label for="horizontal-buttons" class="font-bold block mb-2">
                      Nombre {{
                        activity?.pricePerChildren > 0 ? "d\'adultes" : "de personnes"
                      }}
                      <span class="text-red-500"> *</span>
                    </label>
                    <NumberInput required="true" :inputValue="formData.nbreAdults" id="nbreAdults" name="nbreAdults"
                      min=0 max=10 />
                  </div>
                  <div v-if="activity?.pricePerChildren > 0" class="flex flex-col gap-1">
                    <label for="horizontal-buttons" class="font-bold block mb-2">
                      Nombre d'enfants
                      <span class="text-red-500"> *</span>
                    </label>
                    <NumberInput :inputValue="formData.nbrechildren" id="nbreChildren" name="nbreChildren" min=0 max=10 />
                  </div>
                </div>

                <div class="flex items-center justify-between gap-12 mt-5 px-8 w-full">
                  <!-- Date input -->
                  <div>
                    <label for="datePicker" class="font-bold block mb-2">Date de l'activité<span class="text-red-500"> *</span></label>
                    <DatePicker required="true" id="datePicker" :inputValue="formData.date" :minDate="today" />
                  </div>

                  <!-- Time input -->
                  <div>
                    <label for="timePicker" class="font-bold block mb-2">Heure de l'activité<span class="text-red-500"> *</span></label>
                    <TimePicker required="true" :inputValue="formData.time" id="timePicker" />
                  </div>
                </div>

                <div class="flex items-start justify-between gap-6 mt-5 px-8 w-full">
                  <div class="w-full">
                    <label for="terms">
                      <input type="checkbox" name="terms" id="terms">
                      J'accepte les termes et conditions
                    </label>
                  </div>

                  <div>
                    <button type="submit"
                      class="text-center uppercase rounded-md  font-semibold bg-neutral-100 text-neutral-900 py-2 px-4 hover:bg-primary transition-all duration-300">
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
  </AuthenticatedLayout>
</template>
