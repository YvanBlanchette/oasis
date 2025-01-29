<script setup>
//*-------------------- Imports --------------------*//
import { reactive, toRefs } from 'vue';

// Component imports
import Input from '@/components/form/Input.vue';
import Modal from '@/components/shared/Modal.vue';
import Toast from '@/components/shared/Toast.vue';

// Store imports
import { useStaffStore } from '@/stores/staff';
import { useToasterStore } from '@/stores/toaster';


//*-------------------- Stores --------------------*//
const staffStore = useStaffStore();
const toaster = useToasterStore();

//*-------------------- Variables / States --------------------*//
const emit = defineEmits(['close-modal', 'refresh-users']);

const props = defineProps({
  userData: Object,
})

const { userData } = toRefs(props);

const formData = reactive({
  displayName: userData.value.displayName,
  email: userData.value.email,
  phone: userData.value.phone,
  address: userData.value.address,
  photoURL: userData.value.photoURL,
  role: userData.value.role,
  status: userData.value.status,
});


//*-------------------- Functions --------------------*//
// Function to update staff
const updateStaff = async (staff_id) => {
  if (formData) {
    try {
      await staffStore.updateStaff(staff_id, { ...formData });
      toaster.showToast("success", "Modification employé", "Le compte employé a été mis à jour avec succès");
    } catch (error) {
      console.log(error);
      toaster.showToast("error", "Modification employé", "Une erreur est survenue lors de la modification du compte employé");
    } finally {
      emit('refresh-users');
      emit('close-modal');
    }
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
      <h1 class="text-4xl lg:text-5xl text-center font-semibold mb-6">Modifier un employé</h1>
      <!-- Form -->
      <form @submit.prevent="updateStaff(userData.id)" class="flex flex-col w-full">
        <div class="flex gap-8 w-full justify-between">
          <div class="flex flex-col gap-2 justify-between w-full h-full">
            <!-- Name Input -->
            <Input type="text" label="Nom" v-model="formData.displayName" className="text-black w-full" />

            <!-- Email Input -->
            <Input type="email" label="Adresse courriel" v-model="formData.email"
              className="text-black w-full" />

            <!-- Phone Input -->
            <Input type="tel" label="Téléphone" v-model="formData.phone" className="text-black w-full" />
            <!-- Phone Input -->
            <Input type="text" label="Adresse" v-model="formData.address" className="text-black w-full" />
          </div>

          <!-- Image Input -->
          <div>
            <div class="relative border border-primary w-[165px] h-[165px] rounded-md mt-3">
              <label for="photoURL" class="flex justify-center items-center w-full h-full  cursor-pointer overflow-hidden shadow-inner">
                <img v-if="userData.photoURL" :src="userData.photoURL" alt="photoURL"
                  class="w-[165px] h-[165px] rounded-md object-cover">
                <i v-else class="fa-solid fa-arrow-up-from-bracket text-6xl text-neutral-300/60"></i>
              </label>
              <input type="file" id="photoURL" class="hidden">
              <button v-if="userData.photoURL" @click="userData.photoURL = ''"
                class="absolute top-2 right-2 w-5 h-5 flex items-center justify-center transition-all duration-200 rounded-md bg-red-500 hover:bg-red-600">
                <i class="fa-solid fa-xmark text-white"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="mt-6 w-full flex gap-8 justify-between">
          <div class="flex flex-col w-full">
          <!-- Role Select -->
          <label for="role" class="text-black">Rôle</label>
          <select name="role" id="role" class="bg-white text-black px-4 py-1 rounded-md h-[40px] w-full border border-primary" v-model="formData.role">
            <option value="admin">Administrateur</option>
            <option value="staff">Employé</option>
          </select>
          </div>

          <div class="flex flex-col w-full">
          <!-- Role Select -->
          <label for="role" class="text-black">Status</label>
          <select name="role" id="role" class="bg-white text-black px-4 py-1 rounded-md h-[40px] border border-primary w-full" v-model="formData.status">
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-center lg:justify-end items-center gap-4 mt-6">
          <button type="button" @click="$emit('close-modal')"
            class="hover:bg-neutral-200/80 px-4 py-1 rounded-md hover:shadow font-medium transition-all duration-200">
            Annuler
          </button>
          <input type="submit" value="Mettre à jour"
            class="cursor-pointer bg-primary hover:bg-primary-dark px-4 py-1 rounded-md shadow text-white font-medium transition-all duration-200">
        </div>
      </form>
    </div>
  </Modal>
  <Toast ref="toast" class="z-50"/>
</template>
