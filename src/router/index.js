import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LodgingView from '@/views/LodgingView.vue'
import ActivityView from '@/views/ActivityView.vue'
import AuthView from '@/views/AuthView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import { useAuthStore } from '@/stores/auth'
import ProfileView from '@/views/ProfileView.vue'
import MyReservationsView from '@/views/MyReservationsView.vue'
import RoomsView from '@/views/dashboard/LodgingView.vue'
import ActivitiesView from '@/views/dashboard/ActivitiesView.vue'
import CustomersView from '@/views/dashboard/CustomersView.vue'
import ReservationsView from '@/views/dashboard/ReservationsView.vue'
import EmployesView from '@/views/dashboard/EmployesView.vue'
import PromotionsView from '@/views/dashboard/PromotionsView.vue'
import SummaryView from '@/views/dashboard/SummaryView.vue'

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
      path: '/lodgings/:id',
      name: 'lodging',
      component: LodgingView,
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
      redirect: '/dashboard/summary',
      component: DashboardView,
      meta: { auth: true, staff: true },
      children: [
        {
          path: '/dashboard/summary',
          name: 'dashboard',
          component: SummaryView,
        },
        {
          path: 'customers',
          name: 'customers',
          component: CustomersView,
        },
        {
          path: 'reservations',
          name: 'reservations',
          component: ReservationsView,
        },
        {
          path: 'rooms',
          name: 'rooms',
          component: RoomsView,
        },
        {
          path: 'activities',
          name: 'activities',
          component: ActivitiesView,
        },
        {
          path: 'employes',
          name: 'employes',
          component: EmployesView,
          meta: { admin: true }
        },
        {
          path: 'promotions',
          name: 'promotions',
          component: PromotionsView,
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
  const authStore = useAuthStore();
  await authStore.getUser();

  // Si l'utilisateur est connecté et qu'il essaie d'entrer sur une page d'invité
  if (to.meta.guest && authStore.isAuthenticated) {
    // Redirection vers la page d'accueil
    return { name: 'home' };
  }

  // Si l'utilisateur n'est pas connecté et qu'il essaie d'entrer sur une page privée
  if (to.meta.auth && !authStore.isAuthenticated) {
    // Redirection vers la page d'accueil
    return { name: 'home' };
  }

  // Si l'utilisateur n'est pas un administrateur
  if (to.meta.admin && authStore.user.role !== 'admin') {
    return { name: 'home' };
  }

  // Si l'utilisateur n'est pas un admin ou un employé
  if (to.meta.staff && authStore.user.role !== 'admin' && authStore.user.role !== 'staff') {
    return { name: 'home' };
  }
})

export default router