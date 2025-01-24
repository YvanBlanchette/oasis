<script setup>
import Modal from '@/components/Modal.vue';
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref } from 'vue';
import Input from '../form/Input.vue';
import { useLodgingStore } from '@/stores/lodging';

const userStore = useUserStore();
const lodgingStore = useLodgingStore();


const props = defineProps({
  selectedItem: Object,
  updateReservation: Function
});

const isLoading = ref(true);
onMounted(() => {
  try {
    userStore.getUsers();
    lodgingStore.getLodgings();
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
    console.log(lodgingStore.lodgings);
    console.log(props.selectedItem);
  }
})

const categories = ["Chambre en auberge", "Condo", "Chalet"];

</script>

<template>
  <Modal>
    <!-- Close button -->
    <button @click="$emit('close-modal')"
      class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-400/80">
      <i class="fa-solid fa-xmark text-xl text-neutral-100"></i>
    </button>
    <div class="w-full h-full flex flex-col items-center justify-center">
      <!-- Modal Title -->
      <h1 class="text-5xl text-neutral-100 text-center font-semibold mb-6">Modifier une réservation</h1>

      <div v-if="isLoading" class="table-loader">
        <Loader color="text-primary" />
      </div>
      <!-- Form -->
      <form v-else @submit.prevent="updateReservation(selectedItem.id)" class="flex flex-col ">
        <div class="flex gap-8 w-full justify-center">
          <div>

            <!-- Name Input -->
            <div class="flex flex-col">
              <label for="user" class="text-neutral-100 font-medium text-xl">Client(e)</label>
              <select name="user" id="user" class="px-4 py-1 rounded-md">
                <option v-for="user in userStore.guests" :key="user.id" value="user"
                  :selected="user.id === selectedItem.user.id">{{ user.name }}</option>
              </select>
            </div>

            <!-- Lodging category -->
            <div class="flex flex-col">
              <label for="user" class="text-neutral-100 font-medium text-xl">Catégorie</label>
              <select name="category" id="category" class="px-4 py-1 rounded-md">
                <option v-for="category in categories" :key="category.name" :selected="category === selectedItem.category">
                  {{ category }}
                </option>
              </select>
            </div>

            <!-- Room number -->
            <div class="flex flex-col">
              <label for="user" class="text-neutral-100 font-medium text-xl">Numéro de chambre</label>
              <select name="lodging" id="lodging" class="px-4 py-1 rounded-md">
                <!-- <template v-if="selectedItem.category === 'Chambre à l\'auberge'"> -->
                  <option v-for="lodging in lodgingStore.rooms" :key="lodging.id" :selected="lodging.room_number === selectedItem.lodging.room_number">
                    <span v-if="lodging.building">{{ lodging.building }} - </span>{{ lodging.room_number }}
                  </option>
                <!-- </template> -->
              </select>
            </div>
          </div>

          <div>

          </div>
        </div>
        <!-- Buttons -->
        <div class="flex justify-end items-center gap-4 mt-6 text-neutral-100">
          <button @click="$emit('close-modal')"
            class="hover:bg-neutral-500/80 px-4 py-1 rounded-md hover:shadow font-medium transition-all duration-200">
            Annuler
          </button>
          <input type="submit" value="Mettre à jour"
            class="bg-red-500 hover:bg-red-700 px-4 py-1 rounded-md shadow text-neutral-100 font-medium transition-all duration-200">
        </div>
      </form>
    </div>
  </Modal>
</template>
