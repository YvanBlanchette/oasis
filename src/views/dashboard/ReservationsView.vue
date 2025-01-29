<script setup>
//*-------------------- Imports --------------------*//
import { onMounted, ref } from 'vue';

// Components imports
import Loader from '@/components/shared/Loader.vue';
import EditReservationsModal from '@/components/modals/EditReservationsModal.vue';
import DeleteReservationModal from '@/components/modals/DeleteReservationModal.vue';

// Layout imports
import DashboardLayout from '@/layouts/DashboardLayout.vue';

// Stores imports
import { useAuthStore } from '@/stores/auth';
import { useReservationStore } from '@/stores/reservation';
import { formatDate } from '@/lib/helpers';


//*-------------------- Stores --------------------*//
const reservationStore = useReservationStore();

//*-------------------- Variables / States --------------------*//
const isLoading = ref(true);
const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
const reservations = ref([]);
const selectedItem = ref({});
const showEditModal = ref(false);
const showDeleteModal = ref(false);


//*-------------------- Functions --------------------*//
// Function to fetch reservations on component mount
onMounted(async () => {
  try {
    isLoading.value = true;
    await reservationStore.getReservations();
    reservations.value = reservationStore.reservations.data;
  } catch (error) {
    console.error("Failed to load reservations:", error);
  } finally {
    isLoading.value = false;
  }
});

// Function to load the first results page
const firstPage = async () => {
  try {
    isLoading.value = true;
    await reservationStore.getReservations(reservationStore.reservations.first_page_url);
    reservations.value = reservationStore.reservations.data;
  } catch (error) {
    console.log("Failed to load reservations:", error);
  } finally {
    isLoading.value = false;
  }
}

// Function to load the previous results page
const previousPage = async () => {
  try {
    isLoading.value = true;
    await reservationStore.getReservations(reservationStore.reservations.prev_page_url);
    reservations.value = reservationStore.reservations.data;
  } catch (error) {
    console.log("Failed to load reservations:", error);
  } finally {
    isLoading.value = false;
  }
}

// Function to load the next results page
const nextPage = async () => {
  try {
    isLoading.value = true;
    await reservationStore.getReservations(reservationStore.reservations.next_page_url);
    reservations.value = reservationStore.reservations.data;
  } catch (error) {
    console.log("Failed to load reservations:", error);
  } finally {
    isLoading.value = false;
  }
}

// Function to load the last results page
const lastPage = async () => {
  try {
    isLoading.value = true;
    await reservationStore.getReservations(reservationStore.reservations.last_page_url);
    reservations.value = reservationStore.reservations.data;
  } catch (error) {
    console.log("Failed to load reservations:", error);
  } finally {
    isLoading.value = false;
  }
}

// Function to handle item selection
function selectItem(item) {
  selectedItem.value = item;
}

// Function to refresh reservations
const refreshReservations = async () => {
  await reservationStore.getReservations();
  reservations.value = reservationStore.reservations.data;
}

// Function to check if an activity is passed
const passedReservations = (reservation_date) => {
  const today = new Date();
  const activityDate = new Date(reservation_date);
  return activityDate < today;
}
</script>

<template>
  <DashboardLayout>
    <main class="w-full h-[calc(100vh-100px)] overflow-hidden p-3 text-black">
      <div class="w-full h-[60px] flex flex-col justify-between">
        <!-- Page Title -->
        <h1 class="text-2xl lg:text-3xl xl:text-4xl text-black text-center font-semibold">Tableau des réservations</h1>

        <!-- Pagination Controls -->
        <div v-if="!isLoading" class="flex justify-center lg:justify-end mr-5 h-[30px] items-center px-4 mb-2 lg:-mt-6">
          <div class="flex justify-end items-center gap-3 px-4">
            <button @click="firstPage()" :disabled="reservationStore.reservations.prev_page_url === null"
              class="pagination-button">
              <i class="fa-solid fa-angles-left"></i>
            </button>
            <button @click="previousPage()" :disabled="reservationStore.reservations.prev_page_url === null"
              class="pagination-button">
              <i class="fa-solid fa-angle-left text-lg"></i>
            </button>
            <span class="mb-0.5">
              Page {{ reservationStore.reservations.current_page }} de {{ reservationStore.reservations.last_page }}
            </span>
            <button @click="nextPage()" :disabled="reservationStore.reservations.next_page_url === null"
              class="pagination-button">
              <i class="fa-solid fa-angle-right text-lg"></i>
            </button>
            <button @click="lastPage()" :disabled="reservationStore.reservations.next_page_url === null"
              class="pagination-button">
              <i class="fa-solid fa-angles-right"></i>
            </button>
          </div>
        </div>
      </div>


      <!-- Reservations Table -->
      <div class="scrollable border-2 shadow-inner border-neutral-400">
        <table class="relative w-full h-full text-center">
          <!-- Table Header -->
          <thead class="bg-neutral-400 text-sm w-full" :class="showEditModal || showDeleteModal ? 'static z-0' : ''">
            <tr>
              <th class="p-4 hidden lg:table-cell"></th>
              <th class="p-4 text-sm lg:text-base">Date de l'activité</th>
              <th class="p-4 text-sm lg:text-base">Nom de l'activité</th>
              <th class="p-4 text-sm lg:text-base">Nom du client</th>
              <th class="p-4 hidden lg:table-cell">Nombre d'adultes</th>
              <th class="p-4 hidden lg:table-cell">Nombre d'enfants</th>
              <th class="p-4 text-sm lg:text-base">Actions</th>
            </tr>
          </thead>

          <!-- Loader -->
          <tbody v-if="isLoading" class="table-loader">
            <Loader color="text-primary" />
          </tbody>

          <!-- Table Body -->
          <tbody v-else class="shadow-inner">
            <!-- Table Rows -->
            <tr v-for="(reservation, index) in reservations" :key="reservation"
              :class="index % 2 === 0 ? 'bg-neutral-100' : ''">
              <td class="p-4 hidden lg:table-cell"><i v-tooltip.left="'Activité complétée'"
                  v-if="passedReservations(reservation.reservation_date)"
                  class="fa-regular fa-circle-check text-green-700"></i></td>
              <td class="p-4 text-xs lg:text-base">{{ formatDate(reservation.reservation_date) }} à {{
                reservation.reservation_time.slice(0,5) }}</td>
              <td class="p-4 text-xs lg:text-base">{{ reservation.activity?.name }}</td>
              <td class="p-4 text-xs lg:text-base">{{ reservation.user?.displayName }}</td>
              <td class="p-4 hidden lg:table-cell">{{ reservation.nb_adults }} adultes</td>
              <td class="p-4 hidden lg:table-cell">{{ reservation.nb_children }} enfants</td>
              <td class="p-4 flex items-center justify-center gap-4">
                <button v-tooltip.left="'Modifier la réservation'"
                  @click="selectItem(reservation); showEditModal = true">
                  <i class="fa-solid fa-pen-to-square hover:text-primary transition-all duration-200"></i>
                </button>
                <button v-if="isAdmin" v-tooltip.left="'Supprimer'"
                  @click="selectItem(reservation); showDeleteModal = true">
                  <i class="fa-regular fa-trash-can hover:text-red-500 transition-all duration-200"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </DashboardLayout>


  <!-- Edit Reservation Modal -->
  <EditReservationsModal v-if="showEditModal" @close-modal="showEditModal = false" @refreshReservations="refreshReservations" :reservationData="selectedItem" />

  <!-- Delete Reservation Modal -->
  <DeleteReservationModal v-if="showDeleteModal" @close-modal="showDeleteModal = false" @refreshReservations="refreshReservations" :reservationData="selectedItem" />
</template>
