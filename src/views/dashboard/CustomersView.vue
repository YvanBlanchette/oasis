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
//*-------------------- Imports --------------------*//
import { onMounted, ref } from 'vue';

// Component imports
import Loader from '@/components/Loader.vue';
import CreateUserModal from '@/components/modals/CreateUserModal.vue';

// Stores imports
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';

//*-------------------- Stores --------------------*//
const userStore = useUserStore();
const authStore = useAuthStore();

//*-------------------- Variables --------------------*//
const guests = ref([]);
const selectedGuest = ref({});

//*-------------------- States --------------------*//
const isLoading = ref(true);
const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);

//*-------------------- Functions --------------------*//
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

// Function to refresh users
const refreshUsers = async () => {
  await userStore.getUsers();
  guests.value = userStore.guests;
}

// Function to update user
const updateUser = async (user_id) => {
  await userStore.updateUser(user_id, { ...selectedGuest.value });

  console.log({ ...selectedGuest.value });
  refreshUsers();
  showEditModal.value = false;
}

// Function to delete a user
const deleteUser = async (user_id) => {
  await userStore.deleteUser(user_id);
  refreshUsers();
  showDeleteModal.value = false;
}
</script>

<template>
  <main class="w-full h-[calc(100vh-64px)] overflow-hidden p-6">
    <!-- Title -->
    <h1 class="text-5xl text-center font-semibold">Tableau des clients</h1>

    <div class="flex justify-end pr-[5%] h-[30px] items-center px-4 mb-2 -mt-4">
      <button @click="showCreateModal = true"
        class="text-neutral-900 hover:text-primary/80 transition-all duration-200">
        <i class="fa-solid fa-user-plus"></i>
        Ajouter un client
      </button>
    </div>


    <!-- Guests Table -->
    <div class="relative scrollable border-2 shadow-inner border-neutral-400">
      <table class="w-full text-center">
        <!-- Table Header -->
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

 <!-- Loader -->
 <tbody v-if="isLoading" class="table-loader">
      <Loader color="text-primary" />
    </tbody>

        <!-- Table Body -->
        <tbody v-else class="shadow-inner">
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
                <i class="fa-solid fa-pen-to-square hover:text-primary transition-all duration-200"></i>
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


  <!-- Create User Modal -->
  <CreateUserModal v-if="showCreateModal" @close-modal="showCreateModal = false" :refreshUsers="refreshUsers" />

  <!-- Edit User Modal -->
  <EditUserModal v-if="showEditModal" @close-modal="showEditModal = false" :updateUser="updateUser" :selectedGuest="selectedGuest" />

  <!-- Delete User Modal -->
  <DeleteUserModal  v-if="showDeleteModal" @close-modal="showDeleteModal = false" :deleteUser="deleteUser" :selectedGuest="selectedGuest" />
</template>
