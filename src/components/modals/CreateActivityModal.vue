<style scoped>
/* Styles the calendar picker icon */
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
  color: black;
}
</style>

<script setup>
//*-------------------- Imports --------------------*//
import { reactive, toRefs } from 'vue';

// Components imports
import Modal from '@/components/shared/Modal.vue';
import Toast from '@/components/shared/Toast.vue';

// Stores imports
import { useActivityStore } from '@/stores/activity';
import { useToasterStore } from '@/stores/toaster';


//*-------------------- Stores --------------------*//
const activityStore = useActivityStore();
const toaster = useToasterStore();


//*-------------------- Variables --------------------*//
const emit = defineEmits(["close-modal", "refreshActivities"]);

const formData = reactive({
  name: '',
  description: '',
  image: 'https://fastly.picsum.photos/id/9/300/320.jpg?hmac=fs1jQpUfd13tmLFFquK6gtcX0LacbOmAU0TgmEAgN3Y',
  status: 0,
  pricePerAdult: 0,
  pricePerChildren: 0,
  durationInMinutes: 0,
  ageRestriction: '',
  isIncluded: 1,
  notes: '',
});


// Function to create a new activity
const createActivity = async () => {
  const response = await activityStore.createActivity({ ...formData });

  if (!response.errors) {
    toaster.showToast("success", 'Ajout d\'Activité', response.message);
    console.log({ ...formData });
  } else {
    toaster.showToast("error", 'Ajout d\'Activité', response.errors[0].message);
  }
}
</script>

<template>
 <Modal>
    <!-- Close button -->
    <button type="button" @click="$emit('close-modal')"
      class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-200/80 text-black">
      <i class="fa-solid fa-xmark text-xl"></i>
    </button>
    <div class="w-full h-full flex flex-col items-center justify-center text-black">
      <!-- Modal Title -->
      <h1 class="text-5xl text-center font-semibold mb-6">Ajouter une activité</h1>
      <!-- Form -->
      <form @submit.prevent="createActivity()" class="flex flex-col w-full">
        <div class="flex gap-8 w-full justify-between">
          <div class="flex flex-col gap-2 justify-between w-full h-full">
            <!-- Name Input -->
            <Input placeholder="Inscrire le nom de l'activité" type="text" label="Nom" v-model="formData.name" className="text-neutral-900 w-full" />

            <!-- Description -->
            <TextArea placeholder="Inscrire la description de l'activité" label="Description" v-model="formData.description" className="text-neutral-900 w-full" />
          </div>

          <!-- Image Input -->
          <div>
            <div class="relative border border-primary w-[145px] h-[145px] rounded-md mt-3">
              <label for="image"
                class="flex justify-center items-center w-full h-full cursor-pointer overflow-hidden shadow-inner">
                <img v-if="formData.image" :src="formData.image" alt="image"
                  class="w-[165px] h-[165px] rounded-md object-cover" />
                <i v-else class="fa-solid fa-arrow-up-from-bracket text-6xl text-neutral-300/60"></i>
              </label>
              <input type="file" id="image" class="hidden" />
              <button v-if="formData.image" @click="activityData.image = ''"
                class="absolute top-2 right-2 w-5 h-5 flex items-center justify-center transition-all duration-200 rounded-md bg-red-500 hover:bg-red-600">
                <i class="fa-solid fa-xmark text-neutral-100"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="mt-3 w-full flex gap-8 justify-between">
          <div class="flex flex-col gap-1">
            <label for="pricePerAdult" class="text-black">Prix par adulte (CAD)</label>
            <NumberInput id="pricePerAdult" label="Prix adulte" v-model="formData.pricePerAdult" className="text-neutral-900 w-full"/>
          </div>

          <div class="flex flex-col gap-1">
            <label for="pricePerChildren" class="text-black">Prix par enfant (CAD)</label>
          <NumberInput id="pricePerChildren" label="Prix adulte" v-model="formData.pricePerChildren" className="text-neutral-900 w-full"/>
          </div>

          <div class="flex flex-col gap-1">
            <label for="durationInMinutes" class="text-black">Durée en minutes</label>
            <NumberInput id="durationInMinutes" label="Durée" v-model="formData.durationInMinutes" className="text-neutral-900 w-full" />
          </div>
        </div>

        <div class="mt-3 w-full">
          <Input placeholder="Inscrire les restrictions d'age" v-model="formData.ageRestriction" label="Restriction d'age" className="text-neutral-900 w-full" />
        </div>

        <div class="mt-3 w-full flex gap-8 justify-between">
          <div class="flex flex-col w-full">
            <!-- Included Select -->
            <label for="isIncluded" class="text-black">Inclus</label>
            <select name="isIncluded" id="isIncluded"
              class="bg-white text-black px-4 py-1 rounded-md h-[40px] border border-primary w-full"
              v-model="formData.isIncluded">
              <option value="1">Oui</option>
              <option value="0">Non</option>
            </select>
          </div>

        <div class="flex flex-col w-full">
          <!-- Status Select -->
          <label for="role" class="text-black">Status</label>
          <select name="role" id="role"
            class="bg-white text-black px-4 py-1 rounded-md h-[40px] w-full border border-primary"
            v-model="formData.status">
            <option value="1">Actif</option>
            <option value="0">Inactif</option>
          </select>
        </div>
        </div>

        <div class="w-full mt-2">
          <!-- Notes -->
          <TextArea placeholder="Inscrire les notes concernant l'activité" label="Notes" rows="1" v-model="formData.notes" className="text-neutral-900 w-full" />
        </div>

        <!-- Buttons -->
        <div class="flex justify-end items-center gap-4 mt-6">
          <button type="button" @click="$emit('close-modal')"
            class="hover:bg-neutral-200/80 px-4 py-1 rounded-md hover:shadow font-medium transition-all duration-200">
            Annuler
          </button>
          <input type="submit" value="Ajouter"
            class="cursor-pointer bg-primary hover:bg-primary-dark px-4 py-1 rounded-md shadow text-neutral-100 font-medium transition-all duration-200" />
        </div>
      </form>
    </div>
  </Modal>
  <Toast ref="toast" />
</template>
