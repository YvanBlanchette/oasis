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
</style>

<script setup>
import Loader from '@/components/Loader.vue';
import Modal from '@/components/Modal.vue';
import { useAuthStore } from '@/stores/auth';
import { useRoomReservationStore } from '@/stores/room_reservation';
import { onMounted, ref } from 'vue';

const roomReservationStore = useRoomReservationStore();
const authStore = useAuthStore();

// Variable to hold the reservations
const reservations = ref([]);

// Loading State
const isLoading = ref(true);

// Edit Modal State
const showEditModal = ref(false);

// Delete Modal State
const showDeleteModal = ref(false);

// Fetch activities on component mount
onMounted(async () => {
  try {
    isLoading.value = true;
    await roomReservationStore.getReservations('/api/reservations');
    reservations.value = roomReservationStore.reservations.data;
  } catch (error) {
    console.error("Failed to load activities:", error);
  } finally {
    console.log(reservations.value);
    console.log(roomReservationStore.reservations);
    isLoading.value = false;
  }
});


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
</script>

<template>
  <main class="w-full h-[calc(100vh-64px)] overflow-hidden p-6">
    <h1 class="text-5xl text-center font-semibold">Tableau des réservations</h1>

    <div class="flex justify-end pr-[5%] h-[30px] items-center px-4 mb-2 -mt-4">
      <div v-if="!isLoading" class="flex justify-end items-center gap-3 px-4">

          <button @click="firstPage()" :disabled="roomReservationStore.reservations.prev_page_url === null"
            class="disabled:text-neutral-200 text-neutral-900 hover:text-[#F4C887] transition-all duration-200">
            <i class="fa-solid fa-angles-left"></i>
          </button>
          <button @click="previousPage()" :disabled="roomReservationStore.reservations.prev_page_url === null"
            class="disabled:text-neutral-200 text-neutral-900 hover:text-[#F4C887] transition-all duration-200">
            <i class="fa-solid fa-angle-left text-lg"></i>
          </button>

        <span class="mb-0.5">
          Page {{ roomReservationStore.reservations.current_page }} de {{ roomReservationStore.reservations.last_page }}
        </span>


          <button @click="nextPage()" :disabled="roomReservationStore.reservations.next_page_url === null"
            class="disabled:text-neutral-200 text-neutral-900 hover:text-[#F4C887] transition-all duration-200">
            <i class="fa-solid fa-angle-right text-lg"></i>
          </button>
          <button @click="lastPage()" :disabled="roomReservationStore.reservations.next_page_url === null"
            class="disabled:text-neutral-200 text-neutral-900 hover:text-[#F4C887] transition-all duration-200">
            <i class="fa-solid fa-angles-right"></i>
          </button>
      </div>
    </div>




    <!-- Activities Table -->
    <div class="scrollable border-2 shadow-inner border-neutral-400">

      <table class="relative w-full h-full text-center">
        <thead class="bg-neutral-400 text-sm w-full" :class="showEditModal || showDeleteModal ? 'static z-0' : ''">
          <tr>
            <th class="p-4">Nom du client</th>
            <th class="p-4">Numéro de chambre</th>
            <th class="p-4">Nombre d'invités</th>
            <th class="p-4">Date d'arrivée</th>
            <th class="p-4">Date de départ</th>
            <th class="p-4">Actions</th>
          </tr>
        </thead>

        <!-- Loader -->
        <div v-if="isLoading" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
          <Loader color="text-[#F4C887]" />
        </div>

        <tbody v-else class="shadow-inner">
          <tr v-for="(reservation, index) in reservations" :key="reservation._id"
            :class="index % 2 === 0 ? 'bg-neutral-100' : ''">
            <td class="p-4">{{ reservation.user.name }}</td>
            <td class="p-4">{{ reservation.lodging.room_number }}</td>
            <td class="p-4">{{ reservation.nb_guests }}</td>
            <td class="p-4">{{ reservation.arrival_date }}</td>
            <td class="p-4">{{ reservation.departure_date }}</td>
            <td class="p-4 flex items-center justify-center gap-4">
              <button @click="showEditModal = true">
                <i class="fa-solid fa-pen-to-square hover:text-[#F4C887] transition-all duration-200"></i>
              </button>
              <button v-if="authStore.user.role === 'admin'" @click="showDeleteModal = true">
                <i class="fa-regular fa-trash-can hover:text-red-500 transition-all duration-200"></i>
              </button>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </main>

  <Modal v-if="showEditModal">
    <button @click="showEditModal = false"
      class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-200/80">
      <i class="fa-solid fa-xmark text-xl"></i>
    </button>

    <h1 class="text-4xl text-center font-semibold mb-6">Modifier une activité</h1>
  </Modal>

  <Modal v-if="showDeleteModal">
    <button @click="showDeleteModal = false"
      class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-200/80">
      <i class="fa-solid fa-xmark text-xl"></i>
    </button>

    <h1 class="text-4xl text-center font-semibold mb-6">Supprimer une activité</h1>
  </Modal>
</template>
