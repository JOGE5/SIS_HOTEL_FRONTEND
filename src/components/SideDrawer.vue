<template>
  <div>
    <div
      class="drawer-backdrop"
      v-show="open"
      @click="$emit('close')"
    />

    <aside :class="['drawer-panel', { open }]" aria-label="Menú de navegación">
      <div class="drawer-header">
        <div>
          <p>La Mansión</p>
          <strong>Sistema hotelero</strong>
        </div>
        <button class="close-button" type="button" @click="$emit('close')" aria-label="Cerrar menú">✕</button>
      </div>

      <nav class="drawer-menu">
        <button
          v-for="item in menuItems"
          :key="item.key"
          :class="['drawer-link', { active: activeView === item.key }]"
          @click="select(item.key)"
          type="button"
        >
          {{ item.label }}
        </button>
      </nav>

      <button class="drawer-logout" type="button" @click="$emit('logout')">
        Salir
      </button>
    </aside>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  activeView: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['close', 'select', 'logout']);

const menuItems = [
  { key: 'habitaciones', label: 'Habitaciones' },
  { key: 'huespedes', label: 'Huéspedes' },
  { key: 'reservaciones', label: 'Reservaciones' },
  { key: 'platos', label: 'Platos' },
  { key: 'informes', label: 'Informes' },
  { key: 'configuracion', label: 'Configuración' },
];

const select = (key: string) => {
  emit('select', key);
  emit('close');
};
</script>

<style scoped>
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.34);
  z-index: 9;
}

.drawer-panel {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  padding: 1.5rem;
  transform: translateX(-108%);
  transition: transform 0.25s ease;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  background: #2f343d;
  color: #fff;
  box-shadow: 24px 0 50px rgba(0, 0, 0, 0.18);
}

.drawer-panel.open {
  transform: translateX(0);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.drawer-header p {
  margin: 0;
  font-size: 0.85rem;
  color: #d8c7a3;
}

.drawer-header strong {
  display: block;
  margin-top: 0.4rem;
  font-size: 1rem;
}

.close-button {
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 12px;
  cursor: pointer;
}

.drawer-menu {
  display: grid;
  gap: 0.55rem;
}

.drawer-link {
  width: 100%;
  text-align: left;
  padding: 0.95rem 1rem;
  border: none;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  color: #f3f1ee;
  font-size: 0.96rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.drawer-link:hover,
.drawer-link.active {
  background: rgba(216, 199, 163, 0.16);
  color: #ffffff;
}

.drawer-logout {
  width: 100%;
  padding: 0.95rem 1rem;
  border: 1px solid rgba(216, 199, 163, 0.35);
  border-radius: 16px;
  background: transparent;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}
</style>
