<style scoped>
thead {
  position: relative;
}

div.scrollable {
  overflow-y: auto;
  overflow-x: hidden;
  width: 95%;
  margin: 0 auto;
  height: 76vh;
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
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const authStore = useAuthStore();

// Variable to hold the guests
const guests = ref([]);

// Variable to hold the selected guest
const selectedGuest = ref({});

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
    await userStore.getUsers();
    guests.value = userStore.guests;
  } catch (error) {
    console.error("Failed to load activities:", error);
  } finally {
    console.log(guests.value);
    isLoading.value = false;
  }
});

// Function to handle guest selection
function selectGuest(guest) {
  selectedGuest.value = guest;
}

const deleteUser = async (user_id) => {
  await userStore.deleteUser(user_id);
  await userStore.getUsers();
  guests.value = userStore.guests;
  showDeleteModal.value = false;
}
</script>

<template>
  <main class="w-full h-[calc(100vh-64px)] overflow-hidden p-6">
    <h1 class="text-5xl text-center font-semibold mb-6">Tableau des clients</h1>

    <!-- Loader -->
    <div v-if="isLoading" class="w-full h-full flex items-center justify-center -mt-12">
      <Loader color="text-[#F4C887]" />
    </div>

    <!-- Activities Table -->
    <div v-else class="scrollable border-2 shadow-inner border-neutral-400">
      <table class="w-full text-center">
        <thead class="bg-neutral-400 text-sm" :class="showEditModal || showDeleteModal ? 'static z-0' : ''">
          <tr>
            <th class="p-4"></th>
            <th class="p-4">Nom</th>
            <th class="p-4">Courriel</th>
            <th class="p-4">Téléphone</th>
            <th class="p-4">Dernière visite</th>
            <th class="p-4">Actions</th>
          </tr>
        </thead>

        <tbody class="shadow-inner">
          <tr v-for="(guest, index) in guests" :key="guest._id" :class="index % 2 === 0 ? 'bg-neutral-100' : ''">
            <td class="px-4 py-2">
              <img class="w-10 h-10 object-cover rounded-full" :src="guest.image" :alt="guest.name" />
            </td>
            <td class="p-4">{{ guest.name }}</td>
            <td class="p-4">{{ guest.email }}</td>
            <td class="p-4">{{ guest.phone }}</td>
            <td class="p-4">{{ guest.updated_at.slice(0, 10) }}</td>
            <td class="p-4 flex items-center justify-center gap-4">
              <button @click="selectGuest(guest); showEditModal = true">
                <i class="fa-solid fa-pen-to-square hover:text-[#F4C887] transition-all duration-200"></i>
              </button>
              <button v-if="authStore.user.role === 'admin'" @click="selectGuest(guest); showDeleteModal = true">
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

    <div>
      <h1 class="text-5xl text-center font-semibold mb-6">Modifier un client</h1>
      <form @submit.prevent="updateUser">
        <Input type="text" label="Nom" v-model="selectedGuest.name" className="text-neutral-900"/>
      </form>
    </div>
  </Modal>

  <Modal v-if="showDeleteModal">
    <button @click="showDeleteModal = false"
      class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-200/80">
      <i class="fa-solid fa-xmark text-xl"></i>
    </button>

    <div>
      <h1 class="text-5xl text-center font-semibold mb-6">Supprimer un client</h1>
      <p class="text-xl font-medium">Êtes-vous certain de vouloir supprimer le client "{{ selectedGuest.name }}"? </p>
      <p class="text-base mb-6">Une fois supprim&eacute;, vous ne pourrez plus revenir en arri&egrave;re.</p>
      <div class="flex justify-end items-center gap-4">
        <button @click="showDeleteModal = false"
          class="hover:bg-neutral-200 px-4 py-1 rounded-md hover:shadow font-medium transition-all duration-200">
          Annuler
        </button>
        <button @click="deleteUser(selectedGuest.id)"
          class="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md shadow text-neutral-100 font-medium transition-all duration-200">
          Confirmer
        </button>
      </div>
    </div>
  </Modal>
</template>
