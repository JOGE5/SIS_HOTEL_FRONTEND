<script setup lang="ts">
import {
  BedDouble,
  Users,
  CalendarCheck,
  Utensils,
} from 'lucide-vue-next';

const modules = [
  {
    title: 'Habitaciones',
    description: 'Control de disponibilidad, ocupación y estado de habitaciones.',
    icon: BedDouble,
    tag: 'Gestión hotelera',
  },
  {
    title: 'Huéspedes',
    description: 'Registro y administración de huéspedes activos del hotel.',
    icon: Users,
    tag: 'Clientes',
  },
  {
    title: 'Reservaciones',
    description: 'Seguimiento de reservas, entradas, salidas y estadías.',
    icon: CalendarCheck,
    tag: 'Reservas',
  },
  {
    title: 'Platos',
    description: 'Gestión gastronómica, platos disponibles y servicios del restaurante.',
    icon: Utensils,
    tag: 'Gastronomía',
  },
];
</script>

<template>
  <section class="dashboard-view">
    <header class="dashboard-header">
      <p class="dashboard-label">Panel principal</p>
      <h1>Dashboard</h1>
      <p class="dashboard-description">
        Resumen general del sistema de gestión hotelera del Hotel Club Campestre La Mansión.
      </p>
    </header>

    <section class="cards-wrapper">
      <div class="cards-grid">
        <article
          v-for="module in modules"
          :key="module.title"
          class="dashboard-card"
        >
          <div class="card-top">
            <div class="card-icon">
              <component :is="module.icon" :size="26" />
            </div>

            <span class="card-tag">
              {{ module.tag }}
            </span>
          </div>

          <div>
            <h2>{{ module.title }}</h2>
            <p>{{ module.description }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="dashboard-panels">
      <article class="panel">
        <p class="panel-label">Resumen operativo</p>
        <h2>Estado general</h2>

        <div class="summary-list">
          <div class="summary-item">
            <span>Ocupación estimada</span>
            <strong>75%</strong>
          </div>

          <div class="summary-item">
            <span>Check-ins de hoy</span>
            <strong>8</strong>
          </div>

          <div class="summary-item">
            <span>Check-outs de hoy</span>
            <strong>5</strong>
          </div>
        </div>
      </article>

      <article class="panel">
        <p class="panel-label">Accesos rápidos</p>
        <h2>Operaciones frecuentes</h2>

        <div class="quick-actions">
          <button type="button">Ver habitaciones</button>
          <button type="button">Nueva reservación</button>
          <button type="button">Registrar huésped</button>
          <button type="button">Ver reportes</button>
        </div>
      </article>
    </section>
  </section>
</template>

<style scoped>
.dashboard-view {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.dashboard-header {
  width: 100%;
  min-width: 0;
}

.dashboard-label {
  margin: 0 0 6px;
  color: #166534;
  font-size: 0.8rem;
  font-weight: 850;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.dashboard-header h1 {
  margin: 0;
  color: #111827;
  font-size: 2rem;
  font-weight: 850;
  line-height: 1.1;
}

.dashboard-description {
  margin: 10px 0 0;
  max-width: 760px;
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
}

.cards-wrapper {
  width: 100%;
  min-width: 0;
}

.cards-grid {
  width: 100%;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 24px;
}

.dashboard-card {
  min-width: 0;
  min-height: 185px;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dashboard-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 34px rgba(15, 23, 42, 0.12);
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 18px;
}

.card-icon {
  width: 52px;
  height: 52px;
  flex: 0 0 52px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: #dcfce7;
  color: #166534;
}

.card-tag {
  max-width: 130px;
  padding: 7px 11px;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 0.76rem;
  font-weight: 850;
  line-height: 1.1;
  text-align: center;
}

.dashboard-card h2 {
  margin: 0 0 9px;
  color: #111827;
  font-size: 1.22rem;
  font-weight: 850;
  line-height: 1.2;
}

.dashboard-card p {
  margin: 0;
  color: #64748b;
  font-size: 0.94rem;
  line-height: 1.55;
}

.dashboard-panels {
  width: 100%;
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(280px, 0.7fr);
  gap: 24px;
}

.panel {
  min-width: 0;
  background: #ffffff;
  border-radius: 16px;
  padding: 26px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.panel-label {
  margin: 0 0 6px;
  color: #166534;
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.panel h2 {
  margin: 0 0 20px;
  color: #111827;
  font-size: 1.22rem;
  font-weight: 850;
}

.summary-list {
  display: grid;
  gap: 14px;
}

.summary-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 18px;
  border-radius: 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
}

.summary-item span {
  color: #475569;
  font-size: 0.95rem;
}

.summary-item strong {
  color: #111827;
  font-size: 1.05rem;
}

.quick-actions {
  display: grid;
  gap: 12px;
}

.quick-actions button {
  width: 100%;
  text-align: left;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #f8fafc;
  color: #111827;
  padding: 15px 18px;
  font-size: 0.95rem;
  font-weight: 800;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.quick-actions button:hover {
  background: #ecfdf5;
  border-color: #bbf7d0;
  transform: translateY(-1px);
}

@media (max-width: 1200px) {
  .cards-grid {
    grid-template-columns: repeat(2, minmax(230px, 1fr));
  }
}

@media (max-width: 950px) {
  .dashboard-panels {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .dashboard-header h1 {
    font-size: 1.65rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-card,
  .panel {
    padding: 20px;
  }

  .card-top {
    flex-direction: column;
  }

  .card-tag {
    max-width: 100%;
  }
}
</style>