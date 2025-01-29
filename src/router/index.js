import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

//* Views imports
import HomeView from '@/views/HomeView.vue'
import ActivityView from '@/views/ActivityView.vue'
import AuthView from '@/views/AuthView.vue'
import ProfileView from '@/views/ProfileView.vue'
import MyReservationsView from '@/views/MyReservationsView.vue'
import ActivitiesView from '@/views/dashboard/ActivitiesView.vue'
import CustomersView from '@/views/dashboard/CustomersView.vue'
import ReservationsView from '@/views/dashboard/ReservationsView.vue'
import EmployesView from '@/views/dashboard/EmployesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/activities/:id',
      name: 'activity',
      component: ActivityView,
    },
    {
      path: '/my-reservations',
      name: 'myReservations',
      component: MyReservationsView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      meta: { guest: true }
    },
    {
      path: '/dashboard',
      redirect: '/dashboard/reservations',
      name: 'dashboard',
      
      children: [
        {
          path: 'reservations',
          name: 'reservations',
          component: ReservationsView,
          meta: { staff: true }
        },
        {
          path: 'customers',
          name: 'customers',
          component: CustomersView,
          meta: { staff: true }
        },
        {
          path: 'activities',
          name: 'activities',
          component: ActivitiesView,
          meta: { staff: true }
        },
        {
          path: 'employes',
          name: 'employes',
          component: EmployesView,
          meta: { admin: true, staff: true }
        },
      ],
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { auth: true }
    },
  ],
})

router.beforeEach(async (to, from) => {
  const isStaff = JSON.parse(localStorage.getItem('isStaff'));
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

  // Si l'utilisateur est connecté et qu'il essaie d'entrer sur une page d'invité
  if (to.meta.guest && isAuthenticated) {
    // Redirection vers la page d'accueil
    return { name: 'home' };
  }

  // Si l'utilisateur n'est pas connecté et qu'il essaie d'entrer sur une page privée
  if (to.meta.auth && !isAuthenticated) {
    // Redirection vers la page d'accueil
    return { name: 'home' };
  }
  // L''utilisateur doit être un admin
  if (to.meta.admin && !isAdmin) {
    return { name: 'reservations' };
  }
  // L'utilisateur doit faire parti du staff
  if (to.meta.staff && !isStaff) {
    return { name: 'home' };
  }

  // L'utilisateur ne doit pas être connecté en tant que Staff ou Admin
  if (to.meta.dashboardGuest && isStaff) {
    return { name: 'reservations' };
  }
})

export default router