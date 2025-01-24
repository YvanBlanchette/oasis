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
import { formatCurrency } from '@/lib/helpers';
import { useActivityStore } from '@/stores/activity';
import { onMounted, ref } from 'vue';

const activityStore = useActivityStore();

// Variable to hold the activities
const activities = ref([]);

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
    activities.value = await activityStore.getActivities();
  } catch (error) {
    console.error("Failed to load activities:", error);
  } finally {
    console.log(activities);
    isLoading.value = false;
  }
});
</script>

<template>
  <main class="w-full h-[calc(100vh-64px)] overflow-hidden p-6">
    <h1 class="text-5xl text-center font-semibold mb-6">Tableau d'activités</h1>


    <!-- Activities Table -->
    <div class="relative scrollable border-2 shadow-inner border-neutral-400">
      <table class="w-full text-center">
        <!-- Table Header -->
        <thead class="bg-neutral-400 text-sm" :class="showEditModal || showDeleteModal ? 'static z-0' : ''">
          <tr>
            <th class="p-4">Nom de l'activité</th>
            <th class="p-4">Description</th>
            <th class="p-4">Durée</th>
            <th class="p-4">Prix adulte</th>
            <th class="p-4">Prix enfant</th>
            <th class="p-4">Restriction d'age</th>
            <th class="p-4">Statut</th>
            <th class="p-4">Actions</th>
          </tr>
        </thead>

        <!-- Loader -->
        <div v-if="isLoading" class="table-loader">
          <Loader color="text-primary" />
        </div>

        <!-- Table Body -->
        <tbody v-else class="shadow-inner">
          <tr v-for="(activity, index) in activityStore.activities" :key="activity.id"
            :class="index % 2 === 0 ? 'bg-neutral-100' : ''">

            <!-- Name -->
            <td class="p-4 text-start border-r-2 border-neutral-400">{{ activity.name }}</td>

            <!-- Description -->
            <td class="p-4 truncate max-w-[220px] border-r-2 border-neutral-400">{{ activity.description }}</td>

            <!-- Duration -->
            <td class="p-4 border-r-2 border-neutral-400">
              <span v-if="activity.durationInMinutes === 0"> --- </span>
              <span v-else>{{ activity.durationInMinutes }} minutes</span>
            </td>
            <!-- Price Adult -->
            <td class="p-4 border-r-2 border-neutral-400">
              <span v-if="activity.pricePerAdult === 0"> Gratuit </span>
              <span v-else>{{ formatCurrency(activity.pricePerAdult) }}$</span>
            </td>

            <!-- Price Children -->
            <td class="p-4 border-r-2 border-neutral-400">
              <span v-if="activity.pricePerChildren === 0"> Gratuit </span>
              <span v-else>{{ formatCurrency(activity.pricePerChildren) }}$</span>
            </td>

            <!-- Age Restriction -->
            <td class="p-4 border-r-2 border-neutral-400">{{ activity.ageRestriction }}</td>

            <!-- Status -->
            <td class="p-4 border-r-2 border-neutral-400">{{
              activity.status === 1
                ? "Disponible"
                : "Non disponible"
            }}</td>

            <!-- Actions -->
            <td class="p-4 flex items-center justify-center gap-4">
              <button @click="showEditModal = true">
                <i class="fa-solid fa-pen-to-square hover:text-primary transition-all duration-200"></i>
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
