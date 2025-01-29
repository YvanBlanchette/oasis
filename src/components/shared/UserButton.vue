<script setup>
//*-------------------- Imports --------------------*//
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

// Store imports
import { useAuthStore } from '@/stores/auth';
import { useToasterStore } from '@/stores/toaster';
import { useReservationStore } from '@/stores/reservation';


//*-------------------- Stores --------------------*//
const authStore = useAuthStore();
const toaster = useToasterStore();
const reservationStore = useReservationStore();
const router = useRouter();


//*-------------------- Variables / States --------------------*//
const isMenuOpen = ref(false);
const revervations = ref({});
const photoPlacholder = 'https://static.vecteezy.com/system/resources/previews/036/594/092/large_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg';
const user = JSON.parse(localStorage.getItem('user'));
const isStaff = JSON.parse(localStorage.getItem('isStaff'));
const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));


//*-------------------- Functions --------------------*//
const logout = async () => {
  try {
    // Call the logout function from the auth store
    await authStore.logout();

    //  Send a success toast
    toaster.showToast('success', 'Déconnexion', 'Vous avez été déconnecté avec succès!')

    // Redirect the user to the home page
    router.push({ name: 'home' });
  } catch (error) {
    // Log the error
    console.error('Une erreur s\'est produite lors de la déconnexion: ', error);

    // Send an error toast
    toaster.showToast('error', 'Erreur', 'Une erreur s\'est produite lors de la déconnexion!')
  } finally {
    window.location.reload();
  }
}

onMounted(async () => {
  if (isAuthenticated) {
    await reservationStore.getUserReservations(user.email);
    revervations.value = reservationStore.reservations
  }
})
</script>


<template>
  <div class="relative">
    <button @click="isMenuOpen = !isMenuOpen"
      class="bg-neutral-50/10 rounded-full size-[3rem] flex justify-center items-center border-2 overflow-hidden border-neutral-200 hover:border-primary transition-all duration-200 text-neutral-200 hover:text-primary"
      :class="isMenuOpen && 'border-primary text-primary'">
      <i v-if="!user" class="fa-solid fa-user text-2xl"></i>
      <img v-else :src="user.photoURL || photoPlacholder" class="w-12 h-12 object-cover" alt="Avatar de l'utilisateur">
    </button>

    <!-- User Menu -->
    <div v-if="isMenuOpen" class="absolute top-[72px] right-0 bg-white w-60 text-black rounded-b-sm z-50 shadow-xl">
      <RouterLink :to="{ name: 'home' }" class="p-2 border-b border-neutral-500 block">
        <p class="text-lg text-center">{{ isAuthenticated ? 'Bonjour ' + user.displayName + '!' : 'Veuillez vous connecter' }}</p>
      </RouterLink>

      <!-- User Profile -->
      <RouterLink v-if="isAuthenticated" :to="{ name: 'profile' }"
        class="p-2 flex justify-center items-center gap-2 hover:text-primary transition-all duration-200 cursor-pointer">
        <i class="fa-solid fa-user"></i>
        <p>Mon profil</p>
      </RouterLink>

      <!-- My Reservations -->
      <template v-if="isAuthenticated && !isStaff">
        <RouterLink :to="{ name: 'myReservations' }"
          class="p-2 flex justify-center items-center gap-3 hover:text-primary transition-all duration-200 cursor-pointer">
          <i class="relative fa-solid fa-cart-shopping"><span v-if="revervations?.length > 0" class="absolute -top-2 -right-3 bg-primary text-white rounded-full w-4 h-4 flex justify-center items-center text-[8px] font-medium">{{ revervations.length }}</span></i>
          <p class="relative">Mes Réservations </p>
        </RouterLink>
      </template>

      <!-- Dashboard -->
      <template v-if="isStaff">
        <RouterLink :to="{ name: 'dashboard' }"
          class="p-2 flex justify-center items-center gap-2 hover:text-primary transition-all duration-200 cursor-pointer">
          <i class="fa-solid fa-table-columns"></i>
          <p>Tableau de bord</p>
        </RouterLink>
      </template>

      <!-- Login -->
      <template v-if="!isAuthenticated">
        <RouterLink :to="{ name: 'auth' }"
          class="p-2 flex justify-center items-center gap-2 hover:text-primary transition-all duration-200 cursor-pointer">
          <i class="fa-solid fa-right-to-bracket"></i>
          <p>Connexion</p>
        </RouterLink>
      </template>

      <!-- Logout -->
      <div v-if="isAuthenticated" @click="logout()"
        class="p-2 flex justify-center items-center gap-2 hover:text-primary transition-all duration-200 cursor-pointer">
        <i class="fa-solid fa-right-from-bracket"></i>
        <p>Déconnexion</p>
      </div>

    </div>
  </div>
</template>
