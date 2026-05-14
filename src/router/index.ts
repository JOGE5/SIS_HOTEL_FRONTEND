import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';

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
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'habitaciones',
          name: 'habitaciones',
          component: () => import('../views/HabitacionesView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'reservaciones',
          name: 'reservaciones',
          component: () => import('../views/ReservacionesView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'huespedes',
          name: 'huespedes',
          component: () => import('../views/HuespedesView.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'platos',
          name: 'platos',
          component: () => import('../views/PlatosView.vue'),
          meta: { requiresAuth: true },
        },

        /*
          Ruta temporal.
          Todavía vuelve al dashboard porque aún no creamos la vista real.
        */
        {
          path: 'reportes',
          name: 'reportes',
          redirect: '/dashboard',
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('hotel_token');

  if (to.meta.requiresAuth && !token) {
    next('/login');
    return;
  }

  if (to.name === 'login' && token) {
    next('/dashboard');
    return;
  }

  next();
});

export default router;