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
const authStore = useAuthStore();


//*-------------------- Variables / States --------------------*//
const isLoading = ref(true);
const reservations = ref([]);
const selectedItem = ref({});
const showEditModal = ref(false);
const showDeleteModal = ref(false);


//*-------------------- Functions --------------------*//
// Function to fetch reservations on component mount
onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await reservationStore.getReservations('/api/reservations');
    reservations.value = response.data;
  } catch (error) {
    console.error("Failed to load reservations:", error);
  } finally {
    console.log(reservationStore.reservations);
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
    console.log("Failed to load activities:", error);
  } finally {
    isLoading.value = false;
  }
}

// Function to load the previous results page
const previousPage = async () => {
  try {
    isLoading.value = true;
    await reservationStore.getPreviousPageResults();
    reservations.value = reservationStore.reservations.data;
  } catch (error) {
    console.log("Failed to load activities:", error);
  } finally {
    isLoading.value = false;
  }
}

// Function to load the next results page
const nextPage = async () => {
  try {
    isLoading.value = true;
    await reservationStore.getNextPageResults();
    reservations.value = reservationStore.reservations.data;
  } catch (error) {
    console.log("Failed to load activities:", error);
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
    console.log("Failed to load activities:", error);
  } finally {
    isLoading.value = false;
  }
}

// Function to handle item selection
function selectItem(item) {
  selectedItem.value = item;
}

// Function to refresh reservations
const refreshItems = async () => {
  await reservationStore.getReservations();
  items.value = reservationStore.items;
}

// Function to update reservation
const updateReservation = async (reservation_id) => {
  await reservationStore.updateReservation(reservation_id, { ...selectedItem.value });
  console.log({ ...selectedItem.value });
  refreshItems();
  showEditModal.value = false;
}

// Function to delete a reservation
const deleteReservation = async (reservation_id) => {
  await reservationStore.deleteReservation(reservation_id);
  refreshItems();
  showDeleteModal.value = false;
}

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
    <div v-if="!isLoading" class="flex justify-between mr-5 h-[30px] items-center px-4 mb-2 -mt-6">
      <div class="flex justify-end items-center gap-3 px-4">
        <button @click="firstPage()" :disabled="reservationStore.reservations.prev_page_url === null" class="pagination-button">
          <i class="fa-solid fa-angles-left"></i>
        </button>
        <button @click="previousPage()" :disabled="reservationStore.reservations.prev_page_url === null" class="pagination-button">
          <i class="fa-solid fa-angle-left text-lg"></i>
        </button>
        <span class="mb-0.5">
          Page {{ reservationStore.reservations.current_page }} de {{ reservationStore.reservations.last_page }}
        </span>
        <button @click="nextPage()" :disabled="reservationStore.reservations.next_page_url === null" class="pagination-button">
          <i class="fa-solid fa-angle-right text-lg"></i>
        </button>
        <button @click="lastPage()" :disabled="reservationStore.reservations.next_page_url === null" class="pagination-button">
          <i class="fa-solid fa-angles-right"></i>
        </button>
      </div>

    <!-- Add reservation button -->
      <button @click="showCreateModal = true"
        class="text-neutral-900 hover:text-primary/80 transition-all duration-200">
        <i class="fa-solid fa-plus"></i>
        Ajouter une activité
      </button>
    </div>
    </div>


    <!-- Reservations Table -->
    <div class="scrollable border-2 shadow-inner border-neutral-400">
      <table class="relative w-full h-full text-center">
        <!-- Table Header -->
        <thead class="bg-neutral-400 text-sm w-full" :class="showEditModal || showDeleteModal ? 'static z-0' : ''">
          <tr>
            <th class="p-4"></th>
            <th class="p-4">Date de l'activité</th>
            <th class="p-4">Nom de l'activité</th>
            <th class="p-4">Nom du client</th>
            <th class="p-4">Nombre de participants</th>
            <th class="p-4">Actions</th>
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
            <td class="p-4"><i v-tooltip.top="'Activité complétée'" v-if="passedReservations(reservation.reservation_date)" class="fa-regular fa-circle-check text-green-700"></i></td>
            <td class="p-4">{{ formatDate(reservation.reservation_date) }} à {{ reservation.reservation_time.slice(0,5) }}</td>
            <td class="p-4">{{ reservation.activity?.name }}</td>
            <td class="p-4">{{ reservation.user?.displayName }}</td>
            <td class="p-4">{{ reservation.nb_participants }} participants</td>
            <td class="p-4 flex items-center justify-center gap-4">
              <button v-tooltip.top="'Modifier'" @click="selectItem(reservation); showEditModal = true">
                <i class="fa-solid fa-pen-to-square hover:text-primary transition-all duration-200"></i>
              </button>
              <button v-tooltip.top="'Supprimer'" @click="selectItem(reservation); showDeleteModal = true">
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
  <EditReservationsModal v-if="showEditModal"  @close-modal="showEditModal = false" :updateReservation="updateReservation" :selectedItem="selectedItem"  />

  <!-- Delete Reservation Modal -->
  <DeleteReservationModal v-if="showDeleteModal"  @close-modal="showDeleteModal = false" :deleteReservation="deleteReservation" :selectedItem="selectedItem" />
</template>
