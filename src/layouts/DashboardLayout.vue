<template>
  <div class="dashboard-layout">
    <SideDrawer
      :open="drawerOpen"
      :activeView="currentView"
      @select="selectView"
      @logout="handleLogout"
      @close="drawerOpen = false"
    />

    <div class="dashboard-container">
      <DashboardHeader
        :title="viewTitle"
        :subtitle="currentViewLabel"
        @toggle-drawer="drawerOpen = !drawerOpen"
      />

      <main class="dashboard-content">
        <section class="welcome-strip">
          <div>
            <p class="welcome-intro">Bienvenido al panel de La Mansión</p>
            <h2>Un tablero compacto para decisiones claras</h2>
          </div>
          <span class="status-chip">SUPER ADMIN</span>
        </section>

        <section class="module-grid">
          <ModuleCard
            v-for="module in modules"
            :key="module.key"
            :icon="module.icon"
            :label="module.label"
            :description="module.description"
            :active="currentView === module.key"
            @open="selectView(module.key)"
          />
        </section>

        <section class="summary-block">
          <article class="summary-item">
            <span>Habitaciones libres</span>
            <strong>18</strong>
          </article>
          <article class="summary-item">
            <span>Reservas activas</span>
            <strong>12</strong>
          </article>
          <article class="summary-item">
            <span>Huéspedes registrados</span>
            <strong>104</strong>
          </article>
          <article class="summary-item">
            <span>Platos disponibles</span>
            <strong>34</strong>
          </article>
        </section>

        <section class="quick-actions">
          <button type="button">Nueva reservación</button>
          <button type="button">Registrar huésped</button>
          <button type="button">Ver habitaciones</button>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DashboardHeader from '../components/DashboardHeader.vue';
import SideDrawer from '../components/SideDrawer.vue';
import ModuleCard from '../components/ModuleCard.vue';

const emit = defineEmits(['logout']);

const drawerOpen = ref(false);
const currentView = ref('habitaciones');

const modules = [
  {
    key: 'habitaciones',
    label: 'Habitaciones',
    description: 'Gestiona disponibilidad y estados del piso.',
    icon: '🛏️',
  },
  {
    key: 'huespedes',
    label: 'Huéspedes',
    description: 'Controla perfiles y movimientos de huéspedes.',
    icon: '🧑‍🤝‍🧑',
  },
  {
    key: 'reservaciones',
    label: 'Reservaciones',
    description: 'Revisa reservas y programación de ingresos.',
    icon: '📅',
  },
  {
    key: 'platos',
    label: 'Platos',
    description: 'Explora el menú disponible para servicio.',
    icon: '🍽️',
  },
];

const viewTitle = computed(() => {
  const active = modules.find(item => item.key === currentView.value);
  return active ? active.label : 'Dashboard';
});

const currentViewLabel = computed(() => {
  const active = modules.find(item => item.key === currentView.value);
  return active ? `Módulo ${active.label}` : 'Módulo principal';
});

const selectView = (view: string) => {
  currentView.value = view;
  drawerOpen.value = false;
};

const handleLogout = () => {
  emit('logout');
  drawerOpen.value = false;
};
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background: #efe2cf;
  display: flex;
  justify-content: center;
  padding: 0.75rem;
}

.dashboard-container {
  width: min(100%, 900px);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dashboard-content {
  display: grid;
  gap: 1rem;
}

.welcome-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.15rem;
  border-radius: 22px;
  background: #fffaf2;
  border: 1px solid rgba(47, 52, 61, 0.08);
  box-shadow: 0 16px 30px rgba(47, 52, 61, 0.08);
}

.welcome-intro {
  margin: 0 0 0.35rem;
  color: #8b908a;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.78rem;
}

.welcome-strip h2 {
  margin: 0;
  font-size: 1.4rem;
  line-height: 1.3;
  color: #2f343d;
}

.status-chip {
  display: inline-flex;
  padding: 0.65rem 0.95rem;
  border-radius: 999px;
  font-size: 0.85rem;
  color: #2f343d;
  background: rgba(216, 199, 163, 0.3);
  border: 1px solid rgba(216, 199, 163, 0.35);
}

.module-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.summary-block {
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.summary-item {
  padding: 1rem;
  border-radius: 20px;
  background: #fffaf2;
  border: 1px solid rgba(47, 52, 61, 0.08);
  box-shadow: 0 14px 26px rgba(47, 52, 61, 0.06);
  display: grid;
  gap: 0.45rem;
}

.summary-item span {
  font-size: 0.84rem;
  color: #8b908a;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.summary-item strong {
  font-size: 1.5rem;
  color: #2f343d;
}

.quick-actions {
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.quick-actions button {
  padding: 0.95rem 1rem;
  border: none;
  border-radius: 18px;
  background: #2f343d;
  color: #fffaf2;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}

.quick-actions button:hover {
  transform: translateY(-1px);
  background: #40474f;
}

@media (max-width: 860px) {
  .module-grid {
    grid-template-columns: 1fr;
  }

  .summary-block,
  .quick-actions {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .dashboard-container {
    padding: 0;
  }

  .welcome-strip {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
