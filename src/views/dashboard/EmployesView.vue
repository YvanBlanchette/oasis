<script setup>
//*-------------------- Imports --------------------*//
import { onMounted, ref } from 'vue';

// Component imports
import Loader from '@/components/shared/Loader.vue';
import CreateStaffModal from '@/components/modals/CreateStaffModal.vue';
import EditStaffModal from '@/components/modals/EditStaffModal.vue';
import DeleteStaffModal from '@/components/modals/DeleteStaffModal.vue';

// Layout imports
import DashboardLayout from '@/layouts/DashboardLayout.vue';

// Stores imports
import { useStaffStore } from '@/stores/staff';
import { useToasterStore } from '@/stores/toaster';


//*-------------------- Stores --------------------*//
const staffStore = useStaffStore();
const toaster = useToasterStore();

//*-------------------- Variables --------------------*//
const staff = ref([]);
const selectedUser = ref({});


//*-------------------- States --------------------*//
const isLoading = ref(true);
const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
const showCreateModal = ref(false);
const showEditModal = ref(false);
const showDeleteModal = ref(false);


//*-------------------- Functions --------------------*//
// Fetch activities on component mount
onMounted(async () => {
  try {
    isLoading.value = true;
    await staffStore.getStaff();
    staff.value = staffStore.staff;
  } catch (error) {
    console.error("Failed to load activities:", error);
  } finally {
    isLoading.value = false;
  }
});

// Function to handle user selection
function selectUser(user) {
  selectedUser.value = user;
}

// Function to refresh users
const refreshUsers = async () => {
  await staffStore.getStaff();
  staff.value = staffStore.staff;
}

const toggleStatus = async () => {
  await staffStore.toggleStatus(selectedUser.value.id);
  refreshUsers();
  if (selectedUser.value.status === 'active') {
    toaster.showToast('success', 'Activation d\'un employé', 'L\'employé est maintenant disponible!');
  } else {
    toaster.showToast('success', 'Désactivation d\'un employé', 'L\'employé n\'est plus disponible.');
  }
}
</script>

<template>
  <DashboardLayout>
    <main class="w-full h-[calc(100vh-100px)] overflow-hidden p-3 text-black">
      <div class="w-full h-[60px] flex flex-col justify-between">
        <!-- Title -->
        <h1 class="text-3xl xl:text-4xl text-center font-semibold">Tableau des employés</h1>

        <!-- Add staff member button -->
        <div class="flex justify-end h-[30px] lg:mr-5 items-center px-4 -mt-4">
          <button @click="showCreateModal = true" class="text-black hover:text-primary/80 transition-all duration-200">
            <i v-tooltip.left="'Ajouter un employé'" class="fa-solid fa-user-plus"></i>
            <span class="hidden lg:inline">Ajouter un employé</span>
          </button>
        </div>
      </div>

      <!-- Staff members Table -->
      <div class="relative scrollable border-2 shadow-inner border-neutral-400">
        <table class="w-full text-center">
          <!-- Table Header -->
          <thead class="bg-neutral-400 text-sm" :class="showEditModal || showDeleteModal ? 'static z-0' : ''">
            <tr>
              <th class="p-4"></th>
              <th class="p-4">Nom</th>
              <th class="p-4">Rôle</th>
              <th class="p-4 hidden lg:table-cell">Courriel</th>
              <th class="p-4 hidden lg:table-cell">Téléphone</th>
              <th class="p-4 hidden lg:table-cell">Date d'embauche</th>
              <th class="p-4 hidden lg:table-cell">Status</th>
              <th class="p-4">Actions</th>
            </tr>
          </thead>

          <!-- Loader -->
          <tbody v-if="isLoading" class="table-loader">
            <Loader color="text-primary" />
          </tbody>

          <!-- Table Body -->
          <tbody v-else class="shadow-inner">
            <tr v-for="(user, index) in staff" :key="user._id" :class="index % 2 === 0 ? 'bg-neutral-100' : 'bg-white'">
              <td class="px-4 py-2">
                <img class="w-10 h-10 object-cover rounded-full" :src="user.photoURL" :alt="user.displayName" />
              </td>
              <td class="p-4 text-sm lg:text-base">{{ user.displayName }}</td>
              <td class="p-4">
                <i v-tooltip.top="'Admin'" v-if="user.role === 'admin'" class="fa-solid fa-user-tie"></i>
                <i v-tooltip.top="'Employé'" v-else class="fa-solid fa-user"></i>
                <span class="hidden lg:inline">{{ user.role === 'admin' ? 'Administrateur' : 'Employé' }}</span>
              </td>
              <td class="p-4 hidden lg:table-cell">{{ user.email }}</td>
              <td class="p-4 hidden lg:table-cell">{{ user.phone }}</td>
              <td class="p-4 hidden lg:table-cell">{{ user.hireDate.slice(0, 10) }}</td>
              <td class="p-4 hidden lg:table-cell">{{ user.status === 'active' ? 'Actif' : 'Inactif' }}</td>
              <td class="p-4 flex items-center justify-center gap-4">
                <button v-tooltip.left="'Modifier'" @click="selectUser(user); showEditModal = true">
                  <i class="fa-solid fa-pen-to-square hover:text-primary transition-all duration-200"></i>
                </button>
                <button v-tooltip.left="'Supprimer'" @click="selectUser(user); showDeleteModal = true">
                  <i class="fa-regular fa-trash-can hover:text-red-500 transition-all duration-200"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </DashboardLayout>

  <!-- Create Staff Modal -->
  <CreateStaffModal v-if="showCreateModal" @close-modal="showCreateModal = false" @refreshUsers="refreshUsers" />

  <!-- Edit Staff Modal -->
  <EditStaffModal v-if="showEditModal" @close-modal="showEditModal = false" @refreshUsers="refreshUsers"
    :userData="selectedUser" />

  <!-- Delete Staff Modal -->
  <DeleteStaffModal v-if="showDeleteModal" @close-modal="showDeleteModal = false" @refreshUsers="refreshUsers"
    :userData="selectedUser" />
</template>
