import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import GuestLayout from '../layouts/GuestLayout.vue';

const ADMIN_HOME = '/dashboard';
const GUEST_HOME = '/huesped/dashboard';

function getUserRoles(): string[] {
  const user = localStorage.getItem('hotel_user');

  if (!user) return [];

  try {
    const parsedUser = JSON.parse(user);
    return Array.isArray(parsedUser.roles) ? parsedUser.roles : [];
  } catch {
    return [];
  }
}

function normalizeRole(role: string): string {
  return role
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .trim();
}

function isGuestUser(): boolean {
  const roles = getUserRoles().map(normalizeRole);
  return roles.includes('HUESPED');
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },

    {
      path: '/',
      component: DashboardLayout,
      meta: { requiresAuth: true, area: 'admin' },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
        {
          path: 'habitaciones',
          name: 'habitaciones',
          component: () => import('../views/HabitacionesView.vue'),
        },
        {
          path: 'reservaciones',
          name: 'reservaciones',
          component: () => import('../views/ReservacionesView.vue'),
        },
        {
          path: 'huespedes',
          name: 'huespedes',
          component: () => import('../views/HuespedesView.vue'),
        },
        {
          path: 'platos',
          name: 'platos',
          component: () => import('../views/PlatosView.vue'),
        },
        {
          path: 'reportes',
          name: 'reportes',
          redirect: ADMIN_HOME,
        },
      ],
    },

    {
      path: '/huesped',
      component: GuestLayout,
      meta: { requiresAuth: true, area: 'guest' },
      children: [
        {
          path: 'dashboard',
          name: 'guest-dashboard',
          component: () => import('../views/guest/GuestDashboardView.vue'),
        },
        {
          path: 'reservar-comida',
          name: 'guest-reservar-comida',
          component: () => import('../views/guest/ReservarComidaView.vue'),
        },
        {
          path: 'puntos-turisticos',
          name: 'guest-puntos-turisticos',
          component: () => import('../views/guest/PuntosTuristicosView.vue'),
        },
      ],
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('hotel_token');
  const guest = isGuestUser();

  if (to.meta.requiresAuth && !token) {
    next('/login');
    return;
  }

  if (to.name === 'login' && token) {
    next(guest ? GUEST_HOME : ADMIN_HOME);
    return;
  }

  if (token && to.meta.area === 'admin' && guest) {
    next(GUEST_HOME);
    return;
  }

  if (token && to.meta.area === 'guest' && !guest) {
    next(ADMIN_HOME);
    return;
  }

  next();
});

export default router;