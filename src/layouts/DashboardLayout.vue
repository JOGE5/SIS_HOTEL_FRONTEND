<template>
  <div class="dashboard-layout">
    <Sidebar />

    <section class="dashboard-shell">
      <Topbar />

      <main class="dashboard-main">
        <router-view />
      </main>
    </section>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '../components/layout/Sidebar.vue';
import Topbar from '../components/layout/Topbar.vue';
</script>

<style scoped>
.dashboard-layout {
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 264px minmax(0, 1fr);
  background: #0f172a;
  color: #e5e7eb;
  overflow-x: hidden;
}

.dashboard-shell {
  min-width: 0;
  width: 100%;
  min-height: 100vh;
  background: #0f172a;
  border-left: 1px solid #253044;
  display: flex;
  flex-direction: column;
}

.dashboard-main {
  flex: 1;
  width: 100%;
  min-width: 0;
  padding: 18px;
  background: #0f172a;
}

@media (max-width: 900px) {
  .dashboard-layout {
    grid-template-columns: 1fr;
  }
}
</style>