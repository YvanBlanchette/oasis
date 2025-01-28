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


//*-------------------- Stores --------------------*//
const staffStore = useStaffStore();


//*-------------------- Variables --------------------*//
const staff = ref([]);
const selectedUser = ref({});


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
    await staffStore.getStaff();
    staff.value = staffStore.staff;
  } catch (error) {
    console.error("Failed to load activities:", error);
  } finally {
    console.log(staff.value);
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
  if (selectedUser.value.status === 1) {
    toaster.showToast('success', 'Désactivation d\'un employé', 'L\'employé n\'est plus disponible.');
  } else {
    toaster.showToast('success', 'Activation d\'un employé', 'L\'emp^loyé est maintenant disponible!');
  }
}
</script>

<template>
  <DashboardLayout>
  <main class="w-full h-[calc(100vh-100px)] overflow-hidden p-3 text-black">
    <div class="w-full h-[60px] flex flex-col justify-between">
    <!-- Title -->
    <h1 class="text-2xl lg:text-3xl xl:text-4xl text-center font-semibold">Tableau des employés</h1>

    <!-- Add staff member button -->
    <div class="flex justify-end h-[30px] mr-5 items-center px-4 -mt-4">
      <button @click="showCreateModal = true"
        class="text-neutral-900 hover:text-primary/80 transition-all duration-200">
        <i class="fa-solid fa-user-plus"></i>
        Ajouter un employé
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
            <th class="p-4">Courriel</th>
            <th class="p-4">Téléphone</th>
            <th class="p-4">Date d'embauche</th>
            <th class="p-4">Status</th>
            <th class="p-4">Actions</th>
          </tr>
        </thead>

        <!-- Loader -->
        <tbody v-if="isLoading" class="table-loader">
          <Loader color="text-primary" />
        </tbody>

        <!-- Table Body -->
        <tbody v-else class="shadow-inner">
          <tr v-for="(user, index) in staff" :key="user._id" :class="index % 2 === 0 ? 'bg-neutral-100' : ''">
            <td class="px-4 py-2">
              <img class="w-10 h-10 object-cover rounded-full" :src="user.photoURL" :alt="user.displayName" />
            </td>
            <td class="p-4">{{ user.displayName }}</td>
            <td class="p-4">{{ user.role === 'admin' ? 'Administrateur' : 'Employé' }}</td>
            <td class="p-4">{{ user.email }}</td>
            <td class="p-4">{{ user.phone }}</td>
            <td class="p-4">{{ user.hireDate.slice(0, 10) }}</td>
            <td class="p-4">{{ user.status === 'active' ? 'Actif' : 'Inactif' }}</td>
            <td class="p-4 flex items-center justify-center gap-4">
              <div>
              <button v-tooltip.top="'Modifier le statut'" v-if="user.status === 'active'" @click="selectUser(user); toggleStatus()">
                <i class="fa-solid fa-toggle-on text-primary transition-all duration-200"></i>
              </button>
              <button v-else @click="selectUser(user); toggleStatus()">
                <i class="fa-solid fa-toggle-off hover:text-primary transition-all duration-200"></i>
              </button>
              </div>
              <button @click="selectUser(user); showEditModal = true">
                <i class="fa-solid fa-pen-to-square hover:text-primary transition-all duration-200"></i>
              </button>
              <button @click="selectUser(user); showDeleteModal = true">
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
  <EditStaffModal v-if="showEditModal" @close-modal="showEditModal = false" @refreshUsers="refreshUsers" :userData="selectedUser" />

  <!-- Delete Staff Modal -->
  <DeleteStaffModal  v-if="showDeleteModal" @close-modal="showDeleteModal = false" @refreshUsers="refreshUsers" :userData="selectedUser" />
</template>
