<script setup>
//*-------------------- Imports --------------------*//
import { onMounted, ref } from 'vue';
import { formatCurrency } from '@/lib/helpers';

// Components imports
import Loader from '@/components/shared/Loader.vue';
import EditActivityModal from '@/components/modals/EditActivityModal.vue';
import CreateActivityModal from '@/components/modals/CreateActivityModal.vue';
import DeleteActivityModal from '@/components/modals/DeleteActivityModal.vue';

// Layout imports
import DashboardLayout from '@/layouts/DashboardLayout.vue';

// Store imports
import { useToasterStore } from '@/stores/toaster';
import { useActivityStore } from '@/stores/activity';


//*-------------------- Stores --------------------*//
const toaster = useToasterStore();
const activityStore = useActivityStore();

//*-------------------- Variables --------------------*//
const activities = ref([]);
const selectedActivity = ref({});


//*-------------------- States --------------------*//
const isLoading = ref(true);
const showEditModal = ref(false);
const showCreateModal = ref(false);
const showDeleteModal = ref(false);


//*-------------------- Functions --------------------*//
// Fetch activities on component mount
onMounted(async () => {
  try {
    activities.value = await activityStore.getActivities();
  } catch (error) {
    console.error("Failed to load activities:", error);
  } finally {
    console.log(activities);
    isLoading.value = false;
  }
});

// Function to handle activity selection
function selectActivity(activity) {
  selectedActivity.value = activity;
}

// Function to refresh activitys
const refreshActivities = async () => {
  await activityStore.getActivities();
  activities.value = activityStore.activities;
}

const toggleStatus = async () => {
  await activityStore.toggleStatus(selectedActivity.value.id);
  refreshActivities();
  if (selectedActivity.value.status === 1) {
    toaster.showToast('success', 'Désactivation d\'activité', 'L\'activité n\'est plus disponible.');
  } else {
    toaster.showToast('success', 'Activation d\'activité', 'L\'activité est maintenant disponible!');
  }
}
</script>

<template>
  <DashboardLayout>
  <main class="w-full h-[calc(100vh-100px)] overflow-hidden p-3 text-black">
    <div class="w-full h-[60px] flex flex-col justify-between">
    <h1 class="text-2xl lg:text-3xl xl:text-4xl text-center font-semibold">Tableau d'activités</h1>

    <div class="flex justify-end mr-5 h-[30px] items-center px-4 -mt-4">
      <button @click="showCreateModal = true"
        class="text-neutral-900 hover:text-primary/80 transition-all duration-200">
        <i class="fa-solid fa-plus"></i>
        Ajouter une activité
      </button>
    </div>
  </div>

    <!-- Activities Table -->
    <div class="relative scrollable border-2 shadow-inner border-neutral-400">
      <table class="w-full text-center">
        <!-- Table Header -->
        <thead class="bg-neutral-400 text-sm" :class="showEditModal || showDeleteModal ? 'static z-0' : ''">
          <tr>
            <th class="p-4"></th>
            <th class="p-4">Nom de l'activité</th>
            <th class="p-4">Durée</th>
            <th class="p-4">Prix adulte</th>
            <th class="p-4">Prix enfant</th>
            <th class="p-4">Restriction d'age</th>
            <th class="p-4">Statut</th>
            <th class="p-4">Actions</th>
          </tr>
        </thead>

        <!-- Loader -->
        <tbody v-if="isLoading" class="table-loader">
          <Loader color="text-primary" />
        </tbody>

        <!-- Table Body -->
        <tbody v-else class="shadow-inner">
          <tr v-for="(activity, index) in activityStore.activities" :key="activity.id"
            :class="index % 2 === 0 ? 'bg-neutral-100' : ''">

            <!-- Image -->
            <td class="py-2 pl-4 pr-2 text-start "><img :src="activity.image" :alt="activity.name" class="w-10 h-10 rounded-full object-cover"></td>

            <!-- Name -->
            <td class="p-4 pr-2 text-start border-r-2 border-neutral-400">{{ activity.name }}</td>

            <!-- Duration -->
            <td class="p-4 border-r-2 border-neutral-400 min-w-[150px]">
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
            <td class="text-sm py-4 px-2 border-r-2 border-neutral-400">{{
              activity.status === 1
                ? "Disponible"
                : "Non disponible"
            }}</td>

            <!-- Actions -->
            <td class="p-4 flex items-center justify-center gap-4 w-full h-full">
              <div>
              <button v-tooltip.top="'Modifier le statut'" v-if="activity.status === 1" @click="selectActivity(activity); toggleStatus()">
                <i class="fa-solid fa-toggle-on text-primary transition-all duration-200"></i>
              </button>
              <button v-else @click="selectActivity(activity); toggleStatus()">
                <i class="fa-solid fa-toggle-off hover:text-primary transition-all duration-200"></i>
              </button>
              </div>
              <button v-tooltip.top="'Modifier l\'activité'" @click="selectActivity(activity); showEditModal = true">
                <i class="fa-solid fa-pen-to-square hover:text-primary transition-all duration-200"></i>
              </button>

              <button v-tooltip.top="'Supprimer l\'activité'" @click="selectActivity(activity); showDeleteModal = true">
                <i class="fa-regular fa-trash-can hover:text-red-500 transition-all duration-200"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</DashboardLayout>


  <!-- Create Activity Modal -->
  <CreateActivityModal v-if="showCreateModal" @close-modal="showCreateModal = false" @refreshActivities="refreshActivities" />

  <!-- Edit Activity Modal -->
  <EditActivityModal v-if="showEditModal" @close-modal="showEditModal = false" @refreshActivities="refreshActivities" :activityData="selectedActivity" />

  <!-- Delete Activity Modal -->
  <DeleteActivityModal  v-if="showDeleteModal" @close-modal="showDeleteModal = false" @refreshActivities="refreshActivities" :activityData="selectedActivity" />
</template>
