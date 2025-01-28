<style scoped>
/* Styles the calendar picker icon */
input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
  color: black;
}
</style>

<script setup>
import Modal from '@/components/shared/Modal.vue';
import { useStaffStore } from '@/stores/staff';
import { useToasterStore } from '@/stores/toaster';
import { reactive, toRefs } from 'vue';
import Toast from '@/components/shared/Toast.vue';

const staffStore = useStaffStore();
const toaster = useToasterStore();

const emit = defineEmits(['close-modal', 'refresh-users']);

const formData = reactive({
  displayName: '',
  email: '',
  phone: '',
  address: '',
  photoURL: 'https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg',
  role: 'staff',
  status: 'inactive',
  password: '',
  passwordConfirmation: '',
  hireDate: new Date().toISOString().slice(0, 10),
});

const today = new Date();

// Function to create a new staff
const createStaff = async () => {
  if (!validateName(formData.displayName)) return;
  if (!validateEmail(formData.email)) return;
  if (!validatePasswords(formData.password, formData.passwordConfirmation)) return;
  if (!validateHireDate(formData.hireDate)) return;

  if (formData) {
    await staffStore.createStaff({ ...formData });
    console.log({ ...formData });
    emit('refresh-users');
    emit('close-modal');
  }
}

//* VALIDATION RULES *//
// Error messages
const ERROR_MESSAGES = {
  NAME_REQUIRED: 'Le nom est requis!',
  NAME_MIN_LENGTH: 'Le nom doit contenir au moins 3 caractères!',
  EMAIL_REQUIRED: 'L\'adresse courriel est requise!',
  EMAIL_INVALID: 'L\'adresse courriel est invalide!',
  PASSWORD_REQUIRED: 'Le mot de passe est requis!',
  PASSWORDS_DO_NOT_MATCH: 'Les mots de passe doivent être identiques!',
  HIRE_DATE_REQUIRED: 'La date d\'embauche est requise!',
};

// Function to validate the name field
const validateName = (name) => {
  if (!name) {
    useToasterStore.showToast('error', 'Erreur', ERROR_MESSAGES.NAME_REQUIRED);
    return false;
  }
  if (name.length < 3) {
    toaster.showToast('error', 'Erreur', ERROR_MESSAGES.NAME_MIN_LENGTH);
    return false;
  }
  return true;
};

// Function to validate the email field
const validateEmail = (email) => {
  if (!email) {
    toaster.showToast('error', 'Erreur', ERROR_MESSAGES.EMAIL_REQUIRED);
    return false;
  }
  if (!email.includes('@')) {
    toaster.showToast('error', 'Erreur', ERROR_MESSAGES.EMAIL_INVALID);
    return false;
  }
  return true;
};

// Function to validate the password fields
const validatePasswords = (password, passwordConfirmation) => {
  if (!password) {
    toaster.showToast('error', 'Erreur', ERROR_MESSAGES.PASSWORD_REQUIRED);
    return false;
  }
  if (password !== passwordConfirmation) {
    toaster.showToast('error', 'Erreur', ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH);
    return false;
  }
  return true;
};

const validateHireDate = (hireDate) => {
  if (!hireDate) {
    toaster.showToast('error', 'Erreur', 'La date d\'embauche est requis!');
    return false;
  }
  return true;
}
</script>

<template>
  <Modal>
    <!-- Close button -->
    <button @click="$emit('close-modal')"
      class="absolute top-4 right-4 w-7 h-7 flex items-center justify-center transition-all duration-200 rounded-md hover:bg-neutral-200/80 text-black">
      <i class="fa-solid fa-xmark text-xl"></i>
    </button>
    <div class="w-full h-full flex flex-col items-center justify-center text-black">
      <!-- Modal Title -->
      <h1 class="text-5xl text-center font-semibold mb-6">Enregistrer un employé</h1>
      <!-- Form -->
      <form @submit.prevent="createStaff()" class="flex flex-col w-full">
        <div class="flex gap-8 w-full justify-between">
          <div class="flex flex-col gap-2 justify-between w-full h-full">
            <!-- Name Input -->
            <Input placeholder="Inscrire le nom de l'employé" type="text" label="Nom" v-model="formData.displayName"
              className="text-neutral-900 w-full shadow-inner" />

            <!-- Email Input -->
            <Input placeholder="Inscrire l'adresse courriel de l'employé" type="email" label="Adresse courriel"
              v-model="formData.email" className="text-neutral-900 w-full shadow-inner" />

            <!-- Phone Input -->
            <Input placeholder="Inscrire le numéro de téléphone de l'employé" type="tel" label="Téléphone"
              v-model="formData.phone" className="text-neutral-900 w-full shadow-inner" />

          </div>

          <!-- Image Input -->
          <div>
            <div class="relative border border-primary w-[165px] h-[165px] rounded-md mt-3">
              <label for="photoURL" class="flex justify-center items-center w-full h-full cursor-pointer overflow-hidden shadow-inner">
                <img v-if="formData.photoURL" :src="formData.photoURL && formData.photoURL" alt="photoURL"
                  class="w-[165px] h-[165px] rounded-md object-cover border border-primary">
                <i v-else class="fa-solid fa-arrow-up-from-bracket text-6xl text-neutral-300/60"></i>
              </label>
              <input type="file" id="photoURL" class="hidden">
              <button v-if="formData.photoURL" @click="formData.photoURL = ''"
                class="absolute top-2 right-2 w-5 h-5 flex items-center justify-center transition-all duration-200 rounded-md bg-red-500 hover:bg-red-600">
                <i class="fa-solid fa-xmark text-neutral-100"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="mt-6 w-full flex flex-col gap-1">
          <div class="flex justify-between gap-8">
          <!-- Address Input -->
          <Input autocomplete="username" placeholder="Inscrire l'adresse de l'employé" type="text" label="Adresse" v-model="formData.address"
            className="text-neutral-900 w-full" />
          <!-- Hire Date -->
          <div class="flex flex-col gap-1">
            <label for="hireDate" class="text-black">Date d'embauche</label>
            <DatePicker required id="hireDate" :inputValue="formData.hireDate" :minDate="today" className="bg-white border border-primary h-[40px] text-black" />
          </div>
          </div>
          <PasswordInput label="Mot de passe" id="password" v-model="formData.password"
            placeholder="Inscrire le mot de passe de l'employé" class="mt-1 w-full" autocomplete="new-password" />
          <PasswordInput label="Confirmation de mot de passe" id="password_confirmation" v-model="formData.passwordConfirmation"
            placeholder="Confirmer le mot de passe de l'employé" class="mt-1 w-full" autocomplete="new-password" />
        </div>

        <div class="mt-6 w-full flex gap-8 justify-between">
          <div class="flex flex-col w-full">
            <!-- Role Select -->
            <label for="role" class="text-black">Rôle</label>
            <select name="role" id="role"
              class="bg-white text-black px-4 py-1 rounded-md h-[40px] w-full border border-primary"
              v-model="formData.role">
              <option value="admin">Administrateur</option>
              <option value="staff">Employé</option>
            </select>
          </div>

          <div class="flex flex-col w-full">
            <!-- Role Select -->
            <label for="status" class="text-black">Status</label>
            <select name="status" id="status"
              class="bg-white text-black px-4 py-1 rounded-md h-[40px] border border-primary w-full"
              v-model="formData.status">
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
        </div>


        <!-- Buttons -->
        <div class="flex justify-end items-center gap-4 mt-6">
          <button type="button" @click="$emit('close-modal')"
            class="hover:bg-neutral-200/80 px-4 py-1 rounded-md hover:shadow font-medium transition-all duration-200">
            Annuler
          </button>
          <input type="submit" value="Mettre à jour"
            class="cursor-pointer bg-primary hover:bg-primary-dark px-4 py-1 rounded-md shadow text-neutral-100 font-medium transition-all duration-200">
        </div>
      </form>
    </div>
  </Modal>
  <Toast ref="toast" />
</template>
