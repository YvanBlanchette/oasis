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
import { useUserStore } from '@/stores/user';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();

// Variable to hold the employes
const employes = ref([]);

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
    employes.value = userStore.employes;
  } catch (error) {
    console.error("Failed to load activities:", error);
  } finally {
    console.log(employes.value);
    isLoading.value = false;
  }
});
</script>

<template>
  <main class="w-full h-[calc(100vh-64px)] overflow-hidden p-6">
    <h1 class="text-5xl text-center font-semibold mb-6">Tableau des employés</h1>

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
            <th class="p-4">Rôle</th>
            <th class="p-4">Courriel</th>
            <th class="p-4">Téléphone</th>
            <th class="p-4">Dernière visite</th>
            <th class="p-4">Actions</th>
          </tr>
        </thead>

        <tbody class="shadow-inner text-center">
          <tr v-for="(employe, index) in employes" :key="employe._id" :class="index % 2 === 0 ? 'bg-neutral-100' : ''">
            <!-- Image -->
            <td class="px-4 py-2">
              <img class="w-10 h-10 object-cover rounded-full" :src="employe.image" :alt="employe.name" />
            </td>
  
            <!-- Name -->
            <td class="p-4">{{ employe.name }}</td>

            <!-- Role -->
            <td class="p-4 text-sm">
              <span v-if="employe.role === 'admin'" class="flex items-center justify-center gap-2">
                <i class="fa-solid fa-user-tie text-lg"></i>
                Gérant
              </span>
              <span v-if="employe.role === 'staff'" class="flex items-center justify-center gap-2">
                <i class="fa-solid fa-user text-lg"></i>
                Employé
              </span>
            </td>

            <!-- Email -->
            <td class="p-4">{{ employe.email }}</td>

            <!-- Phone -->
            <td class="p-4">{{ employe.phone }}</td>

            <!-- Hiring date -->
            <td class="p-4">{{ employe.updated_at.slice(0, 10) }}</td>

            <!-- Actions -->
            <td class="p-4 flex items-center justify-center gap-4">
              <button @click="showEditModal = true">
                <i class="fa-solid fa-pen-to-square hover:text-[#F4C887] transition-all duration-200"></i>
              </button>
              <button @click="showDeleteModal = true">
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
