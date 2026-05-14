<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  BedDouble,
  Search,
  SlidersHorizontal,
  Users,
  BadgeDollarSign,
  DoorOpen,
} from 'lucide-vue-next';

type EstadoHabitacion = 'LIBRE' | 'OCUPADO' | 'MANTENIMIENTO' | 'LIMPIEZA';

interface Habitacion {
  id: number;
  numero: string;
  tipo: string;
  capacidad: number;
  precio: number;
  estado: EstadoHabitacion;
  detalle: string;
}

const searchTerm = ref('');
const selectedEstado = ref<EstadoHabitacion | 'TODOS'>('TODOS');

const habitaciones = ref<Habitacion[]>([
  {
    id: 1,
    numero: '101',
    tipo: 'Simple',
    capacidad: 1,
    precio: 180,
    estado: 'LIBRE',
    detalle: 'Habitación individual disponible para hospedaje.',
  },
  {
    id: 2,
    numero: '102',
    tipo: 'Doble',
    capacidad: 2,
    precio: 260,
    estado: 'OCUPADO',
    detalle: 'Habitación doble actualmente ocupada.',
  },
  {
    id: 3,
    numero: '201',
    tipo: 'Matrimonial',
    capacidad: 2,
    precio: 320,
    estado: 'LIMPIEZA',
    detalle: 'Habitación en proceso de limpieza.',
  },
  {
    id: 4,
    numero: '202',
    tipo: 'Familiar',
    capacidad: 4,
    precio: 450,
    estado: 'MANTENIMIENTO',
    detalle: 'Habitación temporalmente fuera de servicio.',
  },
  {
    id: 5,
    numero: '301',
    tipo: 'Suite',
    capacidad: 3,
    precio: 620,
    estado: 'LIBRE',
    detalle: 'Suite disponible con mayor comodidad.',
  },
  {
    id: 6,
    numero: '302',
    tipo: 'Doble',
    capacidad: 2,
    precio: 260,
    estado: 'OCUPADO',
    detalle: 'Reserva activa en curso.',
  },
]);

const estados: Array<{
  label: EstadoHabitacion | 'TODOS';
  text: string;
}> = [
  { label: 'TODOS', text: 'Todos' },
  { label: 'LIBRE', text: 'Libre' },
  { label: 'OCUPADO', text: 'Ocupado' },
  { label: 'MANTENIMIENTO', text: 'Mantenimiento' },
  { label: 'LIMPIEZA', text: 'Limpieza' },
];

const filteredHabitaciones = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();

  return habitaciones.value.filter((habitacion) => {
    const matchesSearch =
      habitacion.numero.toLowerCase().includes(term) ||
      habitacion.tipo.toLowerCase().includes(term) ||
      habitacion.estado.toLowerCase().includes(term);

    const matchesEstado =
      selectedEstado.value === 'TODOS' ||
      habitacion.estado === selectedEstado.value;

    return matchesSearch && matchesEstado;
  });
});

const getEstadoClass = (estado: EstadoHabitacion) => {
  return {
    LIBRE: 'status-libre',
    OCUPADO: 'status-ocupado',
    MANTENIMIENTO: 'status-mantenimiento',
    LIMPIEZA: 'status-limpieza',
  }[estado];
};
</script>

<template>
  <section class="habitaciones-view">
    <header class="page-header">
      <div>
        <p class="page-label">Gestión hotelera</p>
        <h1>Habitaciones</h1>
        <p class="page-description">
          Control visual de habitaciones, disponibilidad, capacidad, precios y estados operativos.
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
            placeholder="Buscar habitación..."
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
          getEstadoClass(estado.label as EstadoHabitacion),
          { active: selectedEstado === estado.label }
        ]"
        @click="selectedEstado = estado.label"
      >
        <span class="legend-dot"></span>
        {{ estado.text }}
      </button>
    </section>

    <section class="rooms-grid">
      <article
        v-for="habitacion in filteredHabitaciones"
        :key="habitacion.id"
        class="e-card playing"
      >
        <div class="wave" :class="getEstadoClass(habitacion.estado)"></div>
        <div class="wave" :class="getEstadoClass(habitacion.estado)"></div>
        <div class="wave" :class="getEstadoClass(habitacion.estado)"></div>

        <div class="room-content">
          <div class="room-top">
            <div class="room-icon">
              <BedDouble :size="38" />
            </div>

            <span class="room-status" :class="getEstadoClass(habitacion.estado)">
              {{ habitacion.estado }}
            </span>
          </div>

          <div class="room-main">
            <p class="room-number">Hab. {{ habitacion.numero }}</p>
            <h2>{{ habitacion.tipo }}</h2>
            <p class="room-detail">{{ habitacion.detalle }}</p>
          </div>

          <div class="room-info">
            <div>
              <Users :size="17" />
              <span>{{ habitacion.capacidad }} pers.</span>
            </div>

            <div>
              <BadgeDollarSign :size="17" />
              <span>Bs. {{ habitacion.precio }}</span>
            </div>
          </div>

          <button type="button" class="room-action">
            <DoorOpen :size="17" />
            Ver detalle
          </button>
        </div>
      </article>
    </section>

    <div v-if="filteredHabitaciones.length === 0" class="empty-state">
      No se encontraron habitaciones con los filtros seleccionados.
    </div>
  </section>
</template>

<style scoped>
.habitaciones-view {
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
  max-width: 760px;
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

.rooms-grid {
  width: 100%;
  min-width: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
  align-items: stretch;
}

.e-card {
  background: transparent;
  box-shadow: 0px 8px 28px -9px rgba(0, 0, 0, 0.65);
  position: relative;
  width: 100%;
  min-height: 330px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #253044;
}

.wave {
  position: absolute;
  width: 540px;
  height: 700px;
  opacity: 0.6;
  left: 0;
  top: 0;
  margin-left: -50%;
  margin-top: -72%;
  background: linear-gradient(744deg, #00ff80, #009933 60%, #00cc44);
  border-radius: 40%;
  animation: wave 55s infinite linear;
}

.wave:nth-child(2),
.wave:nth-child(3) {
  top: 210px;
}

.playing .wave {
  animation: wave 3000ms infinite linear;
}

.playing .wave:nth-child(2) {
  animation-duration: 4000ms;
}

.playing .wave:nth-child(3) {
  animation-duration: 5000ms;
}

.wave.status-libre {
  background: linear-gradient(744deg, #22c55e, #15803d 60%, #86efac);
}

.wave.status-ocupado {
  background: linear-gradient(744deg, #facc15, #ca8a04 60%, #fde047);
}

.wave.status-mantenimiento {
  background: linear-gradient(744deg, #60a5fa, #1d4ed8 60%, #93c5fd);
}

.wave.status-limpieza {
  background: linear-gradient(744deg, #2dd4bf, #0f766e 60%, #99f6e4);
}

.room-content {
  position: relative;
  z-index: 2;
  height: 100%;
  min-height: 330px;
  padding: 22px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.2),
    rgba(15, 23, 42, 0.68)
  );
}

.room-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.room-icon {
  width: 58px;
  height: 58px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  color: #ffffff;
  background: rgba(15, 23, 42, 0.38);
  backdrop-filter: blur(8px);
}

.room-status {
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.45);
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.08em;
}

.room-status.status-libre {
  color: #bbf7d0;
}

.room-status.status-ocupado {
  color: #fef08a;
}

.room-status.status-mantenimiento {
  color: #bfdbfe;
}

.room-status.status-limpieza {
  color: #99f6e4;
}

.room-main {
  text-align: left;
}

.room-number {
  margin: 0 0 5px;
  color: #e2e8f0;
  font-size: 0.9rem;
  font-weight: 800;
}

.room-main h2 {
  margin: 0;
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: 900;
  line-height: 1.1;
}

.room-detail {
  margin: 10px 0 0;
  color: #dbeafe;
  font-size: 0.9rem;
  line-height: 1.45;
}

.room-info {
  display: grid;
  gap: 8px;
}

.room-info div {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f8fafc;
  font-size: 0.9rem;
  font-weight: 750;
}

.room-action {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 12px;
  padding: 11px 14px;
  background: rgba(15, 23, 42, 0.45);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 850;
  backdrop-filter: blur(8px);
  transition: background 0.2s ease, transform 0.2s ease;
}

.room-action:hover {
  background: rgba(15, 23, 42, 0.7);
  transform: translateY(-1px);
}

.empty-state {
  padding: 24px;
  border: 1px dashed #334155;
  border-radius: 16px;
  color: #94a3b8;
  text-align: center;
  background: #111827;
}

.status-libre {
  color: #22c55e;
}

.status-ocupado {
  color: #eab308;
}

.status-mantenimiento {
  color: #3b82f6;
}

.status-limpieza {
  color: #14b8a6;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 900px) {
  .toolbar {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .rooms-grid {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 1.6rem;
  }
}
</style>