<template>
  <aside class="sidebar">
    <div class="brand-block">
      <img src="/images/logo-lamansion.png" alt="Hotel La Mansión" class="brand-logo" />
      <div>
        <p>Hotel Club Campestre</p>
        <strong>La Mansión</strong>
      </div>
    </div>

    <nav class="menu-list" aria-label="Menú principal">
      <button
        v-for="item in menuItems"
        :key="item.key"
        :class="[{ active: activeView === item.key }, 'menu-button']"
        @click="$emit('select', item.key)"
        type="button"
      >
        <span>{{ item.label }}</span>
      </button>
    </nav>

    <button class="logout-button" type="button" @click="$emit('logout')">
      Salir
    </button>
  </aside>
</template>

<script setup lang="ts">
const props = defineProps({
  activeView: {
    type: String,
    required: true,
  },
});

const menuItems = [
  { key: 'habitaciones', label: 'Habitaciones' },
  { key: 'huespedes', label: 'Huéspedes' },
  { key: 'reservaciones', label: 'Reservaciones' },
  { key: 'platos', label: 'Platos' },
  { key: 'informes', label: 'Informes' },
  { key: 'configuracion', label: 'Configuración' },
];
</script>

<style scoped>
.sidebar {
  width: 280px;
  min-height: 100vh;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #2f343d;
  color: #ffffff;
}

.brand-block {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2.5rem;
}

.brand-logo {
  width: 56px;
  height: 56px;
  object-fit: contain;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.65rem;
}

.brand-block p {
  margin: 0;
  color: #d8c7a3;
  font-size: 0.85rem;
}

.brand-block strong {
  display: block;
  margin-top: 0.35rem;
  font-size: 1.1rem;
  letter-spacing: 0.04em;
}

.menu-list {
  display: grid;
  gap: 0.4rem;
}

.menu-button {
  width: 100%;
  text-align: left;
  padding: 0.95rem 1rem;
  border: none;
  border-radius: 16px;
  background: transparent;
  color: #f3f1ee;
  font-size: 0.98rem;
  transition: background 0.25s ease, transform 0.25s ease;
  cursor: pointer;
}

.menu-button:hover,
.menu-button.active {
  background: rgba(216, 199, 163, 0.16);
  color: #ffffff;
  transform: translateX(2px);
}

.menu-button.active {
  box-shadow: inset 4px 0 0 #d8c7a3;
}

.logout-button {
  margin-top: 2rem;
  width: 100%;
  padding: 0.95rem 1rem;
  border: 1px solid rgba(216, 199, 163, 0.25);
  border-radius: 16px;
  background: transparent;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: background 0.25s ease, color 0.25s ease;
}

.logout-button:hover {
  background: rgba(216, 199, 163, 0.13);
  color: #e9dfc9;
}

@media (max-width: 880px) {
  .sidebar {
    width: 100%;
    min-height: auto;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
}
</style>
