<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="brand">
        <div class="brand-icon">
          LM
        </div>

        <div>
          <h2>La Mansión</h2>
          <p>Panel hotelero</p>
        </div>
      </div>

      <ChevronsUpDown :size="17" class="header-icon" />
    </div>

    <nav class="sidebar-nav">
      <RouterLink
        v-for="item in mainItems"
        :key="item.label"
        :to="item.to"
        class="nav-item"
        :class="{ active: route.path === item.to }"
      >
        <component :is="item.icon" :size="19" />
        <span>{{ item.label }}</span>

        <span v-if="item.badge" class="badge">
          {{ item.badge }}
        </span>
      </RouterLink>

      <div class="nav-group">
        <button type="button" class="group-trigger">
          <div>
            <Settings :size="19" />
            <span>Gestión</span>
          </div>

          <ChevronUp :size="16" />
        </button>

        <div class="subnav">
          <RouterLink
            v-for="item in managementItems"
            :key="item.label"
            :to="item.to"
            class="subnav-item"
            :class="{ active: route.path === item.to }"
          >
            <component :is="item.icon" :size="18" />
            <span>{{ item.label }}</span>
          </RouterLink>
        </div>
      </div>
    </nav>

    <div class="sidebar-footer">
      <div class="user-footer">
        <div class="avatar">
          SA
        </div>

        <div class="user-text">
          <strong>Super Admin</strong>
          <span>Administrador</span>
        </div>

        <button
          type="button"
          class="logout-button"
          @click="handleLogout"
          title="Cerrar sesión"
        >
          <LogOut :size="17" />
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router';
import {
  Home,
  BedDouble,
  CalendarCheck,
  Users,
  Utensils,
  BarChart3,
  Settings,
  ChevronUp,
  ChevronsUpDown,
  LogOut,
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();

const mainItems = [
  { label: 'Dashboard', to: '/dashboard', icon: Home, badge: '4' },
  { label: 'Reportes', to: '/reportes', icon: BarChart3 },
];

const managementItems = [
  { label: 'Habitaciones', to: '/habitaciones', icon: BedDouble },
  { label: 'Reservaciones', to: '/reservaciones', icon: CalendarCheck },
  { label: 'Huéspedes', to: '/huespedes', icon: Users },
  { label: 'Platos', to: '/platos', icon: Utensils },
];

const handleLogout = () => {
  localStorage.removeItem('hotel_token');
  localStorage.removeItem('hotel_user');
  router.replace('/login');
};
</script>

<style scoped>
.sidebar {
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
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
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
  line-height: 1.1;
}

.brand p {
  margin: 3px 0 0;
  color: #64748b;
  font-size: 0.75rem;
}

.header-icon {
  color: #64748b;
}

.sidebar-nav {
  flex: 1;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-item,
.subnav-item,
.group-trigger {
  width: 100%;
  min-height: 36px;
  border: none;
  background: transparent;
  border-radius: 8px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px;
  font-size: 0.9rem;
  font-weight: 650;
  transition: background 0.18s ease, color 0.18s ease;
}

.nav-item:hover,
.subnav-item:hover,
.group-trigger:hover {
  background: #1e293b;
  color: #e5e7eb;
}

.nav-item.active,
.subnav-item.active {
  background: #1e293b;
  color: #f8fafc;
}

.nav-item svg,
.subnav-item svg,
.group-trigger svg {
  color: #64748b;
  flex-shrink: 0;
}

.nav-item.active svg,
.subnav-item.active svg {
  color: #93c5fd;
}

.badge {
  margin-left: auto;
  min-width: 22px;
  height: 22px;
  padding: 0 7px;
  border-radius: 7px;
  border: 1px solid #334155;
  color: #cbd5e1;
  background: #0f172a;
  font-size: 0.75rem;
  display: grid;
  place-items: center;
}

.nav-group {
  margin-top: 4px;
}

.group-trigger {
  justify-content: space-between;
}

.group-trigger div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.subnav {
  margin-left: 18px;
  margin-top: 6px;
  padding-left: 12px;
  border-left: 1px solid #253044;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.subnav-item {
  font-size: 0.88rem;
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
  line-height: 1.1;
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
  .sidebar {
    display: none;
  }
}
</style>