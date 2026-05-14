<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  CalendarCheck,
  Search,
  SlidersHorizontal,
  User,
  BedDouble,
  CalendarDays,
  BadgeDollarSign,
  Clock,
  Eye,
} from 'lucide-vue-next';

type EstadoReservacion = 'PENDIENTE' | 'CONFIRMADA' | 'EN_CURSO' | 'FINALIZADA' | 'CANCELADA';

interface Reservacion {
  id: number;
  codigo: string;
  huesped: string;
  habitacion: string;
  tipoHabitacion: string;
  fechaEntrada: string;
  fechaSalida: string;
  total: number;
  estado: EstadoReservacion;
}

const searchTerm = ref('');
const selectedEstado = ref<EstadoReservacion | 'TODOS'>('TODOS');

const reservaciones = ref<Reservacion[]>([
  {
    id: 1,
    codigo: 'RES-001',
    huesped: 'Carlos Mendoza',
    habitacion: '101',
    tipoHabitacion: 'Simple',
    fechaEntrada: '2026-05-14',
    fechaSalida: '2026-05-16',
    total: 360,
    estado: 'CONFIRMADA',
  },
  {
    id: 2,
    codigo: 'RES-002',
    huesped: 'María Quispe',
    habitacion: '102',
    tipoHabitacion: 'Doble',
    fechaEntrada: '2026-05-15',
    fechaSalida: '2026-05-18',
    total: 780,
    estado: 'PENDIENTE',
  },
  {
    id: 3,
    codigo: 'RES-003',
    huesped: 'Luis Fernández',
    habitacion: '201',
    tipoHabitacion: 'Matrimonial',
    fechaEntrada: '2026-05-12',
    fechaSalida: '2026-05-15',
    total: 960,
    estado: 'EN_CURSO',
  },
  {
    id: 4,
    codigo: 'RES-004',
    huesped: 'Ana Rojas',
    habitacion: '301',
    tipoHabitacion: 'Suite',
    fechaEntrada: '2026-05-09',
    fechaSalida: '2026-05-12',
    total: 1860,
    estado: 'FINALIZADA',
  },
  {
    id: 5,
    codigo: 'RES-005',
    huesped: 'Pedro Vargas',
    habitacion: '202',
    tipoHabitacion: 'Familiar',
    fechaEntrada: '2026-05-20',
    fechaSalida: '2026-05-22',
    total: 900,
    estado: 'CANCELADA',
  },
]);

const estados: Array<{
  label: EstadoReservacion | 'TODOS';
  text: string;
}> = [
  { label: 'TODOS', text: 'Todos' },
  { label: 'PENDIENTE', text: 'Pendiente' },
  { label: 'CONFIRMADA', text: 'Confirmada' },
  { label: 'EN_CURSO', text: 'En curso' },
  { label: 'FINALIZADA', text: 'Finalizada' },
  { label: 'CANCELADA', text: 'Cancelada' },
];

const filteredReservaciones = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();

  return reservaciones.value.filter((reservacion) => {
    const matchesSearch =
      reservacion.codigo.toLowerCase().includes(term) ||
      reservacion.huesped.toLowerCase().includes(term) ||
      reservacion.habitacion.toLowerCase().includes(term) ||
      reservacion.tipoHabitacion.toLowerCase().includes(term) ||
      reservacion.estado.toLowerCase().includes(term);

    const matchesEstado =
      selectedEstado.value === 'TODOS' ||
      reservacion.estado === selectedEstado.value;

    return matchesSearch && matchesEstado;
  });
});

const getEstadoClass = (estado: EstadoReservacion) => {
  return {
    PENDIENTE: 'status-pendiente',
    CONFIRMADA: 'status-confirmada',
    EN_CURSO: 'status-en-curso',
    FINALIZADA: 'status-finalizada',
    CANCELADA: 'status-cancelada',
  }[estado];
};

const formatEstado = (estado: EstadoReservacion) => {
  return estado.replace('_', ' ');
};
</script>

<template>
  <section class="reservaciones-view">
    <header class="page-header">
      <div>
        <p class="page-label">Gestión hotelera</p>
        <h1>Reservaciones</h1>
        <p class="page-description">
          Control de reservas, huéspedes, habitaciones asignadas, fechas de estadía y estados.
        </p>
      </div>
    </header>

    <section class="toolbar">
      <form class="input-group" @submit.prevent>
        <div class="input-wrapper">
          <Search :size="19" class="search-icon" />
          <input
            v-model="searchTerm"
            type="text"
            class="input"
            placeholder="Buscar reservación..."
            autocomplete="off"
          />
        </div>

        <button class="button--submit" type="submit">
          Buscar
        </button>
      </form>

      <div class="filter-box">
        <SlidersHorizontal :size="18" />
        <select v-model="selectedEstado">
          <option
            v-for="estado in estados"
            :key="estado.label"
            :value="estado.label"
          >
            {{ estado.text }}
          </option>
        </select>
      </div>
    </section>

    <section class="status-legend">
      <span class="legend-title">Estado</span>

      <button
        v-for="estado in estados.filter((item) => item.label !== 'TODOS')"
        :key="estado.label"
        type="button"
        class="legend-chip"
        :class="[
          getEstadoClass(estado.label as EstadoReservacion),
          { active: selectedEstado === estado.label }
        ]"
        @click="selectedEstado = estado.label"
      >
        <span class="legend-dot"></span>
        {{ estado.text }}
      </button>
    </section>

    <section class="reservas-grid">
      <article
        v-for="reservacion in filteredReservaciones"
        :key="reservacion.id"
        class="reservation-card"
      >
        <div class="card-glow" :class="getEstadoClass(reservacion.estado)"></div>

        <div class="card-header">
          <div class="reservation-icon">
            <CalendarCheck :size="28" />
          </div>

          <span class="status-badge" :class="getEstadoClass(reservacion.estado)">
            {{ formatEstado(reservacion.estado) }}
          </span>
        </div>

        <div class="card-main">
          <p class="reservation-code">{{ reservacion.codigo }}</p>
          <h2>{{ reservacion.huesped }}</h2>
        </div>

        <div class="reservation-info">
          <div class="info-row">
            <User :size="17" />
            <span>Huésped registrado</span>
          </div>

          <div class="info-row">
            <BedDouble :size="17" />
            <span>Hab. {{ reservacion.habitacion }} · {{ reservacion.tipoHabitacion }}</span>
          </div>

          <div class="info-row">
            <CalendarDays :size="17" />
            <span>{{ reservacion.fechaEntrada }} / {{ reservacion.fechaSalida }}</span>
          </div>

          <div class="info-row">
            <BadgeDollarSign :size="17" />
            <span>Bs. {{ reservacion.total }}</span>
          </div>
        </div>

        <div class="card-footer">
          <div class="time-info">
            <Clock :size="16" />
            <span>Estadía programada</span>
          </div>

          <button type="button" class="detail-button">
            <Eye :size="16" />
            Ver
          </button>
        </div>
      </article>
    </section>

    <div v-if="filteredReservaciones.length === 0" class="empty-state">
      No se encontraron reservaciones con los filtros seleccionados.
    </div>
  </section>
</template>

<style scoped>
.reservaciones-view {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
}

.page-label {
  margin: 0 0 6px;
  color: #93c5fd;
  font-size: 0.76rem;
  font-weight: 850;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.page-header h1 {
  margin: 0;
  color: #f8fafc;
  font-size: 2rem;
  font-weight: 850;
  line-height: 1.1;
}

.page-description {
  margin: 10px 0 0;
  max-width: 780px;
  color: #94a3b8;
  font-size: 0.96rem;
  line-height: 1.55;
}

.toolbar {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(280px, 1fr) 220px;
  gap: 14px;
  align-items: center;
}

.input-group {
  width: 100%;
  display: flex;
  align-items: center;
}

.input-wrapper {
  position: relative;
  flex: 1;
  min-width: 0;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.input {
  width: 100%;
  min-height: 50px;
  padding: 0 1rem 0 2.8rem;
  color: #f8fafc;
  font-size: 15px;
  border: 1px solid #334155;
  border-radius: 10px 0 0 10px;
  background-color: #111827;
}

.button--submit {
  min-height: 50px;
  padding: 0.5em 1.2em;
  border: none;
  border-radius: 0 10px 10px 0;
  background-color: #2563eb;
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.button--submit:hover {
  background-color: #1d4ed8;
}

.input:focus,
.input:focus-visible {
  border-color: #3898ec;
  outline: none;
}

.filter-box {
  min-height: 50px;
  padding: 0 14px;
  border: 1px solid #334155;
  border-radius: 10px;
  background: #111827;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-box svg {
  color: #93c5fd;
}

.filter-box select {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #f8fafc;
  font-size: 0.9rem;
  font-weight: 750;
}

.status-legend {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.legend-title {
  color: #f8fafc;
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.legend-chip {
  border: 1px solid #334155;
  border-radius: 999px;
  background: #111827;
  color: #cbd5e1;
  padding: 7px 12px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.78rem;
  font-weight: 850;
  text-transform: uppercase;
}

.legend-chip.active {
  border-color: currentColor;
  background: #1e293b;
}

.legend-dot {
  width: 11px;
  height: 11px;
  border-radius: 999px;
  background: currentColor;
}

.reservas-grid {
  width: 100%;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
  gap: 22px;
}

.reservation-card {
  position: relative;
  overflow: hidden;
  min-height: 320px;
  padding: 22px;
  border-radius: 18px;
  border: 1px solid #253044;
  background: #111827;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.32);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-glow {
  position: absolute;
  width: 180px;
  height: 180px;
  top: -70px;
  right: -70px;
  border-radius: 999px;
  opacity: 0.22;
  filter: blur(2px);
}

.card-glow.status-pendiente {
  background: #facc15;
}

.card-glow.status-confirmada {
  background: #22c55e;
}

.card-glow.status-en-curso {
  background: #3b82f6;
}

.card-glow.status-finalizada {
  background: #14b8a6;
}

.card-glow.status-cancelada {
  background: #ef4444;
}

.card-header,
.card-main,
.reservation-info,
.card-footer {
  position: relative;
  z-index: 2;
}

.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
}

.reservation-icon {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  color: #93c5fd;
  background: #1e293b;
  border: 1px solid #334155;
}

.status-badge {
  padding: 7px 10px;
  border-radius: 999px;
  background: #1e293b;
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.status-pendiente {
  color: #facc15;
}

.status-confirmada {
  color: #22c55e;
}

.status-en-curso {
  color: #60a5fa;
}

.status-finalizada {
  color: #2dd4bf;
}

.status-cancelada {
  color: #f87171;
}

.reservation-code {
  margin: 0 0 6px;
  color: #93c5fd;
  font-size: 0.85rem;
  font-weight: 850;
}

.card-main h2 {
  margin: 0;
  color: #f8fafc;
  font-size: 1.35rem;
  font-weight: 900;
  line-height: 1.2;
}

.reservation-info {
  display: grid;
  gap: 10px;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #cbd5e1;
  font-size: 0.9rem;
  line-height: 1.35;
}

.info-row svg {
  color: #64748b;
  flex-shrink: 0;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding-top: 16px;
  border-top: 1px solid #253044;
}

.time-info {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 750;
}

.detail-button {
  border: 1px solid #334155;
  border-radius: 10px;
  background: #1e293b;
  color: #f8fafc;
  padding: 9px 12px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.82rem;
  font-weight: 850;
}

.detail-button:hover {
  background: #2563eb;
  border-color: #2563eb;
}

.empty-state {
  padding: 24px;
  border: 1px dashed #334155;
  border-radius: 16px;
  color: #94a3b8;
  text-align: center;
  background: #111827;
}

@media (max-width: 900px) {
  .toolbar {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .reservas-grid {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 1.6rem;
  }
}
</style>