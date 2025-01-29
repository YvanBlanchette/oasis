<script setup>
//*-------------------- Imports --------------------*//
import { onMounted, ref } from 'vue';
import { formatCurrency } from '@/lib/helpers';

// Components imports
import Loader from '@/components/shared/Loader.vue';
import EditReservationsModal from '@/components/modals/EditReservationsModal.vue';
import DeleteReservationModal from '@/components/modals/DeleteReservationModal.vue';

// Store imports
import { useReservationStore } from '@/stores/reservation';

// Layout imports
import AuthenticatedLayout from '@/layouts/authenticatedLayout.vue';


//*-------------------- Stores --------------------*//
const reservationStore = useReservationStore();


//*-------------------- Variables / States --------------------*//
const subtotal = ref(0);
const isLoading = ref(true);
const reservations = ref([]);
const selectedItem = ref({});
const user = JSON.parse(localStorage.getItem('user'));
const showDeleteModal = ref(false);
const showEditModal = ref(false);
const showRemoveAllModal = ref(false);
const showConfirmationModal = ref(false);



//*-------------------- Functions --------------------*//
onMounted(async () => {
  try {
    isLoading.value = true;
    await reservationStore.getUserReservations(user.email);
    reservations.value = reservationStore.reservations;

    subtotal.value = reservations.value.reduce((total, reservation) => total + reservation.total_price, 0);

    return subtotal.value
  } catch (error) {
    console.error("Failed to load reservations:", error);
  } finally {
    isLoading.value = false;
  }
})

// Function to handle item selection
function selectItem(item) {
  selectedItem.value = item;
}

// Function to refresh reservations
const refreshItems = async () => {
  await reservationStore.getUserReservations(user.email);
  reservations.value = reservationStore.reservations;
}

// Remove all reservations
const removeAllUserReservations = async () => {
  await reservationStore.removeAllUserReservations(user.email);
  showRemoveAllModal.value = false;
  refreshItems();
  window.location.reload();
}

// Confirm reservation
const confirmReservation = async () => {
  await reservationStore.removeAllUserReservations(user.email);
  showConfirmationModal.value = false;
  refreshItems();
  window.location.reload();
}

</script>

<template>
  <AuthenticatedLayout>
    <main
      class="relative bg-[url('/images/beach.jpg')] bg-cover bg-no-repeat bg-center w-full h-full min-h-[calc(100vh-120px)] bg-neutral-50 text-black flex justify-center items-center py-12">

      <!-- bg-overlay -->
      <div class="absolute inset-0 bg-black opacity-20 z-0" />

      <div class="bg-white/90 backdrop-blur-md w-[90%] h-full max-w-5xl mx-auto p-8 rounded-md shadow-xl z-10">
        <h1 class="text-5xl text-center font-semibold mb-6">Mes réservations</h1>

        <div class="scrollable border-2 shadow-inner border-neutral-400 max-h-[60vh]">
          <table class="relative w-full h-full text-center">
            <thead class="bg-neutral-400 text-sm w-full h-[40px]">
              <tr>
                <th class="p-4">Nom de l'activité</th>
                <th class="p-4">Date</th>
                <th class="p-4">Heure</th>
                <th class="p-4">Nombre d'adultes</th>
                <th class="p-4">Nombre d'enfants</th>
                <th class="p-4">Coût total</th>
                <th class="p-4"></th>
              </tr>
            </thead>

            <!-- Loading -->
            <tbody v-if="isLoading" class="table-loader">
              <Loader color="text-primary" />
            </tbody>

            <!-- No reservations found -->
            <div v-if="!isLoading && reservations.length === 0" class="table-loader">
              <p class="">Aucune réservation trouvée</p>
            </div>

            <!-- Reservations Table -->
            <tbody v-if="reservations.length > 0" class="shadow-inner w-full h-full">
              <tr v-for="(reservation, index) in reservations" :key="reservation" class="max-h-[40px] h-fit w-full"
                :class="index % 2 === 0 ? 'bg-neutral-100' : 'bg-white'">
                <td class="p-4">{{ reservation.activity?.name }}</td>
                <td class="p-4">{{ reservation.reservation_date }}</td>
                <td class="p-4">{{ reservation.reservation_time }}</td>
                <td class="p-4">{{ reservation.nb_adults }} adultes</td>
                <td class="p-4">{{ reservation.nb_children }} enfants</td>
                <td class="p-4">{{ formatCurrency(reservation.total_price) }}$</td>
                <td class="p-4">
                  <div class="flex  justify-center gap-4">

                    <button v-tooltip.top="'Supprimer'" @click="selectItem(reservation); showDeleteModal = true"
                      class="w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-300/80 group">
                      <i class="fa-solid fa-xmark  group-hover:text-red-500 transition-all duration-200"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>

            <!-- Table Footer -->
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="text-end py-1">Sous-total: </td>
                <td>{{ formatCurrency(subtotal) }}$</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="text-end py-1">Taxes: </td>
                <td>{{ formatCurrency(subtotal * 0.15) }}$</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="text-end py-1 font-bold tracking-wide">Total: </td>
                <td class="font-bold tracking-wide">{{ formatCurrency(subtotal * 1.15) }}$</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Buttons -->
        <div class="mt-6 flex justify-end gap-4 mr-5">
          <button @click="showRemoveAllModal = true"
            class="text-black font-medium hover:text-red-500 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-300/80 px-4 py-2">
            Vider la liste
          </button>
          <button @click="showConfirmationModal = true"
            class="bg-primary hover:bg-primary-dark px-4 py-2 rounded-md shadow-sm text-white font-medium transition-all duration-200">
            Envoyer la demande
          </button>
        </div>
      </div>
    </main>
  </AuthenticatedLayout>

  <!-- Delete Reservation Modal -->
  <DeleteReservationModal v-if="showDeleteModal" @close-modal="showDeleteModal = false"
    @refresh-reservations="refreshItems" :reservationData="selectedItem" :deleteReservation="deleteReservation" />

  <!-- Remove all reservations Modal -->
  <Modal v-if="showRemoveAllModal">
    <button @click="showRemoveAllModal = false"
      class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-400/80">
      <i class="fa-solid fa-xmark text-xl text-black"></i>
    </button>

    <div class="text-black">
      <h1 class="text-5xl text-center font-semibold mb-6">Supprimer les réservations</h1>
      <p class="text-xl font-medium">Êtes-vous certain de vouloir vider votre panier de réservations? </p>
      <p class="text-base mb-6">Une fois confirmé, vous ne pourrez plus revenir en arri&egrave;re.</p>
      <div class="flex justify-end items-center gap-4">
        <button @click="showRemoveAllModal = false"
          class="hover:bg-neutral-400/80 px-4 py-1 rounded-md hover:shadow font-medium transition-all duration-200">
          Annuler
        </button>
        <button @click="removeAllUserReservations(user.email)"
          class="bg-red-500 hover:bg-red-700 px-4 py-1 rounded-md shadow text-white font-medium transition-all duration-200">
          Confirmer
        </button>
      </div>
    </div>
  </Modal>

  <!-- Confirmation Modal -->
  <Modal v-if="showConfirmationModal">
    <div class="text-black">
      <h1 class="text-5xl text-center font-semibold mb-6 mt-2">Confirmation de réservations</h1>
      <div class="flex items-center justify-center w-full">
        <img src="/images/check.gif" alt="check" class="h-[200px]">
      </div>
      <p class="text-lg font-light mb-4">Votre demande de reservation est en cours de traitement, un membre de l'équipe
        vous contactera dans les plus brefs delais pour vous donner les informations nécessaires et procéder au
        paiement.</p>
      <div class="flex justify-end items-center gap-4">
        <button @click="confirmReservation"
          class="bg-primary hover:bg-primary-dark px-4 py-1 rounded-md shadow text-white text-lg font-medium transition-all duration-200">
          Retour
        </button>
      </div>
    </div>
  </Modal>
</template>
