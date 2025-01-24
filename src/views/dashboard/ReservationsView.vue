<style scoped>
  thead {
    position: relative;
  }

  div.scrollable {
    overflow-y: auto;
    overflow-x: hidden;
    width: 95%;
    margin: 0 auto;
    height: 100%;
    max-height: 76vh;
  }

  div.scrollable::-webkit-scrollbar {
    width: 6px;
  }

  div.scrollable::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }

  div.scrollable::-webkit-scrollbar-track {
    background-color: #eee;
  }

  div.scrollable>table>thead {
    position: sticky;
    top: 0;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  }

  .pagination-button {
    @apply disabled:text-neutral-200 text-neutral-900 hover:text-primary transition-all duration-200;
  }
</style>

<script setup>
//*-------------------- Imports --------------------*//
import { onMounted, ref } from 'vue';

// Components imports
import Loader from '@/components/Loader.vue';
import EditReservationsModal from '@/components/modals/EditReservationsModal.vue';
import DeleteReservationModal from '@/components/modals/DeleteReservationModal.vue';

// Stores imports
import { useAuthStore } from '@/stores/auth';
import { useRoomReservationStore } from '@/stores/room_reservation';


//*-------------------- Stores --------------------*//
const roomReservationStore = useRoomReservationStore();
const authStore = useAuthStore();


//*-------------------- Variables --------------------*//
const reservations = ref([]);
const selectedItem = ref({});


//*-------------------- States --------------------*//
const isLoading = ref(true);
const showEditModal = ref(false);
const showDeleteModal = ref(false);


//*-------------------- Functions --------------------*//
// Function to fetch reservations on component mount
onMounted(async () => {
  try {
    isLoading.value = true;
    await roomReservationStore.getReservations('/api/reservations');
    reservations.value = roomReservationStore.reservations.data;
  } catch (error) {
    console.error("Failed to load reservations:", error);
  } finally {
    console.log(reservations.value);
    console.log(roomReservationStore.reservations);
    isLoading.value = false;
  }
});

// Function to load the first results page
const firstPage = async () => {
  try {
    isLoading.value = true;
    await roomReservationStore.getReservations(roomReservationStore.reservations.first_page_url);
    reservations.value = roomReservationStore.reservations.data;
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
    await roomReservationStore.getPreviousPageResults();
    reservations.value = roomReservationStore.reservations.data;
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
    await roomReservationStore.getNextPageResults();
    reservations.value = roomReservationStore.reservations.data;
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
    await roomReservationStore.getReservations(roomReservationStore.reservations.last_page_url);
    reservations.value = roomReservationStore.reservations.data;
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
  await roomReservationStore.getReservations();
  items.value = roomReservationStore.items;
}

// Function to update reservation
const updateReservation = async (reservation_id) => {
  await roomReservationStore.updateReservation(reservation_id, { ...selectedItem.value });
  console.log({ ...selectedItem.value });
  refreshItems();
  showEditModal.value = false;
}

// Function to delete a reservation
const deleteReservation = async (reservation_id) => {
  await roomReservationStore.deleteReservation(reservation_id);
  refreshItems();
  showDeleteModal.value = false;
}
</script>

<template>
  <main class="w-full h-[calc(100vh-64px)] overflow-hidden p-6">
    <!-- Page Title -->
    <h1 class="text-5xl text-center font-semibold">Tableau des réservations</h1>

    <!-- Pagination Controls -->
    <div class="flex justify-end pr-[5%] h-[30px] items-center px-4 mb-2 -mt-4">
      <div v-if="!isLoading" class="flex justify-end items-center gap-3 px-4">
        <!-- First page button -->
        <button @click="firstPage()" :disabled="roomReservationStore.reservations.prev_page_url === null"
          class="pagination-button">
          <i class="fa-solid fa-angles-left"></i>
        </button>
        <!-- Previous page button -->
        <button @click="previousPage()" :disabled="roomReservationStore.reservations.prev_page_url === null"
          class="pagination-button">
          <i class="fa-solid fa-angle-left text-lg"></i>
        </button>
        <!-- Page number -->
        <span class="mb-0.5">
          Page {{ roomReservationStore.reservations.current_page }} de {{ roomReservationStore.reservations.last_page }}
        </span>
        <!-- Next page button -->
        <button @click="nextPage()" :disabled="roomReservationStore.reservations.next_page_url === null"
          class="pagination-button">
          <i class="fa-solid fa-angle-right text-lg"></i>
        </button>
        <!-- Last page button -->
        <button @click="lastPage()" :disabled="roomReservationStore.reservations.next_page_url === null"
          class="pagination-button">
          <i class="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>


    <!-- Reservations Table -->
    <div class="scrollable border-2 shadow-inner border-neutral-400">
      <table class="relative w-full h-full text-center">
        <!-- Table Header -->
        <thead class="bg-neutral-400 text-sm w-full" :class="showEditModal || showDeleteModal ? 'static z-0' : ''">
          <tr>
            <th class="p-4">Nom du client</th>
            <th class="p-4">Type d'hébergement</th>
            <th class="p-4">Numéro de chambre</th>
            <th class="p-4">Nombre d'invités</th>
            <th class="p-4">Date d'arrivée</th>
            <th class="p-4">Date de départ</th>
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
          <tr v-for="(reservation, index) in reservations" :key="reservation._id"
            :class="index % 2 === 0 ? 'bg-neutral-100' : ''">
            <td class="p-4">{{ reservation.user.name }}</td>
            <td class="p-4">{{ reservation.lodging.category }}</td>
            <td class="p-4">{{ reservation.lodging.room_number }}</td>
            <td class="p-4">{{ reservation.nb_guests }}</td>
            <td class="p-4">{{ reservation.arrival_date }}</td>
            <td class="p-4">{{ reservation.departure_date }}</td>
            <td class="p-4 flex items-center justify-center gap-4">
              <button @click="selectItem(reservation); showEditModal = true">
                <i class="fa-solid fa-pen-to-square hover:text-primary transition-all duration-200"></i>
              </button>
              <button v-if="authStore.user.role === 'admin'" @click="selectItem(reservation); showDeleteModal = true">
                <i class="fa-regular fa-trash-can hover:text-red-500 transition-all duration-200"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>


  <!-- Edit Reservation Modal -->
  <EditReservationsModal v-if="showEditModal"  @close-modal="showEditModal = false" :updateReservation="updateReservation" :selectedItem="selectedItem"  />

  <!-- Delete Reservation Modal -->
  <DeleteReservationModal v-if="showDeleteModal"  @close-modal="showDeleteModal = false" :deleteReservation="deleteReservation" :selectedItem="selectedItem" />
</template>
