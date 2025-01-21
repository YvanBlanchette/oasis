import { ref, computed } from 'vue'
import { defineStore } from 'pinia'



export const useMainStore = defineStore('main', () => {
  const coordinates = {
    address: {
      street: '1200, chemin Baie-du-Milieu',
      city: 'Saint-Michel-des-Saints',
      province: 'Québec',
      postalCode: 'J0K 3B0',
      country: 'Canada'
    },
    phone: '1-450-870-0133',
    fax: '1-877-822-2623',
    email: 'info@aubergelacmontagne.com'
  }
  
  const hasAccount = ref(true);

  const toggleHasAccount = () => {
    hasAccount.value = !hasAccount.value;
  }

  const User = {};

  return { coordinates, hasAccount, toggleHasAccount, User }
})
