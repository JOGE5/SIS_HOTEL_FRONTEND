<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  Search,
  SlidersHorizontal,
  UserRound,
  BadgeCheck,
  BadgeX,
  Phone,
  Mail,
  IdCard,
  CalendarDays,
  Eye,
} from 'lucide-vue-next';

type EstadoHuesped = 'ACTIVO' | 'INACTIVO' | 'RESERVADO' | 'HOSPEDADO';

interface Huesped {
  id: number;
  nombreCompleto: string;
  documento: string;
  telefono: string;
  correo: string;
  codigoReserva: string;
  fechaRegistro: string;
  estado: EstadoHuesped;
}

const searchTerm = ref('');
const selectedEstado = ref<EstadoHuesped | 'TODOS'>('TODOS');

const huespedes = ref<Huesped[]>([
  {
    id: 1,
    nombreCompleto: 'Carlos Mendoza Rojas',
    documento: '7894561 LP',
    telefono: '76543210',
    correo: 'carlos.mendoza@email.com',
    codigoReserva: 'RES-001',
    fechaRegistro: '2026-05-14',
    estado: 'HOSPEDADO',
  },
  {
    id: 2,
    nombreCompleto: 'María Quispe Flores',
    documento: '6543218 LP',
    telefono: '71234567',
    correo: 'maria.quispe@email.com',
    codigoReserva: 'RES-002',
    fechaRegistro: '2026-05-15',
    estado: 'RESERVADO',
  },
  {
    id: 3,
    nombreCompleto: 'Luis Fernández Castro',
    documento: '8456321 CB',
    telefono: '69874521',
    correo: 'luis.fernandez@email.com',
    codigoReserva: 'RES-003',
    fechaRegistro: '2026-05-12',
    estado: 'ACTIVO',
  },
  {
    id: 4,
    nombreCompleto: 'Ana Rojas Medina',
    documento: '9876543 LP',
    telefono: '73456789',
    correo: 'ana.rojas@email.com',
    codigoReserva: 'RES-004',
    fechaRegistro: '2026-05-09',
    estado: 'INACTIVO',
  },
  {
    id: 5,
    nombreCompleto: 'Pedro Vargas Lima',
    documento: '7654321 SC',
    telefono: '70112233',
    correo: 'pedro.vargas@email.com',
    codigoReserva: 'RES-005',
    fechaRegistro: '2026-05-20',
    estado: 'RESERVADO',
  },
]);

const estados: Array<{
  label: EstadoHuesped | 'TODOS';
  text: string;
}> = [
  { label: 'TODOS', text: 'Todos' },
  { label: 'ACTIVO', text: 'Activo' },
  { label: 'INACTIVO', text: 'Inactivo' },
  { label: 'RESERVADO', text: 'Reservado' },
  { label: 'HOSPEDADO', text: 'Hospedado' },
];

const filteredHuespedes = computed(() => {
  const term = searchTerm.value.trim().toLowerCase();

  return huespedes.value.filter((huesped) => {
    const matchesSearch =
      huesped.nombreCompleto.toLowerCase().includes(term) ||
      huesped.documento.toLowerCase().includes(term) ||
      huesped.telefono.toLowerCase().includes(term) ||
      huesped.correo.toLowerCase().includes(term) ||
      huesped.codigoReserva.toLowerCase().includes(term) ||
      huesped.estado.toLowerCase().includes(term);

    const matchesEstado =
      selectedEstado.value === 'TODOS' ||
      huesped.estado === selectedEstado.value;

    return matchesSearch && matchesEstado;
  });
});

const getEstadoClass = (estado: EstadoHuesped) => {
  return {
    ACTIVO: 'status-activo',
    INACTIVO: 'status-inactivo',
    RESERVADO: 'status-reservado',
    HOSPEDADO: 'status-hospedado',
  }[estado];
};
</script>

<template>
  <section class="huespedes-view">
    <header class="page-header">
      <div>
        <p class="page-label">Gestión hotelera</p>
        <h1>Huéspedes</h1>
        <p class="page-description">
          Registro y consulta de huéspedes, datos de contacto, documentos y reservas asociadas.
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
            placeholder="Buscar huésped..."
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
          getEstadoClass(estado.label as EstadoHuesped),
          { active: selectedEstado === estado.label }
        ]"
        @click="selectedEstado = estado.label"
      >
        <span class="legend-dot"></span>
        {{ estado.text }}
      </button>
    </section>

    <section class="guest-list-panel">
      <div class="list-header">
        <div class="col guest-col">Huésped</div>
        <div class="col">Documento</div>
        <div class="col">Contacto</div>
        <div class="col">Reserva</div>
        <div class="col">Estado</div>
        <div class="col actions-col">Acción</div>
      </div>

      <article
        v-for="huesped in filteredHuespedes"
        :key="huesped.id"
        class="guest-row"
      >
        <div class="guest-main">
          <div class="guest-avatar">
            <UserRound :size="20" />
          </div>

          <div>
            <h2>{{ huesped.nombreCompleto }}</h2>
            <p>
              <CalendarDays :size="15" />
              Registrado: {{ huesped.fechaRegistro }}
            </p>
          </div>
        </div>

        <div class="guest-cell">
          <span class="cell-label">Documento</span>
          <p>
            <IdCard :size="16" />
            {{ huesped.documento }}
          </p>
        </div>

        <div class="guest-cell">
          <span class="cell-label">Contacto</span>
          <p>
            <Phone :size="16" />
            {{ huesped.telefono }}
          </p>
          <p>
            <Mail :size="16" />
            {{ huesped.correo }}
          </p>
        </div>

        <div class="guest-cell">
          <span class="cell-label">Reserva</span>
          <p>{{ huesped.codigoReserva }}</p>
        </div>

        <div class="guest-cell">
          <span
            class="status-badge"
            :class="getEstadoClass(huesped.estado)"
          >
            <BadgeCheck
              v-if="huesped.estado !== 'INACTIVO'"
              :size="15"
            />
            <BadgeX
              v-else
              :size="15"
            />
            {{ huesped.estado }}
          </span>
        </div>

        <div class="guest-actions">
          <button type="button">
            <Eye :size="16" />
            Ver
          </button>
        </div>
      </article>

      <div v-if="filteredHuespedes.length === 0" class="empty-state">
        No se encontraron huéspedes con los filtros seleccionados.
      </div>
    </section>
  </section>
</template>

<style scoped>
.huespedes-view {
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

.guest-list-panel {
  width: 100%;
  min-width: 0;
  border: 1px solid #253044;
  border-radius: 18px;
  background: #111827;
  overflow: hidden;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.28);
}

.list-header {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.35fr 0.8fr 0.9fr 0.7fr;
  gap: 14px;
  padding: 15px 18px;
  background: #0f172a;
  border-bottom: 1px solid #253044;
}

.col {
  color: #64748b;
  font-size: 0.74rem;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.guest-row {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.35fr 0.8fr 0.9fr 0.7fr;
  gap: 14px;
  align-items: center;
  padding: 18px;
  border-bottom: 1px solid #253044;
  transition: background 0.18s ease;
}

.guest-row:hover {
  background: #1e293b;
}

.guest-row:last-child {
  border-bottom: none;
}

.guest-main {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.guest-avatar {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: #93c5fd;
  background: #1e293b;
  border: 1px solid #334155;
  flex-shrink: 0;
}

.guest-main h2 {
  margin: 0;
  color: #f8fafc;
  font-size: 0.98rem;
  font-weight: 850;
  line-height: 1.2;
}

.guest-main p,
.guest-cell p {
  margin: 5px 0 0;
  color: #94a3b8;
  font-size: 0.84rem;
  line-height: 1.35;
  display: flex;
  align-items: center;
  gap: 7px;
}

.guest-cell {
  min-width: 0;
}

.cell-label {
  display: none;
  color: #64748b;
  font-size: 0.72rem;
  font-weight: 850;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.status-badge {
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 10px;
  border-radius: 999px;
  background: #1e293b;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.06em;
}

.status-activo {
  color: #22c55e;
}

.status-inactivo {
  color: #f87171;
}

.status-reservado {
  color: #facc15;
}

.status-hospedado {
  color: #60a5fa;
}

.guest-actions {
  display: flex;
  justify-content: flex-end;
}

.guest-actions button {
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

.guest-actions button:hover {
  background: #2563eb;
  border-color: #2563eb;
}

.empty-state {
  padding: 24px;
  color: #94a3b8;
  text-align: center;
}

@media (max-width: 1120px) {
  .list-header {
    display: none;
  }

  .guest-row {
    grid-template-columns: 1fr;
    gap: 14px;
    align-items: start;
  }

  .cell-label {
    display: block;
  }

  .guest-actions {
    justify-content: flex-start;
  }
}

@media (max-width: 900px) {
  .toolbar {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .page-header h1 {
    font-size: 1.6rem;
  }
}
</style>