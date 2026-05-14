<template>
  <aside class="guest-sidebar">
    <div class="sidebar-header">
      <div class="brand">
        <div class="brand-icon">LM</div>

        <div>
          <h2>La Mansión</h2>
          <p>Portal huésped</p>
        </div>
      </div>
    </div>

    <nav class="sidebar-nav">
      <RouterLink
        v-for="item in guestItems"
        :key="item.label"
        :to="item.to"
        class="nav-item"
        :class="{ active: route.path === item.to }"
      >
        <component :is="item.icon" :size="19" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="sidebar-footer">
      <div class="user-footer">
        <div class="avatar">H</div>

        <div class="user-text">
          <strong>{{ userName }}</strong>
          <span>Huésped</span>
        </div>

        <button type="button" class="logout-button" @click="handleLogout">
          <LogOut :size="17" />
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import {
  LayoutDashboard,
  Utensils,
  MapPinned,
  LogOut,
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const userName = ref('Huésped');

const guestItems = [
  { label: 'Dashboard', to: '/huesped/dashboard', icon: LayoutDashboard },
  { label: 'Reservar comida', to: '/huesped/reservar-comida', icon: Utensils },
  { label: 'Puntos turísticos', to: '/huesped/puntos-turisticos', icon: MapPinned },
];

onMounted(() => {
  const user = localStorage.getItem('hotel_user');

  if (!user) return;

  try {
    const parsedUser = JSON.parse(user);
    userName.value = parsedUser.name || 'Huésped';
  } catch {
    userName.value = 'Huésped';
  }
});

const handleLogout = () => {
  localStorage.removeItem('hotel_token');
  localStorage.removeItem('hotel_user');
  router.replace('/login');
};
</script>

<style scoped>
.guest-sidebar {
  width: 264px;
  min-height: 100vh;
  background: #111827;
  border-right: 1px solid #253044;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  height: 68px;
  padding: 0 22px;
  border-bottom: 1px solid #253044;
  display: flex;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  background: #0f172a;
  color: #22c55e;
  font-size: 0.7rem;
  font-weight: 900;
  border: 1px solid #253044;
}

.brand h2 {
  margin: 0;
  color: #f8fafc;
  font-size: 0.92rem;
  font-weight: 800;
}

.brand p {
  margin: 3px 0 0;
  color: #64748b;
  font-size: 0.75rem;
}

.sidebar-nav {
  flex: 1;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-item {
  width: 100%;
  min-height: 38px;
  border-radius: 8px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  font-size: 0.9rem;
  font-weight: 700;
  transition: background 0.18s ease, color 0.18s ease;
}

.nav-item:hover,
.nav-item.active {
  background: #1e293b;
  color: #f8fafc;
}

.nav-item.active svg {
  color: #93c5fd;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid #253044;
}

.user-footer {
  min-height: 46px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #1e293b;
  color: #e5e7eb;
  border: 1px solid #334155;
  display: grid;
  place-items: center;
  font-size: 0.72rem;
  font-weight: 900;
}

.user-text {
  min-width: 0;
  flex: 1;
}

.user-text strong {
  display: block;
  color: #f8fafc;
  font-size: 0.86rem;
}

.user-text span {
  display: block;
  margin-top: 3px;
  color: #64748b;
  font-size: 0.74rem;
}

.logout-button {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #64748b;
  display: grid;
  place-items: center;
}

.logout-button:hover {
  background: #1e293b;
  color: #fca5a5;
}

@media (max-width: 900px) {
  .guest-sidebar {
    display: none;
  }
}
</style>