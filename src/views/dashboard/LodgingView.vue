<style scoped>
thead {
  position: relative;
}

div.scrollable {
  overflow-y: auto;
  overflow-x: hidden;
  width: 95%;
  margin: 0 auto;
  height: 67vh;
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
import { capitalize, formatCurrency } from '@/lib/helpers';
import { useLodgingStore } from '@/stores/lodging';
import { computed, onMounted, ref, watch } from 'vue';

// Store
const lodgingStore = useLodgingStore();


// Variable to hold the lodgings
const lodgings = ref([]);

// Select options
const options = [
  { name: "Toutes les hébergements", value: 'lodgings' },
  { name: "Chambres en auberge", value: 'rooms' },
  { name: "Condos", value: 'condos' },
  { name: "Chalets", value: 'cabins' },
];

// Variable to define the selected lodging option
const selectedOption = ref('lodgings');

// Loading State
const isLoading = ref(true);

// Edit Modal State
const showEditModal = ref(false);

// Delete Modal State
const showDeleteModal = ref(false);

// Fetch lodgings on component mount
onMounted(async () => {
  try {
    isLoading.value = true;
    lodgings.value = await lodgingStore.getLodgings();
  } catch (error) {
    console.error("Failed to load lodgings:", error);
  } finally {
    isLoading.value = false;
  }
});
// Reactive lodgings map
const lodgingsMap = computed(() => ({
  lodgings: lodgingStore.lodgings,
  rooms: lodgingStore.rooms,
  condos: lodgingStore.condos,
  cabins: lodgingStore.cabins,
}));
// Filtered lodgings based on selected option
const filteredLodgings = computed(() => lodgingsMap.value[selectedOption.value] || []);
// Watch for changes in selectedLodgings or lodgingsMap
watch(
  [selectedOption, lodgingsMap],
  ([newValue]) => {
    lodgings.value = lodgingsMap.value[newValue] || [];
  },
  { immediate: true }
);
</script>

<template>
  <main class="w-full h-[calc(100vh-64px)] overflow-hidden p-6">
    <h1 class="text-5xl text-center font-semibold mb-6">Tableau d'hébergements</h1>

    <!-- Sélecteur d'options -->
    <div class="flex justify-center mb-6">
      <select v-model="selectedOption" class="bg-neutral-100 py-2 px-4 rounded-md">
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
      </select>
    </div>

    <!-- Tableau d'hébergements -->
    <div class="relative scrollable border-2 shadow-inner border-neutral-400">
      <table class="w-full text-center">

        <thead class="bg-neutral-400 text-sm" :class="showEditModal || showDeleteModal ? 'static z-0' : ''">
          <tr>
            <th class="p-4">Numéro de l'hébergement</th>
            <th class="p-4">Catégorie</th>
            <th v-if="selectedOption === 'rooms' || selectedOption === 'lodgings'" class="p-4">Bâtiment</th>
            <th class="p-4">Capacité</th>
            <th class="p-4">Prix</th>
            <th class="p-4">Actions</th>
          </tr>
        </thead>

        <!-- Loader -->
        <tbody v-if="isLoading" class="table-loader">
          <Loader color="text-primary" />
        </tbody>

        <tbody v-else class="shadow-inner">
          <tr v-for="(lodging, index) in filteredLodgings" :key="lodging.id"
            :class="index % 2 === 0 ? 'bg-neutral-100' : ''">
            <!-- Numéro de l'hébergement -->
            <td class="p-4 text-start border-r-2 border-neutral-400">
              {{ lodging.category === 'auberge' ? 'Chambre' : lodging.category === 'condo' ? 'Condo' : 'Chalet' }}
              {{ lodging.room_number }}
            </td>

            <!-- Catégorie -->
            <td class="p-4 border-r-2 border-neutral-400">{{ lodging.category === 'auberge' ? 'Chambre' :
              lodging.category === 'condo' ? 'Condo' : 'Chalet' }}</td>

            <!-- Bâtiment -->
            <td v-if="selectedOption === 'rooms' || selectedOption === 'lodgings'"
              class="p-4 border-r-2 border-neutral-400">
              {{ lodging.building }}
            </td>

            <!-- Capacité -->
            <td class="p-4 border-r-2 border-neutral-400">
              {{ lodging.capacity }}
            </td>

            <!-- Prix -->
            <td class="p-4 border-r-2 border-neutral-400">
              {{ formatCurrency(lodging.price) }}$
            </td>

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

    <h1 class="text-4xl text-center font-semibold mb-6">Modifier une une activité</h1>
  </Modal>
  <Modal v-if="showDeleteModal">
    <button @click="showDeleteModal = false"
      class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-200/80">
      <i class="fa-solid fa-xmark text-xl"></i>
    </button>
    <h1 class="text-4xl text-center font-semibold mb-6">Supprimer une activité</h1>
  </Modal>
</template>
