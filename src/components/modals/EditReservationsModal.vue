<script setup>
import Modal from '@/components/shared/Modal.vue';
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref } from 'vue';

import DatePicker from '@/components/form/DatePicker.vue';
import TimePicker from '@/components/form/TimePicker.vue';
import { useActivityStore } from '@/stores/activity';

const userStore = useUserStore();
const activityStore = useActivityStore();

const users = ref([]);
const activities = ref([]);

defineEmits(['close-modal']);

const props = defineProps({
  selectedItem: Object,
  updateReservation: Function
});

const isLoading = ref(true);

onMounted(async () => {
  users.value = await userStore.getUsers();
  activities.value = await activityStore.getActivities();
  isLoading.value = false
})



</script>

<template>
  <Modal>
    <div class="min-h-[400px] w-full flex flex-col justify-between">
    <!-- Close button -->
    <button @click="$emit('close-modal')"
      class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-400/80">
      <i class="fa-solid fa-xmark text-xl text-neutral-100"></i>
    </button>
    <div class="w-full h-full flex flex-col items-center justify-center">
      <!-- Modal Title -->
      <h1 class="text-5xl text-neutral-100 text-center mb-6">Modifier une réservation</h1>

      <div v-if="isLoading" class="table-loader">
        <Loader color="text-primary" />
      </div>
      <!-- Form -->
      <form v-else @submit.prevent="updateReservation(selectedItem.id)" class="flex flex-col w-full">
        <div class="flex flex-col gap-8 w-full justify-center">
          <div class="w-full">

            <div class="w-full flex justify-between items-center gap-10 mb-4">
            <!-- Date Input -->
            <div class="flex flex-col">
              <label for="reservation_date" class="text-neutral-100 text-lg mb-1">Date</label>
              <DatePicker required="true" id="reservation_date" :inputValue="selectedItem.reservation_date" />
            </div>

            <!-- Time Input -->
            <div class="flex flex-col">
              <label for="reservation_time" class="text-neutral-100 text-lg mb-1">Heure</label>
              <TimePicker required="true" id="reservation_time" :inputValue="selectedItem.reservation_time" />
            </div>

            <!-- Participants Input -->
            <div class="flex flex-col">
              <label for="nb_participants" class="text-neutral-100  text-lg mb-1">Participants</label>
              <NumberInput required="true" id="nb_participants" :modelValue="selectedItem.nb_participants" />
            </div>
            </div>

            <!-- User selector -->
            <div class="flex flex-col mb-4">
              <label for="user" class="text-neutral-100 text-lg mb-1">Client(e)</label>
              <select name="user" id="user" class="bg-neutral-900/30 text-neutral-100 px-4 py-1 rounded-md h-[40px]">
                <option v-for="user in userStore.users" :key="user.id" value="user"
                  :selected="user.id === selectedItem.user.id">{{ user.name }}</option>
              </select>
            </div>

            <!-- Activity selector -->
            <div class="flex flex-col">
              <label for="activity" class="text-neutral-100 text-lg mb-1">Activité</label>
              <select name="category" id="category" class="bg-neutral-900/30 text-neutral-100 px-4 py-1 rounded-md h-[40px]">
                <option v-for="activity in activityStore.activities" :key="activity.name" :selected="activity === selectedItem.activity">
                  {{ activity.name }}
                </option>
              </select>
            </div>

          </div>

          <div>

          </div>
        </div>
        <!-- Buttons -->
        <div class="flex justify-end items-center gap-4 text-neutral-100">
          <button type="button" @click="$emit('close-modal')"
            class="hover:text-primary px-4 py-1 rounded-md transition-all duration-200">
            Annuler
          </button>
          <input type="submit" value="Mettre à jour"
            class="cursor-pointer bg-red-500 hover:bg-red-700 px-4 py-1 rounded-md shadow text-neutral-100 transition-all duration-200">
        </div>
      </form>
    </div>
  </div>
  </Modal>
</template>
