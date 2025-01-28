<script setup>
//*-------------------- Imports --------------------*//
import { reactive, toRefs } from "vue";

// Components imports
import Modal from "@/components/shared/Modal.vue";
import TextArea from "@/components/form/TextArea.vue";
import Input from "@/components/form/Input.vue";
import NumberInput from "@/components/form/NumberInput.vue";

// Stores imports
import { useToasterStore } from "@/stores/toaster";
import { useActivityStore } from "@/stores/activity";


//*-------------------- Stores --------------------*//
const activityStore = useActivityStore();
const toaster = useToasterStore();


//*-------------------- Variables --------------------*//
const emit = defineEmits(["close-modal", "refreshActivities"]);

const props = defineProps({
  activityData: Object,
});

const { activityData } = toRefs(props);


//*-------------------- Functions --------------------*//
const formData = reactive({
  name: activityData.value.name,
  description: activityData.value.description,
  image: activityData.value.image,
  pricePerAdult: activityData.value.pricePerAdult,
  pricePerChildren: activityData.value.pricePerChildren,
  durationInMinutes: activityData.value.durationInMinutes,
  ageRestriction: activityData.value.ageRestriction,
  isIncluded: activityData.value.isIncluded,
  status: activityData.value.status,
  notes: activityData.value.notes,
});

// Function to update activity
const updateActivity = async (activity_id) => {
  if (formData) {
    const response = await activityStore.updateActivity(activity_id, { ...formData });

    if (!response.errors)
      toaster.showToast("success", 'Modification d\'Activité', response.message);
      console.log({ ...formData });
    } else {
      toaster.showToast("error", 'Modification d\'Activité', response.errors[0].message);
    }

    emit("refreshActivities");
    emit("close-modal");
};
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
      <h1 class="text-5xl text-center font-semibold mb-6">Modifier une activité</h1>
      <!-- Form -->
      <form @submit.prevent="updateActivity(activityData.id)" class="flex flex-col w-full">
        <div class="flex gap-8 w-full justify-between">
          <div class="flex flex-col gap-2 justify-between w-full h-full">
            <!-- Name Input -->
            <Input type="text" label="Nom" v-model="formData.name" className="text-neutral-900 w-full" />

            <!-- Description -->
            <TextArea label="Description" v-model="formData.description" className="text-neutral-900 w-full" />
          </div>

          <!-- Image Input -->
          <div>
            <div class="relative border border-primary w-[145px] h-[145px] rounded-md mt-3">
              <label for="image"
                class="flex justify-center items-center w-full h-full cursor-pointer overflow-hidden shadow-inner">
                <img v-if="activityData.image" :src="activityData.image" alt="image"
                  class="w-[165px] h-[165px] rounded-md object-cover" />
                <i v-else class="fa-solid fa-arrow-up-from-bracket text-6xl text-neutral-300/60"></i>
              </label>
              <input type="file" id="image" class="hidden" />
              <button v-if="activityData.image" @click="activityData.image = ''"
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
          <Input v-model="formData.ageRestriction" label="Restriction d'age" className="text-neutral-900 w-full" />
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
          <input type="submit" value="Mettre à jour"
            class="cursor-pointer bg-primary hover:bg-primary-dark px-4 py-1 rounded-md shadow text-neutral-100 font-medium transition-all duration-200" />
        </div>
      </form>
    </div>
  </Modal>
</template>
