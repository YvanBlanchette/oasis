<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useActivityStore } from '@/stores/activity';
import Loader from './Loader.vue';

// Store
const activityStore = useActivityStore();

// Loading state
const isLoading = ref(true);

// Open State
const isOpen = ref(false);

//  Select options
const options = [
  { name: "Toutes les activités", value: 'all' },
  { name: "Activités estivales", value: 'summer' },
  { name: "Activités hivernales", value: 'winter' },
];

// variable for to define the selected activities
const selectedActivities = ref('all');

// variable to hold the activities
const activities = ref([]);

// Property to limit activities based on isOpen state
const limitedActivities = computed(() => {
  if (!isOpen.value) {
    return activities.value.slice(0, 8);
  }
  return activities.value;
});

// Reactive activities map
const activitiesMap = computed(() => ({
  winter: activityStore.winterActivities,
  summer: activityStore.summerActivities,
  all: activityStore.activities,
}));

// Fetch activities
onMounted(async () => {
  try {
    isLoading.value = true;
    await activityStore.getActivities();
    activities.value = activitiesMap.value[selectedActivities.value];
  } catch (error) {
    console.error("Failed to load activities:", error);
  } finally {
    isLoading.value = false;
  }
});

// Watch for changes in selectedActivities or activitiesMap
watch(
  [selectedActivities, activitiesMap],
  ([newValue]) => {
    activities.value = activitiesMap.value[newValue] || [];
  },
  { immediate: true }
);
</script>

<template>
  <section id="activities" class="bg-white text-black w-full h-full min-h-[500px]">
    <div class="w-[90%] max-w-7xl mx-auto h-full py-12 text-center">
      <h2 class="text-2xl uppercase text-center tracking-wide pb-2">Quoi faire durant votre séjour</h2>
      <h1 class="text-4xl uppercase text-center font-bold tracking-wide pb-8">Vivez pleinement l'expérience de l'Oasis Beach Club</h1>
      <p class="text-center text-lg">Ensoleillez votre journée avec des activités passionnantes. Notre équipe d'animation vous offre une programmation estivale qui vous fera découvrir les plaisirs de la plage. Vous avez du temps libre ? Réservez votre place parmi nos activités nautiques, sportives ou de détente offertes tout au long de la journée.
      </p>
      
      <img src="@/assets/images/bar--white.svg" class="mx-auto mt-12 mb-2 w-52">

      <div class="flex justify-end">
        <select v-model="selectedActivities" class="w-full md:w-56 bg-neutral-100 text-neutral-900 px-2 py-1">
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.name }}
          </option>
        </select>
      </div>

      <div v-if="isLoading" class="w-full h-full flex items-center justify-center">
        <Loader />
      </div>

      <div v-else-if="activities.length === 0" class="text-center py-8">
        <h2>Aucunes activitées disponible pour le moment.</h2>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6">
        <RouterLink
          v-for="activity in limitedActivities"
          :key="activity.name"
          :to="{ name: 'activity', params: { id: activity.id } }"
          class="my-8 bg-neutral-100 text-neutral-900 group shadow"
        >
          <div class="overflow-hidden">
            <img :src="activity.image" :alt="activity.name" class="h-72 object-bottom w-full object-cover group-hover:scale-105 transition-all duration-300">
          </div>
          <p class="py-1 text-center font-medium">{{ activity.name }}</p>
        </RouterLink>
      </div>

      <div v-if="activities.length > 8">
        <button class="px-4 py-1 bg-neutral-100 text-neutral-900 font-semibold mt-8" @click="isOpen = !isOpen">
          <span v-if="!isOpen" class="flex items-center gap-2">
            <i class="fa-solid fa-plus"></i>
            Voir plus d'activités
          </span>
          <span v-else class="flex items-center gap-2">
            <i class="fa-solid fa-minus"></i>
            Voir moins d'activités
          </span>
        </button>
      </div>
    </div>
  </section>
</template>
