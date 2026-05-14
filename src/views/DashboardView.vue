<script setup lang="ts">
import { ref } from 'vue';
import HabitacionesView from './HabitacionesView.vue';

const emit = defineEmits<{
  logout: [];
}>();

const vistaActual = ref('habitaciones');
</script>

<template>
  <main class="app-layout">
    <aside class="sidebar">
      <div class="logo">
        <img src="/images/logo-lamansion.png" alt="Hotel Club Campestre La Mansión" />
      </div>

      <nav class="menu">
        <button
          :class="{ active: vistaActual === 'reservas' }"
          @click="vistaActual = 'reservas'"
        >
          <span class="icon">▱</span>
          <span>RESERVAS</span>
        </button>

        <button
          :class="{ active: vistaActual === 'huespedes' }"
          @click="vistaActual = 'huespedes'"
        >
          <span class="icon">♙</span>
          <span>HUÉSPEDES</span>
        </button>

        <button
          :class="{ active: vistaActual === 'habitaciones' }"
          @click="vistaActual = 'habitaciones'"
        >
          <span class="icon">▰</span>
          <span>HABITACIONES</span>
        </button>

        <button
          :class="{ active: vistaActual === 'platos' }"
          @click="vistaActual = 'platos'"
        >
          <span class="icon">▤</span>
          <span>PLATOS</span>
        </button>

        <button
          :class="{ active: vistaActual === 'informes' }"
          @click="vistaActual = 'informes'"
        >
          <span class="icon">▟</span>
          <span>INFORMES</span>
        </button>
      </nav>

      <div class="bottom-area">
        <div class="user-box">
          <div class="avatar"></div>
          <div>
            <strong>USER NAME</strong>
            <span>ROL</span>
          </div>
        </div>

        <button class="config">
          <span class="config-icon">⚙</span>
          CONFIGURACIÓN
        </button>

        <button class="logout" @click="emit('logout')">
          SALIR
        </button>
      </div>
    </aside>

    <section class="content">
      <HabitacionesView v-if="vistaActual === 'habitaciones'" />

      <div v-else class="placeholder">
        <h1>{{ vistaActual.toUpperCase() }}</h1>
        <p>Vista pendiente.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  background: #cbb99f;
  font-family: Arial, Helvetica, sans-serif;
}

.sidebar {
  width: 230px;
  min-width: 230px;
  background: #2f343d;
  color: white;
  display: flex;
  flex-direction: column;
  border-right: 4px solid #7b38ff;
  padding-top: 22px;
}

.logo {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  margin-bottom: 30px;
}

.logo img {
  width: 100%;
  max-width: 180px;
  object-fit: contain;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.menu button {
  height: 36px;
  width: 215px;
  background: #8b908a;
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
}

.menu button.active {
  background: #8b908a;
}

.menu button:hover {
  background: #777d77;
}

.icon {
  width: 28px;
  color: black;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}

.bottom-area {
  margin-top: auto;
  padding-bottom: 18px;
}

.user-box {
  width: 185px;
  height: 48px;
  background: #8b908a;
  border-radius: 0 20px 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  margin-bottom: 16px;
}

.avatar {
  width: 34px;
  height: 34px;
  background: black;
  border-radius: 50%;
  border: 3px solid #111;
}

.user-box div:last-child {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.user-box strong,
.user-box span {
  font-size: 10px;
  font-weight: 500;
}

.config,
.logout {
  width: 185px;
  height: 34px;
  background: #8b908a;
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 18px;
}

.config-icon {
  color: black;
  font-size: 17px;
}

.logout {
  margin-top: 10px;
  background: #7b3939;
}

.content {
  flex: 1;
  background: #cbb99f;
  padding: 34px 14px 20px 14px;
  overflow: auto;
}

.placeholder {
  background: #2f343d;
  color: white;
  padding: 30px;
  border-radius: 12px;
}
</style>