<script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '../services/api';

const habitaciones = ref<any[]>([]);
const buscar = ref('');
const estado = ref('');
const cargando = ref(false);

const cargarHabitaciones = async () => {
  try {
    cargando.value = true;

    const response = await api.get('/habitaciones', {
      params: {
        buscar: buscar.value,
        estado_habitacion: estado.value,
      },
    });

    habitaciones.value = response.data.data.data;
  } catch (error) {
    console.error('Error al cargar habitaciones:', error);
  } finally {
    cargando.value = false;
  }
};

onMounted(() => {
  cargarHabitaciones();
});
</script>

<template>
  <section class="habitaciones">
    <div class="top-row">
      <h1>HABITACIONES</h1>

      <div class="search-panel">
        <span class="search-icon">⌕</span>

        <input
          v-model="buscar"
          type="text"
          placeholder="BUSCADOR......"
          @input="cargarHabitaciones"
        />

        <span class="filter-icon">▽</span>

        <select v-model="estado" @change="cargarHabitaciones">
          <option value="">FILTRAR</option>
          <option value="libre">LIBRE</option>
          <option value="ocupada">OCUPADO</option>
          <option value="mantenimiento">MANTENIMIENTO</option>
          <option value="reservada">LIMPIEZA</option>
        </select>
      </div>
    </div>

    <div class="legend">
      <span class="legend-title">ESTADO</span>

      <span class="legend-pill">
        <b class="dot libre"></b>
        LIBRE
      </span>

      <span class="legend-pill">
        <b class="dot ocupada"></b>
        OCUPADO
      </span>

      <span class="legend-pill">
        <b class="dot mantenimiento"></b>
        MANTENIMIENTO
      </span>

      <span class="legend-pill">
        <b class="dot limpieza"></b>
        LIMPIEZA
      </span>
    </div>

    <div class="grid">
      <article
        v-for="habitacion in habitaciones"
        :key="habitacion.id"
        class="room-card"
      >
        <div class="room-content">
          <h2>Hab. {{ habitacion.numero }}</h2>
          <p>{{ habitacion.tipo }}</p>
          <p>Bs. {{ habitacion.precio_noche }}</p>
          <span :class="['state', habitacion.estado_habitacion]">
            {{ habitacion.estado_habitacion }}
          </span>
        </div>
      </article>

      <article
        v-for="n in Math.max(0, 12 - habitaciones.length)"
        :key="'empty-' + n"
        class="room-card empty-card"
      ></article>
    </div>

    <div class="pagination">
      <button>←</button>
      <span>PAGINA 1</span>
      <button>→</button>
    </div>
  </section>
</template>

<style scoped>
.habitaciones {
  width: 100%;
}

.top-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

h1 {
  background: #2f343d;
  color: white;
  padding: 11px 10px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 900;
  margin: 0;
  height: 44px;
  display: flex;
  align-items: center;
}

.search-panel {
  height: 44px;
  flex: 1;
  background: #eef1f2;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 38px 1fr 38px 130px;
  align-items: center;
  gap: 8px;
  padding: 5px 8px;
}

.search-icon {
  font-size: 34px;
  color: #111;
  line-height: 1;
  transform: rotate(-20deg);
}

.filter-icon {
  font-size: 35px;
  color: #111;
  line-height: 1;
  transform: rotate(180deg);
}

input,
select {
  height: 31px;
  border: none;
  background: #b9b9b9;
  border-radius: 4px;
  outline: none;
  text-align: center;
  font-size: 9px;
  color: #111;
}

select {
  appearance: none;
  font-size: 10px;
}

.legend {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 11px;
  flex-wrap: wrap;
}

.legend-title,
.legend-pill {
  height: 25px;
  background: #2f343d;
  color: white;
  border-radius: 10px;
  padding: 0 7px;
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  font-weight: 900;
}

.legend-pill {
  padding-right: 12px;
}

.dot {
  width: 17px;
  height: 17px;
  border-radius: 50%;
  display: inline-block;
}

.libre {
  background: #06972c;
}

.ocupada {
  background: #d6d606;
}

.mantenimiento {
  background: #1c62cf;
}

.limpieza {
  background: #36d997;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 7px 17px;
  padding-right: 8px;
}

.room-card {
  height: 75px;
  background: #2f343d;
  border-radius: 8px;
  color: white;
  padding: 8px;
  overflow: hidden;
}

.room-content h2 {
  margin: 0 0 4px 0;
  font-size: 13px;
}

.room-content p {
  margin: 2px 0;
  font-size: 10px;
}

.state {
  display: inline-block;
  margin-top: 4px;
  padding: 3px 6px;
  border-radius: 8px;
  font-size: 8px;
  text-transform: uppercase;
  font-weight: bold;
}

.state.libre {
  background: #06972c;
}

.state.ocupada {
  background: #c4c400;
}

.state.mantenimiento {
  background: #1c62cf;
}

.state.reservada {
  background: #36d997;
}

.empty-card {
  min-height: 75px;
}

.pagination {
  margin-top: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
}

.pagination button {
  background: transparent;
  border: none;
  font-size: 28px;
  font-weight: 900;
  cursor: pointer;
  color: black;
  line-height: 1;
}

.pagination span {
  width: 106px;
  height: 19px;
  background: #8b908a;
  color: white;
  border-radius: 15px;
  font-size: 11px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 1200px) {
  .room-card {
    height: 105px;
  }

  .grid {
    gap: 14px 24px;
  }
}
</style>