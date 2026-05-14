<template>
  <aside class="sidebar">
    <div>
      <div class="brand">
        <h2>LA MANSIÓN</h2>
        <p>Panel Hotelero</p>
      </div>

      <nav class="nav-list">
        <RouterLink
          v-for="item in menuItems"
          :key="item.label"
          :to="item.to"
          class="nav-link"
          active-class="active"
        >
          <component :is="item.icon" :size="20" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import {
  Home,
  BedDouble,
  CalendarCheck,
  Users,
  Utensils,
  BarChart3,
} from 'lucide-vue-next';

const menuItems = [
  { label: 'Dashboard', to: '/dashboard', icon: Home },
  { label: 'Habitaciones', to: '/habitaciones', icon: BedDouble },
  { label: 'Reservaciones', to: '/dashboard', icon: CalendarCheck },
  { label: 'Huéspedes', to: '/dashboard', icon: Users },
  { label: 'Platos', to: '/dashboard', icon: Utensils },
  { label: 'Reportes', to: '/dashboard', icon: BarChart3 },
];
</script>

<style scoped>
.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  width: 260px;
  min-height: 100vh;
  padding: 28px 22px;
  background: #263241;
  color: #ffffff;
  z-index: 200;
}

.brand {
  margin-bottom: 40px;
}

.brand h2 {
  margin: 0;
  color: #ffffff;
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.brand p {
  margin: 8px 0 0;
  color: #cbd5e1;
  font-size: 0.95rem;
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 15px 18px;
  border-radius: 14px;
  color: #e5e7eb;
  font-size: 0.98rem;
  font-weight: 700;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  transform: translateX(2px);
}

.nav-link.active {
  background: #166534;
  color: #ffffff;
}

@media (max-width: 900px) {
  .sidebar {
    display: none;
  }
}
</style>